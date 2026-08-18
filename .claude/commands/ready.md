# /ready

Vérifie la prochaine story `[todo]` avant de la démarrer.

> **Source de vérité unique de la Definition of Ready :** `AGENTS.md`.
> Cette commande exécute la checklist canonique sans la recopier.

## Instructions

1. Lire `docs/STORIES.md` et identifier la prochaine story `[todo]` éligible.
2. Ouvrir son fichier `docs/stories/ST-XXX-*.md`.
3. Lire la **Definition of Ready** dans `AGENTS.md` et vérifier chaque critère exactement tel qu'il y est défini.
4. Lire les sources nécessaires au contrôle :
   - module dans `FUNCTIONAL.md` ;
   - contraintes techniques dans `ARCHITECTURE.md` ;
   - sécurité dans `SECURITY.md` si pertinente ;
   - `WIREFRAMES.md`, direction, `DESIGN.md` et handoffs pour une story UI.
5. Pour une story UI, afficher les écrans concernés et demander l'arbitrage wireframe prévu par `AGENTS.md` : OK, ajustement mineur ou changement structurel. Ne pas inventer une quatrième option.
6. Si un changement structurel modifie le comportement métier, mettre à jour `FUNCTIONAL.md` avant le wireframe et ré-évaluer le découpage de la story.
7. Si une preview existe, signaler son chemin, son statut et la commande déclarée dans `ARCHITECTURE.md`. Une preview non validée ne remplace pas un handoff `synced`.
8. Produire un rapport court :
   - ✅ critères satisfaits ;
   - ⚠️ critères incomplets avec action de correction ;
   - ❌ bloqueurs.
9. Ne pas passer la story en `[wip]` automatiquement. Demander confirmation après un rapport entièrement vert.

## Règle anti-dérive

Si `AGENTS.md` évolue, `/ready` suit automatiquement sa nouvelle Definition of Ready. Ne jamais ajouter ici une checklist parallèle.
