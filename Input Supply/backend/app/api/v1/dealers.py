from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.dealer import Dealer
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# Request model
class DealerRegisterRequest(BaseModel):
    business_name: str
    phone_number: str
    service_district: str

# Response model
class DealerRegisterResponse(BaseModel):
    dealer_id: str
    business_name: str
    status: str
    created_at: str  

@router.post("/dealers/register", response_model=DealerRegisterResponse)
def register_dealer(request: DealerRegisterRequest, db: Session = Depends(get_db)):
    # Validation
    if len(request.business_name) < 5:
        raise HTTPException(status_code=400, detail="Business name must be at least 5 characters")
    if len(request.phone_number) != 10 or not request.phone_number.isdigit():
        raise HTTPException(status_code=400, detail="Phone number must be exactly 10 digits")
    
    # Create dealer
    dealer = Dealer(
        business_name=request.business_name,
    phone=request.phone_number,
    service_district=request.service_district,
    status="active"
    )
    db.add(dealer)
    db.commit()
    db.refresh(dealer)

    return DealerRegisterResponse(
        dealer_id=str(dealer.dealer_id),
        business_name=dealer.business_name,
        status=dealer.status,
        phone_number=dealer.phone,
        created_at=dealer.created_at.strftime("%Y-%m-%dT%H:%M:%SZ")

    )

# GET dealer by ID
@router.get("/dealers/{dealer_id}")
def get_dealer(dealer_id: str, db: Session = Depends(get_db)):
    dealer = db.query(Dealer).filter(Dealer.dealer_id == dealer_id).first()
    if not dealer:
        raise HTTPException(status_code=404, detail="Dealer not found")
    return {
        "dealer_id": str(dealer.dealer_id),
        "business_name": dealer.business_name,
        "phone_number": dealer.phone,
        "status": dealer.status,
    "created_at": dealer.created_at.strftime("%Y-%m-%dT%H:%M:%SZ")
    }

# PUT update dealer
@router.put("/dealers/{dealer_id}")
def update_dealer(dealer_id: str, request: DealerRegisterRequest, db: Session = Depends(get_db)):
    dealer = db.query(Dealer).filter(Dealer.dealer_id == dealer_id).first()
    if not dealer:
        raise HTTPException(status_code=404, detail="Dealer not found")
    
    dealer.business_name = request.business_name
    dealer.phone = request.phone_number
    db.commit()
    db.refresh(dealer)

    return {
        "dealer_id": str(dealer.dealer_id),
        "business_name": dealer.business_name,
        "phone_number": dealer.phone,
        "status": dealer.status,
    "created_at": dealer.created_at.strftime("%Y-%m-%dT%H:%M:%SZ")
    }   