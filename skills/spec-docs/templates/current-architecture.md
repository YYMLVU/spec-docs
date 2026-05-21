# Current Architecture

## Architecture Selection

- Primary Preset: [e.g., Layered, Feature Modular, Clean/Hexagonal, DDD Modular Monolith, Microservices, Event-driven, Serverless, Frontend Feature-Sliced, AI/Agent/RAG, Lightweight Tooling, Mixed/Hybrid]
- Preset Confidence: [High | Medium | Low]
- Preset Source: [user-confirmed | inferred-from-code | hybrid]
- Addons: [e.g., Strong Module Boundaries, Dependency Inversion, State Machine, Typed Error Model, Testability First, Observability by Default, Event-driven Integration, Security Boundary, Performance and Resilience, Architecture Tests]
- Adoption Mode: [strict | incremental | descriptive | rebuild]
- Rationale: [Why this preset and these addons were chosen or identified]
- Known Deviations: [Where current code does not match the selected preset or addon constraints; use [NEEDS CLARIFICATION: ...] if uncertain]

## Module Model

- Organization: [How modules are organized, e.g., by feature, by domain, by technical layer]
- Ownership: [How behavior is assigned to modules; when to extend vs. create a new module]
- Public Contracts: [How modules expose public APIs, ports, events, DTOs, or schemas]
- Internal Boundary: [What counts as internal-only implementation; what must not be imported by other modules]

| Module | Responsibility | Key Exports | Internal Boundary |
|--------|---------------|-------------|-------------------|
| [module-name] | [responsibility] | [exported symbols] | [what must not be imported externally] |

## Layer Model

- Layers: [List each layer and its responsibility]
- Dependency Direction: [Allowed dependency direction, e.g., inner modules must not depend on outer, domain must not depend on infrastructure]
- Forbidden Dependencies: [Explicitly forbidden cross-layer dependencies]

| Layer | Responsibility | Allowed to Depend On | Must Not Depend On |
|-------|---------------|---------------------|-------------------|
| [layer-name] | [responsibility] | [allowed layers] | [forbidden layers] |

## Cross-module Communication

- Public API: [How modules expose callable APIs]
- Ports: [Port/adapter interfaces for cross-module access, if applicable]
- Events: [Event contracts for async cross-module communication, if applicable]
- Shared Schemas: [Shared DTOs, schemas, or contracts used across modules]
- Forbidden Shortcuts: [Direct imports or access patterns that bypass declared contracts]

## Infrastructure Boundary

- DB Access: [Which layer or adapter owns database access; how other code reaches the database]
- Cache Access: [Which layer or adapter owns cache access]
- Queue Access: [Which layer or adapter owns queue/message broker access]
- External SDK Access: [Which layer or adapter owns third-party SDK access; domain must not depend on infrastructure when Dependency Inversion addon is active]

## State and Error Boundary

- State Ownership: [Which module or use case owns each state; transition entry points]
- Error Model: [Unified error model or error code ownership; propagation rules]
- Illegal State Prevention: [How invalid state transitions are prevented, if State Machine addon is active; [NEEDS CLARIFICATION: ...] if not yet confirmed]

## Observability Boundary

Fill this section when Observability by Default is active or confirmed. Otherwise record specific current evidence or `[NEEDS CLARIFICATION: <specific question>]`.

- Required Logs: [Critical paths that require structured logging]
- Trace ID: [Where trace or correlation IDs are attached and propagated]
- Metrics: [Key metrics or monitoring points on production paths]
- Error Code: [Where diagnosable error codes must appear on production paths; [NEEDS CLARIFICATION: ...] if Observability addon is not yet confirmed]

## Debugging Model

- Locate Owner Module: [How to identify which module owns a failing behavior]
- Locate Failure Layer: [How to identify which layer (API, application, domain, adapter, external) is likely failing]
- Trace Cross-module Issues: [How to trace issues across module boundaries via public contracts and events]

## Placement Rules

See `docs/spec-docs/architecture/placement-rules.md` for detailed placement rules governing where new code and modules should be placed.

## Known Risks

| Risk | Impact | Current Constraint |
|------|--------|-------------------|
| [risk description] | [impact level] | [current constraint or known deviation; do not write planned mitigations] |
