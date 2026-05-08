# Implementation Specs

## Purpose

This directory is the implementation-first spec knowledge base for the current project. It describes current code behavior, interfaces, data flow, runtime behavior, module constraints, and maintenance boundaries for AI-assisted work.

It is not a roadmap, planning system, or task list.

## Default Reading Order

1. `docs/specs/README.md`
2. `docs/specs/constitution.md`
3. `docs/specs/inventory.md`
4. `docs/specs/project-overview.spec.md`
5. Specs matched by the Code-to-Spec Index, Task-to-Spec Map, and Symbol-to-Spec Index.

## Before Changing Code

1. Identify changed or target files.
2. Read `inventory.md`.
3. Match files against the Code-to-Spec Index.
4. Match task wording against the Task-to-Spec Map.
5. Match important functions, routes, commands, schemas, or jobs against the Symbol-to-Spec Index.
6. Read all matched specs before editing implementation-relevant files.

## After Changing Code

1. Update every affected spec.
2. Update `inventory.md` if mappings, source globs, symbols, or spec metadata changed.
3. Update `verified_commit` and `verified_date` in affected specs after verification.
4. If no spec update is needed, state why.
5. Run the spec consistency checks before claiming completion.

## Consistency Checks

Verify that:

- All specs referenced in `inventory.md` exist.
- All source paths and globs point to real implementation-relevant files.
- Included globs are covered by the Code-to-Spec Index.
- Key symbols and entrypoints appear in the Symbol-to-Spec Index.
- Specs contain no `{{template_variables}}`, `TODO`, `TBD`, or planned behavior.
- `[NEEDS CLARIFICATION: ...]` entries are specific and source-based.

## Source of Truth

When sources conflict, use this priority:

1. Code, contracts, and configs.
2. Tests.
3. Existing docs.
4. Commit history.
5. Existing specs.

If behavior cannot be confirmed, mark it with `[NEEDS CLARIFICATION: <specific question>]` instead of guessing.
