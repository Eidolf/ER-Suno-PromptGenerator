#!/bin/bash

# Pre-Flight System: Setup Local CI Environment
# This script ensures all required dependencies are installed before running preflight checks.

set -e

echo "🔍 Scanning local environment for Pre-Flight dependencies..."

# Define required tools
TOOLS=("docker" "npm" "python3")

# Check base tools
for tool in "${TOOLS[@]}"; do
    if ! command -v "$tool" &> /dev/null; then
        echo "❌ Error: $tool is not installed. Please install it first."
        exit 1
    else
        echo "✅ $tool is installed."
    fi
done

# Check Docker Daemon
if ! docker info &> /dev/null; then
    echo "❌ Error: Docker daemon is not running. Please start Docker."
    exit 1
else
    echo "✅ Docker daemon is running."
fi

# Check for act (Local GitHub Actions runner)
if ! command -v act &> /dev/null; then
    echo "⚠️ 'act' is not installed."
    echo "⏳ Attempting self-healing installation of 'act'..."
    
    if command -v brew &> /dev/null; then
        brew install act
    else
        curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
    fi
    
    if ! command -v act &> /dev/null; then
        echo "❌ Failed to install 'act'. Please install manually: https://nektosact.com/installation/index.html"
        exit 1
    fi
    echo "✅ 'act' successfully installed."
else
    echo "✅ 'act' is installed."
fi

echo "🎉 All local CI dependencies are met! You can now run ./scripts/preflight.sh"
exit 0
