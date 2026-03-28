from decimal import Decimal
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel

from app.models.payment import PaymentStatus


class PaymentIntentCreate(BaseModel):
    booking_id: UUID


class PaymentOut(BaseModel):
    id: UUID
    booking_id: UUID
    stripe_payment_intent_id: str
    amount: Decimal
    currency: str
    status: PaymentStatus
    paid_at: datetime | None
    created_at: datetime

    model_config = {"from_attributes": True}
