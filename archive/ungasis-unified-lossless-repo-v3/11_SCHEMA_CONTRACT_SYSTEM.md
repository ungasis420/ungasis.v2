# 11 Schema Contract System

## Purpose

This file explains how to keep config files clean and predictable.

## Simple idea

A schema is a form with rules.
It says what fields are allowed and what fields are required.

## Why this matters

Without schemas:

- spelling mistakes hide
- missing fields go unnoticed
- agents may read bad config
- tests may pass by accident

## Beginner rule

Every important config should have:

1. a sample file
2. a schema file
3. a short explanation
4. a test

## Minimum schema list

Add schemas for:

- agent chain
- token budget
- connector registry
- permission matrix
- eval suite
- observability event
- release checklist

## Feynman explanation

A schema is a rule sheet that checks if your config is shaped correctly before the app trusts it.

## Layman analogy

A school form asks for name, grade, and parent signature. If the signature is missing, the form is not complete.

## Hard words in this file

See `SIMPLE_WORDS_GLOSSARY.md` for:

- schema
- config
- JSON
- YAML
- validator
- contract
