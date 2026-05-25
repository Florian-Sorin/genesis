# Backlog — [NOM DU PROJET]

<!-- Index du backlog. Chaque story a son propre fichier dans docs/stories/. -->
<!-- Dernière mise à jour : YYYY-MM-DD -->
<!-- Lire FUNCTIONAL.md et ARCHITECTURE.md avant ce fichier. -->
<!--                                                            -->
<!-- USAGE AGENT :                                              -->
<!-- 1. Lire cet index, identifier la première story [todo].    -->
<!-- 2. Ouvrir docs/stories/ST-XXX-*.md correspondant.          -->
<!-- 3. Vérifier la Definition of Ready (AGENTS.md).            -->
<!-- 4. Implémenter. Marquer [done] ici ET dans le fichier story.-->
<!-- 5. Ne jamais travailler sur plusieurs stories simultanément.-->

---

## Statuts

- `[todo]`    — à faire, prête à être prise
- `[wip]`     — en cours (une seule à la fois)
- `[done]`    — terminée et mergée
- `[blocked]` — bloquée, raison dans le fichier de la story
- `[draft]`   — rédigée mais pas prête (Definition of Ready non remplie)

---

## Règles de gestion du backlog

1. Travailler les stories dans l'ordre numérique, sauf instruction explicite contraire.
2. Passer une story à `[wip]` avant de commencer à coder (ici **et** dans le fichier).
3. Vérifier la Definition of Ready (cf. `AGENTS.md`) avant de démarrer.
4. Cocher les tâches techniques dans le fichier de la story au fur et à mesure.
5. Passer à `[done]` uniquement quand la Definition of Done est satisfaite.
6. Si un blocage est rencontré, passer à `[blocked]` et expliquer pourquoi dans les notes du fichier.
7. Ne jamais modifier les stories `[done]` — créer une nouvelle story `ST-XXX-fix` si correctif nécessaire.
8. Si une story nécessite de mettre à jour `FUNCTIONAL.md`, `ARCHITECTURE.md` ou `SECURITY.md`, le faire avant `[done]`.
9. Ajouter une entrée dans `JOURNAL.md` si la story a révélé un apprentissage notable.

---

## Convention de nommage des fichiers

`docs/stories/ST-XXX-slug-court.md`

- `XXX` : ID sur 3 chiffres, incrémental (`001`, `002`, ..., `099`, `100`).
- `slug-court` : kebab-case, 2-5 mots descriptifs.
- Exemple : `docs/stories/ST-001-setup-supabase-auth.md`.

---

## Backlog MVP

<!-- Stories ordonnées par priorité. L'ordre est la loi. -->
<!-- Format : | ID | Statut | Titre | Dépend de | Écrans | -->
<!-- Les markers BACKLOG_MVP_START/END délimitent la zone éditée par scripts/new-story.mjs. -->

<!-- BACKLOG_MVP_START -->
| ID     | Statut   | Titre                              | Dépend de | Écrans |
|--------|----------|------------------------------------|-----------|--------|
| ST-001 | `[todo]` | [Titre court et actionnable]       | —         | S01    |
| ST-002 | `[todo]` | [Titre]                            | ST-001    | —      |
<!-- BACKLOG_MVP_END -->

---

## Backlog V2

<!-- BACKLOG_V2_START -->
| ID     | Statut    | Titre   | Dépend de | Écrans |
|--------|-----------|---------|-----------|--------|
| ST-020 | `[draft]` | [Titre] | —         | —      |
<!-- BACKLOG_V2_END -->

---

## Stories terminées

<!-- Index des stories [done]. -->
<!-- Les fichiers `[done]` peuvent être déplacés vers docs/stories/done/ via scripts/archive-stories.mjs. -->
<!-- Cette table reste à plat (pas de markers) car gérée par /done. -->

| ID  | Titre | Terminée le |
|-----|-------|-------------|
|     |       |             |
