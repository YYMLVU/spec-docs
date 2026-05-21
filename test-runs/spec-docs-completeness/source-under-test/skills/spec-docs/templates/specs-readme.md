# Implementation Specs

## Purpose

This directory is the implementation-first spec knowledge base for the current project. It describes current code behavior, interfaces, data flow, runtime behavior, module constraints, and maintenance boundaries for AI-assisted work.

It is not a roadmap, planning system, or task list.

For an empty-project baseline, `docs/spec-docs/` may temporarily contain only `README.md`, `constitution.md`, and `specs/project-overview.spec.md`. Once implementation-relevant files exist, run `update` to absorb the baseline and generate standard implementation specs and `inventory.md`.

## Skill Structure

This workspace is maintained by the spec-docs skill, which uses a compact structure. The canonical entrypoint is `SKILL.md` -- this generated README summarizes workspace layout and maintenance; agents must follow the `SKILL.md` reference map.

- **`SKILL.md`** is the execution router: identity, mode router, hard gates, and reference map. The agent reads this first.
- **`references/`** contains normative rules. When a mode points to a reference, the agent must read and follow it before acting.
- **`templates/`** provides the output shapes for specs, architecture docs, ADRs, and reviews.
- **`hooks/`** (optional) provides agent hook scripts that remind or block at key actions. Hooks do not replace rules and must not automatically modify code, ADRs, or architecture rules.

## Reference Rules

Spec authors should follow `references/spec-authoring.md` for frontmatter, sections, implementation mapping, coverage, inventory, and module boundary/failure-localization rules. When architecture docs exist or the project uses architecture governance, also follow `references/architecture-control.md`.

## Default Reading Order

1. `docs/spec-docs/README.md`
2. `docs/spec-docs/constitution.md`
3. `docs/spec-docs/inventory.md`
4. `docs/spec-docs/specs/project-overview.spec.md`
5. Specs matched by the Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index.

## Before Changing Code

1. Identify changed or target files.
2. Read `inventory.md`.
3. Match files against the Code-to-Spec Index.
4. Match task wording against the Task-to-Spec Map.
5. Match important functions, routes, commands, schemas, or jobs against the Symbol-to-Spec Index.
6. Read all matched specs before editing implementation-relevant files.

## After Changing Code

1. Update every affected spec.
2. Update `inventory.md` if mappings, source globs, symbols, or spec metadata changed.
3. Update `verified_commit` and `verified_date` in affected specs after verification.
4. If no spec update is needed, state why.
5. Run the spec consistency checks before claiming completion.

## Consistency Checks

Verify that:

- All specs referenced in `inventory.md` exist.
- All source paths and globs point to real implementation-relevant files.
- Included globs are covered by the Code-to-Spec Index.
- Key symbols and entrypoints appear in the Symbol-to-Spec Index.
- Specs contain no `{{template_variables}}`, `TODO`, `TBD`, or planned behavior.
- `[NEEDS CLARIFICATION: ...]` entries are specific and source-based.

## Source of Truth

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

Architecture docs and ADRs must not override current code facts. If behavior cannot be confirmed, mark it with `[NEEDS CLARIFICATION: <specific question>]` instead of guessing.

## Architecture Control Layer

The architecture governance layer has six responsibilities: Architecture Selection (Primary Preset, Addons, Adoption Mode), Placement, Boundary Contract, Compliance Verification, Failure Localization, and Rebuild Evolution. See `docs/spec-docs/architecture/current-architecture.md` for the current architecture selection and `docs/spec-docs/architecture/placement-rules.md` for boundary contracts and placement rules.
