# Spec Docs Modes Reference

This file is normative for mode-specific behavior. `SKILL.md` routes to this file when detailed mode execution is needed.

## Mode Index

| Mode | Purpose | Related references |
|---|---|---|
| `init` | Create or repair the initial `docs/spec-docs/` workspace. | `spec-authoring.md`, `architecture-control.md`, `project-instructions.md` |
| `update` | Synchronize implementation specs and inventory after implementation-relevant changes. | `spec-authoring.md`, `source-priority.md`, `verification.md` |
| `verify` | Check facts, architecture, decisions, references, and indexes. | `verification.md`, `architecture-control.md` |
| `repair` | Realign docs with current implementation without changing business code. | `source-priority.md`, `spec-authoring.md`, `project-instructions.md` |
| `place` | Decide feature/module placement before detailed implementation planning. | `architecture-control.md` |
| `rebuild` | Define and track migration from current to target architecture. | `architecture-control.md`, `verification.md` |
| `adopt` | Merge completed target architecture into current architecture. | `architecture-control.md`, `verification.md` |
| `diagnose` | Perform architecture-guided triage for a reported symptom. | `architecture-control.md`, `source-priority.md`, `modes.md` |

Always apply `hard-gates.md` for every mode.

## `init`

Use when `docs/spec-docs/` does not exist or the user asks to spec-ify a project.

### Classification

Implementation-relevant files include source code, tests, runtime/config files, schemas/contracts, and public docs that define current behavior. Ignore generated files, build artifacts, vendored dependencies, lock files unless they define runtime behavior, and static assets unless they define behavior or interfaces.

If implementation-relevant files exist, run existing-implementation init. If no implementation-relevant files exist, run empty-project init. If classification is unclear, ask which files are implementation-relevant.

### Existing-implementation init

1. Explore code, tests, configs, contracts, docs, and recent history.
2. Identify tech stack, entrypoints, runtime units, source roots, tests, schemas, external interfaces, integration surfaces, and current architecture indicators.
3. Define coverage scope in `docs/spec-docs/inventory.md` with included and excluded globs.
4. Create core files: `README.md`, `constitution.md`, `inventory.md`, `specs/project-overview.spec.md`.
5. Create specs only under directories matching the current project.
6. If architecture rules are evident, create `architecture/current-architecture.md` and `architecture/placement-rules.md`.
7. If architecture selection can be inferred or confirmed, record Primary Preset, Addons, Adoption Mode, confidence, rationale, and known deviations.
8. Include implementation mapping in every spec: tech stack, key symbols, call flow, data flow, state changes, boundaries, tests, and code references.
9. Build `inventory.md` with spec metadata, Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index.
10. Install the project instruction protocol block.
11. Run `verify`.

Do not declare existing-implementation `init` complete until `verify` passes and the Code-to-Spec Index covers all included implementation-relevant files.

### Empty-project init

Allowed outputs only:

1. `docs/spec-docs/README.md` as the temporary entrypoint.
2. `docs/spec-docs/constitution.md` for durable project principles.
3. `docs/spec-docs/specs/project-overview.spec.md` as a minimal baseline overview.
4. Project instruction protocol block in `AGENTS.md` and/or `CLAUDE.md`.
5. Confirmed architecture constraint files only when the user confirms architecture choices.

Conversation flow:

1. Confirm project purpose or responsibility boundary.
2. Confirm intended technology stack or record `[NEEDS CLARIFICATION: technology stack is not selected yet]`.
3. Present durable principles for user confirmation covering coding, testing, dependency, error/security boundary, directory organization, and out-of-scope boundaries.
4. Write only user-confirmed principles and specific unresolved clarification markers.
5. If the user confirms architecture choices, create `architecture/current-architecture.md` and `architecture/placement-rules.md` as constraints, not implementation facts.
6. Create minimal `README.md`, `constitution.md`, and `specs/project-overview.spec.md`.
7. Do not create fake child specs, inventory indexes, source files, tests, package manifests, scaffolding, future trees, roadmaps, or task lists.
8. Run empty-project `verify`.

