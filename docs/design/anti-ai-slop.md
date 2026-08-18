# Anti « AI slop » — guide de détection

## Principe

Un pattern n’est pas interdit par nature. Une card, un gradient ou une animation est légitime s’il clarifie une relation, une hiérarchie ou l’identité définie dans `visual-direction.md`. Le signal d’alerte est son emploi par défaut, répétitif ou décoratif sans intention démontrable.

> **Composition before Components** : décider hiérarchie, flux, zones, rythme, espace négatif, densité, lecture et contraste avant de choisir les composants.

## Signaux d’alerte

| Signal | Question de contrôle | Alternative à explorer |
|---|---|---|
| Page ou dashboard entièrement en cards, parfois imbriquées | Chaque surface exprime-t-elle un groupe ou une action distincte ? | Grille éditoriale, sections ouvertes, lignes, tableaux, séparateurs, proximité |
| Rayons généreux et pills partout | La forme encode-t-elle une affordance ou un statut ? | Géométrie issue de la thesis, texte simple, angles ou rayons hiérarchisés |
| Glassmorphism, ombres, blobs ou halos | La profondeur ou l’ambiance aide-t-elle la compréhension ? | Contraste, couleur de surface, bordure, whitespace, imagerie signifiante |
| Gradient violet/bleu ou multiples accents | La palette vient-elle du produit et possède-t-elle des proportions ? | Dominante, neutres et accent sémantique documentés |
| Hero centré, sous-titre et deux boutons par défaut | La composition raconte-t-elle la promesse propre au produit ? | Preuve, démonstration, tension éditoriale, layout asymétrique justifié |
| Douze blocs « icône + titre + texte » | Les fonctionnalités ont-elles vraiment le même poids ? | Hiérarchie, scénario, comparaison, séquence, exemple réel |
| Illustration abstraite interchangeable | Informe-t-elle ou renforce-t-elle une règle d’imagerie ? | Asset propre, contenu produit, photographie dirigée ou absence d’image |
| Mosaïque de métriques uniforme | Quelle décision est prioritaire ? | Vue maîtresse, détail progressif, densité adaptée, regroupement sémantique |
| Ombres et profondeur excessives | Quel plan spatial est communiqué ? | Surfaces plates, bordures ou contraste local |
| Animations gratuites ou scroll artificiellement complexe | Quelle compréhension ou continuité est gagnée ? | Feedback discret, ordre naturel, état statique assumé |
| Gigantisme typographique sans intention | Le texte porte-t-il réellement la narration ? | Échelle adaptée au contenu, contraste de poids/largeur/rythme |
| Slogans vagues et fragments de trois mots | Le contenu prouve-t-il une valeur ? | Langage précis, exemple, donnée ou action utilisateur réelle |
| Composants décidés avant la composition | Le layout existerait-il sans bibliothèque UI ? | Schéma de lecture puis mapping vers les primitives de la stack |

## Test rapide

1. Masquer couleurs, effets et icônes : la hiérarchie reste-t-elle lisible ?
2. Remplacer le logo par celui d’un concurrent : l’interface paraît-elle encore propre au produit ?
3. Identifier trois choix reliés directement à la visual thesis.
4. Justifier chaque effet saillant par une fonction ou une intention.
5. Vérifier que l’originalité ne dégrade ni parcours, ni contraste, ni clavier, ni responsive, ni reduced motion.

Si les réponses sont faibles, retravailler d’abord composition, contenu et direction plutôt que d’ajouter du polish.
