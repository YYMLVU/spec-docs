import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  assert,
  assertExists,
  assertIncludes,
  hashTree,
  readJson,
  repoRoot,
  runCommand,
  writeResult
} from "./lib.mjs";

const hooksRoot = path.join(repoRoot, "skills", "spec-docs", "hooks");
const claudeHooks = readJson(path.join(hooksRoot, "hooks.json"));
const cursorHooks = readJson(path.join(hooksRoot, "hooks-cursor.json"));

const expectedClaudeEvents = ["SessionStart", "Stop", "PreToolUse", "PostToolUse"];
const expectedCursorEvents = ["sessionStart", "stop"];
const actualClaudeEvents = Object.keys(claudeHooks.hooks).sort();
const actualCursorEvents = Object.keys(cursorHooks.hooks).sort();

assert(JSON.stringify(actualClaudeEvents) === JSON.stringify(expectedClaudeEvents.sort()), `Claude hook events mismatch: ${actualClaudeEvents.join(", ")}`);
assert(JSON.stringify(actualCursorEvents) === JSON.stringify(expectedCursorEvents.sort()), `Cursor hook events mismatch: ${actualCursorEvents.join(", ")}`);

const expectedScripts = [
  "session-start",
  "stop-verify-reminder",
  "pre-edit-guard",
  "post-edit-reminder",
  "pre-bash-guard"
];

for (const script of expectedScripts) {
  assertExists(path.join(hooksRoot, "scripts", script));
}

const beforeHash = hashTree(path.join(repoRoot, "skills", "spec-docs"));
const scriptOutputs = [];
for (const script of expectedScripts) {
  const scriptPath = path.join(hooksRoot, "scripts", script);
  const output = runCommand(scriptPath, [], repoRoot);
  assertIncludes(output, "spec-docs", `${script} output`);
  scriptOutputs.push(`## ${script}\n\n\`\`\`text\n${output.trim()}\n\`\`\``);
}

const dedupStateDir = fs.mkdtempSync(path.join(os.tmpdir(), "spec-docs-hook-dedup-"));
try {
  const dedupEnv = { ...process.env, SPEC_DOCS_HOOK_STATE_DIR: dedupStateDir };
  const postEditScript = path.join(hooksRoot, "scripts", "post-edit-reminder");
  const firstPostEdit = runCommand(postEditScript, [], repoRoot, dedupEnv);
  const secondPostEdit = runCommand(postEditScript, [], repoRoot, dedupEnv);
  assertIncludes(firstPostEdit, "spec-docs post-edit reminder", "post-edit-reminder first dedup output");
  assertIncludes(secondPostEdit, "already shown for this session/change unit", "post-edit-reminder second dedup output");
  assert(!secondPostEdit.includes("If implementation-relevant files changed"), "post-edit-reminder repeated output must suppress full reminder body");
  scriptOutputs.push(`## post-edit-reminder dedup\n\n\`\`\`text\n${secondPostEdit.trim()}\n\`\`\``);
} finally {
  fs.rmSync(dedupStateDir, { recursive: true, force: true });
}

const afterHash = hashTree(path.join(repoRoot, "skills", "spec-docs"));
assert(beforeHash === afterHash, "Hook scripts must not modify skill files");

const runHook = path.join(hooksRoot, "run-hook.cmd");
const runnerTmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "spec-docs-runner-dedup-"));
try {
  for (const script of expectedScripts) {
    const runnerEnv = { ...process.env, TMPDIR: runnerTmpDir, SPEC_DOCS_HOOK_SESSION_ID: `check-hooks-${script}-one` };
    delete runnerEnv.SPEC_DOCS_HOOK_STATE_DIR;
    const firstRunnerOutput = runCommand(runHook, [script], repoRoot, runnerEnv);
    const secondRunnerOutput = runCommand(runHook, [script], repoRoot, runnerEnv);
    assertIncludes(firstRunnerOutput, "spec-docs", `run-hook ${script} first dedup output`);
    assertIncludes(secondRunnerOutput, "already shown for this session/change unit", `run-hook ${script} second dedup output`);
    assert(!secondRunnerOutput.includes("- "), `run-hook repeated ${script} output must suppress full reminder body`);

    runnerEnv.SPEC_DOCS_HOOK_SESSION_ID = `check-hooks-${script}-two`;
    const thirdRunnerOutput = runCommand(runHook, [script], repoRoot, runnerEnv);
    assertIncludes(thirdRunnerOutput, "spec-docs", `run-hook ${script} new session/change unit output`);
    assert(thirdRunnerOutput.includes("- "), `run-hook ${script} new session/change unit should show reminder body again`);
    scriptOutputs.push(`## run-hook ${script} dedup\n\n\`\`\`text\n${secondRunnerOutput.trim()}\n\`\`\``);
  }
} finally {
  fs.rmSync(runnerTmpDir, { recursive: true, force: true });
}

const runHookText = fs.readFileSync(runHook, "utf8");
assertIncludes(runHookText, "SPEC_DOCS_HOOK_SESSION_ID", "run-hook.cmd session/change-unit dedup state");
assertIncludes(runHookText, "SPEC_DOCS_HOOK_STATE_DIR", "run-hook.cmd default dedup state");
assertIncludes(runHookText, "spec-docs-hooks", "run-hook.cmd default dedup state");
assertIncludes(runHookText, "SPEC_DOCS_HOOK_STATE_DIR=", "run-hook.cmd Windows default dedup state");

const serialized = JSON.stringify(claudeHooks) + JSON.stringify(cursorHooks);
for (const script of expectedScripts) {
  assert(serialized.includes(script), `Configured hooks should reference ${script}`);
}

const report = [
  "# Hook Static and Script Check",
  "",
  "Status: PASS",
  `Claude events: ${actualClaudeEvents.join(", ")}`,
  `Cursor events: ${actualCursorEvents.join(", ")}`,
  "No side effects detected in skills/spec-docs tree.",
  "",
  ...scriptOutputs,
  ""
].join("\n");

writeResult("check-hooks.md", report);
console.log(report);
