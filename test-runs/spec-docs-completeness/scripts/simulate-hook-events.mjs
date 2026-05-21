import path from "node:path";
import { assert, readJson, repoRoot, writeResult } from "./lib.mjs";

// ──────────── Read hook config files ────────────

const hooksPath = path.join(repoRoot, "skills", "spec-docs", "hooks");
const hooksConfig = readJson(path.join(hooksPath, "hooks.json"));
const cursorHooks = readJson(path.join(hooksPath, "hooks-cursor.json"));

// ──────────── Matcher simulation ────────────

/**
 * Determine whether a matcher pattern matches a value.
 * - "*" matches all values.
 * - Otherwise the pattern is a pipe-separated list; any exact segment match succeeds.
 */
function matcherMatches(pattern, value) {
  if (pattern === "*") return true;
  return pattern.split("|").includes(value);
}

/**
 * For a given config (hooks.json), event name, and matcher value,
 * return the list of command substrings extracted from matching hook entries.
 *
 * - Filter the event's entries to those whose matcher matches matcherValue.
 * - Flatten all hooks from matching entries.
 * - For each hook, split the command by spaces, take the last segment (the
 *   trailing script-name argument), and strip any surrounding quotes.
 */
function commandsFor(config, eventName, matcherValue) {
  const entries = config.hooks[eventName];
  if (!entries) return [];
  const commands = [];
  for (const entry of entries) {
    if (!matcherMatches(entry.matcher, matcherValue)) continue;
    for (const hook of entry.hooks) {
      const cmd = hook.command;
      // Extract the keyword after the last space (or the whole string if no space).
      const parts = cmd.split(" ");
      const last = parts[parts.length - 1];
      // Strip wrapping quotes if present.
      const clean = last.replace(/^["']|["']$/g, "");
      commands.push(clean);
    }
  }
  return commands;
}

// ──────────── Test cases ────────────

const reportLines = [];

const testCases = [
  { event: "SessionStart", matcher: "startup",    expected: ["session-start"] },
  { event: "SessionStart", matcher: "resume",     expected: ["session-start"] },
  { event: "SessionStart", matcher: "manual",     expected: [] },
  { event: "SessionStart", matcher: "clear",      expected: ["session-start"] },
  { event: "SessionStart", matcher: "compact",    expected: ["session-start"] },
  { event: "PreToolUse",   matcher: "Edit",       expected: ["pre-edit-guard"] },
  { event: "PreToolUse",   matcher: "Write",      expected: ["pre-edit-guard"] },
  { event: "PreToolUse",   matcher: "MultiEdit",  expected: ["pre-edit-guard"] },
  { event: "PreToolUse",   matcher: "Bash",       expected: ["pre-bash-guard"] },
  { event: "PreToolUse",   matcher: "Read",       expected: [] },
  { event: "PostToolUse",  matcher: "Edit",       expected: ["post-edit-reminder"] },
  { event: "PostToolUse",  matcher: "Write",      expected: ["post-edit-reminder"] },
  { event: "PostToolUse",  matcher: "MultiEdit",  expected: ["post-edit-reminder"] },
  { event: "PostToolUse",  matcher: "Bash",       expected: [] },
  { event: "Stop",         matcher: "anything",   expected: ["stop-verify-reminder"] },
];

for (const { event, matcher, expected } of testCases) {
  const actual = commandsFor(hooksConfig, event, matcher);

  if (expected.length === 0) {
    assert(actual.length === 0,
      `${event}/${matcher}: expected no hooks but got ${JSON.stringify(actual)}`);
    reportLines.push(`- ${event}/${matcher}: no trigger`);
  } else {
    for (const expCmd of expected) {
      const found = actual.includes(expCmd);
      assert(found,
        `${event}/${matcher}: expected command "${expCmd}" not found in ${JSON.stringify(actual)}`);
    }
    reportLines.push(`- ${event}/${matcher}: ${expected.join(", ")}`);
  }
}

// ──────────── Cursor hooks assertions ────────────

const sesStartHooks = cursorHooks.hooks.sessionStart || [];
assert(sesStartHooks.length === 1,
  `sessionStart: expected 1 hook, got ${sesStartHooks.length}`);
assert(sesStartHooks[0].command.includes("session-start"),
  `sessionStart hook does not contain "session-start": ${sesStartHooks[0].command}`);
reportLines.push(`- cursor sessionStart: 1 hook containing session-start`);

const stopHooks = cursorHooks.hooks.stop || [];
assert(stopHooks.length === 1,
  `stop: expected 1 hook, got ${stopHooks.length}`);
assert(stopHooks[0].command.includes("stop-verify-reminder"),
  `stop hook does not contain "stop-verify-reminder": ${stopHooks[0].command}`);
reportLines.push(`- cursor stop: 1 hook containing stop-verify-reminder`);

// ──────────── Write result ────────────

const statusLine = "Status: PASS";
const resultContent = [
  "# Hook Matcher Simulation",
  "",
  statusLine,
  ...reportLines,
  "",
].join("\n");

writeResult("simulate-hook-events.md", resultContent);
console.log(resultContent);