# Placement Rules

Read `docs/spec-docs/architecture/current-architecture.md` for the selected Primary Preset, Addons, and Adoption Mode values before filling in this file.

## Module Ownership Rules

- Behavior is assigned to the module whose responsibility boundary covers it.
- Extend an existing module when the new behavior fits its declared responsibility.
- Create a new module when no existing module's responsibility covers the behavior.
- When ownership is ambiguous, flag `Needs ADR` or `Needs User Decision`. Do not guess.

Rules reflect the selected Primary Preset:
- **Feature Modular**: behavior lives within its owning feature module; cross-feature access uses public contracts only.
- **Layered**: behavior lives within the appropriate layer; cross-layer access follows dependency direction.
- **Clean/Hexagonal**: behavior lives within domain or application; infrastructure access uses ports/adapters only.
- **DDD Modular Monolith**: behavior lives within its bounded context; cross-context access uses public APIs or events.
- **Microservices**: behavior lives within its service; cross-service access uses declared contracts or events.
- **Frontend Feature-Sliced**: behavior lives within its feature slice; cross-slice access uses public exports only.
- **Mixed/Hybrid**: apply the rule of the most relevant owning unit; record deviations explicitly.

## Layer Dependency Rules

- Allowed dependency direction: [Specify based on Primary Preset, e.g., UI/API -> Application -> Domain -> Infrastructure/Adapter]
- Forbidden dependency direction: [e.g., Domain must not depend on Infrastructure when Dependency Inversion addon is active]
- Layer-specific responsibilities: [Define what each layer owns and what it must delegate]

| From Layer | To Layer | Condition |
|------------|----------|-----------|
| [layer] | [layer] | [when allowed, or "always" / "never"] |

Rules reflect the selected Addons:
- **Dependency Inversion**: domain and application must not depend on infrastructure; access goes through declared ports and adapters.
- **Testability First**: key use cases and domain rules must remain testable without infrastructure dependencies.
- **Architecture Tests**: allowed/forbidden dependencies should be enforced by automated boundary checks where available.

## Cross-module Access Rules

- Allowed communication: public API, port, event, contract, or declared schema.
- Forbidden: direct import into another module's internal implementation.
- Reading another module's state: only through its declared public contract or query port.
- Mutating another module's state: only through its declared command port, event, or API.

Rules reflect Adoption Mode:
- **strict**: all cross-module access must use declared contracts; violations are errors.
- **incremental**: new code must use declared contracts; legacy access may be flagged as warnings.
- **descriptive**: report deviations without requiring immediate refactoring.
- **rebuild**: new code in target scope must use target architecture contracts; legacy code follows current rules.

## Public Contract Rules

- Public APIs, ports, events, DTOs, and schemas live in declared, discoverable locations within the owning module.
- Contract changes that affect consumers require: spec updates, test updates, or ADR when breaking.
- Internal implementation: anything not exported through declared contracts is internal and must not be imported by other modules.

| Contract Type | Location | Change Protocol |
|---------------|----------|----------------|
| [e.g., public API] | [path or module] | [spec update / test / ADR required] |

## Shared Code Rules

- Shared code may contain stable cross-module primitives only: utility functions, type definitions, constants, and serialization helpers.
- Business behavior must not be moved to shared/common/utils to avoid ownership decisions.
- Shared code must not become an implicit cross-module communication channel.
- When the **Strong Module Boundaries** addon is active, shared code is restricted to non-behavioral primitives only.

| Shared Code | Contents | Ownership |
|-------------|----------|-----------|
| [shared path] | [what belongs here] | [who maintains it] |

## Infrastructure Access Rules

- DB, cache, queue, and external SDK access must go through declared adapters, repositories, gateways, or providers.
- Domain must not depend on infrastructure when the **Dependency Inversion** addon is active.
- Application code must not bypass ports/adapters when the architecture requires them.
- Cross-module code must not access another module's infrastructure directly.

| Infrastructure | Adapter/Provider | Access Constraint |
|----------------|-----------------|-------------------|
| [e.g., Database] | [adapter name] | [who may access it, through what] |

## State, Error, and Observability Rules

- State ownership: each state is owned by one module; transitions go through declared entry points (use case, state machine, or command port).
- Error model: production paths must have diagnosable errors; propagation follows declared boundaries.
- Observability: critical paths require logs, trace IDs, metrics, error codes, or diagnostic context based on enabled addons.

Rules reflect the selected Addons:
- **State Machine / Illegal State Prevention**: invalid state transitions are errors; state changes must go through the owner.
- **Typed Error / Error Code Model**: production paths without diagnosable errors are warnings; critical paths without them are errors in `strict` mode.
- **Observability by Default**: missing diagnostic context on critical paths is a warning; in `strict` mode it may be an error.
- **Event-driven Integration**: event ownership, publisher/consumer contracts, and idempotency must be declared.

## Failure Localization Rules

- Identify owner module: check which module's responsibility boundary covers the failing behavior.
- Identify failing layer: check API boundary, application use case, domain rule, adapter, external dependency, in that order.
- Trace public contracts before inspecting internals.
- Check adapters before external services.
- Check state transitions before patching symptoms.
- Do not start by modifying unrelated modules or shared utilities.

ADR Triggers:
- New module or layer creation.
- Cross-boundary dependency that violates rules above.
- Change to dependency direction convention.
- Shared code that could belong to multiple modules.
- Ownership ambiguity that cannot be resolved from existing architecture.

## Tentative Placement Policy

Tentative placements are allowed when Preset Confidence is Medium or Low. A tentative placement must:

- Be recorded in `docs/spec-docs/reviews/` with `Decision: Tentative`.
- Include `Open Questions` and set `Decision` / `Confidence` accordingly.
- Be promoted to `Final` or resolved via ADR before the feature is considered complete.
- Be re-evaluated if the implementation scope changes.
