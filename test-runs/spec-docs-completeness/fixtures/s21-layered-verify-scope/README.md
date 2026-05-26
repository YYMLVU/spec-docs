# S21 Layered Verify Scope Fixture

This fixture describes a project where the user asks for a scoped verification of documentation mechanics and mapping only.

The intended behavior is a `layered-check`, not full verify:

- checked layers: `mechanical`, `mapping`;
- unchecked layers: `semantic`, `architecture`, `freshness`;
- no release, workspace, semantic, or architecture currentness claim is allowed;
- if mechanical and mapping checks pass, the result may only claim those layers passed for the checked files.

Representative files in the prompt:

- `docs/spec-docs/specs/payments/refunds.spec.md`
- `docs/spec-docs/inventory.md`
- `src/payments/refunds.js`
