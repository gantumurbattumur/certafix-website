from datetime import datetime, timezone
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.api.deps import get_current_admin, get_db
from app.models.quote import QuoteItem, QuoteRequest, QuoteStatus
from app.schemas.quote import QuoteCreate, QuoteListOut, QuoteOut, QuoteRespond

router = APIRouter(tags=["Quotes"])


# ── Public ───────────────────────────────────────────────

@router.post("/quotes", response_model=QuoteOut, status_code=status.HTTP_201_CREATED)
async def create_quote(body: QuoteCreate, db: AsyncSession = Depends(get_db)):
    """Submit a quote request."""
    quote = QuoteRequest(
        customer_name=body.customer_name,
        customer_email=body.customer_email,
        customer_phone=body.customer_phone,
        address=body.address,
        city=body.city,
        zip_code=body.zip_code,
        description=body.description,
    )
    db.add(quote)
    await db.flush()

    for item_data in body.items:
        item = QuoteItem(
            quote_id=quote.id,
            service_id=item_data.service_id,
            service_price_id=item_data.service_price_id,
            description=item_data.description,
            estimated_price=item_data.estimated_price,
        )
        db.add(item)

    await db.commit()
    await db.refresh(quote)
    items_result = await db.exec(select(QuoteItem).where(QuoteItem.quote_id == quote.id))
    quote.items = items_result.all()
    return quote


# ── Admin ────────────────────────────────────────────────

@router.get("/admin/quotes", response_model=list[QuoteListOut])
async def list_quotes(
    status_filter: QuoteStatus | None = Query(None, alias="status"),
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    query = select(QuoteRequest).order_by(QuoteRequest.created_at.desc())
    if status_filter:
        query = query.where(QuoteRequest.status == status_filter)
    result = await db.exec(query)
    return result.all()


@router.get("/admin/quotes/{quote_id}", response_model=QuoteOut)
async def get_quote(
    quote_id: UUID,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    quote = await db.get(QuoteRequest, quote_id)
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    items_result = await db.exec(select(QuoteItem).where(QuoteItem.quote_id == quote.id))
    quote.items = items_result.all()
    return quote


@router.patch("/admin/quotes/{quote_id}", response_model=QuoteOut)
async def respond_to_quote(
    quote_id: UUID,
    body: QuoteRespond,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    quote = await db.get(QuoteRequest, quote_id)
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")

    if body.status is not None:
        quote.status = body.status
    if body.admin_notes is not None:
        quote.admin_notes = body.admin_notes
    if body.quoted_amount is not None:
        quote.quoted_amount = body.quoted_amount
        quote.quoted_at = datetime.now(timezone.utc)

    db.add(quote)
    await db.commit()
    await db.refresh(quote)
    items_result = await db.exec(select(QuoteItem).where(QuoteItem.quote_id == quote.id))
    quote.items = items_result.all()
    return quote
