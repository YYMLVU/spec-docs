# Real Project Candidates

These candidates are not cloned yet. User confirmation is required before cloning any repository.

## Candidate 1: ezekg/xo

- **URL:** https://github.com/ezekg/xo
- **Type:** Go CLI utility
- **Approximate size:** 10 files (1 Go source + 1 test, 3 fixtures, docs/config)
- **Stars:** 186
- **License:** MIT
- **Archived:** No
- **Suitable scenarios:**
  - S2 (Existing Small App Init) — ideal; single-source-file CLI, trivially analyzable.
  - S8 (Adopt Legacy Project) — viable as a legacy adopt exercise; limited module surface but shows typical Go project conventions.
- **Why useful:** Extremely small and self-contained; one `main.go` does everything (composes regex matches on input). No external dependencies beyond the Go standard library. The project is well-structured with fixtures for testing, a test file, CI config, and a clear README. It exercises CLI tool patterns and regex-heavy logic without requiring network access or external binaries.
- **Risks/notes:**
  - Very small — may be too trivial for some test scenarios that expect multi-module architectures.
  - Last pushed 2021 (somewhat stale but not archived); this is fine for testing spec-docs init since the code is frozen.

## Candidate 2: pixelb/crudini

- **URL:** https://github.com/pixelb/crudini
- **Type:** Python CLI utility
- **Approximate size:** 25 files (2 Python sources — `crudini.py` as the single source + `setup.py`; config files, examples, docs)
- **Stars:** 485
- **License:** GPL-2.0
- **Archived:** No
- **Suitable scenarios:**
  - S2 (Existing Small App Init) — single Python file with clear module boundaries; INI manipulation is easy to reason about.
  - S8 (Adopt Legacy Project) — has an `example.ini`, `EXAMPLES` doc, and `INSTALL` instructions; useful for adopt where documentation coverage matters.
- **Why useful:** Battle-tested utility (485 stars) with a single-source-file architecture. Manipulates INI files — a well-understood domain. Has a test suite via tox, example config files, a Makefile, and a `pyproject.toml`. The codebase is non-trivial enough to show real-world patterns (argparse, file I/O, `configparser`) but small enough for a quick init.
- **Risks/notes:**
  - GPL-2.0 license — not an issue for testing since we are not redistributing.
  - Python-only; no multi-language diversity.
  - Requires Python 3 to parse; no native compilation.

## Candidate 3: franeklubi/rustic

- **URL:** https://github.com/franeklubi/rustic
- **Type:** TypeScript library
- **Approximate size:** 26 files (10 source TypeScript, 4 test specs, webpack config, tooling)
- **Stars:** 144
- **License:** BSD-3-Clause
- **Archived:** No
- **Suitable scenarios:**
  - S2 (Existing Small App Init) — clear module structure (`src/option/`, `src/result/`, `src/js_wrappers/`), well-organized for init with architectural placement.
  - S8 (Adopt Legacy Project) — has Jest tests, webpack configs, TypeScript tooling; a good target for adopt with a realistic build pipeline.
- **Why useful:** Small TypeScript library emulating Rust's `Option` and `Result` types. Has a clean module layout with separate source directories, test files co-located as `.spec.ts`, and exported public API via `index.ts`. The domain (functional wrappers) is stateless and easy to understand. Tests exist and can be verified during the adopt workflow.
- **Risks/notes:**
  - Requires Node.js toolchain (npm/jest/webpack) for full functionality; the spec-docs init itself does not require running these.
  - `package-lock.json` included (~180KB); large for the file count but standard for Node.js projects.
  - Last pushed 2024; healthy maintenance cadence.

## Summary

| # | Candidate | Language | Files | Stars | Best For |
|---|-----------|----------|-------|-------|----------|
| 1 | ezekg/xo | Go | 10 | 186 | S2 init — single-file Go CLI |
| 2 | pixelb/crudini | Python | 25 | 485 | S2 init — single-file Python CLI |
| 3 | franeklubi/rustic | TypeScript | 26 | 144 | S2 init / S8 adopt — small library with modules |