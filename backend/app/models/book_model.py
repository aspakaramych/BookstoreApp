from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Book(Base):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, index=True)
    author = Column(String, index=True)
    publisher = Column(String, index=True)
    pages = Column(Integer, index=True)
    price = Column(Float, index=True)
    amount = Column(Integer, index=True)
