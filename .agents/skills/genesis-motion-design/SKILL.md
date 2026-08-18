---
name: genesis-motion-design
description: Définir, spécifier et contrôler une motion thesis pour une interface Genesis. Utiliser lorsqu’une direction visuelle, un handoff ou une implémentation comporte transitions, micro-interactions, scroll, feedback animé ou narration, particulièrement en mode AWARD, sans ajouter automatiquement de bibliothèque.
---

# Genesis Motion Design

## Partir de l’intention

Lire `docs/design/visual-direction.md`, les parcours, le handoff et la stack. Nommer d’abord le rôle de la motion : feedback, continuité spatiale, hiérarchie, progression, tactilité ou narration. Si aucune intention ne résiste à la question « qu’est-ce que cela aide à comprendre ? », rester statique.

## Spécifier un système léger

1. Définir les événements : déclencheur, propriété animée, durée, easing, interruption et état final.
2. Limiter les familles de mouvement ; faire découler tempo et amplitude de la visual thesis.
3. Privilégier transform et opacity lorsque pertinent, sans masquer un problème de layout.
4. Prévoir chargement, succès, erreur, changement de route et micro-feedback utiles ; ne pas animer chaque composant.
5. Définir la variante `prefers-reduced-motion` : suppression ou substitution sans perte de sens.
6. Tester clavier, pointer, tactile, appareils modestes et interruptions rapides.

Ne jamais déduire GSAP, Lenis, parallaxe, scroll horizontal, WebGL ou une autre dépendance du mode AWARD. Utiliser d’abord les capacités de la stack ; toute nouvelle technologie exige une justification et une mise à jour d’`ARCHITECTURE.md`.

## Livrables

Écrire la motion thesis et les règles globales dans `docs/design/visual-direction.md`, les tokens réutilisables dans `docs/DESIGN.md`, et les séquences propres à l’écran dans son handoff. La critique finale s’effectue sur le navigateur, mouvement normal puis réduit.
