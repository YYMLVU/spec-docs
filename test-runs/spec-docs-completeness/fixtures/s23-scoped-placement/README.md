# S23 Scoped Placement Fixture

This fixture describes a Level 4 placement question that should use scoped `place`, not a broad architecture workflow.

Project facts:

- Current architecture is Feature Modular Architecture.
- `docs/spec-docs/architecture/current-architecture.md` assigns notification behavior to `src/features/notifications/`.
- `docs/spec-docs/architecture/placement-rules.md` says feature modules may expose public contracts through `public-api.ts` and must not import another feature's `internal/` files.
- The user asks where to add one email notification template renderer for the existing notifications feature.
- No accepted ADR changes are requested.
- No ownership boundary is unclear.
- No currentness claim is requested.

Expected route: `place` scoped.
