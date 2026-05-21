# Hook Completeness Review Prompt

## Purpose

Review the hook layer completeness by evaluating the automated hook-check results and hook-simulation results. Determine whether hook declarations are complete, no extra hooks exist beyond the five declared skeleton scripts, scripts are reminder-only with no executable enforcement, matcher simulation is correct, and no side effects exist.

## Hook Layer Design

The hook layer follows the design in `references/hooks.md`:

- **Rules define what is required. Hooks help enforce when it is required.**
- Hook skeleton files are reminder-only placeholders, not production enforcement.
- Scripts are simple text-printing stubs that exit 0.
- The `run-hook.cmd` is a portable Windows cmd stub with no executable enforcement logic.

## Inputs

- `results/automated/check-hooks.md` -- static hook declaration check result
- `results/automated/simulate-hook-events.md` -- hook matcher simulation result
- `source-under-test/skills/spec-docs/hooks/hooks.json` -- Claude Code hook declarations
- `source-under-test/skills/spec-docs/hooks/hooks-cursor.json` -- Cursor hook declarations
- `source-under-test/skills/spec-docs/hooks/run-hook.cmd` -- Windows cmd stub
- `source-under-test/skills/spec-docs/hooks/scripts/` -- five skeleton scripts
- `source-under-test/skills/spec-docs/references/hooks.md` -- normative hook policy

## Review Steps

### 1. Hook Declaration Completeness

Verify that `check-hooks.md` reports all five skeleton hook scripts:

| Expected Hook | Script File | Declaration File(s) |
|---|---|---|
| session-start | scripts/session-start | hooks.json (SessionStart) + hooks-cursor.json (sessionStart) |
| pre-edit-guard | scripts/pre-edit-guard | hooks.json (PreToolUse: Edit/Write/MultiEdit) |
| pre-bash-guard | scripts/pre-bash-guard | hooks.json (PreToolUse: Bash) |
| post-edit-reminder | scripts/post-edit-reminder | hooks.json (PostToolUse: Edit/Write/MultiEdit) |
| stop-verify-reminder | scripts/stop-verify-reminder | hooks.json (Stop) + hooks-cursor.json (stop) |

Are all five hooks declared and matched to correct events? Are any hooks missing from `hooks.json` or `hooks-cursor.json`?

### 2. No Extra Hooks

- Are there exactly five script files in `scripts/`? No more, no less.
- Do `hooks.json` and `hooks-cursor.json` reference exactly these five scripts and no others?
- Are there no undeclared hooks, dead scripts, or orphaned declarations?

### 3. Scripts Reminder-Only

For each of the five scripts:
- Does the script print a text reminder only?
- Does the script exit with code 0?
- Does the script NOT modify any files?
- Does the script NOT create ADRs?
- Does the script NOT weaken architecture rules?
- Does the script NOT generate future plans or roadmaps?
- Does the script NOT block normal read-only work?

For `run-hook.cmd`:
- Does it print a reminder and exit 0?
- Does it contain no executable enforcement logic?

### 4. Matcher Simulation Correctness

From `simulate-hook-events.md`, verify:

| Event | Matcher | Expected Trigger | Correct |
|---|---|---|---|
| SessionStart | startup | session-start | yes/no |
| SessionStart | clear | session-start | yes/no |
| SessionStart | compact | session-start | yes/no |
| SessionStart | resume | session-start | yes/no |
| SessionStart | manual | no trigger | yes/no |
| PreToolUse | Edit | pre-edit-guard | yes/no |
| PreToolUse | Write | pre-edit-guard | yes/no |
| PreToolUse | MultiEdit | pre-edit-guard | yes/no |
| PreToolUse | Bash | pre-bash-guard | yes/no |
| PreToolUse | Read | no trigger | yes/no |
| PostToolUse | Edit | post-edit-reminder | yes/no |
| PostToolUse | Write | post-edit-reminder | yes/no |
| PostToolUse | Bash | no trigger | yes/no |
| Stop | * | stop-verify-reminder | yes/no |
| cursor sessionStart | sessionStart | 1 hook containing session-start | yes/no |
| cursor stop | stop | 1 hook containing stop-verify-reminder | yes/no |

Are any matchers missing or incorrect? Are there any matchers that trigger incorrectly (false positives)?

### 5. No Side Effects

- Reading `check-hooks.md`: does it report "No side effects detected in skills/spec-docs tree"?
- Do any hook scripts write files, modify code, create directories, or have I/O beyond stdout?
- Is the hook directory structure identical between `source-under-test/skills/spec-docs/hooks/` and `installed-under-test/.claude/skills/spec-docs/hooks/`?

### 6. Hook Behavior Levels and Block Candidates

From `references/hooks.md`, verify the declared block candidates are:
- Repair mode tries to edit business code without explicit request.
- Update silently weakens architecture rules.
- Architecture rules are weakened without ADR or user confirmation.
- Agent claims completion after implementation-relevant changes without update/verify.

Are these block candidates the only ones that would trigger `block` level behavior? Are there no extra block conditions invented in the hooks?

### 7. Safety Boundaries

Verify hooks respect safety boundaries:
- Hooks must not automatically modify code.
- Hooks must not create ADRs.
- Hooks must not weaken architecture rules.
- Hooks must not generate future plans.
- Hooks must not over-block normal read-only work.

## Output Format

```
## Hook Completeness Review

Status: PASS / PASS_WITH_NOTES / FAIL / BLOCKED

### Hook Declaration Completeness

| Hook | Declared | Matched to Correct Event | Script Exists | Status |
|---|---|---|---|---|
| session-start | yes/no | yes/no | yes/no | |
| pre-edit-guard | yes/no | yes/no | yes/no | |
| pre-bash-guard | yes/no | yes/no | yes/no | |
| post-edit-reminder | yes/no | yes/no | yes/no | |
| stop-verify-reminder | yes/no | yes/no | yes/no | |

### Missing Hooks

(Empty if all five hooks are present.)

### Extra Hooks / Orphaned Declarations

(Empty if no extra hooks or orphaned declarations found.)

### Incorrect Matcher Behavior

| Matcher Issue | Event | Expected | Actual |
|---|---|---|---|
| (issue description) | | | |

(Empty if no matcher issues.)

### Side-Effect Concerns

(Empty if no side-effect concerns.)

### Reminder-Only Validation

| Script | Prints Reminder | Exits 0 | No File I/O | Status |
|---|---|---|---|---|
| session-start | yes/no | yes/no | yes/no | |
| pre-edit-guard | yes/no | yes/no | yes/no | |
| pre-bash-guard | yes/no | yes/no | yes/no | |
| post-edit-reminder | yes/no | yes/no | yes/no | |
| stop-verify-reminder | yes/no | yes/no | yes/no | |
| run-hook.cmd | yes/no | yes/no | yes/no | |

### Overall Assessment

(Brief narrative summarizing hook layer completeness.)
```