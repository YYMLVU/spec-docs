# Architecture Control Reference

This file is the canonical home for Architecture Control Layer rules.

## Control Model

```text
Architecture Control Layer
= Architecture Selection
+ Placement
+ Boundary Contract
+ Compliance Verification
+ Failure Localization
+ Rebuild Evolution
```

## Architecture Workflow Subpaths

Architecture modes keep their existing names. When architecture risk is present, choose one of two internal subpaths:

| Subpath | Meaning | Currentness claim allowed |
|---|---|---|
| `scoped` | The architecture question is localized to one clearly bounded area, known rule, or known placement decision. | No architecture currentness claim. Report the bounded decision or repair only. |
| `full` | The question spans multiple areas, unclear ownership, ADRs, stale architecture model, target architecture, or broad governance state. | Architecture currentness only after required full verify passes. |

Subpath labels are internal routing labels, not user-facing modes. Do not create mode names such as `place-lite`, `repair-lite`, or `adopt-lite`.

### Architecture Routing Matrix

| Signal | Recommended mode/subpath | Verification requirement | Skip scoped path / escalation rule |
|---|---|---|---|
| Placement question only, one clear feature/module/integration, existing rules identify owner and allowed dependencies | `place` scoped | No architecture verify required for the placement answer itself because `place` does not change docs or code; later implementation follows normal update impact routing. | Skip scoped `place` and escalate to `place` full if ownership, dependency direction, public contract, ADR relevance, or multiple boundaries are unclear. |
| Placement depends on multiple boundaries, competing owners, unclear dependency direction, or accepted ADR interpretation | `place` full | No architecture-current claim without full verify if docs are changed. | Output `Needs ADR` or `Needs User Decision` rather than guessing. |
| Localized implementation violates one known architecture rule and the rule itself is current | `repair` scoped | After repair, run full verify before claiming repair complete or architecture currentness. A scoped repair may report bounded work performed, but not repair completion, before full verify. | Skip scoped `repair` and escalate to `repair` full if violations span multiple areas, touch ADRs, or imply the architecture model is stale. |
| Many violations, repeated drift, contradictory rules, or stale current architecture docs | `repair` full or recommend `rebuild` | Full verify required before repair completion or architecture-current claim. | Recommend `rebuild` when current docs are too stale or contradictory to repair incrementally. |
| Current architecture docs/ADRs intentionally changed | `repair` full, `adopt` full, or `rebuild` depending on intent | Full architecture-aware verify before any currentness claim. | Require explicit user intent and ADR/user-decision handling. |
| New architecture baseline for one clear existing area without ADR adjacency or boundary changes outside that area | `adopt` scoped | Full verify required before claiming adopt complete or architecture currentness. | Skip scoped `adopt` and escalate to `adopt` full if governance affects other areas, accepted ADRs, shared boundaries, rebuild state, or ownership/dependency rules beyond the scoped area. |
| New architecture baseline spans multiple areas or changes ownership/boundary rules | `adopt` full | Full verify required before adopt completion or architecture-current claim. | Require explicit user intent; do not treat as routine update. |
| Target architecture is needed because current architecture references are too stale or contradictory | `rebuild` recommendation | Rebuild has its existing full completion gates. | `rebuild` remains exceptional; recommend it only when incremental repair is unsafe. |

If architecture risk is ambiguous, choose the lightest safe architecture path only when current architecture references clearly rule out boundary, ownership, dependency-direction, ADR, and rebuild impact. Otherwise escalate. Scoped `place` has no verify gate because it answers a pre-implementation placement question without mutating artifacts; scoped `repair` and scoped `adopt` can mutate documentation/governance and therefore preserve full verify before completion/currentness claims.

### ADR and Rule-Change Safeguards

