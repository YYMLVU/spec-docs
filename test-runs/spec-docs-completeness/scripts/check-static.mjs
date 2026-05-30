import fs from "node:fs";
import path from "node:path";
import {
  assert,
  assertExists,
  assertIncludes,
  copyRecursive,
  readText,
  removeIfExists,
  repoRoot,
  sourceSnapshot,
  writeResult
} from "./lib.mjs";

const requiredFiles = [
  "skills/spec-docs/SKILL.md",
  "skills/spec-docs/references/modes.md",
  "skills/spec-docs/references/architecture-control.md",
  "skills/spec-docs/references/verification.md",
  "skills/spec-docs/references/source-priority.md",
  "skills/spec-docs/references/workflow-integration.md",
  "skills/spec-docs/references/project-instructions.md",
  "skills/spec-docs/references/spec-authoring.md",
  "skills/spec-docs/references/hooks.md",
  "skills/spec-docs/references/hard-gates.md",
  "test-runs/spec-docs-completeness/coverage/rule-ownership-inventory.md",
  "skills/spec-docs/templates/current-architecture.md",
  "skills/spec-docs/templates/target-architecture.md",
  "skills/spec-docs/templates/placement-rules.md",
  "skills/spec-docs/templates/placement-review.md",
  "skills/spec-docs/templates/architecture-review.md",
  "skills/spec-docs/templates/debugging-rules.md",
  "skills/spec-docs/templates/diagnosis.md",
  "skills/spec-docs/templates/module.spec.md",
  "skills/spec-docs/templates/agent-protocol-block.md",
  "skills/spec-docs/templates/project-overview.spec.md",
  "skills/spec-docs/hooks/hooks.json",
  "skills/spec-docs/hooks/hooks-cursor.json",
  "skills/spec-docs/hooks/run-hook.cmd",
  "skills/spec-docs/hooks/scripts/session-start",
  "skills/spec-docs/hooks/scripts/stop-verify-reminder",
  "skills/spec-docs/hooks/scripts/pre-edit-guard",
  "skills/spec-docs/hooks/scripts/post-edit-reminder",
  "skills/spec-docs/hooks/scripts/pre-bash-guard",
  "README.md",
  "README.zh-CN.md",
  "INSTALL-FOR-AI.md",
  "package.json",
  "bin/spec-docs.js"
];

removeIfExists(sourceSnapshot);
copyRecursive(path.join(repoRoot, "skills"), path.join(sourceSnapshot, "skills"));
copyRecursive(path.join(repoRoot, "bin"), path.join(sourceSnapshot, "bin"));
copyRecursive(path.join(repoRoot, "package.json"), path.join(sourceSnapshot, "package.json"));

// Copy agents only if it exists (optional per plan)
const agentsSrc = path.join(repoRoot, "agents");
if (fs.existsSync(agentsSrc)) {
  copyRecursive(agentsSrc, path.join(sourceSnapshot, "agents"));
}

for (const rel of requiredFiles) {
  assertExists(path.join(repoRoot, rel));
}

JSON.parse(readText(path.join(repoRoot, "skills/spec-docs/hooks/hooks.json")));
JSON.parse(readText(path.join(repoRoot, "skills/spec-docs/hooks/hooks-cursor.json")));
JSON.parse(readText(path.join(repoRoot, "package.json")));

const skill = readText(path.join(repoRoot, "skills/spec-docs/SKILL.md"));
for (const mode of ["init", "update", "verify", "repair", "place", "rebuild", "adopt", "diagnose"]) {
  assertIncludes(skill, mode, "SKILL.md mode router");
}
assertIncludes(skill, "Architecture Selection", "SKILL.md");
assertIncludes(skill, "Core Hard Gates", "SKILL.md");
assertIncludes(skill, "references/architecture-control.md", "SKILL.md reference map");
assertIncludes(skill, "references/hard-gates.md", "SKILL.md reference map");

function assertNotIncludes(text, needle, label) {
  assert(!text.includes(needle), `${label} must not include stale unconditional wording ${JSON.stringify(needle)}`);
}

const ownershipInventory = readText(path.join(repoRoot, "test-runs/spec-docs-completeness/coverage/rule-ownership-inventory.md"));
for (const phrase of [
  "Canonical Ownership Table",
  "Impact levels 0-4",
  "Trigger Deduplication Decisions",
  "Planned Static Check Expectations"
]) {
  assertIncludes(ownershipInventory, phrase, "rule ownership inventory");
}

const protocolBlock = readText(path.join(repoRoot, "skills/spec-docs/templates/agent-protocol-block.md"));
const workspaceReadmeTemplate = readText(path.join(repoRoot, "skills/spec-docs/templates/workspace-readme.md"));
const hooksReference = readText(path.join(repoRoot, "skills/spec-docs/references/hooks.md"));

assertNotIncludes(
  workspaceReadmeTemplate,
  "**Before declaring work done**: run `spec-docs verify`.",
  "workspace-readme.md"
);
assertNotIncludes(
  protocolBlock,
  "11. Run tests.\n12. Run `spec-docs update`.\n13. Run `spec-docs verify`.",
  "agent-protocol-block.md"
);
assertNotIncludes(
  hooksReference,
  "remind update/verify around tests/builds when code changed",
  "hooks.md"
);

