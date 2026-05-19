# Placement Rules

## Ownership

[Describe who owns placement decisions and how conflicts are resolved. State whether placement requires review, ADR, or user decision.]

## Layer Mapping

[Map each logical layer to its directory or module location in the project.]

| Layer | Directory/Module | Responsibility |
|-------|-----------------|----------------|
| [layer-name] | [path] | [responsibility] |

## Allowed Dependencies

[List which dependencies between layers and modules are permitted.]

| From | To | Condition |
|------|----|-----------|
| [layer/module] | [layer/module] | [when allowed] |

## Forbidden Dependencies

[List which dependencies between layers and modules are prohibited.]

| From | To | Reason |
|------|----|--------|
| [layer/module] | [layer/module] | [why forbidden] |

## ADR Triggers

[Describe conditions that require an ADR before placement can be finalized.]

- New module or layer creation
- Cross-boundary dependency that violates forbidden dependency rules
- Change to the dependency direction convention
- Shared code that could belong to multiple modules
- [additional trigger conditions]

## Tentative Placement Policy

Tentative placements are allowed when confidence is Medium or Low. A tentative placement must:

- Be recorded in `docs/spec-docs/reviews/` with `Decision: Tentative`.
- Include `Missing Information` and `Recommended Next Step`.
- Be promoted to `Final` or resolved via ADR before the feature is considered complete.
- Be re-evaluated if the implementation scope changes.
