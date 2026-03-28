from decimal import Decimal
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel

from app.models.service import PriceType


# ── Request Schemas ──────────────────────────────────────

class ServiceCategoryCreate(BaseModel):
    name: str
    slug: str
    description: str | None = None
    image_url: str | None = None
    sort_order: int = 0


class ServiceCategoryUpdate(BaseModel):
    name: str | None = None
    slug: str | None = None
    description: str | None = None
    image_url: str | None = None
    is_active: bool | None = None
    sort_order: int | None = None


class ServiceCreate(BaseModel):
    category_id: UUID
    name: str
    slug: str
    description: str
    short_description: str | None = None
    image_url: str | None = None


class ServiceUpdate(BaseModel):
    category_id: UUID | None = None
    name: str | None = None
    slug: str | None = None
    description: str | None = None
    short_description: str | None = None
    image_url: str | None = None
    is_active: bool | None = None


class ServicePriceCreate(BaseModel):
    service_id: UUID
    name: str
    description: str | None = None
    price_type: PriceType
    price: Decimal
    price_max: Decimal | None = None
    unit: str | None = None


class ServicePriceUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    price_type: PriceType | None = None
    price: Decimal | None = None
    price_max: Decimal | None = None
    unit: str | None = None
    is_active: bool | None = None


# ── Response Schemas ─────────────────────────────────────

class ServicePriceOut(BaseModel):
    id: UUID
    service_id: UUID
    name: str
    description: str | None
    price_type: PriceType
    price: Decimal
    price_max: Decimal | None
    unit: str | None
    is_active: bool

    model_config = {"from_attributes": True}


class ServiceOut(BaseModel):
    id: UUID
    category_id: UUID
    name: str
    slug: str
    description: str
    short_description: str | None
    image_url: str | None
    is_active: bool
    created_at: datetime
    prices: list[ServicePriceOut] = []

    model_config = {"from_attributes": True}


class ServiceCategoryOut(BaseModel):
    id: UUID
    name: str
    slug: str
    description: str | None
    image_url: str | None
    is_active: bool
    sort_order: int
    services: list[ServiceOut] = []

    model_config = {"from_attributes": True}


class ServiceCategoryListOut(BaseModel):
    id: UUID
    name: str
    slug: str
    description: str | None
    image_url: str | None
    is_active: bool
    sort_order: int
    service_count: int = 0

    model_config = {"from_attributes": True}
