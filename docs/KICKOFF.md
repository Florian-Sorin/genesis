# Workflow d'initialisation projet

<!-- Document de référence pour démarrer un nouveau projet à partir de ce template. -->
<!-- Peut être supprimé une fois le projet bootstrappé (ou conservé comme référence). -->
<!-- Source de vérité du workflow : les slash commands `/init` et `/ready` s'appuient sur ce fichier. -->
<!-- Toute évolution du workflow se fait ici en premier — les commandes doivent rester alignées. -->

---

## But

Amener un projet **de l'idée floue à la première story prête à coder**, sans coder de travers en cours de route. Investissement type : ~1 h de spécification pour économiser des jours de refacto.

---

## Principe directeur

**Pas de phase suivante sans gate validé.** Un gate = une checklist automatique (l'agent vérifie que les sections obligatoires sont remplies) + un résumé soumis au développeur pour validation finale explicite.

Une story créée sur des bases non validées sera réécrite. Mieux vaut bloquer en Phase 2 que coder dans le vide.

---

## Vue d'ensemble

```
Phase 1 — Pitch brut                           (5 min, dev seul)
   ↓ [gate 1 : BRIEF.md validé]
Phase 2 — Interview structurée                 (30-45 min, dev + agent)
   ↓ [gate 2 : FUNCTIONAL + ARCHITECTURE + SECURITY validés]
Phase 3 — Itération par module fonctionnel     (variable, dev + agent)
   pour chaque module MVP, dans l'ordre :
     3a. Wireframes du module                  (WIREFRAMES.md + lien outil externe au choix)
     3b. Stories du module                     (STORIES.md + docs/stories/ST-XXX-*.md)
     ↓ [gate 3 : module validé avant le suivant]
   ↓
Codage story par story (workflow normal /story, /ready, /done)
```

---

## Phase 1 — Pitch brut

**Objectif :** capter la vision sans la dénaturer par des questions prématurées.

### Ce que fait le dev

Envoie un message libre de 5-15 lignes répondant grosso modo à :

- Qu'est-ce que tu veux construire ? (1 phrase)
- Pour qui ? (utilisateur cible)
- Pourquoi ? (le pain concret, pas une opportunité de marché)
- Stack envisagée ou "à décider"
- Contraintes (budget, timeline, solo)

Pas besoin que ce soit bien rédigé. Brain dump suffit.

### Ce que fait l'agent

1. Lire le pitch.
2. **Ne pas commencer l'interview.** Reformuler en 3-5 lignes pour vérifier que la vision a été bien comprise.
3. Remplir `docs/BRIEF.md` en mode draft (sections : Problème, Solution, Cible, Positionnement, "Ce que ce produit n'est PAS", Indicateur de succès, Contraintes).
4. **Marquer en clair les zones encore floues** avec `<!-- TODO : à clarifier avec dev -->` plutôt qu'inventer.
5. Présenter le BRIEF rempli au dev.

### Gate 1 — Sortie de Phase 1

Checklist automatique :

- [ ] `BRIEF.md` n'a plus de placeholder `[NOM DU PROJET]` ou `<!-- ... -->` vide dans les sections obligatoires.
- [ ] Section "Ce que ce produit n'est PAS" remplie avec au moins 2 items.
- [ ] Section "Cible" identifie un utilisateur principal concret.

Si KO → l'agent signale ce qui manque et pose **uniquement** les questions nécessaires à combler les vides. Pas plus.

Validation explicite : le dev lit le BRIEF rempli et dit "go" ou demande des corrections.

---

## Phase 2 — Interview structurée

**Objectif :** remplir `FUNCTIONAL.md`, `ARCHITECTURE.md`, `SECURITY.md` en posant les bonnes questions, **par blocs** et non en vrac.

### Méthode

L'agent enchaîne 5 blocs. Chaque bloc se termine par une mise à jour du fichier concerné et une validation explicite du dev avant de passer au suivant. Préférer `AskQuestion` pour les choix binaires/multiples, texte libre pour les questions ouvertes.

#### Bloc A — Périmètre fonctionnel

**Fichier visé :** `FUNCTIONAL.md` sections 1 (vue d'ensemble) et 3 (modules fonctionnels).

Questions à couvrir :

- Vue d'ensemble fonctionnelle (3-5 phrases du point de vue utilisateur).
- Identifier les modules fonctionnels du MVP (Auth, Dashboard, [domaine métier], Facturation…).
- Pour chaque module : les 3-5 fonctionnalités principales `[MVP]`, les `[V2]` et `[LATER]`.
- Hors scope explicite par module.

#### Bloc B — Parcours utilisateur

**Fichier visé :** `FUNCTIONAL.md` section 2.

Questions à couvrir :

- Le parcours de bout en bout pour le cas d'usage central (de la découverte à l'action principale).
- Identifier les 1-3 parcours critiques qui devront être testés en E2E.

#### Bloc C — Auth, rôles & data

**Fichiers visés :** `FUNCTIONAL.md` sections 4 et 5, `SECURITY.md` section 2.

Questions à couvrir :

- Méthode d'auth (email/password, OAuth, magic link, etc.).
- Rôles utilisateur et matrice qui-peut-quoi.
- Entités métier principales (3-5 max) et leurs relations.
- Données sensibles manipulées (PII, paiement, contenus utilisateur).

#### Bloc D — Stack technique

**Fichier visé :** `ARCHITECTURE.md` sections 1, 7 (langue), 9 (env).

Questions à couvrir :

- Confirmer ou décider la stack frontend/backend/BDD.
- Services tiers nécessaires (emails, paiement, IA, analytics).
- Budget infra mensuel cible.
- Multilingue ou non (impact i18n).

À chaque choix structurant : créer une entrée ADR dans `ARCHITECTURE.md` section 8.

#### Bloc E — Sécurité spécifique

**Fichier visé :** `SECURITY.md` (compléter les sections déjà cadrées par défaut).

Questions à couvrir :

- MFA prévu pour le MVP ou plus tard ?
- Paiement : provider choisi (Stripe, Lemon Squeezy…) → impact webhook signing.
- Endpoints IA : oui/non → impact rate-limiting + prompt injection.
- Données soumises à RGPD / régulation sectorielle particulière ?

### Gate 2 — Sortie de Phase 2

Checklist automatique :

- [ ] `FUNCTIONAL.md` : sections 1, 2, 3 (au moins un module détaillé), 4 remplies.
- [ ] `FUNCTIONAL.md` section 7 ("Questions ouvertes") : aucune question bloquante restante.
- [ ] `ARCHITECTURE.md` : section 1 (Stack) complète, pas de placeholder dans Frontend/Backend.
- [ ] `ARCHITECTURE.md` section 8 : au moins 1 ADR si un choix structurant a été fait.
- [ ] `SECURITY.md` section 2 (Auth) cohérente avec `FUNCTIONAL.md` section 4.

Si KO → l'agent signale les sections incomplètes et propose de reprendre le bloc concerné.

Validation explicite : résumé du dev de chaque fichier + "go" final.

---

## Phase 3 — Itération par module

**Objectif :** définir les wireframes et le découpage en stories **un module à la fois**, dans l'ordre de priorité.

Avantage : on peut commencer à coder le module 1 pendant qu'on prépare les wireframes du module 2. Feedback rapide.

### Pour chaque module MVP, dans l'ordre

#### 3a. Wireframes du module

1. Lister les écrans du module dans `WIREFRAMES.md` (index + section H3 par écran).
2. Pour chaque écran, remplir : Route, Accès, Contenu & layout (description courte), Actions utilisateur, États.
3. **Source de vérité visuelle = lien externe** (au choix du dev selon ses préférences et contraintes budget).
   Outils courants 2026 (à arbitrer projet par projet) :
   - **Uizard / Visily** — IA générative + édition, free tier généreux, lien partageable.
   - **Excalidraw** — gratuit open source, AI native pour wireframes basse-fi.
   - **Figma** — référence du marché, free 3 fichiers/3 pages (vite saturé sur un vrai projet).
   - **Penpot** — alternative Figma open source illimitée, pas d'IA native.
   - **v0.dev / Lovable** — génère React, peu adapté si la stack n'est pas React.
4. Le dev colle le lien dans le champ "Lien / asset" de chaque écran. Si pas encore généré, noter le prompt dans "Prompt maquette".
5. **Optionnel : pré-maquette en code (`src/playground/`)**. Pour les écrans où la maquette externe ne suffit pas (interactions, états dynamiques, validation du rendu réel), Cursor peut générer une page Vue/Nuxt jetable dans `src/playground/sXX-*.vue`. Voir section "Le dossier playground/" ci-dessous.
6. Identifier les composants partagés (navbar, sidebar, modaux récurrents) et les documenter en bas de fichier.

#### 3b. Stories du module

1. Découper le module en stories `MVP` (taille cible : 1-3 demi-journées de dev).
2. Pour chaque story : utiliser `scripts/new-story.mjs` (titre, priorité, dépendances, écrans, module).
3. Enrichir chaque fichier `docs/stories/ST-XXX-*.md` :
   - Contexte déduit du module fonctionnel.
   - Tâches techniques suggérées (à valider).
   - Fichiers concernés (cf. `ARCHITECTURE.md` section 2).
   - Tests E2E et unit à écrire (cf. `ARCHITECTURE.md` section 5).
   - Critères de done spécifiques.
   - Impact sécurité si applicable (cf. `SECURITY.md` section 9).

### Gate 3 — Sortie de module

Checklist automatique :

- [ ] `WIREFRAMES.md` : tous les écrans du module ont une section H3 remplie (a minima : Route, Accès, Contenu, Actions).
- [ ] `WIREFRAMES.md` : index à jour, statut des écrans cohérent.
- [ ] `STORIES.md` : toutes les stories du module sont dans le backlog MVP avec un ID séquentiel.
- [ ] Chaque story du module a son fichier `docs/stories/ST-XXX-*.md` et passe la Definition of Ready (cf. `AGENTS.md`).
- [ ] Les dépendances entre stories sont cohérentes (pas de cycle, pas de référence à une story inexistante).

Si KO → l'agent signale ce qui manque, propose de compléter.

Validation explicite : le dev relit le backlog du module et valide.

**À partir de là**, le workflow normal reprend : `/story`, `/ready`, `/done`.

---

## Le dossier `src/playground/`

**Rôle :** zone tampon entre la maquette externe (vision) et l'intégration finale (`pages/`, `components/`).

### Quand l'utiliser

- L'écran a un comportement interactif difficile à représenter dans Uizard/Figma (animations, états dynamiques, validation de formulaire en temps réel).
- Tu veux **voir le rendu réel** (vrais composants shadcn-vue, vrais espacements Tailwind, vraie data) avant de t'engager.
- Tu veux **explorer 2-3 variantes** d'un écran en parallèle sans polluer `pages/`.

### Quand **ne pas** l'utiliser

- L'écran est simple et la maquette externe suffit → vas directement dans `pages/`.
- Tu codes la version finale dès le départ → pas besoin de pont.

### Convention

```
src/playground/
├── s01-login.vue              # une page par écran, naming aligné sur WIREFRAMES.md
├── s02-magic-link-confirm.vue
├── README.md                  # liste des maquettes, statut (à valider / validée / portée)
```

- Accessible via une route dédiée (ex : Nuxt → `pages/playground/[name].vue` qui charge dynamiquement).
- Ou via un script de build dédié, au choix.
- Chaque fichier référence l'écran (`<!-- S01 — cf. WIREFRAMES.md -->` en tête).

### Cycle de vie

1. **Création** — pendant la Phase 3 ou avant de prendre une story de codage UI lourde.
2. **Validation** — quand la maquette est OK, tu portes le code vers `pages/` ou `components/`.
3. **Archive** — en fin de MVP, lancer `node scripts/archive-mockups.mjs` pour déplacer tout vers `docs/assets/playground-archive/` (référence historique).
4. **Suppression du dossier** — une fois archivé, `src/playground/` est supprimé du projet.

### Référence dans `WIREFRAMES.md`

Chaque écran peut avoir, en plus du lien externe :

```markdown
**Maquette playground :** `src/playground/s01-login.vue` (statut : à valider / validée / portée)
```

---

## Gestion des changements en cours

Une fois en phase de codage, les wireframes peuvent évoluer entre leur écriture initiale et le moment où la story est prise. Deux cas :

### Ajustement mineur

Un bouton à déplacer, un libellé à changer, l'ordre des champs d'un formulaire.

→ **Au moment de prendre la story** (commande `/ready`) :

1. L'agent affiche la section `WIREFRAMES.md` correspondant aux écrans de la story.
2. Le dev confirme : "OK tel quel" / "ajustement mineur : [description]" / "changement structurel".
3. Si ajustement mineur : l'agent patche `WIREFRAMES.md` localement, commit dédié `[ST-XXX] adjust wireframes for [écran]`, puis on continue.

### Changement structurel

Un nouvel écran apparaît, un flow est modifié, une étape disparaît.

→ **Stop. On remonte à `FUNCTIONAL.md`** :

1. Le comportement métier change-t-il ?
2. Si **oui** : mettre à jour `FUNCTIONAL.md` (source de vérité comportementale), puis `WIREFRAMES.md`, puis ré-évaluer la story (peut nécessiter découpage différent).
3. Si **non** (juste un changement d'UI) : mettre à jour `WIREFRAMES.md` seulement, mais s'interroger sur la raison du changement.

Dans tous les cas : entrée dans `JOURNAL.md` si le changement révèle un apprentissage.

---

## Definition of Ready

Source unique : `AGENTS.md` section "Definition of Ready". Ce workflow ne duplique pas la checklist pour éviter le drift. Les critères qui touchent au workflow d'initialisation (module spécifié, wireframes présents, check OK/mineur/structurel) y sont déjà intégrés.

---

## Anti-patterns à éviter

- ❌ Démarrer le découpage en stories avant que `FUNCTIONAL.md` ne soit gelé. Tu vas réécrire.
- ❌ Sauter la Phase 1 et démarrer directement par l'interview structurée. Sans BRIEF clair, l'interview part dans tous les sens.
- ❌ Définir tous les wireframes du MVP d'un coup avant de coder. Tu vas redessiner les modules 3 et 4 après avoir codé le module 1.
- ❌ Modifier les wireframes en silence pendant le développement d'une story. Toujours faire un commit dédié `[ST-XXX] adjust wireframes`.
- ❌ Considérer ce workflow comme intangible. Si un projet est ultra-simple, sauter des blocs est acceptable — mais conscient, pas en mode "j'ai oublié".

---

## Quand utiliser ce workflow

- ✅ Projet from-scratch, à partir de ce template.
- ✅ Refonte majeure d'un produit existant (équivalent d'un from-scratch).
- ❌ Ajout d'une feature sur un projet déjà bootstrappé → utiliser `/new-story` directement.
- ❌ Bug fix, refacto local, amélioration UX ponctuelle → workflow normal.
