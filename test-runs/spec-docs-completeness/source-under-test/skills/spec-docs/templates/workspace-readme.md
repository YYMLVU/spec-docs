# Spec Docs Workspace

## Purpose

[One or two sentences describing what this project does and its responsibility boundary.]

## Skill Structure

This workspace is maintained by the spec-docs skill, which uses a compact structure. The canonical entrypoint is `SKILL.md` -- this generated README summarizes workspace layout and maintenance; agents must follow the `SKILL.md` reference map.

- **`SKILL.md`** is the execution router: identity, mode router, hard gates, and reference map. The agent reads this first.
- **`references/`** contains normative rules. When a mode points to a reference, the agent must read and follow it before acting.
- **`templates/`** provides the output shapes for specs, architecture docs, ADRs, and reviews.
- **`hooks/`** (optional) provides agent hook scripts that remind or block at key actions. Hooks do not replace rules and must not automatically modify code, ADRs, or architecture rules.

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
- **Before declaring work done**: complete the impact-appropriate spec action: Level 0 no-update reason, Level 1 affected spec update, Level 2 targeted light check, Level 3 full verify, or Level 4 architecture-risk escalation.
- **Before non-trivial feature placement**: run `spec-docs place`.

## Architecture Control Layer

Spec Docs provides an Architecture Control Layer with six responsibilities: Architecture Selection, Placement, Boundary Contract, Compliance Verification, Failure Localization, and Rebuild Evolution. Architecture governance is available and used when architecture docs exist or when the project needs it.

Architecture rules live in `docs/spec-docs/architecture/current-architecture.md` and `placement-rules.md`. `current-architecture.md` records Architecture Selection (Primary Preset, confidence, source, Addons, Adoption Mode, rationale, known deviations). `placement-rules.md` records Boundary Contract and placement rules. Optional `debugging-rules.md` records architecture-guided debugging rules when the project needs them. When code violates these rules, `verify` reports `[ARCHITECTURE VIOLATION]` findings. Architecture rules must not be silently relaxed during `update`. Use `repair architecture` with explicit user confirmation or an ADR.

## ADRs

Architecture decisions are stored in `docs/spec-docs/decisions/` using the ADR format. Decisions must not be embedded in specs. When a placement review results in `Needs ADR`, create an ADR before proceeding with implementation.

## Rebuild Mode

When `docs/spec-docs/rebuild/status.md` has `mode: rebuild` and `status: active`, `verify` checks code against both current and target architecture. When status is `paused`, `verify` may report target architecture gaps as warning/info and should not block normal maintenance unless the changed area touches migration scope. Target architecture and adoption plan are defined in `docs/spec-docs/architecture/target-architecture.md` and `docs/spec-docs/architecture/adoption-plan.md`. After `spec-docs adopt`, target architecture and adoption plan are archived to `docs/spec-docs/rebuild/archive/`.

## Verification

Run `spec-docs verify` when a full verification gate applies, or when explicitly requested, to check:

- Core files exist and contain required structures.
- Every spec has valid frontmatter and resolves source paths.
- Code-to-Spec Index covers all included implementation-relevant files.
- No `{{template_variables}}`, unresolved task markers, or unresolved decision markers remain in generated specs.
- Code does not violate current architecture rules.
- If rebuild is active, code does not violate target architecture rules.
- If rebuild is paused, target architecture gaps are warning/info unless the changed area touches migration scope.
- ADR implementation evidence matches code.
