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

### place Hard Rules

1. `place` must run after intent intake and before detailed implementation planning for non-trivial changes.
2. `place` must not modify code.
3. `place` must not create implementation specs as if behavior already exists.
4. `place` may be tentative, but must not invent ownership when information is missing.
5. If ownership, dependency direction, or public contract is unclear, output `Needs ADR` or `Needs User Decision`.
6. Implementation plans must not ignore placement review; if a plan conflicts, stop and resolve by re-running `place`, asking the user, or creating an ADR.
7. Do not cross module boundaries through internal imports.
8. Do not bypass declared public contracts, ports, events, adapters, or state owners.

## Debugging Rules

An optional `docs/spec-docs/architecture/debugging-rules.md` may exist when the project needs architecture-guided debugging rules. Template: `templates/debugging-rules.md`. It defines boundary-first diagnosis: follow architecture boundaries, identify owner module and layer, check public contracts before internals, check adapters before external services, check state transitions before patching symptoms. Do not invent debugging paths; use `[NEEDS CLARIFICATION: ...]` when information is unknown.

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
16. Failure Localization must be grounded in code, tests, logs, existing docs, confirmed architecture, or user-confirmed operational knowledge.
17. Module specs should record boundary and failure localization information when such information is known.
