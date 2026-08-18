# Sécurité — [NOM DU PROJET]

<!-- Dernière mise à jour : YYYY-MM-DD -->
<!-- Lire AGENTS.md avant ce fichier. -->
<!-- Ce fichier est NON-NÉGOCIABLE. Aucune règle ici ne peut être contournée pour aller plus vite. -->

---

## 1. Principes

1. **Défense en profondeur** — chaque couche valide indépendamment quand elle existe (client, API, données).
2. **Default deny** — par défaut, un acteur n'accède qu'à ce qui lui est explicitement autorisé.
3. **Least privilege** — chaque rôle, clé et service a le strict minimum nécessaire.
4. **Secrets jamais en clair** — ni dans le code, ni dans les commits, ni dans les logs.
5. **Contrôles adaptés à la stack** — Genesis impose un résultat de sécurité, pas PostgreSQL, Supabase ou un fournisseur précis.

---

## 2. Authentification

<!-- À adapter au projet. Aligner avec FUNCTIONAL.md section 4. -->

**Méthode :**     <!-- ex : Supabase Auth / Auth0 / session serveur / OAuth -->
**Sessions :**    <!-- durée, refresh, multi-device -->
**Vérification :** <!-- où et comment la session est vérifiée -->
**MFA :**         <!-- prévu MVP / V2 / non -->

### Règles

- Toute action non publique vérifie l'identité dans une couche de confiance, jamais uniquement via l'état du client.
- Ne pas exposer au client de credential privilégié ou de secret serveur.
- La déconnexion et la révocation de session suivent les capacités réelles du provider choisi.
- Les endpoints d'authentification exposés au public disposent d'une protection anti-abus adaptée au risque.

---

## 3. Autorisation et accès aux données

### Règle fondamentale

> **Toute ressource utilisateur ou métier privée doit avoir une règle d'autorisation explicite avant sa première exposition applicative.**

Le mécanisme dépend de la stack :

- PostgreSQL/Supabase ou moteur avec Row Level Security : activer RLS et écrire les policies nécessaires.
- Backend avec ORM/API : appliquer l'autorisation côté serveur sur chaque lecture/écriture concernée.
- Backend-as-a-Service avec règles natives : documenter et tester ces règles.
- Stockage objet : appliquer des règles d'accès ou URLs signées selon le besoin.

L'absence de RLS n'est pas une régression si la technologie ne la propose pas ; **l'absence de contrôle d'autorisation équivalent en est une**.

### Pattern PostgreSQL / Supabase, si applicable

Pour une table contenant des données utilisateur (`user_id` ou équivalent) :

