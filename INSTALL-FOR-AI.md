# Install For AI

This file is a copy-ready handoff for an AI agent to install the `spec-docs` skill into a target project.

## Platform Support

- **Primary support: Claude Code** project-level or user-level skill installation.
- **Manual or experimental integration:** Cursor, GitHub Copilot, OpenAI agents, and other agent systems may use this repository as a prompt/documentation package only when their skills directory, invocation method, and verification behavior are confirmed for that environment.

## Copy This To Your AI

```text
Please install the `spec-docs` skill from the current repository into the target project.

Requirements:
1. If the target project uses Claude Code, install it into `.claude/skills/spec-docs/` under the project root.
2. If the target environment uses another agent with a skills directory, first confirm that agent's skills path, invocation behavior, and verification method; otherwise treat this repository as a reusable prompt/documentation package, not a true skill installation.
3. Copy the contents of `skills/spec-docs/` from this repository into the target directory. This includes:
   - `SKILL.md`
   - `references/` (all files)
   - `templates/` (all files)
   - `hooks/` if present
4. Keep the installed directory name exactly `spec-docs`.
5. Do not rewrite or summarize the skill during installation; copy it as-is.
6. After installation, verify that the installed `SKILL.md` exists in the destination.
7. Report the final install path.
```

## Verify Installation

For a Claude Code project-level installation, verify:

```bash
test -f .claude/skills/spec-docs/SKILL.md
```

Expected result: exit code `0`.

Also verify that references, templates, and hooks were copied:

```bash
test -f .claude/skills/spec-docs/references/modes.md
test -f .claude/skills/spec-docs/templates/agent-protocol-block.md
test -f .claude/skills/spec-docs/hooks/hooks.json
```

Expected result: exit code `0` for each.

## Alternative: Install via npx

If Node.js is available, you can run:

```bash
npx spec-docs
```

This automatically copies the skill files into `.claude/skills/spec-docs/` in the current project directory.

## Installation Is Not Initialization

Installing the skill only makes the capability available.

To create the target project's spec knowledge base, run the skill in `init` mode after installation:

```text
Use the spec-docs skill in init mode to build a full implementation-first spec knowledge base for this project.
```

`init` creates or updates project files such as:

- `docs/spec-docs/`
- `docs/spec-docs/README.md`
- `docs/spec-docs/constitution.md`
- `docs/spec-docs/inventory.md`
- `docs/spec-docs/specs/` implementation specs
- `docs/spec-docs/architecture/` architecture rules and placement constraints
- `docs/spec-docs/decisions/` ADR records
- `docs/spec-docs/rebuild/status.md` rebuild mode source of truth
- marker-based `AGENTS.md` or `CLAUDE.md` protocol block, using `<!-- SPEC-DOCS-PROTOCOL:BEGIN -->` and `<!-- SPEC-DOCS-PROTOCOL:END -->`

The workspace at `docs/spec-docs/` is an implementation-first spec knowledge base with optional architecture governance.

## Notes

- For Claude Code, project-local install is usually the best default.
- User-level install is useful when the same skill should be available across many repositories.
- If the destination agent does not support skills directories, this repository can still be used as a reusable prompt and documentation package, but that is not a true skill installation.
