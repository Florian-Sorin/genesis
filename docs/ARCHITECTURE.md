# Architecture technique — [NOM DU PROJET]

<!-- Dernière mise à jour : YYYY-MM-DD -->
<!-- Lire BRIEF.md et FUNCTIONAL.md avant ce fichier. -->
<!-- Référence canonique de la stack, des commandes et des décisions techniques. -->

## 1. Stack

### Frontend

**Framework :**
**Langage :**
**UI :**
**State :**
**Routing :**

### Backend

**Plateforme :**
**BDD :**
**ORM / accès aux données :**
**Auth :**
**Storage :**

### Services tiers

**Emails :**
**Paiement :**
**IA :**
**Cache / Queue :**
**Analytics :**
**Error tracking :**
**Autres :**

### Tests

**Framework unit :**
**Framework E2E / intégration :**
**Couverture cible :** <!-- pas de % arbitraire par défaut -->

### Infra & déploiement

**Hébergement :**
**CI/CD :**
**Commande / procédure de déploiement :**
**Environnements :** <!-- local / preview / staging / production -->
**URL production :**
**Budget infra :**

### Design preview

**Mécanisme :** <!-- route Web, Storybook, Flutter preview, SwiftUI Preview... -->
**Emplacement :**
**Commande :**
**Extensions autorisées :**
**Données fictives :**
**Procédure de portage :**

### Visual QA

**Commande de démarrage :**
**URL de base :**
**Commande de capture / E2E :**
**Navigateurs / appareils disponibles :**
**Captures temporaires :**

Un atelier de design peut être indisponible ou soumis à quota. Le projet doit rester implémentable avec les contrats Git, la preview de la stack et les handoffs locaux.

## 2. Structure du projet

<!-- Adapter à la stack ; ne pas conserver des dossiers fictifs après bootstrap. -->

```text
/
├── src/                 # code applicatif si pertinent
├── server/              # backend/API si pertinent
├── tests/               # tests selon la stack
├── docs/                # contrats Genesis et documentation projet
├── .agents/             # skills portables
├── .claude/             # adaptateurs Claude Code
├── AGENTS.md
└── [autres dossiers réels]
```

Le dossier de preview/playground est éphémère et doit être documenté si utilisé.

## 3. Schéma / modèle de données

<!-- Décrire ici les entités techniques, schémas, relations, migrations et conventions. -->

**Technologie / format :**
**Emplacement schéma / migrations :**
**Convention de migration :**
**Stratégie de rollback/roll-forward :**

### Autorisation

**Mécanisme :** <!-- RLS / règles provider / guards serveur / ACL / autre -->
**Emplacement des règles :**
**Tests d'autorisation :**

Si PostgreSQL/Supabase avec RLS est choisi, documenter les policies attendues. Sinon, décrire le contrôle d'autorisation équivalent conformément à `docs/SECURITY.md`.

## 4. Conventions de code

### Nommage

**Composants / types :**
**Fonctions / variables :**
**Fichiers :**
**BDD / collections :**
**Branches :**

### Patterns à suivre

-
-

### Patterns interdits

-
-

Ne jamais ajouter une dépendance structurante sans l'inscrire ici ou dans un ADR.

## 5. Tests

### Stratégie

- Couvrir les parcours critiques en E2E/intégration lorsqu'ils protègent réellement contre une régression utilisateur.
- Couvrir la logique métier complexe en tests unitaires.
- Ne pas imposer de pourcentage de couverture arbitraire.
- Éviter les snapshots pixel-perfect comme stratégie principale ; utiliser `VISUAL-QA.md` pour le rendu.
- Un test flaky est réparé ou supprimé, jamais toléré comme état permanent.

### Organisation

**Tests unitaires :**
**Tests E2E / intégration :**
**Fixtures :**
**Mécanisme de reset / isolation :**

Toute story liste les tests qu'elle ajoute ou modifie.

## 6. Workflow Git

**Branche principale :** `main`
**Convention branches stories :** `st-XXX-slug-court`
**Convention commits :** `[ST-XXX] description courte`
**Stratégie merge :**
**Protection de branche :**

### Tags / versioning

**Versioning :** semver / autre
**Convention tags :**

Une release correspond à un état déployable validé par `docs/RELEASE.md`, pas seulement à une story terminée.

## 7. Langue & i18n

**Langue du code :** anglais par défaut
**Langue documentation :** français par défaut
**Langue(s) produit :**
**Bibliothèque i18n :**
**Stockage traductions :**
**Fallback :**

## 8. Décisions techniques — ADR

### ADR-001 — [Titre]

**Statut :** `accepté` | `rejeté` | `en discussion`
**Date :** YYYY-MM-DD
**Contexte :**
**Décision :**
**Alternatives :**
**Conséquences :**

Ajouter un ADR pour les décisions dont le pourquoi sera utile lors d'un futur changement.

## 9. Variables d'environnement

<!-- Liste exhaustive sans valeurs secrètes. Doit rester synchronisée avec .env.example. -->

```bash
APP_URL=
# [NOM_VAR]=
```

Pour chaque variable sensible, préciser par son usage si elle est client-safe ou strictement serveur ; ne jamais déduire la sécurité d'un nom seul.

## 10. Points d'attention

<!-- Risques, dettes et sujets techniques à surveiller. -->

-
-

## 11. Commandes projet et Quality Gate

<!-- Référence exécutée par docs/QUALITY.md. Utiliser "non applicable — raison" si nécessaire. -->

**Installation :**
**Développement :**
**Lint / format check :**
**Typecheck / analyse statique :**
**Tests unitaires :**
**Tests E2E / intégration :**
**Build production :**
**Audit dépendances / sécurité :**

### Environnement de test

**Données / seeds :**
**BDD / services isolés :**
**Comptes de test :**
**Parcours critiques :**

Aucune commande n'est imposée par Genesis : elle doit correspondre à la stack réellement choisie.

## 12. Production readiness

Référence : `docs/OPERATIONS.md`.

**Error tracking :**
**Logs :**
**Health / uptime :**
**Backup / restauration :**
**Analytics produit :**
**Performance :**
**Coûts / quotas critiques :**

Les décisions détaillées restent dans `OPERATIONS.md`; cette section indique les mécanismes techniques retenus.

## 13. Release

Référence : `docs/RELEASE.md`.

**Mécanisme de déploiement :**
**Smoke tests :**
**Rollback / roll-forward :**
**Notes de release :**
