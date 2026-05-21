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
- `PreToolUse` for shell commands: warn on risky commands and remind update/verify around tests/builds when code changed.
- `Stop` or response completion: remind or block completion if implementation-relevant changes lack update/verify.

## Behavior Levels

- `info`: reminder only.
- `warning`: missing spec-docs step, but continue.
- `block`: explicit hard gate violation.

## Block Candidates

- Repair mode tries to edit business code without explicit request.
- Update silently weakens architecture rules.
- Architecture rules are weakened without ADR or user confirmation.
- Agent claims completion after implementation-relevant changes without update/verify.

## Safety Boundaries

Hooks must not automatically modify code, create ADRs, weaken architecture rules, generate future plans, or over-block normal read-only work.

## Skeleton Files

The hooks directory (`skills/spec-docs/hooks/`) contains skeleton files that pre-reserve the hook layer. These are reminder-only placeholders, not production enforcement.

- `hooks.json` -- Claude Code style hook points with status `skeleton` and behavior `reminder-only`. Maps events to recommended spec-docs modes/references.
- `hooks-cursor.json` -- Cursor/plugin-specific adaptation of the same hook points. Placeholder; agents should adapt the schema to their own event format.
- `run-hook.cmd` -- Portable Windows cmd stub. Prints a reminder and exits 0. No executable enforcement logic.
