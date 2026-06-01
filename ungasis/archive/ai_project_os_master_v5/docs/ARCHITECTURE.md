# Architecture

## Current stage

{{STAGE}}

## Chosen stack

{{STACK}}

## Architecture principle

Keep the core project portable, testable, and easy to understand. Add complexity only when the project stage demands it.

## Layers

| Layer | Current choice | Notes |
|---|---|---|
| UI / interface | {{UI_LAYER}} | |
| App logic | {{APP_LOGIC}} | |
| Data storage | {{DATA_STORAGE}} | |
| AI provider | {{AI_PROVIDER}} | Keep behind adapter |
| Integrations | {{INTEGRATIONS}} | |
| Tests | {{TEST_STACK}} | |
| Deployment | {{DEPLOYMENT}} | |

## Service boundaries

Document boundaries here:

- UI components:
- Domain logic:
- Data access:
- AI/provider adapter:
- External connectors:

## Data model

Link or define entities here.

## Upgrade path

What changes if this moves from prototype to public/commercial?

## Reversal path

How can this decision be undone if it fails?
