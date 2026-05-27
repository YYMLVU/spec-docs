# S25 Scoped Repair Escalation Fixture

This fixture starts as a possible scoped repair but must escalate.

Project facts:

- Three modules contain cross-feature internal imports.
- `architecture/current-architecture.md` says internal imports are forbidden.
- `docs/spec-docs/adrs/0004-shared-billing-access.md` is accepted and appears to allow one exception, but the exception wording conflicts with placement rules.
- The user asks to "just repair the docs for these imports".
- The requested change would either weaken architecture rules or reinterpret an accepted ADR.

Expected route: escalate from `repair` scoped to `repair` full or user-decision/ADR handling. Do not silently repair as scoped.
