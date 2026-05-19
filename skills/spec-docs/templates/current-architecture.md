# Current Architecture

## Architecture Style

[Describe the current architecture style, e.g., monolith, modular monolith, microservices, serverless, event-driven, layered.]

## Modules

[List each module with its responsibility boundary and key exported symbols.]

| Module | Responsibility | Key Exports |
|--------|---------------|-------------|
| [module-name] | [responsibility] | [exported symbols] |

## Dependency Direction

[Describe the allowed dependency direction between modules, e.g., inner modules must not depend on outer modules, domain must not depend on infrastructure.]

```text
[layer/module] --> [depends on]
```

## Placement Rules

See `docs/spec-docs/architecture/placement-rules.md` for detailed placement rules governing where new code and modules should be placed.

## Boundaries

[Describe the hard boundaries between modules or layers. Cross-boundary access must go through declared contracts.]

| Boundary | Contract | Enforced By |
|----------|----------|-------------|
| [boundary-name] | [interface/contract] | [manual/automated] |

## Risks

[List known architecture risks, drift areas, or coupling that violates the intended dependency direction.]

| Risk | Impact | Mitigation |
|------|--------|------------|
| [risk description] | [impact level] | [current or planned mitigation] |
