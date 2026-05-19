# Spec Inventory

## Purpose

Inventory indexes implementation facts. It may link to relevant architecture and ADR entrypoints, but it must not define architecture rules or decision content.

It answers:

- Which specs exist?
- Which code paths does each spec describe?
- Which spec should be read or updated when a file changes?
- Which task keywords map to which spec types?
- Which key symbols or entrypoints map to which specs?

It does not track planned specs, missing specs, roadmap items, or subjective coverage gaps.

## Coverage Scope

### Included Globs

| Glob | Reason |
|---|---|
| `{{included_glob}}` | {{why_this_path_is_implementation_relevant}} |

### Excluded Globs

| Glob | Reason |
|---|---|
| `{{excluded_glob}}` | {{why_this_path_is_not_spec_relevant}} |

## Spec List

| Spec | Kind | Source Files / Globs | Verified Commit | Verified Date |
|---|---|---|---|---|
| `docs/spec-docs/specs/{{spec_path}}.spec.md` | {{spec_kind}} | `{{source_glob}}` | {{git_sha}} | {{verified_date}} |

## Code-to-Spec Index

| Code Path / Glob | Specs To Read | Specs To Update When Changed |
|---|---|---|
| `{{code_glob}}` | `docs/spec-docs/specs/{{spec_path}}.spec.md` | `docs/spec-docs/specs/{{spec_path}}.spec.md` |

## Task-to-Spec Map

| Task Keywords | Read First | Then Read |
|---|---|---|
| {{task_keywords}} | `{{primary_spec_kind_or_path}}` | `{{secondary_spec_kind_or_path}}` |

## Symbol-to-Spec Index

| Symbol / Entry Point | Kind | Spec | Role |
|---|---|---|---|
| `{{symbol_or_entrypoint}}` | {{symbol_kind}} | `docs/spec-docs/specs/{{spec_path}}.spec.md` | {{role_in_current_implementation}} |
