# Mode Completeness Review Prompt

## Purpose

Review scenario outputs in `results/scenario-outputs/` against `coverage/scenario-matrix.md` and the corresponding scenario prompts in `prompts/scenarios/`. Determine whether all eight modes (init, place, update, verify, repair, rebuild, adopt, diagnose) are adequately covered by their assigned scenarios, and that each mode stays within its documented responsibility boundary as defined in `references/modes.md` and `references/architecture-control.md`.

## Inputs

- `coverage/scenario-matrix.md` -- mode-to-scenario mapping and responsibility verification summary
- `prompts/scenarios/s01.md` through `prompts/scenarios/s28.md` -- scenario checklists
- `results/scenario-outputs/s01.md` through `results/scenario-outputs/s28.md` -- scenario execution outputs
- `source-under-test/skills/spec-docs/references/modes.md` -- normative mode behavior
- `source-under-test/skills/spec-docs/references/architecture-control.md` -- architecture mode contracts
- `source-under-test/skills/spec-docs/references/hard-gates.md` -- hard gate index
- `source-under-test/skills/spec-docs/SKILL.md` -- mode router and contracts

## Review Steps

1. Confirm every scenario output file exists for S01-S28 (or document which are missing).

2. For each mode, verify the scenario(s) assigned to it exercise the mode properly:
   - **init** (S1, S2, S13, S14, S15): S1 validates empty-project init produces only principle seed, no fake facts. S2 validates Minimal Existing Project init produces a minimal workspace without architecture/ADR/rebuild/empty category directories by default. S13 covers Standard Existing Project Init: grounded child specs for observed runtime, route, domain, and integration areas. S14 covers Large Project / Phased Init: `PARTIAL INIT` is allowed only as a non-final state and does not satisfy final included-scope coverage. S15 covers profile boundary classification beyond file count: classification uses observable complexity signals.
   - **place** (S3, S23): Placement & Boundary Review before detailed planning; includes allowed/forbidden dependencies, public contracts, forbidden shortcuts, failure localization hints; does not modify code. S23 verifies bounded placement can use scoped `place` without broad architecture workflow or architecture-current claim.
   - **update** (S4, S16, S17, S18, S19, S20, S28): Same-change spec sync uses Level 0-4 impact routing. S16 validates Level 0 no-action. S17 validates Level 1 single-spec touch without full verify. S4 and S18 validate Level 2 targeted light check and no full verify claim. S19 validates Level 3 full verify for broad changes. S20 validates Level 4 architecture-risk escalation without silently rewriting architecture rules or accepted ADRs. S28 verifies duplicate trigger wording does not reintroduce unconditional full verify for Level 0 through Level 2.
   - **verify** (S5, S11, S19, S20, S21, S22, S24, S25, S26, S27, S28): Fact drift, decision drift, architecture violation subtype reporting, full verify gates, and layered verify scope behavior. S11 verifies ARCHITECTURE DRIFT reporting for business policy accumulating in shared utilities. S19 verifies full verify is required for Level 3 broad updates. S20 verifies full verify is required before architecture-current Level 4 claims. S21 verifies mechanical+mapping layered checks do not overclaim. S22 verifies scoped checks surface architecture risk and recommend escalation. S24/S25/S26/S27 verify architecture scoped subpaths preserve full verify completion/currentness gates and avoid unsupported architecture-current claims. S28 verifies full verify is not required merely because Level 0, Level 1, or Level 2 work is ending.
   - **repair** (S6, S24, S25): Doc-only alignment; no business-code modifications; architecture repair requires explicit confirmation or ADR. S24 verifies localized scoped repair. S25 verifies escalation for multi-area and ADR-implicated repair.
   - **rebuild** (S7, S26): Rebuild mode from `rebuild/status.md`; target preset, addons, adoption mode, migration strategy selected. S26 verifies rebuild is recommended only when current architecture references are too stale or contradictory for scoped repair and does not enter migration planning without user decision.
   - **adopt** (S8, S12, S27): Gradual adoption for first-time projects; target-architecture merge when rebuild is complete; code verified against target rules before merge. S12 verifies completed-rebuild adopt behavior: read rebuild status, verify target/code alignment, merge target into current, archive target docs, and mark rebuild completed. S27 verifies scoped adopt for one clear area, ADR-adjacent adopt escalation, and full adopt for completed target architecture merge.
   - **diagnose** (S9): Architecture-guided triage; identifies owner module, failing layer, debugging order; does not claim root cause without evidence. Phase 4 explicitly defers a named scoped diagnose path and keeps diagnose out of Level 4 update receiving paths.

3. For each scenario output, check the checklist items from the corresponding scenario prompt. Flag any checklist item marked as unchecked or missing.

4. Identify any mode responsibility confusion:
   - Does a mode try to do another mode's job? (e.g., `update` trying to do `place`, `repair` trying to do `init`, `diagnose` trying to do `verify`)
   - Does a mode exceed its stated contract? (e.g., `repair` modifying business code, `place` creating implementation specs, `diagnose` claiming root cause)
   - Does a mode fail to meet its minimum contract? (e.g., `init` without verify, `place` without boundary contract, `update` without same-change spec sync)

5. Check for hard-gate failures:
   - Are any of the 10 Core Hard Gates violated?
   - Are any of the 5 Architecture Gate Summary gates violated?
   - Are any mode-specific hard gates from `references/hard-gates.md` violated?

### Rule Ownership and Trigger Deduplication (S28)

Verify that S28 preserves mode boundaries after deduplication:

- `update` impact levels remain owned by `references/modes.md`.
- `verify` scopes and currentness gates remain owned by `references/verification.md`.
- Templates and protocol text use impact-appropriate spec action instead of unconditional full verify.
- Level 0, Level 1, and Level 2 do not require full verify merely because a task is ending.
- Level 3, Level 4 architecture-current, final init, and repair/adopt/rebuild completion gates still require full verify where previously required.

## Output Format

```
## Mode Completeness Review

Status: PASS / PASS_WITH_NOTES / FAIL / BLOCKED

### Mode Coverage Summary

| Mode | Scenario(s) | Covered | Within Responsibility | Notes |
|---|---|---|---|---|
| init | S1, S2, S13, S14, S15 | yes/no | yes/no | |
| place | S3, S23 | yes/no | yes/no | |
| update | S4, S16, S17, S18, S19, S20, S28 | yes/no | yes/no | |
| verify | S5, S11, S19, S20, S21, S22, S24, S25, S26, S27, S28 | yes/no | yes/no | |
| repair | S6, S24, S25 | yes/no | yes/no | |
| rebuild | S7, S26 | yes/no | yes/no | |
| adopt | S8, S12, S27 | yes/no | yes/no | |
| diagnose | S9 | yes/no | yes/no | |

### Missing Mode Coverage

(Empty if all eight modes are covered.)

### Mode Responsibility Confusion

(Empty if no confusion detected.)

### Hard-Gate Failures

(Empty if no hard-gate violations found.)

### Scenario Checklist Gaps

| Scenario | Missing/Failed Checklist Items |
|---|---|
| S01 | (list or "none") |
| ... | ... |

### Overall Assessment

(Brief narrative: what passed, what needs attention, whether the mode layer is complete.)
```