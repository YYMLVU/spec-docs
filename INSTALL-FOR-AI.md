# Install For AI

This file is a copy-ready handoff for an AI agent to install the `spec-docs` skill into a target project.

## Platform Support

- **Primary support: Claude Code** project-level or user-level skill installation.
- **Manual or experimental integration:** Cursor, GitHub Copilot, OpenAI agents, and other agent systems may use this repository as a prompt/documentation package only when their skills directory, invocation method, and verification behavior are confirmed for that environment.
- A Cursor-format hook file (`hooks/hooks-cursor.json`) ships for experimental Cursor integration. Claude Code uses `hooks/hooks.json`; do not point Claude Code at the Cursor variant.

## Copy This To Your AI

```text
Please install the `spec-docs` skill from the current repository into the target project.

Requirements:
1. If the target project uses Claude Code, install it into `.claude/skills/spec-docs/` under the project root.
2. For a Claude Code user-level install, install into `~/.claude/skills/spec-docs/` instead, only when the user explicitly requests user-level scope.
3. If the target environment uses another agent with a skills directory, first confirm that agent's skills path, invocation behavior, and verification method; otherwise treat this repository as a reusable prompt/documentation package, not a true skill installation.
4. Copy the contents of `skills/spec-docs/` from this repository into the target directory. This includes:
   - `SKILL.md`
   - `references/` (all files)
   - `templates/` (all files)
   - `hooks/` (`hooks.json`, `hooks-cursor.json`, `run-hook.cmd`, and `scripts/`)
5. Keep the installed directory name exactly `spec-docs`.
6. Do not rewrite or summarize the skill during installation; copy files byte-for-byte and preserve executable bits for hook scripts on POSIX systems.
7. After installation, verify that the installed `SKILL.md` exists in the destination.
8. Report the final install path.
```

## Verify Installation

For a Claude Code project-level installation, verify:

```bash
test -f .claude/skills/spec-docs/SKILL.md
```

For a Claude Code user-level installation, use the same checks under `~/.claude/skills/spec-docs/`.

Expected result: exit code `0`.

Also verify that references, templates, hooks, and hook scripts were copied:

```bash
test -f .claude/skills/spec-docs/references/modes.md
test -f .claude/skills/spec-docs/references/hooks.md
test -f .claude/skills/spec-docs/templates/agent-protocol-block.md
test -f .claude/skills/spec-docs/templates/diagnosis.md
test -f .claude/skills/spec-docs/hooks/hooks.json
test -f .claude/skills/spec-docs/hooks/hooks-cursor.json
test -f .claude/skills/spec-docs/hooks/run-hook.cmd
test -f .claude/skills/spec-docs/hooks/scripts/session-start
test -f .claude/skills/spec-docs/hooks/scripts/pre-edit-guard
test -f .claude/skills/spec-docs/hooks/scripts/post-edit-reminder
test -f .claude/skills/spec-docs/hooks/scripts/pre-bash-guard
test -f .claude/skills/spec-docs/hooks/scripts/stop-verify-reminder
```

Expected result: exit code `0` for each.

On POSIX systems, also verify hook scripts are executable before relying on hooks:

```bash
test -x .claude/skills/spec-docs/hooks/scripts/session-start
test -x .claude/skills/spec-docs/hooks/scripts/pre-edit-guard
test -x .claude/skills/spec-docs/hooks/scripts/post-edit-reminder
test -x .claude/skills/spec-docs/hooks/scripts/pre-bash-guard
test -x .claude/skills/spec-docs/hooks/scripts/stop-verify-reminder
```

If any executable check fails, run `chmod +x .claude/skills/spec-docs/hooks/scripts/*` before relying on hooks.

## Alternative: Install via npx

If Node.js is available, you can run:

```bash
npx spec-docs
```

Running `npx spec-docs` from a project root will:

- create `.claude/skills/spec-docs/` if it does not exist;
- copy `SKILL.md`, `references/`, `templates/`, and `hooks/` from the published package into that directory, overwriting existing files with the same names without creating backups;
- exit non-zero if the source skill or installed `SKILL.md` cannot be found;
- print the next-step prompt for running the skill in `init` mode.

If `npx spec-docs` exits non-zero or the verification commands above fail, fall back to a manual copy of `skills/spec-docs/` from this repository into `.claude/skills/spec-docs/`.

## Installation Is Not Initialization

Installing the skill only makes the capability available.

To create the target project's spec knowledge base, run the skill in `init` mode after installation:

```text
Use the spec-docs skill in init mode to build a full implementation-first spec knowledge base for this project.
```

`init` creates only directories needed by the current mode, project profile, and confirmed project reality. Depending on that evidence, it may create or update project files such as:

- `docs/spec-docs/`
- `docs/spec-docs/README.md`
- `docs/spec-docs/constitution.md`
- `docs/spec-docs/inventory.md`
- `docs/spec-docs/specs/project-overview.spec.md`
- optional `docs/spec-docs/specs/` child folders such as `features/`, `modules/`, `interfaces/`, `runtime/`, `data/`, `integrations/`, and `quality/`
- `docs/spec-docs/architecture/` files such as `current-architecture.md`, `placement-rules.md`, `debugging-rules.md`, and, during rebuilds, `target-architecture.md` plus `adoption-plan.md`
- `docs/spec-docs/decisions/` ADR records such as `adr-001-*.md`
- `docs/spec-docs/reviews/` placement and architecture review records
- `docs/spec-docs/rebuild/status.md` and `docs/spec-docs/rebuild/archive/`
- a marker-delimited protocol block inserted into the project's existing `AGENTS.md` or `CLAUDE.md`, using `<!-- SPEC-DOCS-PROTOCOL:BEGIN -->` and `<!-- SPEC-DOCS-PROTOCOL:END -->`

The workspace at `docs/spec-docs/` is an implementation-first spec knowledge base with optional architecture governance.

## Notes

- For Claude Code, project-local install is usually the best default.
- User-level install is useful when the same skill should be available across many repositories and the user explicitly wants global availability.
- If the destination agent does not support skills directories, this repository can still be used as a reusable prompt and documentation package, but that is not a true skill installation.
