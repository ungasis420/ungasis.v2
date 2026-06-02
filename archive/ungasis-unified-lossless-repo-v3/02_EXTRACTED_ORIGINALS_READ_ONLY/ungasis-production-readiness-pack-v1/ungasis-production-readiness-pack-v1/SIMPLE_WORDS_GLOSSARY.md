# Simple Words Glossary

This glossary explains technical words used in this pack.

Each word has:

- Simple meaning
- Feynman explanation
- Layman analogy
- What you should do

## Agent

Simple meaning: An AI helper that can do tasks.

Feynman explanation: An agent is AI with a job and sometimes tools. It should follow rules, not just answer freely.

Layman analogy: Like a junior assistant.

What you should do: Let it draft and suggest first. Do not let it send, delete, or pay without approval.

## API

Simple meaning: A way for apps to talk to each other.

Feynman explanation: An API is a set of allowed requests. One app asks, another app replies.

Layman analogy: Like a restaurant menu. You choose from allowed options.

What you should do: Use APIs only with clear permissions.

## API key

Simple meaning: A secret key that lets software use a service.

Feynman explanation: An API key proves your app is allowed to call another service.

Layman analogy: Like a house key.

What you should do: Never put it in public files.

## Approval

Simple meaning: A human says yes before a risky action.

Feynman explanation: Approval is the safety stop before something changes the real world.

Layman analogy: Like signing before money leaves your bank.

What you should do: Require approval before send, delete, pay, publish, or change permissions.

## Audit log

Simple meaning: A record of what happened.

Feynman explanation: An audit log tells who did what, when, and why.

Layman analogy: Like CCTV plus a notebook.

What you should do: Log important actions, but never log secrets.

## Backup

Simple meaning: A safe copy.

Feynman explanation: A backup lets you restore your work if the current version breaks.

Layman analogy: Like a spare house key.

What you should do: Keep a copy before risky changes.

## CI

Simple meaning: Automatic checks for a project.

Feynman explanation: CI runs tests when files change, so problems are caught early.

Layman analogy: Like a teacher checking homework before final submission.

What you should do: Use it later with a technical helper.

## CODEOWNERS

Simple meaning: A file that says who must review important changes.

Feynman explanation: CODEOWNERS tells GitHub which person is responsible for parts of the project.

Layman analogy: Like assigning a manager for each room in a building.

What you should do: Replace the example name with your GitHub name later.

## Config

Simple meaning: Settings.

Feynman explanation: Config tells software what rules and options to use.

Layman analogy: Like settings on a phone.

What you should do: Keep config clear and reviewed.

## Connector

Simple meaning: A link to another tool.

Feynman explanation: A connector lets your project read from or write to another system.

Layman analogy: Like a plug connecting to a wall socket.

What you should do: Track every connector and its permissions.

## Dependency

Simple meaning: Something your project relies on.

Feynman explanation: If your project needs an outside package or tool, that thing is a dependency.

Layman analogy: Like a recipe needing flour.

What you should do: Use fewer dependencies until you understand them.

## Environment

Simple meaning: Where the app runs.

Feynman explanation: Local, test, staging, and production are different places with different risk levels.

Layman analogy: Practice kitchen vs real restaurant kitchen.

What you should do: Test in a safe environment before production.

## Eval

Simple meaning: A test for AI behavior.

Feynman explanation: An eval checks if the AI gives the kind of answer or action you expect.

Layman analogy: Like an exam.

What you should do: Keep a list of prompts and expected safe behavior.

## GitHub Actions

Simple meaning: GitHub's automatic task runner.

Feynman explanation: It can run checks when project files change.

Layman analogy: Like an automatic checklist machine.

What you should do: Use it later. Keep permissions low.

## Golden test

Simple meaning: A normal test the AI should always pass.

Feynman explanation: Golden tests prove the basic good behavior still works.

Layman analogy: Like a favorite recipe that should taste right every time.

What you should do: Create 5 to 10 normal tests.

## Governance

Simple meaning: Rules for control.

Feynman explanation: Governance says who can do what, what needs approval, and how actions are tracked.

Layman analogy: Like house rules.

What you should do: Write simple rules before using agents.

## Human-in-the-loop

Simple meaning: A person checks risky actions.

Feynman explanation: The AI can prepare, but a human approves before real impact.

Layman analogy: Like a pilot using autopilot but still staying in control.

What you should do: Use this for money, deletion, sending, legal, health, private data, and public posts.

## Incident

Simple meaning: A problem that may cause harm.

Feynman explanation: An incident is a bad event that needs tracking and fixing.

Layman analogy: Like a kitchen fire or water leak.

What you should do: Stop, record, fix, test, and learn.

## JSON

Simple meaning: A common data format.

Feynman explanation: JSON stores facts using names and values.

Layman analogy: Like labeled boxes.

What you should do: Use JSON for structured settings when needed.

## Least privilege

Simple meaning: Give only the power needed.

Feynman explanation: A tool should only access what it needs to do its job.

Layman analogy: Give the cleaner the office key, not the bank safe key.

What you should do: Start with read-only when possible.

## Log

Simple meaning: A written record.

Feynman explanation: A log records events so you can debug and audit later.

