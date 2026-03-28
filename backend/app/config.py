from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql+asyncpg://localhost:5432/certafix"

    # Auth
    secret_key: str = "change-me-in-production"
    admin_email: str = "admin@certafix.com"
    admin_password_hash: str = ""
    access_token_expire_hours: int = 24
    algorithm: str = "HS256"

    # Stripe
    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""

    # CORS
    website_url: str = "http://localhost:3000"
    admin_url: str = "http://localhost:3011"

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "ignore",
    }


settings = Settings()
