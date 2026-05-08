---
name: spec-docs
description: Use when a project needs an implementation-first AI spec knowledge base for current code behavior, module constraints, interfaces, data flow, implementation mapping, or ongoing spec maintenance before or during AI-assisted development.
---

# Spec Docs

## Identity

Spec Docs builds and maintains an implementation-first spec knowledge base for a project. The specs describe what the current code, contracts, configs, tests, and runtime behavior actually do.

Spec Docs is not a planning system. It must not create future implementation plans, roadmap docs, task lists, or speculative requirements.

## Non-Goals

Do not create or maintain:

- `plan.md`, `tasks.md`, roadmap, backlog, or future implementation plans.
- Aspirational product requirements not implemented in code.
- Spec-generated-code workflows where the spec outranks current implementation.
- Coverage gap backlogs. `inventory.md` is an objective index, not a todo list.

## Source-of-Truth Priority

When sources conflict, use this order:

1. Code, contracts, and configs.
2. Tests.
3. Existing docs.
4. Commit history.
5. Existing specs.

If behavior still cannot be confirmed, write `[NEEDS CLARIFICATION: <specific question>]`. Do not guess.

## Modes

### `init`

Use when `docs/specs/` does not exist or the user asks to spec-ify a project.

Must produce a full-project implementation spec library:

1. Explore code, tests, configs, contracts, docs, and recent history.
2. Identify tech stack, entrypoints, runtime units, source roots, tests, schemas, external interfaces, and integration surfaces.
3. Define coverage scope in `docs/specs/inventory.md` with included and excluded globs.
4. Create core files: `README.md`, `constitution.md`, `inventory.md`, `project-overview.spec.md`.
5. Create specs under only the directories that match the real project: `features/`, `modules/`, `interfaces/`, `runtime/`, `data/`, `integrations/`, `quality/`, `decisions/`.
6. Include implementation mapping in every spec: tech stack, key symbols, call flow, data flow, state changes, boundaries, tests, and code references.
7. Build `inventory.md` with spec metadata, code-to-spec index, task-to-spec map, and symbol-to-spec index.
8. Install the project instruction protocol block into `AGENTS.md` and/or `CLAUDE.md`.
9. Run `verify`.

Do not declare `init` complete until `verify` passes and the Code-to-Spec Index covers all included implementation-relevant files.

### `update`

Use when implementation-relevant files changed and specs must stay in sync.

1. Read `docs/specs/README.md` and `docs/specs/inventory.md`.
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

Check:

- Project protocol block exists exactly once in the target instruction files.
- Core files exist.
- Core files contain their required structures: README has reading order and maintenance workflow; constitution has source priority, coverage principle, conflict handling, and quality standard; inventory has Coverage Scope, Spec List, Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index.
- Every `.spec.md` has required frontmatter.
- All source paths/globs and related specs resolve.
- `inventory.md` includes every spec.
- Code-to-Spec Index covers every included implementation-relevant file.
- Symbol-to-Spec Index covers key entrypoints, public APIs, exported symbols, schemas, jobs, commands, and cross-module functions.
- README, constitution, inventory, and specs do not contradict each other.
- No `{{template_variables}}`, `TODO`, `TBD`, `待补充`, or planned behavior remains.
- `[NEEDS CLARIFICATION: ...]` entries are specific.

Output PASS or FAIL. If FAIL, list the files and whether the next mode should be `update` or `repair`.

### `repair`

Use when specs are stale, inconsistent, missing mappings, or no longer trustworthy.

Repair is documentation alignment, not code repair.

Allowed:

- Re-read code, tests, configs, contracts, docs, and history.
- Rewrite stale specs to match current implementation.
- Merge, split, delete, or rename specs when the code reality changed.
- Rebuild `inventory.md`.
- Fix `README.md`, `constitution.md`, and project protocol blocks.
- Run `verify`.

Forbidden unless the user explicitly asks for code changes:

- Modify business code.
- Modify tests to match specs.
- Refactor implementation to satisfy specs.
- Treat a stale spec as higher priority than code.

If you find a likely code bug during repair, report it as an implementation concern with code/spec references. Do not fix it.

## Hard Gates

- No writing specs before exploring the current project.
- No final `init` completion until full included-scope coverage is verified.
- No implementation-relevant code completion claim until affected specs are updated or a no-update reason is stated.
- No `verify` success claim without checking protocol, core files, frontmatter, references, coverage, content, and index consistency.
- No code modifications during `repair` without explicit user approval.

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

## Directory Model

Default structure:

```text
docs/specs/
├── README.md
├── constitution.md
├── inventory.md
├── project-overview.spec.md
├── features/
├── modules/
├── interfaces/
├── runtime/
├── data/
├── integrations/
├── quality/
└── decisions/
```

Create only directories that match the real project. Do not create empty speculative folders.

## Core Files

- `README.md`: AI entrypoint, reading order, maintenance workflow, and verification guidance.
- `constitution.md`: durable principles, source priority, coverage principle, conflict handling, and spec quality rules.
- `inventory.md`: metadata aggregation, coverage scope, code-to-spec index, task-to-spec map, and symbol-to-spec index.
- `project-overview.spec.md`: current project purpose, tech stack, runtime units, entrypoints, architecture map, and links to detailed specs.

## Frontmatter Schema

Every `.spec.md` must start with:

```yaml
---
type: implementation-spec
spec_kind: feature | module | interface | runtime | data | integration | quality | decision | overview
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
  - docs/specs/{{related_spec}}.spec.md
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
- `decision`: decisions already embodied by current code, with evidence and consequences.
- `overview`: project-level current implementation summary.

Use `templates/` for canonical file shapes.

## Template Map

| Template | Use for |
|---|---|
| `templates/specs-readme.md` | `docs/specs/README.md` AI entrypoint and maintenance workflow |
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
| `templates/decision.spec.md` | Architecture decisions already embodied by current code |
| `templates/agent-protocol-block.md` | Marker-based AGENTS.md/CLAUDE.md maintenance protocol |

## Inventory Rules

`inventory.md` must contain:

- Coverage Scope with Included Globs and Excluded Globs plus reasons.
- Spec List with kind, source files/globs, verified commit, and verified date.
- Code-to-Spec Index mapping code paths/globs to specs to read and update.
- Task-to-Spec Map using task keywords, not exhaustive task rows.
- Symbol-to-Spec Index for high-value symbols and entrypoints.

`source_files` and index paths may use globs. Globs must match real project paths and must not reserve future paths.

`inventory.md` must not contain planned specs, coverage gaps, todo lists, or roadmap items.

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
rg --files docs/specs
rg "\{\{[^}]+\}\}|\b(TB[D]|TO[D]O)\b|待补[充]" docs/specs
rg "^---$|^type: implementation-spec|^spec_kind:|^verified_commit:|^## Implementation Map|^## Update Rules" docs/specs
git diff --check -- docs/specs AGENTS.md CLAUDE.md
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
