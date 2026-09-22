# Technical contract

> Describe boundaries and invariants. Let the code describe itself.

## System shape

- frontend:
- backend:
- persistence:
- external services:
- deployment:

## Technical invariants

- [Boundary the agent must not violate]
- [Data ownership / consistency rule]
- [Portability or provider boundary]

## Data

Document only important entities, ownership and lifecycle.

| Data / entity | Owner | Source of truth | Lifecycle / notes |
|---|---|---|---|
| [Entity] | [user/system] | [store] | |

## Commands

These are the commands an agent can actually execute.

| Purpose | Command |
|---|---|
| install | |
| dev | |
| lint | |
| typecheck | |
| test | |
| e2e | |
| build | |

Mark non-applicable checks explicitly instead of inventing them.

## Environments

- local:
- preview:
- production:

Secrets never belong in this repository.

## Technical boundaries requiring a decision gate

List only choices that create meaningful lock-in, migration cost or operational risk.

- [Example: primary database/provider boundary]

## Architecture decisions

Durable rationale lives in `DECISIONS.md`. Keep this file focused on the current truth.
