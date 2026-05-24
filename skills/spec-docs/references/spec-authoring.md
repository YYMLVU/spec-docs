# Spec Authoring Reference

This file is the canonical home for implementation spec writing rules.

## Specs Boundary

`docs/spec-docs/specs/` records current implementation facts only. It must not contain future plans, roadmaps, backlog items, planned behavior, or decisions.

## Frontmatter Schema

Every `.spec.md` starts with:

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

Generated specs must not contain `{{...}}` placeholders.

## Spec Kinds

- `feature`: user/system visible behavior.
- `module`: internal module, exported API, algorithm, strategy, and dependencies.
- `interface`: API, CLI, SDK, protocol, webhook, file format, endpoint, contract, model endpoint, or firmware interface.
- `runtime`: startup, config, jobs, process lifecycle, deployment assumptions.
- `data`: schemas, storage, migrations, data flow, consistency.
- `integration`: third-party or external system contracts and side effects.
- `quality`: tests, security, observability, performance, reliability, compatibility.
- `overview`: project-level implementation summary.

Decisions are not a spec kind. ADRs live under `docs/spec-docs/decisions/`.

## Shared Spec Sections

Use relevant sections from templates: Purpose, Technology Stack, Current Behavior, Inputs, Outputs, Implementation Map, Call Flow, Data Flow, State and Side Effects, Business / Domain Rules, Boundaries and Non-Goals, Error and Edge Cases, Change Boundaries, Test Points, Code References, Related Specs, and Update Rules.

## Implementation Mapping

Specs should include tech stack, key symbols, call flow, data flow, state and side effects, algorithms, change boundaries, tests, code references, related specs, and update rules when relevant.

Include precision notes for shared functions or risky coupling. Do not index every tiny helper globally; `inventory.md` summarizes high-value symbols while specs may include detailed local symbols.

## Coverage Rules

Implementation-relevant files include source code, tests, runtime/config files, schemas/contracts, and public docs that define behavior. Exclude generated files, build artifacts, vendored dependencies, lock files unless they define runtime behavior, and static assets unless they define behavior or interfaces. Actual include/exclude globs belong in `inventory.md`.

## Adaptive Output Rules

Create only the documentation artifacts required by confirmed project reality.

- Empty Project: create README, constitution, and empty-project overview only; do not create inventory or fake implementation specs.
- Minimal Existing Project: create README, constitution, inventory, and project overview; avoid architecture, ADR, rebuild, and empty child spec directories by default.
- Standard Existing Project: create child specs and child directories only for observed implementation areas.
- Large Project / Phased Init: create phase-appropriate artifacts and mark `PARTIAL INIT` until full included-scope coverage is verified.

Do not create architecture docs, ADRs, rebuild docs, or category folders merely because templates exist. Create them only when code evidence, existing docs, or user confirmation requires them.

## Inventory Rules

`inventory.md` contains coverage scope, spec list, code-to-spec index, task-to-spec map, and symbol-to-spec index. It must not contain planned specs, coverage backlogs, todos, roadmap items, or architecture rules.

## Template Map

| Template | Use for |
|---|---|
| `templates/workspace-readme.md` | `docs/spec-docs/README.md` workspace entrypoint |
| `templates/specs-readme.md` | Optional implementation specs entrypoint |
| `templates/constitution.md` | Durable spec principles and conflict rules |
| `templates/inventory.md` | Coverage scope and reverse indexes |
| `templates/project-overview.spec.md` | Project-level implementation overview |
| `templates/feature.spec.md` | User/system visible behavior |
| `templates/module.spec.md` | Internal modules and dependencies |
| `templates/interface.spec.md` | APIs, CLIs, SDKs, protocols, contracts, and interfaces |
| `templates/runtime.spec.md` | Startup, config, process lifecycle, and jobs |
| `templates/data.spec.md` | Schemas, storage, data flow, and consistency |
| `templates/integration.spec.md` | External systems and side effects |
| `templates/quality.spec.md` | Testing, security, observability, performance, reliability, compatibility |
| `templates/adr.md` | Architectural decisions under `docs/spec-docs/decisions/` |
| `templates/debugging-rules.md` | Architecture-guided debugging rules under `docs/spec-docs/architecture/` |
| `templates/current-architecture.md` | Current architecture selection and boundary model |
| `templates/placement-rules.md` | Module, layer, cross-module, and infrastructure placement rules |
| `templates/target-architecture.md` | Target architecture selection for rebuild |
| `templates/adoption-plan.md` | Milestones and scope for rebuild adoption |
| `templates/rebuild-status.md` | Rebuild mode, status, and progress under `rebuild/` |
| `templates/placement-review.md` | Placement & Boundary Review record under `reviews/` |
| `templates/architecture-review.md` | Architecture review record under `reviews/` |
| `templates/minimal-implementation-plan.md` | Lightweight standalone-mode implementation plan |
| `templates/agent-protocol-block.md` | Marker-based AGENTS.md/CLAUDE.md protocol |
| `templates/diagnosis.md` | Architecture-guided diagnosis template for `diagnose` mode |

## Module Boundary and Failure Localization

Module specs should record Boundary and Failure Localization only when grounded in code, tests, logs, existing docs, confirmed architecture, or user-confirmed operational knowledge.

Use specific `[NEEDS CLARIFICATION: ...]` when information is unknown. Do not invent common symptoms or debugging paths.
