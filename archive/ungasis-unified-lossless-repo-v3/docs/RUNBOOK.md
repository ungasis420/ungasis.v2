# Runbook

A runbook tells you what to do when something breaks.

## If local checks fail

1. Read the error.
2. Open the file named in the error.
3. Fix one problem only.
4. Run the check again.

## If a secret is exposed

1. Stop using that secret.
2. Rotate it in the real service.
3. Remove it from the repo.
4. Check logs.
5. Write an incident note.

## If AI changed too much

1. Stop the agent.
2. Review file changes.
3. Restore from backup if needed.
4. Use read-only mode next time.

## Feynman

A runbook is a repair recipe.

## Analogy

Like emergency steps on an airplane safety card.
