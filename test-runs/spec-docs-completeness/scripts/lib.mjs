import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

export const repoRoot = process.cwd();

// Guard: validate that repoRoot is the repository root before any paths are derived.
const rootMarkerFiles = ["package.json", "skills/spec-docs/SKILL.md", "bin/spec-docs.js"];
for (const rel of rootMarkerFiles) {
  if (!fs.existsSync(path.join(repoRoot, rel))) {
    throw new Error(
      `Not running from repository root (expected ${rel} at ${repoRoot}). ` +
      `Change working directory to the repo root and re-run.`
    );
  }
}

export const workspaceRoot = path.join(repoRoot, "test-runs", "spec-docs-completeness");
export const sourceSnapshot = path.join(workspaceRoot, "source-under-test");
export const installedSnapshot = path.join(workspaceRoot, "installed-under-test");
export const resultsRoot = path.join(workspaceRoot, "results", "automated");

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

export function writeText(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

export function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

export function assertExists(filePath) {
  assert(fs.existsSync(filePath), `Missing expected path: ${filePath}`);
}

export function assertNotExists(filePath) {
  assert(!fs.existsSync(filePath), `Unexpected path exists: ${filePath}`);
}

export function assertIncludes(text, needle, label) {
  assert(text.includes(needle), `${label} must include ${JSON.stringify(needle)}`);
}

export function listFilesRecursive(root) {
  if (!fs.existsSync(root)) return [];
  const result = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      result.push(...listFilesRecursive(full));
    } else {
      result.push(full);
    }
  }
  return result.sort();
}

export function hashTree(root) {
  const hash = crypto.createHash("sha256");
  for (const file of listFilesRecursive(root)) {
    const rel = path.relative(root, file);
    hash.update(rel);
    hash.update("\0");
    hash.update(fs.readFileSync(file));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

export function removeIfExists(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

export function runNode(scriptPath, args = [], cwd = repoRoot) {
  return execFileSync(process.execPath, [scriptPath, ...args], {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

export function runCommand(command, args = [], cwd = repoRoot, env = process.env) {
  return execFileSync(command, args, {
    cwd,
    env,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

export function writeResult(name, data) {
  fs.mkdirSync(resultsRoot, { recursive: true });
  writeText(path.join(resultsRoot, name), data.endsWith("\n") ? data : `${data}\n`);
}

export function relative(filePath) {
  return path.relative(repoRoot, filePath);
}
