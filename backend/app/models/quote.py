import enum
from datetime import datetime
from decimal import Decimal
from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel


class QuoteStatus(str, enum.Enum):
    PENDING = "PENDING"
    QUOTED = "QUOTED"
    ACCEPTED = "ACCEPTED"
    DECLINED = "DECLINED"
    EXPIRED = "EXPIRED"


class QuoteRequest(SQLModel, table=True):
    __tablename__ = "quote_requests"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    customer_name: str
    customer_email: str
    customer_phone: str
    address: str
    city: str
    zip_code: str
    description: str
    status: QuoteStatus = Field(default=QuoteStatus.PENDING)
    admin_notes: str | None = None
    quoted_amount: Decimal | None = Field(default=None, max_digits=10, decimal_places=2)
    quoted_at: datetime | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    items: list["QuoteItem"] = Relationship(back_populates="quote")


class QuoteItem(SQLModel, table=True):
    __tablename__ = "quote_items"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    quote_id: UUID = Field(foreign_key="quote_requests.id")
    service_id: UUID | None = Field(default=None, foreign_key="services.id")
    service_price_id: UUID | None = Field(default=None, foreign_key="service_prices.id")
    description: str
    estimated_price: Decimal | None = Field(default=None, max_digits=10, decimal_places=2)

    quote: QuoteRequest | None = Relationship(back_populates="items")
