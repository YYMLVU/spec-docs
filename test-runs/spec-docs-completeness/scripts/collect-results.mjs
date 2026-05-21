import fs from "node:fs";
import path from "node:path";
import { listFilesRecursive, readText, workspaceRoot, writeResult } from "./lib.mjs";

const resultsRoot = path.join(workspaceRoot, "results");
const automatedDir = path.join(resultsRoot, "automated");
const scenarioDir = path.join(resultsRoot, "scenario-outputs");
const reviewsDir = path.join(resultsRoot, "reviews");

const STATUS_RE = /Status:\s*(PASS_WITH_NOTES|PASS|FAIL|BLOCKED)/;

function collectResults(dir, label) {
  const files = listFilesRecursive(dir).filter(f => path.basename(f) !== ".gitkeep" && path.basename(f) !== "summary.md");
  const entries = [];
  for (const f of files) {
    const text = readText(f);
    const match = text.match(STATUS_RE);
    const status = match ? match[1] : "UNCLASSIFIED";
    entries.push({ file: path.relative(dir, f), status, label });
  }
  return entries;
}

const automated = collectResults(automatedDir, "automated");
const scenarios = collectResults(scenarioDir, "scenario");
const reviews = collectResults(reviewsDir, "review");

const allResults = [...automated, ...scenarios, ...reviews];

// Count statuses
const statusCounts = { PASS: 0, PASS_WITH_NOTES: 0, FAIL: 0, BLOCKED: 0, UNCLASSIFIED: 0 };
for (const r of allResults) {
  statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
}

function lines() { return "\n"; }

const report = [
  "# spec-docs Completeness Test Results — Summary",
  "",
  "## Overall Status",
  "",
  `Collected: ${allResults.length} result file(s)`,
  `Automated: ${automated.length}, Scenarios: ${scenarios.length}, Reviews: ${reviews.length}`,
  "",
  `Status breakdown:`,
  `  PASS:           ${statusCounts.PASS}`,
  `  PASS_WITH_NOTES: ${statusCounts.PASS_WITH_NOTES}`,
  `  FAIL:           ${statusCounts.FAIL}`,
  `  BLOCKED:        ${statusCounts.BLOCKED}`,
  `  UNCLASSIFIED:   ${statusCounts.UNCLASSIFIED}`,
  "",
  "## Automated Checks",
  "",
  ...automated.map(r => `- ${r.file}: **${r.status}**`),
  automated.length === 0 ? ["(none)"] : [],
  "",
  "## Scenario Results",
  "",
  "| Scenario | Result |",
  "| --- | --- |",
  ...scenarios.map(r => `| ${r.file} | ${r.status} |`),
  scenarios.length === 0 ? ["(none)"] : [],
  "",
  "## Grouped Reviews",
  "",
  ...reviews.map(r => `- ${r.file}: **${r.status}**`),
  reviews.length === 0 ? ["(none)"] : [],
  "",
  "## Determination",
  "",
  (() => {
    if (statusCounts.FAIL > 0) return "Overall: **FAIL** — one or more checks failed.";
    if (statusCounts.BLOCKED > 0) return "Overall: **BLOCKED** — one or more checks are blocked.";
    if (statusCounts.UNCLASSIFIED > 0) return "Overall: **INCOMPLETE** — some results are unclassified or missing.";
    if (statusCounts.PASS_WITH_NOTES > 0) return "Overall: **PASS_WITH_NOTES** — all checks pass with notes.";
    if (allResults.length === 0) return "Overall: **BLOCKED** — no result files found.";
    return "Overall: **PASS** — all checks pass.";
  })()
].join("\n") + "\n";

// Write summary via lib helper
writeResult("summary.md", report);

// Print to stdout
console.log(report);