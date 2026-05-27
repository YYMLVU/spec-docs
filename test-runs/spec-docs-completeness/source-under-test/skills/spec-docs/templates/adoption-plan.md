# Adoption Plan

## Source Architecture

[Reference to `docs/spec-docs/architecture/current-architecture.md` and a brief summary of the current state.]

## Target Architecture

[Reference to `docs/spec-docs/architecture/target-architecture.md` and a brief summary of the target state.]

## Phases

[Ordered phases of migration from source to target. Each phase must be independently verifiable.]

### Phase 1: [phase name]

- Objective: [what this phase achieves]
- Changes: [specific structural or dependency changes]
- Verification: [how to confirm this phase is complete]

### Phase 2: [phase name]

- Objective: [what this phase achieves]
- Changes: [specific structural or dependency changes]
- Verification: [how to confirm this phase is complete]

## Risk Controls

[Describe how risks are managed during the adoption.]

| Risk | Control | Rollback |
|------|---------|----------|
| [risk] | [prevention/detection] | [rollback strategy] |

## New Code Policy

[State the policy for new code written during the adoption period, e.g., new code must follow target architecture, new code may follow current architecture until Phase N, etc.]

## Completion Criteria

[List the criteria that must be met before `spec-docs adopt` can be run.]

- All phases complete and verified.
- Code matches `target-architecture.md` rules.
- `verify` reports no `[ARCHITECTURE VIOLATION]` findings against target rules.
- ADR implementation evidence updated.

## Adopt/Archive Procedure

When all completion criteria are met:

1. Run `spec-docs adopt`.
2. Merge `target-architecture.md` content into `current-architecture.md`.
3. Update `placement-rules.md` if placement rules changed.
4. Update the rebuild ADR with implementation evidence.
5. Set `docs/spec-docs/rebuild/status.md` to `mode: rebuild`, `status: completed`.
6. Move `docs/spec-docs/architecture/target-architecture.md` and `docs/spec-docs/architecture/adoption-plan.md` to `docs/spec-docs/rebuild/archive/`.
7. Run full `spec-docs verify` before claiming adopt complete or architecture currentness.
