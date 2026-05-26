# Architecture Governance Review Prompt

## Purpose

Review scenario outputs S1, S3, S4, S5, S7, S8, S9, S11, S12, S20, and S22 against the architecture governance layer defined in `references/architecture-control.md` and `SKILL.md`. Evaluate whether the six architecture control responsibilities are correctly exercised by their respective scenarios, and whether architecture gates are respected.

## Architecture Control Layer Responsibilities

The architecture governance layer has six responsibilities. Each is tested by specific scenarios:

| Responsibility | Tested By | Key Evidence to Evaluate |
|---|---|---|
| Architecture Selection | S1, S7, S8, S12 | Primary Preset, Addons, Adoption Mode, confidence, rationale, known deviations |
| Placement | S3 | Feature intent, ownership, layer placement, allowed/forbidden dependencies, required public contracts, forbidden shortcuts |
| Boundary Contract | S3, S4, S5 | Module ownership rules, layer dependency rules, cross-module access rules, public contract rules, shared code rules, infrastructure access rules |
| Compliance Verification | S5, S11, S20, S22 | Architecture violation subtypes detected, severity reflects Adoption Mode/Addons, evidence and source documents cited, Level 4 escalation compliance checked (architecture-risk reclassification, no silent rewrite of rules/ADRs, mid-update reclassification), scoped verify escalation behavior |
| Failure Localization | S9 | Owner module, failing layer, signals to check, debugging order |
| Rebuild Evolution | S7, S8, S12 | Target preset/addons, adoption plan, rebuild status, target-architecture merge |

## Inputs

- `results/scenario-outputs/s01.md` -- Architecture Selection (empty-project init with/without architecture confirmation)
- `results/scenario-outputs/s03.md` -- Placement & Boundary Review
- `results/scenario-outputs/s04.md` -- Update (architecture rule preservation)
- `results/scenario-outputs/s05.md` -- Verify (architecture violations and drift)
- `results/scenario-outputs/s07.md` -- Rebuild (state machine migration)
- `results/scenario-outputs/s08.md` -- Adopt (gradual adoption or target-architecture merge)
- `results/scenario-outputs/s09.md` -- Diagnose (architecture-guided triage)
- `results/scenario-outputs/s11.md` -- Architecture Drift Verify (business policy accumulating in shared utilities)
- `results/scenario-outputs/s12.md` -- True Adopt Completed Rebuild (merge/archive target docs)
- `results/scenario-outputs/s20.md` -- Level 4 Architecture-Risk Escalation
- `results/scenario-outputs/s22.md` -- Layered Verify Escalation (architecture-risk evidence in scoped check)
- `source-under-test/skills/spec-docs/references/architecture-control.md` -- normative architecture rules
- `source-under-test/skills/spec-docs/references/verification.md` -- verify output status, finding categories, violation subtypes, addon severity mapping
- `source-under-test/skills/spec-docs/SKILL.md` -- Architecture Gate Summary

## Review Steps

### 1. Architecture Selection (S1, S7, S8, S12)

For S1 (empty-project init):
- Architecture Selection records Primary Preset, Addons, Adoption Mode, rationale, confidence, and known deviations.
- Empty-project init with architecture creates `current-architecture.md` as constraints, not implementation facts.
- Empty-project init without architecture does not create `architecture/` directory.
- Adoption Mode is recorded (greenfield for empty projects).

For S7 (rebuild):
- Target Primary Preset, target Addons, and Adoption Mode `rebuild` are selected.
- Migration strategy and required ADRs are defined.
- `target-architecture.md` is created.
- Rebuild status in `rebuild/status.md` says `mode: rebuild`.
- During active rebuild, `place` and `verify` consider target architecture.

For S8 (adopt/gradual adoption):
- For first-time spec-docs projects (no prior setup): does NOT attempt full rewrite; guides toward gradual adoption through `init`.
- For true adopt (rebuild complete): verifies code matches target rules, merges target into current, archives target docs, marks rebuild completed.
- Confidence level stated; `[NEEDS CLARIFICATION: ...]` used for unknown facts.
- Known deviations documented.

