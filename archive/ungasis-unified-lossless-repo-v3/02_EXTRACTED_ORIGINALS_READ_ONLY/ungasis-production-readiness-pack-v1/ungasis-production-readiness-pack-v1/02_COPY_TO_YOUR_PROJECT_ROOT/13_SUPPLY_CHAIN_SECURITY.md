# 13 Supply Chain Security

## Purpose

This file helps reduce risk from outside code, tools, packages, and automations.

## Simple idea

Your project may use parts made by others.
You need to know if those parts are safe enough.

## Check these

| Item | What to check | Beginner action |
|---|---|---|
| Outside code | Who made it? | Use trusted sources |
| Packages | Are they needed? | Remove unused ones |
| GitHub Actions | Are they trusted? | Ask helper to pin them |
| Secrets | Are they exposed? | Keep out of files |
| Downloads | Are they official? | Use official sites |

## Safe beginner rules

1. Use fewer tools.
2. Use official sources.
3. Do not paste secrets into public files.
4. Ask a technical helper before production launch.
5. Keep a list of outside tools.

## Feynman explanation

Supply chain security means checking the parts your project depends on, because a weak outside part can harm your whole project.

## Layman analogy

A restaurant should know where its meat, vegetables, and packaging came from. Bad ingredients can ruin the whole meal.

## Hard words in this file

See `SIMPLE_WORDS_GLOSSARY.md` for:

- supply chain
- dependency
- package
- GitHub Actions
- pinning
- SBOM
