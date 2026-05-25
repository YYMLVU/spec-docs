# Hook Completeness Review

Status: PASS

## Matcher Evidence

The hook simulation explicitly covers:

- `SessionStart/startup`
- `SessionStart/resume`
- `SessionStart/clear`
- `SessionStart/compact`
- `PreToolUse/Edit`
- `PreToolUse/Write`
- `PreToolUse/MultiEdit`
- `PreToolUse/Bash`
- `PostToolUse/Edit`
- `PostToolUse/Write`
- `PostToolUse/MultiEdit`
- `Stop/*`
- Cursor `sessionStart`
- Cursor `stop`

## Declaration Completeness

All five expected hook scripts are declared and present:

| Hook | Evidence |
| --- | --- |
| session-start | SessionStart in Claude hooks; sessionStart in Cursor hooks |
| pre-edit-guard | PreToolUse Edit/Write/MultiEdit |
| pre-bash-guard | PreToolUse Bash |
| post-edit-reminder | PostToolUse Edit/Write/MultiEdit |
| stop-verify-reminder | Stop in Claude hooks; stop in Cursor hooks |

## Missing Hooks

None.

## Extra Hooks

None found.

## Side Effects

`check-hooks.md` reports no side effects in `skills/spec-docs` after executing hook scripts.

## Findings

| Finding | Status |
| --- | --- |
| F-004 Hook matcher granularity | covered |

## Overall Assessment

The hook layer is complete and well-formed. All matcher granularity findings are resolved. Hook scripts are reminder-only and do not modify files, create ADRs, weaken rules, or enforce beyond the intended skeleton behavior.

## Impact-Aware Hook Policy

Hook policy is impact-aware: hooks do not block merely because full verify was skipped for Level 0, Level 1, or Level 2 when the agent stated the impact level and completed the required action for that level. Scenarios S16-S18 cover the no-full-verify requirement:

- S16 validates Level 0: no spec update or verify is required when no behavior, contract, architecture, verification, or mapping signal changed, provided the agent states a no-update reason.
- S17 validates Level 1: one mapped spec is updated without full verify.
- S18 validates Level 2: localized update with targeted light check satisfies the completion gate without full verify.

Level 3 and Level 4 still require full verify before broad currentness, release freshness, or architecture-current claims (S19, S20).