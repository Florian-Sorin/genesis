# Genesis

> Template de démarrage de projet SaaS — structure documentaire et configuration agent pour développement assisté par IA.

**Version :** `v0.3.0`
**Compatible avec :** Cursor, Claude Code (et tout agent qui lit `AGENTS.md` ou `CLAUDE.md` à la racine).

---

## Pourquoi

La doc dans le repo, pas dans Notion. Une seule source de vérité, lue par l'agent à chaque session.
Une story à la fois, traçable, testée, sécurisée. Le développeur reste le pilote.

---

## Usage

1. Cloner ce repo comme base pour un nouveau projet.
2. Renommer le dossier et initialiser un nouveau repo Git.
3. Remplir les fichiers `docs/` dans l'ordre :
   - `BRIEF.md` → vision et périmètre
   - `FUNCTIONAL.md` → spécifications fonctionnelles (**source de vérité comportementale**)
   - `ARCHITECTURE.md` → stack, conventions, tests, workflow Git
   - `SECURITY.md` → règles non-négociables (RLS, secrets, auth)
   - `WIREFRAMES.md` → maquettes et système de design
   - `STORIES.md` → index du backlog, puis créer les stories dans `docs/stories/`
4. Adapter `AGENTS.md` au projet (contexte, règles spécifiques).
5. Lancer Cursor ou Claude Code — l'agent lit `AGENTS.md` puis suit la chaîne de documentation.

---

## Structure

```
/
├── AGENTS.md             # instructions agent (source de vérité)
├── CLAUDE.md             # alias compat Claude Code (@AGENTS.md)
├── README.md
├── .gitignore
├── .env.example
├── .claude/
│   └── commands/         # slash commands Claude Code
│       ├── story.md
│       ├── ready.md
│       ├── done.md
│       ├── new-story.md
│       ├── sync-doc.md
│       └── journal.md
├── docs/
│   ├── BRIEF.md          # boussole du projet
│   ├── FUNCTIONAL.md     # spécifications fonctionnelles
│   ├── ARCHITECTURE.md   # référence technique (stack, tests, Git)
│   ├── SECURITY.md       # règles de sécurité transverses
│   ├── WIREFRAMES.md     # maquettes & UI
│   ├── STORIES.md        # index du backlog
│   ├── stories/          # un fichier par story
│   │   ├── _TEMPLATE.md
│   │   ├── README.md
│   │   └── done/         # stories archivées
│   ├── JOURNAL.md        # mémoire entre sessions
│   └── assets/           # images, exports
├── scripts/              # utilitaires Node.js cross-platform
│   ├── new-story.mjs     # création interactive d'une story
│   ├── archive-stories.mjs  # archivage des stories [done]
│   └── README.md
└── (à venir après init du projet)
    ├── src/              # code frontend
    ├── server/           # code backend / API
    └── tests/            # tests unit + E2E
```

## Scripts

> Node.js ≥ 18 requis. Lancer depuis la racine. Détails : `scripts/README.md`.

```bash
# Créer une nouvelle story (interactif)
node scripts/new-story.mjs

# Archiver les stories [done] (déplace vers docs/stories/done/)
node scripts/archive-stories.mjs --dry-run   # liste sans déplacer
node scripts/archive-stories.mjs             # déplace avec confirmation
node scripts/archive-stories.mjs --yes       # sans confirmation
```

---

## Principes

- **Source de vérité unique** : la doc vit dans le repo, pas dans Notion ni Linear.
- **Précédence claire** : `AGENTS.md` > `SECURITY.md` > `FUNCTIONAL.md` > `ARCHITECTURE.md` > `WIREFRAMES.md` > stories.
- **Une story à la fois** : `[wip]` unique, branche dédiée, tests obligatoires.
- **Sécurité non-négociable** : RLS sur toutes les tables, secrets jamais en clair.
- **Mémoire entre sessions** : `JOURNAL.md` capture les apprentissages utiles.
- **Multi-agents** : `AGENTS.md` à la racine est le standard émergent (Cursor, Claude Code, Codex…).

---

## Slash commands (Claude Code)

Disponibles dans `.claude/commands/`. Pour Cursor, demander la même action à l'agent en langage naturel donne le même résultat.

| Commande      | Effet |
|---------------|-------|
| `/story`      | Affiche la story `[wip]` ou la prochaine `[todo]` avec tout le contexte |
| `/ready`      | Vérifie la Definition of Ready avant de démarrer une story |
| `/done`       | Vérifie la Definition of Done et marque la story `[done]` |
| `/new-story`  | Guide la création d'une nouvelle story |
| `/sync-doc`   | Audite la cohérence entre code et documentation |
| `/journal`    | Ajoute une entrée d'apprentissage dans `JOURNAL.md` |

---

## Changelog

### v0.3.0 — YYYY-MM-DD

- Ajout `scripts/new-story.mjs` : création interactive d'une story (ID auto, fichier généré, ligne insérée dans l'index entre markers).
- Ajout `scripts/archive-stories.mjs` : déplacement des stories `[done]` vers `docs/stories/done/`, avec options `--dry-run` et `--yes`.
- Markers HTML ajoutés dans `STORIES.md` (`BACKLOG_MVP_START/END`, `BACKLOG_V2_START/END`) pour faciliter les inserts programmatiques.
- Commande `/new-story` mise à jour pour favoriser le script.
- Commande `/sync-doc` étendue (cohérence stories ↔ fichiers, seuil d'archivage).
- Scripts cross-platform Node.js (zéro dépendance, Windows/macOS/Linux/WSL).

### v0.2.0 — YYYY-MM-DD

- Renommage `CLAUDE.md` → `AGENTS.md` (portabilité multi-agents : Cursor, Claude Code).
- `CLAUDE.md` racine devient un import (`@AGENTS.md`) pour compat Claude Code.
- Restructuration des stories : un fichier par story dans `docs/stories/` + `STORIES.md` réduit à un index.
- Ajout `docs/SECURITY.md` : règles RLS, secrets, validation, paiement, incidents.
- Ajout `docs/JOURNAL.md` : mémoire entre sessions (apprentissages durables + entrées de session).
- Ajout sections **tests**, **workflow Git** et **langue/i18n** dans `ARCHITECTURE.md`.
- Ajout **Definition of Ready** et **Definition of Done** explicites dans `AGENTS.md`.
- Ajout des commandes slash `/ready` et `/journal`.
- Ajout `.gitignore` et `.env.example` à la racine.
- Note de précédence `FUNCTIONAL.md > WIREFRAMES.md` ajoutée dans les deux fichiers.
- Convention de nommage des IDs de story formalisée : `ST-XXX` sur 3 chiffres.

### v0.1.0 — 2026-05-23

- Version initiale : 5 fichiers de doc, 4 commandes slash, `CLAUDE.md` unique.
