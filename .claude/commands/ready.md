# /ready

Vérifie la **Definition of Ready** pour la prochaine story `[todo]` avant de la démarrer.

## Instructions

1. Lire `docs/STORIES.md` (index) et identifier la prochaine story `[todo]`.
2. Ouvrir `docs/stories/ST-XXX-*.md` correspondant.
3. Vérifier chaque critère de la Definition of Ready (cf. `AGENTS.md`) :
   - [ ] Contexte rempli (pas de placeholder vide)
   - [ ] Au moins une tâche technique listée
   - [ ] Au moins un critère de done listé
   - [ ] Toutes les dépendances (`Dépend de :`) sont `[done]` dans l'index
   - [ ] Si la story référence des écrans, ces écrans existent dans `WIREFRAMES.md`
   - [ ] Si la story a un impact sécurité, la section "Impact sécurité" est remplie

4. Produire un rapport :
   - ✅ Story prête : confirmer qu'on peut passer en `[wip]`.
   - ⚠️ Critères manquants : lister précisément ce qui manque et proposer comment compléter.
   - ❌ Bloqueurs : dépendances non terminées, écrans manquants. Indiquer la story prête suivante si possible.

5. **Ne pas** passer la story en `[wip]` automatiquement. Demander confirmation avant.
