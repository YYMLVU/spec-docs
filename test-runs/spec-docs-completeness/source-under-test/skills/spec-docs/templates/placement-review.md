# Placement & Boundary Review

## Feature Intent

- Summary:
- User/system behavior:
- Acceptance criteria source:
- Confidence: High | Medium | Low
- Decision: Final | Tentative | Needs ADR | Needs User Decision

## Ownership

- Owning module:
- Secondary modules:
- Reason:
- New module needed: yes / no
- ADR needed: yes / no

## Layer Placement

- UI/API:
- Application:
- Domain:
- Infrastructure/Adapter:
- Tests:

## Boundary Contract

### Allowed Dependencies

- ...

### Forbidden Dependencies

- ...

### Required Public Contracts

- Public API:
- Port:
- Adapter:
- Event:
- DTO/Schema:

### Forbidden Shortcuts

- Do not import:
- Do not bypass:
- Do not place logic in:

## Specs and Architecture Files to Read

- `docs/spec-docs/constitution.md`
- `docs/spec-docs/inventory.md` if present
- Related specs:
- Related architecture rules:
- Related ADRs:

## Implementation Constraints

- Required tests:
- Required error handling:
- Required state handling:
- Required observability:

## Failure Localization Hints

If this feature fails, inspect in this order:

1. API/UI boundary:
2. Application use case:
3. Domain rule:
4. Adapter/infrastructure:
5. External dependency:
6. Cross-module contract:

## Specs to Update After Implementation

- ...

## Open Questions

- ...
