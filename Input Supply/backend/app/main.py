from fastapi import FastAPI

app = FastAPI(title="Input Supply API", version="1.0.0")

@app.get("/api/v1/input/health")
def health_check():
    return {"status": "ok", "message": "Input Supply API is running"}