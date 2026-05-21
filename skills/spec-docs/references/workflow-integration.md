# Workflow Integration Reference

Spec Docs prefers integration with existing feature/spec/planning workflows.

## Detection Order

1. Detect known workflows such as Superpowers, OpenSpec, or Spec-Kit.
2. If none are detected, ask once whether another module-level or feature-level Spec Skill exists.
3. If one exists, inspect and use it.
4. If none exists or it cannot be found, use Standalone Mode.

## Integrated Mode

```text
Requirement Intake
  -> spec-docs place
  -> Detailed Spec / Plan
  -> Implementation / TDD
  -> spec-docs update
  -> spec-docs verify
```

Spec Docs does not replace external planning workflows. It provides implementation facts, architecture placement, architecture verification, and documentation synchronization.

## Standalone Mode

```text
Lightweight Requirement Intake
  -> spec-docs place
  -> Minimal Implementation Plan
  -> Implementation
  -> spec-docs update
  -> spec-docs verify
```

Standalone Mode must remain lightweight and must not become a roadmap, backlog, full requirements system, or external Spec Skill replacement.
