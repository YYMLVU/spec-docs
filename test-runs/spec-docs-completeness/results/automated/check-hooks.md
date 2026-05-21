# Hook Static and Script Check

Status: PASS
Claude events: PostToolUse, PreToolUse, SessionStart, Stop
Cursor events: sessionStart, stop
No side effects detected in skills/spec-docs tree.

## session-start

```text
spec-docs reminder:
- If this project has docs/spec-docs/, use the compact SKILL.md as router.
- For mode details, read skills/spec-docs/references/*.md before acting.
- For non-trivial implementation changes, run/apply spec-docs place before detailed planning.
- After implementation-relevant edits, run/apply spec-docs update and verify before claiming completion.
- Hooks are reminders; rules live in SKILL.md and references/.
```
## stop-verify-reminder

```text
spec-docs completion reminder:
- If implementation-relevant files changed, affected specs must be updated or a no-update reason must be stated.
- Run/apply spec-docs verify before claiming init/update/repair/rebuild/adopt completion.
- Do not weaken architecture rules without explicit user confirmation or ADR.
```
## pre-edit-guard

```text
spec-docs pre-edit reminder:
- Before editing implementation-relevant files, read docs/spec-docs/README.md, constitution.md, inventory.md, related specs, architecture rules, and ADRs when present.
- For non-trivial implementation changes, run/apply spec-docs place before detailed planning.
- This hook is a reminder scaffold; rules live in SKILL.md and references/.
```
## post-edit-reminder

```text
spec-docs post-edit reminder:
- If implementation-relevant files changed, run/apply spec-docs update.
- Before claiming completion, run/apply spec-docs verify or state why no spec update is needed.
- Do not silently weaken architecture rules during update.
```
## pre-bash-guard

```text
spec-docs bash reminder:
- After tests/builds/git diff confirm implementation changes, update affected specs or state a no-update reason.
- Before completion, run/apply spec-docs verify.
- Read-only commands should not be blocked by this skeleton.
```