Layman analogy: Like a diary for the app.

What you should do: Log actions, errors, approvals, and run IDs.

## Metric

Simple meaning: A number you track.

Feynman explanation: Metrics show health or performance over time.

Layman analogy: Like a car speedometer or fuel gauge.

What you should do: Track simple numbers first: errors, runs, approvals, failures.

## Observability

Simple meaning: Seeing what the system is doing.

Feynman explanation: Observability uses logs, traces, and metrics so you can understand behavior.

Layman analogy: Like a dashboard and black box recorder.

What you should do: Record enough clues to debug safely.

## Permission

Simple meaning: What someone or something may do.

Feynman explanation: Permissions define allowed actions.

Layman analogy: Like access cards in a building.

What you should do: Write permissions before connecting tools.

## Pinning

Simple meaning: Locking a tool to a specific version.

Feynman explanation: Pinning stops a tool from changing without you knowing.

Layman analogy: Buying the exact same part number, not "whatever is newest".

What you should do: Ask a technical helper to pin actions before production.

## Placeholder

Simple meaning: Temporary text to replace later.

Feynman explanation: A placeholder marks a value you still need to fill in.

Layman analogy: Like "your name here" on a form.

What you should do: Replace placeholders before production.

## Production

Simple meaning: Real users depend on it.

Feynman explanation: Production means the project is live enough that mistakes can hurt users, data, money, or trust.

Layman analogy: A restaurant open to paying customers.

What you should do: Do not claim production until tests, security, logs, support, and rollback exist.

## QA

Simple meaning: Quality checks.

Feynman explanation: QA checks if the project works as expected and fails safely.

Layman analogy: Taste-testing and safety-checking food before serving.

What you should do: Use the QA test plan.

## Red-team test

Simple meaning: A trick test.

Feynman explanation: Red-team tests try to make the AI break rules so you can improve safety.

Layman analogy: Like testing a lock by trying to open it without the right key.

What you should do: Use safe trick prompts before real launch.

## Release

Simple meaning: A new version goes out.

Feynman explanation: Release means making a change available to users.

Layman analogy: Opening the door after setup.

What you should do: Use a release checklist.

## Rollback

Simple meaning: Go back to the last good version.

Feynman explanation: Rollback is the undo plan when a release causes trouble.

Layman analogy: Keeping yesterday's safe copy.

What you should do: Plan rollback before release.

## Run ID

Simple meaning: A name for one run.

Feynman explanation: A run ID lets you trace all events from one agent or app session.

Layman analogy: Like a receipt number.

What you should do: Give each agent run a unique ID.

## Runtime

Simple meaning: When the app or agent is running.

Feynman explanation: Runtime is the live moment when the system acts.

Layman analogy: A play performance, not rehearsal.

What you should do: Add rules for live actions.

## SBOM

Simple meaning: A list of software parts.

Feynman explanation: SBOM means Software Bill of Materials. It lists what your software is made from.

Layman analogy: Ingredient list on food packaging.

What you should do: Add later when production or public use matters.

## Schema

Simple meaning: A rule for data shape.

Feynman explanation: A schema says which fields are required and what type they must be.

Layman analogy: A form that requires name, date, and signature.

What you should do: Use schemas for important config.

## Secret

Simple meaning: Private access value.

Feynman explanation: A secret lets someone access a service or private data.

Layman analogy: House key, bank PIN, or alarm code.

What you should do: Keep secrets out of files and chats.

## Smoke test

Simple meaning: A quick basic test.

Feynman explanation: A smoke test checks if the main thing works before deeper testing.

Layman analogy: Turning on a car before a long trip.

What you should do: Run smoke tests after every change.

## Supply chain

Simple meaning: Outside parts your project uses.

Feynman explanation: A software supply chain is the path from code, tools, packages, and build steps to your final project.

Layman analogy: Farm to kitchen to plate.

What you should do: Use trusted parts and track them.

## Token

Simple meaning: A unit of AI text or an access key, depending on context.

Feynman explanation: In AI, tokens are small text pieces the model reads. In security, token can mean an access secret.

Layman analogy: AI token is like word pieces. Security token is like a key card.

What you should do: Ask which meaning is being used.

## Trace

Simple meaning: Path of one request.

Feynman explanation: A trace shows the steps a request took across a system.

Layman analogy: Tracking a delivery package.

What you should do: Use run ID and logs first; deeper traces later.

## Validator

Simple meaning: A checker.

Feynman explanation: A validator checks if files follow rules.

Layman analogy: A teacher checking a form before accepting it.

What you should do: Use validators before launch.

## Version

Simple meaning: A named copy of the project.

Feynman explanation: A version marks the state of your project at a point in time.

Layman analogy: Draft 1, Draft 2, Final draft.

What you should do: Write version numbers in release notes.

## Workflow

Simple meaning: A series of steps.

Feynman explanation: A workflow says what happens first, next, and last.

Layman analogy: A recipe.

What you should do: Write workflows before automating them.

## YAML

Simple meaning: A human-friendly settings format.

Feynman explanation: YAML stores settings with indentation and names.

Layman analogy: A neat outline.

What you should do: Be careful with spacing.
