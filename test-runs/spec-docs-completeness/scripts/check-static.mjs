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

const installDoc = readText(path.join(repoRoot, "INSTALL-FOR-AI.md"));
assertIncludes(installDoc, "references/", "INSTALL-FOR-AI.md");
assertIncludes(installDoc, "hooks/", "INSTALL-FOR-AI.md");

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
