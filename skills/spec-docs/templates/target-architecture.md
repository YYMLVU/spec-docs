# Target Architecture

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
