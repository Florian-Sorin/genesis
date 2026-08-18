# /design [module]

Conçoit ou met à jour un module avec le workflow Genesis, indépendamment de l'atelier utilisé. Le skill portable `.agents/skills/genesis-design/SKILL.md` décrit la procédure détaillée pour Codex et les agents compatibles.

> Les gates canoniques restent dans `docs/KICKOFF.md`. Cette commande ne doit jamais en créer une variante concurrente.

## 1. Charger le contexte

Lire dans l'ordre `BRIEF.md`, `FUNCTIONAL.md`, `ARCHITECTURE.md`, `SECURITY.md`, `design/design-brief.md`, `design/visual-direction.md`, `DESIGN.md`, puis les sections concernées de `WIREFRAMES.md`. Lire également l'UI et les handoffs existants.

## 2. Préparer et valider le brief

1. Créer ou mettre à jour `docs/design/modules/[module].md` depuis `_MODULE-BRIEF-TEMPLATE.md`.
2. Référencer les sources canoniques sans recopier leurs règles.
3. Décrire parcours, écrans, états, contenu représentatif, viewports, responsive, accessibilité et hors scope.
4. Mettre l'index et les sections de `WIREFRAMES.md` à jour.
5. Présenter le brief et attendre la validation du développeur avant la génération visuelle.
6. Si la direction n'est pas approuvée, arrêter et exécuter `genesis-art-direction` avant Open Design.

## 3. Explorer dans l'atelier disponible

1. Valider d'abord une structure basse fidélité.
2. Explorer au maximum deux ou trois directions réellement distinctes.
3. Faire sélectionner explicitement une direction.
4. Grouper les retours : structure, contenu, hiérarchie, composants, responsive et accessibilité.
5. Vérifier interactions et états dans la passe finale.

Open Design est l'atelier principal ; Design Intelligence prépare son entrée et critique sa sortie. Si Open Design est indisponible, la preview de la stack peut produire les mêmes livrables sans changer le contrat.

## 4. Synchroniser le handoff

Pour chaque écran approuvé :

1. Créer `docs/design/screens/SXX/README.md` depuis `_SCREEN-HANDOFF-TEMPLATE.md`.
2. Ajouter `reference.png` si une référence visuelle existe, `prompt.md`, les assets utiles et éventuellement un export généré clairement identifié.
3. Documenter source, version, viewports, structure, interactions, états, composants, tokens, adaptation, accessibilité et écarts connus.
4. Passer à `synced` uniquement quand l'implémentation est reproductible. Une dérogation textuelle explicite peut remplacer l'image pour un écran trivial.
5. Exécuter `genesis-design-critic` sur le prototype ou les captures disponibles et corriger les problèmes racines avant de découper le module.

## 5. Passage aux stories

Quand les écrans et handoffs du module sont suffisamment définis et validés pour estimer le travail :

1. Autoriser le découpage en stories.
2. Créer les stories avec `scripts/new-story.mjs` et compléter leurs sections techniques, tests, sécurité et design.
3. Exécuter **ensuite** le Gate module canonique de `docs/KICKOFF.md`.

Le Gate module final contrôle les stories ; il ne peut donc pas être un prérequis à leur création.

## 6. Après implémentation

La Visual QA de `docs/VISUAL-QA.md` est exécutée sur le rendu réel dans le cadre de `/done`, pas comme condition préalable à la création des stories. Reporter score critic, risque d'AI slop, corrections et décision dans le handoff.
