# Architecture Review

## Architecture Selection Context

- Primary Preset:
- Addons:
- Adoption Mode:
- Rebuild status (if applicable):

Severity levels in this review reflect Adoption Mode and enabled Addons. `strict` and active `rebuild` raise severity for changed or target-scope code; `descriptive` reports historical drift mostly as warning/info unless the change worsens the boundary. See `references/verification.md` for addon severity mapping.

## Result

PASS | PASS WITH WARNINGS | FAIL

- `PASS`: no error findings.
- `PASS WITH WARNINGS`: no error findings, but warning or info findings exist.
- `FAIL`: one or more error findings exist.

## [FACT DRIFT]

[List findings where code and implementation specs disagree.]

- Severity: error | warning | info
  Location: `<path>:<line>` or `<path>`
  Evidence:
  Expected:
  Actual:
  Recommended action:

## [ARCHITECTURE VIOLATION: <subtype>]

[List findings where code violates current or active target architecture rules. Use the applicable subtype from the list below.]

Subtypes: `MODULE BOUNDARY` | `LAYER` | `CONTRACT` | `INFRASTRUCTURE ACCESS` | `SHARED CODE ABUSE` | `STATE OWNERSHIP` | `ERROR BOUNDARY` | `OBSERVABILITY` | `OWNERSHIP AMBIGUITY` | `ARCHITECTURE DRIFT` | `SECURITY BOUNDARY` | `RESILIENCE` | `PERFORMANCE BOUNDARY` | `AUTOMATED ARCHITECTURE TEST REQUIRED`

- Subtype:
  Severity: error | warning | info
  Location: `<path>:<line>` or `<path>`
  Observed issue:
  Expected architecture behavior:
  Recommended action:
  Evidence:
  Source documents checked: [list architecture docs, placement rules, ADRs, or module specs that define the violated rule]

## [DECISION DRIFT]

[List findings where ADR status, implementation status, or implementation evidence disagrees with code.]

- Severity: error | warning | info
  Location: `<path>:<line>` or `<path>`
  Evidence:
  Expected:
  Actual:
  Recommended action:

## Detectability Note

Architecture violations reported here are based on detectable patterns in code, specs, and architecture docs. Not all architecture constraints can be automatically verified. When a rule cannot be confirmed from available evidence, the finding uses `[NEEDS CLARIFICATION: ...]` with `manual review required` rather than claiming a definitive violation.

## Recommended Actions

[Summary of actions needed to resolve error findings, or confirmation that no action is needed for PASS. Group by subtype when multiple architecture violations exist.]
