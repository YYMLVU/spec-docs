---
type: implementation-spec
spec_kind: runtime
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

# {{Runtime Area}} Spec

## Purpose

{{runtime_area_responsibility}}

## Technology Stack

{{runtime_frameworks_process_tools_containers_or_platforms}}

## Startup Flow

{{current_bootstrap_sequence}}

## Configuration Surface

{{environment_variables_config_files_flags_or_runtime_options}}

## Runtime Dependencies

{{services_files_ports_credentials_processes_or_platform_dependencies}}

## Current Behavior

{{current_runtime_behavior}}

## Inputs

{{configs_env_vars_commands_schedules_or_runtime_events}}

## Outputs

{{processes_logs_ports_files_jobs_or_side_effects}}

## Implementation Map

| Concern | Code Reference | Symbol | Notes |
|---|---|---|---|
| {{runtime_concern}} | `{{path}}` | `{{symbol}}` | {{implementation_note}} |

## Key Functions / Symbols

{{key_entrypoints_public_symbols_shared_functions_routes_commands_schemas_or_jobs}}

## Call Flow

{{startup_shutdown_job_or_request_lifecycle_flow}}

## Data Flow

{{runtime_data_or_config_flow}}

## Operational Constraints

{{deployment_resource_observability_or_environment_assumptions}}

## Error and Edge Cases

{{implemented_startup_config_dependency_or_shutdown_failures}}

## Change Boundaries

{{safe_change_locations_and_runtime_sensitive_areas}}

## Test Points

{{runtime_build_integration_or_manual_checks}}

## Code References

{{real_code_paths_only}}

## Related Specs

{{related_specs}}

## Update Rules

{{which_runtime_or_config_changes_require_this_spec_to_be_updated}}
