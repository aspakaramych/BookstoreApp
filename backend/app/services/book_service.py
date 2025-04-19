from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.book_model import Book
from app.schemas.book_schema import BookCreate, BookUpdate


async def create_book(db: AsyncSession, book: BookCreate):
    new_book = Book(
        title=book.title,
        author=book.author,
        publisher=book.publisher,
        pages=book.pages,
        price=book.price,
        amount=book.amount,
    )
    db.add(new_book)
    await db.commit()
    await db.refresh(new_book)
    return new_book


async def get_books(db: AsyncSession):
    print("Fetching books from the database...")
    query = select(Book)
    result = await db.execute(query)
    return result.scalars().all()


async def update_book(db: AsyncSession, book_id: int, book_data: BookUpdate):
    query = select(Book).where(Book.id == book_id)
    result = await db.execute(query)
    book = result.scalars().first()

    if not book:
        return None

    updated_book = book_data.dict(exclude_unset=True)
    for key, value in updated_book.items():
        setattr(book, key, value)

    await db.commit()
    await db.refresh(book)
    return book


async def delete_book(db: AsyncSession, book_id: int):
    query = select(Book).where(Book.id == book_id)
    result = await db.execute(query)
    book = result.scalars().first()
    if not book:
        return False
    await db.delete(book)
    await db.commit()
    return True
