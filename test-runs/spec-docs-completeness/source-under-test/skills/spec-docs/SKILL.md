---
name: spec-docs
description: Use when a project needs implementation-first spec maintenance, implementation mapping, or architecture governance for placement, boundary enforcement, compliance verification, and failure localization.
---

# Spec Docs

## Identity

Spec Docs builds and maintains an implementation-first spec knowledge base. When the project needs it, architecture governance is available for placement, boundary enforcement, compliance verification, and failure localization.

`docs/spec-docs/specs/` describes current implementation facts.
`docs/spec-docs/architecture/` describes architecture rules, placement rules, target architecture, and rebuild state.
`docs/spec-docs/decisions/` stores ADRs as the single decision source.

## Non-Goals

Do not create or maintain:

- `plan.md`, `tasks.md`, roadmap, backlog, or future implementation plans.
- Aspirational product requirements not implemented in code.
- Spec-generated-code workflows where the spec outranks current implementation.
- Coverage gap backlogs. `inventory.md` is an objective index, not a todo list.
- Full requirements systems, roadmaps, or replacements for external spec workflows.

## Core Model

```text
specs/        records current implementation facts
architecture/ records architecture selection, boundary contracts, placement rules, target architecture, and debugging rules
place         decides code placement and boundary constraints before implementation
verify        checks fact drift, decision drift, and architecture violations
diagnose      performs architecture-guided triage for reported symptoms
rebuild       tracks migration from current to target architecture
```

Architecture docs and ADRs must not override current code facts. If behavior cannot be confirmed, write `[NEEDS CLARIFICATION: <specific question>]`. Do not guess.

### Architecture Control Layer

The architecture governance layer has six responsibilities:

1. **Architecture Selection** -- identify or choose the project's Primary Preset, Addons, and Adoption Mode.
2. **Placement** -- decide where new code belongs before implementation planning.
3. **Boundary Contract** -- define module boundaries, dependency direction, public contracts, shared code rules, and infrastructure access rules.
4. **Compliance Verification** -- check that code conforms to architecture rules; report violations and drift.
5. **Failure Localization** -- trace symptoms to owner module, failing layer, and debugging path.
6. **Rebuild Evolution** -- track controlled migration from current to target architecture.

### Architecture Selection Summary

Architecture Selection records the project's Primary Preset, Addons, and Adoption Mode. `init`, `place`, `verify`, `rebuild`, and `diagnose` use that selection to decide boundary rules, severity, and debugging order.

Full preset list, addon definitions, adoption mode details, and severity mappings live in `references/architecture-control.md`.

## Reference Loading Rule

Reference files are normative. When a mode points to a reference, the agent **must read and follow that reference before acting**. Do not rely on memory when a reference exists.

For example:
- `verify` requires reading `references/verification.md`.
- `place`, `rebuild`, `adopt`, and `diagnose` require reading `references/architecture-control.md`.
- Writing or updating specs requires reading `references/spec-authoring.md`.
- Hook behavior requires reading `references/hooks.md`.
- Project instruction/protocol block work requires reading `references/project-instructions.md`.
- Every mode must apply `references/hard-gates.md`.

## Source Priority Summary

| Claim type | Priority order (highest first) |
|---|---|
| Implementation facts | Code/contracts/configs > tests > existing docs > commit history > specs > ADRs |
| Architecture rules | `current-architecture.md` > `placement-rules.md` > accepted ADRs > existing specs |
| Decision rationale | ADRs > architecture docs > existing specs |
| Placement decisions | Latest placement review > `placement-rules.md` > `current-architecture.md` > related module specs > inferred code |
| Diagnosis | Reported symptom > related module specs > `debugging-rules.md` > `placement-rules.md` > `current-architecture.md` > available code/tests/logs |

Code facts must not be overridden by docs. Architecture conflicts must be reported as violations or drift, not silently weakened. Full rules in `references/source-priority.md`.

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
│   ├── debugging-rules.md
│   ├── target-architecture.md
│   └── adoption-plan.md
├── decisions/
│   └── adr-001-example.md
├── reviews/
└── rebuild/
    ├── status.md
    └── archive/
