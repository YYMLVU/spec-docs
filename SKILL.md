---
name: spec-docs-knowledge-base
description: Use when a project needs to be converted into an AI-readable spec documentation library before development, refactoring, onboarding, or multi-agent work; especially when the user asks to spec-ify, document architecture/features, build a knowledge base, or prepare AI context for a repo.
---

# Spec Docs Knowledge Base

## Overview

Create a lightweight, living spec documentation library for any project. The output must help future AI agents read a small entrypoint first, then only the relevant architecture or feature specs for the task.

## Core Rules

- Describe current implementation only; do not present planned or imagined behavior as fact.
- Treat source priority as: code/contracts/configs > tests > existing docs > commit history.
- Do not hardcode the number of spec files. Add, split, merge, or delete specs to match the real project.
- Keep docs simple Markdown. Do not introduce a doc generator, dependency, or database unless explicitly requested.
- Use project-local conventions and existing docs folders when present; default to `docs/specs/`.
- Update the spec index whenever a spec file is added, renamed, split, merged, or removed.

## Workflow

### 1. Explore Before Writing

Inspect the repo with read-only commands first:

- Top-level files: README, AGENTS/CLAUDE/GEMINI instructions, package manifests, compose files, env examples.
- Source maps: app routes, API clients, domain modules, backend handlers, contracts, schemas, tests.
- Existing docs: architecture notes, implementation logs, plans, OpenAPI/GraphQL/protobuf/SQL contracts.
- Recent history if useful: concise `git log --oneline`.

Identify:

- Product purpose and main user flows.
- Runtime units and entrypoints.
- Frontend/backend/API/storage boundaries.
- Current feature domains.
- Cross-cutting systems such as auth, permissions, persistence, jobs, queues, uploads, notifications, billing, analytics, observability.

### 2. Choose Dynamic Spec Slices

Create specs by responsibility, not by arbitrary file count.

Recommended starting layout:

```text
docs/specs/
├── README.md
├── project-overview.spec.md
├── frontend/
├── backend/
└── features/
```

Adapt it:

- Omit `frontend/` or `backend/` if the project lacks that layer.
- Add folders such as `mobile/`, `cli/`, `workers/`, `infra/`, `data/`, or `integrations/` when they are real first-class parts.
- Split large feature specs when one file mixes distinct workflows.
- Merge tiny specs when separate files would add lookup overhead.
- Remove specs for deleted or nonexistent features.

### 3. Write the Index

`docs/specs/README.md` is the AI entrypoint. Include:

- Purpose of the spec library.
- Default reading order.
- Task-to-spec reading map.
- Maintenance rules.
- Explicit statement that the spec set is living and changes with the project.

Default reading order:

1. `docs/specs/README.md`
2. `docs/specs/project-overview.spec.md`
3. Relevant feature specs.
4. Relevant layer specs such as frontend/backend/infra.

### 4. Use a Stable Spec Template

For each `.spec.md`, use this template unless a section is genuinely irrelevant:

```md
# <Name> Spec

## Purpose
What this module or feature is responsible for.

## Current Behavior
How the current implementation works.

## User Flow
How users, systems, or developers interact with it.

## Frontend Surface
Pages, components, hooks, state, clients. Use "Not applicable" only when true.

## Backend Surface
Routes, handlers, services, jobs, schemas. Use "Not applicable" only when true.

## Business Rules
Rules enforced by the current implementation.

## Edge Cases
Known failure modes, permissions, empty states, compatibility paths.

## Test Points
Unit, integration, build, manual, or contract checks that prove this area.

## Code References
Real paths only.

## Update Rules
Which code changes require this spec to be updated.
```

### 5. Batch the Work

For medium or large repos, work in batches:

1. Index and project overview.
2. Cross-cutting architecture specs.
3. Runtime/API/storage/platform specs.
4. Core feature specs.
5. Secondary feature/integration specs.
6. Consistency review.

Each batch should be internally useful if interrupted.

### 6. Verify Before Finishing

Run checks appropriate to the repo and document set:

- File count/list matches the chosen spec inventory.
- Every `.spec.md` has required sections.
- No placeholder text such as `TB[D]`, `TO[D]O`, `待补[充]`.
- `Code References` point to real paths or intentionally external contracts.
- The index reading map includes every spec.
- Git diff contains only intended documentation changes unless the user requested more.

Useful commands:

```bash
rg --files docs/specs
rg "\b(TB[D]|TO[D]O)\b|待补[充]" docs/specs
rg "## Code References|## Update Rules" docs/specs
git diff --check -- docs/specs
```

## Common Mistakes

- Freezing the initial spec count as permanent.
- Writing aspirational product docs instead of current implementation specs.
- Making one huge context dump that future AI must always read.
- Splitting every route/component into its own spec when a feature-level spec is enough.
- Forgetting cross-cutting specs for API clients, auth, persistence, jobs, or platform services.
- Leaving paths vague, stale, or not rooted in the repo.
