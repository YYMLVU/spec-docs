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

Spec Docs is a reusable skill for building and maintaining a `docs/spec-docs/` workspace with an **implementation-first AI spec knowledge base** and **architecture governance** (enforcement depth applied when needed) for software projects.

Within that workspace, `specs/` records what the code does now: behavior, stack, module constraints, interfaces, data flow, key symbols, call relationships, boundaries, and verification points. `architecture/`, `decisions/`, `reviews/`, and `rebuild/` provide architecture governance (enforced to the depth the project needs), ADRs, review records, and migration state. Future AI agents can use this workspace to make precise changes without repeatedly scanning the whole repository or touching unrelated code.

> ✅ **Spec Docs 2.0.0** covers all 8 modes, architecture governance, hook scaffolds, and local completeness checks for both source and installed package forms.

## 🚀 Quick Start

### Platform support

- **Primary support: Claude Code** skill installation and usage.
- **Manual or experimental integration:** Cursor, GitHub Copilot, OpenAI agents, and other agent systems may use the skill files as a prompt/documentation package only when their installation, invocation, and verification behavior are confirmed for that environment.

### Option 1: Ask Claude Code

Send this to Claude Code:

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

## 🎁 What You Get

| Capability | Purpose |
| --- | --- |
| 📚 Implementation specs | Capture confirmed behavior, stack, interfaces, data flow, edge cases, and verification points. |
| 🧩 Inventory reverse index | Map files, tasks, symbols, and specs so agents know what to read and update. |
| 🏗️ Architecture governance | Record placement rules, current architecture, target architecture, and architecture reviews. |
| 🧾 ADRs | Preserve why architecture decisions were made and where implementation evidence lives. |
| 🔁 Rebuild tracking | Coordinate controlled subsystem rewrites without losing spec/code alignment. |
| 🤖 Agent protocol block | Install durable instructions into `AGENTS.md` or `CLAUDE.md` so future agents keep specs synchronized. |

## 🧠 Core Idea

Spec Docs treats the current implementation as the source of truth.

It is not:

- ❌ a product requirements system
- ❌ a roadmap
- ❌ an implementation planning tool
- ❌ a task generator
- ❌ a spec-to-code workflow

It is:

- ✅ a current-code knowledge base
- ✅ an AI reading entrypoint
- ✅ a code-to-spec reverse index
- ✅ a symbol-to-spec maintenance map
- ✅ a project-level protocol for keeping specs synchronized with implementation changes

## 🧩 Compact Skill Structure

The spec-docs skill uses a compact `SKILL.md` as the execution router, with detailed rules separated into dedicated layers:

| Layer | Directory | Purpose |
| --- | --- | --- |
| 🧭 Router | `SKILL.md` | Identity, mode router, hard gates, and reference map. The agent reads this first to determine which mode and reference to follow. |
| 📖 Normative rules | `skills/spec-docs/references/` | Detailed per-mode rules, verification criteria, spec-authoring rules, architecture control, workflow integration, and hook policy. When a mode points to a reference, that reference is normative -- the agent must read and follow it before acting. |
| 🧱 Output shapes | `templates/` | File templates for specs, architecture docs, ADRs, reviews, and other workspace outputs. |
| 🪝 Optional hook layer | `hooks/` | Skeleton/reminder placeholders for agent hook integration. Claude hook scaffolds cover `SessionStart`, `PreToolUse` (Edit/Write/MultiEdit plus Bash), `PostToolUse`, and `Stop`; Cursor hook scaffolds cover `sessionStart` and `stop`. Hooks do not replace rules; they detect events and point the agent to the required mode or reference. Hooks must not automatically modify code, ADRs, or architecture rules. Current hooks are not production-enforced; they serve as integration scaffolding with session/change-unit reminder deduplication. |

This separation keeps the skill entry point small while ensuring all rules remain accessible and authoritative in their canonical location.

## 📦 What It Creates

Typical output in a target project:

```text
📁 docs/spec-docs/
├── README.md
├── constitution.md
├── inventory.md
├── 📁 specs/
│   ├── project-overview.spec.md
│   ├── 📁 features/
│   ├── 📁 modules/
│   ├── 📁 interfaces/
│   ├── 📁 runtime/
│   ├── 📁 data/
│   ├── 📁 integrations/
│   └── 📁 quality/
├── 📁 architecture/
│   ├── current-architecture.md
│   ├── placement-rules.md
│   ├── debugging-rules.md
│   ├── target-architecture.md
│   └── adoption-plan.md
├── 📁 decisions/
│   └── adr-001-example.md
├── 📁 reviews/
└── 📁 rebuild/
    ├── status.md
    └── 📁 archive/
```

