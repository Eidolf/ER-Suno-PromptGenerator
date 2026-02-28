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

import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

# When running via `python -m uvicorn app.main:app` from /app, __file__ might be app/main.py.
# Using absolute Path resolving to anchor to the app directory reliably:
base_dir = Path(__file__).resolve().parent.parent
frontend_dir = base_dir.parent / "frontend" / "dist"

if frontend_dir.exists():
    assets_dir = frontend_dir / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_frontend(full_path: str):
        path = frontend_dir / full_path
        if path.is_file():
            return FileResponse(str(path))
        return FileResponse(str(frontend_dir / "index.html"))