For S12 (true adopt completed rebuild):
- Reads `rebuild/status.md` to confirm rebuild is complete.
- Verifies code aligns with target architecture rules.
- Merges target architecture into current architecture.
- Archives target docs.
- Marks rebuild completed in status.

### 2. Placement & Boundary Review (S3)

- `place` output includes: Feature Intent, Ownership, Layer Placement, Allowed Dependencies, Forbidden Dependencies, Required Public Contracts, Forbidden Shortcuts, Specs to Read, Implementation Constraints, Failure Localization Hints, Specs to Update After Implementation, Open Questions, Decision/Confidence.
- If ownership, dependency direction, or public contract is unclear, output says `Needs ADR` or `Needs User Decision`.
- `place` does not modify code.
- `place` does not create implementation specs as if behavior already exists.
- `place` runs after intent intake and before detailed implementation planning.

### 3. Architecture Rule Preservation During Update (S4)

- Architecture rules are NOT silently rewritten during `update`.
- Architecture weakening requires explicit user confirmation or ADR.
- Same-change spec sync includes architecture-adjacent spec updates.

### 4. Compliance Verification -- Violation Subtypes (S5, S11)

- Verify output includes `PASS`, `PASS WITH WARNINGS`, or `FAIL`.
- At least the following violation subtypes are checked when architecture docs exist:
  - `MODULE BOUNDARY`
  - `LAYER`
  - `CONTRACT`
  - `INFRASTRUCTURE ACCESS`
  - `SHARED CODE ABUSE`
  - `STATE OWNERSHIP`
  - `ERROR BOUNDARY`
  - `OBSERVABILITY`
  - `OWNERSHIP AMBIGUITY`
  - `ARCHITECTURE DRIFT`
  - `SECURITY BOUNDARY`
  - `RESILIENCE`
  - `PERFORMANCE BOUNDARY`
  - `AUTOMATED ARCHITECTURE TEST REQUIRED`
- Each architecture violation includes: subtype, severity, location, observed issue, expected architecture behavior, recommended action, evidence, and source documents checked.
- Severity reflects Adoption Mode and enabled Addons.
- Verify is honest about manual review needs when automated checks cannot confirm a rule.

### 5. Architecture Drift (S5, S11)

- `ARCHITECTURE DRIFT` subtype is detected when code gradually deviates without a single hard violation.
- Example: `shared/utils` accumulates business helpers, module boundaries blur.
- Reported at `warning` level.
- S11 verifies `ARCHITECTURE DRIFT` reporting for business policy accumulating in shared utilities.

### 6. Diagnose and Failure Localization (S9)

- `diagnose` is architecture-guided triage, not an automatic debugger or direct repair mode.
- Output includes: Symptom, Likely Ownership, Likely Failure Boundary, Specs/Files to Inspect, Signals to Check, Do Not Start Here, Suggested Debugging Order, Possible Fix Areas.
- Does not claim root cause without evidence.
- Does not recommend modifying unrelated modules first.
- Follows architecture boundaries as defined in `current-architecture.md`, `placement-rules.md`, `debugging-rules.md`.
- Failure Localization is grounded in code, tests, logs, existing docs, confirmed architecture, or user-confirmed operational knowledge. If evidence is missing, records `[NEEDS CLARIFICATION: ...]`.

### 7. Level 4 Escalation (S20)

- The change is classified as Level 4 even though the diff is small, because a cross-module boundary is bypassed.
- Architecture-risk signal is reported: cross-module access bypasses the declared public contract.
- `architecture/current-architecture.md`, `architecture/placement-rules.md`, and accepted ADRs are NOT silently rewritten to legalize the change.
- The appropriate mode (`place`, `repair`, `rebuild`, or `adopt`) is recommended.
- Full verify is required before claiming architecture state is current.
- If the change was initially treated as localized, reclassification upward to Level 4 occurs when the architecture risk is discovered (mid-update reclassification).
- If a factual spec update is suggested, the output states that architecture risk remains and architecture currentness is not claimed.
- S22 verifies that scoped layered checks report architecture-risk evidence and recommend escalation instead of claiming architecture currentness or silently expanding to full verify.