Create only directories needed by the current mode and confirmed project reality. Empty or speculative child spec folders should not be created.

`init` scales output by project profile:

- **Empty projects** receive only a minimal principle seed; no fake implementation specs or inventory indexes are created.
- **Minimal existing projects** receive README, constitution, inventory, and project overview; architecture docs, ADRs, rebuild docs, and child spec folders are not created by default.
- **Standard existing projects** receive grounded child specs only for observed implementation areas.
- **Large projects** may use phased init with `PARTIAL INIT`; final init completion is not claimed until included-scope coverage is verified.

Existing `docs/spec-docs/` workspaces remain valid. Adaptive profiles guide future `init` behavior; they do not require deleting existing specs or architecture docs.

### Workspace Directories

| Directory | Role |
| --- | --- |
| 📁 `specs/` | Implementation facts: code behavior, stack, constraints, mappings, and verification points. |
| 🏗️ `architecture/` | Current architecture rules, placement rules, debugging rules, target architecture, and adoption plans during rebuilds. |
| 🧾 `decisions/` | ADRs, the single source for why architecture decisions were made. |
| 🔎 `reviews/` | Placement and architecture review records produced by governance workflows. |
| 🔁 `rebuild/status.md` | Rebuild mode source of truth for active, paused, or completed migrations. |

## 🧭 Modes

| Mode | Use it when | What it does |
| --- | --- | --- |
| 🚀 `init` | Starting Spec Docs in a project | Builds the implementation spec library, creates core files, records architecture governance when present, and installs the marked agent protocol block. |
| 🔄 `update` | Code changed | Synchronizes affected specs and `inventory.md` using Code-to-Spec, Task-to-Spec, and Symbol-to-Spec mappings. Routine changes use Level 0-4 impact routing: Level 0 comment-only or metadata-only changes can state a no-update reason; Level 1 single-spec behavior changes update only the mapped spec; Level 2 localized changes use targeted light check; Level 3 broad changes require full verify; Level 4 architecture-risk changes require escalation. |
| ✅ `verify` | Before claiming specs are current | Checks protocol blocks, required files, frontmatter, source paths, coverage, symbol mappings, placeholder-free content, and architecture conformance. Reports `[ARCHITECTURE VIOLATION: <subtype>]` with expected behavior and recommended action. Severity reflects Adoption Mode and enabled Addons. |
| 🩹 `repair` | Specs are stale or inconsistent | Realigns docs and project rules with current code; reports likely code issues without modifying code unless explicitly requested. |
| 📍 `place` | Deciding where a new module or change belongs | Runs Placement & Boundary Review against `architecture/` rules before implementation planning. Outputs ownership, layer placement, boundary contract (allowed/forbidden dependencies, required contracts, forbidden shortcuts), failure localization hints, and specs to update. Serves as boundary contract for later planning. Does not modify code. |
| 🏗️ `rebuild` | Starting a target architecture migration | Defines target architecture, an adoption plan, and rebuild status while keeping specs aligned during the migration. |
| 📦 `adopt` | Completing a rebuild migration, or introducing scoped governance for one clearly evidenced area | Merges target architecture into current architecture, updates ADR evidence, completes rebuild status, and archives rebuild documents. Also supports scoped adopt for one well-evidenced area without requiring a full rebuild. |
| 🧭 `diagnose` | A symptom needs architecture-guided triage | Identifies likely owner, likely layer, specs/files to inspect, signals to check, and debugging order. Does not perform direct repair. |

### Empty project behavior

For empty project directories, `init` creates a minimal project-principles seed instead of a full implementation spec library. It records confirmed project purpose, intended technology stack, durable coding/testing/dependency principles, directory organization constraints, and out-of-scope boundaries. It does not create `inventory.md`, empty indexes, plans, scaffolding, future feature specs, or roadmap items. When implementation files appear, `update` absorbs this seed into the normal implementation-first spec library.

### Existing implementation behavior

For existing-implementation projects, `init` completion depends on the adaptive profile:

- **Minimal Existing Project:** `init` is complete when the minimal workspace covers included implementation files through inventory and project overview.
- **Standard Existing Project:** `init` is complete when the Code-to-Spec Index covers all included implementation-relevant files.
- **Large Project / Phased Init:** may use `PARTIAL INIT`, which is not final completion; final completion still requires included-scope coverage verification.

## 🏗️ Architecture Governance

Spec Docs enforces an Architecture Control Layer with six responsibilities:

