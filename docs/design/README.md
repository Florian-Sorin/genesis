# Handoff design

Ce dossier contient le contexte et les livrables qui relient Open Design à l'implémentation dans le dépôt. Open Design est l’atelier principal ; son fallback applique les mêmes contrats, et aucun choix nécessaire à l'implémentation ne doit vivre uniquement dans l'outil externe.

Design Intelligence encadre l’atelier sans le remplacer : UX validée → ambition → direction et références → système → Open Design → critique sur captures → corrections → validation → implémentation.

## Structure

```text
docs/design/
├── design-brief.md
├── visual-direction.md
├── anti-ai-slop.md
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

## Outils optionnels et pratiques Codex

- Les skills projet vivent dans `.agents/skills/<nom>/SKILL.md` avec métadonnées UI sous `agents/openai.yaml`. Aucun package applicatif n’est requis.
- Les pratiques frontend sont distribuées entre les skills Genesis, `visual-direction.md` et `anti-ai-slop.md`, sans recopier un hypothétique skill externe. Un skill OpenAI officiel peut être installé ultérieurement comme complément d’implémentation après vérification de sa source et de sa compatibilité ; il ne remplace pas les gates Genesis.
- Figma est un passage facultatif de raffinement après Open Design pour une équipe ou un projet graphique exigeant. Le chemin nominal reste Genesis → Open Design → handoff Git → code ; aucun livrable canonique ne dépend de Figma.
- Toute intégration externe, plugin ou MCP doit rester optionnelle, documentée dans `ARCHITECTURE.md` si adoptée et sans décision enfermée dans un format propriétaire.
