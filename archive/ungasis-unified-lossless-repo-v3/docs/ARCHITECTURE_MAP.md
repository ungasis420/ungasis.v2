# Architecture Map

## High-Level Structure
```
[PROJECT_ROOT]/
  src/
    components/    # UI components
    pages/         # Route pages
    lib/           # Shared utilities
    api/           # API routes
  tests/           # Test files
  docs/            # Documentation
```

## Key Patterns
- [e.g., Repository pattern for data access]
- [e.g., React Context for global state]

## Data Flow
[Brief description of how data flows through the system]

## Critical Paths
- [e.g., Auth flow: login -> JWT -> middleware -> protected route]
- [e.g., Payment flow: cart -> checkout -> Stripe -> webhook -> fulfil]
