# spec-docs Completeness Test Runbook

This directory is a local-only test workspace for the `spec-docs` skill. It is intentionally isolated from the repository source and is not intended for remote submission.

## Boundaries

- Do not use `/home/xiao/spec-docs` as the business project under test.
- Keep all generated fixtures, prompts, outputs, and reviews under this directory.
- Do not clone real GitHub projects until candidates are approved by the user.
- Do not run third-party install, build, or test commands unless explicitly approved.
- Hook tests are static/script/simulation checks, not real Claude Code runtime hook checks.
- Report skill failures first; do not repair the skill without user confirmation.

## Automated Checks

Run from repository root:

```bash
node test-runs/spec-docs-completeness/scripts/check-static.mjs
node test-runs/spec-docs-completeness/scripts/check-install.mjs
node test-runs/spec-docs-completeness/scripts/check-hooks.mjs
node test-runs/spec-docs-completeness/scripts/simulate-hook-events.mjs
node test-runs/spec-docs-completeness/scripts/collect-results.mjs
```

## Scenario Flow

1. Read `coverage/scenario-matrix.md`.
2. For each `prompts/scenarios/sXX.md`, run the scenario in its fixture directory or selected real project.
3. Save AI output to `results/scenario-outputs/sXX.md`.
4. Fill scenario checklist in the same output file.
5. Run grouped subagent reviews using `prompts/review/*.md`.
6. Save review outputs to `results/reviews/`.
7. Update `results/final-report.md`.
