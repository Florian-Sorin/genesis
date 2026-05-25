# docs/assets/

Assets visuels du projet : exports de maquettes, schémas, archives de pré-maquettes.

## Convention de nommage

`[ID_ÉCRAN]-[nom-descriptif].png` — exemples : `S01-dashboard.png`, `S03-modal-creation.png`.

Pour les autres types d'assets (schémas, captures), un nom descriptif suffit.

## Sous-dossiers

### `playground-archive/`

Pré-maquettes en code archivées depuis `src/playground/` à la fin du MVP (via `node scripts/archive-mockups.mjs`).

- Le script maintient un `INDEX.md` listant chaque fichier, sa date d'archivage et l'écran associé.
- Ces fichiers ne sont plus exécutables tels quels — ils servent de référence historique.
- Voir `docs/KICKOFF.md` section "Le dossier `src/playground/`" pour le cycle de vie complet.
