# docs/stories/

Un fichier par story. L'index global se trouve dans `docs/STORIES.md`.

## Convention

`ST-XXX-slug-court.md`

- `XXX` : ID sur 3 chiffres (`001`, `002`, …).
- `slug-court` : kebab-case, 2-5 mots.

Exemples :

- `ST-001-setup-supabase-auth.md`
- `ST-012-dashboard-stats.md`

## Workflow

1. Pour créer une nouvelle story, copier `_TEMPLATE.md`.
2. Pour mettre à jour le statut, modifier **à la fois** ce fichier et l'index `STORIES.md`.
3. Quand une story est `[done]`, garder le fichier ici (archive vivante) et mettre à jour l'index.

## Fichiers spéciaux

- `_TEMPLATE.md` — modèle, ne jamais l'éditer pour autre chose que faire évoluer la structure de toutes les stories.
