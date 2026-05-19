---
type: implementation-spec
spec_kind: integration
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

# {{Integration Name}} Spec

## Purpose

{{external_system_or_integration_responsibility}}

## Technology Stack

{{client_libraries_protocols_auth_methods_or_platforms}}

## External System Contract

{{current_external_api_service_protocol_hardware_or_provider_contract}}

## Authentication / Credentials

{{current_authentication_credentials_or_secret_usage_without_exposing_secret_values}}

## Current Behavior

{{current_integration_behavior}}

## Inputs

{{requests_events_files_credentials_or_internal_calls_sent_to_integration}}

## Outputs

{{responses_events_side_effects_records_or_external_changes}}

## Implementation Map

| Concern | Code Reference | Symbol | Notes |
|---|---|---|---|
| {{integration_concern}} | `{{path}}` | `{{symbol}}` | {{implementation_note}} |

## Key Functions / Symbols

{{key_entrypoints_public_symbols_shared_functions_routes_commands_schemas_or_jobs}}

## Call Flow

{{current_integration_call_sequence}}

## Data Flow

{{data_mapping_between_project_and_external_system}}

## Failure Handling

{{implemented_retries_timeouts_fallbacks_or_error_paths}}

## Side Effects

{{external_state_changes_notifications_charges_messages_or_device_actions}}

## Boundaries and Non-Goals

{{what_this_integration_does_not_own}}

## Change Boundaries

{{safe_change_locations_and_external_contract_sensitive_areas}}

## Test Points

{{mock_contract_integration_or_manual_checks_currently_available}}

## Code References

{{real_code_paths_only}}

## Related Specs

{{related_specs}}

## Update Rules

{{which_external_contract_client_mapping_or_failure_handling_changes_require_this_spec_to_be_updated}}
