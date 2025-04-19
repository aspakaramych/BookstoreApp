from app.database import engine
from app.models.book_model import Base
from app.routers.book_router import router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI(
    title="Bookstore API",
    description="API for managing books in a bookstore",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*']
)
app.include_router(router, prefix="/api", tags=["books"])

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