`project-overview.spec.md` for an empty project must state that no implementation-relevant files exist, record confirmed purpose and technology choices, link to `constitution.md`, state that `update` must absorb the baseline once implementation-relevant files exist, and omit implementation map/runtime/call-flow details until real implementation exists.

Directory organization principles are constraints, not scaffolding or reserved paths.

## `update`

Use when implementation-relevant files changed and specs must stay in sync.

Do not accept "docs can wait" for implementation-relevant changes. The protocol requires same-change spec maintenance.

### Baseline absorption

If an empty-project baseline exists and implementation-relevant files now exist, absorb the baseline into a normal implementation spec library:

1. Read `docs/spec-docs/README.md`, `docs/spec-docs/constitution.md`, and `docs/spec-docs/specs/project-overview.spec.md`.
2. Preserve and respect all durable principles in `constitution.md`.
3. Explore current code, tests, configs, contracts, docs, and recent history.
4. Replace the minimal overview's no-implementation state with actual project purpose, tech stack, runtime units, entrypoints, architecture, implementation map, call flow, data flow, quality surface, and change boundaries discovered from current implementation.
5. Create `docs/spec-docs/inventory.md` with real included/excluded globs, Spec List, Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index.
6. Create only child spec directories and specs that match real implementation.
7. Remove empty-project baseline wording after it has been replaced by implementation facts.
8. Run existing-implementation `verify`.

Do not require a separate command for this transition. Do not discard confirmed principles while absorbing the baseline.

### Routine update

1. Read `docs/spec-docs/README.md` and `inventory.md` if present.
2. Identify changed files from git diff or user input.
3. Use Code-to-Spec, Task-to-Spec, and Symbol-to-Spec indexes to find affected specs.
4. Read affected specs before editing implementation files when the task includes code changes.
5. Update affected specs in the same change.
6. Update inventory if mappings, source globs, symbols, or task maps changed.
7. Update frontmatter `verified_commit`, `verified_date`, `source_files`, `symbols`, `tech_stack`, and `related_specs` when needed.
8. Do not silently rewrite architecture rules.
9. Run `verify`.
10. If no spec update is needed, state why.

## `verify`

Use before declaring `init`, `update`, `repair`, or architecture adoption complete. Detailed rules live in `verification.md`.

## `repair`

Repair is documentation alignment, not code repair.

Allowed:

- Re-read code, tests, configs, contracts, docs, and history.
- Rewrite stale specs to match current implementation.
- Merge, split, delete, or rename specs when code reality changed.
- Rebuild `inventory.md`.
- Fix README, constitution, and project protocol blocks.
- Repair `architecture/current-architecture.md` only with explicit user confirmation or ADR.
- Run `verify`.

Forbidden unless explicitly requested:

- Modify business code.
- Modify tests to match specs.
- Refactor implementation to satisfy specs.
- Treat stale specs as higher priority than code.
- Automatically relax architecture rules to match violating code.

If repair finds a likely code bug, report it as an implementation concern with code/spec references. Do not fix it unless the user explicitly asks for code changes.

## `place`

Use after lightweight intent intake and before detailed implementation planning for non-trivial feature/module changes. Detailed rules live in `architecture-control.md`.

## `rebuild`

Use when the project needs a target architecture migration.

1. Document current architecture.
2. Choose target Primary Preset and target Addons.
3. Create target architecture.
4. Create adoption plan.
5. Initialize rebuild status.
6. Create ADR documenting rationale.
7. During active rebuild, `place` and `verify` consider target architecture.
8. During paused rebuild, target architecture gaps are warning/info and do not block normal maintenance unless the changed area touches migration scope.

## `adopt`

Use when target architecture has been fully implemented.

1. Verify code matches target architecture rules.
2. Merge target architecture into current architecture.
3. Update placement rules.
4. Update ADR implementation evidence.
5. Mark rebuild completed.
6. Archive target/adoption docs.
7. Run `verify`.

## `diagnose`

Use when the user reports a symptom and architecture should guide triage.

`diagnose` is architecture-guided triage, not an automatic debugger or direct repair mode. It identifies likely owner, likely layer, specs/files to inspect, signals to check, and debugging order.
