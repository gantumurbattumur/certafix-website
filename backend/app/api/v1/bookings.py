from decimal import Decimal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.api.deps import get_current_admin, get_db
from app.models.booking import Booking, BookingItem, BookingStatus
from app.models.service import ServicePrice
from app.schemas.booking import (
    BookingCreate,
    BookingListOut,
    BookingOut,
    BookingStatusUpdate,
)

router = APIRouter(tags=["Bookings"])


# ── Public ───────────────────────────────────────────────

@router.post("/bookings", response_model=BookingOut, status_code=status.HTTP_201_CREATED)
async def create_booking(body: BookingCreate, db: AsyncSession = Depends(get_db)):
    """Create a new booking with selected service items."""
    # Validate prices and build items
    items = []
    total = Decimal("0")
    for item_data in body.items:
        price = await db.get(ServicePrice, item_data.service_price_id)
        if not price or not price.is_active:
            raise HTTPException(status_code=400, detail=f"Invalid service price: {item_data.service_price_id}")

        subtotal = price.price * item_data.quantity
        items.append(
            BookingItem(
                service_id=item_data.service_id,
                service_price_id=item_data.service_price_id,
                quantity=item_data.quantity,
                unit_price=price.price,
                subtotal=subtotal,
            )
        )
        total += subtotal

    booking = Booking(
        customer_name=body.customer_name,
        customer_email=body.customer_email,
        customer_phone=body.customer_phone,
        address=body.address,
        city=body.city,
        zip_code=body.zip_code,
        preferred_date=body.preferred_date,
        preferred_time_slot=body.preferred_time_slot,
        notes=body.notes,
        total_estimate=total,
    )
    db.add(booking)
    await db.flush()

    for item in items:
        item.booking_id = booking.id
        db.add(item)

    await db.commit()
    await db.refresh(booking)

    items_result = await db.exec(select(BookingItem).where(BookingItem.booking_id == booking.id))
    booking.items = items_result.all()
    return booking


# ── Admin ────────────────────────────────────────────────

@router.get(
    "/admin/bookings",
    response_model=list[BookingListOut],
)
async def list_bookings(
    status_filter: BookingStatus | None = Query(None, alias="status"),
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    query = select(Booking).order_by(Booking.created_at.desc())
    if status_filter:
        query = query.where(Booking.status == status_filter)
    result = await db.exec(query)
    return result.all()


@router.get("/admin/bookings/{booking_id}", response_model=BookingOut)
async def get_booking(
    booking_id: UUID,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    booking = await db.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    items_result = await db.exec(select(BookingItem).where(BookingItem.booking_id == booking.id))
    booking.items = items_result.all()
    return booking


@router.patch("/admin/bookings/{booking_id}", response_model=BookingOut)
async def update_booking_status(
    booking_id: UUID,
    body: BookingStatusUpdate,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    booking = await db.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = body.status
    db.add(booking)
    await db.commit()
    await db.refresh(booking)
    items_result = await db.exec(select(BookingItem).where(BookingItem.booking_id == booking.id))
    booking.items = items_result.all()
    return booking
