# Spécifications fonctionnelles — [NOM DU PROJET]

<!-- Document vivant. Mettre à jour au fil des itérations. -->
<!-- Dernière mise à jour : YYYY-MM-DD -->
<!-- Lire BRIEF.md avant ce fichier. -->
<!--                                                                                -->
<!-- PRÉCÉDENCE : ce fichier est la SOURCE DE VÉRITÉ COMPORTEMENTALE.              -->
<!-- En cas de contradiction avec WIREFRAMES.md, FUNCTIONAL.md gagne.              -->
<!-- WIREFRAMES.md doit alors être mis à jour pour refléter le comportement décrit ici.-->

## Légende

`[MVP]`   — inclus dans la première version shippable
`[V2]`    — prévu, mais pas bloquant pour le lancement
`[LATER]` — idée à garder, hors scope pour l'instant

---

## 1. Vue d'ensemble fonctionnelle

<!-- 3-5 phrases. Ce que l'utilisateur peut faire avec le produit, de bout en bout. -->
<!-- Pas de détail technique. C'est le résumé qu'un utilisateur comprendrait. -->

---

## 2. Parcours utilisateur principal

<!-- Le flow de bout en bout pour le cas d'usage central. -->
<!-- Format : étapes numérotées, du point de vue utilisateur. -->
<!-- Un seul parcours ici — les variantes vont dans les modules. -->

1.
2.
3.

---

## 3. Modules fonctionnels

<!-- Découper le produit en modules cohérents (ex : Auth, Dashboard, Facturation...). -->
<!-- Chaque module = une section H3. -->

### 3.1 [Nom du module] `[MVP]`

<!-- Description courte du module : ce qu'il fait, à qui il sert. -->

#### Fonctionnalités

<!-- Liste des features. Chaque item = une capacité utilisateur claire. -->

- `[MVP]` L'utilisateur peut...
- `[MVP]` L'utilisateur peut...
- `[V2]`  L'utilisateur peut...

#### Règles métier

<!-- Contraintes, validations, logiques conditionnelles. -->
<!-- C'est ici que vont les "si... alors..." qui guident l'agent. -->

-
-

#### Edge cases

<!-- Ce qui peut mal tourner et comment le produit doit réagir. -->

-
-

#### Hors scope

<!-- Ce que ce module ne fait PAS (évite les mauvaises interprétations). -->

-

---

## 4. Authentification & accès

<!-- Séparé car transversal à tous les modules. -->

**Méthode :**    <!-- ex : Email/password, OAuth (Google ?), magic link, etc. -->
**Rôles :**      <!-- user / admin / guest / etc. + ce que chaque rôle peut faire -->
**Sessions :**   <!-- Durée, refresh, comportement multi-device -->
**Onboarding :** <!-- Ce qui se passe juste après la création de compte -->

---

## 5. Modèle de données (vue fonctionnelle)

<!-- Pas le schéma SQL — ça va dans ARCHITECTURE.md. -->
<!-- Ici : les entités métier, leurs attributs importants, leurs relations. -->
<!-- Format libre, pseudo-code ou bullet points suffisent. -->

### [Entité]

- Attributs clés :
- Relations :
- Règles :

---

## 6. Notifications & emails `[MVP]`

<!-- Liste des événements qui déclenchent une communication. -->
<!-- Pour chaque événement : déclencheur / canal (email, in-app, push) / destinataire. -->

| Événement | Canal | Destinataire | Priorité |
|-----------|-------|--------------|----------|
|           |       |              |          |

---

## 7. Questions ouvertes

<!-- Décisions non prises. Permet de ne pas bloquer la rédaction -->
<!-- et de garder une trace de ce qui reste à trancher. -->
<!-- Format : question + contexte + options envisagées. -->
<!-- Supprimer quand la décision est prise (la reporter dans le bon module). -->

- [ ]
- [ ]

---

## 8. Changelog fonctionnel

<!-- Historique des décisions importantes. -->
<!-- Permet à l'agent de comprendre pourquoi certains choix ont été faits. -->

- YYYY-MM-DD — [description du changement ou de la décision]
