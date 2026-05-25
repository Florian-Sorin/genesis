# Maquettes — [NOM DU PROJET]

<!-- Dernière mise à jour : YYYY-MM-DD -->
<!-- Lire FUNCTIONAL.md avant ce fichier. -->
<!-- Ce fichier a deux usages : -->
<!--   1. Garder une trace des prompts pour régénérer ou faire évoluer les maquettes. -->
<!--   2. Donner à l'agent une description précise de chaque écran avant de coder l'UI. -->
<!--                                                                                  -->
<!-- PRÉCÉDENCE : ce fichier décrit l'UI, pas le comportement métier.                -->
<!-- En cas de contradiction avec FUNCTIONAL.md, FUNCTIONAL.md gagne.                -->
<!-- Ce fichier doit alors être mis à jour pour s'aligner sur FUNCTIONAL.md.         -->

---

## Système de design

<!-- Décisions visuelles globales. L'agent s'y réfère pour tout composant UI. -->

**Style général :**      <!-- ex : clean / minimaliste / dashboard pro / grand public -->
**Couleur primaire :**   <!-- ex : #6366F1 (indigo) -->
**Couleur neutre :**     <!-- ex : zinc / slate / gray -->
**Mode sombre :**        <!-- oui / non / optionnel -->
**Typographie :**        <!-- ex : Inter (sans-serif système) -->
**Densité :**            <!-- compacte / normale / aérée -->
**Rayon des coins :**    <!-- ex : rounded-lg (Tailwind) -->
**Référence visuelle :** <!-- URL ou nom d'un produit dont tu t'inspires -->

---

## Index des écrans

<!-- Vue d'ensemble. Mettre à jour au fil de l'avancement. -->

| ID  | Écran | Module | Statut |
|-----|-------|--------|--------|
| S01 |       |        | à faire |
| S02 |       |        | fait |
| S03 |       |        | pas de maquette |

---

## Écrans

<!-- Une section H3 par écran. Copier-coller le bloc ci-dessous pour chaque nouvel écran. -->

### S01 — [Nom de l'écran]

<!-- ex : Dashboard principal, Page d'onboarding, Modal de création -->

#### Contexte

**Route :**       <!-- ex : /dashboard -->
**Accès :**       <!-- ex : utilisateur authentifié -->
**Déclencheur :** <!-- Depuis où l'utilisateur arrive sur cet écran -->

#### Contenu & layout

<!-- Description textuelle de ce que contient l'écran. -->
<!-- Zones, composants principaux, hiérarchie visuelle. -->
<!-- Pas besoin d'être exhaustif — les éléments importants suffisent. -->

-
-

#### Actions utilisateur

<!-- Ce que l'utilisateur peut faire depuis cet écran. -->
<!-- Format : action → conséquence -->

- Clique sur [...] → [...]
- Soumet le formulaire [...] → [...]

#### États

<!-- Les états visuels différents que cet écran peut avoir. -->

- **État vide (first use) :**
- **État chargement :**
- **État erreur :**
- **État nominal :**

#### Prompt maquette

<!-- Prompt utilisé pour générer la maquette via IA (v0, Claude, Visily...). -->
<!-- Garder le prompt exact pour pouvoir régénérer ou faire évoluer. -->
<!-- Si pas encore généré, écrire le prompt ici avant de le soumettre. -->

```
[coller le prompt ici]
```

#### Lien / asset

<!-- URL v0.dev, lien Visily, ou chemin vers l'image dans docs/assets/. -->

- Lien :
- Asset : `docs/assets/S01-[nom].png`

---

## Composants partagés

<!-- Éléments UI qui reviennent sur plusieurs écrans. -->
<!-- Documenter ici évite que l'agent les réinvente à chaque fois. -->

### [Nom du composant]

<!-- ex : Navbar, Sidebar, Card produit, Toast, Modal de confirmation -->

**Présent sur :**  <!-- IDs des écrans -->
**Props clés :**   <!-- les variantes ou paramètres importants -->
**Description :**

---

## Responsive & breakpoints

<!-- Seulement si le responsive est non-trivial pour ce projet. -->
<!-- Sinon, supprimer cette section. -->

**Priorité :**          <!-- mobile-first / desktop-first -->
**Breakpoints :**       <!-- ex : Tailwind par défaut (sm/md/lg/xl) -->
**Écrans critiques :**  <!-- IDs des écrans où le responsive est le plus important -->
