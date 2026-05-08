<p align="center">
  <img src="./head.png" alt="Spec Docs" />
</p>

# Spec Docs

[简体中文](./README.zh-CN.md)

Spec Docs is a reusable skill for building and maintaining an **implementation-first AI spec knowledge base** for software projects.

It documents the current implementation: code behavior, technical stack, module constraints, interfaces, data flow, key symbols, call relationships, boundaries, and verification points. Future AI agents can use the generated specs to maintain the project precisely without repeatedly scanning the whole repository or changing unrelated code.

## One-Click Installation into Your Project (via AI)

Send the following text to your AI assistant (Claude Code, Cursor, GitHub Copilot, etc.), and it will automatically complete the installation:

```text
Please follow the guidelines in https://github.com/YYMLVU/spec-docs/blob/main/INSTALL-FOR-AI.md to install the spec-docs skill into the current project.
And use the spec-docs skill in init mode to build a full implementation-first spec knowledge base for this project.
```

## Core Idea

Spec Docs treats the current implementation as the source of truth.

It is not:

- a product requirements system
- a roadmap
- an implementation planning tool
- a task generator
- a spec-to-code workflow

It is:

- a current-code knowledge base
- an AI reading entrypoint
- a code-to-spec reverse index
- a symbol-to-spec maintenance map
- a project-level protocol for keeping specs synchronized with implementation changes

## What It Creates

Typical output in a target project:

```text
docs/specs/
├── README.md
├── constitution.md
├── inventory.md
├── project-overview.spec.md
├── features/
├── modules/
├── interfaces/
├── runtime/
├── data/
├── integrations/
├── quality/
└── decisions/
```

The exact structure follows the real project. Empty or speculative folders should not be created.

## Modes

### `init`

Builds a full-project implementation spec library from the current codebase.

It creates:

- `docs/specs/README.md`
- `docs/specs/constitution.md`
- `docs/specs/inventory.md`
- `docs/specs/project-overview.spec.md`
- type-specific specs for real features, modules, interfaces, runtime behavior, data, integrations, quality constraints, and implemented decisions
- a marker-based project instruction protocol block in `AGENTS.md` and/or `CLAUDE.md`

`init` is not complete until the Code-to-Spec Index covers all included implementation-relevant files and the protocol block is installed or updated.

### `update`

Synchronizes specs after implementation-relevant code changes.

The agent must:

- read `docs/specs/README.md` and `docs/specs/inventory.md`
- use Code-to-Spec, Task-to-Spec, and Symbol-to-Spec mappings
- update affected specs in the same change
- update `inventory.md` when paths, symbols, or mappings changed
- explain explicitly if no spec update is needed

### `verify`

Checks consistency before claiming specs are current.

It validates:

- project protocol block
- required core files
- frontmatter fields
- source paths and globs
- code-to-spec coverage
- symbol mappings
- absence of template placeholders, TODO/TBD text, and planned behavior

### `repair`

Realigns stale or inconsistent specs with current code.

`repair` updates docs and project rules only. If it finds a likely code bug, it reports the implementation concern but does not modify code unless the user explicitly asks.

## Implementation Mapping

Specs are expected to map behavior to code precisely.

Each spec can include:

- technical stack
- inputs and outputs
- current behavior
- implementation map
- key functions/classes/routes/commands/schemas/jobs
- call flow
- data flow
- state changes and side effects
- edge cases and errors
- tests and verification points
- change boundaries and precision notes

This helps future AI agents answer:

- Which spec describes this file?
- Which files implement this behavior?
- Which symbols affect this feature?
- What should not be changed for this task?
- Which specs must be updated after this change?

## Inventory

`docs/specs/inventory.md` is the objective reverse index for the spec library.

It contains:

- Coverage Scope with included and excluded globs
- Spec List
- Code-to-Spec Index
- Task-to-Spec Map
- Symbol-to-Spec Index

It does not contain planned specs, coverage gaps, todo items, or roadmap entries.

## Project Maintenance Protocol

After `init`, Spec Docs installs a marked protocol block into project-level agent instructions:

- update existing `AGENTS.md`
- update existing `CLAUDE.md`
- update both if both exist
- create `AGENTS.md` if neither exists

The block is wrapped with `<!-- SPEC-DOCS-PROTOCOL:BEGIN -->` and `<!-- SPEC-DOCS-PROTOCOL:END -->` markers. Future `init` or `repair` runs can replace the marked block without rewriting unrelated project instructions.

The block requires future AI agents to read relevant specs before implementation changes, update affected specs after those changes, and run or apply `spec-docs verify` before claiming completion.

## Source-of-Truth Priority

When sources conflict:

1. code, contracts, and configs
2. tests
3. existing docs
4. commit history
5. existing specs

If behavior cannot be confirmed, specs must use:

```text
[NEEDS CLARIFICATION: <specific question>]
```

Agents must not guess.

## Installation

### Claude Code project-level install

```bash
mkdir -p .claude/skills/spec-docs
cp -R ./* .claude/skills/spec-docs/
```

### Claude Code user-level install

```bash
mkdir -p ~/.claude/skills/spec-docs
cp -R ./* ~/.claude/skills/spec-docs/
```

### Other agents

If your agent supports a skills or prompt-package directory, install this repository into the equivalent location and keep the directory name `spec-docs`.

The installation should include:

```text
SKILL.md
README.md
README.zh-CN.md
INSTALL-FOR-AI.md
head.png
agents/
templates/
```

## Usage

Initialize a project:

```text
Use $spec-docs init to build a full implementation-first spec knowledge base for this project.
```

Update specs after code changes:

```text
Use $spec-docs update to synchronize specs with the current code changes.
```

Verify consistency:

```text
Use $spec-docs verify to check whether docs/specs is current and complete.
```

Repair stale specs:

```text
Use $spec-docs repair to realign stale specs with the current implementation.
```

## Repository Contents

```text
.
├── SKILL.md
├── README.md
├── README.zh-CN.md
├── INSTALL-FOR-AI.md
├── head.png
├── agents/
│   └── openai.yaml
├── templates/
│   ├── agent-protocol-block.md
│   ├── specs-readme.md
│   ├── constitution.md
│   ├── inventory.md
│   ├── project-overview.spec.md
│   ├── feature.spec.md
│   ├── module.spec.md
│   ├── interface.spec.md
│   ├── runtime.spec.md
│   ├── data.spec.md
│   ├── integration.spec.md
│   ├── quality.spec.md
│   └── decision.spec.md
├── LICENSE
└── .gitignore
```

## License

MIT