- Architecture rules, placement rules, accepted ADRs, and rebuild status must not be changed unless the user explicitly requested architecture governance changes.
- ADR-adjacent scoped work must escalate to full architecture review unless current references clearly show no ADR or decision boundary is implicated.
- If a scoped path discovers ADR relevance, ownership ambiguity, dependency-direction ambiguity, or broader rule impact, stop the scoped path and report the required escalation.
- A scoped path may record current implementation facts, but must not legalize a violation by weakening rules.

## Architecture Selection

Architecture selection records the current or target architecture choice. It must not invent implementation facts.

### Primary Preset

Supported presets:

1. Layered Architecture
2. Feature Modular Architecture
3. Clean / Hexagonal Architecture
4. DDD Modular Monolith
5. Microservices Architecture
6. Event-driven Architecture
7. Serverless Architecture
8. Frontend Feature-Sliced Architecture
9. AI / Agent / RAG Architecture
10. Lightweight Tooling Architecture
11. Mixed / Hybrid for existing projects that do not fit one preset cleanly

Generated project docs should use preset summary plus selected preset rules only. Do not expand all preset rules into a project that uses one preset.

### Addons

Supported addons:

| Addon | Purpose |
|---|---|
| Strong Module Boundaries | Prevent cross-module internal imports and ownership ambiguity. |
| Dependency Inversion | Require ports/adapters when selected architecture needs it. |
| State Machine / Illegal State Prevention | Keep state transitions behind owner/use case/state machine boundaries. |
| Typed Error / Error Code Model | Keep production failures diagnosable. |
| Testability First | Keep use cases, domain rules, and adapter contracts testable. |
| Observability by Default | Require logs, trace IDs, metrics, or diagnostic context on critical paths. |
| Event-driven Integration | Govern event ownership, publisher/consumer contracts, idempotency, and consistency. |
| Security Boundary | Govern auth, authorization, audit, and security context boundaries. |
| Performance and Resilience | Govern caching, timeouts, retries, circuit breakers, backoff, and degradation. |
| Architecture Tests | Require automated boundary checks when selected. |

### Adoption Mode

| Mode | Meaning |
|---|---|
| `strict` | Changed and new code must comply. Core violations are usually errors. |
| `incremental` | New code complies; old code migrates by adoption plan. |
| `descriptive` | Describe current architecture and report risks without forcing broad refactors. |
| `rebuild` | Current/target architecture and adoption plan govern place and verify. |

## Boundary Contract

Architecture docs must define enforceable boundaries:

- Module ownership rules.
- Layer dependency rules.
- Cross-module access rules.
- Public contract rules.
- Shared code rules.
- Infrastructure access rules.
- State, error, and observability rules.
- Failure localization rules.

## Placement & Boundary Review

Use `place` scoped when the placement question is limited to one clear new file, module, integration, behavior, or public contract and current architecture references identify the governing boundary. Use `place` full when placement depends on multiple boundaries, unclear ownership, competing ADRs, or dependency direction that cannot be resolved from current references.

`place` must output:

- Feature intent.
- Decision and confidence.
- Owning module and secondary modules.
- Layer placement.
- Allowed dependencies.
- Forbidden dependencies.
- Required public contracts.
- Forbidden shortcuts.
- Specs and architecture files to read.
- Implementation constraints.
- Failure localization hints.
- Specs to update after implementation.
- Open questions.

If ownership, dependency direction, or public contract is unclear, output `Needs ADR` or `Needs User Decision`.

### Preset-specific Placement Checks

`place` must consume the selected Primary Preset, Addons, and Adoption Mode before producing a placement review.

