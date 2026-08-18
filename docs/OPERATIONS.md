# Production readiness — [NOM DU PROJET]

<!-- Contrat léger d'exploitation. À adapter au niveau de risque du produit ; ne pas transformer un MVP solo en plateforme SRE. -->

## Objectif

Rendre explicites les décisions nécessaires pour exploiter le produit après son déploiement : savoir détecter une panne, diagnostiquer une erreur, restaurer les données si nécessaire et mesurer l'usage sans imposer un fournisseur particulier.

## Observabilité

**Error tracking :** <!-- Sentry / provider / logs hébergeur / non nécessaire, avec justification -->
**Logs applicatifs :** <!-- destination, rétention, données interdites -->
**Health check / uptime :** <!-- URL, probe, provider ou non nécessaire -->
**Alertes :** <!-- incidents qui méritent une notification -->

Règles :

- Aucun secret, token ou PII sensible dans les logs.
- Les erreurs critiques doivent fournir assez de contexte technique pour être corrélées sans exposer les données utilisateur.
- Les alertes doivent viser des symptômes actionnables ; éviter les notifications permanentes sans réponse possible.

## Données et restauration

**Backup :** <!-- provider, fréquence, rétention -->
**Restauration testée :** <!-- date / procédure / non applicable -->
**RPO cible :** <!-- perte de données acceptable -->
**RTO cible :** <!-- temps de restauration acceptable -->

Pour un service managé, documenter ce que le fournisseur sauvegarde réellement et ce qui reste à la charge du projet.

## Analytics produit

**Outil :** <!-- Plausible / PostHog / provider / aucun -->
**Événements clés :** <!-- activation, action principale, conversion... -->
**Données exclues :** <!-- PII, contenu utilisateur... -->
**Lien avec l'indicateur de succès :** <!-- BRIEF.md -->

Les analytics servent une question produit définie ; ne pas instrumenter chaque clic par défaut.

## Performance

**Budget ou cible :** <!-- ex. Core Web Vitals, temps de réponse API, taille bundle, FPS mobile -->
**Mesure :** <!-- Lighthouse, Web Vitals, profiling, provider... -->
**Routes / opérations critiques :**

Une cible de performance doit être définie lorsqu'une régression aurait un impact utilisateur ou business réel. Sinon, indiquer explicitement que le suivi est opportuniste au MVP.

## Coûts et quotas

**Budget mensuel cible :**
**Services à coût variable :** <!-- IA, emails, storage, maps... -->
**Quotas / rate limits critiques :**
**Seuils d'alerte coût :**

## Checklist avant lancement public

- [ ] Error tracking ou mécanisme de diagnostic choisi.
- [ ] Logs et données sensibles cadrés.
- [ ] Backup/restauration décidés pour les données non reproductibles.
- [ ] Analytics minimales reliées au succès produit, si pertinentes.
- [ ] Coûts variables et quotas connus.
- [ ] Performance des parcours critiques vérifiée si elle est structurante.
- [ ] Contact/support ou canal d'incident défini si des utilisateurs externes existent.
