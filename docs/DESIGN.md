# Système de design — [NOM DU PROJET]

<!-- Dernière mise à jour : YYYY-MM-DD -->
<!-- Lire BRIEF.md et FUNCTIONAL.md avant ce fichier. -->
<!-- Source de vérité visuelle globale. Les règles métier restent dans FUNCTIONAL.md. -->

---

## 1. Principes UX

<!-- 3 à 5 principes actionnables qui permettent d'arbitrer un choix d'interface. -->

-
-
-

## 2. Plateformes et contexte d'usage

**Plateforme(s) cible(s) :** <!-- Web, iOS, Android, desktop... -->
**Conventions natives :** <!-- Human Interface Guidelines, Material Design... -->
**Contexte d'usage :** <!-- mobilité, faible connexion, usage prolongé... -->
**Navigation globale :** <!-- tabs, sidebar, stack... -->
**Priorité adaptative :** <!-- mobile-first, desktop-first, adaptive -->
**Viewports / appareils de référence :**

## 3. Direction visuelle

**Style général :**
**Références :**
**Anti-références :**
**Densité :**
**Mode sombre :** <!-- oui / non / plus tard -->
**Voix du contenu :**

## 4. Accessibilité

**Niveau cible :** <!-- ex. WCAG 2.2 AA -->
**Contraste :**
**Navigation clavier / focus :**
**Lecteurs d'écran / labels :**
**Taille tactile minimale :**
**Motion réduite :**
**Contraintes complémentaires :**

## 5. Tokens

<!-- Séparer primitives et usages sémantiques. Ne pas référencer une primitive directement dans un écran. -->

### 5.1 Couleurs

| Token sémantique | Primitive | Usage |
|---|---|---|
| `color.action.primary` |  |  |
| `color.surface.default` |  |  |
| `color.text.default` |  |  |

### 5.2 Typographie

| Token | Police / graisse / taille / ligne | Usage |
|---|---|---|
| `type.heading.large` |  |  |
| `type.body.default` |  |  |
| `type.label.default` |  |  |

### 5.3 Espacements, dimensions et forme

**Échelle d'espacement :**
**Rayons :**
**Élévations / ombres :**
**Grille :**
**Icônes :**
**Motion :**

## 6. Catalogue des composants

<!-- Un identifiant stable par composant. Tout nouveau pattern doit être ajouté ici. -->

### C01 — [Nom du composant]

**Statut :** <!-- draft / approved / implemented / deprecated -->
**Anatomie :**
**Variantes et tailles :**
**États :** <!-- default, hover, focus, disabled, loading, error... -->
**Comportement :**
**Accessibilité :**
**Présent sur :** <!-- IDs d'écran -->
**Implémentation :** <!-- chemin quand disponible -->

## 7. Assets et contenu

**Format des icônes :**
**Format des images :**
**Règles de nommage :**
**Contenu représentatif :** <!-- vraies longueurs, cas extrêmes, localisation -->

## 8. Interopérabilité des ateliers

**Atelier courant :** <!-- Open Design / Codex / autre / aucun -->
**Projet / espace (optionnel) :**
**Système synchronisé le :**
**Version / identifiant :**
**Limites ou fallback cloud :**

`DESIGN.md` et les handoffs Git sont canoniques. L’atelier n’est qu’un éditeur ou un générateur interchangeable : aucune décision nécessaire à l’implémentation ne doit vivre uniquement dans son format propriétaire.

## 9. Validation visuelle

**Viewports de recette :** <!-- ex : 390×844, 768×1024 si pertinent, 1440×900 -->
**Routes critiques :**
**Données de recette :**
**Tolérances / écarts acceptés :**

Appliquer la boucle légère décrite dans [`VISUAL-QA.md`](VISUAL-QA.md). Les références approuvées vivent avec chaque handoff ; les captures d’exécution restent temporaires sauf choix explicite de baselines versionnées.

## 10. Changelog

- YYYY-MM-DD — [décision ou évolution visuelle]
