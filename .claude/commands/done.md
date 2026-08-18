# /done

Vérifie une story `[wip]` puis la marque `[done]` si tous les contrats applicables sont satisfaits.

> **Sources canoniques :**
> - Definition of Done : `AGENTS.md`
> - Quality Gate technique : `docs/QUALITY.md`
> - Visual QA UI : `docs/VISUAL-QA.md`

Cette commande exécute ces contrats ; elle ne maintient aucune checklist parallèle.

## Instructions

1. Lire `docs/STORIES.md` et identifier l'unique story `[wip]`.
2. Ouvrir son fichier `docs/stories/ST-XXX-*.md`.
3. Lire la **Definition of Done** dans `AGENTS.md` et vérifier chaque critère.
4. Lire `docs/QUALITY.md` et exécuter le **Gate story** avec les commandes déclarées dans `ARCHITECTURE.md`.
5. Si la story touche une interface, exécuter la boucle de `docs/VISUAL-QA.md` et vérifier que les écrans concernés sont `implemented`.
6. Vérifier que les sources canoniques ont été mises à jour lorsque nécessaire : `FUNCTIONAL.md`, `ARCHITECTURE.md`, `SECURITY.md`, `DESIGN.md`, wireframes/handoffs et `.env.example`.
7. Si un critère ou une commande applicable échoue, lister précisément le bloqueur et s'arrêter. Ne pas marquer `[done]` avec un check non exécuté présenté comme vert.
8. Si tout est satisfait :
   - passer la story `[wip]` → `[done]` dans son fichier ;
   - ajouter l'entrée d'historique datée ;
   - mettre à jour `docs/STORIES.md` selon sa convention canonique.
9. Proposer une entrée dans `JOURNAL.md` uniquement pour un apprentissage durable.
10. Indiquer la prochaine story `[todo]` et rappeler que le merge suit le workflow Git défini dans `AGENTS.md` / `ARCHITECTURE.md`.

## Règle anti-dérive

Toute évolution de la Definition of Done ou des contrôles techniques se fait dans `AGENTS.md` ou `docs/QUALITY.md`, jamais dans cette commande.
