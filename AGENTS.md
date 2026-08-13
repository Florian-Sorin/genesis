# Instructions agent — [NOM DU PROJET]

<!-- Source de vérité unique pour tous les agents IA (Cursor, Claude Code, etc.). -->
<!-- Lu automatiquement à chaque session. -->
<!-- Prime sur tout autre fichier du repo en cas de contradiction. -->
<!-- Garder ce fichier concis : des règles courtes sont mieux suivies. -->

---

## Contexte projet

<!-- Résumé en 3 lignes max. Ce que l'agent doit savoir avant tout. -->
<!-- Ne pas dupliquer BRIEF.md — juste l'essentiel pour orienter la session. -->

[NOM] est un [type de produit] pour [cible]. Stack : [résumé stack en une ligne].
Développeur solo, side project. Prioriser la simplicité et la maintenabilité.

---

## Démarrer un nouveau projet

Si le repo est encore au stade template (BRIEF.md contient `[NOM DU PROJET]`, pas de story réelle), **ne pas commencer à coder**. Suivre le workflow d'initialisation décrit dans `docs/KICKOFF.md` :

1. **Phase 1** — Pitch brut → `BRIEF.md`
2. **Phase 2** — Interview structurée → `FUNCTIONAL.md` + `ARCHITECTURE.md` + `SECURITY.md`
3. **Phase 3** — Fondations UX/UI → `DESIGN.md`
4. **Phase 4** — Itération par module → Claude Design + handoffs + stories

Commande dédiée : `/init`. Chaque phase a un **gate de validation** (checklist auto + résumé pour validation explicite du dev). Pas de phase suivante sans gate validé.

---

## Ordre de lecture obligatoire

> Avant toute implémentation, lire dans l'ordre :
> 1. `docs/BRIEF.md` — vision et périmètre
> 2. `docs/FUNCTIONAL.md` — spécifications fonctionnelles (**source de vérité comportementale**)
> 3. `docs/ARCHITECTURE.md` — stack et conventions techniques
> 4. `docs/SECURITY.md` — règles de sécurité transverses (RLS, permissions, secrets)
> 5. `docs/DESIGN.md` — système visuel global, composants et accessibilité
> 6. `docs/STORIES.md` — index du backlog → identifier la prochaine story `[todo]`
> 7. `docs/stories/ST-XXX-*.md` — la story active (un fichier par story)
> 8. `docs/WIREFRAMES.md` — section(s) correspondant à la story
> 9. `docs/design/screens/SXX/README.md` — handoff approuvé des écrans concernés
> 10. `docs/JOURNAL.md` — apprentissages des sessions précédentes (skim, pas lecture exhaustive)

---

## Hiérarchie de précédence des documents

En cas de conflit entre documents, l'ordre de précédence est :

1. `AGENTS.md` (ce fichier) — règles agent
2. `docs/SECURITY.md` — la sécurité ne se négocie pas
3. `docs/FUNCTIONAL.md` — comportement attendu
4. `docs/ARCHITECTURE.md` — choix techniques
5. `docs/DESIGN.md` — règles visuelles globales (ne décrit jamais un comportement métier seul)
6. `docs/WIREFRAMES.md` et `docs/design/` — écrans et handoffs approuvés
7. `docs/stories/*.md` — implémentation

Si `WIREFRAMES.md` contredit `FUNCTIONAL.md`, **`FUNCTIONAL.md` gagne** et il faut mettre à jour `WIREFRAMES.md`.

---

## Definition of Ready (avant de commencer une story)

Une story ne peut passer en `[wip]` que si **tous** ces critères sont vrais :

- [ ] Contexte rempli (pas de placeholder vide)
- [ ] Au moins une tâche technique listée
- [ ] Au moins un critère de done listé
- [ ] Toutes les dépendances `Dépend de :` sont `[done]`
- [ ] Le module fonctionnel concerné est entièrement spécifié dans `FUNCTIONAL.md`
- [ ] Si la story référence des écrans, ces écrans existent dans `WIREFRAMES.md` (a minima Route + Contenu + Actions + Lien externe ou prompt)
- [ ] Si la story implémente une UI, chaque écran est `synced` et possède un handoff complet sous `docs/design/screens/SXX/`
- [ ] **Check wireframe au démarrage** : le dev a relu les wireframes des écrans concernés et explicitement choisi entre :
  - ✅ **OK tel quel** → on code
  - ✏️ **Ajustement mineur** → patch `WIREFRAMES.md`, commit dédié `[ST-XXX] adjust wireframes for [écran]`, on code
  - 🔄 **Changement structurel** → stop, remonter à `FUNCTIONAL.md` (cf. `docs/KICKOFF.md` section "Gestion des changements en cours")