```

Create only directories needed by the current mode, project profile, and confirmed project reality. Do not create empty speculative child spec folders. Minimal projects should receive minimal docs; architecture, ADR, rebuild, and child spec directories are created only when evidenced or confirmed.

## Mode Router

| User intent | Mode | Required references |
|---|---|---|
| Initialize docs | `init` | `modes.md`, `spec-authoring.md`, `project-instructions.md` |
| Sync after code changes | `update` | `modes.md`, `spec-authoring.md`, `source-priority.md` |
| Verify consistency | `verify` | `verification.md`, `architecture-control.md` |
| Repair stale docs | `repair` | `modes.md`, `source-priority.md`, `spec-authoring.md` |
| Install/update protocol block | `init`, `repair` | `project-instructions.md` |
| Hook behavior | `init`, `verify` | `hooks.md` |
| Decide placement | `place` | `architecture-control.md` |
| Target architecture migration | `rebuild` | `architecture-control.md`, `verification.md` |
| Merge completed target architecture | `adopt` | `architecture-control.md`, `verification.md` |
| Architecture-guided triage | `diagnose` | `architecture-control.md`, `source-priority.md`, `modes.md` |

All modes must apply `hard-gates.md`.

## Minimal Mode Contracts

### `init`

Create or repair the initial `docs/spec-docs/` workspace. Classify init as Empty Project, Minimal Existing Project, Standard Existing Project, or Large Project / Phased Init using observable implementation signals. Empty projects produce a minimal principles seed only. Minimal existing projects produce README, constitution, inventory, and project overview without architecture/ADR/rebuild docs or empty child spec folders by default. Standard existing projects produce grounded child specs for observed implementation areas. Large projects may use `PARTIAL INIT` as a non-final state and must not claim final completion until full included-scope coverage is verified. Details in `references/modes.md` and `references/spec-authoring.md`.

### `update`

Synchronize implementation specs and inventory after implementation-relevant changes using Level 0-4 impact routing. Same-change spec maintenance is required when behavior, contracts, mappings, or architecture-relevant facts changed; Level 0 changes satisfy the gate by stating a no-update reason. Level 1 updates one mapped spec only, Level 2 uses targeted light check, Level 3 uses full verify, and Level 4 reports architecture risk and recommends the lightest safe architecture receiving path (`place`, `repair`, `rebuild`, or `adopt` scoped/full as applicable). Must not silently rewrite architecture rules or claim architecture currentness without full verify. Includes baseline absorption when transitioning from empty-project to real implementation. Details in `references/modes.md`.

### `verify`

Check facts, mappings, architecture, decisions, references, and indexes with `targeted-check`, `layered-check`, or `full-verify` scope depending on impact level, completion gate, or explicit user request. Output PASS / PASS WITH WARNINGS / FAIL. Findings use `[FACT DRIFT]`, `[ARCHITECTURE VIOLATION: <subtype>]`, and `[DECISION DRIFT]`. Each architecture violation must include: observed issue, expected architecture behavior, recommended action, evidence, and source documents checked. Severity reflects Adoption Mode and enabled Addons; verify reports detectable violations and is honest about manual review needs. Subtype list and severity mapping in `references/verification.md`.

### `repair`

Realign docs with current implementation without changing business code. Repair architecture requires explicit user confirmation or ADR; must not automatically relax rules. Details in `references/modes.md`.

### `place`

Placement & Boundary Review before detailed implementation planning for non-trivial changes. Output serves as boundary contract for later planning/implementation. Must include: Feature Intent, Ownership, Layer Placement, Boundary Contract (Allowed/Forbidden Dependencies, Required Public Contracts, Forbidden Shortcuts), Specs and Architecture Files to Read, Implementation Constraints, Failure Localization Hints, Specs to Update After Implementation, Open Questions, Decision/Confidence. If ownership, dependency direction, or public contract is unclear, output `Needs ADR` or `Needs User Decision`. Must not modify code. Must not create implementation specs as if behavior already exists. Details in `references/architecture-control.md`; output shape in `templates/placement-review.md`.

### `rebuild`

Define and track migration from current to target architecture. Choose target Primary Preset, target Addons, Adoption Mode `rebuild`, migration strategy, and required ADRs. Record Target Architecture Selection in `target-architecture.md`. Active when `rebuild/status.md` says `mode: rebuild` and `status: active` or `paused`. During active rebuild, `place` and `verify` consider target architecture. During paused rebuild, target gaps are warning/info unless the changed area touches migration scope. Details in `references/architecture-control.md`.

### `adopt`

Merge completed target architecture into current architecture after verifying code matches target rules, or introduce scoped governance for one clear existing area when current evidence supports it. Completed-rebuild adopt archives target docs and marks rebuild completed. Details in `references/modes.md`.

### `diagnose`

Architecture-guided triage for a reported symptom. Not an automatic debugger or direct repair mode. Identifies likely owner, likely layer, specs/files to inspect, signals to check, and debugging order. Must not claim root cause without evidence. Must not recommend modifying unrelated modules first. Details in `references/architecture-control.md`.

## Workflow Compatibility

Spec Docs prefers integration with existing feature/spec/planning workflows.

Detection: detect known workflows (Superpowers, OpenSpec, Spec-Kit) > ask user once > use Standalone Mode if none found.

Standalone Mode may perform lightweight intent clarification, `spec-docs place`, and a Minimal Implementation Plan. It must not expand into a full requirements system, roadmap, backlog, or external workflow replacement. Details in `references/workflow-integration.md`.

## Core Hard Gates

These gates are non-negotiable. Additional mode-specific and architecture-specific gates are indexed in `references/hard-gates.md`.

1. No writing specs before exploring the current project.
2. No final `init` completion until full included-scope coverage is verified.
3. No implementation-relevant completion claim until impact level is handled: no-update reason (Level 0), affected spec update (Level 1), `targeted-check` (Level 2), or `full-verify`/escalation (Level 3/4).
4. No `verify` success claim without checking protocol, core files, frontmatter, references, coverage, content, and index consistency.
5. No code modifications during `repair` without explicit user approval.
6. Architecture rules must not be weakened without explicit user confirmation or ADR.
7. `place` must run before detailed implementation planning for non-trivial feature/module changes.
8. Empty-project init must not create fake implementation facts.
9. Rebuild mode is determined by `rebuild/status.md`, not by target file existence.
10. Standalone Mode must not become a roadmap or backlog system.

## Architecture Gate Summary

Architecture gates are non-negotiable when architecture governance is present. Full rules live in `references/architecture-control.md`.

1. `update` must not silently rewrite architecture rules.
2. `repair architecture` requires explicit user confirmation or an ADR.
3. `place` must run before detailed implementation planning for non-trivial feature changes.
4. Implementation must follow placement review or stop to re-run `place`, ask the user, or create an ADR.
5. Cross-module access must use public API, port, event, adapter, or declared contract.

## Hook Policy Summary

Hooks remind or block hard gate violations, but rules live in `SKILL.md` and `references/`.

```text
Rules define what is required.
Hooks help enforce when it is required.
```

Behavior levels: `info` (reminder), `warning` (missing step, continue), `block` (hard gate violation).

Block candidates are summarized here but interpreted in `references/hooks.md`; impact-level criteria live in `references/modes.md`: repair edits business code without request; update silently weakens architecture rules; architecture rules weakened without ADR/confirmation; completion claimed without impact-appropriate spec action after implementation-relevant changes.

Hooks must not automatically modify code, create ADRs, weaken architecture rules, generate future plans, or over-block normal read-only work. Details in `references/hooks.md`.

## Reference Map

| Reference | Canonical content |
|---|---|
| `references/modes.md` | Detailed mode procedures for init, update, verify, repair, place, rebuild, adopt, diagnose |
| `references/architecture-control.md` | Architecture Selection, Primary Preset, Addons, Adoption Mode, Boundary Contract, Placement & Boundary Review, Architecture Workflow Subpaths, Architecture Routing Matrix, Architecture Repair Routing, Architecture Adopt Routing, Rebuild Recommendation, Diagnose Scope Decision, ADR and Rule-Change Safeguards, Diagnose, Architecture Review Cadence, Architecture Drift, Architecture Hard Gates |
| `references/source-priority.md` | Conflict handling and priority rules for implementation facts, architecture rules, placement decisions, diagnosis, decision rationale |
| `references/verification.md` | Verify output status, verification layers and scopes, layer routing matrix, finding categories, architecture violation subtypes, addon severity mapping, profile-specific init checks, and verification commands |
| `references/spec-authoring.md` | Frontmatter schema, spec kinds, shared sections, implementation mapping, coverage rules, inventory rules, template map, module boundary and failure localization |
| `references/workflow-integration.md` | Detection order, integrated mode, standalone mode |
| `references/project-instructions.md` | AGENTS.md / CLAUDE.md protocol block target selection, update strategy, protocol expectations |
| `references/hooks.md` | Supported hook directions, trigger points, behavior levels, block candidates, safety boundaries |
| `references/common-mistakes.md` | Full common mistakes table |
| `references/hard-gates.md` | Index of hard-gate canonical homes |

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

Use `templates/` for canonical file shapes. Field explanations and validation rules live in `references/spec-authoring.md`.

## Key Traps

| Excuse | Reality |
|---|---|
| "Docs can wait." | Implementation-relevant changes require same-change spec maintenance. |
| "The spec says so, so change code." | Code/contracts/configs outrank stale specs. Repair specs unless code changes were requested. |
| "Update can rewrite architecture rules too." | Use `repair architecture` with confirmation or ADR. `update` must not silently rewrite architecture rules. |
| "Relax the architecture rule since code violates it." | Report architecture violation or drift; do not silently weaken rules. |
| "Just make a few docs." | `init` is not complete until included-scope coverage is verified. |
| "There is no code, so invent a stack." | Empty-project init records only user-confirmed principles or explicit clarification markers. |
| "Rebuild mode because target files exist." | Rebuild mode is determined by `rebuild/status.md`, not by target file existence. |
| "Standalone mode can manage the full backlog." | Standalone Mode stays lightweight and must not become a roadmap/backlog system. |

Full table in `references/common-mistakes.md`.
