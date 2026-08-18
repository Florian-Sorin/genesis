# /design [module]

Conçoit ou met à jour un module avec le workflow Genesis, indépendamment de l’atelier utilisé. Le skill portable `.agents/skills/genesis-design/SKILL.md` décrit la même procédure pour Codex et les agents compatibles.

## 1. Charger le contexte

Lire dans l’ordre `BRIEF.md`, `FUNCTIONAL.md`, `ARCHITECTURE.md`, `SECURITY.md`, `DESIGN.md`, puis les sections concernées de `WIREFRAMES.md`. Lire les briefs et handoffs existants du module.

## 2. Préparer et valider le brief

1. Créer ou mettre à jour `docs/design/modules/[module].md` depuis `_MODULE-BRIEF-TEMPLATE.md`.
2. Référencer les sources canoniques sans recopier leurs règles.
3. Décrire parcours, écrans, états, contenu représentatif, viewports, responsive, accessibilité et hors scope.
4. Mettre l’index et les sections de `WIREFRAMES.md` à jour.
5. Présenter le brief et attendre la validation du développeur avant la génération visuelle.

## 3. Explorer dans l’atelier disponible

1. Valider d’abord une structure basse fidélité.
2. Explorer au maximum deux ou trois directions réellement distinctes.
3. Faire sélectionner explicitement une direction.
4. Grouper les retours : structure, contenu, hiérarchie, composants, responsive et accessibilité.
5. Vérifier interactions et états dans la passe finale.

Open Design est conseillé quand il est disponible, mais reste optionnel. Codex Cloud peut produire les mêmes livrables dans la preview Web de la stack. Un autre agent ou outil peut appliquer le brief dès lors qu’il restitue le handoff standard.

## 4. Synchroniser le handoff

Pour chaque écran approuvé :

1. Créer `docs/design/screens/SXX/README.md` depuis `_SCREEN-HANDOFF-TEMPLATE.md`.
2. Ajouter `reference.png` si une référence visuelle existe, `prompt.md`, les assets utiles et éventuellement un export généré clairement identifié.
3. Documenter source, version, viewports, structure, interactions, états, composants, tokens, adaptation, accessibilité et écarts connus.
4. Passer à `synced` uniquement quand l’implémentation est reproductible. Une dérogation textuelle explicite peut remplacer l’image pour un écran trivial.

## 5. Gate et Visual QA

Produire la checklist du « Gate module » de `KICKOFF.md`. Après implémentation, exécuter `docs/VISUAL-QA.md` et reporter le résultat dans la section « Revue d’implémentation » du handoff. Ne créer les stories qu’après validation du handoff.
