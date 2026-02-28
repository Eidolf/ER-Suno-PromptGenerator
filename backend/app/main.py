from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from app.api import endpoints

app = FastAPI(title="Suno Prompt Generator API", version="1.0.0")

# Security headers & CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In prod, restrict this 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response

app.include_router(endpoints.router, prefix="/api/v1")

FastAPIInstrumentor.instrument_app(app)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/ready")
def readiness_check():
    return {"status": "ready"}
