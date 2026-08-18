# /release

Prépare, exécute et vérifie une release selon les contrats Genesis.

> **Sources canoniques :** `docs/RELEASE.md`, `docs/QUALITY.md`, `docs/OPERATIONS.md`, `docs/SECURITY.md` et `docs/ARCHITECTURE.md`.

## Instructions

1. Lire `docs/RELEASE.md` et exécuter sa procédure dans l'ordre.
2. Exécuter le Gate release de `docs/QUALITY.md` avec les commandes déclarées dans `ARCHITECTURE.md`.
3. Exécuter `/sync-doc` et bloquer sur toute incohérence critique.
4. Vérifier les secrets, variables, migrations, backup et stratégie rollback/roll-forward applicables.
5. Déployer uniquement avec le mécanisme documenté dans `ARCHITECTURE.md`, sauf arbitrage explicite qui met à jour la documentation.
6. Exécuter les vérifications post-déploiement et smoke tests prévus par `docs/RELEASE.md`.
7. Vérifier les signaux d'exploitation de `docs/OPERATIONS.md` lorsqu'ils existent.
8. En cas de bloqueur, arrêter la release et appliquer la stratégie de récupération prévue ; ne pas taguer un état non validé.
9. Si tout est vert, clôturer et taguer selon le versioning du projet.

## Règle anti-dérive

Toute évolution de la procédure de release se fait dans `docs/RELEASE.md`, jamais dans cette commande.
