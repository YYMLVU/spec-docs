# Target Architecture

## Target Architecture Selection

- Target Primary Preset: [e.g., Layered, Feature Modular, Clean/Hexagonal, DDD Modular Monolith, Microservices, Event-driven, Serverless, Frontend Feature-Sliced, AI/Agent/RAG, Lightweight Tooling, Mixed/Hybrid]
- Target Addons: [e.g., Strong Module Boundaries, Dependency Inversion, State Machine, Typed Error Model, Testability First, Observability by Default, Event-driven Integration, Security Boundary, Performance and Resilience, Architecture Tests]
- Adoption Mode: rebuild
- Migration Strategy: [incremental | module-first | adapter-first | shared-cleanup-first | new-code-first]
- Required ADR: [ADR-XXX: decision title -- list ADRs that must be created or updated before migration begins]
- Target Boundary Changes: [Summary of boundary changes from current architecture, e.g., new modules, split modules, changed dependency direction, new public contracts, removed shortcuts]

## Target Preset/Style

[Describe the target architecture style, e.g., modular monolith, microservices, event-driven, hexagonal.]

## Addons

[List additional architectural patterns or infrastructure components introduced by the target that are not present in the current architecture.]

| Addon | Purpose | Phase |
|-------|---------|-------|
| [addon-name] | [purpose] | [adoption phase] |

## Target Module Boundaries

[Define the target module structure with clear responsibility boundaries.]

| Module | Responsibility | Key Exports | Change from Current |
|--------|---------------|-------------|---------------------|
| [module-name] | [responsibility] | [exported symbols] | [new/split/merged/renamed from current] |

## Target Dependency Direction

[Describe the target dependency direction between modules.]

```text
[layer/module] --> [depends on]
```

## Gap Summary

[Summarize the differences between current and target architecture.]

| Gap | Current State | Target State | Effort |
|-----|--------------|--------------|--------|
| [gap description] | [current] | [target] | [estimated effort] |

## ADR Links

[List ADRs that document decisions related to this target architecture.]

- [ADR-XXX: decision title]
