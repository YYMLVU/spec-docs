---
name: spec-docs
description: Use when a project needs an implementation-first AI spec knowledge base with optional architecture governance for current code behavior, module constraints, interfaces, data flow, implementation mapping, architecture rules, placement decisions, or ongoing spec maintenance before or during AI-assisted development.
---

# Spec Docs

## Identity

Spec Docs builds and maintains an implementation-first spec knowledge base with optional architecture governance.

`docs/spec-docs/specs/` describes current implementation facts.
`docs/spec-docs/architecture/` describes architecture rules, placement rules, target architecture, and rebuild state.
`docs/spec-docs/decisions/` stores ADRs as the single decision source.

Spec Docs must not become a full requirements system, roadmap tool, backlog generator, or replacement for an existing feature/spec/planning workflow.

## Non-Goals

Do not create or maintain:

- `plan.md`, `tasks.md`, roadmap, backlog, or future implementation plans.
- Aspirational product requirements not implemented in code.
- Spec-generated-code workflows where the spec outranks current implementation.
- Coverage gap backlogs. `inventory.md` is an objective index, not a todo list.
- Full requirements systems, roadmaps, or replacements for external spec workflows.

## Source-of-Truth Priority

When sources conflict, use this order:

1. Code, contracts, and configs.
2. Tests.
3. Existing docs.
4. Commit history.
5. Existing specs.
6. ADRs in `docs/spec-docs/decisions/`.

If behavior still cannot be confirmed, write `[NEEDS CLARIFICATION: <specific question>]`. Do not guess.

## Directory Model

```text
docs/spec-docs/
├── README.md
├── constitution.md
├── inventory.md
├── specs/
│   ├── project-overview.spec.md
│   ├── features/
│   ├── modules/
│   ├── interfaces/
│   ├── runtime/
│   ├── data/
│   ├── integrations/
│   └── quality/
├── architecture/
│   ├── current-architecture.md
│   ├── placement-rules.md
│   ├── target-architecture.md
│   └── adoption-plan.md
├── decisions/
│   └── adr-001-example.md
├── reviews/
└── rebuild/
    ├── status.md
    └── archive/
```

Create only directories needed by the current mode and confirmed project reality. Do not create empty speculative child spec folders.

## Workflow Compatibility

Spec Docs should prefer integration with an existing feature/spec/planning workflow.

Detection order:

1. Detect known workflows such as Superpowers, OpenSpec, or Spec-Kit.
2. If none are detected, ask the user once whether another module-level or feature-level Spec Skill exists.
3. If the user identifies one, inspect/use that workflow.
4. If none exists or it cannot be found, use Standalone Mode.

Standalone Mode may perform lightweight intent clarification, `spec-docs place`, and a Minimal Implementation Plan. It must not expand into a full requirements system, roadmap, backlog, or replacement for external spec workflows.

## Modes

### `init`

Use when `docs/spec-docs/` does not exist or the user asks to spec-ify a project.

First determine whether the target has implementation-relevant files.

Implementation-relevant files include source code, tests, runtime/config files, schemas/contracts, and public docs that define current behavior. Ignore generated files, build artifacts, vendored dependencies, lock files unless they define runtime behavior, and static assets unless they define behavior or interfaces.

If implementation-relevant files exist, run **existing-implementation init**.

If no implementation-relevant files exist, run **empty-project init**.

If classification is unclear, ask the user which files are implementation-relevant. Do not guess.

#### Existing-implementation init

Must produce a full-project implementation spec library:

