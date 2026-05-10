---
type: implementation-spec
spec_kind: interface
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
  - docs/specs/{{related_spec}}.spec.md
---

# {{Interface Name}} Spec

## Purpose

{{interface_responsibility_in_current_system}}

## Technology Stack

{{protocol_framework_runtime_or_serialization_stack}}

## Interface Contract

{{current_api_cli_sdk_protocol_webhook_file_format_or_endpoint_contract}}

## Request / Input Shape

{{current_request_arguments_message_schema_file_format_or_payload_shape}}

## Response / Output Shape

{{current_response_output_message_file_or_return_shape}}

## Error Contract

{{implemented_error_codes_messages_exit_codes_or_failure_payloads}}

## Compatibility Rules

{{current_backward_compatibility_versioning_or_format_constraints}}

## Implementation Map

| Concern | Code Reference | Symbol | Notes |
|---|---|---|---|
| {{interface_concern}} | `{{path}}` | `{{symbol}}` | {{implementation_note}} |

## Key Functions / Symbols

{{key_entrypoints_public_symbols_shared_functions_routes_commands_schemas_or_jobs}}

## Call Flow

{{handler_command_or_protocol_execution_sequence}}

## Data Flow

{{how_interface_data_is_parsed_validated_transformed_and_returned}}

## State and Side Effects

{{state_persistence_network_calls_external_effects_or_output_files}}

## Boundaries and Non-Goals

{{what_this_interface_does_not_own}}

## Error and Edge Cases

{{implemented_edge_cases_auth_permission_validation_or_format_paths}}

## Change Boundaries

{{safe_change_locations_and_compatibility_sensitive_areas}}

## Precision Notes

{{maintenance_notes_for_precise_interface_changes}}

## Test Points

{{contract_unit_integration_or_manual_tests}}

## Code References

{{real_code_paths_only}}

## Related Specs

{{related_specs}}

## Update Rules

{{which_contract_or_handler_changes_require_this_spec_to_be_updated}}
