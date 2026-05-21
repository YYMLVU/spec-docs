import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  assertExists,
  assertIncludes,
  copyRecursive,
  installedSnapshot,
  readText,
  removeIfExists,
  repoRoot,
  runCommand,
  writeResult
} from "./lib.mjs";

removeIfExists(installedSnapshot);
fs.mkdirSync(installedSnapshot, { recursive: true });

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "spec-docs-install-"));
try {
  runCommand(process.execPath, [path.join(repoRoot, "bin/spec-docs.js")], tmp);
  const installedSkill = path.join(tmp, ".claude", "skills", "spec-docs");
  assertExists(path.join(installedSkill, "SKILL.md"));
  copyRecursive(path.join(tmp, ".claude"), path.join(installedSnapshot, ".claude"));
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

const installedRoot = path.join(installedSnapshot, ".claude", "skills", "spec-docs");
const requiredInstalled = [
  "SKILL.md",
  "references/modes.md",
  "references/architecture-control.md",
  "references/hooks.md",
  "references/hard-gates.md",
  "templates/current-architecture.md",
  "templates/target-architecture.md",
  "templates/placement-review.md",
  "templates/architecture-review.md",
  "templates/debugging-rules.md",
  "templates/diagnosis.md",
  "templates/module.spec.md",
  "templates/agent-protocol-block.md",
  "hooks/hooks.json",
  "hooks/hooks-cursor.json",
  "hooks/run-hook.cmd",
  "hooks/scripts/session-start",
  "hooks/scripts/stop-verify-reminder",
  "hooks/scripts/pre-edit-guard",
  "hooks/scripts/post-edit-reminder",
  "hooks/scripts/pre-bash-guard"
];

for (const rel of requiredInstalled) {
  assertExists(path.join(installedRoot, rel));
}

JSON.parse(readText(path.join(installedRoot, "hooks/hooks.json")));
JSON.parse(readText(path.join(installedRoot, "hooks/hooks-cursor.json")));

const installedSkill = readText(path.join(installedRoot, "SKILL.md"));
assertIncludes(installedSkill, "Mode Router", "installed SKILL.md");
assertIncludes(installedSkill, "Architecture Selection", "installed SKILL.md");
assertIncludes(installedSkill, "Core Hard Gates", "installed SKILL.md");

const report = [
  "# Install Completeness Check",
  "",
  "Status: PASS",
  `Installed files checked: ${requiredInstalled.length}`,
  "Installed snapshot refreshed: installed-under-test/.claude/skills/spec-docs/",
  ""
].join("\n");

writeResult("check-install.md", report);
console.log(report);
