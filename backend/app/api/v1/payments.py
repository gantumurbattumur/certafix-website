from datetime import datetime, timezone
from uuid import UUID

import stripe
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.api.deps import get_current_admin, get_db
from app.config import settings
from app.models.booking import Booking
from app.models.payment import Payment, PaymentStatus
from app.schemas.payment import PaymentIntentCreate, PaymentOut

router = APIRouter(tags=["Payments"])

stripe.api_key = settings.stripe_secret_key


# ── Public ───────────────────────────────────────────────

@router.post("/payments/create-intent")
async def create_payment_intent(
    body: PaymentIntentCreate, db: AsyncSession = Depends(get_db)
):
    """Create a Stripe PaymentIntent for a booking."""
    booking = await db.get(Booking, body.booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if not booking.total_estimate or booking.total_estimate <= 0:
        raise HTTPException(status_code=400, detail="Booking has no valid total")

    # Check for existing payment
    result = await db.exec(
        select(Payment).where(Payment.booking_id == booking.id)
    )
    existing = result.first()
    if existing and existing.status == PaymentStatus.SUCCEEDED:
        raise HTTPException(status_code=400, detail="Booking already paid")

    amount_cents = int(booking.total_estimate * 100)

    intent = stripe.PaymentIntent.create(
        amount=amount_cents,
        currency="usd",
        metadata={"booking_id": str(booking.id)},
    )

    if not existing:
        payment = Payment(
            booking_id=booking.id,
            stripe_payment_intent_id=intent.id,
            amount=booking.total_estimate,
        )
        db.add(payment)
        await db.commit()

    return {
        "client_secret": intent.client_secret,
        "payment_intent_id": intent.id,
        "amount": amount_cents,
    }


@router.post("/payments/webhook")
async def stripe_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    """Handle Stripe webhook events."""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.stripe_webhook_secret
        )
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    if event["type"] == "payment_intent.succeeded":
        payment_intent = event["data"]["object"]
        result = await db.exec(
            select(Payment).where(
                Payment.stripe_payment_intent_id == payment_intent["id"]
            )
        )
        payment = result.first()
        if payment:
            payment.status = PaymentStatus.SUCCEEDED
            payment.paid_at = datetime.now(timezone.utc)
            db.add(payment)
            await db.commit()

    elif event["type"] == "payment_intent.payment_failed":
        payment_intent = event["data"]["object"]
        result = await db.exec(
            select(Payment).where(
                Payment.stripe_payment_intent_id == payment_intent["id"]
            )
        )
        payment = result.first()
        if payment:
            payment.status = PaymentStatus.FAILED
            db.add(payment)
            await db.commit()

    return {"status": "ok"}


# ── Admin ────────────────────────────────────────────────

@router.get("/admin/payments", response_model=list[PaymentOut])
async def list_payments(
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    result = await db.exec(select(Payment).order_by(Payment.created_at.desc()))
    return result.all()
