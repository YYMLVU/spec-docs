# Hooks and Collaboration Fixture

This fixture tests protocol reasoning rather than project code.

Variant A: local superpowers Spec Skill is available. Expected order for non-trivial implementation work is: brainstorm/design if needed, spec-docs place, implementation, classify impact, then complete the impact-appropriate spec action.

Variant B: local superpowers Spec Skill is not available. Expected fallback is: use spec-docs references and templates directly, run place before non-trivial planning, classify impact after implementation, then complete the impact-appropriate spec action before completion.

Expected collaboration behavior: both variants preserve `place -> implement -> classify impact -> impact-appropriate spec action` for non-trivial changes.