# S22 Layered Verify Escalation Fixture

This fixture describes a scoped verification request that discovers evidence outside the requested safe scope.

The intended behavior:

- start from a requested `layered-check` for `mechanical` and `mapping`;
- discover that the changed mapping references a new cross-layer import or architecture-owned path;
- do not silently broaden the check and claim full verify;
- return `PASS WITH WARNINGS` or `FAIL` for the scoped check, depending on the concrete finding;
- recommend Level 4 escalation or full verify before any architecture-current claim.

Representative files in the prompt:

- `docs/spec-docs/specs/orders/module.spec.md`
- `docs/spec-docs/inventory.md`
- `src/domain/order.js`
- `src/infra/order-repository.js`
- `docs/spec-docs/architecture/current-architecture.md`
