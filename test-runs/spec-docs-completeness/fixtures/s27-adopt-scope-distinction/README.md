# S27 Adopt Scope Distinction Fixture

This fixture contains three adopt requests to distinguish scoped adopt, full adopt, and ADR-adjacent adopt escalation.

Case A: scoped adopt

- The user wants to add architecture governance for the existing `reports` feature only.
- Evidence is limited to one feature directory and one spec.
- No accepted ADRs are implicated.
- No ownership boundary changes affect other areas.
- No rebuild status exists.

Case B: ADR-adjacent adopt escalation

- The user wants to add architecture governance for the existing `billing` feature.
- The proposed governance changes how billing may access users data.
- `docs/spec-docs/adrs/0007-user-data-ownership.md` is accepted and defines the existing data ownership boundary.
- The request would reinterpret or narrow that accepted ADR.

Case C: full adopt

- The user wants to merge completed target architecture into current architecture.
- `docs/spec-docs/rebuild/status.md` says `Current Phase: ready-to-adopt`.
- Target architecture affects multiple features and placement rules.
- ADR implementation evidence must be updated.

Expected route: Case A uses `adopt` scoped with no architecture-current claim until full verify. Case B escalates from scoped adopt to full adopt plus user decision or ADR handling. Case C uses `adopt` full with existing completed-rebuild gates.
