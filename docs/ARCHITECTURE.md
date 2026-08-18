# Architecture technique — [NOM DU PROJET]

<!-- Dernière mise à jour : YYYY-MM-DD -->
<!-- Lire BRIEF.md et FUNCTIONAL.md avant ce fichier. -->
<!-- Ce fichier est la référence que l'agent consulte avant tout choix technique. -->
<!-- Ne jamais introduire une technologie absente de ce fichier sans l'y ajouter. -->

---

## 1. Stack

<!-- Liste exhaustive. L'agent ne peut utiliser que ce qui est listé ici. -->

### Frontend

**Framework :**     <!-- ex : Nuxt 3 / Flutter / React -->
**Langage :**       <!-- ex : TypeScript strict -->
**UI :**            <!-- ex : Tailwind v4 + shadcn/vue -->
**State :**         <!-- ex : Pinia / Riverpod / Zustand -->
**Routing :**       <!-- ex : file-based Nuxt / GoRouter -->

### Backend

**Plateforme :**    <!-- ex : Supabase / Railway / Vercel Functions -->
**BDD :**           <!-- ex : PostgreSQL (Supabase) -->
**ORM :**           <!-- ex : Drizzle -->
**Auth :**          <!-- ex : Supabase Auth -->
**Storage :**       <!-- ex : Supabase Storage -->

### Services tiers

**Emails :**        <!-- ex : Resend -->
**Paiement :**      <!-- ex : Lemon Squeezy -->
**IA :**            <!-- ex : Vercel AI SDK + Claude API -->
**Cache / Queue :** <!-- ex : Upstash Redis -->
**Analytics :**     <!-- ex : Plausible -->

### Tests

**Framework unit :**    <!-- ex : Vitest -->
**Framework E2E :**     <!-- ex : Playwright / Cypress -->
**Couverture cible :**  <!-- ex : pas de % imposé, mais 100% des parcours critiques en E2E -->

### Infra & déploiement

**Hébergement :**   <!-- ex : Vercel (front) + Railway (jobs) -->
**CI/CD :**         <!-- ex : GitHub Actions -->
**Budget infra :**  <!-- ex : < 20€/mois hors Supabase -->

### Design preview

**Mécanisme :** <!-- route Web, Storybook, Flutter preview, SwiftUI Preview... -->
**Emplacement :** <!-- chemin dépendant de la stack -->
**Commande :**
**Extensions autorisées :**
**Données fictives :**
**Procédure de portage :**

### Visual QA

**Commande de démarrage :**
**URL de base :**
**Commande de capture / E2E :** <!-- Playwright si déjà retenu, sinon navigateur disponible -->
**Navigateurs disponibles :**
**Captures temporaires :** <!-- dossier ignoré par Git -->

Le code exporté par un atelier de design reste généré et remplaçable tant qu'il n'a pas été porté et relu selon les conventions du projet.

### Risques outils de design

Un atelier externe peut être local, indisponible ou soumis à quota. Le workflow doit rester utilisable avec `DESIGN.md`, `WIREFRAMES.md`, les handoffs locaux et la preview de la stack lorsque l'outil est indisponible.

---

## 2. Structure du projet

<!-- Arborescence cible. L'agent s'y conforme pour créer tout nouveau fichier. -->
<!-- Ne pas détailler chaque fichier — juste les dossiers structurants et leur rôle. -->

```
/
├── src/
│   ├── components/     # composants UI réutilisables
│   ├── pages/          # routes (ou screens/ pour Flutter)
│   ├── composables/    # logique réutilisable (hooks, providers)
│   ├── lib/            # clients tiers, utilitaires
│   ├── types/          # types TypeScript globaux
│   └── playground/     # pré-maquettes en code (éphémère, archivé en fin de MVP)
├── server/
│   ├── api/            # endpoints / edge functions
│   └── db/             # schéma Drizzle, migrations
├── tests/
│   ├── e2e/            # tests bout-en-bout (parcours utilisateur)
│   └── unit/           # tests unitaires (logique métier)
├── docs/               # documentation projet
├── .claude/            # configuration Claude Code (commandes slash)
├── AGENTS.md           # instructions agent (source de vérité)
└── CLAUDE.md           # alias compat Claude Code (import AGENTS.md)
```

> Détail sur `src/playground/` : zone tampon entre la maquette externe (Uizard/Figma/etc.) et l'intégration finale dans `pages/` et `components/`. Versionné pendant le MVP, archivé à la fin via `scripts/archive-mockups.mjs`. Voir `docs/KICKOFF.md` section "Le dossier `src/playground/`" pour le cycle de vie complet.

---

## 3. Schéma de base de données

<!-- Schéma SQL ou pseudo-SQL. Source de vérité pour les entités. -->
<!-- Doit rester synchronisé avec les migrations Drizzle. -->
<!-- Conventions : snake_case pour les colonnes, pluriel pour les tables. -->
<!-- RAPPEL : toute table doit avoir RLS activée. Voir docs/SECURITY.md. -->

```sql
-- [table principale]
CREATE TABLE [nom] (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

ALTER TABLE [nom] ENABLE ROW LEVEL SECURITY;
-- (policies dans SECURITY.md section 3)
```

---

## 4. Conventions de code

