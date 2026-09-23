# Genesis v2

> A lightweight continuity layer between human intent and interchangeable AI agents.

Genesis does not teach capable models how to think. It preserves the decisions, constraints, outcomes and evidence that must survive when tools, models or sessions change.

This branch is an experimental rewrite of Genesis. The previous generation is preserved at tag `1.0`.

## What Genesis is

Genesis is a small set of **contracts**:

- what the project is trying to achieve;
- what product behaviour must remain true;
- which technical and risk constraints matter;
- what the experience should feel like;
- what the current unit of work must accomplish;
- what evidence is required before shipping.

Everything else is replaceable.

## What Genesis is not

Genesis is not:

- a mandatory waterfall;
- a project manager;
- a prompt collection for one model;
- a dependency on OpenAI, Anthropic, Open Design or any other vendor;
- a reason to create documentation that nobody needs;
- a substitute for tests, code review or human product judgment.

## Core loop

```text
VALIDATE → FRAME → DECIDE → DESIGN → BUILD → VERIFY → SHIP → LEARN
```

This is a loop, not a fixed sequence. A task enters only the parts it needs.

Genesis uses **decision gates**, not phase gates. Human approval is required only when a decision is costly, risky, hard to reverse or genuinely subjective.

## Rigor profiles

The project selects one profile in `genesis.yaml`.

| Profile | Use |
|---|---|
| `experiment` | Fast validation, prototypes, disposable tests |
| `product` | Normal side project / SaaS / application |
| `sensitive` | Health, finance, sensitive personal data, higher operational or regulatory risk |

A higher profile activates more explicit contracts. It does not justify bureaucracy.

## Structure

```text
/
├── AGENTS.md
├── genesis.yaml
├── docs/
│   ├── PROJECT.md
│   ├── PRODUCT.md
│   ├── TECH.md
│   ├── RISK.md
│   ├── DESIGN.md
│   ├── WORK.md
│   ├── SHIP.md
│   ├── DECISIONS.md
│   └── adapters/
│       ├── README.md
│       ├── work.md
│       ├── codex.md
│       └── open-design.md
└── .agents/
    └── skills/
        └── genesis/
            └── SKILL.md
```

## Sources of truth

- **Code** is the source of truth for implementation details.
- **PROJECT.md** is the source of truth for intent and success.
- **PRODUCT.md** is the source of truth for important product behaviour.
- **TECH.md** is the source of truth for technical boundaries and operating commands.
- **RISK.md** is the source of truth for security, privacy and high-impact constraints.
- **DESIGN.md** is the source of truth for durable experience and visual decisions.
- **WORK.md** describes only the current coherent unit of work.
- **SHIP.md** defines what must be true to release.
- **DECISIONS.md** records durable decisions that would otherwise be rediscovered.

Do not duplicate a rule into several files.

## Progressive disclosure

An agent starts with `AGENTS.md`, `genesis.yaml` and the active outcome in `WORK.md`.

It reads another contract only when the task can affect that contract.

Examples:

- copy change → probably PRODUCT only;
- database migration → TECH + RISK;
- UI implementation → PRODUCT + DESIGN + TECH;
- public release → SHIP + relevant risk and technical contracts.

## Decision gates

Stop for explicit human approval when changing one of these:

1. Project outcome, target user or MVP boundary.
2. An architecture choice that creates meaningful lock-in or migration cost.
3. Sensitive-data handling, authorization, destructive behaviour or material security posture.
4. A primary product flow or major visual direction.
5. A public release, irreversible migration, destructive production action or material spend.

Within already-approved contracts, capable agents should continue autonomously and show evidence at the end.

## Work units

Genesis v2 does not require arbitrary stories sized in hours.

A work unit is a **coherent, reviewable vertical outcome**. It may map to an issue, PR, story, task or agent session.

Every active work unit states:

- outcome;
- scope and non-goals;
- affected contracts;
- evidence required;
- decision gates, if any.

## Adapters

Tools are integrations, not architecture.

The repository currently includes example adapters for:

- ChatGPT Work;
- Codex;
- Open Design.

They may be replaced or ignored. An adapter cannot weaken or silently add a Genesis core rule.

## When to update Genesis

Do not expand the framework because a new model exists.

Change Genesis only when a real project reveals one of these:

- lost context caused a wrong decision;
- a required gate was missing;
- a contract was ambiguous;
- duplicated documentation drifted;
- an agent repeatedly loaded unnecessary context;
- an adapter leaked tool-specific assumptions into the core.

The test of Genesis v2 should be simple: **does it help a strong agent build Clairon with less friction and fewer wrong turns than using the repository alone?**
