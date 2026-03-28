from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.quote import QuoteRequest, QuoteStatus


async def get_quote_stats(db: AsyncSession) -> dict:
    """Get quote request statistics for the admin dashboard."""
    result = await db.exec(select(QuoteRequest))
    all_quotes = result.all()

    pending = sum(1 for q in all_quotes if q.status == QuoteStatus.PENDING)
    quoted = sum(1 for q in all_quotes if q.status == QuoteStatus.QUOTED)
    accepted = sum(1 for q in all_quotes if q.status == QuoteStatus.ACCEPTED)

    return {
        "total_quotes": len(all_quotes),
        "pending": pending,
        "quoted": quoted,
        "accepted": accepted,
    }