1. Explore code, tests, configs, contracts, docs, and recent history.
2. Identify tech stack, entrypoints, runtime units, source roots, tests, schemas, external interfaces, and integration surfaces.
3. Define coverage scope in `docs/spec-docs/inventory.md` with included and excluded globs.
4. Create core files: `README.md`, `constitution.md`, `inventory.md`, `specs/project-overview.spec.md`.
5. Create specs under only the directories that match the real project: `features/`, `modules/`, `interfaces/`, `runtime/`, `data/`, `integrations/`, `quality/`.
6. If architecture rules are evident from code, create `docs/spec-docs/architecture/current-architecture.md` and `placement-rules.md`.
7. Include implementation mapping in every spec: tech stack, key symbols, call flow, data flow, state changes, boundaries, tests, and code references.
8. Build `inventory.md` with spec metadata, code-to-spec index, task-to-spec map, and symbol-to-spec index.
9. Install the project instruction protocol block into `AGENTS.md` and/or `CLAUDE.md`.
10. Run `verify`.

Do not declare existing-implementation `init` complete until `verify` passes and the Code-to-Spec Index covers all included implementation-relevant files.

#### Empty-project init

Use only when there are no implementation-relevant files to describe.

Empty-project init creates a minimal project-principles seed, not an implementation spec library.

Allowed outputs:

1. `docs/spec-docs/README.md` as the temporary entrypoint.
2. `docs/spec-docs/constitution.md` for durable project principles.
3. `docs/spec-docs/specs/project-overview.spec.md` as a minimal baseline overview.
4. Project instruction protocol block in `AGENTS.md` and/or `CLAUDE.md`.

Do not create `docs/spec-docs/inventory.md`, child spec directories, child specs, empty indexes, source code, tests, package manifests, scaffolding, future directory trees, plans, roadmaps, or task lists during empty-project init.

Required empty-project conversation flow:

1. Confirm the project purpose or responsibility boundary in one or two sentences.
2. Confirm the intended technology stack if known. If unknown, record `[NEEDS CLARIFICATION: technology stack is not selected yet]`.
3. Present a concise principles draft for user confirmation covering coding principles, testing principles, dependency principles, error/security boundary principles, directory organization principles, and out-of-scope boundaries.
4. Write only user-confirmed principles and explicit unresolved clarification markers.
5. Run `verify` using the empty-project checklist.

`project-overview.spec.md` for an empty project must stay minimal:

- State that no implementation-relevant files exist yet.
- Record confirmed project purpose and confirmed technology choices.
- Link to `constitution.md` for principles.
- State that `update` must absorb the baseline once implementation-relevant files exist.
- Omit runtime units, entrypoints, implementation map, key symbols, call flow, data flow, test surface, and child spec links until real implementation exists.

Directory organization principles are allowed only as constraints, not scaffolding. For example, "shared logic should live behind stable boundaries" is allowed; "create `src/pages`, `src/components`, and `src/utils`" is scaffolding and forbidden unless the user separately asks for project setup.

### `update`

Use when implementation-relevant files changed and specs must stay in sync.

`update` updates `docs/spec-docs/specs/` and `inventory.md`. It must not silently rewrite `architecture/` rules.

#### Baseline Absorption

If the project has an empty-project baseline and implementation-relevant files now exist, `update` must absorb the baseline into a normal implementation spec library:

1. Read `docs/spec-docs/README.md`, `docs/spec-docs/constitution.md`, and `docs/spec-docs/specs/project-overview.spec.md`.
2. Preserve and respect all durable principles in `constitution.md`.
3. Explore current code, tests, configs, contracts, docs, and recent history.
4. Replace the minimal overview's no-implementation state with actual project purpose, tech stack, runtime units, entrypoints, architecture, implementation map, call flow, data flow, quality surface, and change boundaries discovered from current implementation.
5. Create `docs/spec-docs/inventory.md` with real included/excluded globs, Spec List, Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index.
6. Create only the child spec directories and specs that match the real implementation.
7. Remove empty-project baseline wording after it has been replaced by implementation facts.
8. Run `verify` using the existing-implementation checklist.

Do not require a separate command for this transition. Do not discard confirmed principles while absorbing the baseline.

#### Routine Update

