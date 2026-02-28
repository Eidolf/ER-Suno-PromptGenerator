# Suno Prompt Generator

A secure, production-ready full-stack application for generating Suno AI prompts.

![Logo](images/logo.png)

## Architecture
- **Backend:** Python (FastAPI), Pydantic, SQLAlchemy.
- **Frontend:** React, TypeScript, Vite.
- **DevOps:** GitHub Actions, Multi-stage Docker, Pre-Flight CI.

## Setup (Local Development)
1. Copy `.env.example` to `.env`.
2. Run `make install-backend` & `make install-frontend`.
3. Run `make dev-backend` & `make dev-frontend`.

## Docker Compose

### Option 1: Build locally

```yaml
services:
  suno-prompt-gen:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: suno-prompt-gen
    restart: unless-stopped
    ports:
      - "13050:13050"
    env_file:
      - .env
```

### Option 2: Pull from GitHub Container Registry

```yaml
services:
  suno-prompt-gen:
    image: ghcr.io/eidolf/er-suno-promptgenerator:latest
    container_name: suno-prompt-gen
    restart: unless-stopped
    ports:
      - "13050:13050"
    env_file:
      - .env
```

### Start

```bash
docker compose up -d
```

The app is available at `http://localhost:13050`.

## Pre-Flight (Local CI)

Run all checks locally before pushing:

```bash
./scripts/preflight.sh
```

This validates ESLint, Ruff, pytest, and Docker build in one command.

## Versioning

Version format: `YYYY.MM.PATCH[-suffix]` (e.g. `2026.02.3`, `2026.02.4-beta`).

```bash
python3 scripts/version_manager.py current        # Show current version
python3 scripts/version_manager.py calculate stable  # Calculate next stable
```

## DevOps

| Workflow | Purpose |
|----------|---------|
| `ci-orchestrator.yml` | Lint → Test → Docker validate |
| `pr-orchestrator.yml` | PR labeling & size classification |
| `release.yml` | Nightly / Beta / Stable releases |
| `rollback.yml` | Manual release rollback |

