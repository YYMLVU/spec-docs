<div align="center">
  <img src="./head.png" alt="Spec Docs" width="320" />

  <h1>Spec Docs</h1>

  <p><strong>Implementation-first AI spec knowledge bases for real codebases.</strong></p>

  <p>
    <a href="./README.zh-CN.md">简体中文</a>
    ·
    <a href="https://www.npmjs.com/package/spec-docs">npm package</a>
    ·
    <a href="./LICENSE">MIT License</a>
  </p>

  <p>
    <img alt="npm" src="https://img.shields.io/npm/v/spec-docs" />
    <img alt="license" src="https://img.shields.io/badge/license-MIT-blue" />
    <img alt="AI skill" src="https://img.shields.io/badge/AI-skill-7c3aed" />
  </p>
</div>

Spec Docs is a reusable skill for building and maintaining a `docs/spec-docs/` workspace with an **implementation-first AI spec knowledge base** and **optional architecture governance** for software projects.

Within that workspace, `specs/` records what the code does now: behavior, stack, module constraints, interfaces, data flow, key symbols, call relationships, boundaries, and verification points. `architecture/`, `decisions/`, `reviews/`, and `rebuild/` provide optional architecture governance, ADRs, review records, and migration state. Future AI agents can use this workspace to make precise changes without repeatedly scanning the whole repository or touching unrelated code.

## Quick Start

### Option 1: Ask your AI assistant

Send this to Claude Code, Cursor, GitHub Copilot, or another AI coding assistant:

```text
Please follow the guidelines in https://github.com/YYMLVU/spec-docs/blob/main/INSTALL-FOR-AI.md to install the spec-docs skill into the current project.
And use the spec-docs skill in init mode to build a full implementation-first spec knowledge base for this project.
```

### Option 2: Install with npx

```bash
npx spec-docs
```

This copies the skill into `.claude/skills/spec-docs/` in the current project. Then ask your AI assistant:

```text
Use the spec-docs skill in init mode to build a full implementation-first spec knowledge base for this project.
```

### Option 3: Manual install

Claude Code project-level install:

```bash
mkdir -p .claude/skills/spec-docs
cp -R skills/spec-docs/* .claude/skills/spec-docs/
```

Claude Code user-level install:

```bash
mkdir -p ~/.claude/skills/spec-docs
cp -R skills/spec-docs/* ~/.claude/skills/spec-docs/
```

Other agents: if your agent supports a skills or prompt-package directory, install the contents of `skills/spec-docs/` into the equivalent location and keep the directory name `spec-docs`.

## What You Get

| Capability | Purpose |
| --- | --- |
| Implementation specs | Capture confirmed behavior, stack, interfaces, data flow, edge cases, and verification points. |
| Inventory reverse index | Map files, tasks, symbols, and specs so agents know what to read and update. |
| Architecture governance | Record placement rules, current architecture, target architecture, and architecture reviews. |
| ADRs | Preserve why architecture decisions were made and where implementation evidence lives. |
| Rebuild tracking | Coordinate controlled subsystem rewrites without losing spec/code alignment. |
| Agent protocol block | Install durable instructions into `AGENTS.md` or `CLAUDE.md` so future agents keep specs synchronized. |

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
│   ├── current-architecture.md
│   ├── placement-rules.md
│   ├── target-architecture.md
│   └── adoption-plan.md
├── decisions/
│   └── adr-001-example.md
├── reviews/
└── rebuild/
    ├── status.md
    └── archive/
