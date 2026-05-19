<!-- SPEC-DOCS-PROTOCOL:BEGIN -->
## Spec Docs Maintenance Protocol

This project uses `docs/spec-docs/` as the implementation-first spec knowledge base for AI-assisted maintenance.

Before changing implementation-relevant files:

- Read `docs/spec-docs/README.md`.
- Read `docs/spec-docs/constitution.md`.
- Read `docs/spec-docs/inventory.md` if it exists.
- Read related specs under `docs/spec-docs/specs/` if they exist.
- Read `docs/spec-docs/architecture/current-architecture.md` if it exists.
- Read `docs/spec-docs/architecture/placement-rules.md` if it exists.
- Read ADRs under `docs/spec-docs/decisions/` if they exist.
- If `inventory.md` is missing but implementation-relevant files now exist, run `spec-docs update` to absorb the empty-project baseline first.
- When `inventory.md` exists, use the Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index to identify relevant specs.
- Read all relevant specs before editing code.

For every non-trivial implementation change:

1. Read the workspace entrypoint and constitution.
2. Detect an external feature/spec/planning workflow. If no known workflow is detected, ask once whether the project uses another module-level or feature-level Spec Skill.
3. Perform requirement intake through the active workflow, or use Standalone Mode if none exists.
4. Run `spec-docs place` after intent intake and before detailed implementation planning.
5. Treat tentative placement as a decision gate: resolve missing information, request user decision, or create/use an ADR before implementing if required.
6. Read related specs, architecture rules, and ADRs.
7. Implement through the active workflow or a Minimal Implementation Plan.
8. Run tests.
9. Run `spec-docs update`.
10. Run `spec-docs verify`.

After changing implementation-relevant files:

- Update every affected spec in the same change.
- Update `docs/spec-docs/inventory.md` if source globs, spec metadata, code-to-spec mappings, task mappings, or symbol mappings changed.
- If no spec update is needed, state why explicitly.
- Run or apply `spec-docs verify` before declaring the task complete.
- Do not claim the task is complete until spec consistency has been checked.

Architecture repair guard:

- Do not relax architecture rules during update or repair unless the user explicitly confirms the architecture change or an ADR records the decision.

Conflict rule:

- Code, contracts, and config are the source of truth.
- Tests are the next source of truth.
- Existing docs and specs are lower priority.
- If behavior cannot be confirmed from source, mark it as `[NEEDS CLARIFICATION: ...]`; do not guess.
<!-- SPEC-DOCS-PROTOCOL:END -->
