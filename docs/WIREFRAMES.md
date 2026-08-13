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

## Référence visuelle globale

Les principes UX, tokens, règles d'accessibilité et composants partagés sont définis dans [`DESIGN.md`](DESIGN.md). Ce fichier décrit les écrans ; il ne doit pas redéfinir le système visuel global.

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

<!-- Recette utilisée avec Claude Design, ou l'outil de fallback choisi. -->
<!-- Garder le prompt exact pour pouvoir régénérer ou faire évoluer. -->
<!-- Si pas encore généré, écrire le prompt ici avant de le soumettre. -->

**Intention :** <!-- résumé court -->
**Recette reproductible :** `docs/design/screens/S01/prompt.md`

#### Lien / asset

<!-- Prototype Claude Design ou outil de fallback. -->
<!-- Pour les outils sans lien public natif : exporter l'image dans docs/assets/. -->

- Outil : Claude Design <!-- chemin privilégié ; autre outil possible en fallback -->
- Lien / identifiant :
- Version approuvée :
- Statut : <!-- draft / review / approved / synced / implemented / obsolete -->
- Handoff : `docs/design/screens/S01/README.md`
- Référence : `docs/design/screens/S01/reference.png`

#### Maquette playground (optionnel)

<!-- Pré-maquette dans le mécanisme de preview déclaré dans ARCHITECTURE.md. -->
<!-- À utiliser pour les écrans interactifs ou quand le rendu réel doit être validé. -->
<!-- Voir docs/KICKOFF.md section "Le dossier src/playground/" pour les détails. -->
<!-- Statuts : `à valider` / `validée` / `portée` (intégrée dans pages/components). -->

- Fichier : <!-- chemin dépendant de la stack -->
- Statut : <!-- à valider / validée / portée -->
- Variantes explorées : <!-- ex : s01a-login.vue (magic link), s01b-login.vue (password+OAuth) -->


---

## Composants partagés

Le catalogue canonique vit dans `DESIGN.md`. L'inventaire d'un écran dans son handoff indique les composants réutilisés, créés ou modifiés.

---

## Responsive & breakpoints

<!-- Seulement si le responsive est non-trivial pour ce projet. -->
<!-- Sinon, supprimer cette section. -->

**Priorité :**          <!-- mobile-first / desktop-first -->
**Breakpoints :**       <!-- ex : Tailwind par défaut (sm/md/lg/xl) -->
**Écrans critiques :**  <!-- IDs des écrans où le responsive est le plus important -->
