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
- Read `docs/spec-docs/architecture/debugging-rules.md` if diagnosing a symptom and it exists.
- Read ADRs under `docs/spec-docs/decisions/` if they exist.
- If `inventory.md` is missing but implementation-relevant files now exist, run `spec-docs update` to absorb the empty-project baseline first.
- When `inventory.md` exists, use the Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index to identify relevant specs.
- Read all relevant specs before editing code.

For every non-trivial implementation change:

1. Read the workspace entrypoint and constitution.
2. Detect an external feature/spec/planning workflow. If no known workflow is detected, ask once whether the project uses another module-level or feature-level Spec Skill.
3. Perform requirement intake through the active workflow, or use Standalone Mode if none exists.
4. Run `spec-docs place` after intent intake and before detailed implementation planning.
5. Treat the placement review as a boundary contract for the implementation.
6. Do not cross module boundaries through internal imports.
7. Do not bypass declared public contracts, ports, events, adapters, or state owners.
8. If the implementation plan conflicts with the placement review, stop and resolve by re-running `spec-docs place`, asking the user, or creating an ADR.
9. Read related specs, architecture rules, and ADRs.
10. Implement through the active workflow or a Minimal Implementation Plan.
11. Run tests appropriate to the change.
12. Classify implementation impact before declaring completion.
13. Complete the impact-appropriate spec action listed below.

When debugging:

1. Use `spec-docs diagnose` if architecture docs exist or ownership is unclear.
2. Start from the owner module and failure boundary.
3. Do not patch shared/utils or unrelated modules before tracing the architecture path.

After changing implementation-relevant files:

- Update every affected spec in the same change.
- Update `docs/spec-docs/inventory.md` if source globs, spec metadata, code-to-spec mappings, task mappings, or symbol mappings changed.
- If no spec update is needed, state why explicitly.
- Complete the impact-appropriate spec action before declaring the task complete:
  - Level 0: state a no-update reason.
  - Level 1: update the affected spec.
  - Level 2: update affected specs and run a targeted light check.
  - Level 3: update all affected specs and run full verify.
  - Level 4: report architecture risk, recommend the architecture receiving path selected by `references/architecture-control.md` (`place`, `repair`, `rebuild`, or `adopt` scoped/full as applicable), and run full verify before claiming architecture-current.
- Do not claim the task is complete until the impact-appropriate spec action has been performed.

Architecture repair guard:

- Do not relax architecture rules during update or repair unless the user explicitly confirms the architecture change or an ADR records the decision.

Conflict rule:

- Code, contracts, and config are the source of truth.
- Tests are the next source of truth.
- Existing docs and specs are lower priority.
- If behavior cannot be confirmed from source, mark it as `[NEEDS CLARIFICATION: ...]`; do not guess.
<!-- SPEC-DOCS-PROTOCOL:END -->