1. Read `docs/spec-docs/README.md` and `docs/spec-docs/inventory.md`.
2. Inspect the changed files from git diff or user input. Useful discovery commands include `git diff --name-only`, `git diff --cached --name-only`, and `git diff --name-only HEAD~1..HEAD` when reviewing the latest commit.
3. Use Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index to identify all affected specs.
4. Read those specs before editing implementation files when the task includes code changes.
5. After code changes, update every affected spec in the same change.
6. Update `inventory.md` if source globs, spec metadata, mappings, symbols, or task maps changed.
7. Update frontmatter `verified_commit`, `verified_date`, `source_files`, `symbols`, `tech_stack`, and `related_specs` when needed.
8. Run `verify`.
9. If no spec update is needed, explicitly state why.

Do not accept "docs can wait" for implementation-relevant changes. The protocol requires same-change spec maintenance.

### `verify`

Use before declaring `init`, `update`, or `repair` complete, or when the user asks whether specs are current.

#### Output Contract

Verify findings use these categories:

- `[FACT DRIFT]` -- code and `docs/spec-docs/specs/` disagree.
- `[ARCHITECTURE VIOLATION]` -- code violates current or active target architecture rules.
- `[DECISION DRIFT]` -- ADR status, implementation status, or implementation evidence disagrees with code.

Each finding has severity: `error`, `warning`, or `info`.

#### Existing-implementation specs checks

- Project protocol block exists exactly once in the target instruction files.
- Core files exist.
- Core files contain their required structures: README has reading order and maintenance workflow; constitution has source priority, coverage principle, conflict handling, and quality standard; inventory has Coverage Scope, Spec List, Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index.
- Every `.spec.md` has required frontmatter.
- All source paths/globs and related specs resolve.
- `inventory.md` includes every spec.
- Code-to-Spec Index covers every included implementation-relevant file.
- Symbol-to-Spec Index covers key entrypoints, public APIs, exported symbols, schemas, jobs, commands, and cross-module functions.
- README, constitution, inventory, and specs do not contradict each other.
- No `{{template_variables}}`, `TODO`, `TBD`, or planned behavior remains.
- `[NEEDS CLARIFICATION: ...]` entries are specific.
- If `docs/spec-docs/architecture/current-architecture.md` exists, check code against current architecture rules.
- If `docs/spec-docs/rebuild/status.md` exists with `mode: rebuild` and `status: active`, also check code against target architecture rules.
- If `docs/spec-docs/decisions/` contains ADRs, check decision status and implementation evidence against code.

#### Empty-project baselines checks

- Project protocol block exists exactly once in the target instruction files.
- `docs/spec-docs/README.md`, `docs/spec-docs/constitution.md`, and `docs/spec-docs/specs/project-overview.spec.md` exist.
- `docs/spec-docs/inventory.md` does not exist yet, or if it exists, it directs the agent to run `update` for baseline absorption rather than containing empty indexes.
- `project-overview.spec.md` explicitly states that no implementation-relevant files exist yet.
- `constitution.md` contains only durable principles, not feature plans, roadmap items, task lists, scaffolding instructions, or reserved future paths.
- Current project inspection confirms no implementation-relevant files exist.
- No `{{template_variables}}`, `TODO`, `TBD` remains.
- `[NEEDS CLARIFICATION: ...]` entries are specific.

If implementation-relevant files exist while the specs are still in empty-project baseline mode, output FAIL with:

```text
NOTICE: project has implementation code but specs are still in empty-project baseline mode.
Recommended action: run spec-docs update to absorb baseline and generate implementation specs.
```

Normal `verify` must not read `docs/spec-docs/rebuild/archive/`.

Output PASS or FAIL. If FAIL, list the files and whether the next mode should be `update` or `repair`.

### `repair`

Use when specs are stale, inconsistent, missing mappings, or no longer trustworthy.

Repair is documentation alignment, not code repair.

`repair architecture` requires explicit user confirmation or an ADR. It must not automatically relax architecture rules to match violating code.

Allowed:

