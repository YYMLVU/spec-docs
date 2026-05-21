# Hooks and Collaboration Fixture

This fixture tests protocol reasoning rather than project code.

Variant A: local superpowers Spec Skill is available. Expected order for non-trivial implementation work is: brainstorm/design if needed, spec-docs place, implementation, spec-docs update, spec-docs verify.

Variant B: local superpowers Spec Skill is not available. Expected fallback is: use spec-docs references and templates directly, run place before non-trivial planning, update affected specs after implementation, verify before completion.

Expected collaboration behavior: both variants preserve `place -> implement -> update -> verify` for non-trivial changes.