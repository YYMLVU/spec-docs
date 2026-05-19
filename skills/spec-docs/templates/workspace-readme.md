# Spec Docs Workspace

## Purpose

[One or two sentences describing what this project does and its responsibility boundary.]

## Directory Boundaries

```text
docs/spec-docs/
├── README.md              -- AI entrypoint and maintenance workflow
├── constitution.md        -- Durable principles and conflict rules
├── inventory.md           -- Coverage scope, spec metadata, reverse indexes
├── specs/                 -- Current implementation facts
├── architecture/          -- Architecture rules, placement rules, target architecture
├── decisions/             -- ADRs as the single decision source
├── reviews/               -- Placement and architecture reviews
└── rebuild/               -- Rebuild mode status and archive
```

## Reading Order

1. `constitution.md` -- source priority, coverage principle, conflict handling
2. `inventory.md` -- what is covered and where to find specs
3. `specs/project-overview.spec.md` -- project-level implementation summary
4. `specs/` -- detailed implementation specs by kind
5. `architecture/current-architecture.md` -- current architecture constraints
6. `architecture/placement-rules.md` -- where new code should go
7. `decisions/` -- architecture decision records

## Maintenance Workflow

- **Before code changes**: read affected specs via Code-to-Spec Index in `inventory.md`.
- **After code changes**: update every affected spec in the same change.
- **Before declaring work done**: run `spec-docs verify`.
- **Before non-trivial feature placement**: run `spec-docs place`.

## Architecture Governance

Architecture rules live in `docs/spec-docs/architecture/current-architecture.md` and `placement-rules.md`. When code violates these rules, `verify` reports `[ARCHITECTURE VIOLATION]` findings. Architecture rules must not be silently relaxed during `update`. Use `repair architecture` with explicit user confirmation or an ADR.

## ADRs

Architecture decisions are stored in `docs/spec-docs/decisions/` using the ADR format. Decisions must not be embedded in specs. When a placement review results in `Needs ADR`, create an ADR before proceeding with implementation.

## Rebuild Mode

When `docs/spec-docs/rebuild/status.md` has `mode: rebuild` and `status: active`, `verify` checks code against both current and target architecture. Target architecture and adoption plan are defined in `docs/spec-docs/architecture/target-architecture.md` and `docs/spec-docs/architecture/adoption-plan.md`. After `spec-docs adopt`, target architecture and adoption plan are archived to `docs/spec-docs/rebuild/archive/`.

## Verification

Run `spec-docs verify` to check:

- Core files exist and contain required structures.
- Every spec has valid frontmatter and resolves source paths.
- Code-to-Spec Index covers all included implementation-relevant files.
- No `{{template_variables}}`, unresolved task markers, or unresolved decision markers remain in generated specs.
- Code does not violate current architecture rules.
- If rebuild is active, code does not violate target architecture rules.
- ADR implementation evidence matches code.
