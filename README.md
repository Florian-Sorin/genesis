# Genesis

> Socle de démarrage pour concevoir, développer, valider et mettre en production un produit assisté par IA sans perdre le contrôle des décisions.

**Version :** `v1.0.0-rc`
**Compatible avec :** Codex/ChatGPT Cloud, Open Design, Claude Code, Cursor et tout agent capable de lire `AGENTS.md` et les skills de dépôt.

## Pourquoi

Genesis garde la source de vérité dans le repo : produit, architecture, sécurité, UX/UI, stories, qualité, exploitation et release sont versionnés avec le code.

Le principe est simple : **l'agent aide à produire, mais les contrats du projet décident**. Les commandes et skills routent vers ces contrats sans dupliquer leurs checklists.

## Chaîne complète

```text
Idée
  ↓
BRIEF
  ↓
FUNCTIONAL + ARCHITECTURE + SECURITY
  ↓
UX + Design Intelligence
  ↓
Design/handoffs par module
  ↓
Stories + Definition of Ready
  ↓
Implémentation
  ↓
Definition of Done + Quality Gate + Visual QA
  ↓
Production readiness
  ↓
Release + smoke tests + vérification production
```

## Démarrer un projet

1. Utiliser Genesis comme base d'un nouveau repo.
2. Ouvrir le repo dans l'agent local ou cloud de ton choix.
3. Donner un pitch libre du produit.
4. Lancer `/init` ou demander à l'agent de suivre `docs/KICKOFF.md`.
5. Valider chaque gate avant de passer à la phase suivante.

### Workflow d'initialisation

`docs/KICKOFF.md` est la source canonique :

- **Phase 1 — Pitch** → `BRIEF.md`
- **Phase 2 — Produit / technique / sécurité** → `FUNCTIONAL.md`, `ARCHITECTURE.md`, `SECURITY.md`
- **Phase 3 — UX + Design Intelligence** → design brief, direction visuelle, `DESIGN.md`
- **Phase 4 — Module par module** → design/handoff suffisamment mûr → stories → Gate module

Le Gate module final contrôle les stories ; il n'est jamais un prérequis à leur création.

## Workflow quotidien

```text
/story  → charge la story et son contexte
/ready  → exécute la Definition of Ready de AGENTS.md
[code]
/done   → exécute Definition of Done + QUALITY + Visual QA si UI
```

Une story `[done]` n'est pas encore une release. La mise en production passe ensuite par :

```text
/sync-doc
/release
```

`/release` exécute `docs/RELEASE.md`, le Quality Gate release, les checks d'exploitation et les smoke tests.

## Contrats canoniques

| Fichier | Rôle |
|---|---|
| `AGENTS.md` | règles de travail, Definition of Ready/Done, routage |
| `docs/BRIEF.md` | problème, cible, positionnement, succès |
| `docs/FUNCTIONAL.md` | comportement produit et modules |
| `docs/ARCHITECTURE.md` | stack, commandes, données, Git, déploiement |
| `docs/SECURITY.md` | auth, autorisation, données sensibles, incidents |
| `docs/QUALITY.md` | quality gates story et release |
| `docs/DESIGN.md` | système visuel |
| `docs/WIREFRAMES.md` | inventaire et contrat des écrans |
| `docs/VISUAL-QA.md` | validation visuelle du rendu réel |
| `docs/OPERATIONS.md` | observabilité, restauration, analytics, performance, coûts |
| `docs/RELEASE.md` | procédure de mise en production |
| `docs/STORIES.md` | index du backlog |
| `docs/JOURNAL.md` | apprentissages durables |

## Design Intelligence

Genesis sépare UX, direction artistique et exécution visuelle.

### Skills design

- `genesis-art-direction` — visual thesis, références, anti-goals, PRODUCT/AWARD.
- `genesis-design` — brief module, exploration, handoff et implémentation.
- `genesis-design-critic` — critique mesurable, responsive, accessibilité et détection d'AI slop.
- `genesis-motion-design` — motion intentionnelle et reduced motion.

Principes :

- **Composition before Components**.
- Un atelier externe est interchangeable ; les handoffs Git restent canoniques.
- Open Design est l'atelier principal lorsqu'il est disponible, jamais un point de blocage.
- PRODUCT par défaut pour les interfaces productives ; AWARD uniquement lorsque la marque/narration le justifie.
- Visual QA sur le rendu réel avant de déclarer un écran `implemented`.

## Workflow portable pour agents

`.agents/skills/genesis-workflow/` route le cycle général :

