# Instructions agent — [NOM DU PROJET]

<!-- Source de vérité principale pour tous les agents IA. -->
<!-- Garder ce fichier court, stable et actionnable. Les procédures détaillées vivent dans docs/. -->

## Contexte projet

[NOM] est un [type de produit] pour [cible]. Stack : [résumé stack en une ligne].
Développeur solo, side project. Prioriser simplicité, maintenabilité, sécurité et capacité à livrer.

## Démarrer un nouveau projet

Si `docs/BRIEF.md` est encore au stade template et qu'aucune story réelle n'existe, **ne pas coder**. Exécuter le workflow canonique de `docs/KICKOFF.md` :

1. Pitch → `BRIEF.md`
2. Fonctionnel + architecture + sécurité
3. UX + Design Intelligence
4. Module par module : design/handoff → stories → Gate module

`/init` n'est qu'un adaptateur de ce workflow.

## Ordre de lecture avant implémentation

1. `docs/BRIEF.md`
2. `docs/FUNCTIONAL.md`
3. `docs/ARCHITECTURE.md`
4. `docs/SECURITY.md`
5. `docs/design/design-brief.md` et `docs/design/visual-direction.md`
6. `docs/DESIGN.md`
7. `docs/STORIES.md`
8. story active dans `docs/stories/`
9. sections utiles de `docs/WIREFRAMES.md`
10. handoffs concernés dans `docs/design/screens/`
11. `docs/QUALITY.md`
12. `docs/VISUAL-QA.md` pour une story UI
13. `docs/JOURNAL.md` en lecture rapide

Pour une release, lire également `docs/OPERATIONS.md` et `docs/RELEASE.md`.

## Précédence des contrats

En cas de contradiction :

1. `AGENTS.md` — règles de travail agent
2. `docs/SECURITY.md` — sécurité et autorisation
3. `docs/FUNCTIONAL.md` — comportement produit
4. `docs/ARCHITECTURE.md` — stack et décisions techniques
5. `docs/QUALITY.md` — validations techniques
6. `docs/design/visual-direction.md` — direction artistique
7. `docs/DESIGN.md` — système visuel
8. `docs/WIREFRAMES.md` et handoffs — écrans
9. stories — unité d'implémentation

`docs/KICKOFF.md`, `docs/VISUAL-QA.md`, `docs/OPERATIONS.md` et `docs/RELEASE.md` décrivent des procédures qui s'appuient sur ces sources, sans modifier leurs règles métier.

## Definition of Ready

Une story ne peut passer en `[wip]` que si :

- [ ] son contexte est rempli ;
- [ ] elle possède au moins une tâche technique et un critère de done ;
- [ ] toutes ses dépendances sont `[done]` ;
- [ ] son module est suffisamment spécifié dans `FUNCTIONAL.md` ;
- [ ] ses impacts techniques sont compatibles avec `ARCHITECTURE.md` ;
- [ ] si elle touche la sécurité, son impact sécurité est documenté selon `SECURITY.md` ;
- [ ] si elle touche l'UI, ses écrans existent dans `WIREFRAMES.md`, la direction est approuvée et chaque écran à implémenter possède un handoff `synced` ;
- [ ] pour une story UI, le développeur a relu les écrans et choisi explicitement : **OK**, **ajustement mineur** ou **changement structurel**.

Un changement structurel qui modifie le comportement produit remonte d'abord à `FUNCTIONAL.md`, puis aux wireframes/handoffs, puis au découpage de story.

Si un critère manque : ne pas démarrer la story.

## Definition of Done

Une story ne peut passer `[done]` que si :

- [ ] toutes ses tâches et critères de done sont satisfaits ;
- [ ] le **Gate story de `docs/QUALITY.md`** est vert ;
- [ ] aucun code de debug, secret ou contournement temporaire n'est laissé ;
- [ ] les règles métier, ADR, variables, sécurité et design concernés sont synchronisés dans les sources canoniques ;
- [ ] pour une story UI, `docs/VISUAL-QA.md` est exécuté et les écrans concernés sont `implemented` ;
- [ ] les écarts intentionnels sont documentés ;
- [ ] une entrée `JOURNAL.md` n'est ajoutée que si un apprentissage durable mérite d'être conservé ;
- [ ] la branche est propre et mergeable selon le workflow Git du projet.

`/done` exécute cette Definition of Done et `QUALITY.md` sans en maintenir de copie.

## Règles de travail

### Avant de coder

- Identifier l'unique story active ou la prochaine story éligible.
- Ouvrir son fichier et exécuter la Definition of Ready.
- Créer/utiliser une branche dédiée selon `ARCHITECTURE.md`.
- Ne pas inventer une règle produit manquante à partir d'un design ou d'une intuition technique.

