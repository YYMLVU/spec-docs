#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SKILL_NAME = "spec-docs";
const TARGET_DIR = path.join(process.cwd(), ".claude", "skills", SKILL_NAME);
const SOURCE_DIR = path.join(__dirname, "..", "skills", SKILL_NAME);

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error("Error: skill source not found at " + SOURCE_DIR);
    process.exit(1);
  }

  fs.mkdirSync(TARGET_DIR, { recursive: true });
  copyRecursive(SOURCE_DIR, TARGET_DIR);

  const skillFile = path.join(TARGET_DIR, "SKILL.md");
  if (!fs.existsSync(skillFile)) {
    console.error("Error: SKILL.md was not copied successfully.");
    process.exit(1);
  }

  console.log("spec-docs skill installed to " + TARGET_DIR);
  console.log();
  console.log("Next step: send the following to your AI assistant:");
  console.log();
  console.log("  Use the spec-docs skill in init mode to build a full");
  console.log("  implementation-first spec knowledge base for this project.");
  console.log();
}

main();
