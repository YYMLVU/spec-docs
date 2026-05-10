<!-- SPEC-DOCS-PROTOCOL:BEGIN -->
## Spec Docs Maintenance Protocol

This project uses `docs/specs/` as the implementation-first spec knowledge base for AI-assisted maintenance.

Before changing implementation-relevant files:

- Read `docs/specs/README.md`.
- Read `docs/specs/constitution.md`.
- Read `docs/specs/inventory.md`.
- Use the Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index to identify relevant specs.
- Read all relevant specs before editing code.

After changing implementation-relevant files:

- Update every affected spec in the same change.
- Update `docs/specs/inventory.md` if source globs, spec metadata, code-to-spec mappings, task mappings, or symbol mappings changed.
- If no spec update is needed, state why explicitly.
- Run or apply `spec-docs verify` before declaring the task complete.
- Do not claim the task is complete until spec consistency has been checked.

Conflict rule:

- Code, contracts, and config are the source of truth.
- Tests are the next source of truth.
- Existing docs and specs are lower priority.
- If behavior cannot be confirmed from source, mark it as `[NEEDS CLARIFICATION: ...]`; do not guess.
<!-- SPEC-DOCS-PROTOCOL:END -->
