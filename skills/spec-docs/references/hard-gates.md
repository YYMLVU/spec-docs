# Hard Gates Reference

- No writing specs before exploring the current project.
- No final `init` completion until full included-scope coverage is verified.
- No implementation-relevant code completion claim until affected specs are updated or a no-update reason is stated.
- No `verify` success claim without checking protocol, core files, frontmatter, references, coverage, content, and index consistency.
- No code modifications during `repair` without explicit user approval.
- No empty-project `init` completion until the user has confirmed project purpose and durable principles or unresolved items are marked with specific `[NEEDS CLARIFICATION: ...]` entries.
- No empty-project `init` may create `inventory.md`, empty indexes, child specs, code, scaffolding, roadmap items, or future path reservations unless the user separately asks for project setup.
- `update` must not silently rewrite architecture rules.
- `repair architecture` requires explicit user confirmation or an ADR.
- `inventory.md` must not define architecture rules.
- `docs/spec-docs/specs/` must not contain planned behavior or decisions.
- Decisions must live in `docs/spec-docs/decisions/`, not `docs/spec-docs/specs/decisions/`.
- Rebuild mode must be determined by `docs/spec-docs/rebuild/status.md`, not by the mere existence of target files.
- Normal `verify` must not read `docs/spec-docs/rebuild/archive/`.
- `place` must run before detailed implementation planning for non-trivial feature changes.
- Standalone Mode must remain lightweight and must not become a roadmap or backlog system.
