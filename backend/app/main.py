from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel.ext.asyncio.session import AsyncSession

from app.api.deps import get_current_admin, get_db
from app.api.v1.router import api_router
from app.config import settings
from app.services.booking_service import get_booking_stats
from app.services.quote_service import get_quote_stats


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(
    title="CertaFix API",
    description="Handyman Services REST API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.website_url, settings.admin_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok"}


@app.get("/api/v1/admin/dashboard")
async def admin_dashboard(
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    booking_stats = await get_booking_stats(db)
    quote_stats = await get_quote_stats(db)
    return {
        "bookings": booking_stats,
        "quotes": quote_stats,
    }
