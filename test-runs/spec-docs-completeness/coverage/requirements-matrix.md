# Requirements Matrix -- spec-docs Completeness Test

This matrix maps the requirement categories from the completeness test plan to verification methods:
automated checks (check-static, check-install), scenario execution (S01-S28), and manual review prompts.

## COMPRESS: Structural Completeness

Requirements related to file counts, directory shape, and artifact packing.

| ID | Requirement | check-static | check-install | Scenario | Review Prompt |
|---|---|---|---|---|---|
| C1 | SKILL.md plus all references/ and templates/ are present in source snapshot | Yes | -- | -- | -- |
| C2 | Install snapshot matches source reference snapshot (correct subtree, no extras) | -- | Yes | -- | -- |
| C3 | Every template listed in Template Map exists as a file | Yes | Yes | -- | -- |
| C4 | Every reference file listed in Reference Map exists | Yes | Yes | -- | -- |
| C5 | Mode Router maps all eight documented modes to correct references | Yes | -- | -- | mode-review.md |
| C6 | Core Hard Gates and Architecture Gate Summary are present and non-negotiable | Yes | -- | -- | architecture-review.md |
| C7 | Agent protocol block template is valid with correct markers | Yes | -- | -- | collaboration-review.md |

## IMPROVE: Content Quality and Consistency

Requirements focused on correctness, absence of placeholders, and internal consistency.

| ID | Requirement | check-static | check-install | Scenario | Review Prompt |
|---|---|---|---|---|---|
| I1 | No `{{template_variables}}`, `TODO`, `TBD`, or leftover placeholders in generated docs | -- | -- | S1, S2, S4, S6, S7, S8 | mode-review.md |
| I2 | Frontmatter schema is consistent across all spec templates | Yes | -- | S1, S2 | mode-review.md |
| I3 | Implementation facts recorded as-is; code outranks docs (source priority respected) | -- | -- | S4, S5, S6 | architecture-review.md |
| I4 | Hard gates are referenced but not duplicated; canonical homes indexed in hard-gates.md | Yes | -- | -- | mode-review.md |
| I5 | Empty-project init produces only principle seed; no fake implementation facts | -- | -- | S1 | mode-review.md |
| I6 | Standard existing project init covers all included-scope files in Code-to-Spec Index | -- | -- | S13 | mode-review.md |
| I6a | Minimal existing project init creates only minimal docs and avoids architecture/ADR/rebuild/empty category directories by default | -- | -- | S2 | mode-review.md |
| I6b | Standard existing project init creates grounded child specs only for observed implementation areas | -- | -- | S13 | mode-review.md |
| I6c | Large phased init records PARTIAL INIT and does not claim final included-scope coverage | -- | -- | S14 | mode-review.md |
| I6d | Init profile classification uses observable complexity signals beyond file count | -- | -- | S15 | mode-review.md |
| I7 | Impact-aware update preserves architecture rules; architecture weakening requires ADR/confirmation and Level 4 escalation | -- | -- | S4, S20 | architecture-review.md |
| I8 | Verify reports all detectable violation subtypes when architecture docs exist | -- | -- | S5, S11 | architecture-review.md |
| I9 | Repair does not modify business code without explicit request | -- | -- | S6 | mode-review.md |
| I10 | Rebuild status is the single source of truth for rebuild mode (not target file existence) | -- | -- | S7 | architecture-review.md |
| I11 | Diagnose follows architecture boundaries and does not claim root cause without evidence | -- | -- | S9 | architecture-review.md |
| I12 | Known-workflow detection order is explicit and preserved (Superpowers, OpenSpec, Spec-Kit, then ask) | -- | -- | S10 | collaboration-review.md |
| I13 | Standalone Mode stays lightweight; does not become roadmap or backlog system | -- | -- | S10 | collaboration-review.md |
| I14 | Level 0 changes require no spec update and no verify claim when no behavior, contract, architecture, verification, or mapping signal changed | -- | -- | S16 | mode-review.md |
| I15 | Level 1 changes update only one mapped spec and do not run full verify | -- | -- | S17 | mode-review.md |
| I16 | Level 2 changes update only affected specs/inventory rows and use targeted light check without claiming full verify PASS | -- | -- | S4, S18 | mode-review.md |
| I17 | Level 3 broad updates run full verify before broad currentness or release freshness is claimed | -- | -- | S19 | mode-review.md |
| I18 | Level 4 architecture-risk changes escalate and do not ordinary-update architecture rules or accepted ADRs | -- | -- | S20 | architecture-review.md |
| I19 | Higher-level signals override lower-level labels, including public contract, inventory mapping, layout, and architecture-risk signals | -- | -- | S18, S20 | mode-review.md |
| I20 | Hooks and hard gates are impact-aware and do not require full verify for Level 0 through Level 2 | -- | -- | S10, S16, S17, S18 | hook-review.md |
| I21 | Mid-update discovery of architecture risk reclassifies a localized update to Level 4 | -- | -- | S20 | architecture-review.md |
| I22 | Full verify output identifies active verification layers and groups findings by layer | -- | -- | S5 | mode-review.md |
| I23 | Targeted and layered checks are not described as full verify PASS | -- | -- | S18, S21, S22 | mode-review.md |
| I24 | Layered mechanical/mapping checks cannot claim semantic, architecture, release, workspace, or architecture currentness | -- | -- | S21 | mode-review.md |
| I25 | Final init, repair/adopt/rebuild completion, release freshness, and architecture-current claims retain full verify gates | -- | -- | S5, S19, S20 | architecture-review.md |
| I26 | Scoped verification reports and escalates out-of-scope architecture risk instead of silently broadening or ignoring it | -- | -- | S22 | architecture-review.md |
| I27 | Level 4 architecture risk routes to the lightest safe architecture receiving path instead of automatically using broad workflow | -- | -- | S20, S23, S24, S25, S26, S27 | architecture-review.md |
| I28 | Scoped architecture subpaths cannot claim architecture currentness and preserve full verify gates for repair/adopt/rebuild completion | -- | -- | S23, S24, S25, S27 | architecture-review.md |
| I29 | ADR-adjacent or multi-area scoped architecture work escalates to full review, user decision, or ADR handling | -- | -- | S25, S27 | architecture-review.md |
| I30 | Rebuild remains exceptional and is recommended when current architecture references are too stale or contradictory for incremental repair | -- | -- | S26 | architecture-review.md |
| I31 | Existing mode names remain unchanged; scoped/full are internal subpaths only | Yes | -- | S23, S24, S25, S26, S27 | mode-review.md |
| I32 | Major rule families have a named canonical owner in the rule ownership inventory | Yes | -- | S28 | mode-review.md, hook-review.md |
| I33 | Operational summaries and templates do not reintroduce unconditional update/verify triggers that contradict Level 0-2 routing | Yes | -- | S16, S17, S18, S28 | mode-review.md |
| I34 | Hook policy remains impact-aware and does not block full-verify skips for Level 0 through Level 2 when their required action is complete | Yes | -- | S10, S16, S17, S18, S28 | hook-review.md |
| I35 | Installed protocol text remains compact and self-contained while preserving impact-aware completion behavior | Yes | Yes | S10, S28 | collaboration-review.md, hook-review.md |
| I36 | Strict full-verify gates remain for final init, Level 3 broad currentness/release freshness, Level 4 architecture-current claims, and repair/adopt/rebuild completion | -- | -- | S5, S19, S20, S24, S27, S28 | architecture-review.md, mode-review.md |

