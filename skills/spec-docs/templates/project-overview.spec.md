---
type: implementation-spec
spec_kind: overview
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

# Project Overview Spec

> For an empty-project baseline, keep this file minimal: state that no implementation exists, record confirmed purpose and technology choices, link to `constitution.md`, and omit implementation sections until code exists.

## Purpose

{{current_project_purpose}}

## Technology Stack

{{languages_frameworks_runtimes_libraries_and_tools_used_by_current_code}}

## Project State

{{current_state_of_existing_implementation}}

## Confirmed Project Principles

{{user_confirmed_coding_testing_dependency_error_security_directory_and_boundary_principles_or_not_applicable_for_existing_implementation}}

## Runtime Units and Entrypoints

{{current_processes_apps_commands_jobs_routes_or_packages}}

## Current Architecture

{{high_level_current_architecture_without_future_plans}}

If `docs/spec-docs/architecture/current-architecture.md` exists, summarize its Architecture Selection here:

- Primary Preset: {{primary_preset_or_needs_clarification}}
- Addons: {{addons_or_none_confirmed}}
- Adoption Mode: {{adoption_mode_or_needs_clarification}}
- Architecture Source: `docs/spec-docs/architecture/current-architecture.md`

Do not duplicate detailed architecture rules in this overview. Detailed boundary rules belong in `docs/spec-docs/architecture/current-architecture.md` and `docs/spec-docs/architecture/placement-rules.md`.

## Implementation Map

| Concern | Code Reference | Symbol | Notes |
|---|---|---|---|
| {{concern}} | `{{path}}` | `{{symbol}}` | {{implementation_note}} |

## Key Functions / Symbols

{{key_entrypoints_public_symbols_shared_functions_routes_commands_schemas_or_jobs}}

## Call Flow

{{main_current_execution_flows}}

## Data Flow

{{main_current_data_inputs_transformations_storage_and_outputs}}

## External Surfaces

{{current_user_machine_operator_or_protocol_facing_surfaces}}

## Internal Surfaces

{{current_modules_services_pipelines_handlers_or_package_boundaries}}

## Quality and Test Surface

{{current_tests_observability_security_performance_or_reliability_constraints}}

## Change Boundaries

{{where_future_maintenance_should_and_should_not_make_changes_for_common_tasks}}

## Related Specs

{{links_to_detailed_specs}}

## Update Rules

Update this overview when project entrypoints, tech stack, runtime units, top-level architecture, or cross-cutting constraints change.
