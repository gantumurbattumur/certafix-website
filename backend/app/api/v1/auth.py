from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_db
from app.config import settings
from app.schemas.auth import LoginRequest, TokenResponse
from app.security.auth import create_access_token, verify_password

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=TokenResponse)
async def admin_login(body: LoginRequest):
    if body.email != settings.admin_email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    if not settings.admin_password_hash or not verify_password(
        body.password, settings.admin_password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    token = create_access_token({"sub": body.email})
    return TokenResponse(access_token=token)
