---
type: implementation-spec
spec_kind: decision
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

# {{Decision Name}} Spec

## Purpose

{{why_this_implemented_decision_matters_to_maintenance}}

## Decision

{{decision_currently_embodied_by_the_code}}

## Evidence in Current Code

{{code_configs_tests_or_history_showing_this_decision_is_real}}

## Technology Stack

{{technologies_involved_in_this_decision}}

## Current Behavior

{{behavior_resulting_from_this_decision}}

## Implementation Map

| Concern | Code Reference | Symbol | Notes |
|---|---|---|---|
| {{decision_concern}} | `{{path}}` | `{{symbol}}` | {{implementation_note}} |

## Key Functions / Symbols

{{key_entrypoints_public_symbols_shared_functions_routes_commands_schemas_or_jobs}}

## Call Flow

{{flows_constrained_by_this_decision}}

## Data Flow

{{data_paths_constrained_by_this_decision}}

## Consequences

{{current_tradeoffs_or_constraints_created_by_the_implemented_decision}}

## Constraints for Future Changes

{{what_future_changes_must_preserve_or_consider_due_to_current_code}}

## Boundaries and Non-Goals

{{what_this_decision_does_not_imply}}

## Change Boundaries

{{safe_change_locations_and_architecture_sensitive_areas}}

## Test Points

{{tests_or_checks_that_would_detect_breaking_this_decision}}

## Code References

{{real_code_paths_only}}

## Related Specs

{{related_specs}}

## Update Rules

{{which_code_changes_require_this_decision_spec_to_be_updated}}
