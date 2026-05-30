# Collaboration and Protocol Review Prompt

## Purpose

Evaluate the collaboration between the spec-docs skill and other Spec Skills (particularly local superpowers), and validate the agent protocol block mechanism. Review scenario S10 output and protocol block templates to determine whether both collaboration variants work correctly and the protocol block is properly synchronized.

## Background

The spec-docs skill operates in a collaborative ecosystem. It prefers integration with existing feature/spec/planning workflows over standalone operation. The collaboration model is defined in `references/workflow-integration.md` and the protocol block is defined in `templates/agent-protocol-block.md`.

## Inputs

- `results/scenario-outputs/s10.md` -- scenario S10 execution output (Hooks and Skill Collaboration)
- `prompts/scenarios/s10.md` -- scenario S10 prompt and checklist
- `source-under-test/skills/spec-docs/references/workflow-integration.md` -- normative workflow detection and collaboration rules
- `source-under-test/skills/spec-docs/references/project-instructions.md` -- protocol block installation and maintenance rules
- `source-under-test/skills/spec-docs/references/hooks.md` -- hook policy (for protocol block sync behavior)
- `source-under-test/skills/spec-docs/templates/agent-protocol-block.md` -- canonical protocol block template

## Review Steps

### 1. Workflow Detection Order (Both Variants)

From `references/workflow-integration.md`, the detection order MUST be:

1. Detect known workflows (Superpowers, OpenSpec, Spec-Kit).
2. If none detected, ask once whether another module-level or feature-level Spec Skill exists.
3. If one exists, inspect and use it (Integrated Mode).
4. If none exists or cannot be found, use Standalone Mode.

Verify for both S10 variants:

| Step | Variant A (Local Spec Skill Present) | Variant B (No Local Spec Skill) |
|---|---|---|
| Detect known workflows | Performed? | Performed? |
| Ask about other Spec Skills | Performed? | Performed? |
| Integrated or Standalone decision | Integrated Mode selected | Standalone Mode selected |
| Order preserved | yes/no | yes/no |

### 2. Variant A: Integrated Mode (Local Superpowers Spec Skill Present)

- Does the skill detect that a local superpowers Spec Skill is available?
- Does the collaboration follow the Integrated Mode flow?
  ```
  Requirement Intake (via local Spec Skill)
    -> spec-docs place
    -> Detailed Spec / Plan (via local Spec Skill)
    -> Implementation / TDD
    -> classify impact
    -> impact-appropriate spec action
  ```
- Does spec-docs provide placement, facts, and verification without replacing the local Spec Skill's planning workflow?
- Are collaboration boundaries clear: spec-docs handles placement, boundary contracts, facts, and verification; local Spec Skill handles feature-level specification and planning?
- Does the skill NOT override or replace the local Spec Skill's planning workflow?

### 3. Variant B: Standalone Mode (No Local Spec Skill)

- Does the skill detect that no local superpowers Spec Skill is available?
- Does the collaboration follow the Standalone Mode flow?
  ```
  Lightweight Requirement Intake
    -> spec-docs place
    -> Minimal Implementation Plan
    -> Implementation
    -> classify impact
    -> impact-appropriate spec action
  ```
- Does the Minimal Implementation Plan remain lightweight (not a full requirements system, roadmap, or backlog)?
- Does Standalone Mode NOT become a roadmap or backlog system?

### 4. Expected Workflow Order Preservation

For both variants, for non-trivial implementation changes, the expected order must be clear and preserved:

```
place -> implement -> classify impact -> impact-appropriate spec action
```

