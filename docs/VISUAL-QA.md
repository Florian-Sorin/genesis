# Visual QA — procédure légère

<!-- À adapter à la stack dans ARCHITECTURE.md. Aucun outil local n’est obligatoire. -->

## But et sources

La Visual QA vérifie l’implémentation après les tests fonctionnels. Comparer, dans cet ordre, au comportement de `FUNCTIONAL.md`, à `design/visual-direction.md`, à `DESIGN.md`, au handoff et à sa référence approuvée. Une image ne peut jamais redéfinir une règle métier. Conduire la critique mesurable avec le skill `genesis-design-critic`.

## Prérequis par projet

Renseigner dans `ARCHITECTURE.md` : commande de démarrage, URL de base, commande E2E, navigateurs disponibles et emplacement temporaire des captures. Utiliser Playwright seulement s’il appartient déjà à la stack ou si le projet l’adopte par ADR ; une inspection navigateur manuelle reste un fallback valide.

Les données de recette doivent être déterministes, non sensibles et couvrir contenu court/long ainsi que les états pertinents. Ne jamais placer un secret ou des données personnelles dans une capture versionnée.

## Boucle par écran

1. Lancer l’application avec la commande déclarée dans `ARCHITECTURE.md`.
2. Ouvrir la route et préparer l’état décrit dans le handoff.
3. Capturer mobile, tablette, desktop et grand desktop. Fixer les dimensions dans `DESIGN.md` et le handoff ; justifier toute classe non pertinente.
4. Contrôler dans cet ordre : structure et contenu, responsive, composants/tokens, états et interactions, accessibilité, puis finitions.
5. Classer chaque écart : `bloquant`, `majeur`, `mineur` ou `intentionnel`.
6. Corriger la source appropriée : code pour une divergence, handoff/`DESIGN.md` pour une décision approuvée, `FUNCTIONAL.md` si le comportement produit change.
7. Scorer le rendu, répondre au risque d’AI slop et sélectionner trois problèmes racines maximum.
8. Relancer les checks affectés et reprendre les mêmes captures : deux passes par défaut, trois maximum, puis appliquer les seuils du critic.
9. Compléter la revue d’implémentation du handoff et passer l’écran à `implemented` après validation humaine.

## Checklist minimale

- [ ] Hiérarchie, textes, composants et états correspondent au contrat.
- [ ] Aucun débordement ni perte d’action aux tailles cibles et avec contenu long.
- [ ] Navigation clavier, ordre du focus et focus visible vérifiés.
- [ ] Labels, structure sémantique, erreurs et états disabled vérifiés.
- [ ] Contrastes et cibles tactiles respectent la cible WCAG/RGAA de `DESIGN.md`.
- [ ] Animations compatibles avec `prefers-reduced-motion` lorsqu’elles existent.
- [ ] Écarts intentionnels documentés dans la source canonique.

## Captures et comparaison

- Stocker les références approuvées dans `docs/design/screens/SXX/`.
- Stocker les captures d’exécution dans un dossier temporaire ignoré par Git, sauf décision explicite d’en faire des baselines.
- Préférer une comparaison visuelle assistée et une revue humaine à une infrastructure de snapshots pixel-perfect prématurée.
- Ajouter des snapshots Playwright seulement pour les écrans stables dont les régressions ont un coût réel ; masquer les zones dynamiques et fixer données, polices et viewport.

## En local et dans le cloud

La boucle est identique. En local, Open Design peut accélérer l’exploration. Dans Codex Cloud, utiliser la preview de l’application, le navigateur et les captures disponibles. Si aucun navigateur n’est disponible, réaliser les checks documentaires et fonctionnels, marquer la revue visuelle `à faire` et ne pas déclarer l’écran `implemented`.
