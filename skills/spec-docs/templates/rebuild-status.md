---
mode: normal | rebuild
status: active | paused | completed
started_at: YYYY-MM-DD
completed_at: null
target_architecture: docs/spec-docs/architecture/target-architecture.md
adoption_plan: docs/spec-docs/architecture/adoption-plan.md
---

# Rebuild Status

## Current Phase

[Description of the current adoption phase or "not applicable" when mode is normal.]

## Progress

[Summary of completed phases and remaining work.]

## Blockers

[Any blockers preventing progress, or "none".]

## Archive Policy

After `spec-docs adopt` completes:

1. Set `status: completed` and `completed_at` in the frontmatter above.
2. Move `target-architecture.md` and `adoption-plan.md` from `docs/spec-docs/architecture/` to `docs/spec-docs/rebuild/archive/`.
3. Normal `verify` must not read files in `docs/spec-docs/rebuild/archive/`.
4. Merged architecture rules now live in `docs/spec-docs/architecture/current-architecture.md`.