- init ;
- story / ready / done ;
- sync documentaire ;
- quality gates ;
- release.

Les commandes `.claude/commands/` sont des adaptateurs pour Claude Code. Elles ne sont pas les sources de vérité des checklists.

## Qualité

`docs/QUALITY.md` rend explicites les commandes applicables à la stack :

- lint / format check ;
- typecheck ou analyse statique ;
- tests unitaires ;
- E2E / intégration ;
- build production ;
- audit dépendances si pertinent.

Genesis n'impose pas un outil particulier ni un pourcentage de couverture arbitraire.

## Sécurité

Genesis impose un **résultat de sécurité**, pas Supabase ou PostgreSQL :

- toute ressource privée possède un contrôle d'autorisation explicite ;
- RLS est utilisée lorsqu'elle fait partie de la stack ; sinon un contrôle serveur/provider équivalent est attendu ;
- secrets jamais dans le repo, les logs ou les captures ;
- opérations sensibles documentées et testées.

## Production readiness

Avant un lancement public, `docs/OPERATIONS.md` force une décision consciente sur :

- error tracking / diagnostic ;
- logs ;
- health/uptime si nécessaire ;
- backup et restauration des données non reproductibles ;
- analytics reliées à un objectif produit ;
- performance des parcours critiques ;
- coûts variables et quotas.

L'objectif n'est pas de transformer un side project en plateforme SRE, mais d'éviter un produit impossible à diagnostiquer ou restaurer.

## Release

`docs/RELEASE.md` couvre :

1. Quality Gate complet.
2. Synchronisation documentaire.
3. Variables et secrets.
4. Migrations et stratégie rollback/roll-forward.
5. Déploiement avec la procédure documentée.
6. Smoke tests.
7. Vérification des erreurs/signaux production.
8. Tag et clôture seulement si tout est vert.

## Structure

```text
/
├── AGENTS.md
├── CLAUDE.md
├── .agents/skills/
│   ├── genesis-workflow/
│   ├── genesis-design/
│   ├── genesis-art-direction/
│   ├── genesis-design-critic/
│   └── genesis-motion-design/
├── .claude/commands/
│   ├── init.md
│   ├── design.md
│   ├── story.md
│   ├── ready.md
│   ├── done.md
│   ├── new-story.md
│   ├── sync-doc.md
│   ├── journal.md
│   └── release.md
├── docs/
│   ├── BRIEF.md
│   ├── FUNCTIONAL.md
│   ├── ARCHITECTURE.md
│   ├── SECURITY.md
│   ├── QUALITY.md
│   ├── DESIGN.md
│   ├── WIREFRAMES.md
│   ├── VISUAL-QA.md
│   ├── OPERATIONS.md
│   ├── RELEASE.md
│   ├── KICKOFF.md
│   ├── STORIES.md
│   ├── JOURNAL.md
│   ├── design/
│   └── stories/
└── scripts/
```

## Scripts

Node.js ≥ 18 :

```bash
node scripts/new-story.mjs
node scripts/archive-stories.mjs --dry-run
node scripts/archive-mockups.mjs --dry-run
```

## Principes de stabilité

- Une seule source de vérité par décision.
- Les commandes et skills exécutent les contrats ; ils ne les recopient pas.
- Une story à la fois.
- Une technologie n'entre pas dans le projet sans être documentée.
- Les outils de design restent remplaçables.
- La qualité et la production sont des étapes du workflow, pas des tâches repoussées à la fin.
- Une évolution de Genesis doit répondre à un problème réellement rencontré sur un projet, pas à une sophistication théorique.

## Changelog

### v1.0.0-rc — 2026-08-18

- Corrige le cycle Design → Stories → Gate module.
- Centralise Definition of Ready/Done et supprime les checklists concurrentes des commandes.
- Ajoute `QUALITY.md` et les quality gates story/release.
- Ajoute `OPERATIONS.md`, `RELEASE.md` et `/release`.
- Rend les règles d'autorisation portables au-delà de Supabase/RLS.
- Corrige la procédure de violation de données RGPD.
- Ajoute le skill portable `genesis-workflow` pour Codex/ChatGPT et agents compatibles.
- Met à jour l'architecture pour déclarer commandes de qualité, déploiement et production readiness.

### v0.6.0 — 2026-08-18

- Workflow design agnostique et Visual QA.
- Skill `genesis-design` portable.

### v0.5.0 — 2026-08-13

- Design handoffs, `DESIGN.md` et commande `/design`.

### v0.4.0 — 2026-05-25

- Workflow `KICKOFF.md` et commande `/init`.
