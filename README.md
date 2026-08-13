# Genesis

> Template de démarrage de projet SaaS — structure documentaire et configuration agent pour développement assisté par IA.

**Version :** `v0.5.0`
**Compatible avec :** Cursor, Claude Code (et tout agent qui lit `AGENTS.md` ou `CLAUDE.md` à la racine).

---

## Pourquoi

La doc dans le repo, pas dans Notion. Une seule source de vérité, lue par l'agent à chaque session.
Une story à la fois, traçable, testée, sécurisée. Le développeur reste le pilote.

---

## Démarrer un nouveau projet

### TL;DR

1. Clone Genesis comme base, renomme, init un nouveau repo Git.
2. Ouvre le projet dans Cursor ou Claude Code.
3. Lance la commande `/init` (ou demande à l'agent : "démarre le workflow d'initialisation").
4. Laisse-toi guider par les **4 phases de conception**, puis par le développement, ci-dessous. Compte ~1 h pour spécifier un projet de bout en bout.

### Le workflow en 4 phases de conception

> Détail complet : [`docs/KICKOFF.md`](docs/KICKOFF.md). Tout le mécanisme de gates de validation et de questions par bloc y est documenté.

```
Phase 1 — Pitch brut
   ↓ [Gate 1 : BRIEF.md validé]
Phase 2 — Fonctionnel, architecture et sécurité
   ↓ [Gate 2]
Phase 3 — Fondations UX/UI
   ↓ [Gate design : DESIGN.md validé]
Phase 4 — Conception par module
   brief → Claude Design → validation → handoff → stories
   ↓ [Gate module]
Développement story par story : /story → /ready → /done
```

**Principe directeur** : pas de phase suivante sans gate validé. Un gate = une checklist automatique (l'agent vérifie que les sections obligatoires sont remplies) + un résumé soumis au dev pour validation explicite. Une story créée sur des bases non validées sera réécrite — autant bloquer en Phase 2 que coder dans le vide.

### Phase 1 — Pitch brut (5 min)

Envoie à l'agent un message libre de 5-15 lignes répondant grosso modo à :

- Qu'est-ce que tu veux construire ? (1 phrase)
- Pour qui ? (utilisateur cible)
- Pourquoi ? (le pain concret, pas une opportunité de marché)
- Stack envisagée ou "à décider"
- Contraintes (budget, timeline, solo)

Pas besoin de rédaction soignée — brain dump suffit. L'agent reformule, te demande confirmation, et remplit `docs/BRIEF.md`.

### Phase 2 — Interview structurée (30-45 min)

L'agent enchaîne 5 blocs de questions ciblées, en validant chaque bloc avant de passer au suivant :

| Bloc | Couvre | Fichier visé |
|------|--------|--------------|
| A — Périmètre fonctionnel | Modules MVP, fonctionnalités principales, hors scope | `FUNCTIONAL.md` |
| B — Parcours utilisateur | Flow de bout en bout du cas d'usage central | `FUNCTIONAL.md` |
| C — Auth, rôles & data | Méthode d'auth, rôles, entités métier | `FUNCTIONAL.md` + `SECURITY.md` |
| D — Stack technique | Frontend / backend / services tiers / hébergement | `ARCHITECTURE.md` |
| E — Sécurité spécifique | MFA, paiement, IA, RGPD | `SECURITY.md` |

À chaque choix structurant, un ADR est ajouté dans `ARCHITECTURE.md` section 8. À la fin, tu as 3 fichiers entièrement spécifiés.

### Phases 3 et 4 — Design puis itération par module

La phase 3 fixe dans `DESIGN.md` les plateformes, principes UX, tokens, composants et exigences d'accessibilité. Le mécanisme de preview adapté à la stack est déclaré dans `ARCHITECTURE.md`.

Pour chaque module MVP, dans l'ordre :

1. **Brief** : `/design [module]` prépare le parcours, les écrans, états et contraintes.
2. **Claude Design** : structure basse fidélité, deux ou trois directions au maximum, correction groupée et prototype interactif.
3. **Handoff** : la variante validée est synchronisée sous `docs/design/screens/SXX/`. Le dépôt conserve les décisions nécessaires à Claude Code, même si Claude Design ou son quota est indisponible.
4. **Stories** : découpage via `node scripts/new-story.mjs`, puis Gate module.

**Avantage de l'itération par module** : tu peux préparer les wireframes du module 2 pendant que tu codes le module 1.

### Et après ?

Une fois au moins une story `[todo]` prête, lance `/story` pour démarrer le codage. Le workflow normal prend le relais :

```
/story  → affiche la prochaine story avec son contexte complet
/ready  → vérifie la Definition of Ready, arbitrage wireframe (OK / ajustement / changement structurel)
[tu codes]
/done   → vérifie la Definition of Done, marque la story [done], propose une entrée JOURNAL
```

### Si tu préfères tout faire à la main

Le workflow `/init` est une orchestration — rien ne t'empêche de remplir les fichiers `docs/*.md` à la main dans l'ordre `BRIEF → FUNCTIONAL → ARCHITECTURE → SECURITY → WIREFRAMES → STORIES`. C'est plus lent mais ça marche, et tu peux toujours basculer en mode assisté en lançant `/init` qui détectera où tu en es.

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
│       ├── init.md
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
│   ├── DESIGN.md         # système visuel global et composants
│   ├── WIREFRAMES.md     # spécifications des écrans
│   ├── design/           # briefs et handoffs Claude Design
│   ├── KICKOFF.md        # workflow d'initialisation (utilisé par /init)
│   ├── STORIES.md        # index du backlog
│   ├── stories/          # un fichier par story
│   │   ├── _TEMPLATE.md
│   │   ├── README.md
│   │   └── done/         # stories archivées
│   ├── JOURNAL.md        # mémoire entre sessions
│   └── assets/           # images, exports, playground-archive/
├── scripts/              # utilitaires Node.js cross-platform
│   ├── new-story.mjs          # création interactive d'une story
│   ├── archive-stories.mjs    # archivage des stories [done]
│   ├── archive-mockups.mjs    # archivage des pré-maquettes playground
│   └── README.md
└── (à venir après init du projet)
    ├── src/
    │   └── playground/   # pré-maquettes en code (éphémère)
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

# Archiver les pré-maquettes (déplace src/playground/ vers docs/assets/playground-archive/)
node scripts/archive-mockups.mjs --dry-run   # liste sans déplacer
node scripts/archive-mockups.mjs             # archive avec confirmation
node scripts/archive-mockups.mjs --delete    # supprime au lieu d'archiver
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
| `/init`       | Orchestre le workflow d'initialisation d'un nouveau projet |
| `/design`     | Conçoit un module avec Claude Design et synchronise son handoff |
| `/story`      | Affiche la story `[wip]` ou la prochaine `[todo]` avec tout le contexte |
| `/ready`      | Vérifie la Definition of Ready avant de démarrer une story (inclut l'arbitrage wireframe) |
| `/done`       | Vérifie la Definition of Done et marque la story `[done]` |
| `/new-story`  | Guide la création d'une nouvelle story |
| `/sync-doc`   | Audite la cohérence entre code et documentation |
| `/journal`    | Ajoute une entrée d'apprentissage dans `JOURNAL.md` |

---

## Changelog

### v0.5.0 — 2026-08-13

- Ajout de `DESIGN.md`, des briefs de modules et des handoffs versionnés par écran.
- Claude Design devient l'atelier visuel privilégié, avec un fallback local indépendant du quota.
- Ajout de `/design`, d'un Gate design et d'un Gate module renforcé.
- `/ready`, `/done` et `/sync-doc` contrôlent désormais le cycle de vie des écrans et composants.
- La preview design est déclarée par la stack au lieu d'être liée à Vue/Nuxt.

### v0.4.0 — 2026-05-25

- Ajout `docs/KICKOFF.md` : workflow d'initialisation projet en 4 phases (Pitch → Interview → Itération par module → Codage) avec gates de validation.
- Ajout commande `/init` (cf. `.claude/commands/init.md`) qui orchestre le workflow ci-dessus.
- README mis à jour avec une section "Démarrer un nouveau projet" accessible aux humains qui découvrent Genesis.
- Definition of Ready augmentée dans `AGENTS.md` : check wireframe explicite (OK / ajustement mineur / changement structurel) au moment de prendre une story.
- Commande `/ready` étendue pour gérer l'arbitrage wireframe et le check playground.
- Ajout dossier `src/playground/` documenté : pont entre maquette externe et code final.
- Ajout `scripts/archive-mockups.mjs` : archivage des pré-maquettes vers `docs/assets/playground-archive/` en fin de MVP.
- `WIREFRAMES.md` mis à jour pour expliciter les outils 2026 (Uizard, Visily, Figma, Excalidraw, Penpot, Claude Artifacts) et ajouter un champ "Maquette playground" optionnel.

### v0.3.0 — 2026-05-23

- Ajout `scripts/new-story.mjs` : création interactive d'une story (ID auto, fichier généré, ligne insérée dans l'index entre markers).
- Ajout `scripts/archive-stories.mjs` : déplacement des stories `[done]` vers `docs/stories/done/`, avec options `--dry-run` et `--yes`.
- Markers HTML ajoutés dans `STORIES.md` (`BACKLOG_MVP_START/END`, `BACKLOG_V2_START/END`) pour faciliter les inserts programmatiques.
- Commande `/new-story` mise à jour pour favoriser le script.
- Commande `/sync-doc` étendue (cohérence stories ↔ fichiers, seuil d'archivage).
- Scripts cross-platform Node.js (zéro dépendance, Windows/macOS/Linux/WSL).

### v0.2.0 — 2026-05-23

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
