# Pilote interne OpenAI et Claude pour IHA

Le site public est hébergé sur GitHub Pages. Ce dossier constitue un projet Vercel autonome, destiné à un environnement **Preview** protégé par Vercel Authentication. Supabase ne stocke que les compteurs quotidiens et les empreintes des jetons de test. Utiliser un projet Supabase de test dédié, sans dossiers ni comptes clients.

## Préparer la Preview

1. Créer une clé de projet IHA de test et configurer la facturation dans [OpenAI API Platform](https://platform.openai.com/api-keys) et dans la [console Claude](https://platform.claude.com/settings/keys). ChatGPT Plus et Claude Pro ne couvrent pas cet usage API.
2. Appliquer la [migration SQL](supabase/migrations/20261122000000_ai_quota.sql) dans le projet Supabase de test. Activer la Data API pour le schéma `public` et laisser `iha_ai_private` hors des schémas exposés. Créer une clé Supabase secrète dédiée au pilote (`sb_secret_…`).
3. Créer un projet Vercel de test distinct. Sélectionner `iha-ai-backend` comme dossier racine et le préréglage **Other**. Garder `main` comme branche de production et déployer `prototype/iha-ai-backend` en Preview uniquement, avec la protection d’accès activée. Laisser Vercel exposer ses variables système pour que `VERCEL_ENV` soit disponible.
4. Renseigner les cinq variables ci-dessous pour **Preview**, idéalement pour la seule branche du prototype. Activer **Sensitive** pour toutes les valeurs secrètes. Saisir les secrets directement dans les tableaux de bord ou dans le gestionnaire de secrets du pilote. Les clés fournisseurs et les jetons n’ont pas leur place dans Git, une page web ou un message.

| Variable | Valeur |
| --- | --- |
| `OPENAI_API_KEY` | Clé du projet OpenAI de test |
| `ANTHROPIC_API_KEY` | Clé de l’espace Claude de test |
| `IHA_QUOTA_SUPABASE_URL` | URL HTTPS du projet Supabase dédié, sans barre finale |
| `IHA_QUOTA_SUPABASE_SECRET_KEY` | Clé serveur `sb_secret_…` du projet dédié |
| `IHA_AI_ACCESS_TOKENS` | Un jeton aléatoire distinct par testeur, séparés par des virgules sans espaces. Générer 32 octets aléatoires en hexadécimal par jeton, par exemple avec `openssl rand -hex 32` dans un espace privé. |

## Utiliser et vérifier

Envoyer une requête serveur `POST /api/orientation` avec `Content-Type: application/json` et `Authorization: Bearer <jeton de test>`. Si la Preview est protégée, utiliser aussi le mécanisme Vercel d’accès automatisé autorisé pour ce projet. Exemple de corps JSON avec données fictives.

```json
{"provider":"openai","model":"gpt-4.1-mini","scenario":"refund"}
```

- `openai` accepte `gpt-4.1-mini` ou `gpt-4.1-nano`.
- `anthropic` accepte `claude-haiku-4-5-20251001` ou `claude-haiku-5-5`.
- Les scénarios autorisés sont `refund` et `platform`. Le serveur choisit le texte correspondant. Les champs libres et pièces jointes sont rejetés.
- La route renvoie `404` hors Preview. Elle n’accepte pas les requêtes portant un en-tête `Origin` et ne fournit aucun accès CORS.
- Les quotas sont de 10 appels par jeton et 100 pour l’ensemble du pilote par jour UTC. Un échec chez le fournisseur consomme l’appel réservé. Un quota épuisé renvoie `429`. Si Supabase ne confirme pas la réservation, le serveur renvoie `503` sans appeler le modèle.
- Les réponses sont limitées à 300 jetons et ne sont pas mises en cache. Le code applicatif ne journalise ni les requêtes ni les réponses. OpenAI reçoit `store: false`. Vérifier les paramètres de rétention du fournisseur et de l’hébergeur avant tout traitement de données réelles.

Lancer `npm test` sous Node.js 22. La suite simule Supabase et les fournisseurs. Sur la Preview protégée avec les clés de test, vérifier `401` sans jeton, `400` avec un champ libre, une réponse `200` pour chaque fournisseur, `429` au 11e appel du même jeton et `503` si la réservation est indisponible. Avec plusieurs appels simultanés sur Supabase, vérifier que le compteur ne dépasse ni le plafond individuel ni le plafond global. Vérifier aussi que les rôles publics ne peuvent pas appeler la fonction de quota.

Avant tout usage avec des dossiers réels, revoir l’autorisation par utilisateur du portail, la rétention et les conditions de traitement des fournisseurs. Les jetons de ce pilote sont réservés à des clients de test côté serveur.
