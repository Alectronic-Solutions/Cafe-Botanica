#!/usr/bin/env python3
"""
generate-gazette.py

Reads menu, gatherings, and hours from src/data/botanica.ts via regex
and drafts the Sunday Gazette email. Output goes to stdout — pipe to a file
or paste directly into your mailer.

Usage:
    python scripts/generate-gazette.py
    python scripts/generate-gazette.py > gazette-draft.txt
"""

import re
import sys
import datetime
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA = ROOT / "src" / "data" / "botanica.ts"


def extract(pattern: str, text: str, group: int = 1) -> str:
    m = re.search(pattern, text)
    return m.group(group).strip() if m else ""


def extract_all(pattern: str, text: str) -> list[tuple]:
    return re.findall(pattern, text)


def parse_botanica(src: str) -> dict:
    cafe_name = extract(r'cafeName\s*=\s*"([^"]+)"', src)
    address = extract(r'cafeAddress\s*=\s*"([^"]+)"', src)

    # Menu items: match only objects that have description AND price AND isAvailable
    # (category objects have name+note+items, not description+price)
    items_raw = extract_all(
        r'\{\s*name:\s*"([^"]+)"[^{}]*?description:\s*"([^"]+)"[^{}]*?price:\s*(\d+)[^{}]*?isAvailable:\s*(true|false)[^{}]*?\}',
        src,
    )
    available = [(n, d, int(p)) for n, d, p, a in items_raw if a == "true"]
    unavailable = [n for n, d, p, a in items_raw if a == "false"]

    # Gatherings
    gatherings_raw = extract_all(
        r'title:\s*"([^"]+)"[^}]*?date:\s*"([^"]+)"[^}]*?time:\s*"([^"]+)"[^}]*?seats:\s*(\d+)[^}]*?detail:\s*"([^"]+)"',
        src,
    )

    # Hours note — last `note:` in the file, inside OperatingHours
    all_notes = re.findall(r'note:\s*"([^"]+)"', src)
    hours_note = all_notes[-1] if all_notes else ""

    return {
        "cafe_name": cafe_name,
        "address": address,
        "available": available,
        "unavailable": unavailable,
        "gatherings": gatherings_raw,
        "hours_note": hours_note,
    }


def fmt_date(iso: str) -> str:
    try:
        d = datetime.date.fromisoformat(iso)
        return d.strftime("%B %-d")  # e.g. July 9 — Linux/Mac
    except Exception:
        return iso


def render(data: dict) -> str:
    today = datetime.date.today()
    month_year = today.strftime("%B %Y").upper()
    lines: list[str] = []

    lines.append(f"GAZETTE — {month_year}")
    lines.append(f"{data['cafe_name']}  ·  {data['address']}")
    lines.append("=" * 64)
    lines.append("")

    lines.append("ON THE MENU")
    lines.append("-" * 32)
    for name, desc, price in data["available"]:
        lines.append(f"  {name:<28}  ${price:.2f}")
        lines.append(f"    {desc}")
    lines.append("")

    if data["unavailable"]:
        lines.append("86'D THIS WEEK")
        lines.append("-" * 32)
        for name in data["unavailable"]:
            lines.append(f"  {name}")
        lines.append("")

    if data["gatherings"]:
        lines.append("GATHERINGS")
        lines.append("-" * 32)
        for title, date, time, seats, detail in data["gatherings"]:
            lines.append(f"  {fmt_date(date)}  {time}  —  {title}  ({seats} seats)")
            lines.append(f"    {detail}")
        lines.append("")

    if data["hours_note"]:
        lines.append("HOURS NOTE")
        lines.append("-" * 32)
        lines.append(f"  {data['hours_note']}")
        lines.append("")

    lines.append("=" * 64)
    lines.append("Unsubscribe by replying REMOVE. Pouring since 1974.")

    return "\n".join(lines)


def main() -> None:
    if not DATA.exists():
        print(f"Error: {DATA} not found.", file=sys.stderr)
        sys.exit(1)

    src = DATA.read_text(encoding="utf-8")
    data = parse_botanica(src)
    print(render(data))


if __name__ == "__main__":
    main()
