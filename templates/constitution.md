# Spec Constitution

## Purpose

This constitution defines how the project maintains implementation-first specs. Specs describe the current implementation only.

## Non-Goals

Specs must not contain future plans, roadmap items, task lists, planned specs, or speculative behavior.

## Source-of-Truth Priority

1. Code, contracts, and configs.
2. Tests.
3. Existing docs.
4. Commit history.
5. Existing specs.

If behavior cannot be confirmed, write `[NEEDS CLARIFICATION: <specific question>]`.

## Coverage Principle

The spec library must cover all non-ignored implementation-relevant files.

Implementation-relevant files include source code, tests, runtime/config files, schemas/contracts, and public docs that define behavior.

Excluded files include generated files, build artifacts, vendored dependencies, lock files unless they define runtime behavior, and static assets unless they define behavior or interfaces.

The current project's actual include/exclude globs are maintained in `docs/specs/inventory.md`.

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
