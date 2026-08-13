# /design [module]

Conçoit ou met à jour un module avec Claude Design, puis synchronise un handoff exploitable par Claude Code.

## 1. Charger le contexte

1. Lire `FUNCTIONAL.md`, `DESIGN.md`, `WIREFRAMES.md` et les apprentissages pertinents de `JOURNAL.md`.
2. Identifier le module demandé ; s'il manque, demander une seule clarification.
3. Créer ou mettre à jour `docs/design/modules/[module].md` depuis `_MODULE-BRIEF-TEMPLATE.md`.
4. Référencer les sections sources et noter leur version ou date. Ne pas recopier inutilement les règles.

## 2. Préparer la conception

1. Définir l'objectif, le parcours, l'inventaire des écrans et leurs états obligatoires.
2. Renseigner plateforme, viewports, contenu représentatif, composants et tokens existants, accessibilité et hors scope.
3. Mettre l'index et les sections de `WIREFRAMES.md` à jour.
4. Présenter ce brief au développeur et attendre sa validation avant d'ouvrir Claude Design.

## 3. Piloter Claude Design

1. Produire une structure basse fidélité.
2. Explorer au maximum deux ou trois directions visuelles.
3. Faire sélectionner explicitement une direction au développeur.
4. Grouper les retours en une passe : structure, contenu, hiérarchie, composants, adaptation, accessibilité.
5. Vérifier les interactions et tous les états dans la passe finale.

Claude Design partage le quota des autres usages Claude. Ne pas multiplier les micro-itérations. En cas d'indisponibilité, conserver le même brief et utiliser des captures avec la preview déclarée dans `ARCHITECTURE.md`.

## 4. Synchroniser le handoff

Pour chaque écran approuvé :

1. Créer `docs/design/screens/SXX/README.md` depuis `_SCREEN-HANDOFF-TEMPLATE.md`.
2. Ajouter `reference.png`, `prompt.md`, les assets et, si utile, l'export généré.
3. Documenter version, source Claude Design, viewports, structure, interactions, états, composants, tokens, adaptation, accessibilité et écarts connus.
4. Marquer clairement les fichiers canoniques, éditables ou générés/remplaçables.
5. Passer l'écran de `approved` à `synced` uniquement quand le paquet est complet ; reporter ce statut dans `WIREFRAMES.md`.

## 5. Gate module

Produire la checklist du « Gate module » de `KICKOFF.md`. Ne pas créer les stories avant que le handoff design soit validé. Après validation, proposer `/new-story` pour découper le module.