- Re-read code, tests, configs, contracts, docs, and history.
- Rewrite stale specs to match current implementation.
- Merge, split, delete, or rename specs when the code reality changed.
- Rebuild `inventory.md`.
- Fix `README.md`, `constitution.md`, and project protocol blocks.
- Repair `architecture/current-architecture.md` with user confirmation or ADR.
- Run `verify`.

Forbidden unless the user explicitly asks for code changes:

- Modify business code.
- Modify tests to match specs.
- Refactor implementation to satisfy specs.
- Treat a stale spec as higher priority than code.
- Automatically relax architecture rules to match violating code.

If you find a likely code bug during repair, report it as an implementation concern with code/spec references. Do not fix it.

### `place`

Use when a new feature, module, or significant change needs placement guidance.

`place` runs after lightweight requirement intake and before detailed implementation planning.

Placement reviews may be tentative. Every placement review must include:

- `Decision`: `Final | Tentative | Needs ADR | Needs User Decision`
- `Confidence`: `High | Medium | Low`
- `Reasoning`
- `Missing Information`
- `Recommended Next Step`

Steps:

1. Read `docs/spec-docs/architecture/current-architecture.md` and `placement-rules.md` if they exist.
2. Read `docs/spec-docs/architecture/target-architecture.md` if rebuild mode is active.
3. Analyze the change scope against placement rules.
4. Produce a placement review with the required fields above.
5. If `Decision` is `Needs ADR` or `Needs User Decision`, do not proceed with implementation until resolved.
6. Store the placement review in `docs/spec-docs/reviews/`.

`place` must run before detailed implementation planning for non-trivial feature changes.

### `rebuild`

Use when the project needs a target architecture migration.

`rebuild` is active only when `docs/spec-docs/rebuild/status.md` says `mode: rebuild` and `status: active` or `paused`.

Steps to initiate:

1. Document current architecture in `docs/spec-docs/architecture/current-architecture.md`.
2. Define target architecture in `docs/spec-docs/architecture/target-architecture.md`.
3. Create adoption plan in `docs/spec-docs/architecture/adoption-plan.md`.
4. Initialize `docs/spec-docs/rebuild/status.md` with `mode: rebuild`, `status: active`, and target summary.
5. Create ADR in `docs/spec-docs/decisions/` documenting the rebuild rationale.

While active:

- `verify` checks code against both current and target architecture rules.
- `update` may note alignment with target but must not silently rewrite current architecture rules.
- `place` considers target architecture placement rules.

### `adopt`

Use when a rebuild's target architecture has been fully implemented.

`adopt` merges completed target architecture into current architecture, updates ADR implementation evidence, marks rebuild completed, and archives target/adoption docs.

Steps:

1. Verify that code matches `target-architecture.md` rules.
2. Merge `target-architecture.md` content into `current-architecture.md`.
3. Update placement rules if they changed.
4. Update the ADR in `docs/spec-docs/decisions/` with implementation evidence.
5. Set `docs/spec-docs/rebuild/status.md` to `mode: rebuild`, `status: completed`.
6. Move `target-architecture.md` and `adoption-plan.md` to `docs/spec-docs/rebuild/archive/`.
7. Run `verify`.

## Hard Gates

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

## Project Instruction Installation

After `init`, install or update the project protocol block from `templates/agent-protocol-block.md`.

Target selection:

1. If root `AGENTS.md` exists, update it.
2. If root `CLAUDE.md` exists, update it.
3. If both exist, update both.
4. If neither exists, create `AGENTS.md`.

Update strategy:

- Replace the full block between `<!-- SPEC-DOCS-PROTOCOL:BEGIN -->` and `<!-- SPEC-DOCS-PROTOCOL:END -->` if present.
- Append the block if markers are absent.
- Do not duplicate blocks.
- Do not rewrite unrelated user instructions.
- If existing instructions conflict, report the conflict and preserve the stricter rule where possible.

## Core Files

