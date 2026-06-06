from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid
from datetime import datetime

class Dealer(Base):
    __tablename__ = "input_dealers"

    dealer_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    business_name = Column(String(255), nullable=False)
    phone = Column(String(15), nullable=False)
    service_district = Column(String(100))
    status = Column(String(50), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)