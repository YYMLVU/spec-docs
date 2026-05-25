# Verification Reference

This file is the canonical home for verify rules.

## Output Status

- `PASS`: no error findings.
- `PASS WITH WARNINGS`: no error findings, but warning or info findings exist.
- `FAIL`: one or more error findings exist.

Output PASS, PASS WITH WARNINGS, or FAIL. If FAIL, list affected files and whether the next mode should be `update` or `repair`.

## Targeted Light Check

A targeted light check is a scoped verification variant for Level 2 update routing. It is not a full `verify` result and must not be reported as full `verify` PASS.

Use targeted light check only when `references/modes.md` classifies the change as Level 2.

Output format:

```text
Status: PASS | PASS WITH WARNINGS | FAIL
Scope: targeted-check
Checked specs: <list>
Checked inventory rows: <list or none>
Changed implementation evidence checked: <paths or symbols>
Findings: <[FACT DRIFT] / [ARCHITECTURE VIOLATION] / [DECISION DRIFT] if any>
Warnings: <non-blocking uncertainty, if any>
Recommended next action: <none, update specific file, escalate, or run full verify>
```

Required checks:

- Changed spec frontmatter is valid.
- Referenced source paths still exist.
- Changed spec sections contain no `{{template_variables}}`, `TBD`, or `TODO`.
- Affected inventory mappings still point to existing specs and files.
- Changed spec sections accurately describe the changed implementation behavior, edge case, contract, or verification point.
- Architecture files and accepted ADRs were not modified unexpectedly, checked by changed-path inspection rather than broad architecture review.

A targeted-check `FAIL` follows normal verify failure semantics for the checked scope. A targeted-check `PASS` confirms only the targeted scope.

Full `verify` remains required for Level 3, Level 4 architecture-current claims, final init completion, repair/adopt/rebuild completion, release-level freshness claims, and explicit user request.

## Finding Categories

- `[FACT DRIFT]`: code and implementation specs disagree.
- `[ARCHITECTURE VIOLATION: <subtype>]`: code violates architecture rules or drifts from selected architecture.
- `[DECISION DRIFT]`: ADR status, implementation status, or evidence disagrees with code.

## Architecture Violation Subtypes

Each architecture violation must include: subtype, severity, location, observed issue, expected architecture behavior, recommended action, evidence, and source documents checked.

- `MODULE BOUNDARY` -- Cross-module access bypasses public API, port, event, or contract.
- `LAYER` -- Dependency direction violates layer rules (e.g., domain depends on infrastructure).
- `CONTRACT` -- Public contract modified without updating related specs, tests, or ADRs.
- `INFRASTRUCTURE ACCESS` -- Application or domain code accesses DB, SDK, cache, or queue client directly.
- `SHARED CODE ABUSE` -- Business logic placed in shared/utils/common, or shared code used to bypass owner module.
- `STATE OWNERSHIP` -- State modified outside owner module, state machine, use case, or legal transition.
- `ERROR BOUNDARY` -- Production path bypasses the unified error model or lacks diagnosable error.
- `OBSERVABILITY` -- Critical path missing logs, trace id, metrics, error code, or diagnostic context.
- `OWNERSHIP AMBIGUITY` -- New file, logic, or behavior has no clear owner module.
- `ARCHITECTURE DRIFT` -- Code gradually deviates from selected architecture without a single hard violation (e.g., shared/utils accumulates business helpers, module boundaries blur). Usually reported as warning.
- `SECURITY BOUNDARY` -- Auth, authorization, audit, or security context boundary bypassed.
- `RESILIENCE` -- Missing required timeout, retry, circuit-breaker, backoff, or degradation boundary.
- `PERFORMANCE BOUNDARY` -- Missing required caching, throttling, or performance boundary.
- `AUTOMATED ARCHITECTURE TEST REQUIRED` -- Architecture tests missing but required by selected addons or adoption mode.

## Architecture Violation Output Format

```text
FAIL

[ARCHITECTURE VIOLATION: MODULE BOUNDARY][error]
- src/features/billing/usecase.ts imports src/features/auth/internal/session.ts directly.
  Expected: access auth through auth/public-api or AuthSessionPort.
  Recommended action: introduce or consume the declared public contract.
  Source documents checked: placement-rules.md, current-architecture.md

[ARCHITECTURE VIOLATION: LAYER][error]
- src/domain/order/order.ts imports src/infrastructure/db/client.ts.
  Expected: domain must not depend on infrastructure.
  Recommended action: introduce a port or repository interface in the domain layer.

[ARCHITECTURE VIOLATION: OBSERVABILITY][warning]
- payment capture path has no trace id or structured error code.
  Expected: critical paths require diagnostic context (trace id, error code, structured logs).
  Recommended action: add diagnostic context at application boundary.

[ARCHITECTURE VIOLATION: ARCHITECTURE DRIFT][warning]
- shared/utils now contains multiple billing-specific helpers.
  Expected: shared code contains only stable cross-module primitives; business logic stays in owner modules.
  Recommended action: move behavior back behind the owning module boundary or define a public contract.
```

When a rule cannot be confirmed from available evidence, use `[NEEDS CLARIFICATION: ...]` with `manual review required` rather than claiming a definitive violation.

## Addon Severity Mapping

