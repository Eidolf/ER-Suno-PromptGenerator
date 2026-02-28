#!/bin/bash

# Pre-Flight System: Master Execution Script
# Runs fast local checks and orchestrates full GitHub Actions locally using 'act'.

set -e

# Resolve project root regardless of where script is called from
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

# ANSI Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting Pre-Flight Validation...${NC}"

# Ensure setup has been run
"$SCRIPT_DIR/setup_local_ci.sh"
echo ""

# Report variables
FAST_LINT_FRONTEND=0
FAST_LINT_BACKEND=0
ACT_WORKFLOWS=0

echo -e "${YELLOW}⚡ Running Fast Local Linters...${NC}"

# 1. Fast Frontend Lint
echo "🔧 Checking Frontend (ESLint)..."
cd frontend
if npm install --silent && npm run lint; then
    echo -e "${GREEN}✅ Frontend lint passed.${NC}"
else
    echo -e "${RED}❌ Frontend lint failed.${NC}"
    FAST_LINT_FRONTEND=1
fi
cd ..

# 2. Fast Backend Lint
echo "🐍 Checking Backend (Ruff)..."
if ! command -v ruff &> /dev/null; then
    pip3 install --user ruff
    export PATH="$HOME/.local/bin:$PATH"
fi

if ruff check backend/; then
    echo -e "${GREEN}✅ Backend lint passed.${NC}"
else
    echo -e "${RED}❌ Backend lint failed.${NC}"
    FAST_LINT_BACKEND=1
fi

echo ""
echo -e "${YELLOW}🎬 Executing GitHub Actions Workflows Locally (act)...${NC}"

# Determine secrets file argument
ACT_ARGS=""
if [ -f ".secrets" ]; then
    echo "🔍 Found .secrets file, injecting into act..."
    ACT_ARGS="--secret-file .secrets"
else
    echo "ℹ️ No .secrets file found. Proceeding without injected secrets."
fi

# Run Lint workflow via act
echo "📋 Running Lint workflow..."
if act -W .github/workflows/lint.yml $ACT_ARGS; then
    echo -e "${GREEN}✅ Lint workflow passed.${NC}"
else
    echo -e "${RED}❌ Lint workflow failed.${NC}"
    ACT_WORKFLOWS=1
fi

# Run Test workflow via act
echo "🧪 Running Test workflow..."
if act -W .github/workflows/test.yml $ACT_ARGS; then
    echo -e "${GREEN}✅ Test workflow passed.${NC}"
else
    echo -e "${RED}❌ Test workflow failed.${NC}"
    ACT_WORKFLOWS=1
fi

# Run Docker Build natively (act can't do Docker-in-Docker)
echo ""
echo -e "${YELLOW}🐳 Running Docker Build (native)...${NC}"
DOCKER_BUILD=0
if docker build -t suno-prompt-generator .; then
    echo -e "${GREEN}✅ Docker build passed.${NC}"
else
    echo -e "${RED}❌ Docker build failed.${NC}"
    DOCKER_BUILD=1
fi

echo ""
echo "======================================"
echo -e "${YELLOW}📊 Pre-Flight Validation Report${NC}"
echo "======================================"

if [ $FAST_LINT_FRONTEND -eq 0 ]; then
    echo -e "Frontend Fast Lint: ${GREEN}PASS${NC}"
else
    echo -e "Frontend Fast Lint: ${RED}FAIL${NC}"
fi

if [ $FAST_LINT_BACKEND -eq 0 ]; then
    echo -e "Backend Fast Lint:  ${GREEN}PASS${NC}"
else
    echo -e "Backend Fast Lint:  ${RED}FAIL${NC}"
fi

if [ $ACT_WORKFLOWS -eq 0 ]; then
    echo -e "GitHub Actions:     ${GREEN}PASS${NC}"
else
    echo -e "GitHub Actions:     ${RED}FAIL${NC}"
fi

if [ $DOCKER_BUILD -eq 0 ]; then
    echo -e "Docker Build:       ${GREEN}PASS${NC}"
else
    echo -e "Docker Build:       ${RED}FAIL${NC}"
fi

echo "======================================"

if [ $FAST_LINT_FRONTEND -eq 0 ] && [ $FAST_LINT_BACKEND -eq 0 ] && [ $ACT_WORKFLOWS -eq 0 ] && [ $DOCKER_BUILD -eq 0 ]; then
    echo -e "${GREEN}🎉 All pre-flight checks passed! Safe to push.${NC}"
    exit 0
else
    echo -e "${RED}⚠️ Some pre-flight checks failed. Review the logs above before pushing.${NC}"
    exit 1
fi

