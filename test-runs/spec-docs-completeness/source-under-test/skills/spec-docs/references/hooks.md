# Hooks Reference

Hooks help enforce when spec-docs workflows are required. Hooks are not the source of rules.

```text
Rules live in SKILL.md and references/.
Hooks detect events and point agents to required modes/references.
```

## Supported Hook Directions

- Claude Code style: `SessionStart`, `PreToolUse`, `PostToolUse`, `Stop`.
- Cursor style: `sessionStart` and plugin-specific schemas.
- Other agents: use their available pre/post tool hooks.

## Trigger Points

- `SessionStart`: remind agent to inspect project for `docs/spec-docs/` and read compact `SKILL.md` plus relevant references.
- Prompt hook if available: detect non-trivial implementation, architecture, or debugging intent.
- `PreToolUse` for edit/write tools: remind `place` before non-trivial implementation changes and required spec reads.
- `PostToolUse` for edit/write tools: remind `update` after implementation-relevant changes.
- `PreToolUse` for shell commands: warn on risky commands and remind impact classification plus impact-appropriate spec action around tests/builds when implementation-relevant files changed.
- `Stop` or response completion: remind or block completion if implementation-relevant changes lack impact-appropriate spec action.
- Protocol block synchronization: remind agents to use `references/project-instructions.md` and `templates/agent-protocol-block.md` when `AGENTS.md` or `CLAUDE.md` is missing, duplicated, or stale.

## Behavior Levels

- `info`: reminder only.
- `warning`: missing spec-docs step, but continue.
- `block`: explicit hard gate violation.

## Block Candidates

This section is the canonical owner for hook behavior levels and block-candidate interpretation. Other files may summarize these candidates, but must not invent additional hook block conditions.

- Repair mode tries to edit business code without explicit request.
- Update silently weakens architecture rules.
- Architecture rules are weakened without ADR or user confirmation.
- Agent claims completion after implementation-relevant changes without impact-appropriate spec action: Level 0 no-update reason, Level 1 affected spec update, Level 2 targeted light check, Level 3 full verify, or Level 4 architecture-risk report, escalated mode recommendation, and full verify before architecture-current claims.

Hooks are impact-aware reminders. They must not block merely because full verify was skipped for Level 0, Level 1, or Level 2 when the agent stated the impact level and completed the required action for that level. They may warn when the impact level is unstated, classification evidence is missing, or implementation-relevant changes occurred without any impact-appropriate spec action.

Hook reminders should be deduplicated within a session or change unit. Production hook adapters should store a session/change-unit marker outside project source control, such as an agent cache or temporary directory, and suppress repeated reminder text for the same unchanged event class. Skeleton hooks may print reminder text every invocation only because they are not production enforcement.

## Safety Boundaries

Hooks must not automatically modify code, create ADRs, weaken architecture rules, generate future plans, or over-block normal read-only work. Hook installers and adapters must not overwrite existing hook configurations silently; they must preserve unrelated user hooks, update only marked spec-docs hook entries, and report conflicts for user confirmation.

## Skeleton Files

The hooks directory (`skills/spec-docs/hooks/`) contains skeleton files that pre-reserve the hook layer. These are reminder-only placeholders, not production enforcement.

- `hooks.json` -- Claude Code style hook points with status `skeleton` and behavior `reminder-only`. Maps events to recommended spec-docs modes/references.
- `hooks-cursor.json` -- Cursor/plugin-specific adaptation of the same hook points. Placeholder; agents should adapt the schema to their own event format.
- `run-hook.cmd` -- Portable Windows cmd stub. Prints a reminder and exits 0. No executable enforcement logic.