- `README.md`: AI entrypoint, reading order, maintenance workflow, and verification guidance.
- `constitution.md`: durable principles, source priority, coverage principle, conflict handling, and spec quality rules.
- `inventory.md`: metadata aggregation, coverage scope, code-to-spec index, task-to-spec map, and symbol-to-spec index.
- `specs/project-overview.spec.md`: current project purpose, tech stack, runtime units, entrypoints, architecture map, and links to detailed specs.
- `architecture/current-architecture.md`: current architecture rules and constraints derived from implementation.
- `architecture/placement-rules.md`: rules for where new code and modules should be placed.
- `architecture/target-architecture.md`: target architecture during rebuild mode.
- `architecture/adoption-plan.md`: plan for migrating from current to target architecture.
- `rebuild/status.md`: rebuild mode status (`mode: rebuild`, `status: active | paused | completed`).

## Frontmatter Schema

Every `.spec.md` must start with:

```yaml
---
type: implementation-spec
spec_kind: feature | module | interface | runtime | data | integration | quality | overview
status: current | needs-review | partial
owned_by_code: true
verified_commit: {{git_sha}}
verified_date: {{verified_date}}
source_files:
  - {{source_glob}}
symbols:
  - {{symbol_or_entrypoint}}
tech_stack:
  - {{technology}}
related_specs:
  - docs/spec-docs/specs/{{related_spec}}.spec.md
---
```

Template variables use `{{snake_case}}`. Generated specs must not contain `{{...}}`.

## Shared Spec Sections

Each spec should include relevant sections from the templates:

- Purpose
- Technology Stack
- Current Behavior
- Inputs
- Outputs
- Implementation Map
- Call Flow
- Data Flow
- State and Side Effects
- Business / Domain Rules
- Boundaries and Non-Goals
- Error and Edge Cases
- Change Boundaries
- Test Points
- Code References
- Related Specs
- Update Rules

## Spec Kinds

- `feature`: user/system visible behavior and business rules.
- `module`: internal module, exported API, algorithm, strategy, and dependencies.
- `interface`: API, CLI, SDK, protocol, webhook, file format, model endpoint, or firmware interface.
- `runtime`: startup, config, environment, jobs, process lifecycle, deployment assumptions.
- `data`: schemas, storage, migrations, data flow, consistency.
- `integration`: third-party or external system contracts and side effects.
- `quality`: tests, security, observability, performance, reliability, compatibility.
- `overview`: project-level current implementation summary.

Decisions are not a spec kind. Record decisions as ADRs under `docs/spec-docs/decisions/` using `templates/adr.md`.

Use `templates/` for canonical file shapes.

## Template Map

| Template | Use for |
|---|---|
| `templates/workspace-readme.md` | `docs/spec-docs/README.md` workspace entrypoint, reading order, and governance overview |
| `templates/specs-readme.md` | Optional `docs/spec-docs/specs/README.md` implementation specs entrypoint |
| `templates/constitution.md` | Durable spec principles and conflict rules |
| `templates/inventory.md` | Coverage scope, spec metadata, code/task/symbol reverse indexes |
| `templates/project-overview.spec.md` | Project-level current implementation overview |
| `templates/feature.spec.md` | User/system visible features and business behavior |
| `templates/module.spec.md` | Internal modules, exported APIs, algorithms, and dependencies |
| `templates/interface.spec.md` | API, CLI, SDK, protocol, file format, webhook, or endpoint contracts |
| `templates/runtime.spec.md` | Startup, config, process lifecycle, jobs, and deployment assumptions |
| `templates/data.spec.md` | Schemas, storage, migrations, read/write paths, and consistency |
| `templates/integration.spec.md` | External systems, providers, credentials, and side effects |
| `templates/quality.spec.md` | Testing, security, observability, performance, reliability, compatibility |
| `templates/adr.md` | Architectural decision records under `docs/spec-docs/decisions/` |
| `templates/agent-protocol-block.md` | Marker-based AGENTS.md/CLAUDE.md maintenance protocol |

