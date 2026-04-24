# Spec Docs Knowledge Base

Codex skill for converting a software project into a lightweight, AI-readable spec documentation library before development, refactoring, onboarding, or multi-agent work.

The skill helps an agent inspect a repository, identify real feature and architecture boundaries, and create a living `docs/specs/` knowledge base that future AI agents can read quickly.

## What It Does

- Builds a project spec library from the current implementation.
- Creates an AI entrypoint with a default reading order.
- Splits documentation by real project responsibility, not by a fixed file count.
- Captures feature behavior, architecture surfaces, business rules, edge cases, tests, code references, and update rules.
- Keeps specs living: add, split, merge, or delete files as the project changes.

## When To Use

Use this skill when you want to:

- Prepare a repo for AI-assisted development.
- Turn a project into a structured knowledge base.
- Document current architecture and feature behavior before iteration.
- Reduce repeated full-repo scanning by future AI agents.
- Create durable context for multi-agent work or long-running refactors.

## Installation

Copy this repository folder into your Codex skills directory:

```powershell
Copy-Item -Recurse . "$env:USERPROFILE\.codex\skills\spec-docs-knowledge-base"
```

Or install it through your preferred Codex skill installer if your environment supports GitHub skill sources.

## Usage

Invoke the skill in a project workspace:

```text
$spec-docs-knowledge-base 将当前项目完整 Spec 化
```

Typical output structure:

```text
docs/specs/
├── README.md
├── project-overview.spec.md
├── frontend/
├── backend/
└── features/
```

The exact structure is dynamic. The skill should add or remove specs to match the real project, not preserve a fixed template.

## Repository Contents

```text
.
├── SKILL.md
├── agents/
│   └── openai.yaml
├── README.md
├── LICENSE
└── .gitignore
```

## License

MIT

