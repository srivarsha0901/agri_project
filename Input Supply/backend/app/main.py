from fastapi import FastAPI
from app.api.v1 import dealers,products

app = FastAPI(title="Input Supply API", version="1.0.0")

app.include_router(dealers.router, prefix="/api/v1/input")

app.include_router(products.router, prefix="/api/v1/input")

@app.get("/api/v1/input/health")
def health_check():
    return {"status": "ok", "message": "Input Supply API is running"}