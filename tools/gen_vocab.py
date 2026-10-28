#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate compact per-level vocabulary JSON for 开心学单词 · 考试词库.

Usage:
  python3 tools/gen_vocab.py            # full vocabulary
  python3 tools/gen_vocab.py 40         # sample: 40 words per level (for preview)

Reads the open dataset at SRC and writes words-funny/data/<id>.json plus
data/levels.json (manifest with true totals).
"""
import json
import os
import sys

SRC = "/Users/changxueyi/code/study/english-vocabulary"
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(HERE, "data")

# id, 中文名, 英文名, emoji, 主题色, 顺序json, 音标来源jsonl
LEVELS = [
    ("junior", "初中", "Junior High", "🏫", "#2fb867", "1-初中-顺序.json", "初中.jsonl"),
    ("senior", "高中", "Senior High", "🎒", "#ff8a3d", "2-高中-顺序.json", "高中.jsonl"),
    ("cet4", "四级 CET4", "CET-4", "4\ufe0f\u20e3", "#2fa9d6", "3-CET4-顺序.json", "四级.jsonl"),
    ("cet6", "六级 CET6", "CET-6", "6\ufe0f\u20e3", "#8a6cff", "4-CET6-顺序.json", "六级.jsonl"),
    ("kaoyan", "考研", "Postgraduate", "🎓", "#ff6b8b", "5-考研-顺序.json", "考研.jsonl"),
    ("toefl", "托福 TOEFL", "TOEFL", "✈️", "#1fb6a6", "6-托福-顺序.json", "托福.jsonl"),
    ("sat", "SAT", "SAT", "🗽", "#e0533b", "7-SAT-顺序.json", "SAT.jsonl"),
]


def build_phonetics(jsonl_name):
    path = os.path.join(SRC, "full_line_jsonl", "full", "正序", jsonl_name)
    phon = {}
    if not os.path.exists(path):
        return phon
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                o = json.loads(line)
            except Exception:
                continue
            hw = o.get("headWord")
            c = (o.get("content") or {}).get("word", {}).get("content", {}) or {}
            p = c.get("usphone") or c.get("ukphone") or ""
            if hw and hw not in phon:
                phon[hw] = p
    return phon


def fmt_translations(trans):
    parts = []
    for tr in trans or []:
        t = (tr.get("translation") or "").strip()
        if not t:
            continue
        pos = (tr.get("type") or "").strip()
        parts.append((pos + ". " + t) if pos else t)
    return "  ".join(parts)


def main():
    limit = int(sys.argv[1]) if len(sys.argv) > 1 else None
    os.makedirs(OUT, exist_ok=True)
    manifest = []
    for lid, name, en, emoji, color, jf, jl in LEVELS:
        data = json.load(open(os.path.join(SRC, "json", jf), encoding="utf-8"))
        total = len(data)
        phon = build_phonetics(jl)
        subset = data[:limit] if limit else data
        words = []
        for item in subset:
            w = item.get("word") or ""
            if not w:
                continue
            words.append({"w": w, "p": phon.get(w, ""), "t": fmt_translations(item.get("translations"))})
        payload = {"id": lid, "name": name, "en": en, "total": total, "count": len(words), "words": words}
        with open(os.path.join(OUT, lid + ".json"), "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))
        manifest.append({"id": lid, "name": name, "en": en, "emoji": emoji, "color": color, "total": total, "count": len(words)})
        print("%-8s %-12s total=%-6d written=%-6d phon=%d" % (lid, name, total, len(words), len(phon)))
    with open(os.path.join(OUT, "levels.json"), "w", encoding="utf-8") as f:
        json.dump({"sample": bool(limit), "levels": manifest}, f, ensure_ascii=False)
    grand = sum(m["total"] for m in manifest)
    print("---\nlevels: %d  grand total words: %d  sample=%s" % (len(manifest), grand, bool(limit)))


if __name__ == "__main__":
    main()
