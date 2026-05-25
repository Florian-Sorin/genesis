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

7. **Variables d'environnement**
   - Lire `docs/ARCHITECTURE.md` section 9.
   - Comparer avec `.env.example`.
   - Signaler les variables manquantes des deux côtés.

8. Produire un rapport court :
   - ✅ Points cohérents
   - ⚠️ Divergences détectées (avec suggestion de correction)
   - ❌ Incohérences bloquantes à corriger avant de continuer (notamment RLS manquantes)
