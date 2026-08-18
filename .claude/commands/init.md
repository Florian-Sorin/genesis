# /init

Orchestre le workflow d'initialisation d'un nouveau projet (de l'idée à la première story prête à coder).

> Source de vérité du workflow : `docs/KICKOFF.md`. Cette commande l'exécute.
> Si le projet est déjà bootstrappé (BRIEF.md rempli, stories existantes), utiliser `/story` ou `/new-story` à la place.

---

## Instructions

### 0. Détection de l'état du projet

1. Lire `docs/BRIEF.md`, `docs/FUNCTIONAL.md`, `docs/ARCHITECTURE.md`, `docs/WIREFRAMES.md`, `docs/STORIES.md`.
2. Évaluer où en est le projet :
   - **Phase 1** : `BRIEF.md` contient encore `[NOM DU PROJET]` ou des placeholders dans les sections obligatoires.
   - **Phase 2** : BRIEF rempli, mais `FUNCTIONAL.md` ou `ARCHITECTURE.md` ont encore des placeholders structurants.
   - **Phase 3** : docs structurels OK, mais `DESIGN.md` contient encore ses placeholders structurants.
   - **Phase 4** : fondations design validées, mais `WIREFRAMES.md` vide ou `STORIES.md` sans story réelle.
   - **Bootstrappé** : au moins une story `[done]` ou plusieurs stories `[todo]` réelles. Dans ce cas, **arrêter** et signaler au dev qu'il doit utiliser `/story` ou `/new-story`.
3. Demander au dev de confirmer la phase détectée avant de continuer.

### 1. Exécuter la phase concernée

Suivre `docs/KICKOFF.md` à la lettre. Règles transverses :

- **Une phase à la fois.** Ne pas anticiper sur la suivante.
- **Bloc par bloc.** En Phase 2, terminer un bloc (mise à jour fichier + validation dev) avant de passer au suivant.
- **Pas d'invention.** Quand une info manque, marquer `<!-- TODO : à clarifier -->` plutôt que d'inventer une valeur plausible.
- **Préférer `AskQuestion`** pour les choix binaires/multiples. Texte libre uniquement quand la réponse est vraiment ouverte.

#### Phase 1 — Pitch brut

1. Si pas de pitch fourni avec la commande : demander au dev son pitch libre (5-15 lignes).
2. Reformuler en 3-5 lignes pour vérifier la compréhension.
3. Remplir `docs/BRIEF.md` en mode draft (sections de la phase 1 dans KICKOFF.md).
4. Lancer le **Gate 1** (cf. ci-dessous).

#### Phase 2 — Interview structurée

Enchaîner les 5 blocs définis dans `docs/KICKOFF.md` (Périmètre, Parcours, Auth/Data, Stack, Sécurité). Pour chaque bloc :

1. Poser les questions du bloc.
2. Mettre à jour le fichier visé.
3. Présenter au dev le diff du fichier (ou résumé des sections modifiées).
4. Attendre validation explicite avant de passer au bloc suivant.

À la fin des 5 blocs, lancer le **Gate 2**.

#### Phase 3 — Fondations UX/UI

1. Remplir `DESIGN.md` et la section Design preview de `ARCHITECTURE.md`.
2. Choisir l’atelier (`Open Design`, agent/preview, autre) et documenter le fallback cloud.
3. Lancer le Gate design de `KICKOFF.md`.

#### Phase 4 — Itération par module

1. Lire la liste des modules MVP dans `FUNCTIONAL.md` section 3.
2. Pour chaque module, dans l'ordre :
   - **4a-4c. Design** : exécuter `/design [module]`, concevoir avec l’atelier disponible ou la preview de la stack, remplir `WIREFRAMES.md` et synchroniser les handoffs locaux.
   - **4d. Stories** : utiliser `node scripts/new-story.mjs` pour chaque story du module. Enrichir le fichier généré.
   - Lancer le **Gate module** pour ce module.
   - Demander au dev s'il veut enchaîner sur le module suivant ou commencer à coder le module qui vient d'être préparé.

### 2. Mécanique des gates

Chaque gate suit le même protocole (= choix `both` du dev) :

1. **Checklist automatique** : l'agent vérifie chaque case définie dans la section "Gate X" de `docs/KICKOFF.md`. Pour chaque case : `✅` ou `❌ — [ce qui manque]`.
2. **Si la checklist a des `❌`** : signaler précisément ce qui manque et proposer de revenir compléter. Ne pas passer à la phase suivante.
3. **Si la checklist est toute verte** : produire un **résumé** structuré pour le dev :
   - Phase 1 : résumé de la vision (Problème + Solution + Cible + Hors scope).
   - Phase 2 : résumé du périmètre fonctionnel (modules MVP), de la stack, des points sécurité notables.
   - Phase 3 : récap des fondations visuelles.
   - Phase 4 : récap du module (écrans définis + stories créées + dépendances).
4. **Demander validation explicite** : "Go pour passer à la phase suivante / au module suivant ?" Attendre confirmation du dev.

### 3. Fin de l'initialisation

Une fois la première story prête à coder :

1. Confirmer au dev que le projet est bootstrappé.
2. Pointer vers `/story` pour démarrer le codage.
3. Suggérer (mais ne pas faire automatiquement) :
   - Ajouter une entrée dans `JOURNAL.md` documentant les décisions structurantes prises pendant l'init (notamment les ADR créés en Phase 2).
   - Si le workflow ne sera plus utilisé : `docs/KICKOFF.md` peut être conservé comme référence ou supprimé — au choix du dev.

---

## Règles de comportement spécifiques

- **Ne jamais sauter une phase**, même si le dev l'indique connaître. Le gate sert à attraper les angles morts.
- **Ne jamais marquer une story `[done]`** pendant l'init. L'init ne code rien, elle prépare.
- **Ne jamais lancer `scripts/new-story.mjs`** avant la Phase 4 et la validation du Gate module. Une story créée trop tôt est une story à réécrire.
- **Limiter le ping-pong** : grouper les questions par bloc (5 à 10 questions max par tour), pas une question à la fois.
- **Si le dev veut interrompre** : sauvegarder l'état actuel des fichiers (les TODOs marqués `<!-- TODO : ... -->` servent de bookmarks) et signaler où on en était.
