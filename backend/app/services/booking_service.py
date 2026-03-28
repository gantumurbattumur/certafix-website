from decimal import Decimal
from uuid import UUID

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.booking import Booking, BookingItem, BookingStatus
from app.models.service import ServicePrice


async def calculate_booking_total(
    items: list[dict], db: AsyncSession
) -> tuple[list[BookingItem], Decimal]:
    """Validate service prices and calculate total for a booking."""
    booking_items = []
    total = Decimal("0")

    for item_data in items:
        price = await db.get(ServicePrice, item_data["service_price_id"])
        if not price or not price.is_active:
            raise ValueError(f"Invalid service price: {item_data['service_price_id']}")

        quantity = item_data.get("quantity", 1)
        subtotal = price.price * quantity
        booking_items.append(
            BookingItem(
                service_id=item_data["service_id"],
                service_price_id=item_data["service_price_id"],
                quantity=quantity,
                unit_price=price.price,
                subtotal=subtotal,
            )
        )
        total += subtotal

    return booking_items, total


async def get_booking_stats(db: AsyncSession) -> dict:
    """Get booking statistics for the admin dashboard."""
    total_result = await db.exec(select(Booking))
    all_bookings = total_result.all()

    pending = sum(1 for b in all_bookings if b.status == BookingStatus.PENDING)
    confirmed = sum(1 for b in all_bookings if b.status == BookingStatus.CONFIRMED)
    completed = sum(1 for b in all_bookings if b.status == BookingStatus.COMPLETED)
    total_revenue = sum(
        b.total_estimate for b in all_bookings
        if b.status == BookingStatus.COMPLETED and b.total_estimate
    )

    return {
        "total_bookings": len(all_bookings),
        "pending": pending,
        "confirmed": confirmed,
        "completed": completed,
        "total_revenue": float(total_revenue),
    }
