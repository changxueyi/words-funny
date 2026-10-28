#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate compact, lazy-loaded vocabulary files for the seven study levels."""
import json
import os
import sys

SRC = os.environ.get("ENGLISH_VOCAB_SOURCE", "/Users/changxueyi/code/study/english-vocabulary")
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(HERE, "data")

# id, Chinese name, English name, emoji, color, source JSON, detail JSONL, category
LEVELS = [
    ("junior", "初中", "Junior High", "🏫", "#2fb867", "1-初中-顺序.json", "初中.jsonl", "学段基础"),
    ("senior", "高中", "Senior High", "🎒", "#ff8a3d", "2-高中-顺序.json", "高中.jsonl", "学段基础"),
    ("cet4", "四级 CET4", "CET-4", "4\ufe0f\u20e3", "#2fa9d6", "3-CET4-顺序.json", "四级.jsonl", "升学与留学考试"),
    ("cet6", "六级 CET6", "CET-6", "6\ufe0f\u20e3", "#8a6cff", "4-CET6-顺序.json", "六级.jsonl", "升学与留学考试"),
    ("kaoyan", "考研", "Postgraduate", "🎓", "#ff6b8b", "5-考研-顺序.json", "考研.jsonl", "升学与留学考试"),
    ("toefl", "托福 TOEFL", "TOEFL", "✈️", "#1fb6a6", "6-托福-顺序.json", "托福.jsonl", "升学与留学考试"),
    ("sat", "SAT", "SAT", "🗽", "#e0533b", "7-SAT-顺序.json", "SAT.jsonl", "升学与留学考试"),
]


def load_details(jsonl_name):
    path = os.path.join(SRC, "full_line_jsonl", "full", "正序", jsonl_name)
    details = {}
    if not os.path.exists(path):
        return details
    with open(path, encoding="utf-8") as source:
        for line in source:
            try:
                record = json.loads(line)
            except json.JSONDecodeError:
                continue
            word = record.get("headWord")
            content = record.get("content", {}).get("word", {}).get("content", {}) or {}
            if not word or word in details:
                continue
            sentences = content.get("sentence", {}).get("sentences", []) or []
            example = next(
                (
                    (sentence.get("sContent", "").strip(), sentence.get("sCn", "").strip())
                    for sentence in sentences
                    if sentence.get("sContent", "").strip() and sentence.get("sCn", "").strip()
                ),
                None,
            )
            details[word] = {"p": (content.get("usphone") or "").strip(), "e": example}
    return details


def fmt_translations(translations):
    parts = []
    for item in translations or []:
        meaning = (item.get("translation") or "").strip()
        if not meaning:
            continue
        pos = (item.get("type") or "").strip()
        parts.append((pos + ". " + meaning) if pos else meaning)
    return "  ".join(parts)


def main():
    limit = int(sys.argv[1]) if len(sys.argv) > 1 else None
    os.makedirs(OUT, exist_ok=True)
    manifest = []
    for lid, name, en, emoji, color, json_name, jsonl_name, category in LEVELS:
        source_path = os.path.join(SRC, "json", json_name)
        with open(source_path, encoding="utf-8") as source:
            data = json.load(source)
        details = load_details(jsonl_name)
        subset = data[:limit] if limit else data
        words = []
        with_phonetics = 0
        with_examples = 0
        for item in subset:
            word = (item.get("word") or "").strip()
            if not word:
                continue
            detail = details.get(word, {})
            entry = {"w": word, "t": fmt_translations(item.get("translations"))}
            if detail.get("p"):
                entry["p"] = detail["p"]
                with_phonetics += 1
            if detail.get("e"):
                entry["e"] = {"en": detail["e"][0], "cn": detail["e"][1]}
                with_examples += 1
            words.append(entry)

        payload = {
            "id": lid,
            "name": name,
            "en": en,
            "total": len(data),
            "count": len(words),
            "words": words,
        }
        with open(os.path.join(OUT, lid + ".json"), "w", encoding="utf-8") as output:
            json.dump(payload, output, ensure_ascii=False, separators=(",", ":"))
        manifest.append({
            "id": lid,
            "name": name,
            "en": en,
            "emoji": emoji,
            "color": color,
            "category": category,
            "total": len(data),
            "count": len(words),
        })
        print(
            "%-8s %-12s total=%-6d written=%-6d US-phonetics=%-6d examples=%d"
            % (lid, name, len(data), len(words), with_phonetics, with_examples)
        )

    with open(os.path.join(OUT, "levels.json"), "w", encoding="utf-8") as output:
        json.dump({"sample": bool(limit), "levels": manifest}, output, ensure_ascii=False)
    print("---\nlevels: %d  total words: %d  sample=%s" % (
        len(manifest), sum(level["total"] for level in manifest), bool(limit)
    ))


if __name__ == "__main__":
    main()
