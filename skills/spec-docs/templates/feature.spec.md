---
type: implementation-spec
spec_kind: feature
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

# {{Feature Name}} Spec

## Purpose

{{what_current_feature_is_responsible_for}}

## Technology Stack

{{technologies_used_by_this_feature}}

## Current Behavior

{{current_implemented_behavior}}

## User / System Flow

{{how_users_systems_or_operators_trigger_and_complete_this_feature}}

## Inputs

{{accepted_inputs_requests_events_commands_files_or_states}}

## Outputs

{{responses_side_effects_files_events_state_changes_or_ui_results}}

## Implementation Map

| Concern | Code Reference | Symbol | Notes |
|---|---|---|---|
| {{feature_concern}} | `{{path}}` | `{{symbol}}` | {{implementation_note}} |

## Key Functions / Symbols

{{key_entrypoints_public_symbols_shared_functions_routes_commands_schemas_or_jobs}}

## Call Flow

{{current_call_chain_or_execution_sequence}}

## Data Flow

{{how_data_enters_transforms_persists_and_exits}}

## State and Side Effects

{{state_changes_persistence_network_calls_events_or_external_effects}}

## Business / Domain Rules

{{rules_enforced_by_current_implementation}}

## Algorithm / Strategy

{{current_algorithm_strategy_or_processing_rules_if_present}}

## Feature Invariants

{{conditions_that_current_implementation_preserves}}

## Boundaries and Non-Goals

{{what_this_feature_does_not_own_or_modify}}

## Error and Edge Cases

{{implemented_errors_empty_states_permission_paths_or_compatibility_paths}}

## Change Boundaries

{{safe_change_locations_and_adjacent_areas_not_to_touch}}

## Precision Notes

{{specific_guidance_for_maintainers_to_avoid_unnecessary_coupling_or_broad_edits}}

## Test Points

{{tests_or_manual_checks_that_prove_current_behavior}}

## Code References

{{real_code_paths_only}}

## Related Specs

{{related_specs}}

## Update Rules

{{which_code_changes_require_this_spec_to_be_updated}}
