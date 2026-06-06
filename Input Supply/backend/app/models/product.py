from sqlalchemy import Column, String, DateTime, Float, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid
from datetime import datetime

class Product(Base):
    __tablename__ = "input_products"

    product_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dealer_id = Column(UUID(as_uuid=True), ForeignKey("input_dealers.dealer_id"), nullable=False)
    product_name = Column(String(200), nullable=False)
    brand = Column(String(100))
    pack_size = Column(String(50))
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    status = Column(String(50), default="listed")
    created_at = Column(DateTime, default=datetime.utcnow)