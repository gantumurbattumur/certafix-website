import enum
from datetime import datetime
from decimal import Decimal
from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel


class PriceType(str, enum.Enum):
    FIXED = "FIXED"
    HOURLY = "HOURLY"
    STARTING_AT = "STARTING_AT"
    RANGE = "RANGE"


class ServiceCategory(SQLModel, table=True):
    __tablename__ = "service_categories"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str = Field(unique=True)
    slug: str = Field(unique=True, index=True)
    description: str | None = None
    image_url: str | None = None
    is_active: bool = Field(default=True)
    sort_order: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    services: list["Service"] = Relationship(back_populates="category")


class Service(SQLModel, table=True):
    __tablename__ = "services"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    category_id: UUID = Field(foreign_key="service_categories.id")
    name: str
    slug: str = Field(unique=True, index=True)
    description: str
    short_description: str | None = None
    image_url: str | None = None
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    category: ServiceCategory | None = Relationship(back_populates="services")
    prices: list["ServicePrice"] = Relationship(back_populates="service")


class ServicePrice(SQLModel, table=True):
    __tablename__ = "service_prices"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    service_id: UUID = Field(foreign_key="services.id")
    name: str
    description: str | None = None
    price_type: PriceType
    price: Decimal = Field(max_digits=10, decimal_places=2)
    price_max: Decimal | None = Field(default=None, max_digits=10, decimal_places=2)
    unit: str | None = None
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    service: Service | None = Relationship(back_populates="prices")
