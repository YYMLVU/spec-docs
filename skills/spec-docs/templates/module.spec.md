---
type: implementation-spec
spec_kind: module
status: current
owned_by_code: true
verified_commit: {{git_sha}}
verified_date: {{verified_date}}
source_files:
  - {{source_glob}}
symbols:
  - {{symbol_or_entrypoint}}
tech_stack:
  - {{technology}}
related_specs:
  - docs/spec-docs/specs/{{related_spec}}.spec.md
---

# {{Module Name}} Spec

## Purpose

{{module_responsibility_in_current_code}}

## Technology Stack

{{technologies_used_by_this_module}}

## Public API

{{exported_functions_classes_methods_commands_or_package_boundaries}}

## Current Behavior

{{current_module_behavior}}

## Inputs

{{inputs_arguments_events_files_or_state_read_by_module}}

## Outputs

{{return_values_outputs_events_state_changes_or_side_effects}}

## Internal Algorithm / Strategy

{{current_algorithm_strategy_or_processing_model}}

## Implementation Map

| Concern | Code Reference | Symbol | Notes |
|---|---|---|---|
| {{module_concern}} | `{{path}}` | `{{symbol}}` | {{implementation_note}} |

## Key Functions / Symbols

{{key_entrypoints_public_symbols_shared_functions_routes_commands_schemas_or_jobs}}

## Call Flow

{{callers_callees_and_execution_order}}

## Data Flow

{{data_transforms_and_dependencies_inside_module}}

## Dependencies

{{internal_and_external_dependencies}}

## Boundary

<!-- Record current module facts only, grounded in code, tests, logs, existing docs, confirmed architecture, or user-confirmed operational knowledge. -->
<!-- Use [NEEDS CLARIFICATION: <specific question>] when information is unknown. Do not invent ownership claims or dependency rules. -->

### Owns

{{responsibilities_this_module_owns}}

### Does Not Own

{{responsibilities_this_module_does_not_own}}

### Public Contracts

{{public_contracts_exposed_by_this_module}}

### Internal Implementation

{{internal_implementation_details_not_part_of_public_contract}}

### Allowed Dependencies

{{modules_and_interfaces_this_module_may_depend_on}}

### Forbidden Dependencies

{{modules_and_interfaces_this_module_must_not_depend_on}}

## Failure Localization

<!-- Record current module facts only, grounded in code, tests, logs, existing docs, confirmed architecture, or user-confirmed operational knowledge. -->
<!-- Use [NEEDS CLARIFICATION: <specific question>] when information is unknown. Do not invent symptoms or debugging paths. -->

### Common Symptoms

{{observable_symptoms_that_point_to_this_module}}

### First Specs / Files to Inspect

{{specs_and_files_to_check_first_when_diagnosing}}

### Likely Fault Boundaries

- **API**: {{likeliest_api_fault_boundaries}} — [NEEDS CLARIFICATION: which API requests, endpoints, or versioned contracts are most suspect when this module fails?]
- **Application**: {{likeliest_application_fault_boundaries}} — [NEEDS CLARIFICATION: which application-layer orchestration, wiring, or use-case flows are most suspect?]
- **Domain**: {{likeliest_domain_fault_boundaries}} — [NEEDS CLARIFICATION: which domain invariants, aggregates, entities, or core business logic are most suspect?]
- **Adapter**: {{likeliest_adapter_fault_boundaries}} — [NEEDS CLARIFICATION: which adapter, repository, client, or message-handling code is most suspect?]
- **External dependency**: {{likeliest_external_fault_boundaries}} — [NEEDS CLARIFICATION: which external service, database, queue, or third-party dependency is most suspect?]

### Do Not Start By Modifying

{{files_and_modules_to_avoid_in_initial_triage}}

## State and Side Effects

{{state_mutation_io_network_storage_or_process_effects}}

## Error and Edge Cases

{{implemented_failure_paths_or_edge_conditions}}

## Change Boundaries

{{safe_change_locations_and_symbols_that_affect_other_specs}}

## Precision Notes

{{maintenance_notes_for_precise_edits}}

## Test Points

{{tests_that_cover_module_behavior}}

## Code References

{{real_code_paths_only}}

## Related Specs

{{related_specs}}

## Update Rules

{{which_code_changes_require_this_spec_to_be_updated}}

<!-- Refresh Boundary and Failure Localization when module ownership, public contracts, dependencies, state ownership, error handling, observability, or grounded debugging entrypoints change. -->
<!-- Do not invent change triggers, future plans, or responsibilities that are not grounded in current evidence. -->
<!-- Use [NEEDS CLARIFICATION: <specific question>] when an update trigger is suspected but unconfirmed. -->
