---
name: genesis-workflow
description: Router et exécuter le cycle général d'un projet Genesis hors design : initialisation, sélection et readiness des stories, validation de done, synchronisation documentaire et release. Utiliser avec Codex/ChatGPT ou tout agent compatible avec les skills de dépôt afin d'obtenir le même workflow que les commandes Claude sans dupliquer les checklists.
---

# Genesis Workflow

## Principe

Les documents Markdown sont canoniques. Ce skill route vers eux ; il ne maintient aucune copie des gates.

## Router la demande

- **Initialiser un projet** → `docs/KICKOFF.md`.
- **Charger la prochaine story** → `docs/STORIES.md`, fichier story, module fonctionnel et contexte pertinent.
- **Vérifier qu'une story est prête** → Definition of Ready dans `AGENTS.md`.
- **Terminer une story** → Definition of Done dans `AGENTS.md` + Gate story de `docs/QUALITY.md` + `VISUAL-QA.md` si UI.
- **Auditer la cohérence** → logique de `.claude/commands/sync-doc.md`, en comparant les sources canoniques au code réel.
- **Préparer une release** → `docs/RELEASE.md` + Gate release de `docs/QUALITY.md` + `docs/OPERATIONS.md` + `docs/SECURITY.md`.
- **Travail UX/UI** → router vers `genesis-design`, `genesis-art-direction`, `genesis-design-critic` ou `genesis-motion-design`.

## Chargement minimal du contexte

Toujours lire `AGENTS.md`, puis seulement les documents nécessaires à la tâche. Ne pas charger toute la documentation par réflexe si le périmètre est ciblé.

Pour une story : charger `BRIEF`, le module de `FUNCTIONAL`, les sections utiles d'`ARCHITECTURE` et `SECURITY`, puis les contrats design uniquement si l'UI est concernée.

## Initialisation

Exécuter les phases et gates exactement dans l'ordre de `docs/KICKOFF.md`. Pour un module : design/handoff suffisamment mûr → création/enrichissement des stories → Gate module final. Ne jamais rendre le Gate module final préalable à l'existence des stories qu'il contrôle.

## Ready

Lire la Definition of Ready canonique dans `AGENTS.md`, la vérifier critère par critère et signaler les bloqueurs. Pour une story UI, obtenir l'arbitrage humain prévu sur le wireframe. Ne pas passer automatiquement `[todo]` en `[wip]` sans confirmation.

## Done

Lire la Definition of Done dans `AGENTS.md`, exécuter le Gate story de `docs/QUALITY.md`, puis la Visual QA si applicable. Un check non exécuté ne peut pas être présenté comme vert. Synchroniser les sources canoniques touchées avant de marquer la story `[done]`.

## Sync

Comparer documentation et réalité : stack/dépendances, structure, données/autorisation, stories, écrans/handoffs, variables, quality commands et production readiness. Signaler séparément cohérence, divergences et bloqueurs.

## Release

Exécuter `docs/RELEASE.md` dans l'ordre. Vérifier qualité, sync documentaire, variables/secrets, migrations, stratégie de récupération, déploiement, smoke tests et signaux d'exploitation. Ne taguer que l'état réellement validé.

## Sortie

Terminer par un résumé court des décisions, fichiers modifiés, checks exécutés et éléments restant à arbitrer. Si une règle produit manque, demander l'arbitrage au lieu de la déduire d'un design ou d'une implémentation.