```

Create only directories needed by the current mode and confirmed project reality. Empty or speculative child spec folders should not be created.

### Workspace Directories

| Directory | Role |
| --- | --- |
| `specs/` | Implementation facts: code behavior, stack, constraints, mappings, and verification points. |
| `architecture/` | Current architecture rules, placement rules, target architecture, and adoption plans during rebuilds. |
| `decisions/` | ADRs, the single source for why architecture decisions were made. |
| `reviews/` | Placement and architecture review records produced by governance workflows. |
| `rebuild/status.md` | Rebuild mode source of truth for active, paused, or completed migrations. |

## Modes

| Mode | Use it when | What it does |
| --- | --- | --- |
| `init` | Starting Spec Docs in a project | Builds the implementation spec library, creates core files, records architecture governance when present, and installs the marked agent protocol block. |
| `update` | Code changed | Synchronizes affected specs and `inventory.md` using Code-to-Spec, Task-to-Spec, and Symbol-to-Spec mappings. |
| `verify` | Before claiming specs are current | Checks protocol blocks, required files, frontmatter, source paths, coverage, symbol mappings, and placeholder-free content. |
| `repair` | Specs are stale or inconsistent | Realigns docs and project rules with current code; reports likely code issues without modifying code unless explicitly requested. |
| `place` | Deciding where a new module or change belongs | Checks proposed placement against `architecture/` rules without creating files and records the review in `docs/spec-docs/reviews/`. |
| `rebuild` | Starting a target architecture migration | Defines target architecture, an adoption plan, and rebuild status while keeping specs aligned during the migration. |
| `adopt` | Completing a rebuild migration | Merges target architecture into current architecture, updates ADR evidence, completes rebuild status, and archives rebuild documents. |

### Empty project behavior

For empty project directories, `init` creates a minimal project-principles seed instead of a full implementation spec library. It records confirmed project purpose, intended technology stack, durable coding/testing/dependency principles, directory organization constraints, and out-of-scope boundaries. It does not create `inventory.md`, empty indexes, plans, scaffolding, future feature specs, or roadmap items. When implementation files appear, `update` absorbs this seed into the normal implementation-first spec library.

### Existing implementation behavior

For existing-implementation projects, `init` is not complete until the Code-to-Spec Index covers all included implementation-relevant files and the protocol block is installed or updated in `AGENTS.md` and/or `CLAUDE.md`.

## Architecture Governance

Spec Docs can enforce architecture governance through `docs/spec-docs/architecture/`, `docs/spec-docs/decisions/`, and `docs/spec-docs/reviews/`:

- `current-architecture.md` records current architecture rules and constraints derived from implementation.
- `placement-rules.md` records where new code and modules should be placed.
- `target-architecture.md` and `adoption-plan.md` guide active rebuild migrations.
- ADRs in `docs/spec-docs/decisions/` explain why architecture decisions were made and where implementation evidence lives.
- Placement and architecture reviews in `docs/spec-docs/reviews/` record governance decisions without changing code.

When architecture governance is active, `place` checks proposed module placement before implementation planning, and `verify` checks that code still conforms to declared current or active target architecture constraints.

## Standalone and Integrated Workflows

Spec Docs detects whether the project already uses an external Spec Skill or workflow that manages requirements, plans, or feature-level specs (e.g., Superpowers, OpenSpec, Spec-Kit).

1. If a known external Spec Skill is detected, Spec Docs runs in **Integrated Mode** and defers requirement-level and planning concerns to that skill.
2. If no known external Spec Skill is found, Spec Docs asks once whether another module- or feature-level Spec Skill exists.
3. If none exists, Spec Docs runs in **Standalone Mode** with a **Minimal Implementation Plan** -- recording only what is needed to keep specs synchronized with current code, without becoming a full requirements system, roadmap, backlog, or replacement for external Spec Skills.

Standalone Mode never creates roadmap items, backlog entries, or feature plans. It may perform lightweight intent clarification, placement review, and a Minimal Implementation Plan before implementation; those are temporary execution aids or reviews, not implementation facts stored under `specs/`.

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

When implementation behavior sources conflict:

1. code, contracts, and configs
2. tests
3. existing docs
4. commit history
5. existing specs
6. ADRs in `docs/spec-docs/decisions/`

For architecture rules, use `architecture/current-architecture.md`, `architecture/placement-rules.md`, accepted ADRs, then specs. For decision rationale, use ADRs first.

If behavior cannot be confirmed, specs must use:

```text
[NEEDS CLARIFICATION: <specific question>]
```

Agents must not guess.

## Usage

| Task | Prompt |
| --- | --- |
| Initialize a project | `Use $spec-docs init to build a full implementation-first spec knowledge base for this project.` |
| Update specs after code changes | `Use $spec-docs update to synchronize specs with the current code changes.` |
| Verify consistency | `Use $spec-docs verify to check whether docs/spec-docs is current and complete.` |
| Repair stale specs | `Use $spec-docs repair to realign stale specs with the current implementation.` |
| Review module placement | `Use $spec-docs place to decide where this change belongs before implementation planning.` |
| Start a rebuild migration | `Use $spec-docs rebuild to define and track a target architecture migration for this project.` |
| Adopt a completed rebuild | `Use $spec-docs adopt to merge the completed target architecture into the current architecture and archive rebuild documents.` |

## Migration from the previous `docs/specs/` layout

Older versions used `docs/specs/` directly. The current workspace layout is `docs/spec-docs/specs/`.

Migration steps:

1. Move `docs/specs/*` to `docs/spec-docs/specs/`.
2. Move `constitution.md` and `inventory.md` to `docs/spec-docs/` if they exist.
3. Update the `AGENTS.md` or `CLAUDE.md` protocol block.
4. Run `spec-docs verify`.

No compatibility layer is required after migration.

## Repository Contents

```text
.
├── skills/
│   └── spec-docs/
│       ├── SKILL.md
│       └── templates/
│           ├── agent-protocol-block.md
│           ├── specs-readme.md
│           ├── workspace-readme.md
│           ├── constitution.md
│           ├── inventory.md
│           ├── project-overview.spec.md
│           ├── feature.spec.md
│           ├── module.spec.md
│           ├── interface.spec.md
│           ├── runtime.spec.md
│           ├── data.spec.md
│           ├── integration.spec.md
│           ├── quality.spec.md
│           ├── current-architecture.md
│           ├── target-architecture.md
│           ├── placement-rules.md
│           ├── architecture-review.md
│           ├── placement-review.md
│           ├── adr.md
│           ├── rebuild-status.md
│           ├── adoption-plan.md
│           └── minimal-implementation-plan.md
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