<!-- Règles que l'agent applique systématiquement. -->
<!-- Court et actionnable — pas un style guide complet. -->

### Nommage

- Composants : PascalCase
- Fonctions / variables : camelCase
- Fichiers : kebab-case
- Tables BDD : snake_case, pluriel
- Branches Git : `st-XXX-slug-court`
<!-- ajouter tes conventions spécifiques -->

### Patterns à suivre

<!-- ex : toujours typer les retours de fonction -->
<!-- ex : pas de `any` en TypeScript -->
<!-- ex : server-side data fetching par défaut sur Nuxt -->
<!-- ex : composables pour toute logique > 20 lignes -->

-
-

### Patterns interdits

<!-- Ce que l'agent ne doit jamais faire. -->
<!-- ex : pas de useEffect pour du data fetching (utiliser useFetch) -->
<!-- ex : pas d'appel API côté client si faisable server-side -->
<!-- ex : pas de secrets dans le code -->

-
-

---

## 5. Tests

<!-- Référence transverse. Toute story doit prévoir ses tests (cf. template story). -->
<!-- La règle d'or : une story n'est [done] que si les tests passent. -->

### Stratégie

- **Critical path en E2E** : pour chaque parcours utilisateur critique (auth, paiement, action principale), au moins un test E2E qui couvre le happy path.
- **Unit sur logique métier complexe** : validations, calculs, transformations, état machine. Pas besoin de tester les setters triviaux.
- **Pas de tests UI pixel-perfect** — fragile, peu utile.
- **Pas de coverage % imposé** — juger qualité par utilité, pas par chiffre.

### Organisation

```
tests/
├── e2e/
│   └── [module]/         # ex : auth/, billing/, dashboard/
└── unit/
    └── [domaine]/        # ex : validation/, pricing/
```

### Règles

- Un test qui flake est **supprimé ou réparé immédiatement**. Jamais skippé.
- Les tests E2E utilisent un environnement isolé (BDD de test, comptes seed).
- Les fixtures de test vivent dans `tests/fixtures/`.
- Les tests sont écrits **en même temps** que la feature, pas après.

### Critères de couverture par story

Toute story doit, dans son fichier `docs/stories/ST-XXX-*.md`, lister :

- Les tests E2E à ajouter ou modifier.
- Les tests unitaires à ajouter pour la logique métier introduite.

---

## 6. Workflow Git

### Branches

- Branche principale : `main` (protégée, pas de push direct).
- Branche par story : `st-XXX-slug-court` à partir de `main`.
- Branche éphémère : supprimée après merge.

### Commits

- Format : `[ST-XXX] description courte` (impératif, < 72 caractères).
- Granularité : un commit par tâche technique complétée, pas un commit par fichier.
- Pas de commit "WIP" sur `main`. Si besoin de checkpoint, commit local sur la branche.

### Merge

- Solo : fast-forward acceptable, ou merge commit pour garder la trace.
- En équipe : PR obligatoire, au moins une review.
- La branche doit être à jour avec `main` avant merge.
- Tests CI verts obligatoires avant merge.

### Tags

- Releases taguées : `v0.1.0`, `v0.2.0`, etc. (semver).
- Un tag = un état mergeable et déployable.

---

## 7. Langue & i18n

<!-- Référence : AGENTS.md section "Langue & i18n". -->

- **Code** (variables, fonctions, fichiers, branches, commits) : anglais.
- **Messages utilisateur** : langue cible du produit (cf. `BRIEF.md`).
- **Logs techniques, erreurs internes** : anglais.
- **Documentation (`docs/`, ADR, JOURNAL)** : français.

### Infrastructure i18n

<!-- À remplir si le produit est multilingue. Sinon supprimer cette sous-section. -->

**Bibliothèque :**     <!-- ex : i18next, vue-i18n, easy_localization -->
**Langues cibles :**   <!-- ex : fr, en -->
**Stockage clés :**    <!-- ex : JSON par langue dans /locales -->
**Fallback :**         <!-- ex : en par défaut si traduction manquante -->

---

## 8. Décisions techniques (ADR)

<!-- Architecture Decision Records — inline et légers. -->
<!-- Format : contexte → décision → alternatives rejetées → conséquences. -->
<!-- Ajouter une entrée à chaque choix structurant. -->

### ADR-001 — [Titre de la décision]

**Statut :** `accepté` | `rejeté` | `en discussion`
**Date :** YYYY-MM-DD
**Contexte :** <!-- Pourquoi cette décision s'est posée -->
**Décision :** <!-- Ce qui a été choisi -->
**Alternatives :** <!-- Ce qui a été écarté et pourquoi -->
**Conséquences :** <!-- Impact sur le code ou l'archi -->

---

## 9. Variables d'environnement

<!-- Liste exhaustive des variables nécessaires. Jamais les valeurs. -->
<!-- Sert de référence pour le .env.example du repo. -->

```bash
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# [Service]
[NOM_VAR]=     # description courte
```

---

## 10. Points d'attention

<!-- Risques techniques identifiés, dettes connues, sujets à surveiller. -->
<!-- Pas de solution obligatoire — juste une trace pour ne pas oublier. -->

<!-- ex : rate limiting à prévoir sur les endpoints IA -->
<!-- ex : audit RLS avant lancement (cf. SECURITY.md section 10) -->

-
-