- Layered Architecture: check layer responsibility and forbidden layer jumps.
- Feature Modular Architecture: check owner feature/module and forbid imports into another feature's internal implementation.
- Clean / Hexagonal Architecture: check ports/adapters and prevent domain-to-infrastructure dependency.
- DDD Modular Monolith: check bounded context ownership and public contracts between contexts.
- Microservices Architecture: check service ownership, API/event contracts, and data ownership boundaries.
- Event-driven Architecture: check event ownership, publisher/consumer contracts, idempotency, and consistency boundaries.
- Serverless Architecture: check function ownership, event triggers, external service boundaries, and deployment/runtime constraints.
- Frontend Feature-Sliced Architecture: check feature/entity/shared slice boundaries and forbid cross-slice internal access.
- AI / Agent / RAG Architecture: check agent/tool/memory/evaluation/RAG boundaries and prompt/tool contract ownership.
- Lightweight Tooling Architecture: check simple module ownership without adding unnecessary layers.
- Mixed / Hybrid: identify which local preset governs the changed area; if unclear, output `Needs ADR` or `Needs User Decision`.

### place Hard Rules

1. `place` must run after intent intake and before detailed implementation planning for non-trivial changes.
2. `place` must not modify code.
3. `place` must not create implementation specs as if behavior already exists.
4. `place` may be tentative, but must not invent ownership when information is missing.
5. If ownership, dependency direction, or public contract is unclear, output `Needs ADR` or `Needs User Decision`.
6. Implementation plans must not ignore placement review; if a plan conflicts, stop and resolve by re-running `place`, asking the user, or creating an ADR.
7. Do not cross module boundaries through internal imports.
8. Do not bypass declared public contracts, ports, events, adapters, or state owners.
9. Scoped `place` answers only the bounded placement question and must not claim architecture currentness.
10. Full `place` is required when ownership, dependency direction, public contract, ADR relevance, or competing boundary rules are unclear.
11. `place` must not modify architecture rules; it may output `Needs ADR` or `Needs User Decision`.

## Architecture Repair Routing

`repair` remains documentation alignment, not business-code repair. Architecture repair has scoped and full subpaths:

| Repair subpath | Use when | Required boundary |
|---|---|---|
| `repair` scoped | One localized doc/spec/architecture drift or one known implementation violation is measured against a current, explicit architecture rule. | Do not change architecture rules or accepted ADRs unless the user explicitly requested that governance change. |
| `repair` full | Violations span multiple areas, current rules contradict implementation in several places, accepted ADRs are implicated, or the architecture model may be stale. | Run full verify before claiming repair completion or architecture currentness. |

A scoped repair may identify the bounded repair action, but repair completion and architecture-current claims still require full verify according to `verification.md`. If scoped repair discovers broader drift, ADR impact, or stale architecture rules, report escalation instead of continuing as scoped repair.

## Debugging Rules

An optional `docs/spec-docs/architecture/debugging-rules.md` may exist when the project needs architecture-guided debugging rules. Template: `templates/debugging-rules.md`. It defines boundary-first diagnosis: follow architecture boundaries, identify owner module and layer, check public contracts before internals, check adapters before external services, check state transitions before patching symptoms. Do not invent debugging paths; use `[NEEDS CLARIFICATION: ...]` when information is unknown.

## Failure Localization

Failure Localization uses architecture rules to narrow investigation scope without inventing root causes.

It must identify:

- Owner module or `[NEEDS CLARIFICATION: owner cannot be determined from available evidence]`.
- Likely failing layer: UI/API, application, domain, adapter, external dependency, or cross-module contract.
- Public contracts, ports, events, adapters, state owners, and observability signals to check before internal implementation.
- Modules, shared utilities, or infrastructure that should not be modified first without evidence.

Failure Localization must be grounded in code, tests, logs, existing docs, confirmed architecture, or user-confirmed operational knowledge. If evidence is missing, record a specific `[NEEDS CLARIFICATION: ...]` marker.

## Diagnose

`diagnose` is architecture-guided triage, not a debugger and not direct code repair. Template: `templates/diagnosis.md`.

It should output:

- Symptom.
- Likely ownership.
- Likely failure boundary.
- First specs/files to inspect.
- Logs/metrics/error signals to check.
- Do not start here.
- Suggested debugging order.
- Possible fix areas.

It must not claim root cause without evidence.

### Diagnose Scope Decision

