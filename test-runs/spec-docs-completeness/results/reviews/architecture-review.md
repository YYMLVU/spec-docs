# Architecture Governance Review

Status: PASS_WITH_NOTES

## New Coverage

- S11 covers `[ARCHITECTURE VIOLATION: ARCHITECTURE DRIFT]` using a Feature Modular Architecture fixture where billing policy drifts into `src/shared/utils.js`.
- S12 covers true completed-rebuild `adopt` behavior using a fixture with `Current Phase: ready-to-adopt` and `Last Verify Result: PASS`.

## Remaining Notes

- F-001 remains: `greenfield` Adoption Mode semantics are still out of scope.
- F-005 remains: protocol block sync live-test is still out of scope.

## Responsibility Coverage

| Responsibility | Status | Notes |
| --- | --- | --- |
| Architecture Selection | covered | `greenfield` Adoption Mode is not in the standard table. |
| Placement | covered | S3 exercises Placement & Boundary Review. |
| Boundary Contract | covered | S3/S4/S5 exercise allowed/forbidden dependencies and contracts. S20 exercises boundary bypass escalation. |
| Compliance Verification | covered with notes | S5 detects fact drift and domain-to-infra violation; `greenfield` severity is ambiguous. S20 covers Level 4 escalation compliance. S22 covers scoped verify escalation behavior. |
| Failure Localization | covered | S9 uses debugging rules and module failure localization. |
| Rebuild Evolution | covered | S7 state-machine behavior covered; S12 now strengthens true adopt with completed-rebuild fixture. |

## Per-Scenario Findings

### S1 -- Architecture Selection (Empty Project Init)

Status: PASS. Records user-confirmed architecture constraints without inventing empty-project implementation facts. Does not guess architecture when absent.

### S3 -- Placement & Boundary Review

Status: PASS. Consumes Feature Modular Architecture and placement rules, identifies owner/dependencies/contracts, and escalates ambiguity.

### S4 -- Update (Architecture Rule Preservation)

Status: PASS. Updates the affected payments spec without silently rewriting architecture rules.

### S5 -- Verify (Architecture Violations and Drift)

Status: PASS_WITH_NOTES. Reports `[FACT DRIFT]` for accepted vs submitted and `[ARCHITECTURE VIOLATION]` for domain importing infrastructure. `greenfield` severity is ambiguous (F-001 out of scope).

### S7 -- Rebuild (State Machine)

Status: PASS. Determines rebuild phase from `docs/spec-docs/rebuild/status.md`, not target file existence.

### S8 -- Adopt / Gradual Adoption

Status: PASS_WITH_NOTES. Correctly notes true `adopt` cannot be fully tested with the fallback fixture.

### S9 -- Diagnose and Failure Localization

Status: PASS. Performs architecture-guided diagnosis without claiming root cause or modifying unrelated modules first.

### S11 -- Architecture Drift Verify

Status: PASS. Detects architecture drift where billing policy leaks into a shared utility, strengthening architecture compliance verification.

### S12 -- True Adopt Completed Rebuild

Status: PASS. Exercises adopt with a completed-rebuild fixture (`ready-to-adopt` phase, last verify PASS), covering merge/archive behavior.

### S20 -- Level 4 Architecture-Risk Escalation

Status: PASS. Classifies cross-module boundary bypass as Level 4, reports architecture-risk signal, does not silently rewrite architecture rules or accepted ADRs, recommends escalated mode, and requires full verify before architecture-current claims. Mid-update reclassification from localized to Level 4 is exercised when architecture risk is discovered during the update.

### S22 -- Layered Verify Escalation

Status: PASS. Scoped layered check discovers architecture-risk evidence and recommends escalation (Level 4/full verify) instead of claiming architecture currentness or silently expanding to full verify.

## Scenario Evidence

- S1 records user-confirmed architecture constraints without inventing empty-project implementation facts, and does not guess architecture when absent.
- S3 consumes Feature Modular Architecture and placement rules, identifies owner/dependencies/contracts, and escalates ambiguity.
- S4 updates the affected payments spec without silently rewriting architecture rules.
- S20 classifies cross-module boundary bypass as Level 4, reports architecture-risk signal, does not silently rewrite architecture rules or accepted ADRs, recommends escalated mode, and requires full verify before architecture-current claims. Mid-update reclassification from localized to Level 4 is exercised when architecture risk is discovered during the update.
- S22 discovers architecture-risk evidence during a scoped layered check and recommends escalation instead of claiming architecture currentness or silently expanding to full verify.
- S5 reports `[FACT DRIFT]` for accepted vs submitted and `[ARCHITECTURE VIOLATION]` for domain importing infrastructure.
- S7 determines rebuild phase from `docs/spec-docs/rebuild/status.md`, not target file existence.
- S8 correctly notes true `adopt` cannot be fully tested with the fallback fixture.
- S9 performs architecture-guided diagnosis without claiming root cause or modifying unrelated modules first.
- S11 detects architecture drift where billing policy leaks into a shared utility, strengthening architecture compliance verification.
- S12 exercises adopt with a completed-rebuild fixture (`ready-to-adopt` phase, last verify PASS), covering merge/archive behavior.

