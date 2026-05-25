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

4. **Check wireframe explicite** (si la story référence des écrans) :
   - Afficher les sections de `WIREFRAMES.md` correspondant aux écrans listés dans la story.
   - Si une **maquette playground** existe pour ces écrans (champ `Fichier : src/playground/sXX-*.vue`), afficher aussi son chemin et son statut.
   - Demander explicitement au dev de choisir parmi :
     - ✅ **OK tel quel** → on continue, la story est prête.
     - ✏️ **Ajustement mineur** → demander la description précise (bouton déplacé, libellé changé, ordre des champs, etc.), patcher `WIREFRAMES.md` (et la maquette playground si pertinente), créer un commit dédié `[ST-XXX] adjust wireframes for [écran]`, puis continuer.
     - 🔄 **Changement structurel** (nouvel écran, flow modifié, étape ajoutée/supprimée) → **stop**. Demander :
       - "Le comportement métier change-t-il ?"
       - Si **oui** : mettre à jour `FUNCTIONAL.md` d'abord, puis `WIREFRAMES.md`, puis ré-évaluer la story (peut nécessiter un re-découpage).
       - Si **non** (juste de l'UI) : mettre à jour `WIREFRAMES.md` (et `src/playground/` si pertinent), signaler la décision.

5. **Check playground** (optionnel, si la story implique un écran complexe) :
   - Si l'écran a un comportement interactif difficile à juger sur la maquette externe, proposer au dev de générer d'abord une **pré-maquette** dans `src/playground/sXX-*.vue` avant d'attaquer la story finale.
   - Si une maquette playground existe et son statut est `à valider`, demander au dev de la valider (statut `validée`) avant de la porter dans `pages/` ou `components/` pendant la story.
   - Si le statut est `portée`, la maquette devrait être supprimée pendant la story (sauf si on garde explicitement une variante de référence).

6. Produire un rapport :
   - ✅ Story prête : confirmer qu'on peut passer en `[wip]`.
   - ⚠️ Critères manquants : lister précisément ce qui manque et proposer comment compléter.
   - ❌ Bloqueurs : dépendances non terminées, écrans manquants, changement structurel non encore arbitré. Indiquer la story prête suivante si possible.

7. **Ne pas** passer la story en `[wip]` automatiquement. Demander confirmation avant.
