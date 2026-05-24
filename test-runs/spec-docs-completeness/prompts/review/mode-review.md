# Mode Completeness Review Prompt

## Purpose

Review scenario outputs in `results/scenario-outputs/` against `coverage/scenario-matrix.md` and the corresponding scenario prompts in `prompts/scenarios/`. Determine whether all eight modes (init, place, update, verify, repair, rebuild, adopt, diagnose) are adequately covered by their assigned scenarios, and that each mode stays within its documented responsibility boundary as defined in `references/modes.md` and `references/architecture-control.md`.

## Inputs

- `coverage/scenario-matrix.md` -- mode-to-scenario mapping and responsibility verification summary
- `prompts/scenarios/s01.md` through `prompts/scenarios/s15.md` -- scenario checklists
- `results/scenario-outputs/s01.md` through `results/scenario-outputs/s15.md` -- scenario execution outputs
- `source-under-test/skills/spec-docs/references/modes.md` -- normative mode behavior
- `source-under-test/skills/spec-docs/references/architecture-control.md` -- architecture mode contracts
- `source-under-test/skills/spec-docs/references/hard-gates.md` -- hard gate index
- `source-under-test/skills/spec-docs/SKILL.md` -- mode router and contracts

## Review Steps

1. Confirm every scenario output file exists for S01-S15 (or document which are missing).

2. For each mode, verify the scenario(s) assigned to it exercise the mode properly:
   - **init** (S1, S2, S13, S14, S15): S1 validates empty-project init produces only principle seed, no fake facts. S2 validates existing-implementation init produces full spec library with coverage indexes. S13 covers Standard Existing Project Init: grounded child specs for observed runtime, route, domain, and integration areas. S14 covers Large Project / Phased Init: `PARTIAL INIT` is allowed only as a non-final state and does not satisfy final included-scope coverage. S15 covers profile boundary classification beyond file count: classification uses observable complexity signals.
   - **place** (S3): Placement & Boundary Review before detailed planning; includes allowed/forbidden dependencies, public contracts, forbidden shortcuts, failure localization hints; does not modify code.
   - **update** (S4): Same-change spec sync; baseline absorption when transitioning from empty-project; does not silently rewrite architecture rules.
   - **verify** (S5, S11): Fact drift, decision drift, and architecture violation subtype reporting; severity matches Adoption Mode. S11 verifies ARCHITECTURE DRIFT reporting for business policy accumulating in shared utilities.
   - **repair** (S6): Doc-only alignment; no business-code modifications; architecture repair requires explicit confirmation or ADR.
   - **rebuild** (S7): Rebuild mode from `rebuild/status.md`; target preset, addons, adoption mode, migration strategy selected.
   - **adopt** (S8, S12): Gradual adoption for first-time projects; target-architecture merge when rebuild is complete; code verified against target rules before merge. S12 verifies completed-rebuild adopt behavior: read rebuild status, verify target/code alignment, merge target into current, archive target docs, and mark rebuild completed.
   - **diagnose** (S9): Architecture-guided triage; identifies owner module, failing layer, debugging order; does not claim root cause without evidence.

3. For each scenario output, check the checklist items from the corresponding scenario prompt. Flag any checklist item marked as unchecked or missing.

4. Identify any mode responsibility confusion:
   - Does a mode try to do another mode's job? (e.g., `update` trying to do `place`, `repair` trying to do `init`, `diagnose` trying to do `verify`)
   - Does a mode exceed its stated contract? (e.g., `repair` modifying business code, `place` creating implementation specs, `diagnose` claiming root cause)
   - Does a mode fail to meet its minimum contract? (e.g., `init` without verify, `place` without boundary contract, `update` without same-change spec sync)

5. Check for hard-gate failures:
   - Are any of the 10 Core Hard Gates violated?
   - Are any of the 5 Architecture Gate Summary gates violated?
   - Are any mode-specific hard gates from `references/hard-gates.md` violated?

## Output Format

```
## Mode Completeness Review

Status: PASS / PASS_WITH_NOTES / FAIL / BLOCKED

### Mode Coverage Summary

| Mode | Scenario(s) | Covered | Within Responsibility | Notes |
|---|---|---|---|---|
| init | S1, S2, S13, S14, S15 | yes/no | yes/no | |
| place | S3 | yes/no | yes/no | |
| update | S4 | yes/no | yes/no | |
| verify | S5, S11 | yes/no | yes/no | |
| repair | S6 | yes/no | yes/no | |
| rebuild | S7 | yes/no | yes/no | |
| adopt | S8, S12 | yes/no | yes/no | |
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