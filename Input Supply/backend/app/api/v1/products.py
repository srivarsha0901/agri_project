from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.product import Product
from app.models.dealer import Dealer
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

router = APIRouter()

# Request model
class ProductCreateRequest(BaseModel):
    product_name: str
    product_type: str
    brand: str
    pack_size: str
    selling_price: float
    stock_quantity: int

# POST - Create product
@router.post("/dealers/{dealer_id}/products")
def create_product(dealer_id: str, request: ProductCreateRequest, db: Session = Depends(get_db)):
    # Check dealer exists
    dealer = db.query(Dealer).filter(Dealer.dealer_id == dealer_id).first()
    if not dealer:
        raise HTTPException(status_code=404, detail="Dealer not found")
    
    # Validation
    if len(request.product_name) > 200:
        raise HTTPException(status_code=400, detail="Product name too long")
    if request.selling_price <= 0:
        raise HTTPException(status_code=400, detail="Price must be greater than 0")
    if request.stock_quantity < 0:
        raise HTTPException(status_code=400, detail="Stock cannot be negative")

    product = Product(
        dealer_id=dealer_id,
        product_name=request.product_name,
        brand=request.brand,
        pack_size=request.pack_size,
        price=request.selling_price,
        stock=request.stock_quantity,
        status="listed"
    )
    db.add(product)
    db.commit()
    db.refresh(product)

    return {
        "product_id": str(product.product_id),
        "dealer_id": str(product.dealer_id),
        "product_name": product.product_name,
        "selling_price": product.price,
        "status": product.status,
        "created_at": product.created_at
    }

# GET - Get product by ID
@router.get("/products/{product_id}")
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "product_id": str(product.product_id),
        "dealer_id": str(product.dealer_id),
        "product_name": product.product_name,
        "brand": product.brand,
        "pack_size": product.pack_size,
        "selling_price": product.price,
        "stock": product.stock,
        "status": product.status,
"created_at": product.created_at.strftime("%Y-%m-%dT%H:%M:%SZ")
    }

# PUT - Update product
@router.put("/products/{product_id}")
def update_product(product_id: str, request: ProductCreateRequest, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product.product_name = request.product_name
    product.brand = request.brand
    product.pack_size = request.pack_size
    product.price = request.selling_price
    product.stock = request.stock_quantity
    db.commit()
    db.refresh(product)

    return {
        "product_id": str(product.product_id),
        "product_name": product.product_name,
        "brand": product.brand,
        "pack_size": product.pack_size,
        "selling_price": product.price,
        "stock": product.stock,
        "status": product.status,
        "created_at": product.created_at.strftime("%Y-%m-%dT%H:%M:%SZ")
    }

# DELETE - Delete product
@router.delete("/products/{product_id}")
def delete_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product.status = "deleted"
    db.commit()

    return {"message": "Product deleted successfully"}