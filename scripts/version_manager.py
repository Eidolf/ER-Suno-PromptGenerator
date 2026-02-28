#!/usr/bin/env python3
"""
Version Manager for Suno Prompt Generator.
Format: YYYY.MM.PATCH[-suffix]

Usage:
    python3 version_manager.py calculate <nightly|beta|stable>
    python3 version_manager.py bump-dev
    python3 version_manager.py current
"""

import sys
import re
from datetime import datetime, timezone
from pathlib import Path

VERSION_FILE = Path(__file__).resolve().parent.parent / "VERSION"


def read_version() -> str:
    if VERSION_FILE.exists():
        return VERSION_FILE.read_text().strip()
    return "2026.01.0-dev"


def write_version(version: str) -> str:
    VERSION_FILE.write_text(version + "\n")
    return version


def parse_version(version: str) -> tuple:
    """Parse YYYY.MM.PATCH[-suffix] into components."""
    match = re.match(r"(\d{4})\.(\d{1,2})\.(\d+)(?:-(.+))?", version)
    if not match:
        raise ValueError(f"Invalid version format: {version}")
    return int(match.group(1)), int(match.group(2)), int(match.group(3)), match.group(4)


def calculate_version(release_type: str) -> str:
    now = datetime.now(timezone.utc)
    current = read_version()

    try:
        cur_year, cur_month, cur_patch, _ = parse_version(current)
    except ValueError:
        cur_year, cur_month, cur_patch = now.year, now.month, 0

    # Reset patch if month or year changed
    if now.year != cur_year or now.month != cur_month:
        patch = 1
    else:
        patch = cur_patch + 1

    base = f"{now.year}.{now.month:02d}.{patch}"

    if release_type == "stable":
        return base
    elif release_type == "beta":
        return f"{base}-beta"
    elif release_type == "nightly":
        timestamp = now.strftime("%Y%m%d.%H%M")
        return f"{base}-nightly.{timestamp}"
    else:
        raise ValueError(f"Unknown release type: {release_type}")


def bump_dev() -> str:
    current = read_version()
    try:
        year, month, patch, _ = parse_version(current)
        dev_version = f"{year}.{month:02d}.{patch + 1}-dev"
    except ValueError:
        now = datetime.now(timezone.utc)
        dev_version = f"{now.year}.{now.month:02d}.1-dev"
    return write_version(dev_version)


def main():
    if len(sys.argv) < 2:
        print("Usage: version_manager.py <calculate|bump-dev|current> [type]")
        sys.exit(1)

    command = sys.argv[1]

    if command == "current":
        print(read_version())
    elif command == "calculate":
        if len(sys.argv) < 3:
            print("Usage: version_manager.py calculate <nightly|beta|stable>")
            sys.exit(1)
        version = calculate_version(sys.argv[2])
        write_version(version)
        print(version)
    elif command == "bump-dev":
        version = bump_dev()
        print(version)
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)


if __name__ == "__main__":
    main()