### Pendant le développement

- Ne jamais introduire une technologie absente de `ARCHITECTURE.md` sans décision explicite et mise à jour du document.
- Ne jamais modifier le modèle de données sans synchroniser l'architecture et les règles d'autorisation.
- Cocher les tâches au fur et à mesure.
- Éviter tout refactoring hors scope qui augmente le risque sans servir la story.
- En cas de décision structurante, créer/mettre à jour l'ADR concerné.
- En cas de blocage, documenter la raison au lieu de masquer le problème.

### Après implémentation

- Exécuter `/done` ou l'équivalent naturel de ses contrats.
- Ne jamais laisser un `[wip]` ambigu sans note expliquant l'état réel.

## Git

Par défaut :

- branche principale `main` ;
- une branche courte par story ;
- commits intentionnels, petits et lisibles ;
- pas de commit direct sur `main` lorsque la protection du projet l'interdit ;
- tests/quality gates verts avant merge.

Les conventions exactes du projet vivent dans `ARCHITECTURE.md`.

## Tests et qualité

La stratégie de tests et les commandes concrètes vivent dans `ARCHITECTURE.md`. Le contrat de validation vit dans `docs/QUALITY.md`.

Règles :

- parcours critiques couverts par E2E/intégration quand cela apporte une vraie protection ;
- logique métier complexe couverte par tests unitaires ;
- lint, typecheck/analyse statique, tests et build exécutés lorsqu'ils sont applicables ;
- un test flaky est réparé ou supprimé, jamais ignoré comme bruit permanent.

## Sécurité

Référence : `docs/SECURITY.md`.

- Toute ressource privée doit avoir un contrôle d'autorisation explicite.
- Utiliser RLS lorsque la stack la propose et que c'est le mécanisme retenu ; sinon appliquer un contrôle équivalent côté serveur ou via les règles natives du provider.
- Aucun secret dans le code, les commits, les captures ou les logs.
- Toute donnée utilisateur est traitée selon son scope réel de lecture/écriture/suppression.
- Paiements, actions destructrices, uploads et outils IA suivent les garde-fous spécifiques de `SECURITY.md`.

## Design

Routage :

- UX/parcours → `FUNCTIONAL.md`, `WIREFRAMES.md`, `genesis-design` ;
- direction artistique → `genesis-art-direction` ;
- maquette/handoff → `genesis-design` ;
- motion significative → `genesis-motion-design` ;
- critique et QA visuelle → `genesis-design-critic` + `VISUAL-QA.md`.

Toujours appliquer **Composition before Components** et contrôler `docs/design/anti-ai-slop.md`. L'originalité ne prime jamais sur l'UX, l'accessibilité ou la maintenabilité.

## Production et release

- `docs/OPERATIONS.md` documente observabilité, données/restauration, analytics, performance, coûts et quotas.
- `docs/RELEASE.md` est la procédure canonique de mise en production.
- Une story `[done]` n'est pas une release : `/release` exécute le Quality Gate complet, la synchronisation documentaire, le déploiement, les smoke tests et la vérification post-déploiement.

## Communication et code

- Communication agent ↔ développeur : français.
- Code, variables, fonctions, fichiers et logs techniques : anglais sauf convention contraire explicite.
- Documentation produit/technique : français par défaut.
- Expliquer brièvement les choix non évidents et signaler proactivement la dette ou le risque.
- Toujours gérer les erreurs explicitement ; pas de `try/catch` vide.
- Pour les appels tiers, prévoir timeout/retry/fallback seulement lorsqu'ils sont pertinents au comportement attendu.

## Commandes

Les commandes `.claude/commands/` sont des **adaptateurs** ; elles ne sont jamais la source de vérité d'une checklist.

- `/init` → `docs/KICKOFF.md`
- `/design` → skills design + `docs/KICKOFF.md`
- `/story` → charge le contexte de la story
- `/ready` → Definition of Ready de ce fichier
- `/done` → Definition of Done + `docs/QUALITY.md`
- `/new-story` → crée une story
- `/sync-doc` → audite la cohérence des sources
- `/journal` → mémoire durable
- `/release` → `docs/RELEASE.md`

Pour Codex et les agents compatibles, le skill `.agents/skills/genesis-workflow/` route le cycle général et les skills `genesis-*design*` couvrent la chaîne UX/UI.

## Scripts utilitaires

- `node scripts/new-story.mjs`
- `node scripts/archive-stories.mjs`
- `node scripts/archive-mockups.mjs`

Utiliser ces scripts lorsqu'ils réduisent les manipulations manuelles et restent compatibles avec l'environnement d'exécution.
