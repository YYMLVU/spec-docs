# S26 Rebuild Recommendation Fixture

This fixture verifies that rebuild remains exceptional but is recommended when incremental repair is unsafe.

Project facts:

- `architecture/current-architecture.md` says the project is Layered Architecture.
- `architecture/placement-rules.md` says the project is Feature Modular Architecture.
- Several specs describe Clean / Hexagonal ports.
- Current source layout has mixed feature folders, domain folders, and direct infrastructure imports.
- The user asks which architecture workflow should handle this.
- No target architecture has been chosen yet.

Expected route: recommend `rebuild` because current architecture references are stale or contradictory enough that scoped repair is unsafe.
