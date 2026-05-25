# S20 Level 4 Architecture-Risk Escalation Fixture

This directory contains a small code change that introduces a direct import from `features/billing/internal` into `features/users`, bypassing the declared billing public API. It tests that `spec-docs update` classifies the change as Level 4 and escalates without silently rewriting architecture rules.
