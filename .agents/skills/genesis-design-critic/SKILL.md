---
name: genesis-design-critic
description: Effectuer une critique visuelle indépendante et mesurable d’une maquette ou interface Genesis. Utiliser après une proposition Open Design, un prototype ou une implémentation, à partir de captures réelles multi-viewports, pour détecter l’AI slop, scorer la qualité, prioriser les corrections et décider la validation.
---

# Genesis Design Critic

## Préparer les preuves

Lire `docs/design/visual-direction.md`, `docs/DESIGN.md`, le wireframe et le handoff de l’écran, puis `docs/design/anti-ai-slop.md`. Critiquer le **rendu**, pas seulement le code. Utiliser les captures mobile, tablette, desktop et grand desktop prévues par `docs/VISUAL-QA.md`, avec contenu représentatif et cas extrêmes.

Séparer autant que possible la passe de critique de la passe de génération : adopter une posture contradictoire, chercher les défauts et ne pas défendre les choix existants.

## Évaluer

Noter chaque axe de 0 à 10, avec une preuve visible et une correction possible :

1. identité visuelle ;
2. pertinence produit ;
3. hiérarchie ;
4. composition ;
5. typographie ;
6. couleur et contraste ;
7. clarté UX et accessibilité ;
8. cohérence et responsive ;
9. caractère distinctif / risque d’AI slop ;
10. finition et détails.

Total PRODUCT : `/100`. En mode AWARD, conserver `/100` mais remplacer l’axe 2 par « pertinence et narration », l’axe 8 par « cohérence, responsive et motion », et exiger dans les preuves art direction, storytelling, mémorabilité et craft. Ne jamais compenser une UX défaillante par une note artistique.

Répondre explicitement : **« Ce design ressemble-t-il à une interface générée par IA ? »** Lister les indices, même avec un bon score.

## Inspecter le navigateur

Vérifier à chaque viewport : overflow horizontal, collisions, wrapping, rythme vertical, densité, contraste, focus, tailles tactiles, états, éléments sticky, navigation clavier, contenu long/court et réduction de mouvement. Toute régression fonctionnelle, accessibilité critique ou rupture responsive est bloquante.

## Piloter la correction

1. Classer les constats : bloquant, majeur, mineur.
2. Retenir au maximum trois problèmes racines à plus fort impact ; éviter la liste cosmétique infinie.
3. Prescrire le résultat attendu, sans imposer arbitrairement un composant.
4. Corriger, reprendre les mêmes captures, puis rescoring complet.
5. Arrêter à 2 passes par défaut, 3 maximum. Valider à `>= 80/100` en PRODUCT ou `>= 85/100` en AWARD, sans bloquant et sans axe `< 6`. Sinon documenter les écarts et demander un arbitrage.

Consigner score, constats, corrections et décision dans la section de revue du handoff. Un score n’est pas une preuve : les captures et observations le sont.
