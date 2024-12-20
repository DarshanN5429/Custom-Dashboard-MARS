from sqlalchemy import Column, Integer, String, Text
from utility.db_connection import Base

class Widget(Base):
    __tablename__ = "widgets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    chart_type = Column(String(50), nullable=True)
    query = Column(Text, nullable=True)
    length = Column(Integer, nullable=True)
    width = Column(Integer, nullable=True)
    created_by = Column(String(255), nullable=True)
