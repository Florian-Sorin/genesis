---
name: genesis-art-direction
description: Définir et versionner la direction artistique d’un projet Genesis avant toute exploration haute fidélité. Utiliser après les parcours UX et avant Open Design pour choisir PRODUCT ou AWARD, construire une visual thesis, analyser des références, fixer les anti-goals et dériver les principes du design system.
---

# Genesis Art Direction

## Charger les contraintes

Lire `docs/BRIEF.md`, les parcours utiles de `docs/FUNCTIONAL.md`, `docs/SECURITY.md`, puis `docs/design/design-brief.md`, `docs/DESIGN.md` et toute UI existante. Ne pas ouvrir l’atelier de maquette tant que les parcours et le job principal ne sont pas assez précis.

## Choisir l’ambition

- Choisir `PRODUCT` par défaut pour une application, un SaaS, un back-office ou un outil productif : utilisabilité, architecture de l’information, clarté, efficacité et cohérence priment.
- Choisir `AWARD` seulement sur demande explicite ou lorsque narration, marque, émotion et mémorabilité sont centrales. Le mode ne justifie à lui seul ni animation, ni scroll spécial, ni WebGL, ni dépendance.
- Pour un produit mixte, choisir le mode **par écran** sans créer deux identités : généralement PRODUCT dans l’application et AWARD sur les surfaces marketing.

Consigner le choix et sa justification dans `docs/design/design-brief.md`.

## Construire la direction

1. Formuler une **visual thesis** en une phrase : relier produit, usage ou histoire à un langage visuel concret. Refuser les formulations réduites à un secteur, une couleur et « moderne ».
2. Fixer 3 à 6 adjectifs de sensation et 3 à 7 anti-goals observables.
3. Appliquer **Composition before Components** : définir hiérarchie, flux, zones, rythme, espace négatif, densité, lecture et contraste avant de nommer cards, tabs ou accordions.
4. Chercher des références hors des concurrents directs : édition, signalétique, architecture, photographie, cinéma, industrie, mode, affiches, objets ou interfaces historiques. Pour AWARD, un moodboard analysé est obligatoire ; pour PRODUCT, il l’est dès que l’identité ou l’imagerie joue un rôle important.
5. Pour chaque référence, extraire des principes transférables (composition, rythme, typo, couleur, imagerie, navigation, interaction, motion) sans reproduire sa solution.
6. Définir typographie, couleur, forme/surfaces, imagerie, layout, motion, accessibilité et stratégie responsive. Lire `references/art-direction-checklist.md` pour les questions de contrôle.
7. Écrire la décision dans `docs/design/visual-direction.md`, puis seulement dériver les tokens et composants de `docs/DESIGN.md`.

## Gate avant Open Design

Ne passer à Open Design que si : le job et le flow sont validés ; le mode est justifié ; la visual thesis est spécifique ; les anti-goals sont testables ; les références sont analysées et non copiées ; les choix visuels servent la thesis ; la composition est décrite avant les composants ; accessibilité et responsive sont prévus.

Avant toute nouvelle vue importante, relire `visual-direction.md`, `DESIGN.md`, les principes et l’UI existante. Faire évoluer la direction canoniquement plutôt que dériver écran par écran.
