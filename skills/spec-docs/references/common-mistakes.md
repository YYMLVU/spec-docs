# Common Mistakes Reference

| Excuse | Reality |
|---|---|
| Just make a few docs. | `init` is not complete until included-scope coverage is verified. |
| Docs can wait. | Implementation-relevant changes require same-change spec maintenance. |
| The spec says so, so change code. | Code/contracts/configs outrank stale specs. Repair specs unless code changes were requested. |
| This is a plan, not a spec. | Spec Docs describes current implementation only. |
| A path list is enough. | Specs need implementation mapping, symbols, call flow, data flow, tests, and change boundaries when relevant. |
| Inventory can track missing areas. | Inventory is objective metadata and reverse index, not a backlog. |
| A glob can describe future files. | Globs must match real project areas and current coverage scope. |
| There is no code, so invent a stack. | Empty-project init records only user-confirmed principles or explicit clarification markers. |
| Create starter files so specs have paths. | Spec Docs must not scaffold implementation during init unless the user separately asks for code. |
| Empty indexes prove the project is covered. | Empty-project init should not create empty indexes; `update` creates real indexes when implementation exists. |
| Directory principles mean pre-creating a tree. | Principles may constrain future changes, but reserved paths or scaffolding are plans unless the user asks for setup. |
| Update can rewrite architecture rules too. | Use repair architecture with confirmation or ADR. |
| Relax the architecture rule since code violates it. | Report architecture violation or drift; do not silently weaken rules. |
| Rebuild mode because target files exist. | Rebuild mode is determined by `rebuild/status.md`. |
| Standalone mode can manage the full backlog. | Standalone Mode stays lightweight and must not become a roadmap/backlog system. |
