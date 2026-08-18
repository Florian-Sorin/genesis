# /design [module]

Conçoit ou met à jour un module avec le workflow Genesis, indépendamment de l’atelier utilisé. Le skill portable `.agents/skills/genesis-design/SKILL.md` décrit la même procédure pour Codex et les agents compatibles.

## 1. Charger le contexte

Lire dans l’ordre `BRIEF.md`, `FUNCTIONAL.md`, `ARCHITECTURE.md`, `SECURITY.md`, `design/design-brief.md`, `design/visual-direction.md`, `DESIGN.md`, puis les sections concernées de `WIREFRAMES.md`. Lire l’UI et les handoffs existants.

## 2. Préparer et valider le brief

1. Créer ou mettre à jour `docs/design/modules/[module].md` depuis `_MODULE-BRIEF-TEMPLATE.md`.
2. Référencer les sources canoniques sans recopier leurs règles.
3. Décrire parcours, écrans, états, contenu représentatif, viewports, responsive, accessibilité et hors scope.
4. Mettre l’index et les sections de `WIREFRAMES.md` à jour.
5. Présenter le brief et attendre la validation du développeur avant la génération visuelle.
6. Si la direction n’est pas approuvée, arrêter et exécuter `genesis-art-direction` avant Open Design.

## 3. Explorer dans l’atelier disponible

1. Valider d’abord une structure basse fidélité.
2. Explorer au maximum deux ou trois directions réellement distinctes.
3. Faire sélectionner explicitement une direction.
4. Grouper les retours : structure, contenu, hiérarchie, composants, responsive et accessibilité.
5. Vérifier interactions et états dans la passe finale.

Open Design est l’atelier principal ; Design Intelligence prépare son entrée et critique sa sortie. Si Open Design est indisponible, la preview peut produire les mêmes livrables sans changer de workflow.

## 4. Synchroniser le handoff

Pour chaque écran approuvé :

1. Créer `docs/design/screens/SXX/README.md` depuis `_SCREEN-HANDOFF-TEMPLATE.md`.
2. Ajouter `reference.png` si une référence visuelle existe, `prompt.md`, les assets utiles et éventuellement un export généré clairement identifié.
3. Documenter source, version, viewports, structure, interactions, états, composants, tokens, adaptation, accessibilité et écarts connus.
4. Passer à `synced` uniquement quand l’implémentation est reproductible. Une dérogation textuelle explicite peut remplacer l’image pour un écran trivial.

## 5. Gate et Visual QA

Produire la checklist du « Gate module » de `KICKOFF.md`. Sur prototype puis après implémentation, exécuter `genesis-design-critic` et `docs/VISUAL-QA.md`, avec deux passes par défaut et trois maximum. Reporter scores, AI slop et corrections dans le handoff. Ne créer les stories qu’après validation.
