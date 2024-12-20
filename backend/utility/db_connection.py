import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

# Use aiosqlite as the driver for SQLite
DATABASE_URL = "sqlite+aiosqlite:///./test.db"
# Replace with below code for sqlserver
# username = os.getenv("DB_USERNAME")
# password = os.getenv("DB_PASSWORD")
# server = os.getenv("DB_SERVER")
# database = os.getenv("DB_NAME")
# DATABASE_URL = f"mssql+aioodbc://{username}:{password}@{server}/{database}?driver=ODBC+Driver+17+for+SQL+Server&TrustServerCertificate=yes

# Create the async engine with the updated URL
engine = create_async_engine(DATABASE_URL)

# Create the session maker to work with async sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)

# Create the base class for models
Base = declarative_base()

# Dependency to get a database session
async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        await db.close()
