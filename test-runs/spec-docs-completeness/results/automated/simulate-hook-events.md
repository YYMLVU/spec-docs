# Hook Matcher Simulation

Status: PASS
- SessionStart/startup: session-start
- SessionStart/resume: session-start
- SessionStart/manual: no trigger
- SessionStart/clear: session-start
- SessionStart/compact: session-start
- PreToolUse/Edit: pre-edit-guard
- PreToolUse/Write: pre-edit-guard
- PreToolUse/MultiEdit: pre-edit-guard
- PreToolUse/Bash: pre-bash-guard
- PreToolUse/Read: no trigger
- PostToolUse/Edit: post-edit-reminder
- PostToolUse/Write: post-edit-reminder
- PostToolUse/MultiEdit: post-edit-reminder
- PostToolUse/Bash: no trigger
- Stop/anything: stop-verify-reminder
- cursor sessionStart: 1 hook containing session-start
- cursor stop: 1 hook containing stop-verify-reminder
