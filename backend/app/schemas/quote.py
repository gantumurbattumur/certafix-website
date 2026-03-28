from decimal import Decimal
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr

from app.models.quote import QuoteStatus


# ── Request Schemas ──────────────────────────────────────

class QuoteItemCreate(BaseModel):
    service_id: UUID | None = None
    service_price_id: UUID | None = None
    description: str
    estimated_price: Decimal | None = None


class QuoteCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    address: str
    city: str
    zip_code: str
    description: str
    items: list[QuoteItemCreate] = []


class QuoteRespond(BaseModel):
    status: QuoteStatus | None = None
    admin_notes: str | None = None
    quoted_amount: Decimal | None = None


# ── Response Schemas ─────────────────────────────────────

class QuoteItemOut(BaseModel):
    id: UUID
    service_id: UUID | None
    service_price_id: UUID | None
    description: str
    estimated_price: Decimal | None

    model_config = {"from_attributes": True}


class QuoteOut(BaseModel):
    id: UUID
    customer_name: str
    customer_email: str
    customer_phone: str
    address: str
    city: str
    zip_code: str
    description: str
    status: QuoteStatus
    admin_notes: str | None
    quoted_amount: Decimal | None
    quoted_at: datetime | None
    created_at: datetime
    updated_at: datetime
    items: list[QuoteItemOut] = []

    model_config = {"from_attributes": True}


class QuoteListOut(BaseModel):
    id: UUID
    customer_name: str
    customer_email: str
    description: str
    status: QuoteStatus
    quoted_amount: Decimal | None
    created_at: datetime

    model_config = {"from_attributes": True}