### 8. ADR and User-Decision Triggers

For scenarios where ownership, dependency direction, or public contract is unclear:
- Is `Needs ADR` or `Needs User Decision` output instead of guessing? (S3, S7, S8, S9)
- When architecture rules need weakening, is explicit user confirmation or ADR required? (S4, S6, S7, S8, S20)

### 9. Architecture Hard Gates

Check the 18 Architecture Hard Gates from `references/architecture-control.md`:
1. Architecture docs record Primary Preset, Addons, Adoption Mode, rationale, confidence, and known deviations.
2. Architecture docs define enforceable boundaries.
3. Empty-project init may create confirmed architecture constraints but must not create fake implementation facts.
4. Existing-project init must infer current preset and may mark Mixed / Hybrid.
5. Rebuild must choose target preset, addons, adoption mode, and migration strategy.
6. Placement review must include allowed/forbidden dependencies, required contracts, and forbidden shortcuts.
7. Placement review must consume Primary Preset, Addons, and Adoption Mode.
8. Implementation plans must follow placement review or re-run place / create ADR.
9. Cross-module access must use public API, port, event, adapter, or declared contract.
10. Domain must not depend on infrastructure when selected preset/addons require dependency inversion.
11. Business logic must not be moved to shared/utils to avoid ownership decisions.
12. Repair must not weaken architecture rules without explicit confirmation or ADR.
13. Verify must report module boundary, layer, contract, infrastructure, shared-code, state/error, ownership, architecture drift, and observability violations when detectable.
14. Verify severity must reflect Adoption Mode and enabled Addons.
15. Diagnose must follow architecture boundaries and must not recommend modifying unrelated modules first.
16. Diagnose is architecture-guided triage, not an automatic debugger or direct code repair mode.
17. Failure Localization must be grounded in evidence.
18. Module specs should record boundary and failure localization information when known.

## Output Format

```
## Architecture Governance Review

Status: PASS / PASS_WITH_NOTES / FAIL / BLOCKED

### Responsibility Coverage

| Responsibility | Status | Gaps |
|---|---|---|
| Architecture Selection | covered/partial/missing | |
| Placement | covered/partial/missing | |
| Boundary Contract | covered/partial/missing | |
| Compliance Verification | covered/partial/missing | |
| Failure Localization | covered/partial/missing | |
| Rebuild Evolution | covered/partial/missing | |

### Per-Scenario Findings

#### S1 -- Architecture Selection (Empty Project Init)

(Status, gaps, evidence)

#### S3 -- Placement & Boundary Review

(Status, gaps, evidence)

#### S4 -- Update (Architecture Rule Preservation)

(Status, gaps, evidence)

#### S5 -- Verify (Architecture Violations and Drift)

(Status, gaps, evidence)

#### S7 -- Rebuild (State Machine)

(Status, gaps, evidence)

#### S8 -- Adopt / Gradual Adoption

(Status, gaps, evidence)

#### S9 -- Diagnose and Failure Localization

(Status, gaps, evidence)

#### S11 -- Architecture Drift Verify

(Status, gaps, evidence)

#### S12 -- True Adopt Completed Rebuild

(Status, gaps, evidence)

#### S20 -- Level 4 Architecture-Risk Escalation

(Status, gaps, evidence)

#### S22 -- Layered Verify Escalation

(Status, gaps, evidence)

### Architecture Hard Gates

| Gate Number | Scenario(s) | Status | Notes |
|---|---|---|---|
| 1 | S1, S2, S7, S8 | pass/fail/not-applicable | |
| ... | ... | ... | |
| 18 | S9 | pass/fail/not-applicable | |

### ADR / User-Decision Triggers

(Summary of where ADRs or user decisions were correctly triggered, and where they might have been missed.)

### Classification

For each issue found, classify as:

| Issue | Classification |
|---|---|
| (issue description) | skill-fix / test-improvement / user-decision / acceptable-limitation |

### Overall Assessment

(Brief narrative summarizing architecture governance completeness.)
```