```sql
ALTER TABLE [nom_table] ENABLE ROW LEVEL SECURITY;

CREATE POLICY "[nom_table]_select_own"
  ON [nom_table] FOR SELECT
  USING (auth.uid() = user_id);

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

Pour des ressources partagées, centraliser autant que possible la logique d'appartenance plutôt que la dupliquer.

### Credentials privilégiés

- Toute clé qui bypasse les règles ordinaires reste côté serveur.
- Chaque usage d'un credential privilégié doit être justifié par un besoin réel.
- Ne jamais exposer une clé privilégiée dans une variable ou un bundle accessible au client.

---

## 4. Données sensibles

### Catégories

| Type | Exemple | Stockage | Logs |
|---|---|---|---|
| Identité | email, nom | stockage autorisé du projet | limiter |
| Authentification | mot de passe | jamais en clair ; déléguer au provider ou hash adapté | NON |
| Paiement | numéro CB | ne pas stocker ; déléguer au PSP | NON |
| PII sensible | adresse, téléphone | accès restreint | NON par défaut |
| Contenu utilisateur | documents, messages | stockage avec autorisation | NON par défaut |

### Règles

- Minimiser les PII dans les logs ; utiliser des identifiants techniques quand cela suffit.
- Les données de paiement sensibles restent chez le provider de paiement quand celui-ci le permet.
- Vérifier les garanties de chiffrement et de sauvegarde du fournisseur réellement choisi au lieu de les supposer.
- La suppression de compte doit définir le devenir des données, y compris les éventuelles obligations légales de conservation.

---

## 5. Secrets & variables d'environnement

- Les secrets vivent dans un gestionnaire de secrets, les variables de l'hébergeur ou un `.env` local ignoré par Git selon la stack.
- `.env.example` liste les variables nécessaires sans valeurs secrètes.
- Rotation immédiate en cas de fuite ou suspicion ; rotation périodique selon le niveau de risque et les capacités du provider.
- Ne jamais loguer le contenu des variables secrètes.

---

## 6. Validation des entrées

### Couche de confiance

- Toute donnée provenant d'un client ou d'un système externe est non fiable.
- Valider type, format, taille et contraintes métier avant traitement dans la couche de confiance.
- Rejeter les entrées invalides avec un message qui n'expose pas de détail interne sensible.

### Côté client

- La validation client améliore l'UX ; elle ne remplace jamais la validation dans une couche de confiance.

---

## 7. Endpoints et opérations sensibles

### Paiement

- Le montant et les droits sont recalculés ou validés côté serveur.
- Utiliser l'idempotence lorsque le provider ou le type d'opération le justifie.
- Vérifier la signature des webhooks.
- Ne jamais loguer de données de carte.

### Actions destructrices

- Demander une confirmation proportionnée au risque.
- Autoriser l'action côté serveur, pas seulement dans l'UI.
- Prévoir une stratégie de récupération lorsque le coût d'une erreur le justifie.

### Endpoints IA

- Protéger coûts et abus par quota/rate-limit selon le modèle économique.
- Limiter la taille et le type des entrées.
- Traiter le contenu utilisateur et les sorties d'outils comme non fiables ; séparer instructions de confiance et données non fiables.
- Ne pas loguer de prompts contenant des PII sans base légitime et protection adaptées.

---

## 8. Web, headers et transport

Si le projet expose une application Web :

- CORS limité aux origines nécessaires.
- CSP définie lorsque pertinente pour la stack et les ressources tierces.
- HTTPS obligatoire en production ; HSTS lorsque le domaine et l'infrastructure le permettent.
- Cookies de session configurés avec `HttpOnly`, `Secure` et un `SameSite` adapté au flow.

Pour une app native ou desktop, appliquer les contrôles équivalents pertinents et supprimer les règles Web non applicables.

---

## 9. Checklist par story — impact sécurité

Pour une story concernée, documenter :

- [ ] Nouvelle ressource/table/collection → règle d'autorisation définie et testée.
- [ ] Nouvel endpoint/action serveur → auth, autorisation et validation vérifiées.
- [ ] Paiement → montant/droits, idempotence si nécessaire et webhook vérifié.
- [ ] Données utilisateur → qui peut lire, écrire, exporter et supprimer.
- [ ] Nouveau provider → secrets, permissions minimales et données envoyées connues.
- [ ] Upload → type, taille, stockage et contrôle d'accès.
- [ ] IA → coût/abuse, injection, données sensibles et permissions d'outils.

---

## 10. Audit & revue

- Avant le lancement public : auditer les règles d'autorisation avec l'outil adapté à la stack (`supabase db lint` ou équivalent si applicable).
- Avant une release sensible : revoir les secrets et permissions touchés.
- Revoir périodiquement les dépendances avec l'outil naturel de l'écosystème.
- Exécuter également les gates de `docs/QUALITY.md`, `docs/OPERATIONS.md` et `docs/RELEASE.md` aux moments prévus.

---

## 11. Incidents et violation de données

En cas de fuite ou suspicion :

1. Contenir l'incident et révoquer/faire tourner les credentials concernés.
2. Préserver les preuves utiles et auditer les logs sur la période concernée.
3. Évaluer les données, personnes et risques concernés avec le responsable approprié.
4. Pour une violation de données personnelles soumise au RGPD, notifier l'autorité de contrôle dans les meilleurs délais et, si possible, sous 72 h après en avoir pris connaissance lorsqu'une notification est requise. Si la violation est susceptible d'engendrer un risque élevé pour les personnes, les informer dans les meilleurs délais, sous réserve des exceptions applicables.
5. Documenter les faits, impacts et mesures prises ; consigner dans `JOURNAL.md` uniquement l'apprentissage durable et non des données sensibles d'incident.

> Ce template fournit des garde-fous techniques et organisationnels ; il ne remplace pas un avis juridique ou sécurité adapté au contexte du produit.
