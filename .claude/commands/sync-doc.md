# /sync-doc

Audite la cohérence entre code et documentation.

## Instructions

1. **Stack vs dépendances**
   - Lire `docs/ARCHITECTURE.md` section 1 (stack).
   - Comparer avec `package.json` / `pubspec.yaml` / équivalent.
   - Signaler toute dépendance présente dans le code mais absente de `ARCHITECTURE.md`.
   - Signaler toute dépendance listée mais non utilisée.

2. **Structure**
   - Lire `docs/ARCHITECTURE.md` section 2 (structure).
   - Vérifier que l'arborescence réelle correspond.
   - Signaler les dossiers présents mais non documentés (et inversement).

3. **Schéma BDD**
   - Lire `docs/ARCHITECTURE.md` section 3.
   - Comparer avec les fichiers de migration (`server/db/migrations/` ou équivalent).
   - Signaler toute table existante non documentée.
   - Signaler tout champ documenté mais absent du schéma.

4. **Sécurité / RLS**
   - Lire `docs/SECURITY.md` section 3.
   - Vérifier que chaque table du schéma BDD a RLS activée et au moins une policy.
   - Signaler toute table sans RLS comme **incohérence bloquante**.

5. **Stories vs modules**
   - Lire `docs/FUNCTIONAL.md` (modules) et `docs/STORIES.md` (backlog).
   - Vérifier que chaque module `[MVP]` a au moins une story associée.
   - Signaler les modules sans story (à découper) et les stories sans module rattaché.

6. **Stories vs fichiers**
   - Lister `docs/stories/ST-*.md` et `docs/stories/done/ST-*.md`.
   - Vérifier que chaque ID listé dans `STORIES.md` a un fichier correspondant.
   - Vérifier qu'aucun fichier story n'est orphelin (présent mais absent de l'index).
   - Si `docs/stories/` contient plus de **15** stories `[done]`, suggérer de lancer `node scripts/archive-stories.mjs`.

7. **Wireframes vs écrans référencés**
   - Lire les champs `Écrans :` de chaque story dans `docs/stories/*.md`.
   - Vérifier que chaque ID d'écran cité (S01, S02, …) existe dans `docs/WIREFRAMES.md` (section H3 dédiée).
   - Signaler les écrans cités sans section dédiée et les sections d'écran orphelines (jamais référencées par une story).

8. **Playground vs wireframes**
   - Lister `src/playground/*.{vue,jsx,tsx,svelte,html}` si le dossier existe.
   - Pour chaque fichier, vérifier qu'il est référencé dans `WIREFRAMES.md` (champ "Maquette playground").
   - Signaler les fichiers playground orphelins (présents mais non référencés).
   - Si toutes les maquettes playground ont le statut `portée` dans `WIREFRAMES.md`, suggérer de lancer `node scripts/archive-mockups.mjs`.


9. **Design et handoffs**
   - Vérifier que chaque écran `approved`, `synced` ou `implemented` possède un handoff local.
   - Vérifier la cohérence des statuts et versions entre `WIREFRAMES.md` et `docs/design/screens/`.
   - Signaler les briefs obsolètes par rapport à leurs sources et les handoffs sans référence ou recette.
   - Signaler les composants et tokens utilisés par les handoffs mais absents de `DESIGN.md`.
   - Vérifier que la preview réelle correspond à la section « Design preview » de `ARCHITECTURE.md`.
   - Pour les écrans `implemented`, vérifier que la revue `VISUAL-QA.md` est renseignée dans le handoff.
   - Vérifier que commandes, URL et dossier de captures de Visual QA sont renseignés dans `ARCHITECTURE.md` avant la première story UI.

10. **Variables d'environnement**
   - Lire `docs/ARCHITECTURE.md` section 9.
   - Comparer avec `.env.example`.
   - Signaler les variables manquantes des deux côtés.

11. Produire un rapport court :
    - ✅ Points cohérents
    - ⚠️ Divergences détectées (avec suggestion de correction)
    - ❌ Incohérences bloquantes à corriger avant de continuer (notamment RLS manquantes)
