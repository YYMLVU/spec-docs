# Debugging Rules

This file is optional. Create it only when the project needs architecture-guided debugging rules, or when architecture init or repair can derive these rules from current implementation and user confirmation.

## General Principle

Debugging should follow architecture boundaries.
Do not start by changing unrelated modules or shared utilities.

## Boundary-first Diagnosis

When a feature fails:

1. Identify the owning module.
2. Identify the failing layer.
3. Check public contracts before internal implementation.
4. Check adapters before external services.
5. Check state transitions before patching symptoms.

## Symptom-to-Layer Map

The rows below are generic example patterns. Replace with project-specific rows grounded in observed behavior.

| Symptom | First Boundary to Check | Then Check |
|---------|------------------------|------------|
| API returns wrong response | API/Application | Domain, Adapter |
| State inconsistency | Application/Domain | State machine, persistence adapter |
| External call failure | Adapter | External provider, retry/timeout config |
| Cross-module data mismatch | Public contract/Event | Consumer module |
| Performance degradation | Application/Infrastructure | DB/cache/external dependency |

[NEEDS CLARIFICATION: add project-specific symptom-to-layer rows based on observed behavior, not speculation]

## Module Debugging Ownership

Each module spec should describe:

- Owned behavior
- Public contracts
- Internal-only implementation
- Common failure symptoms (grounded in observed behavior only)
- First files/specs to inspect (grounded in code, tests, or logs)

Do not invent symptoms or debugging paths for modules that have not been observed or confirmed. Use `[NEEDS CLARIFICATION: ...]` when information is not known.
