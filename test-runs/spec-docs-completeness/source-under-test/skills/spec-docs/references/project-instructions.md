# Project Instructions Reference

This file is the canonical home for AGENTS.md / CLAUDE.md protocol block installation and maintenance.

## Target Selection

1. If root `AGENTS.md` exists, update it.
2. If root `CLAUDE.md` exists, update it.
3. If both exist, update both.
4. If neither exists, create `AGENTS.md`.

## Update Strategy

- Replace the full block between `<!-- SPEC-DOCS-PROTOCOL:BEGIN -->` and `<!-- SPEC-DOCS-PROTOCOL:END -->` if present.
- Append the block if markers are absent.
- Do not duplicate blocks.
- Do not rewrite unrelated user instructions.
- If existing instructions conflict, report the conflict and preserve the stricter rule where possible.

## Protocol Expectations

The protocol block should require future agents to read relevant specs and architecture docs before implementation, run `place` before detailed implementation planning for non-trivial changes, update specs after implementation-relevant changes, perform impact-appropriate spec action before claiming completion (Level 0 no-update reason, Level 1 affected spec update, Level 2 targeted light check, Level 3 full verify, Level 4 escalation and full verify before architecture-current claims), and use `diagnose` for architecture-guided triage when appropriate.
