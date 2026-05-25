# /new-story

Guide la création d'une nouvelle story dans `docs/stories/`.

## Méthode recommandée (script)

> Le script `scripts/new-story.mjs` automatise la création (ID, fichier, insertion dans l'index).
> Préférer cette approche quand possible — c'est plus sûr et plus rapide.

1. Récupérer auprès de l'utilisateur :
   - Titre court et actionnable
   - Priorité : `MVP`, `V2` ou `LATER`
   - Dépendances éventuelles (ex: `ST-001, ST-002` ou `—`)
   - Écrans concernés (ex: `S01, S02` ou `—`)
   - Module fonctionnel concerné

2. Lancer le script en lui passant les réponses (ou laisser l'utilisateur le faire dans son terminal) :
   ```bash
   node scripts/new-story.mjs
   ```

3. Une fois le fichier créé, l'enrichir :
   - **Contexte** déduit du module fonctionnel (lire `docs/FUNCTIONAL.md`).
   - **Tâches techniques** suggérées (à valider avec l'utilisateur).
   - **Fichiers concernés** déduits de `docs/ARCHITECTURE.md` section 2.
   - **Tests à écrire** : E2E pour parcours critiques, unit pour logique métier.
   - **Critères de done** spécifiques à la story.
   - **Impact sécurité** : remplir si la story touche à auth, données utilisateur, paiement, RLS. Lire `docs/SECURITY.md` section 9 pour la checklist.

## Méthode manuelle (fallback)

Si le script ne peut pas être lancé (sandboxé, pas de Node, etc.) :

1. Déterminer l'ID :
   - Lister les fichiers `docs/stories/ST-*.md` et `docs/stories/done/ST-*.md`.
   - Prendre le plus grand `ST-XXX` et incrémenter de 1 (toujours 3 chiffres : `ST-001`, …, `ST-100`).

2. Slugifier le titre (kebab-case, anglais, 2-5 mots).

3. Copier `docs/stories/_TEMPLATE.md` en `docs/stories/ST-XXX-slug.md` et remplir comme ci-dessus.

4. Ajouter une ligne dans `docs/STORIES.md` entre les markers :
   - `<!-- BACKLOG_MVP_START -->` … `<!-- BACKLOG_MVP_END -->` pour `MVP`
   - `<!-- BACKLOG_V2_START -->` … `<!-- BACKLOG_V2_END -->` pour `V2` ou `LATER`

5. Demander validation à l'utilisateur avant d'écrire.
