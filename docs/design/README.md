# Handoff design

Ce dossier contient le contexte et les livrables qui relient la conception dans l’atelier de design choisi à l'implémentation dans le dépôt. Open Design est un chemin conseillé, mais aucun choix nécessaire à l'implémentation ne doit vivre uniquement dans l'outil externe.

## Structure

```text
docs/design/
├── _MODULE-BRIEF-TEMPLATE.md
├── modules/[module].md
└── screens/
    ├── _SCREEN-HANDOFF-TEMPLATE.md
    └── S01/
        ├── README.md
        ├── reference.png
        ├── prompt.md
        ├── assets/
        └── export/          # optionnel, généré et remplaçable
```

## Statuts d'un écran

`draft` → `review` → `approved` → `synced` → `implemented`. Le statut `obsolete` retire un écran du workflow sans effacer son historique.

- **approved** : variante explicitement validée par le développeur dans l’atelier de design choisi.
- **synced** : handoff local complet et cohérent avec la variante approuvée.
- **implemented** : revue visuelle et comportementale terminée dans la stack cible.

## Propriété des artefacts

- `README.md`, le brief et les décisions sont **éditables et canoniques** : ne jamais les écraser automatiquement.
- `reference.png` est la **référence visuelle approuvée**.
- `export/` contient du contenu **généré et remplaçable** ; il n'est jamais présumé être du code de production.
- `assets/` contient les fichiers nécessaires à l'implémentation, avec des noms stables et sans secret.
- `prompt.md` conserve une recette reproductible, pas l'intégralité d'une conversation.

## Mode dégradé

Si Open Design ou l’atelier choisi est indisponible, utiliser le même brief et le même handoff avec Codex Cloud, des captures et la preview déclarée dans `ARCHITECTURE.md`. Le workflow ne doit jamais être bloqué par un outil externe.