(Or the integrated equivalent, where the local Spec Skill's planning replaces the Standalone plan but `place` still runs before detailed planning.)

Verify:
- `place` runs before detailed implementation planning in both variants.
- Impact classification runs after implementation/TDD in both variants.
- Impact-appropriate spec action is completed in both variants: Level 0 no-update reason, Level 1 affected spec update, Level 2 targeted light check, Level 3 full verify, or Level 4 architecture-risk routing.
- The order is explicit in the output and not ambiguous.

### 5. Protocol Block Synchronization

The agent protocol block is defined in `templates/agent-protocol-block.md` with markers `<!-- SPEC-DOCS-PROTOCOL:BEGIN -->` and `<!-- SPEC-DOCS-PROTOCOL:END -->`.

From `references/project-instructions.md`:

- **Target Selection**: AGENTS.md precedence, then CLAUDE.md, then both, then create AGENTS.md.
- **Update Strategy**: Replace block if markers present, append if absent, no duplicates, no rewriting unrelated instructions, report conflicts if existing instructions conflict.
- **Protocol Expectations**: Read specs and architecture docs before implementation, run `place` before detailed planning, classify impact after implementation changes, complete impact-appropriate spec action before completion, use `diagnose` for architecture-guided triage.

Review S10 output for protocol block behavior:

| Protocol Check | Status |
|---|---|
| Protocol block exists in correct target file | yes/no/missing |
| Markers are correct (`SPEC-DOCS-PROTOCOL:BEGIN` / `SPEC-DOCS-PROTOCOL:END`) | yes/no |
| No duplicate blocks | yes/no |
| Protocol block content matches canonical template (or has only intentional, documented differences) | yes/no |
| Unrelated user instructions are not overwritten | yes/no |
| Protocol block requires reading specs/architecture before code changes | yes/no |
| Protocol block requires `place` before detailed planning for non-trivial changes | yes/no |
| Protocol block requires impact classification after implementation-relevant changes | yes/no |
| Protocol block requires impact-appropriate spec action before claiming completion | yes/no |
| Protocol block requires `diagnose` for architecture-guided triage | yes/no |

### 6. Hook Behavior During Collaboration

Review hook behavior during S10 (both variants):

- Hook reminders are `info` or `warning` level, not `block` level (unless a genuine block candidate is detected).
- Hooks do not invent blocking behavior beyond the defined block candidates.
- Hooks do not automatically modify code, create ADRs, weaken architecture rules, generate future plans, or over-block normal read-only work.
- `session-start` hook reminds about inspecting `docs/spec-docs/` and reading compact `SKILL.md`.
- `pre-edit-guard` hook reminds about `place` before non-trivial implementation changes.
- `post-edit-reminder` hook reminds about impact-aware spec action after implementation-relevant changes.
- `stop-verify-reminder` hook reminds about impact-appropriate completion action and strict full-verify gates.
- No extra hook behavior is invented beyond what the hook policy and skeleton hooks define.

### 7. Invented Hook Behavior

Check for any hook behavior NOT defined in `references/hooks.md`:
- Are hooks blocking on events where they should only remind?
- Are hooks adding extra conditions or guard logic not present in the policy?
- Are hooks checking filesystem state or performing I/O beyond printing reminders?

## Output Format

```
## Collaboration and Protocol Review

Status: PASS / PASS_WITH_NOTES / FAIL / BLOCKED

### Workflow Detection Order

| Step | Variant A | Variant B | Correct? |
|---|---|---|---|
| 1. Detect known workflows (Superpowers, OpenSpec, Spec-Kit) | performed/missed | performed/missed | |
| 2. Ask about other Spec Skills | performed/missed | performed/missed | |
| 3. Integrated or Standalone decision | correct/incorrect | correct/incorrect | |
| 4. Order preserved | yes/no | yes/no | |

### Superpowers-Present Flow Issues (Variant A)

(Empty if no issues found.)

### No-Spec-Skill Fallback Issues (Variant B)

(Empty if no issues found.)

### Workflow Order (place -> implement -> classify impact -> impact-appropriate spec action)

| Variant | place Before Planning | Impact Classified | Impact-Appropriate Spec Action | Order Explicit |
|---|---|---|---|---|
| A (Integrated) | yes/no | yes/no | yes/no | yes/no |
| B (Standalone) | yes/no | yes/no | yes/no | yes/no |

### Protocol Block Sync Issues

| Issue | Severity | Description |
|---|---|---|
| (issue) | error/warning/info | |

(Empty if no issues.)

### Invented Hook Behavior

(Empty if no invented hook behavior detected.)

### Overall Assessment

(Brief narrative summarizing collaboration mechanism completeness.)
```