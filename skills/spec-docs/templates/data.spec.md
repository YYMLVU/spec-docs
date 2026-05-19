---
type: implementation-spec
spec_kind: data
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

# {{Data Area}} Spec

## Purpose

{{data_area_responsibility}}

## Technology Stack

{{database_storage_schema_queue_cache_or_data_tooling}}

## Schema / Storage Model

{{current_schema_tables_documents_files_events_or_storage_layout}}

## Read / Write Paths

{{current_reads_writes_queries_mutations_or_file_operations}}

## Current Behavior

{{current_data_behavior}}

## Inputs

{{data_sources_inputs_events_or_payloads}}

## Outputs

{{stored_records_events_files_cache_entries_or_query_results}}

## Implementation Map

| Concern | Code Reference | Symbol | Notes |
|---|---|---|---|
| {{data_concern}} | `{{path}}` | `{{symbol}}` | {{implementation_note}} |

## Key Functions / Symbols

{{key_entrypoints_public_symbols_shared_functions_routes_commands_schemas_or_jobs}}

## Data Flow

{{how_data_enters_transforms_persists_and_exits}}

## Consistency Rules

{{current_validation_uniqueness_transaction_ordering_or_integrity_rules}}

## Migration Notes

{{implemented_migrations_or_schema_evolution_mechanisms}}

## State and Side Effects

{{persistence_cache_queue_or_external_data_side_effects}}

## Error and Edge Cases

{{implemented_missing_duplicate_invalid_stale_or_conflict_paths}}

## Change Boundaries

{{safe_change_locations_and_schema_or_data_contract_sensitive_areas}}

## Test Points

{{tests_or_checks_that_cover_data_behavior}}

## Code References

{{real_code_paths_only}}

## Related Specs

{{related_specs}}

## Update Rules

{{which_schema_storage_query_or_data_flow_changes_require_this_spec_to_be_updated}}
