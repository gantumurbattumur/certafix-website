from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.api.deps import get_db
from app.models.service import Service, ServiceCategory, ServicePrice
from app.schemas.service import ServiceCategoryOut, ServiceOut

router = APIRouter(prefix="/services", tags=["Services"])


@router.get("", response_model=list[ServiceCategoryOut])
async def list_services(db: AsyncSession = Depends(get_db)):
    """List all active service categories with their active services and prices."""
    result = await db.exec(
        select(ServiceCategory)
        .where(ServiceCategory.is_active == True)
        .order_by(ServiceCategory.sort_order)
    )
    categories = result.all()

    out = []
    for cat in categories:
        services_result = await db.exec(
            select(Service)
            .where(Service.category_id == cat.id, Service.is_active == True)
        )
        services = services_result.all()

        service_list = []
        for svc in services:
            prices_result = await db.exec(
                select(ServicePrice)
                .where(ServicePrice.service_id == svc.id, ServicePrice.is_active == True)
            )
            svc.prices = prices_result.all()
            service_list.append(svc)

        cat.services = service_list
        out.append(cat)
    return out


@router.get("/{slug}", response_model=ServiceOut)
async def get_service_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    """Get a single service by slug with its prices."""
    result = await db.exec(
        select(Service).where(Service.slug == slug, Service.is_active == True)
    )
    service = result.first()
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")

    prices_result = await db.exec(
        select(ServicePrice)
        .where(ServicePrice.service_id == service.id, ServicePrice.is_active == True)
    )
    service.prices = prices_result.all()
    return service