## Findings

| Finding | Status |
| --- | --- |
| F-002 Architecture Drift | covered by S11 |
| F-003 True Adopt Flow | covered by S12 fixture |
| Verify layered escalation | S22 preserves architecture governance during scoped verification: architecture-risk evidence discovered in a mechanical/mapping layered check is reported as out-of-scope risk, with escalation recommended before any architecture-current claim. |

## Level 4 Escalation Coverage

S20 validates that architecture-risk changes are classified as Level 4 even when the code diff is small. S22 validates that scoped layered checks discover architecture-risk evidence and recommend escalation. The scenarios exercise:
- Architecture-risk signal reporting for cross-module boundary bypass (S20)
- No silent rewrite of `architecture/current-architecture.md`, `architecture/placement-rules.md`, or accepted ADRs (S20)
- Recommendation of escalated mode (`place`, `repair`, `rebuild`, or `adopt`) (S20)
- Full verify required before architecture-current claims (S20)
- Mid-update reclassification when architecture risk is discovered during a localized update (S20)
- Architecture-risk evidence discovered during scoped verification is reported as out-of-scope risk with escalation recommended (S22)
- Scoped checks do not claim architecture currentness when architecture risk is present (S22)
- Scoped checks do not silently expand to full verify (S22)

No architecture governance weakening is expected from the impact routing extension because Level 4 always escalates on architecture risk, and ordinary `update` must not modify architecture rules or accepted ADRs.

## Architecture Hard Gates

| Gate | Scenario(s) | Status | Notes |
| --- | --- | --- | --- |
| 1 | S1, S2, S7, S8 | pass | Architecture docs record Primary Preset, Addons, Adoption Mode, rationale, confidence, and known deviations. |
| 2 | S3, S4, S5 | pass | Architecture docs define enforceable boundaries. |
| 3 | S1 | pass | Empty-project init does not create fake implementation facts. |
| 4 | S2, S13, S14 | pass | Existing-project init infers current preset, may mark Mixed/Hybrid. |
| 5 | S7 | pass | Rebuild chooses target preset, addons, adoption mode, and migration strategy. |
| 6 | S3 | pass | Placement review includes allowed/forbidden dependencies, required contracts, and forbidden shortcuts. |
| 7 | S3 | pass | Placement review consumes Primary Preset, Addons, and Adoption Mode. |
| 8 | S3, S4 | pass | Implementation plans follow placement review or re-run place / create ADR. |
| 9 | S3, S20 | pass | Cross-module access uses public API or declared contract. |
| 10 | S5 | pass | Domain does not depend on infrastructure under dependency inversion. |
| 11 | S11 | pass | Business logic is not moved to shared/utils to avoid ownership decisions. |
| 12 | S4, S6 | pass | Repair does not weaken architecture rules without confirmation or ADR. |
| 13 | S5, S11 | pass | Verify reports required violation subtypes when detectable. |
| 14 | S5, S11 | pass | Verify severity reflects Adoption Mode and enabled Addons. |
| 15 | S9 | pass | Diagnose follows architecture boundaries, does not recommend modifying unrelated modules first. |
| 16 | S9 | pass | Diagnose is architecture-guided triage, not automatic debugger or direct code repair. |
| 17 | S9 | pass | Failure Localization is grounded in evidence. |
| 18 | S3, S9 | pass | Module specs record boundary and failure localization information when known. |

## ADR / User-Decision Triggers

- S3: `Needs ADR` or `Needs User Decision` is output when ownership, dependency direction, or public contract is unclear.
- S4: Architecture weakening requires explicit user confirmation or ADR; rules are not silently rewritten.
- S7: Rebuild migration strategy and required ADRs are defined before proceeding.
- S8: Unknown facts use `[NEEDS CLARIFICATION: ...]` instead of guessing.
- S9: If evidence is missing, records `[NEEDS CLARIFICATION: ...]` rather than assuming.
- S20: Architecture-risk changes do not silently legalize drift; ADR or user confirmation required before weakening rules.

## Classification

| Issue | Classification |
| --- | --- |
| F-001 `greenfield` Adoption Mode semantics out of scope | acceptable-limitation |
| F-005 Protocol block sync live-test out of scope | acceptable-limitation |
| `greenfield` severity ambiguity in Compliance Verification | user-decision |

## Overall Assessment

Architecture governance coverage is strong. Placement, boundary, verify, rebuild, adopt, diagnose, Level 4 escalation behavior, and scoped verify escalation are covered. All prior findings are resolved with the S11/S12 extension. S20 covers Level 4 architecture-risk escalation and mid-update reclassification. S22 preserves architecture governance during scoped verification by reporting architecture-risk evidence as out-of-scope risk and recommending escalation before any architecture-current claim. Remaining F-001 and F-005 are out-of-scope for this extension suite.