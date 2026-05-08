# Install For AI

This file is a copy-ready handoff for an AI agent to install the `spec-docs` skill into a target project.

## Copy This To Your AI

```text
Please install the `spec-docs` skill from the current repository into the target project.

Requirements:
1. If the target project uses Claude Code, install it into `.claude/skills/spec-docs/` under the project root.
2. If the target environment uses another agent with a skills directory, install it into that agent's equivalent project-level or user-level skills path.
3. Copy at least the following files and directories when they exist:
   - `SKILL.md`
   - `README.md`
   - `README.zh-CN.md`
   - `INSTALL-FOR-AI.md`
   - `head.png`
   - `LICENSE`
   - `templates/`
   - `agents/` (if useful for that agent)
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

Also verify that templates were copied:

```bash
test -f .claude/skills/spec-docs/templates/agent-protocol-block.md
```

Expected result: exit code `0`.

## Installation Is Not Initialization

Installing the skill only makes the capability available.

To create the target project's spec knowledge base, run the skill in `init` mode after installation:

```text
Use the spec-docs skill in init mode to build a full implementation-first spec knowledge base for this project.
```

`init` creates or updates project files such as:

- `docs/specs/`
- `docs/specs/README.md`
- `docs/specs/constitution.md`
- `docs/specs/inventory.md`
- implementation specs
- marker-based `AGENTS.md` or `CLAUDE.md` protocol block, using `<!-- SPEC-DOCS-PROTOCOL:BEGIN -->` and `<!-- SPEC-DOCS-PROTOCOL:END -->`

## Notes

- For Claude Code, project-local install is usually the best default.
- User-level install is useful when the same skill should be available across many repositories.
- If the destination agent does not support skills directories, this repository can still be used as a reusable prompt and documentation package, but that is not a true skill installation.