for (const phrase of [
  "impact-appropriate spec action",
  "Level 0: state a no-update reason",
  "Level 2: update affected specs and run a targeted light check",
  "Level 4: report architecture risk"
]) {
  assertIncludes(protocolBlock, phrase, "agent-protocol-block.md impact-aware protocol");
}

const architectureControl = readText(path.join(repoRoot, "skills/spec-docs/references/architecture-control.md"));
for (const phrase of [
  "Primary Preset",
  "Addons",
  "Adoption Mode",
  "Boundary Contract",
  "Placement & Boundary Review",
  "Preset-specific Placement Checks",
  "Failure Localization",
  "Diagnose",
  "Architecture Hard Gates"
]) {
  assertIncludes(architectureControl, phrase, "architecture-control.md");
}

const diagnosis = readText(path.join(repoRoot, "skills/spec-docs/templates/diagnosis.md"));
for (const phrase of [
  "Likely Ownership",
  "Likely Failure Boundary",
  "First Specs / Files to Inspect",
  "Logs / Metrics / Error Signals to Check",
  "Do Not Start Here",
  "Suggested Debugging Order",
  "Evidence Limits"
]) {
  assertIncludes(diagnosis, phrase, "diagnosis.md");
}

const moduleSpec = readText(path.join(repoRoot, "skills/spec-docs/templates/module.spec.md"));
assertIncludes(moduleSpec, "## Boundary", "module.spec.md");
assertIncludes(moduleSpec, "Failure Localization", "module.spec.md");

const archReview = readText(path.join(repoRoot, "skills/spec-docs/templates/architecture-review.md"));
for (const subtype of [
  "MODULE BOUNDARY",
  "LAYER",
  "CONTRACT",
  "INFRASTRUCTURE ACCESS",
  "SHARED CODE ABUSE",
  "STATE OWNERSHIP",
  "ERROR BOUNDARY",
  "OBSERVABILITY",
  "OWNERSHIP AMBIGUITY",
  "ARCHITECTURE DRIFT",
  "SECURITY BOUNDARY",
  "RESILIENCE",
  "PERFORMANCE BOUNDARY",
  "AUTOMATED ARCHITECTURE TEST REQUIRED"
]) {
  assertIncludes(archReview, subtype, "architecture-review.md subtype list");
}

const readme = readText(path.join(repoRoot, "README.md"));
assertIncludes(readme, "diagnose mode", "README.md diagnose usage");
assertIncludes(readme, "skills/spec-docs/references/", "README.md references path");
assertIncludes(readme, "Primary support: Claude Code", "README.md platform positioning");
assertIncludes(readme, "Manual or experimental integration", "README.md platform positioning");
assertIncludes(readme, "twenty-eight scenarios", "README.md scenario count");
assertNotIncludes(
  readme,
  "Send this to Claude Code, Cursor, GitHub Copilot, or another AI coding assistant:",
  "README.md platform positioning"
);

const installDoc = readText(path.join(repoRoot, "INSTALL-FOR-AI.md"));
assertIncludes(installDoc, "references/", "INSTALL-FOR-AI.md");
assertIncludes(installDoc, "hooks/", "INSTALL-FOR-AI.md");
assertIncludes(installDoc, "Primary support: Claude Code", "INSTALL-FOR-AI.md platform positioning");
assertIncludes(installDoc, "Manual or experimental integration", "INSTALL-FOR-AI.md platform positioning");

const workflowIntegration = readText(path.join(repoRoot, "skills/spec-docs/references/workflow-integration.md"));
for (const phrase of [
  "docs/superpowers/specs/",
  "openspec.yaml",
  ".specify/",
  "Small Bugfix Fast Path"
]) {
  assertIncludes(workflowIntegration, phrase, "workflow-integration.md adaptive scope follow-up");
}

const verification = readText(path.join(repoRoot, "skills/spec-docs/references/verification.md"));
for (const phrase of [
  "Unverified assumptions",
  "informational",
  "requires follow-up",
  "blocks the current claim"
]) {
  assertIncludes(verification, phrase, "verification.md warning classification");
}

const modes = readText(path.join(repoRoot, "skills/spec-docs/references/modes.md"));
for (const phrase of [
  "Profile upgrade recommendation",
  "outgrown its current profile",
  "Do not rewrite existing specs wholesale"
]) {
  assertIncludes(modes, phrase, "modes.md profile upgrade guidance");
}

for (const phrase of [
  "deduplicated within a session or change unit",
  "must not overwrite existing hook configurations silently",
  "session/change-unit marker"
]) {
  assertIncludes(hooksReference, phrase, "hooks.md hook deduplication and overwrite protection");
}

for (const phrase of [
  "Equivalence Review Procedure",
  "verify every hard gate still has a canonical owner",
  "compare old wording to the canonical owner"
]) {
  assertIncludes(ownershipInventory, phrase, "rule ownership equivalence review");
}

const report = [
  "# Static Source Check",
  "",
  "Status: PASS",
  `Required files checked: ${requiredFiles.length}`,
  "Source snapshot refreshed: source-under-test/",
  ""
].join("\n");

writeResult("check-static.md", report);
console.log(report);
