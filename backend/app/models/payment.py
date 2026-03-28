import enum
from datetime import datetime
from decimal import Decimal
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class PaymentStatus(str, enum.Enum):
    PENDING = "PENDING"
    SUCCEEDED = "SUCCEEDED"
    FAILED = "FAILED"
    REFUNDED = "REFUNDED"


class Payment(SQLModel, table=True):
    __tablename__ = "payments"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    booking_id: UUID = Field(foreign_key="bookings.id", unique=True)
    stripe_payment_intent_id: str = Field(unique=True)
    amount: Decimal = Field(max_digits=10, decimal_places=2)
    currency: str = Field(default="usd")
    status: PaymentStatus = Field(default=PaymentStatus.PENDING)
    paid_at: datetime | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
