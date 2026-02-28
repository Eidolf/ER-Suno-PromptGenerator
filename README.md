# Suno Prompt Generator

A secure, production-ready full-stack application for generating Suno AI prompts.

![Logo](images/logo.png)

## Architecture
- **Backend:** Python (FastAPI), Pydantic, SQLAlchemy.
- **Frontend:** React, TypeScript, Vite.
- **DevOps:** GitHub Actions, Multi-stage Docker.

## Setup
1. Copy `.env.example` to `.env`.
2. Run `make install-backend` & `make install-frontend`.
3. Run `make dev-backend` & `make dev-frontend`.

## DevOps
Includes CI orchestrator, auto-formatting PR assistant, linting, tests, build (with SBOM generation via Syft), cleanup, and nightly checks.
