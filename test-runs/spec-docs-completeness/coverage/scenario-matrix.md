# Scenario Matrix -- spec-docs Completeness Test

This matrix maps every test scenario to its type, mode coverage, primary capability, and review flag.
All scenarios require manual review (`yes`). Scenario S10 has no mode assigned because it validates hook behavior and skill collaboration outside a single mode.

## Scenario Coverage Table

| Scenario | Type | Modes | Primary Capability | Manual Review Required |
|---|---|---|---|---|
| S1 Empty Project Init | fixture | init | empty-project facts + Architecture Selection | yes |
| S2 Existing Small App Init | fixture-or-real | init | implementation-first coverage | yes |
| S3 Placement Before Feature Work | fixture | place | Placement & Boundary Review | yes |
| S4 Implementation Update | fixture | update | affected-spec update | yes |
| S5 Verify Drift and Architecture Violations | fixture | verify | fact drift + architecture violation subtype | yes |
| S6 Repair Without Unauthorized Code Changes | fixture | repair | docs repair without code changes | yes |
| S7 Rebuild State Machine | fixture | rebuild | rebuild/status.md state source | yes |
| S8 Adopt Legacy Project | real-preferred | adopt | gradual adoption | yes |
| S9 Architecture-Guided Diagnose | fixture | diagnose | failure localization triage | yes |
| S10 Hooks and Skill Collaboration | fixture | (none) | hooks + superpowers/fallback order | yes |
| S11 Architecture Drift Verify | fixture | verify | architecture drift subtype | yes |
| S12 True Adopt Completed Rebuild | fixture | adopt | completed rebuild adopt merge/archive | yes |

## Mode Coverage

Eight modes from `manifest.json` must each be exercised by at least one scenario, and every mode must stay within its documented responsibility boundary as defined in `references/modes.md` and `references/architecture-control.md`.

| Mode | Scenario | Responsibility Verification |
|---|---|---|
| init | S1, S2 | S1 validates empty-project init (no fake facts, principle seed only). S2 validates existing-implementation init (full spec library, coverage indexes). Neither creates fake implementation facts. |
| place | S3 | Placement & Boundary Review before detailed planning; must include allowed/forbidden dependencies, public contracts, forbidden shortcuts, and failure localization hints. Must not modify code. |
| update | S4 | Same-change spec sync after implementation-relevant edits; baseline absorption when transitioning from empty-project. Must not silently rewrite architecture rules. |
| verify | S5, S11 | Fact drift, decision drift, and architecture violation subtype reporting. Severity reflects Adoption Mode and Addons. Must cover all detectable violation types when architecture docs exist. S11 verifies ARCHITECTURE DRIFT reporting for business policy accumulating in shared utilities. |
| repair | S6 | Doc-only alignment with current implementation; no business-code modifications. Architecture repair requires explicit user confirmation or ADR. |
| rebuild | S7 | Rebuild mode determined by `rebuild/status.md`, not by target file existence. Must select target preset, addons, adoption mode, migration strategy. |
| adopt | S8, S12 | Gradual adoption through `init` for first-time projects; target-architecture merge when rebuild is complete. Must verify code matches target rules before merging. S12 verifies completed-rebuild adopt behavior: read rebuild status, verify target/code alignment, merge target into current, archive target docs, and mark rebuild completed. |
| diagnose | S9 | Architecture-guided triage, not automatic debugger or direct repair. Must identify owner module, failing layer, and debugging order without claiming root cause without evidence. |

## Hook Coverage

Five skeleton hook scripts are declared in the hooks directory. The hook layer itself is tested through static checks, script simulation, and scenario S10.

| Hook Script | Trigger Event | Matcher | Test Method | Verified By |
|---|---|---|---|---|
| session-start | SessionStart | startup, clear, compact, resume | check-hooks.mjs + simulate-hook-events.mjs | S10 (behavior) |
| pre-edit-guard | PreToolUse | Edit, Write, MultiEdit | check-hooks.mjs + simulate-hook-events.mjs | S10 (behavior) |
| pre-bash-guard | PreToolUse | Bash | check-hooks.mjs + simulate-hook-events.mjs | S10 (behavior) |
| post-edit-reminder | PostToolUse | Edit, Write, MultiEdit | check-hooks.mjs + simulate-hook-events.mjs | S10 (behavior) |
| stop-verify-reminder | Stop | * | check-hooks.mjs + simulate-hook-events.mjs | S10 (behavior) |

### Hook Declaration Files

| File | Purpose | Status |
|---|---|---|
| hooks.json | Claude Code hook points (SessionStart, PreToolUse, PostToolUse, Stop) | skeleton, reminder-only |
| hooks-cursor.json | Cursor/plugin-specific adaptation (sessionStart, stop) | skeleton, reminder-only |
| run-hook.cmd | Portable Windows cmd stub, prints reminder, exits 0 | stub, no enforcement logic |

### Hook Behavior Levels

| Level | When Used | Checked By |
|---|---|---|
| info | Routine reminders (session-start, post-edit-reminder, pre-edit-guard, pre-bash-guard) | S10 |
| warning | Missing spec-docs step, continue | S10 |
| block | Explicit hard-gate violations (repair edits business code without request, update silently weakens architecture rules, architecture rules weakened without ADR/confirmation, completion claimed without update/verify) | S10 |