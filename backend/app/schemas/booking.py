from decimal import Decimal
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr

from app.models.booking import BookingStatus


# ── Request Schemas ──────────────────────────────────────

class BookingItemCreate(BaseModel):
    service_id: UUID
    service_price_id: UUID
    quantity: int = 1


class BookingCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    address: str
    city: str
    zip_code: str
    preferred_date: datetime
    preferred_time_slot: str  # "morning", "afternoon", "evening"
    notes: str | None = None
    items: list[BookingItemCreate]


class BookingStatusUpdate(BaseModel):
    status: BookingStatus


# ── Response Schemas ─────────────────────────────────────

class BookingItemOut(BaseModel):
    id: UUID
    service_id: UUID
    service_price_id: UUID
    service_name: str | None = None
    price_name: str | None = None
    quantity: int
    unit_price: Decimal
    subtotal: Decimal

    model_config = {"from_attributes": True}


class BookingOut(BaseModel):
    id: UUID
    customer_name: str
    customer_email: str
    customer_phone: str
    address: str
    city: str
    zip_code: str
    preferred_date: datetime
    preferred_time_slot: str
    notes: str | None
    status: BookingStatus
    total_estimate: Decimal | None
    created_at: datetime
    updated_at: datetime
    items: list[BookingItemOut] = []

    model_config = {"from_attributes": True}


class BookingListOut(BaseModel):
    id: UUID
    customer_name: str
    customer_email: str
    customer_phone: str
    preferred_date: datetime
    preferred_time_slot: str
    status: BookingStatus
    total_estimate: Decimal | None
    created_at: datetime

    model_config = {"from_attributes": True}