| Addon | Enabled Checks | Default Severity |
|---|---|---|
| Strong Module Boundaries | `MODULE BOUNDARY`, `OWNERSHIP AMBIGUITY` | New code: `error`; legacy descriptive code: `warning` |
| Dependency Inversion | `LAYER`, `INFRASTRUCTURE ACCESS` | `error` when strict or rebuild target applies |
| State Machine / Illegal State Prevention | `STATE OWNERSHIP` | `error` for invalid transitions; `warning` for incomplete evidence |
| Typed Error / Error Code Model | `ERROR BOUNDARY` | `warning` by default; `error` for critical paths |
| Observability by Default | `OBSERVABILITY` | `warning` by default; `error` for critical paths |
| Event-driven Integration | `CONTRACT`, `STATE OWNERSHIP`, `OBSERVABILITY` | `error` for broken contracts; `warning` for missing diagnostics |
| Security Boundary | `SECURITY BOUNDARY`, `CONTRACT` | `error` for auth/audit bypasses |
| Performance and Resilience | `RESILIENCE`, `PERFORMANCE BOUNDARY` | `warning` by default; `error` for required resilience boundaries |
| Architecture Tests | `AUTOMATED ARCHITECTURE TEST REQUIRED` | `warning` when missing; `error` in strict/rebuild mode |

## Profile Check Selection

Apply the check set matching the project's init profile. Profile classification follows `references/modes.md` init Classification rules.

If the profile is not recorded, infer the check set from current evidence:

- no implementation-relevant files: Empty-project Checks;
- implementation files exist, minimal workspace exists, and no grounded child specs are needed: Minimal Existing Project Checks;
- grounded child specs or multiple implementation areas exist: Standard Existing Project Checks;
- `Init Status: PARTIAL INIT` is recorded: Large Project / Phased Init Checks.

When evidence is ambiguous, report the ambiguity instead of silently choosing a heavier or lighter check set.

## Empty-project Checks

- Protocol block exists exactly once.
- Minimal README, constitution, and project overview exist.
- `inventory.md` is absent or directs baseline absorption.
- Project overview states no implementation-relevant files exist.
- Constitution contains durable principles only.
- Current inspection confirms no implementation-relevant files exist.
- Architecture constraints, if present, are confirmed constraints and not fake implementation facts.
- Generated docs contain no `{{template_variables}}`, `TODO`, `TBD`, or planned behavior.
- `[NEEDS CLARIFICATION: ...]` entries are specific.

If implementation-relevant files exist while specs are still in empty-project baseline mode, output FAIL with:

```text
NOTICE: project has implementation code but specs are still in empty-project baseline mode.
Recommended action: run spec-docs update to absorb baseline and generate implementation specs.
```

## Minimal Existing Project Checks

Minimal Existing Project checks are normal `verify` mode checks scoped to the Minimal Existing Project profile; they are not a new mode.

- Protocol block exists exactly once.
- Minimal README, constitution, inventory, and project overview exist.
- Current inspection confirms implementation-relevant files exist.
- `inventory.md` includes real included/excluded globs, Spec List, Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index appropriate to the minimal profile.
- `inventory.md` maps all included implementation-relevant files, even if all mappings point to `specs/project-overview.spec.md`.
- `specs/project-overview.spec.md` records current implementation facts and maps to actual source files.
- Every `.spec.md` has required frontmatter.
- Architecture docs, ADRs, rebuild docs, and empty child spec directories are absent unless grounded by code evidence or user confirmation.
- Any child spec that exists has source-backed rationale.
- Generated docs contain no `{{template_variables}}`, `TODO`, `TBD`, or planned behavior.
- `[NEEDS CLARIFICATION: ...]` entries are specific.
- Missing architecture docs are PASS when no architecture evidence or user-confirmed architecture constraints exist.

## Standard Existing Project Checks

- Protocol block exists exactly once in target instruction files.
- Core files exist.
- Core files contain required structures: README has reading order and maintenance workflow; constitution has source priority, coverage principle, conflict handling, and quality standard; inventory has Coverage Scope, Spec List, Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index.
- Every `.spec.md` has required frontmatter.
- Source paths/globs and related specs resolve.
- `inventory.md` includes every spec.
- Code-to-Spec Index covers included implementation-relevant files.
- Symbol-to-Spec Index covers key entrypoints, public APIs, exported symbols, schemas, jobs, commands, and cross-module functions.
- README, constitution, inventory, specs, architecture docs, and ADRs do not contradict each other.
- Generated docs contain no `{{template_variables}}`, `TODO`, `TBD`, or planned behavior.
- `[NEEDS CLARIFICATION: ...]` entries are specific.
- Current architecture rules are checked when architecture docs exist.
- Target architecture rules are checked when rebuild status is active.
- Paused rebuild reports target gaps as warning/info unless the changed area touches migration scope.
- Normal verify must not read `docs/spec-docs/rebuild/archive/`.

## Large Project / Phased Init Checks

- Protocol block exists exactly once.
- Phase-1 artifacts exist: README, constitution, inventory draft or coverage scope, and project overview.
- `PARTIAL INIT` is clearly recorded in `inventory.md` Coverage Scope as `Init Status: PARTIAL INIT`, or in `README.md` if inventory is not created yet.
- Output does not claim final init completion.
- Output does not claim full included-scope Code-to-Spec coverage.
- Next batch is recorded explicitly.
- Deferred or low-confidence areas are explicit and concrete.
- Generated docs contain no `{{template_variables}}`, `TODO`, `TBD`, or planned behavior.
- Final init completion remains blocked until full included-scope coverage is verified.

## Verification Commands

Use repo-appropriate checks. Common commands:

```bash
rg --files docs/spec-docs
rg "\{\{[^}]+\}\}|\b(TB[D]|TO[D]O)\b" docs/spec-docs
rg "^---$|^type: implementation-spec|^spec_kind:|^verified_commit:|^## Implementation Map|^## Update Rules" docs/spec-docs
git diff --check -- docs/spec-docs AGENTS.md CLAUDE.md
```

Also verify globs and coverage by inspecting the project; do not rely only on text search.
