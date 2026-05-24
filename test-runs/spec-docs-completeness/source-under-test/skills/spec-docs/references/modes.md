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

Classify `init` into one of four project profiles:

1. **Empty Project** -- no implementation-relevant files exist.
2. **Minimal Existing Project** -- implementation files exist, but the project has only a few files, one simple entrypoint or responsibility, and no meaningful module ownership, architecture, data, integration, or public API surface that needs separate specs.
3. **Standard Existing Project** -- implementation files exist and the project has multiple modules, features, runtime units, interfaces, data models, integrations, or other implementation areas that need grounded child specs.
4. **Large Project / Phased Init** -- implementation files exist, but a complete high-quality init would be too broad for one reliable pass.

Heuristic anchors, not hard thresholds:

- Minimal usually has one simple entrypoint and no separate public/API/data/integration boundary that would lose precision if summarized in one overview.
- Standard is favored when the project has multiple implementation areas, multiple public entrypoints, a public API plus data access boundary, external integrations, or enough exported symbols that one overview would become imprecise.
- Large / Phased is favored when the project has many source areas or the agent would need to choose between shallow full coverage and grounded partial coverage.

Use observable signals first:

- implementation file count;
- source directory depth;
- public entrypoints;
- exported symbols or public interfaces;
- persistent data models;
- external integrations;
- multiple ownership areas or module boundaries;
- existing architecture docs or ADRs;
- evidence that one complete init would produce shallow specs.

If no implementation-relevant files exist, run Empty Project init. If implementation files exist but classification is unclear, choose the lightest profile that can accurately describe the implementation, state the uncertainty, and do not create speculative docs.

### Standard Existing Project init

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

Do not declare Standard Existing Project `init` complete until `verify` passes and the Code-to-Spec Index covers all included implementation-relevant files.

### Large Project / Phased Init

Use when a single full `init` would likely exceed reliable context or produce shallow specs.

Phase model:

1. Phase 1: project overview, coverage scope, inventory draft, and source area inventory.
2. Phase 2: core modules and public interfaces.
3. Phase 3: runtime, data, integrations, and quality areas.
4. Phase 4: feature specs and remaining mapped areas.
5. Phase 5: full verify and documented remaining findings.

Rules:

1. `PARTIAL INIT` is allowed only as a non-final state.
2. Record `PARTIAL INIT` in `docs/spec-docs/inventory.md` under Coverage Scope as `Init Status: PARTIAL INIT` when inventory exists; if inventory is not created yet, record it in `docs/spec-docs/README.md` until inventory is available.
3. `PARTIAL INIT` must not claim final init completion.
4. `PARTIAL INIT` must not claim full included-scope Code-to-Spec coverage.
5. `PARTIAL INIT` must record the next batch explicitly.
6. Low-confidence or deferred areas must be marked explicitly instead of represented by shallow specs.
7. Do not satisfy the final init hard gate until full included-scope coverage is verified.

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

### Minimal Existing Project init

Use for tiny existing projects whose implementation can be accurately described by a minimal workspace.

Required outputs:

1. `docs/spec-docs/README.md`.
2. `docs/spec-docs/constitution.md`.
3. `docs/spec-docs/inventory.md` with real included/excluded globs, Spec List, Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index appropriate to the minimal profile; included files and high-value symbols may map to `specs/project-overview.spec.md`.
4. `docs/spec-docs/specs/project-overview.spec.md` with current implementation facts.
5. Project instruction protocol block in `AGENTS.md` and/or `CLAUDE.md`.

Rules:

1. Ground facts in code, tests, configs, contracts, and behavior-defining docs.
2. Map all implementation-relevant files in `inventory.md`, even when they all map to `specs/project-overview.spec.md`.
3. Do not create child spec directories by default.
4. Do not create architecture docs, ADRs, or rebuild docs by default.
5. Create a child spec only when one overview cannot accurately describe the current code.
6. Record missing architecture evidence as not applicable or `[NEEDS CLARIFICATION: architecture boundaries are not evident from this minimal project]`; do not guess a Primary Preset -- minimal projects usually lack enough architecture boundary evidence for a Primary Preset, and if boundaries are evident the project should be classified as Standard instead.
7. Run the normal `verify` mode with Minimal Existing Project checks before declaring init complete. Minimal-profile verify is not a new mode.

Minimal existing init is a final init profile when its included implementation scope is fully covered by the minimal workspace.

## `update`

Use when implementation-relevant files changed and specs must stay in sync.

Do not accept "docs can wait" for implementation-relevant changes. The protocol requires same-change spec maintenance.

### Baseline absorption

If an empty-project baseline exists and implementation-relevant files now exist, absorb the baseline into a normal implementation spec library:

1. Read `docs/spec-docs/README.md`, `docs/spec-docs/constitution.md`, and `docs/spec-docs/specs/project-overview.spec.md`.
2. Preserve and respect all durable principles in `constitution.md`.
3. Explore current code, tests, configs, contracts, docs, and recent history.
4. Replace the minimal overview's no-implementation state with actual project purpose, tech stack, runtime units, entrypoints, architecture, implementation map, call flow, data flow, quality surface, and change boundaries discovered from current implementation.
5. Classify the resulting implementation into one of the three existing-project profiles -- Minimal Existing, Standard Existing, or Large / Phased -- because implementation files now exist.
6. Create `docs/spec-docs/inventory.md` with real included/excluded globs, Spec List, Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index appropriate to the selected profile. Minimal Existing Project may map all included source files and high-value symbols to `specs/project-overview.spec.md`.
7. Create only child spec directories and specs that match real implementation and the selected profile.
8. Remove empty-project baseline wording after it has been replaced by implementation facts.
9. Run normal `verify` with the selected profile's init checks.

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
