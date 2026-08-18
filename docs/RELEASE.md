# Release — [NOM DU PROJET]

<!-- Procédure canonique de mise en production. La commande /release l'exécute sans recopier cette checklist. -->

## Principe

Une story `[done]` signifie que son périmètre est terminé. Une **release** signifie que l'état complet à déployer est vérifié, déployé, observé puis tagué.

Genesis ne choisit pas l'hébergeur ni la CI/CD : `ARCHITECTURE.md` décrit la cible et les commandes, `QUALITY.md` décrit le gate technique, `OPERATIONS.md` décrit l'exploitation.

## Pré-release

- [ ] La révision à déployer est clairement identifiée.
- [ ] Le Quality Gate release de `docs/QUALITY.md` est vert.
- [ ] `/sync-doc` ne remonte aucune incohérence bloquante.
- [ ] Les variables d'environnement et secrets nécessaires existent dans la cible.
- [ ] Les migrations BDD éventuelles ont été relues.
- [ ] Une stratégie de rollback ou de roll-forward est connue pour les changements risqués.
- [ ] Le backup/restauration est adapté au risque des données modifiées.
- [ ] Les notes de release nécessaires sont prêtes si des utilisateurs doivent être informés.

## Déploiement

1. Déployer avec le mécanisme déclaré dans `ARCHITECTURE.md`.
2. Ne jamais exécuter manuellement une procédure différente sans la documenter si elle devient la nouvelle norme.
3. Pour une migration destructive ou difficilement réversible, appliquer l'ordre de déploiement documenté par l'ADR correspondant.

## Vérification post-déploiement

- [ ] L'application répond sur l'URL de production.
- [ ] Les parcours critiques ou smoke tests passent en production ou dans l'environnement de validation prévu.
- [ ] Auth, paiement et action métier principale sont vérifiés si concernés.
- [ ] Aucun pic d'erreurs critique n'apparaît dans les outils définis par `OPERATIONS.md`.
- [ ] Les migrations attendues sont appliquées.
- [ ] Les assets, emails, webhooks et tâches asynchrones critiques fonctionnent si concernés.

Si un bloqueur apparaît : arrêter la release et appliquer la stratégie de rollback/roll-forward prévue. Documenter l'incident si son apprentissage est durable.

## Clôture

- [ ] Taguer la révision déployée selon le versioning du projet.
- [ ] Publier les notes de release si pertinentes.
- [ ] Mettre à jour `JOURNAL.md` uniquement si une décision ou un apprentissage mérite d'être retenu.
- [ ] Vérifier que la prochaine version peut repartir d'un `main` propre et déployable.

## Premier lancement public

Avant le tout premier lancement public, exécuter également la checklist de `docs/OPERATIONS.md` et l'audit de lancement de `docs/SECURITY.md`.
