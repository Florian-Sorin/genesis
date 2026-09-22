# Adapters

Adapters connect Genesis to tools without making those tools part of Genesis.

Core contracts must stay usable if every adapter in this directory disappears tomorrow.

## Rules

An adapter may:

- explain the most effective way to load Genesis context in a tool;
- map tool-native concepts to Genesis work units or evidence;
- describe how to hand off output back into the repository.

An adapter may not:

- create a second source of truth;
- weaken a core decision gate;
- require a vendor-specific format in a core contract;
- duplicate long checklists already owned by the core.

Included examples:

- `work.md` — ChatGPT Work for research, synthesis and orchestration;
- `codex.md` — Codex for repository implementation and verification;
- `open-design.md` — Open Design as a replaceable design workshop.

These are current conveniences, not preferred vendors encoded into Genesis.
