# Adapter — Codex

Use Codex as a repository-native implementation agent.

## Context loading

Start with:

1. `AGENTS.md`
2. `genesis.yaml`
3. `docs/WORK.md`

Then load only affected contracts.

Do not preload the whole repository documentation merely because it exists.

## Execution

Give Codex the outcome and evidence required, not a long sequence of low-level instructions.

A large coherent change does not need to be fragmented into arbitrary hour-sized stories. Split work when it improves reviewability, isolates risk or creates an independently useful vertical result.

Codex may continue autonomously inside approved contracts. It should stop only for a real blocker or a Genesis decision gate.

## Handoff

At completion, preserve:

- implementation and tests;
- evidence;
- affected contract updates;
- durable decisions, if any.

Do not preserve raw agent reasoning or long chat transcripts in the repo.
