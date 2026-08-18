# Quality Gate — [NOM DU PROJET]

<!-- Contrat canonique des vérifications techniques avant qu'une story ou une release soit déclarée prête. -->
<!-- Les commandes /done et /release l'exécutent ; elles ne recopient pas cette checklist. -->

## Principe

La qualité n'est pas un outil imposé par Genesis. Chaque projet déclare dans `ARCHITECTURE.md` section 11 les commandes réellement applicables à sa stack, puis les exécute systématiquement aux moments définis ci-dessous.

## Commandes projet à déclarer

Renseigner `ARCHITECTURE.md` section 11 :

- **Lint / format check :** commande ou `non applicable — raison`.
- **Typecheck / analyse statique :** commande ou `non applicable — raison`.
- **Tests unitaires :** commande ou `non applicable — raison`.
- **Tests E2E / intégration :** commande ou `non applicable — raison`.
- **Build production :** commande ou `non applicable — raison`.
- **Audit sécurité dépendances :** commande/procédure ou `non applicable — raison`.

## Gate story

Avant `/done` :

- [ ] Les tâches et critères de done de la story sont satisfaits.
- [ ] Le lint/format check applicable passe.
- [ ] Le typecheck ou l'analyse statique applicable passe.
- [ ] Les tests unitaires concernés passent.
- [ ] Les tests E2E/intégration prévus pour la story passent.
- [ ] Le build production passe lorsque la story peut affecter compilation, bundling ou packaging.
- [ ] Aucun test n'est skippé pour masquer une régression.
- [ ] Aucune erreur ou warning nouvellement introduit et actionnable n'est ignoré sans justification.
- [ ] Pour une story UI, la Visual QA de `VISUAL-QA.md` est terminée.
- [ ] Les documents canoniques concernés ont été synchronisés.

Si une vérification ne peut pas être exécutée pour une raison d'environnement, noter clairement ce qui manque et ne pas présenter le résultat comme validé.

## Gate release

Avant une release :

- [ ] Le Quality Gate complet est vert sur la révision à déployer.
- [ ] Les parcours critiques E2E ou smoke tests passent dans un environnement représentatif.
- [ ] Les migrations éventuelles ont été relues et leur stratégie de retour arrière est connue.
- [ ] Les dépendances critiques n'ont pas de vulnérabilité connue non arbitrée.
- [ ] Les variables d'environnement nécessaires sont documentées et disponibles dans la cible.

## Règles de stabilité

- Ne pas imposer un pourcentage de couverture arbitraire.
- Ne pas ajouter un outil uniquement pour satisfaire Genesis : préférer les outils naturels de la stack.
- Un test flaky doit être réparé ou supprimé ; il n'est jamais accepté comme bruit permanent.
- Un échec de build, typecheck, sécurité ou parcours critique est bloquant tant qu'il n'est pas explicitement arbitré.
