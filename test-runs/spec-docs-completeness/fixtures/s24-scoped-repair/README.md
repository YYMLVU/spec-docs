# S24 Scoped Repair Fixture

This fixture describes a localized architecture documentation repair against one known current rule.

Project facts:

- Current architecture says domain code must not import infrastructure clients directly.
- One spec incorrectly says `src/domain/order.js` may call `src/infra/order-repository.js` directly.
- Current implementation already uses the correct `OrderRepositoryPort` boundary.
- The stale statement is limited to one orders spec section.
- No accepted ADRs are changed.
- No architecture rule weakening is requested.
- No architecture currentness claim is requested until verify passes.

Expected route: `repair` scoped, followed by full verify before repair completion or architecture-current claim.
