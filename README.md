<p align="center">
  <img src="./head.png" alt="Spec Docs" />
</p>

# Spec Docs

[简体中文](./README.zh-CN.md)

Spec Docs is a reusable skill for building and maintaining an **implementation-first AI spec knowledge base** with **optional architecture governance** for software projects.

It documents the current implementation: code behavior, technical stack, module constraints, interfaces, data flow, key symbols, call relationships, boundaries, and verification points. It can also govern architecture rules, record decisions (ADRs), and track rebuild progress. Future AI agents can use the generated specs to maintain the project precisely without repeatedly scanning the whole repository or changing unrelated code.

## Installation

### 1. Via AI Assistant

Send the following text to your AI assistant (Claude Code, Cursor, GitHub Copilot, etc.), and it will automatically complete the installation:

```text
Please follow the guidelines in https://github.com/YYMLVU/spec-docs/blob/main/INSTALL-FOR-AI.md to install the spec-docs skill into the current project.
And use the spec-docs skill in init mode to build a full implementation-first spec knowledge base for this project.
```

### 2. Via npx

```bash
npx spec-docs
```

This copies the skill into `.claude/skills/spec-docs/` in the current project. Then send the following to your AI:

```text
Use the spec-docs skill in init mode to build a full implementation-first spec knowledge base for this project.
```

### 3. Manual Install

**Claude Code project-level:**

```bash
mkdir -p .claude/skills/spec-docs
cp -R skills/spec-docs/* .claude/skills/spec-docs/
```

**Claude Code user-level:**

```bash
mkdir -p ~/.claude/skills/spec-docs
cp -R skills/spec-docs/* ~/.claude/skills/spec-docs/
```

**Other agents:** If your agent supports a skills or prompt-package directory, install the contents of `skills/spec-docs/` into the equivalent location and keep the directory name `spec-docs`.

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
docs/spec-docs/
├── README.md
├── constitution.md
├── inventory.md
├── specs/
│   ├── project-overview.spec.md
│   ├── features/
│   ├── modules/
│   ├── interfaces/
│   ├── runtime/
│   ├── data/
│   ├── integrations/
│   └── quality/
├── architecture/
│   └── (architecture rules and placement constraints)
├── decisions/
│   └── (ADR records)
└── rebuild/
    └── status.md
```

The exact structure follows the real project. Empty or speculative folders should not be created.

### Workspace Directories

- `specs/` -- implementation facts: code behavior, stack, constraints, mappings
- `architecture/` -- rules and placement constraints that govern how code is organized
- `decisions/` -- Architecture Decision Records (ADR), the single source for why decisions were made
- `rebuild/status.md` -- rebuild mode source of truth for tracking in-progress rebuilds

## Modes

### `init`

Builds a full-project implementation spec library from the current codebase.

For empty project directories, `init` creates a minimal project-principles seed instead of a full implementation spec library. It records confirmed project purpose, intended technology stack, durable coding/testing/dependency principles, directory organization constraints, and out-of-scope boundaries. It does not create `inventory.md`, empty indexes, plans, scaffolding, future feature specs, or roadmap items. When implementation files appear, `update` absorbs this seed into the normal implementation-first spec library.

For existing-implementation projects, it creates:

- `docs/spec-docs/README.md`
- `docs/spec-docs/constitution.md`
- `docs/spec-docs/inventory.md`
- `docs/spec-docs/specs/project-overview.spec.md`
- type-specific specs for real features, modules, interfaces, runtime behavior, data, integrations, quality constraints, and implemented decisions
- `docs/spec-docs/decisions/` with ADR records
- `docs/spec-docs/architecture/` with rules and placement constraints
- a marker-based project instruction protocol block in `AGENTS.md` and/or `CLAUDE.md`

For existing-implementation projects, `init` is not complete until the Code-to-Spec Index covers all included implementation-relevant files and the protocol block is installed or updated.

### `update`

Synchronizes specs after implementation-relevant code changes.

The agent must:

- read `docs/spec-docs/README.md` and `docs/spec-docs/inventory.md`
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

### `place`

Checks whether a proposed module or file belongs in an existing location or needs a new one, according to `architecture/` rules. Reports a placement decision without creating files.

### `rebuild`

Tracks a controlled rewrite of a module or subsystem. Reads `docs/spec-docs/rebuild/status.md` to determine current rebuild state, updates it as work progresses, and moves specs from old to new structure when the rebuild completes.

### `adopt`

Completes a rebuild migration by merging `target-architecture.md` into `current-architecture.md`, updating ADR implementation evidence, marking `rebuild/status.md` completed, and archiving target/adoption documents under `docs/spec-docs/rebuild/archive/`.

## Architecture Governance

Spec Docs optionally enforces architecture governance through the `docs/spec-docs/architecture/` directory:

- **Rules** define where modules must live, which dependencies are allowed, and how code is organized.
- **Placement constraints** determine whether a new file or module belongs in an existing location or requires a new one.
- **Decisions** (ADRs) in `docs/spec-docs/decisions/` are the single source for why architectural choices were made.

When architecture governance is active, `place` mode uses these rules to validate module placement, and `verify` checks that the codebase still conforms to declared constraints.

## Standalone and Integrated Workflows

Spec Docs detects whether the project already uses an external Spec Skill or workflow that manages requirements, plans, or feature-level specs (e.g., Superpowers, OpenSpec, Spec-Kit).

1. If a known external Spec Skill is detected, Spec Docs runs in **Integrated Mode** and defers requirement-level and planning concerns to that skill.
2. If no known external Spec Skill is found, Spec Docs asks once whether another module- or feature-level Spec Skill exists.
3. If none exists, Spec Docs runs in **Standalone Mode** with a **Minimal Implementation Plan** -- recording only what is needed to keep specs synchronized with current code, without becoming a full requirements system, roadmap, backlog, or replacement for external Spec Skills.

Standalone Mode never creates roadmap items, backlog entries, or feature plans. It only documents what is implemented and what is decided.

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

`docs/spec-docs/inventory.md` is the objective reverse index for the spec library.

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
Use $spec-docs verify to check whether docs/spec-docs is current and complete.
```

Repair stale specs:

```text
Use $spec-docs repair to realign stale specs with the current implementation.
```

## Repository Contents

```text
.
├── skills/
│   └── spec-docs/
│       ├── SKILL.md
│       └── templates/
│           ├── agent-protocol-block.md
│           ├── specs-readme.md
│           ├── constitution.md
│           ├── inventory.md
│           ├── project-overview.spec.md
│           ├── feature.spec.md
│           ├── module.spec.md
│           ├── interface.spec.md
│           ├── runtime.spec.md
│           ├── data.spec.md
│           ├── integration.spec.md
│           └── quality.spec.md
├── bin/
│   └── spec-docs.js
├── agents/
│   └── openai.yaml
├── package.json
├── README.md
├── README.zh-CN.md
├── INSTALL-FOR-AI.md
├── head.png
├── LICENSE
└── .gitignore
```

## License

MIT
