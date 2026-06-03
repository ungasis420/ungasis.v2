# How To Use This Repository

## Step 1: Keep the backups

Do not delete this folder:

```text
01_ORIGINAL_ZIP_BACKUPS/
```

It stores the three original ZIP files.

**Feynman:** backup means a safe copy.  
**Analogy:** like taking a photo before changing a whiteboard.

## Step 2: Use the active files

The active files are in the normal folders:

```text
config/
docs/
schemas/
scripts/
tests/
prompts/
templates/
runtime/
```

**Feynman:** active means this is the version you should use now.  
**Analogy:** active files are the tools on your workbench.

## Step 3: Run checks

Ask a technical person to run:

```bash
python3 scripts/validate_repo.py
```

If it says pass, the local structure is okay.

**Feynman:** a check looks for common mistakes.  
**Analogy:** like checking if your bag has wallet, keys, and phone before leaving.

## Step 4: Do not add secrets

Do not put real passwords, API keys, tokens, or private client data in this repo.

**Feynman:** secrets are keys that open private doors.  
**Analogy:** do not tape your house key on the front door.

## Step 5: Use approval gates

Before AI changes files, sends messages, deletes data, updates records, or runs commands, a human should approve.

**Feynman:** an approval gate stops risky action until a person says yes.  
**Analogy:** like an “Are you sure?” screen before deleting photos.
