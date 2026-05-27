# S28 Rule Ownership Trigger Dedup Fixture

This fixture represents a project that has already completed Phase 1-4 behavior and now needs Phase 5 ownership hygiene.

Observed duplicate trigger risks:

1. A workspace README says every completed code change must run full `spec-docs verify`.
2. A protocol block says every non-trivial implementation change runs `spec-docs update` and then `spec-docs verify`.
3. A hook reference says shell commands should remind `update/verify` around tests/builds when code changed.

Expected Phase 5 behavior:

- Identify canonical owners for impact levels, verification scopes, hook blocks, protocol installation, and source priority.
- Replace unconditional update/verify language with impact-aware completion language.
- Preserve full verify gates for final init, Level 3 broad currentness/release freshness, Level 4 architecture-current claims, and repair/adopt/rebuild completion.
- Preserve compact self-contained installed protocol text.
