from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.api.deps import get_current_admin, get_db
from app.models.service import Service, ServiceCategory, ServicePrice
from app.schemas.service import (
    ServiceCategoryCreate,
    ServiceCategoryOut,
    ServiceCategoryUpdate,
    ServiceCreate,
    ServiceOut,
    ServicePriceCreate,
    ServicePriceOut,
    ServicePriceUpdate,
    ServiceUpdate,
)

router = APIRouter(prefix="/admin/catalog", tags=["Catalog (Admin)"])


# ── Categories ───────────────────────────────────────────

@router.get("/categories", response_model=list[ServiceCategoryOut])
async def list_categories(
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    result = await db.exec(select(ServiceCategory).order_by(ServiceCategory.sort_order))
    categories = result.all()
    for cat in categories:
        svc_result = await db.exec(select(Service).where(Service.category_id == cat.id))
        services = svc_result.all()
        for svc in services:
            p_result = await db.exec(select(ServicePrice).where(ServicePrice.service_id == svc.id))
            svc.prices = p_result.all()
        cat.services = services
    return categories


@router.post("/categories", response_model=ServiceCategoryOut, status_code=status.HTTP_201_CREATED)
async def create_category(
    body: ServiceCategoryCreate,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    category = ServiceCategory(**body.model_dump())
    db.add(category)
    await db.commit()
    await db.refresh(category)
    category.services = []
    return category


@router.put("/categories/{category_id}", response_model=ServiceCategoryOut)
async def update_category(
    category_id: UUID,
    body: ServiceCategoryUpdate,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    category = await db.get(ServiceCategory, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(category, key, value)
    db.add(category)
    await db.commit()
    await db.refresh(category)
    svc_result = await db.exec(select(Service).where(Service.category_id == category.id))
    category.services = svc_result.all()
    return category


@router.delete("/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
    category_id: UUID,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    category = await db.get(ServiceCategory, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    category.is_active = False
    db.add(category)
    await db.commit()


# ── Services ─────────────────────────────────────────────

@router.post("/services", response_model=ServiceOut, status_code=status.HTTP_201_CREATED)
async def create_service(
    body: ServiceCreate,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    service = Service(**body.model_dump())
    db.add(service)
    await db.commit()
    await db.refresh(service)
    service.prices = []
    return service


@router.put("/services/{service_id}", response_model=ServiceOut)
async def update_service(
    service_id: UUID,
    body: ServiceUpdate,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    service = await db.get(Service, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(service, key, value)
    db.add(service)
    await db.commit()
    await db.refresh(service)
    p_result = await db.exec(select(ServicePrice).where(ServicePrice.service_id == service.id))
    service.prices = p_result.all()
    return service


@router.delete("/services/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_service(
    service_id: UUID,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    service = await db.get(Service, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    service.is_active = False
    db.add(service)
    await db.commit()


# ── Prices ───────────────────────────────────────────────

@router.post("/prices", response_model=ServicePriceOut, status_code=status.HTTP_201_CREATED)
async def create_price(
    body: ServicePriceCreate,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    price = ServicePrice(**body.model_dump())
    db.add(price)
    await db.commit()
    await db.refresh(price)
    return price


@router.put("/prices/{price_id}", response_model=ServicePriceOut)
async def update_price(
    price_id: UUID,
    body: ServicePriceUpdate,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    price = await db.get(ServicePrice, price_id)
    if not price:
        raise HTTPException(status_code=404, detail="Price not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(price, key, value)
    db.add(price)
    await db.commit()
    await db.refresh(price)
    return price


@router.delete("/prices/{price_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_price(
    price_id: UUID,
    db: AsyncSession = Depends(get_db),
    _admin: str = Depends(get_current_admin),
):
    price = await db.get(ServicePrice, price_id)
    if not price:
        raise HTTPException(status_code=404, detail="Price not found")
    price.is_active = False
    db.add(price)
    await db.commit()
