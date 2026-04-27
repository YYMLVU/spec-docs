# Spec Docs Knowledge Base

[简体中文](./README.md)

A reusable skill for converting any software project into a **lightweight, AI-readable, maintainable spec documentation knowledge base** before development, refactoring, onboarding, or multi-agent work.

The skill helps an agent inspect a repository, identify real feature and architecture boundaries, and create a living `docs/specs/` library that future AI agents can read quickly.

## What It Does

- Builds a project spec library from the current implementation
- Creates an AI entrypoint with a default reading order
- Splits documentation by real project responsibility, not by a fixed file count
- Captures feature behavior, architecture surfaces, business rules, edge cases, tests, code references, and update rules
- Keeps specs living: add, split, merge, or delete files as the project changes
- Adapts beyond web apps: CLI tools, AI/ML systems, embedded firmware, IoT projects, libraries, infrastructure, and other repo shapes

## When To Use

Use this skill when you want to:

- Prepare a repo for AI-assisted development
- Turn a project into a structured knowledge base
- Document current architecture and feature behavior before iteration
- Reduce repeated full-repo scanning by future AI agents
- Create durable context for multi-agent work or long-running refactors

## Installation

This repository is a skill package. You can install it as either:

- a **project-level skill** for one repository
- a **user-level skill** for all projects under the same user

### Claude Code

#### Project-level install (recommended)

```bash
mkdir -p .claude/skills/spec-docs-knowledge-base
cp -R ./* .claude/skills/spec-docs-knowledge-base/
```

#### User-level install

```bash
mkdir -p ~/.claude/skills/spec-docs-knowledge-base
cp -R ./* ~/.claude/skills/spec-docs-knowledge-base/
```

### Codex / other agents with skills directories

If your agent supports a skills-directory pattern, install it into that directory. For example:

```bash
mkdir -p ~/.agents/skills/spec-docs-knowledge-base
cp -R ./* ~/.agents/skills/spec-docs-knowledge-base/
```

### Linux / macOS / Windows

- **Linux / macOS**: use the `mkdir` + `cp` commands above
- **Windows PowerShell**:

```powershell
New-Item -ItemType Directory -Force "$HOME/.claude/skills/spec-docs-knowledge-base" | Out-Null
Copy-Item -Recurse . "$HOME/.claude/skills/spec-docs-knowledge-base"
```

### Supported agent types

This repository is primarily aimed at agents that support project-level or user-level skill packages, such as:

- Claude Code
- Codex / Codex CLI
- Other agents that support skills directories or project prompt packages

If an agent does not directly support a skills directory, you can still use this repository as a reusable prompt + documentation package.

## Install Using AI

If you do not want to install it manually, copy this instruction into your AI tool:

```text
Install the spec-docs repository in the current directory as a reusable skill for this project.
1. Create `.claude/skills/spec-docs-knowledge-base/` in the current project.
2. Copy `SKILL.md` and the required installation docs from this repository into that directory.
3. Keep the directory name exactly `spec-docs-knowledge-base`.
4. Verify that `./.claude/skills/spec-docs-knowledge-base/SKILL.md` exists after installation.
5. If the current environment is not Claude Code but another agent with a skills directory, install it into the equivalent skills location.
6. Do not modify the skill content; only install and verify it.
```

For a fuller AI-oriented install handoff, see [INSTALL-FOR-AI.md](./INSTALL-FOR-AI.md).

## Usage

Invoke the skill in a project workspace:

```text
$spec-docs-knowledge-base convert this project into an AI-readable spec library
```

Typical output structure:

```text
docs/specs/
├── README.md
├── project-overview.spec.md
├── features/
├── architecture/
├── runtime/
├── interfaces/
└── <project-specific folders>
```

The exact structure is dynamic. A web app may use `frontend/` and `backend/`; an AI/ML project may use `data/`, `training/`, `inference/`, and `evaluation/`; an embedded project may use `firmware/`, `hardware/`, `drivers/`, and `protocols/`; a CLI may use `cli/`, `commands/`, `config/`, and `packaging/`. The skill should add or remove specs to match the real project, not preserve a fixed template.

## Repository Contents

```text
.
├── SKILL.md
├── agents/
│   └── openai.yaml
├── README.md
├── README.en.md
├── INSTALL-FOR-AI.md
├── LICENSE
└── .gitignore
```

## License

MIT