Phase 4 does not add a scoped diagnose subpath. `diagnose` can already triage one reported symptom using the smallest relevant architecture references, but it is not a receiving mode for Phase 2 Level 4 update escalation.

Defer a named scoped diagnose path until real-use replay shows diagnose itself is too heavy. Level 4 update escalation recommends `place`, `repair`, `rebuild`, or `adopt`, not `diagnose`.

## Architecture Adopt Routing

`adopt` is for introducing or merging architecture governance after implementation evidence exists.

| Adopt subpath | Use when | Escalation rule |
|---|---|---|
| `adopt` scoped | One clear existing area needs architecture governance and current evidence shows no ADR adjacency, no ownership-boundary changes outside that area, and no rules that affect other areas. | Escalate to `adopt` full if the proposed governance affects other areas, accepted ADRs, shared boundaries, or rebuild state. |
| `adopt` full | Governance spans multiple areas, merges completed target architecture, updates placement rules broadly, or changes ownership/dependency rules. | Require explicit user intent and full verify before adopt completion or architecture-current claims. |

Scoped adopt cannot claim architecture currentness. Full verify remains required before adopting target architecture into current architecture or claiming adopt complete.

## Architecture Review Cadence

Run architecture-focused verify when:

- Adding a new module.
- Changing public contracts.
- Touching cross-module dependencies.
- Modifying shared/common/utils.
- Introducing or changing infrastructure adapters.
- Changing state ownership or transitions.
- Changing error model or production error path.
- Changing observability on critical paths.
- Entering, pausing, resuming, or completing rebuild.
- Implementing active target architecture scope.

## Rebuild Recommendation

`rebuild` remains exceptional. Recommend `rebuild` only when current architecture references are too stale, broad, or contradictory to safely repair incrementally, or when the user explicitly wants a target architecture migration.

A rebuild recommendation must state:

- why scoped `place`, scoped `repair`, or scoped `adopt` is unsafe;
- which current architecture references are stale, contradictory, or insufficient;
- what user decision or ADR is needed before migration planning;
- that ordinary `update` must not rewrite architecture rules to legalize current drift.

## Architecture Drift

Architecture drift is gradual movement away from selected architecture before a single hard violation is obvious. Example: `shared/utils` accumulates billing-specific helpers and ownership becomes unclear.

Report as:

```text
[ARCHITECTURE VIOLATION: ARCHITECTURE DRIFT][warning]
```

## Architecture Hard Gates

1. Architecture docs must record Primary Preset, Addons, Adoption Mode, rationale, confidence, and known deviations.
2. Architecture docs must define enforceable boundaries.
3. Empty-project init may create confirmed architecture constraints but must not create fake implementation facts.
4. Existing-project init must infer current preset from code and may mark Mixed / Hybrid.
5. Rebuild must choose target preset, addons, adoption mode, and migration strategy.
6. Placement review must include allowed dependencies, forbidden dependencies, required contracts, and forbidden shortcuts.
7. Placement review must consume Primary Preset, Addons, and Adoption Mode.
8. Implementation plans must follow placement review or re-run place / create ADR.
9. Cross-module access must use public API, port, event, adapter, or declared contract.
10. Domain must not depend on infrastructure when the selected preset/addons require dependency inversion.
11. Business logic must not be moved to shared/utils to avoid ownership decisions.
12. Repair must not weaken architecture rules without explicit confirmation or ADR.
13. Verify must report module boundary, layer, contract, infrastructure, shared-code, state/error, ownership, architecture drift, and observability violations when detectable.
14. Verify severity must reflect Adoption Mode and enabled Addons.
15. Diagnose must follow architecture boundaries and must not recommend modifying unrelated modules first.
16. Diagnose is architecture-guided triage, not an automatic debugger or direct code repair mode.
17. Failure Localization must be grounded in code, tests, logs, existing docs, confirmed architecture, or user-confirmed operational knowledge.
18. Module specs should record boundary and failure localization information when such information is known.
