from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.bookings import router as bookings_router
from app.api.v1.catalog import router as catalog_router
from app.api.v1.payments import router as payments_router
from app.api.v1.quotes import router as quotes_router
from app.api.v1.services import router as services_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth_router)
api_router.include_router(services_router)
api_router.include_router(catalog_router)
api_router.include_router(bookings_router)
api_router.include_router(quotes_router)
api_router.include_router(payments_router)
