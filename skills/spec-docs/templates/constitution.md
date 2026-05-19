# Spec Constitution

## Purpose

This constitution defines project-level durable constraints for the spec library. It governs how the project maintains implementation-first specs. Specs describe the current implementation only.

This document does not duplicate placement rules; see `placement-rules.md` for spec placement and routing decisions.

## Non-Goals

Specs must not contain future plans, roadmap items, task lists, planned specs, or speculative behavior. Architecture decisions are recorded as ADRs under `docs/spec-docs/decisions/adr-xxx.md` rather than as a separate spec kind.

## Empty-Project Baseline Rule

When the project has no implementation-relevant files, specs may record only user-confirmed purpose, technology choices, durable coding/testing/dependency principles, directory organization constraints, and out-of-scope boundaries. These principles are constraints, not plans, and must not describe unimplemented features, scaffolding, or reserved future paths as current behavior.

## Source-of-Truth Priority

Implementation behavior:

1. Code, contracts, and configs.
2. Tests.
3. Existing docs.
4. Commit history.
5. Existing specs.
6. ADRs in `docs/spec-docs/decisions/`.

Architecture rules:

1. `docs/spec-docs/architecture/current-architecture.md`.
2. `docs/spec-docs/architecture/placement-rules.md`.
3. Accepted ADRs in `docs/spec-docs/decisions/`.
4. Existing specs.

Decision rationale:

1. ADRs in `docs/spec-docs/decisions/`.
2. Architecture docs.
3. Existing specs.

Architecture docs and ADRs must not override current code facts. If behavior cannot be confirmed, write `[NEEDS CLARIFICATION: <specific question>]`.

## Coverage Principle

The spec library must cover all non-ignored implementation-relevant files.

Implementation-relevant files include source code, tests, runtime/config files, schemas/contracts, and public docs that define behavior.

Excluded files include generated files, build artifacts, vendored dependencies, lock files unless they define runtime behavior, and static assets unless they define behavior or interfaces.

The current project's actual include/exclude globs are maintained in `docs/spec-docs/inventory.md`.

## Spec Quality Standard

Every spec must:

- Describe current behavior only.
- Map behavior to concrete code paths and key symbols.
- Include implementation strategy, call flow, data flow, state changes, side effects, and change boundaries when relevant.
- List source files or globs that point to real current project paths.
- Link related specs.
- State update rules for future maintenance.

## Conflict Handling

When a spec conflicts with higher-priority sources, update the spec. Do not modify code during spec repair unless the user explicitly asks for code changes.

## Inventory Boundary

`inventory.md` is an objective metadata and reverse-index file. It must not track coverage gaps, planned specs, todos, or roadmap items.