1. 🧭 **Architecture Selection** -- identify or choose the project's Primary Preset, Addons, and Adoption Mode.
2. 📍 **Placement** -- decide where new code belongs before implementation planning.
3. 🧱 **Boundary Contract** -- define module boundaries, dependency direction, public contracts, shared code rules, and infrastructure access rules.
4. ✅ **Compliance Verification** -- check that code conforms to architecture rules; report violations and drift.
5. 🔎 **Failure Localization** -- trace symptoms to owner module, failing layer, and debugging path.
6. 🔁 **Rebuild Evolution** -- track controlled migration from current to target architecture.

Architecture governance operates through `docs/spec-docs/architecture/`, `docs/spec-docs/decisions/`, and `docs/spec-docs/reviews/`:

- `current-architecture.md` records Architecture Selection (Primary Preset, confidence, source, Addons, Adoption Mode, rationale, known deviations) and current architecture rules.
- `placement-rules.md` records Boundary Contract and placement rules.
- `target-architecture.md` and `adoption-plan.md` record Target Architecture Selection and guide active rebuild migrations.
- ADRs in `docs/spec-docs/decisions/` explain why architecture decisions were made and where implementation evidence lives.
- Placement and architecture reviews in `docs/spec-docs/reviews/` record governance decisions without changing code.

When architecture governance is active, `place` checks proposed module placement before implementation planning, and `verify` checks that code still conforms to declared current or active target architecture constraints.

Architecture verification reports specific violation subtypes instead of generic drift when evidence is available. For example, `verify` can report `[ARCHITECTURE VIOLATION: ARCHITECTURE DRIFT]` when feature-specific policy accumulates in shared utilities despite placement rules assigning that policy to an owning feature module. In strict Adoption Mode or with boundary-focused Addons, severity should reflect the stronger boundary contract.

Completed rebuilds use `adopt` as a finalization step, not as another first-time `init`. When `rebuild/status.md` shows a ready-to-adopt phase and passing verification, `adopt` merges the target Architecture Selection into current architecture, preserves relevant placement rules, updates ADR evidence, marks rebuild completed, and archives target/adoption documents.

## 🔌 Standalone and Integrated Workflows

Spec Docs detects whether the project already uses an external Spec Skill or workflow that manages requirements, plans, or feature-level specs (e.g., Superpowers, OpenSpec, Spec-Kit).

1. If a known external Spec Skill is detected, Spec Docs runs in **Integrated Mode** and defers requirement-level and planning concerns to that skill.
2. If no known external Spec Skill is found, Spec Docs asks once whether another module- or feature-level Spec Skill exists.
3. If none exists, Spec Docs runs in **Standalone Mode** with a **Minimal Implementation Plan** -- recording only what is needed to keep specs synchronized with current code, without becoming a full requirements system, roadmap, backlog, or replacement for external Spec Skills.

Standalone Mode never creates roadmap items, backlog entries, or feature plans. It may perform lightweight intent clarification, placement review, and a Minimal Implementation Plan before implementation; those are temporary execution aids or reviews, not implementation facts stored under `specs/`.

## 🧾 Implementation Mapping

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

## 🗂️ Inventory

`docs/spec-docs/inventory.md` is the objective reverse index for the spec library.

It contains:

- Coverage Scope with included and excluded globs
- Spec List
- Code-to-Spec Index
- Task-to-Spec Map
- Symbol-to-Spec Index

It does not contain planned specs, coverage gaps, todo items, or roadmap entries.

## 🛡️ Project Maintenance Protocol

After `init`, Spec Docs installs a marked protocol block into project-level agent instructions:

- update existing `AGENTS.md`
- update existing `CLAUDE.md`
- update both if both exist
- create `AGENTS.md` if neither exists

The block is wrapped with `<!-- SPEC-DOCS-PROTOCOL:BEGIN -->` and `<!-- SPEC-DOCS-PROTOCOL:END -->` markers. Future `init` or `repair` runs can replace the marked block without rewriting unrelated project instructions.

The block requires future AI agents to read relevant specs before implementation changes, classify implementation impact after those changes, and complete the impact-appropriate spec action before claiming completion: Level 0 no-update reason, Level 1 affected spec update, Level 2 targeted light check, Level 3 full verify, or Level 4 architecture-risk escalation with full verify before architecture-current claims.

## 🎯 Source-of-Truth Priority

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

## 🛠️ Usage

| Task | Prompt |
| --- | --- |
| Initialize a project | `Use $spec-docs init to build a full implementation-first spec knowledge base for this project.` |
| Update specs after code changes | `Use $spec-docs update to synchronize specs with the current code changes.` |
| Verify consistency | `Use $spec-docs verify to check whether docs/spec-docs is current and complete.` |
| Repair stale specs | `Use $spec-docs repair to realign stale specs with the current implementation.` |
| Review module placement | `Use $spec-docs place to decide where this change belongs before implementation planning.` |
| Start a rebuild migration | `Use $spec-docs rebuild to define and track a target architecture migration for this project.` |
| Adopt a completed rebuild | `Use $spec-docs adopt to merge the completed target architecture into the current architecture and archive rebuild documents.` |
| Architecture-guided diagnosis | `Use the spec-docs skill in diagnose mode for this symptom: <symptom>. Identify likely owner, failure boundary, specs/files to inspect, signals to check, and debugging order without claiming root cause prematurely.` |

