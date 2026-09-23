# Ship contract

> Shipping is evidence-based. Adapt the checks to the project rather than copying a universal release ritual.

## Release target

- environment:
- deployment mechanism:
- rollback / roll-forward mechanism:

## Required evidence

Before a public release, verify what is applicable:

- [ ] active work outcome is complete;
- [ ] lint / static analysis;
- [ ] tests that protect changed behaviour;
- [ ] production build;
- [ ] critical user flow smoke test;
- [ ] migrations reviewed and recovery path understood;
- [ ] secrets / configuration present without being committed;
- [ ] authorization and sensitive paths reviewed if affected;
- [ ] observability sufficient to detect meaningful failure;
- [ ] important non-reproducible data has an adequate recovery strategy;
- [ ] known limitations are acceptable.

A check that is not applicable should be marked N/A with a reason.

## Operational signals

- error tracking / logs:
- uptime / health, if useful:
- analytics tied to PROJECT success signal:
- quotas / variable costs:
- backup / restore:

## Human release gate

Public release, irreversible production migration/action and material spend require explicit approval.

## Post-release

- smoke test:
- error/signals check:
- rollback trigger:
- learning to preserve, if any:
