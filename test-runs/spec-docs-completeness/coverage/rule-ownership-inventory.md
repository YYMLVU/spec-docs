# Rule Ownership Inventory -- spec-docs Completeness Test

This inventory defines canonical ownership for major rule families after Phase 5.

## Ownership Principles

1. Each rule family has one canonical owner.
2. Top-level files summarize and link; they do not duplicate long procedures.
3. Installed protocol text may remain compact and self-contained because it is copied into downstream projects.
4. Hook text describes when reminders or blocks may happen; hooks do not define the rules themselves.
5. Public docs describe product behavior and installation, not detailed operational gates.

## Canonical Ownership Table

| Rule family | Canonical owner | Summary locations allowed | Required dedup decision |
|---|---|---|---|
| Identity, mode router, minimal contracts | `skills/spec-docs/SKILL.md` | `README.md` mode overview | Keep concise summaries only. |
| Core hard gates | `skills/spec-docs/SKILL.md` | `skills/spec-docs/references/hard-gates.md` (summary/index), protocol block compact summary | Do not duplicate long gate rationale outside canonical owner. |
| Workflow detection order, Integrated Mode, Standalone Mode, Minimal Implementation Plan boundaries | `skills/spec-docs/references/workflow-integration.md` | `SKILL.md`, `README.md` (summaries only) | Keep workflow mechanics in workflow-integration; public/top-level docs summarize only. |
| Anti-patterns and corrective guidance | `skills/spec-docs/references/common-mistakes.md` | review prompts (summary if needed) | Examples may be cited elsewhere, but canonical anti-pattern guidance lives in common-mistakes. |
| Init profiles | `skills/spec-docs/references/modes.md` | `SKILL.md`, public README | Summarize profile names only outside `modes.md`. |
| Impact levels 0-4 | `skills/spec-docs/references/modes.md` | `SKILL.md`, hooks policy, protocol block | Keep compact downstream protocol text, but remove unconditional update/verify wording that contradicts Levels 0-2. |
| Verify layers and currentness gates | `skills/spec-docs/references/verification.md` | `modes.md`, protocol block | Summaries must distinguish targeted-check, layered-check, and full-verify. |
| Architecture routing and subpaths | `skills/spec-docs/references/architecture-control.md` | `modes.md`, `SKILL.md` | Summaries may name scoped/full receiving paths but must not restate the full routing matrix. |
| Hook triggers, behavior levels, block candidates | `skills/spec-docs/references/hooks.md` | hook skeleton JSON/scripts, hook review prompt | Hook scripts remain reminder-only; no extra block candidates outside hooks reference. |
| Protocol block installation/update | `skills/spec-docs/references/project-instructions.md` | `SKILL.md` router, protocol block template | Installation mechanics live in project-instructions; block content lives in template. |
| Spec authoring, frontmatter, inventory | `skills/spec-docs/references/spec-authoring.md` | templates, `modes.md` | Templates show output shape; detailed rules stay in spec-authoring. |
| Source priority and conflict resolution | `skills/spec-docs/references/source-priority.md` | `SKILL.md`, protocol block | Compact summaries may repeat priority order because downstream agents need it. |
| Public installation | `INSTALL-FOR-AI.md` and `bin/spec-docs.js` | README quick start | Public docs must not introduce extra runtime gates. |
| Completeness expectations | `test-runs/spec-docs-completeness/` | final report | Tests document expected behavior and stale wording checks. |

## Trigger Deduplication Decisions

| Existing wording pattern | Decision | Replacement rule |
|---|---|---|
| `Run spec-docs update` as a universal post-code step | Replace | Classify impact first; then perform Level 0 no-update reason, Level 1 affected spec update, Level 2 targeted light check, Level 3 full verify, or Level 4 escalation. |
| `Run spec-docs verify` before every completion claim | Replace | Full verify is required only for final init, Level 3 broad currentness/release freshness, Level 4 architecture-current claims, and repair/adopt/rebuild completion. |
| `update/verify around tests/builds when code changed` | Replace | Hooks remind impact classification and impact-appropriate spec action around tests/builds when implementation-relevant files changed. |
| Hook block candidates repeated outside hooks reference | Summarize | `SKILL.md` may summarize block candidates; detailed criteria live in `references/hooks.md`. |
| Public README operational gate details | Keep compact | README describes impact-aware routing at product level only. |

## Planned Static Check Expectations

`check-static.mjs` should fail if source skill text reintroduces these stale unconditional patterns in operational templates or hook policy:

- `**Before declaring work done**: run `spec-docs verify`.`
- `Run `spec-docs update`.` immediately followed by `Run `spec-docs verify`.` in the protocol block
- `remind update/verify around tests/builds when code changed`

Allowed uses:

- `spec-docs verify` in command examples, verification reference text, and adopt/rebuild completion criteria.
- `full verify` where it is explicitly tied to Level 3, Level 4 architecture-current, final init, or repair/adopt/rebuild completion.
