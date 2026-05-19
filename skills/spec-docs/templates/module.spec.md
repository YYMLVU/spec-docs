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

## State and Side Effects

{{state_mutation_io_network_storage_or_process_effects}}

## Boundaries and Non-Goals

{{responsibilities_this_module_does_not_own}}

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