## Gap Closure: Coverage of Previously Untested Paths

Requirements that close gaps identified in gap analysis.

| ID | Requirement | check-static | check-install | Scenario | Review Prompt |
|---|---|---|---|---|---|
| G1 | adoption-plan.md and rebuild-status.md templates added (rebuild evolve cycle) | Yes | Yes | S7, S8 | architecture-review.md |
| G2 | Architecture Selection is recorded for init, rebuild, adopt; completed-rebuild adopt confirms rebuild complete, merges target into current, archives target docs/adoption plan, and marks rebuild completed | -- | -- | S1, S2, S7, S8, S12 | architecture-review.md |
| G3 | Failure Localization is tested end-to-end in diagnose mode | -- | -- | S9 | architecture-review.md |
| G4 | Architecture Drift subtype is detected and reported | -- | -- | S5, S11 | architecture-review.md |
| G5 | Hook skeleton files are present and reminder-only with no executable enforcement | Yes | -- | S10 | hook-review.md |
| G6 | Matcher simulation covers all declared hook events without extra triggers | -- | -- | S10 | hook-review.md |
| G7 | Agent protocol block install, update, and duplicate prevention is verified | -- | -- | S1, S2, S6 | collaboration-review.md |
| G8 | Workflow fallback: Integrated Mode > Standalone Mode, with explicit detection order | -- | -- | S10 | collaboration-review.md |
| G9 | Minimal Implementation Plan does not replace external spec workflows | -- | -- | S10 | collaboration-review.md |
| G10 | Diagnose does not become automatic debugger or direct repair mode | -- | -- | S9 | architecture-review.md |

## Public Docs: User-Facing Interface Consistency

Requirements related to public README, INSTALL-FOR-AI, and references/ cross-checking.

| ID | Requirement | check-static | check-install | Scenario | Review Prompt |
|---|---|---|---|---|---|
| P1 | README.md Mode Router matches skill Mode Router | Yes | -- | -- | mode-review.md |
| P2 | README.md reference/mode counts match source file counts | Yes | -- | -- | -- |
| P3 | INSTALL-FOR-AI.md directions are testable (copy files, verify install snapshot matches) | -- | Yes | -- | -- |
| P4 | References point to correct section anchors; no broken or stale cross-references | Yes | -- | -- | -- |
| P5 | Public docs do not contain internal-only test-run paths or fixture references | Yes | -- | -- | -- |
| P6 | Template Map and Reference Map in SKILL.md match actual files in source tree | Yes | -- | -- | -- |

## Review Prompt Cross-Reference

| Review Prompt | Covers Requirements | Inputs |
|---|---|---|
| mode-review.md | C5, I1, I2, I4, I5, I6, I6a, I6b, I6c, I6d, I9, I14, I15, I16, I17, I19, I22, I23, I24, I31, I32, I33, I36, P1 | results/scenario-outputs/, coverage/scenario-matrix.md, coverage/rule-ownership-inventory.md |
| architecture-review.md | C6, I3, I7, I8, I10, I11, I18, I21, I25, I26, I27, I28, I29, I30, I36, G1, G2, G3, G4, G10 | results/scenario-outputs/ S1, S3, S4, S5, S7, S8, S9, S11, S12, S20, S22, S23, S24, S25, S26, S27, S28 |
| hook-review.md | G5, G6, I20, I32, I34, I35 | results/automated/check-hooks.md, results/automated/simulate-hook-events.md, results/scenario-outputs/S28.md, coverage/rule-ownership-inventory.md |
| collaboration-review.md | C7, I12, I13, I35, G7, G8, G9 | results/scenario-outputs/S10, results/scenario-outputs/S28.md, prompts/review/collaboration-review.md, source-under-test/skills/spec-docs/templates/agent-protocol-block.md |