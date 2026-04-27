# Install For AI

This file is a copy-ready handoff for an AI agent to install the `spec-docs-knowledge-base` skill into a target project.

## Copy This To Your AI

```text
Please install the `spec-docs-knowledge-base` skill from the current repository into the target project.

Requirements:
1. If the target project uses Claude Code, install it into `.claude/skills/spec-docs-knowledge-base/` under the project root.
2. If the target environment uses another agent with a skills directory, install it into that agent's equivalent project-level or user-level skills path.
3. Copy at least the following files when they exist:
   - `SKILL.md`
   - `README.md`
   - `README.en.md`
   - `INSTALL-FOR-AI.md`
   - `agents/` (if useful for that agent)
4. Keep the installed directory name exactly `spec-docs-knowledge-base`.
5. Do not rewrite or summarize the skill during installation; copy it as-is.
6. After installation, verify that the installed `SKILL.md` exists in the destination.
7. Report the final install path.
```

## Notes

- For Claude Code, project-local install is usually the best default.
- User-level install is useful when the same skill should be available across many repositories.
- If the destination agent does not support skills directories, the repository can still be used as a reusable prompt/documentation package, but that is not a true skill installation.
