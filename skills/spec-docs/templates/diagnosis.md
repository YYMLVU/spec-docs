## Architecture Diagnosis

`diagnose` is architecture-guided triage, not an automatic debugger, verify replacement, or direct repair mode. It narrows the investigation scope to likely ownership, likely failure boundary, and a structured debugging order grounded in architecture rules and available evidence. It must not claim root cause without evidence.

### Symptom

[Describe the reported symptom here. Use `[NEEDS CLARIFICATION: ...]` when the symptom description is incomplete or ambiguous.]

### Likely Ownership

[Identify the likely owning module, component, or layer. Use `[NEEDS CLARIFICATION: ...]` when ownership cannot be determined from available architecture docs, code, or operational knowledge.]

### Likely Failure Boundary

[Identify the likely layer or boundary where the failure occurs (e.g., domain logic, adapter, integration, state transition, public contract, infrastructure). Use `[NEEDS CLARIFICATION: ...]` when the failure layer is unclear.]

### First Specs / Files to Inspect

[List the most relevant specs and source files to start the investigation. Prioritize specs with known ownership and boundary documentation.]

### Logs / Metrics / Error Signals to Check

[List specific logs, metrics, error codes, traces, or diagnostic signals to review. Use `[NEEDS CLARIFICATION: ...]` when expected signals are unknown or the project lacks the required observability.]

### Do Not Start Here

[List files, modules, or areas that may seem relevant but should not be investigated first. Do not start with shared/utils, unrelated modules, or generic helpers before tracing the architecture path.]

### Suggested Debugging Order

1. Verify boundary input/output -- confirm inputs to and outputs from the likely failure boundary first.
1. Owner module / application use case -- trace the use case flow within the likely owner module.
1. Domain rule / state transition -- check domain invariants, business rules, and state transitions within the owner boundary.
1. Adapter / external dependency -- inspect adapters, external service calls, and side effects.
1. Cross-module contract -- validate public contracts, events, ports, and dependency direction between modules.
1. Only after confirming the above: consider implementation changes in the confirmed failing area. Do not jump to modifying unrelated modules, shared/utils, or cross-module concerns before the architecture path is confirmed.

### Possible Fix Areas

[List likely areas to investigate for a fix. These are investigation starting points, not a task plan or backlog. Do not claim these as confirmed root causes.]

- [Likely investigation area]
- [Another likely investigation area]

### Evidence Limits

[List what could not be confirmed from available specs, architecture docs, code, tests, logs, or operational knowledge. Use specific `[NEEDS CLARIFICATION: ...]` markers rather than guessing.]