## Inventory Rules

`inventory.md` must contain:

- Coverage Scope with Included Globs and Excluded Globs plus reasons.
- Spec List with kind, source files/globs, verified commit, and verified date.
- Code-to-Spec Index mapping code paths/globs to specs to read and update.
- Task-to-Spec Map using task keywords, not exhaustive task rows.
- Symbol-to-Spec Index for high-value symbols and entrypoints.

`source_files` and index paths may use globs. Globs must match real project paths and must not reserve future paths.

`inventory.md` must not contain planned specs, coverage gaps, todo lists, roadmap items, or architecture rules.

## Implementation Mapping Rules

Specs must map behavior to code precisely enough for future AI maintenance.

Include:

- Tech stack and framework/library/runtime choices.
- Key functions, classes, handlers, commands, schemas, jobs, or pipeline steps.
- Call flow and data flow.
- State changes, side effects, persistence, network calls, and emitted outputs.
- Algorithms, strategies, or processing rules when present.
- Change boundaries: what can be modified for a behavior and what should not be touched.
- Precision notes for shared functions or risky coupling.

Do not index every tiny helper globally. `inventory.md` should summarize high-value symbols only; specs can include detailed local symbols.

## Coverage Rules

The spec library must cover all non-ignored implementation-relevant files.

Implementation-relevant files include:

- Source code.
- Tests.
- Runtime/config files.
- Schemas/contracts.
- Public docs that define behavior.

Excluded files include generated files, build artifacts, vendored dependencies, lock files unless they define runtime behavior, and static assets unless they define behavior or interfaces.

Actual include/exclude globs belong in `inventory.md`.

## Verification Commands

Use repo-appropriate commands. Common useful checks:

```bash
rg --files docs/spec-docs
rg "\{\{[^}]+\}\}|\b(TB[D]|TO[D]O)\b" docs/spec-docs
rg "^---$|^type: implementation-spec|^spec_kind:|^verified_commit:|^## Implementation Map|^## Update Rules" docs/spec-docs
git diff --check -- docs/spec-docs AGENTS.md CLAUDE.md
```

Also verify globs and coverage by inspecting the project; do not rely only on text search.

## Common Mistakes

| Excuse | Reality |
|---|---|
| "Just make a few docs." | `init` is not complete until included-scope coverage is verified. |
| "Docs can wait." | Implementation-relevant changes require same-change spec maintenance. |
| "The spec says so, so change code." | Code/contracts/configs outrank stale specs. Repair specs unless user asks for code changes. |
| "This is a plan, not a spec." | Spec Docs describes current implementation only. Do not write plan/tasks/roadmap. |
| "A path list is enough." | Specs must include implementation mapping, symbols, call flow, data flow, and change boundaries. |
| "Inventory can track missing areas." | Inventory is objective metadata and reverse index, not a backlog. |
| "A glob can describe future files." | Globs must match real project areas and current coverage scope. |
| "There is no code, so invent a reasonable stack." | Empty-project init records only user-confirmed principles or specific clarification markers. |
| "Create starter files so specs have paths." | Spec Docs must not scaffold implementation during init unless the user separately asks for code. |
| "Empty indexes prove the project is covered." | Empty-project init should not create empty indexes; `update` creates real indexes when implementation exists. |
| "Directory principles mean pre-creating a tree." | Principles may constrain future changes, but reserved paths or scaffolding are plans unless the user asks for setup. |
| "Update can rewrite architecture rules too." | `update` must not silently rewrite `architecture/` rules. Use `repair architecture` with confirmation or ADR. |
| "Relax the architecture rule since code violates it." | `repair architecture` must not automatically relax rules to match violating code. |
| "Rebuild mode because target files exist." | Rebuild mode is determined by `rebuild/status.md`, not by target file existence. |
| "Standalone mode can manage the full backlog." | Standalone Mode must remain lightweight and must not become a roadmap or backlog system. |