- [ ] Si la story touche à la sécurité (auth, données utilisateur, paiement), `SECURITY.md` a été lu et la section "Impact sécurité" de la story est remplie

Si un critère n'est pas rempli : **ne pas démarrer**, signaler ce qui manque et s'arrêter.

---

## Definition of Done (avant de marquer `[done]`)

- [ ] Toutes les tâches techniques cochées
- [ ] Tous les critères de done de la story satisfaits
- [ ] Tests passent (cf. `ARCHITECTURE.md` section Tests)
- [ ] Pas de `console.log` ou code commenté laissé
- [ ] Pour une story UI, revue visuelle et comportementale effectuée et écran passé à `implemented`
- [ ] `FUNCTIONAL.md` mis à jour si une règle métier a évolué
- [ ] `ARCHITECTURE.md` mis à jour si une décision technique a été prise (ADR)
- [ ] Entrée ajoutée dans `JOURNAL.md` si quelque chose de notable a été appris
- [ ] Commit(s) propre(s), branche prête à merger

---

## Règles de travail

### Avant de coder

- Identifier la story `[todo]` active dans `STORIES.md` (index).
- Ouvrir `docs/stories/ST-XXX-*.md` correspondant.
- Vérifier la **Definition of Ready**. Si KO → s'arrêter et signaler.
- Créer la branche Git : `st-XXX-slug-court` à partir de `main`.
- Passer la story à `[wip]` (dans le fichier de la story + dans l'index).
- En cas d'ambiguïté sur le comportement attendu, poser UNE question avant de coder, pas plusieurs.

### Pendant le développement

- **Ne jamais introduire de technologie absente de `ARCHITECTURE.md`.**
- **Ne jamais modifier le schéma de BDD sans mettre à jour `ARCHITECTURE.md` section 3.**
- **Ne jamais créer une table sans RLS** (cf. `SECURITY.md`).
- Cocher les tâches techniques dans le fichier de la story au fur et à mesure.
- Un commit par tâche technique complétée. Format : `[ST-XXX] description courte`.
- Si une décision technique structurante est prise en cours de route, l'ajouter en ADR dans `ARCHITECTURE.md`.
- Si un blocage survient, passer la story à `[blocked]` avec raison dans les notes.

### Après implémentation

- Vérifier la **Definition of Done** (cf. ci-dessus).
- Marquer la story `[done]` dans le fichier + dans l'index.
- Ajouter une entrée dans `JOURNAL.md` (3-5 lignes max) si quelque chose mérite d'être retenu.
- Merger la branche, supprimer la branche locale.
- Ne jamais laisser une story en `[wip]` en fin de session sans note dans les Notes de la story.

---

## Workflow Git

- Branche par story : `st-XXX-slug-court` (ex : `st-001-auth-supabase`).
- Branche source : `main`.
- Commits : `[ST-XXX] description courte` (impératif, < 72 caractères).
- Un commit ≠ une story. Découper par tâche technique complétée.
- Merge en fin de story (PR si en équipe, fast-forward si solo).
- Ne jamais commit directement sur `main`.

---

## Tests

Référence détaillée : `ARCHITECTURE.md` section Tests.

Règles minimales :

- **Tout parcours critique a un test E2E** (auth, paiement, action principale du module).
- **Toute logique métier complexe a un test unitaire** (validation, calcul, transformation).
- **Une story n'est `[done]` que si les tests passent** localement.
- Les tests qui flakent sont supprimés ou réparés immédiatement, jamais skippés.

---

## Sécurité (rappel non-négociable)

Référence détaillée : `docs/SECURITY.md`.

- **Toute nouvelle table → RLS activée + policies écrites avant la première lecture/écriture.**
- **Toute donnée utilisateur → vérifier le scope (qui peut lire / écrire / supprimer).**
- **Tout endpoint manipulant de l'argent → double validation côté serveur, idempotence, logs.**
- Aucun secret en clair dans le code source ou les commits.

---

## Ce que tu ne fais jamais

- Pas de `any` en TypeScript.
- Pas de secrets ou clés API dans le code source.
- Pas de `console.log` laissé en production.
- Pas de librairie ajoutée sans la lister dans `ARCHITECTURE.md`.
- Pas de table créée sans RLS.
- Pas de refactoring hors scope de la story en cours.
- Pas de story `[done]` rouverte — créer `ST-XXX-fix` à la place.
- Pas de commit direct sur `main`.
<!-- ajouter tes règles spécifiques ici -->

---

## Langue & i18n

- **Communication agent ↔ développeur :** français.
- **Code (variables, fonctions, fichiers) :** anglais (`camelCase`, `PascalCase`, `kebab-case`).
- **Messages destinés à l'utilisateur final :** langue cible du produit (cf. `BRIEF.md`).
- **Logs techniques, erreurs internes :** anglais.
- **Commits, branches :** anglais.
- **Documentation (`docs/`, ADR, JOURNAL) :** français.

---

## Comportement attendu

### Communication

- Répondre en français.
- Expliquer brièvement les choix non-évidents, sans justifier chaque ligne.
- Si une tâche est ambiguë, proposer une interprétation et demander confirmation plutôt que de bloquer.
- Signaler proactivement si une implémentation risque de créer une dette technique.

### Style de code

<!-- Pointeurs vers ARCHITECTURE.md — ne pas dupliquer les conventions ici. -->

Appliquer les conventions définies dans `ARCHITECTURE.md` section 4.
En cas de doute sur un pattern, choisir la solution la plus lisible et la plus proche du reste de la codebase.

### Gestion des erreurs

- Toujours gérer les cas d'erreur explicitement — pas de `try/catch` vide.
- Les messages d'erreur utilisateur sont dans la langue cible, les logs techniques en anglais.
- Pour les appels API tiers : timeout, retry, et fallback si pertinent.

---

## Commandes slash (Claude Code)

<!-- Commandes personnalisées dans .claude/commands/. -->
<!-- Pour Cursor, ces actions peuvent être déclenchées en demandant à l'agent directement. -->

- `/init`       — orchestre le workflow d'initialisation d'un nouveau projet (cf. `docs/KICKOFF.md`)
- `/design`     — conçoit ou met à jour un module avec Claude Design et synchronise son handoff
- `/story`      — affiche la story `[wip]` ou `[todo]` suivante avec son contexte complet
- `/ready`      — vérifie la Definition of Ready pour la prochaine story `[todo]`
- `/done`       — vérifie la Definition of Done et marque la story `[wip]` comme `[done]`
- `/new-story`  — guide la création d'une nouvelle story dans `docs/stories/`
- `/sync-doc`   — audite la cohérence entre code et documentation
- `/journal`    — ajoute une entrée dans `JOURNAL.md` à la fin d'une session

---

## Scripts utilitaires

<!-- Cross-platform Node.js. Documentation : scripts/README.md. -->

- `node scripts/new-story.mjs` — création interactive d'une story (ID auto, fichier + index).
- `node scripts/archive-stories.mjs` — déplace les stories `[done]` vers `docs/stories/done/`.
- `node scripts/archive-mockups.mjs` — archive les pré-maquettes `src/playground/` vers `docs/assets/playground-archive/` (à lancer en fin de MVP).

**L'agent peut utiliser ces scripts** au lieu de manipuler les fichiers à la main. C'est plus sûr et reproductible.

---

## Structure du repo (rappel)

```
/
├── AGENTS.md           → ce fichier (source de vérité agent)
├── CLAUDE.md           → import vers AGENTS.md (compat Claude Code)
├── .claude/
│   └── commands/       → slash commands Claude Code
├── docs/
│   ├── BRIEF.md
│   ├── FUNCTIONAL.md
│   ├── ARCHITECTURE.md
│   ├── SECURITY.md
│   ├── WIREFRAMES.md
│   ├── DESIGN.md
│   ├── design/          → briefs de modules et handoffs Claude Design
│   ├── KICKOFF.md      → workflow d'initialisation projet (utilisé par /init)
│   ├── STORIES.md      → index du backlog
│   ├── stories/        → un fichier par story
│   │   └── done/       → stories archivées (déplacées par archive-stories.mjs)
│   ├── JOURNAL.md      → mémoire entre sessions
│   └── assets/         → maquettes, exports
│       └── playground-archive/  → pré-maquettes archivées (déplacées par archive-mockups.mjs)
├── scripts/            → utilitaires Node.js (new-story, archive-stories, archive-mockups)
├── src/                → code frontend
│   └── playground/     → pré-maquettes en code (éphémère, archivé en fin de MVP)
└── server/             → code backend / API
```
