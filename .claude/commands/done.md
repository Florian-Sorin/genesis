# /done

Vérifie la **Definition of Done** et marque la story `[wip]` comme `[done]`.

## Instructions

1. Lire `docs/STORIES.md` et identifier la story en `[wip]`.
2. Ouvrir `docs/stories/ST-XXX-*.md` correspondant.
3. Vérifier la Definition of Done (cf. `AGENTS.md`) :
   - [ ] Toutes les tâches techniques cochées `[x]`
   - [ ] Tous les critères de done cochés `[x]`
   - [ ] Tests E2E et unitaires listés implémentés et passants
   - [ ] Pas de `console.log` ou code commenté laissé
   - [ ] `FUNCTIONAL.md` à jour si règle métier modifiée
   - [ ] `ARCHITECTURE.md` à jour si décision technique prise (ADR)
   - [ ] `SECURITY.md` à jour si l'impact sécurité a évolué
4. Si un critère n'est pas satisfait : lister précisément ce qui manque et s'arrêter.
5. Si tout est satisfait :
   - Passer le statut `[wip]` → `[done]` dans le fichier de story.
   - Ajouter dans la section "Historique" : `YYYY-MM-DD — [done] — Terminée`.
   - Mettre à jour `docs/STORIES.md` : déplacer la ligne du backlog MVP vers la section "Stories terminées".
6. Proposer une entrée de journal (cf. `/journal`) si quelque chose de notable a été appris.
7. Rappeler la commande Git pour merger : `git checkout main && git merge --ff-only st-XXX-slug && git branch -d st-XXX-slug`.
8. Afficher la prochaine story `[todo]` pour préparer la session suivante.
