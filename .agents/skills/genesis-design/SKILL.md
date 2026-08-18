---
name: genesis-design
description: Concevoir, documenter, implémenter et contrôler l’UX/UI versionnée d’un projet Genesis. Utiliser pour cadrer un parcours, faire évoluer DESIGN.md ou WIREFRAMES.md, préparer un brief d’écran, piloter un outil de design tel qu’Open Design, synchroniser un handoff, implémenter une interface ou effectuer une Visual QA par navigateur et captures.
---

# Genesis Design

## Charger le contrat

Lire, dans cet ordre, `docs/BRIEF.md`, `docs/FUNCTIONAL.md`, `docs/ARCHITECTURE.md`, `docs/SECURITY.md`, `docs/design/design-brief.md`, `docs/design/visual-direction.md`, `docs/DESIGN.md`, puis les sections utiles de `docs/WIREFRAMES.md`. Pour un module existant, lire aussi son brief, son UI existante et ses handoffs.

Respecter la précédence définie par `AGENTS.md`. Ne jamais déplacer une règle métier dans un document de design ni inventer un composant que la stack ne permet pas d’implémenter raisonnablement.

## Choisir la tâche

- **Fondations** : valider d’abord UX et ambition, utiliser `genesis-art-direction`, puis dériver `DESIGN.md` de la direction approuvée.
- **Module ou écran** : suivre la commande `/design` ou son équivalent décrit dans `.claude/commands/design.md`.
- **Implémentation** : partir du handoff `synced`, réutiliser d’abord les primitives UI déclarées dans `ARCHITECTURE.md`, puis porter le résultat dans le code final.
- **Visual QA** : suivre `docs/VISUAL-QA.md` et utiliser `genesis-design-critic` après les tests fonctionnels.

## Concevoir un module

1. Extraire objectifs, parcours, règles, états et contraintes depuis les sources canoniques.
2. Créer le brief depuis `docs/design/_MODULE-BRIEF-TEMPLATE.md` et l’inventaire des écrans dans `WIREFRAMES.md`.
3. Vérifier le gate de `visual-direction.md`, puis valider structure et composition basse fidélité avant les composants.
4. Produire au plus trois variantes utiles. Documenter les décisions responsive et d’accessibilité dès cette étape.
5. Utiliser Open Design comme atelier principal. En cas d’indisponibilité, appliquer les mêmes entrées et livrables dans la preview ; ne jamais rendre un service externe bloquant.
6. Après validation humaine, synchroniser chaque écran depuis `docs/design/screens/_SCREEN-HANDOFF-TEMPLATE.md`, avec recette, référence ou dérogation textuelle, états et viewports.
7. Mettre à jour `DESIGN.md` uniquement pour les règles réutilisables ; garder les particularités dans le handoff.

## Implémenter et valider

1. Vérifier que l’écran est `synced` et que le choix de wireframe a été confirmé.
2. Réutiliser les composants existants avant d’en créer. Ne pas copier aveuglément du code généré par un atelier.
3. Implémenter les états nominal, vide, chargement, erreur et disabled pertinents, ainsi que clavier, focus, labels, contraste et réduction des animations.
4. Exécuter les tests prévus par `ARCHITECTURE.md`.
5. Lancer l’application, capturer mobile, tablette, desktop et grand desktop, puis appliquer la boucle limitée de `docs/VISUAL-QA.md` et le scoring du critic.
6. Conserver les références approuvées ; ne versionner les captures d’exécution que si le projet le décide explicitement.
7. Documenter tout écart intentionnel dans la bonne source, puis passer l’écran à `implemented` seulement après validation.

## Règles de sortie

Terminer par un résumé des fichiers modifiés, des décisions prises, des checks exécutés et des écarts restants. Si une décision produit ou métier manque, s’arrêter et demander un arbitrage plutôt que de la déduire du visuel.
