from typing import Optional
from pydantic import BaseModel

class BookCreate(BaseModel):
    title: str
    author: str
    publisher: str
    pages: int
    price: float
    amount: int

class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    publisher: str
    pages: int
    price: float
    amount: int
    class Config:
        from_attributes = True

class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    publisher: Optional[str] = None
    pages: Optional[int] = None
    price: Optional[float] = None
    amount: Optional[int] = None