# Workflow Integration Reference

Spec Docs prefers integration with existing feature/spec/planning workflows.

## Detection Order

Use concrete filesystem signals before judgment:

1. Detect Superpowers when `docs/superpowers/specs/` or `docs/superpowers/plans/` exists.
2. Detect OpenSpec when `openspec.yaml` or `specs/changes/` exists.
3. Detect Spec-Kit when `.specify/` or `specs/*/plan.md` exists.
4. If multiple workflows are detected, report them and defer requirements/planning ownership to the most specific active workflow evidence instead of assigning global ownership to spec-docs.
5. If none are detected, ask once whether another module-level or feature-level Spec Skill exists.
6. If one exists, inspect and use it.
7. If none exists or it cannot be found, use Standalone Mode.

## Integrated Mode

```text
Requirement Intake
  -> spec-docs place
  -> Detailed Spec / Plan
  -> Implementation / TDD
  -> classify impact
  -> impact-appropriate spec action
```

Spec Docs does not replace external planning workflows. It provides implementation facts, architecture placement, architecture verification, and documentation synchronization. Full verify applies only when the impact level, active mode, or explicit user request requires it.

## Small Bugfix Fast Path

For small bugfixes, do not expand into a full planning workflow unless impact signals require it:

1. Read the mapped spec or the smallest relevant spec set.
2. Apply the fix through the active external workflow, or directly in Standalone Mode when no external workflow exists.
3. Classify the change using `references/modes.md` Level 0 through Level 4.
4. Complete the impact-appropriate spec action: Level 0 no-update reason, Level 1 affected spec update, Level 2 targeted light check, Level 3 full verify, or Level 4 architecture-risk routing.

## Standalone Mode

```text
Lightweight Requirement Intake
  -> spec-docs place
  -> Minimal Implementation Plan
  -> Implementation
  -> classify impact
  -> impact-appropriate spec action
```

Standalone Mode must remain lightweight and must not become a roadmap, backlog, full requirements system, or external Spec Skill replacement. Full verify applies only when the impact level, active mode, or explicit user request requires it.