In this table, `$spec-docs` means "the spec-docs skill"; phrase the request however your agent expects. `verify`, `place`, `repair`, and `adopt` support scoped subpaths when the task does not require a full workspace pass.

## ✅ Release and Completeness Notes

> 📦 **Version `2.0.0`** has local completeness coverage for both the source tree and installed package form.
>
> The local suite covers twenty-eight scenarios across all eight modes: `init`, `update`, `verify`, `repair`, `place`, `rebuild`, `adopt`, and `diagnose`.

Coverage highlights:

- ✅ source-form and installed-form checks
- ✅ empty-project and existing-project `init`
- ✅ architecture placement and boundary review
- ✅ scoped placement, scoped repair, repair escalation, rebuild recommendation, and adopt scope distinction
- ✅ Level 0-4 impact-aware routing without full-verify over-triggering for Level 0-2
- ✅ targeted-check, layered-check, and full-verify scope separation
- ✅ implementation/spec synchronization
- ✅ fact drift plus architecture violation reporting
- ✅ `[ARCHITECTURE VIOLATION: ARCHITECTURE DRIFT]` for policy moving into the wrong module
- ✅ repair without unauthorized code changes
- ✅ rebuild state tracking and completed-rebuild `adopt` finalization
- ✅ architecture-guided diagnosis
- ✅ Superpowers-present collaboration and no-Spec-Skill fallback reasoning
- ✅ hook static checks, script execution checks, and matcher simulation for Claude and Cursor hook scaffolds; hooks are reminders, not production-enforced automation

> ⚠️ **Known limitations:** `greenfield` Adoption Mode semantics still need a product decision, and live protocol-block synchronization is not part of the local static/script/simulation hook suite.

## 🔁 Migration from the previous `docs/specs/` layout

Older versions used `docs/specs/` directly. The current workspace layout is `docs/spec-docs/specs/`.

Migration steps:

1. Move `docs/specs/*` to `docs/spec-docs/specs/`.
2. Move `constitution.md` and `inventory.md` to `docs/spec-docs/` if they exist.
3. Update the marked protocol block in `AGENTS.md` or `CLAUDE.md` between `<!-- SPEC-DOCS-PROTOCOL:BEGIN -->` and `<!-- SPEC-DOCS-PROTOCOL:END -->`; if the block does not exist yet, run `spec-docs init` or `spec-docs repair` to insert it without rewriting unrelated project instructions.
4. Classify the migration impact and complete the impact-appropriate spec action; run full `spec-docs verify` only if the impact level or an explicit currentness claim requires it.

No compatibility layer is required after migration.

## 📚 Repository Contents

```text
.
├── 📁 skills/
│   └── 📁 spec-docs/
│       ├── SKILL.md
│       ├── 📁 references/
│       │   ├── modes.md
│       │   ├── architecture-control.md
│       │   ├── source-priority.md
│       │   ├── verification.md
│       │   ├── spec-authoring.md
│       │   ├── workflow-integration.md
│       │   ├── project-instructions.md
│       │   ├── hard-gates.md
│       │   ├── hooks.md
│       │   └── common-mistakes.md
│       ├── 📁 hooks/
│       │   ├── hooks.json
│       │   ├── hooks-cursor.json
│       │   ├── run-hook.cmd      # Windows wrapper; POSIX shells run scripts/ directly
│       │   └── 📁 scripts/
│       │       ├── session-start
│       │       ├── pre-edit-guard
│       │       ├── pre-bash-guard
│       │       ├── post-edit-reminder
│       │       └── stop-verify-reminder
│       └── 📁 templates/
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
│           ├── debugging-rules.md
│           ├── diagnosis.md
│           ├── rebuild-status.md
│           ├── adoption-plan.md
│           └── minimal-implementation-plan.md
├── 📁 bin/
│   └── spec-docs.js
├── 📁 agents/
│   └── openai.yaml
├── 📁 test-runs/
│   └── 📁 spec-docs-completeness/   # local completeness suite: 28 scenarios, all modes, source + installed checks
├── package.json
├── package-lock.json
├── README.md
├── README.zh-CN.md
├── INSTALL-FOR-AI.md
├── 📁 docs/                # internal design notes, not shipped in the npm package
├── head.png
├── LICENSE
└── .gitignore
```

## 📜 License

MIT
