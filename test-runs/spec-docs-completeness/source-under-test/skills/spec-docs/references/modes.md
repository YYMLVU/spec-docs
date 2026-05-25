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

Routine update starts with impact classification before deciding how much spec maintenance or verification is required.

Classification order:

1. Read `docs/spec-docs/README.md` and `inventory.md` if present.
2. Identify changed files from git diff or user input.
3. Inspect the smallest source/spec/context set needed to classify impact.
4. Classify Level 0 through Level 4 using the rules below.
5. Follow the route for that level.
6. Re-classify upward if a higher-level signal is discovered during the update or light check.
7. State the level and reason when reporting completion.

Impact classification uses observable signals first: changed file paths, changed implementation files, changed mapped specs, changed exported symbols or public signatures, changed test assertions or verification points, source layout changes, inventory mapping changes, architecture file changes, accepted ADR changes, and imports that cross declared module or layer boundaries.

Higher-level signals override lower-level labels. A one-file change is not Level 1 if it changes a public contract, inventory mapping, source layout, or architecture boundary.

If non-architecture signals are ambiguous, choose the lightest safe level and state the uncertainty. If architecture risk is ambiguous, route to Level 4 unless current architecture references clearly show that no boundary, ownership, dependency-direction, ADR, or rebuild rule is implicated.

**General frontmatter rule:** Any level that updates a spec must update affected frontmatter fields (`verified_commit`, `verified_date`, `source_files`, `symbols`, `tech_stack`, `related_specs`) as appropriate for the change scope.

#### Level 0: No Spec Action

Use when the change does not affect runtime behavior, public contracts, architecture boundaries, verification points, or implementation mappings.

Examples:

- comments only;
- formatting only;
- README or non-runtime docs only;
- package metadata only;
- CI-only change that does not affect runtime behavior;
- test name or test description only;
- visual/style-only change when specs do not track visual details.

Non-examples:

- changed test assertions, expected values, fixtures, or verification logic are at least Level 1;
- file moves, renames, or path changes that affect `source_files` or inventory mappings are at least Level 2;
- public contract documentation changes are at least Level 2 if they describe implemented behavior.

Required behavior:

- Do not update specs.
- Do not run `verify` merely to claim freshness.
- If reporting completion, state why no spec-docs action was required.

#### Level 1: Single-Spec Touch

Use when a behavior or verification-point change is contained in one mapped spec and has no public contract, inventory, layout, or architecture-risk signal.

Examples:

- one-file bugfix;
- one edge case change;
- one validation behavior change;
- one internal error message change tracked by one mapped spec;
- implementation detail change that affects only one existing spec.

Boundary rules:

- If one implementation file maps to multiple specs, classify by affected specs, not file count.
- If the changed behavior affects more than one spec, use Level 2 or higher.
- If the change updates a public interface contract, use at least Level 2.
- If inventory mappings, `source_files`, symbol maps, task maps, or source paths change, use at least Level 2.

Required behavior:

- Read the mapped spec.
- Update only the affected behavior, edge case, verification point, or evidence.
- Do not update unrelated specs.
- Do not run full verify.
- Do not modify inventory unless mapping or source coverage changed; if inventory must change, reclassify to Level 2.

#### Level 2: Targeted Update + Light Check

Use when one feature, module, runtime unit, interface, or inventory section changes across a localized area, and no architecture-risk signal is present.

Examples:

- localized feature behavior changes across a few files;
- one interface contract changes;
- one module internal flow changes;
- tests or verification points materially change for one mapped area;
- inventory rows need targeted updates for one localized area;
- a file move or rename remains within the same ownership area and only requires targeted mapping updates.

Observable anchors:

- all changed implementation files map to one spec or one closely related spec group;
- affected specs share one feature/module/runtime/interface owner;
- affected inventory rows are limited to the same ownership area;
- no source movement crosses ownership, layer, or architecture boundaries;
- no accepted ADR or architecture rule is modified.

Required behavior:

- Update affected specs only.
- Update affected inventory rows only if file mappings, symbol mappings, task mappings, or spec links changed.
- Run a targeted light check following `references/verification.md` targeted light check rules.
- Report the check as targeted; do not claim full `verify` success.

#### Level 3: Full Update + Full Verify

Use when the change affects broad behavior, cross-cutting behavior, multiple ownership areas, source layout, or release-level freshness claims.

Examples:

- more than one localized feature/module/interface area changed;
- public API shape changed broadly;
- source layout changed across ownership areas;
- multiple inventory sections require updates;
- cross-cutting behavior affects several specs;
- the user asks to claim release-level spec freshness.

Observable anchors:

- affected specs do not share one owner or parent area;
- changed files move across spec ownership areas;
- more than one inventory section needs non-trivial edits;
- a broad freshness claim is being made;
- the change cannot be explained as one localized feature/module/runtime/interface update.

Required behavior:

- Update all affected specs.
- Update inventory mappings for the affected scope.
- Run full verify before claiming the workspace is current for the affected broad scope.

A routine large-project change that touches two or three files may remain Level 2 if it maps to one localized area and has no architecture-risk signal.

#### Level 4: Architecture / Rebuild Workflow

Use whenever architecture risk is present, even if the code diff is small.

Examples:

- new module, layer, runtime, integration, or ownership boundary;
- imports or calls cross a declared module/layer boundary in a new way;
- dependency direction conflicts with architecture rules or is not covered by existing placement rules;
- public contract ownership is unclear;
- shared utility begins accumulating feature-specific policy;
- architecture docs, placement rules, accepted ADRs, or rebuild state are modified;
- current implementation appears to violate existing architecture rules.

Required behavior:

- Do not let ordinary `update` silently legalize the architecture change.
- Do not modify architecture rules or accepted ADRs unless the user explicitly requested architecture rule changes.
- Report the architecture-risk signal.
- Recommend the appropriate mode: `place`, `repair`, `rebuild`, or `adopt`.
- If the user explicitly asks to run the escalated mode immediately, load that mode's required references before acting.
- Require full verify before claiming architecture state is current.

If the user explicitly acknowledges the architecture risk and asks for a targeted factual spec update anyway, the update may record current implementation facts without changing architecture rules or accepted ADRs. The result must still report Level 4 risk and must not claim architecture currentness.

#### Update routing table

| Impact level | Spec action | Verify action | Architecture action |
|---|---|---|---|
| Level 0 | none | none | none |
| Level 1 | one mapped spec only | none | none |
| Level 2 | affected specs and inventory rows only | targeted light check | reclassify to Level 4 if risk discovered |
| Level 3 | all affected specs and inventory mappings | full verify | reclassify to Level 4 if risk discovered |
| Level 4 | do not ordinary-update architecture rules | full verify before architecture-current claim | recommend `place` / `repair` / `rebuild` / `adopt` |

If an existing workspace lacks enough inventory mapping to classify a change confidently, inspect the smallest needed source/spec set and update only needed mapping evidence. Unmapped behavior changes are at least Level 2 because mapping evidence changed or is missing. If the unmapped change spans multiple ownership areas or cannot be localized, route to Level 3. Do not perform a full workspace rewrite solely to classify impact.

If many Level 1 or Level 2 updates have occurred since the last full verify, recommend a Level 3 full verify. This is a recommendation, not a hard gate. A user request for release-level freshness remains a hard Level 3 trigger.

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
