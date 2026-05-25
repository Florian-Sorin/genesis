# scripts/

Scripts utilitaires Node.js (ESM, sans dépendances). Cross-platform : marchent sur Windows, macOS, Linux avec Node 18+.

## Prérequis

- Node.js ≥ 18.
- Lancer depuis la racine du projet.

## Scripts disponibles

### `new-story.mjs`

Crée une nouvelle story interactivement.

```bash
node scripts/new-story.mjs
```

Ce qu'il fait :

1. Détecte le prochain ID en scannant `docs/stories/` et `docs/stories/done/`.
2. Demande : titre, priorité, dépendances, écrans, module.
3. Copie `docs/stories/_TEMPLATE.md` en `docs/stories/ST-XXX-slug.md`.
4. Insère une ligne dans le backlog approprié (MVP ou V2) de `docs/STORIES.md`, entre les markers `BACKLOG_MVP_START/END` ou `BACKLOG_V2_START/END`.
5. Affiche les prochaines étapes (compléter la story, `/ready`, créer la branche Git).

À compléter manuellement après création : contexte, tâches techniques, fichiers concernés, tests, critères de done, et section "Impact sécurité" si applicable.

### `archive-stories.mjs`

Déplace les stories `[done]` de `docs/stories/` vers `docs/stories/done/` pour garder le dossier actif propre.

```bash
# Mode normal (avec confirmation)
node scripts/archive-stories.mjs

# Mode dry-run (liste sans déplacer)
node scripts/archive-stories.mjs --dry-run

# Sans confirmation interactive (pour CI/scripts)
node scripts/archive-stories.mjs --yes
```

Ce qu'il fait :

1. Scanne `docs/stories/*.md` (hors `_TEMPLATE.md` et `README.md`).
2. Identifie les fichiers dont le statut est `[done]`.
3. Liste les stories à archiver, demande confirmation.
4. Déplace chaque fichier vers `docs/stories/done/`.
5. Laisse `docs/STORIES.md` intact (la table "Stories terminées" reste à plat).

Quand l'utiliser :

- Quand `docs/stories/` dépasse 15-20 fichiers et que les `[done]` polluent le scan.
- À la fin d'une release / d'un cap de stories.
- Jamais en plein milieu d'une session (préfère laisser `/done` faire son travail puis archiver en lot).

### `archive-mockups.mjs`

Archive les pré-maquettes de `src/playground/` vers `docs/assets/playground-archive/` à la fin d'un MVP, pour nettoyer le dossier de travail tout en gardant une trace historique.

```bash
# Mode normal (archive + maintient INDEX.md)
node scripts/archive-mockups.mjs

# Mode dry-run (liste sans déplacer)
node scripts/archive-mockups.mjs --dry-run

# Sans confirmation interactive
node scripts/archive-mockups.mjs --yes

# Suppression pure (pas d'archive, à utiliser avec parcimonie)
node scripts/archive-mockups.mjs --delete
node scripts/archive-mockups.mjs --delete --yes
```

Ce qu'il fait :

1. Scanne `src/playground/` pour les fichiers UI (`.vue`, `.jsx`, `.tsx`, `.svelte`, `.html`).
2. Tente d'extraire l'ID d'écran (S01, S02…) depuis le nom de fichier ou un commentaire en tête.
3. En mode normal : déplace chaque fichier vers `docs/assets/playground-archive/` et met à jour `INDEX.md` (nom, date, écran).
4. En mode `--delete` : supprime sans archiver.
5. Gère les conflits de noms en suffixant par la date courante (`s01-login.vue` → `s01-login.2026-05-25.vue`).

Quand l'utiliser :

- À la fin du MVP, quand toutes les maquettes playground ont été portées (statut `portée` dans `WIREFRAMES.md`).
- Pour faire de la place avant une release majeure.
- **Pas pendant une story en cours** — risque de perdre du travail non porté.

Cycle de vie complet : cf. `docs/KICKOFF.md` section "Le dossier `src/playground/`".

## Pourquoi Node.js et pas Bash ?

- Cross-platform : marche identiquement sur Windows PowerShell, macOS, Linux, WSL, Git Bash.
- Zero dépendance : utilise uniquement les modules natifs (`fs`, `path`, `readline`).
- Plus robuste que Bash pour parser et modifier des fichiers Markdown.
- Node est probablement déjà installé pour la majorité des projets SaaS.

## Ajouter un nouveau script

Conventions :

- ESM (`.mjs`), pas CommonJS.
- Shebang `#!/usr/bin/env node` en première ligne.
- Pas de dépendances npm — utiliser uniquement les modules natifs.
- Documenter dans ce README avant de merger.
- Si le script modifie l'index `STORIES.md` ou les stories, prévoir un mode `--dry-run`.
