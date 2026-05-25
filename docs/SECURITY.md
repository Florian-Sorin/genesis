# Sécurité — [NOM DU PROJET]

<!-- Dernière mise à jour : YYYY-MM-DD -->
<!-- Lire AGENTS.md avant ce fichier. -->
<!-- Ce fichier est NON-NÉGOCIABLE. Aucune règle ici ne peut être contournée pour aller plus vite. -->

---

## 1. Principes

1. **Défense en profondeur** — chaque couche valide indépendamment (frontend, API, DB).
2. **Default deny** — par défaut, personne ne peut rien. On ouvre explicitement.
3. **Least privilege** — chaque rôle / clé / service a le strict minimum nécessaire.
4. **Secrets jamais en clair** — ni dans le code, ni dans les commits, ni dans les logs.

---

## 2. Authentification

<!-- À adapter au projet. Aligner avec FUNCTIONAL.md section 4. -->

**Méthode :**     <!-- ex : Supabase Auth (email/password + magic link) -->
**Sessions :**    <!-- durée, refresh, multi-device -->
**Vérification :** <!-- côté serveur uniquement, jamais se fier au front -->
**MFA :**         <!-- prévu MVP / V2 / non -->

### Règles

- Tous les endpoints non-publics vérifient la session côté serveur avant toute action.
- Pas de stockage d'identifiant utilisateur sensible côté client (autre que JWT/cookie session).
- Logout côté serveur invalide la session (pas juste suppression du cookie).
- Tentatives de connexion : rate-limit (`5 tentatives / 15 min` minimum).

---

## 3. Autorisation & RLS (PostgreSQL / Supabase)

### Règle fondamentale

> **Toute table créée doit avoir RLS activée et au moins une policy écrite avant la première lecture ou écriture applicative.**

Si tu crées une table sans RLS, considère ça comme une **régression critique** à corriger immédiatement.

### Pattern par défaut

Pour toute table contenant des données utilisateur (`user_id` ou équivalent) :

```sql
-- Activer RLS
ALTER TABLE [nom_table] ENABLE ROW LEVEL SECURITY;

-- L'utilisateur lit uniquement ses propres lignes
CREATE POLICY "[nom_table]_select_own"
  ON [nom_table] FOR SELECT
  USING (auth.uid() = user_id);

-- L'utilisateur écrit uniquement sur ses propres lignes
CREATE POLICY "[nom_table]_insert_own"
  ON [nom_table] FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "[nom_table]_update_own"
  ON [nom_table] FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "[nom_table]_delete_own"
  ON [nom_table] FOR DELETE
  USING (auth.uid() = user_id);
```

Pour les tables partagées (équipe, organisation), utiliser une fonction `is_member_of(org_id)` plutôt que dupliquer la logique dans chaque policy.

### Service role

- `service_role` bypasse RLS — l'utiliser **uniquement** côté serveur, **jamais** côté client.
- Auditer chaque usage de `service_role` : il doit y avoir une raison documentée.
- Ne jamais exposer la `service_role_key` dans une variable accessible au front (pas de `NEXT_PUBLIC_*`, etc.).

---

## 4. Données sensibles

### Catégories

| Type                          | Exemple                       | Stockage                      | Logs |
|-------------------------------|-------------------------------|-------------------------------|------|
| Identité                      | email, nom                    | DB (chiffré au repos)         | OK   |
| Authentification              | mot de passe                  | Jamais en clair (hash bcrypt) | NON  |
| Paiement                      | numéro CB                     | Jamais stocké (Stripe/LS)     | NON  |
| PII sensible                  | adresse, téléphone            | DB + accès restreint          | NON  |
| Contenu utilisateur           | documents, messages           | DB ou Storage avec RLS        | NON  |

### Règles

- **Aucune PII dans les logs** (utiliser des IDs, pas les valeurs).
- **Aucune donnée de paiement ne transite par notre serveur** (tokenisation côté provider).
- **Chiffrement au repos** activé sur la BDD (par défaut chez Supabase, vérifier sur autres providers).
- **Suppression de compte** = suppression effective des données, pas juste un soft-delete (sauf obligation légale).

---

## 5. Secrets & variables d'environnement

- Tous les secrets vivent dans `.env` (local) ou les variables d'environnement de l'hébergeur (prod).
- `.env` est dans `.gitignore`. Vérifier régulièrement avec `git status`.
- `.env.example` liste les variables nécessaires sans valeurs.
- Rotation des clés au moins une fois par an, et immédiatement si fuite suspectée.
- Pas de `console.log(process.env.*)`, même temporairement.

---

## 6. Validation des entrées

### Côté serveur (obligatoire)

- Toute donnée venant du client est **non-fiable**.
- Validation systématique avec un schema (Zod, Valibot, etc.) avant tout traitement.
- Rejeter au plus tôt, avec un message d'erreur sans détail technique exposé.

### Côté client (UX uniquement)

- La validation front existe pour le retour rapide à l'utilisateur, **pas pour la sécurité**.
- Ne jamais désactiver une protection serveur sous prétexte que le front la fait déjà.

---

## 7. Endpoints sensibles

### Paiement

- Double validation côté serveur du montant (jamais faire confiance au prix envoyé par le client).
- Idempotency-key sur toutes les opérations de paiement.
- Webhooks signés et vérifiés (signature du provider).
- Logs détaillés (sans données CB) avec corrélation transaction ↔ utilisateur.

### Actions destructrices

- Suppression de compte, de données massives : confirmation explicite (saisie d'un mot, double-click).
- Logging avant exécution.
- Pas de undo silencieux côté serveur.

### Endpoints IA

- Rate-limit par utilisateur (coût + abuse).
- Validation de la taille des inputs.
- Pas de prompt injection : ne jamais concaténer des données utilisateur dans un prompt système.
- Logs des prompts pour debug, mais **anonymisés** si PII.

---

## 8. CORS, CSP, headers

- CORS : whitelist explicite des origines, pas de `*` en prod.
- CSP : au minimum `default-src 'self'`, adapter au cas par cas.
- HSTS activé (`max-age` > 6 mois).
- Cookies : `HttpOnly`, `Secure`, `SameSite=Lax` ou `Strict` selon le contexte.

---

## 9. Checklist par story (impact sécurité)

Si une story touche à un des éléments ci-dessous, **remplir la section "Impact sécurité"** du fichier de story :

- [ ] Création / modification d'une table → RLS + policies écrites
- [ ] Nouvel endpoint serveur → auth vérifiée, validation des entrées
- [ ] Manipulation de paiement → idempotence + webhook signé
- [ ] Manipulation de données utilisateur → scope (qui peut quoi)
- [ ] Nouveau provider tiers → secrets en env, jamais exposés au front
- [ ] Upload de fichiers → validation type/taille, stockage avec RLS
- [ ] Endpoint IA → rate-limit, pas de prompt injection

---

## 10. Audit & revue

- Avant le lancement public : audit complet des policies RLS (script `supabase db lint` ou équivalent).
- Avant chaque release majeure : revue de `.env` (production) + secrets exposés.
- Trimestriellement : revue des dépendances (`npm audit`, Snyk, ou équivalent).

---

## 11. Incidents

En cas de fuite ou suspicion :

1. Rotation immédiate des clés concernées.
2. Audit des logs sur la période suspecte.
3. Notification utilisateurs si données personnelles touchées (RGPD : 72h).
4. Post-mortem documenté dans `docs/JOURNAL.md`.
