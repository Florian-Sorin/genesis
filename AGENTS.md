# Agent contract

Genesis exists to preserve intent and constraints, not to micromanage capable models.

## Start here

For any non-trivial task:

1. Read `genesis.yaml`.
2. Read the active outcome in `docs/WORK.md`.
3. Load only the contracts the task can materially affect.
4. Execute until the outcome is achieved, a real blocker appears, or a decision gate requires human approval.
5. Report evidence, changed contracts and unresolved risks.

Do not load every document by default.

## Contract routing

- project intent / scope / success → `docs/PROJECT.md`
- user behaviour / product rules / flows → `docs/PRODUCT.md`
- architecture / data / dependencies / commands / environments → `docs/TECH.md`
- security / privacy / authorization / high-impact risk → `docs/RISK.md`
- experience / visual direction / interaction principles → `docs/DESIGN.md`
- current outcome / scope / evidence → `docs/WORK.md`
- release / production readiness → `docs/SHIP.md`
- durable rationale worth preserving → `docs/DECISIONS.md`

Code is canonical for implementation details. Documentation should capture decisions, not restate code.

## Decision gates

Require explicit human approval only for:

- project outcome, target user or MVP boundary;
- architecture with meaningful lock-in or migration cost;
- sensitive-data handling, authorization or destructive behaviour;
- primary product flow or major visual direction;
- public release, irreversible production migration/action or material spend.

Do not invent extra approval points because a task is large.

## Working rules

- Prefer a coherent vertical outcome over tiny artificial tasks.
- Do not introduce a new technology without updating `TECH.md` when it changes a technical boundary.
- Do not infer missing product rules from UI or implementation details.
- Do not claim a check passed unless it was executed or directly verified.
- Keep changes within the active outcome unless an adjacent fix is required for correctness.
- If implementation reveals that a contract is wrong, update the contract intentionally; do not silently code around it.
- Record a decision only when future agents would otherwise have to rediscover its rationale.
- Adapters are optional. They never override these rules.

## Completion

A work unit is complete when:

- its outcome in `WORK.md` is demonstrably achieved;
- required evidence exists;
- affected contracts match reality;
- applicable tests/checks are green;
- no known blocker is hidden;
- any required decision gate was approved.

If the work changes release readiness, update `SHIP.md`.
