# /init

Orchestre l'initialisation d'un nouveau projet, de l'idée à la première story prête à coder.

> **Source de vérité unique :** `docs/KICKOFF.md`.
> Cette commande est un adaptateur : elle ne redéfinit jamais les phases, gates ou checklists du workflow.

## Instructions

### 1. Détecter l'état du projet

Lire `docs/BRIEF.md`, `docs/FUNCTIONAL.md`, `docs/ARCHITECTURE.md`, `docs/SECURITY.md`, `docs/design/design-brief.md`, `docs/design/visual-direction.md`, `docs/DESIGN.md`, `docs/WIREFRAMES.md` et `docs/STORIES.md`.

Déterminer la prochaine phase à partir des critères décrits dans `docs/KICKOFF.md` :

- Phase 1 si le brief est encore au stade template.
- Phase 2 si le brief est validé mais les fondations fonctionnelles/techniques ne le sont pas.
- Phase 3 si les fondations produit sont validées mais la direction UX/UI ne l'est pas.
- Phase 4 si les fondations design sont validées mais qu'au moins un module MVP n'est pas encore préparé.
- Projet bootstrappé si au moins une story réelle est prête ou en cours : utiliser alors `/story`, `/ready` ou `/new-story`.

Présenter la phase détectée et la raison. Ne pas inventer un état à partir d'un seul fichier.

### 2. Exécuter uniquement la phase détectée

Suivre **mot pour mot l'intention et l'ordre** de `docs/KICKOFF.md`.

Règles transverses :

- Une phase à la fois.
- En Phase 2, travailler bloc par bloc et obtenir la validation explicite prévue par KICKOFF.
- Quand une information manque, écrire un TODO explicite plutôt que l'inventer.
- Les gates sont exécutés depuis leur checklist canonique dans `docs/KICKOFF.md` ; ne pas recopier ni reformuler leurs critères ici.

### 3. Phase 4 : ordre obligatoire

Pour chaque module MVP :

1. Exécuter `/design [module]` pour préparer le brief, les wireframes, la critique et les handoffs `synced`.
2. Une fois le handoff suffisamment mûr pour découper le travail, créer les stories du module avec `scripts/new-story.mjs` et les enrichir.
3. Exécuter ensuite le **Gate module canonique de `docs/KICKOFF.md`**, qui vérifie à la fois les écrans, les handoffs, les stories et leurs dépendances.
4. Si le Gate module est vert et validé par le développeur, le module peut entrer dans le workflow `/story → /ready → /done`.

> Important : le Gate module final dépend de l'existence des stories. Il ne doit donc jamais être utilisé comme prérequis à leur création.

### 4. Protocole de gate

Pour n'importe quel gate :

1. Lire sa checklist dans `docs/KICKOFF.md`.
2. Vérifier chaque critère avec `✅` ou `❌ — raison`.
3. Si un critère échoue, corriger ou revenir à la source concernée ; ne pas passer à la suite.
4. Si tout est vert, résumer les décisions structurantes et demander la validation explicite prévue par KICKOFF.

### 5. Fin d'initialisation

Quand au moins une story passe la Definition of Ready :

- confirmer que le projet est bootstrappé ;
- pointer vers `/story` puis `/ready` ;
- suggérer une entrée dans `JOURNAL.md` pour les décisions réellement durables ;
- conserver `docs/KICKOFF.md` comme référence sauf décision explicite de le supprimer.

## Règles spécifiques

- Ne jamais sauter un gate canonique sous prétexte que le sujet semble évident.
- Ne jamais marquer une story `[done]` pendant l'initialisation.
- Ne jamais créer les stories avant que les parcours, écrans et handoffs du module soient suffisamment définis pour être découpés proprement.
- Ne jamais attendre le Gate module final pour créer ces stories : ce gate les contrôle.
- Limiter le ping-pong en groupant les questions par bloc cohérent.
- Si le travail est interrompu, laisser des TODO explicites et indiquer la phase exacte où reprendre.
