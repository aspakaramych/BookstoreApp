from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.book_schema import BookCreate, BookResponse, BookUpdate
from app.services.book_service import get_books, create_book, update_book, delete_book

router = APIRouter()

@router.post("/books", response_model=BookResponse)
async def create_book_route(book_data: BookCreate, db: AsyncSession = Depends(get_db)):
    new_book = await create_book(db, book_data)
    return new_book

@router.get("/books", response_model=list[BookResponse])
async def get_books_route(db: AsyncSession = Depends(get_db)):
    print("Database session:", db)
    try:
        books = await get_books(db)
        return books
    except Exception as e:
        print(f"Error fetching books: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/books/{book_id}", response_model=BookResponse)
async def update_book_route(book_id: int, book_data: BookUpdate, db: AsyncSession = Depends(get_db)):
    updated_book = await update_book(db, book_id, book_data)
    if updated_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return updated_book

@router.delete("/books/{book_id}")
async def delete_book_route(book_id: int, db: AsyncSession = Depends(get_db)):
     success = await delete_book(db, book_id)
     if not success:
         raise HTTPException(status_code=404, detail="Book not found")
     return {"message": "Book deleted"}
