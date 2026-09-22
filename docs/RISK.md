# Risk contract

> Activate proportionally. A `sensitive` project should complete this deliberately; an experiment may mark most sections non-applicable.

## Risk profile

- Genesis profile: [experiment / product / sensitive]
- sensitive personal data: [none / describe]
- payments / money movement: [none / describe]
- destructive actions: [none / describe]
- user-generated content / uploads: [none / describe]
- AI acting on untrusted content: [none / describe]
- regulatory / contractual constraints: [none / describe]

## Authorization

For every private resource or action, state who can read, create, update and delete it.

Do not rely on UI visibility as authorization.

## Data handling

| Data | Purpose | Storage | Retention / deletion | Sent to third parties |
|---|---|---|---|---|
| | | | | |

## Abuse and failure

Document plausible high-impact failure modes and the control that reduces each one.

| Failure / abuse | Impact | Control |
|---|---|---|
| | | |

## Sensitive decision gates

Explicit approval is required before materially changing:

- sensitive-data collection or retention;
- authorization model;
- destructive behaviour;
- payment behaviour;
- exposure of private data to a new third party;
- security posture of a public release.

## Incident minimum

For a public product, identify how to:

- revoke or rotate secrets;
- disable a dangerous feature or integration;
- identify affected users/data when feasible;
- restore or reconstruct important non-reproducible data when applicable.
