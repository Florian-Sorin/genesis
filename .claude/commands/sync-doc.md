# /sync-doc

Audite la cohérence entre le code et les contrats canoniques du projet.

## Instructions

1. **Stack et dépendances**
   - Comparer `ARCHITECTURE.md` aux manifests réels (`package.json`, `pubspec.yaml`, etc.).
   - Signaler les dépendances utilisées mais non documentées et les dépendances documentées devenues inutiles.

2. **Structure et schéma**
   - Comparer l'arborescence réelle à `ARCHITECTURE.md`.
   - Comparer le schéma documenté aux migrations ou définitions réellement utilisées.

3. **Sécurité et autorisation**
   - Lire `SECURITY.md` et vérifier le mécanisme d'autorisation déclaré par la stack.
   - Si la stack utilise PostgreSQL/Supabase ou un moteur avec RLS équivalente, vérifier les policies attendues.
   - Si la stack ne supporte pas RLS, vérifier que l'autorisation côté serveur et les contrôles d'accès équivalents sont documentés et appliqués.
   - Toute donnée utilisateur accessible sans contrôle d'autorisation attendu est **bloquante**.

4. **Stories et modules**
   - Vérifier que chaque module MVP possède des stories cohérentes.
   - Vérifier que chaque ID de `STORIES.md` possède un fichier et qu'aucun fichier story n'est orphelin.
   - Vérifier les dépendances entre stories et signaler les cycles ou références inexistantes.

5. **UX/UI et handoffs**
   - Vérifier que chaque écran référencé par une story existe dans `WIREFRAMES.md`.
   - Vérifier la cohérence des statuts entre wireframes et handoffs.
   - Vérifier que chaque écran `approved`, `synced` ou `implemented` possède les preuves attendues par le workflow design.
   - Vérifier que les composants/tokens utilisés existent dans `DESIGN.md`.
   - Pour un écran `implemented`, vérifier que la revue de `VISUAL-QA.md` est renseignée.

6. **Preview et playground**
   - Vérifier que la preview réelle correspond au mécanisme déclaré dans `ARCHITECTURE.md`.
   - Signaler les previews/playgrounds orphelins ou devenus obsolètes.

7. **Variables d'environnement**
   - Comparer la liste de `ARCHITECTURE.md` à `.env.example`.
   - Signaler toute variable manquante d'un côté ou de l'autre.

8. **Quality Gate**
   - Lire `docs/QUALITY.md`.
   - Vérifier que les commandes applicables (lint, typecheck/analyse statique, tests, E2E, build, audit) sont déclarées dans `ARCHITECTURE.md` ou explicitement marquées non applicables avec justification.

9. **Production readiness**
   - Lire `docs/OPERATIONS.md`.
   - Avant un lancement public, signaler toute décision structurante encore vide : diagnostic erreurs, logs, backup/restauration pour données non reproductibles, coûts/quotas et analytics si nécessaires au succès produit.

10. **Release**
   - Vérifier que le mécanisme de déploiement documenté dans `ARCHITECTURE.md` est compatible avec `docs/RELEASE.md`.
   - Signaler l'absence de smoke tests ou de stratégie de rollback/roll-forward lorsqu'une release comporte des changements risqués.

11. Produire un rapport court :
   - ✅ cohérent ;
   - ⚠️ divergence avec correction proposée ;
   - ❌ bloqueur à corriger avant de continuer.

## Règle anti-dérive

`/sync-doc` compare les sources canoniques ; il ne doit pas réinventer leurs règles ni rendre obligatoire un outil spécifique à une stack.
