import stripe

from app.config import settings

stripe.api_key = settings.stripe_secret_key


def create_payment_intent(amount_cents: int, booking_id: str) -> stripe.PaymentIntent:
    """Create a Stripe Payment Intent."""
    return stripe.PaymentIntent.create(
        amount=amount_cents,
        currency="usd",
        metadata={"booking_id": booking_id},
    )


def verify_webhook_signature(payload: bytes, sig_header: str) -> dict:
    """Verify and parse a Stripe webhook event."""
    return stripe.Webhook.construct_event(
        payload, sig_header, settings.stripe_webhook_secret
    )
