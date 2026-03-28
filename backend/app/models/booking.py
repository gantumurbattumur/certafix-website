import enum
from datetime import datetime
from decimal import Decimal
from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel


class BookingStatus(str, enum.Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"


class Booking(SQLModel, table=True):
    __tablename__ = "bookings"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    customer_name: str
    customer_email: str
    customer_phone: str
    address: str
    city: str
    zip_code: str
    preferred_date: datetime
    preferred_time_slot: str
    notes: str | None = None
    status: BookingStatus = Field(default=BookingStatus.PENDING)
    total_estimate: Decimal | None = Field(default=None, max_digits=10, decimal_places=2)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    items: list["BookingItem"] = Relationship(back_populates="booking")


class BookingItem(SQLModel, table=True):
    __tablename__ = "booking_items"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    booking_id: UUID = Field(foreign_key="bookings.id")
    service_id: UUID = Field(foreign_key="services.id")
    service_price_id: UUID = Field(foreign_key="service_prices.id")
    quantity: int = Field(default=1)
    unit_price: Decimal = Field(max_digits=10, decimal_places=2)
    subtotal: Decimal = Field(max_digits=10, decimal_places=2)

    booking: Booking | None = Relationship(back_populates="items")
