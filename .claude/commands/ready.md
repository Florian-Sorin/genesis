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
   - [ ] Le module fonctionnel de la story est entièrement spécifié dans `FUNCTIONAL.md`
   - [ ] Si la story référence des écrans, ces écrans existent dans `WIREFRAMES.md` (Route + Contenu + Actions + Lien/prompt)
   - [ ] Si la story a un impact sécurité, la section "Impact sécurité" est remplie
   - [ ] Pour une story UI, la section "Impact design" est remplie
   - [ ] Chaque écran est `synced` et son handoff `docs/design/screens/SXX/README.md` est complet

4. **Check handoff design** (si la story référence des écrans) :
   - Vérifier version approuvée, référence, recette, états, composants, tokens, assets, adaptation et accessibilité.
   - Comparer les interactions à `FUNCTIONAL.md` et bloquer toute contradiction.
   - Lister ce que la story doit créer ou modifier dans le système de design.

5. **Check wireframe explicite** (si la story référence des écrans) :
   - Afficher les sections de `WIREFRAMES.md` correspondant aux écrans listés dans la story.
   - Si une **preview** existe pour ces écrans, afficher son chemin, son statut et la commande déclarée dans `ARCHITECTURE.md`.
   - Demander explicitement au dev de choisir parmi :
     - ✅ **OK tel quel** → on continue, la story est prête.
     - ✏️ **Ajustement mineur** → demander la description précise (bouton déplacé, libellé changé, ordre des champs, etc.), patcher `WIREFRAMES.md` (et la maquette playground si pertinente), créer un commit dédié `[ST-XXX] adjust wireframes for [écran]`, puis continuer.
     - 🔄 **Changement structurel** (nouvel écran, flow modifié, étape ajoutée/supprimée) → **stop**. Demander :
       - "Le comportement métier change-t-il ?"
       - Si **oui** : mettre à jour `FUNCTIONAL.md` d'abord, puis `WIREFRAMES.md`, puis ré-évaluer la story (peut nécessiter un re-découpage).
       - Si **non** (juste de l'UI) : mettre à jour `WIREFRAMES.md` et la preview si pertinente, signaler la décision.

6. **Check preview** (optionnel, si la story implique un écran complexe) :
   - Si l'écran a un comportement interactif difficile à juger, proposer une pré-maquette avec le mécanisme « Design preview » de `ARCHITECTURE.md`.
   - Si une preview existe et son statut est `à valider`, demander au dev de la valider avant son portage dans l'implémentation finale.
   - Si le statut est `portée`, la maquette devrait être supprimée pendant la story (sauf si on garde explicitement une variante de référence).

7. Produire un rapport :
   - ✅ Story prête : confirmer qu'on peut passer en `[wip]`.
   - ⚠️ Critères manquants : lister précisément ce qui manque et proposer comment compléter.
   - ❌ Bloqueurs : dépendances non terminées, écrans manquants, changement structurel non encore arbitré. Indiquer la story prête suivante si possible.

8. **Ne pas** passer la story en `[wip]` automatiquement. Demander confirmation avant.
