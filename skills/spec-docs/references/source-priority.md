# Source Priority Reference

This file is the canonical home for conflict handling and source priority rules.

## Implementation Facts

```text
code / contracts / configs
> tests
> existing docs
> commit history
> docs/spec-docs/specs/
> ADRs in docs/spec-docs/decisions/
```

Architecture docs and ADRs must not override current code facts. If implementation behavior cannot be confirmed, write `[NEEDS CLARIFICATION: <specific question>]`.

## Architecture Rules

```text
docs/spec-docs/architecture/current-architecture.md
> docs/spec-docs/architecture/placement-rules.md
> Accepted ADRs in docs/spec-docs/decisions/
> existing specs
```

If code and architecture rules conflict, report `[ARCHITECTURE VIOLATION: ...]` or `[ARCHITECTURE VIOLATION: ARCHITECTURE DRIFT]`. Do not silently weaken rules during `update`.

## Placement Decisions

```text
latest placement review
> docs/spec-docs/architecture/placement-rules.md
> docs/spec-docs/architecture/current-architecture.md
> related module specs
> inferred code patterns
```

If the latest placement review conflicts with architecture rules, re-run `place`, ask the user, or create/use an ADR before implementing.

## Diagnosis

```text
reported symptom
> related module specs
> docs/spec-docs/architecture/debugging-rules.md
> docs/spec-docs/architecture/placement-rules.md
> docs/spec-docs/architecture/current-architecture.md
> code / tests / logs available to the agent
```

`diagnose` may identify likely ownership and likely failure boundary. It must not claim root cause without evidence.

## Decision Rationale

```text
ADRs in docs/spec-docs/decisions/
> architecture docs
> specs
```

ADRs are the single decision source. Use ADR status and implementation evidence instead of creating decision specs.
