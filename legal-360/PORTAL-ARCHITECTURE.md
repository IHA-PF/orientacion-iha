# IHA LEGAL 360 — architecture du portail client

**Version :** 0.1 — document de cadrage  
**Date :** 22 novembre 2026  
**Statut :** proposition d'architecture ; aucune infrastructure privée n'est encore déployée

## 1. Objectif produit

Construire un espace privé, accessible sur ordinateur et mobile, qui relie le client, son ou ses dossiers, les pièces communiquées, les échéances et l'équipe juridique IHA.

Le portail doit devenir l'interface de suivi des prestations LEGAL 360, pas un simple espace de dépôt de fichiers. Il doit rendre visibles le service réellement commandé, son périmètre, les actions réalisées, les éléments attendus, les dates validées et le prochain interlocuteur.

Le portail ne remplace ni le jugement d'un avocat ni les échanges formels avec une autorité ou une plateforme. Il ne doit jamais laisser entendre qu'un document a été déposé, qu'un délai a été respecté ou qu'une procédure a été engagée si une personne autorisée ne l'a pas confirmé.

## 2. Principes non négociables

1. **Confidentialité par défaut.** Aucun dossier ni document n'est public. L'accès se fait après authentification et autorisation dossier par dossier.
2. **Minimisation.** Ne recueillir que les informations nécessaires à la prestation convenue. Ne pas collecter de pièces d'identité ou de données sensibles « au cas où ».
3. **Responsabilité professionnelle.** Les dates juridiques, avis, stratégies et actes sont validés par un professionnel habilité. L'IA ne tranche pas.
4. **Traçabilité.** Toute consultation, modification, téléchargement, partage ou changement de statut sensible doit être journalisé.
5. **Transparence contractuelle.** Le client voit le service souscrit, son périmètre, les exclusions, les honoraires et ce qui nécessite un nouveau devis.
6. **Séparation des environnements.** Démonstration, développement, test et production utilisent des données et des secrets distincts.
7. **Pas de publication par accident.** Un site statique public ou GitHub Pages ne doit jamais héberger un dossier client, un jeton d'accès, une sauvegarde ou un document privé.

## 3. Rôles et permissions

| Rôle | Accès attendu |
|---|---|
| Client | Ses propres dossiers, les documents qu'il est autorisé à voir, les dates et messages de ses affaires. |
| Avocat responsable | Dossiers qui lui sont attribués ; validation des avis, délais et actes ; contrôle du périmètre. |
| Équipe juridique / assistant | Accès limité aux dossiers assignés et aux tâches nécessaires ; pas de validation juridique si non habilité. |
| Responsable de dossier | Coordination, demandes de pièces, rendez-vous et suivi ; accès selon attribution. |
| Administrateur technique | Administration du système ; accès au contenu juridique interdit par défaut et exceptionnel, justifié et audité en cas d'incident. |
| Auditeur / conformité | Journaux et éléments nécessaires au contrôle, sans accès généralisé au contenu des dossiers. |

Les rôles doivent être complétés par des autorisations contextuelles : organisation, dossier, affectation, type de document et action permise. Être administrateur technique ne doit pas signifier pouvoir lire librement tous les dossiers.

## 4. Modules fonctionnels

### 4.1 MY CASES — Dossiers

- Identifiant de dossier généré par le système.
- Type de situation, parties concernées et objectif du client.
- Service et périmètre contractuel, date d'ouverture, responsable et statut.
- Étapes et tâches liées au service commandé.
- Historique des changements de statut avec auteur et date.
- Distinction entre « information reçue », « en cours d'analyse », « action préparée », « action approuvée par le client » et « action déposée / envoyée avec preuve ».

### 4.2 MY EVIDENCE — Documents et preuves

- Dépôt privé lié à un dossier, avec liste de formats et taille maximale.
- Catégories, description, date du document, date de réception et auteur.
- Conservation de l'original ; version de travail séparée.
- Empreinte SHA-256, horodatage de réception et journal des opérations.
- Statut : reçu, à classer, à vérifier, validé, doublon, remplacé ou supprimé selon la politique applicable.
- Export de l'inventaire et téléchargement seulement par les personnes autorisées.

Une empreinte cryptographique aide à détecter une modification ultérieure ; elle ne prouve pas à elle seule l'authenticité du contenu ni les circonstances de sa création.

### 4.3 MY DEADLINES — Échéances et alertes

Chaque date doit posséder :
- un type : délai légal, date d'audience, échéance contractuelle, engagement client ou rappel interne ;
- une source et une référence vérifiables ;
- une date de départ et la règle de calcul, lorsque cela s'applique ;
- le fuseau horaire, le responsable et le dossier associé ;
- un état : brouillon, à vérifier, validé, modifié ou annulé ;
- le nom et l'horodatage de la personne ayant validé la date.

Les dates calculées automatiquement restent « à vérifier » jusqu'à validation. Les notifications ne doivent pas inclure dans leur sujet ou leur aperçu des faits sensibles.

### 4.4 LEGAL TRACKING — Suivi

- Chronologie des événements.
- Auteur, date/heure, catégorie, dossier et description.
- Référence de la pièce ou de l'action qui justifie l'événement.
- Historique append-only : une correction ajoute un événement correctif au lieu d'effacer silencieusement l'ancien.
- Distinction entre événement interne, information communiquée au client et action externe effectivement réalisée.

### 4.5 SECURE MESSAGING — Messages

- Conversation liée à un dossier et limitée à ses membres autorisés.
- Pièces jointes facultatives après activation du stockage sécurisé.
- Notifications neutres (« vous avez un nouveau message »), sans contenu confidentiel.
- Journal de livraison et politique de conservation.
- Processus d'escalade pour demandes urgentes et avertissement clair que le portail n'est pas un service d'urgence.

### 4.6 AI LEGAL ASSIST — Assistance IA, phase ultérieure

Cas d'usage possibles, après validation juridique et de protection des données :
- classement suggéré de documents ;
- extraction de dates, parties et montants ;
- résumé de pièces avec renvoi aux passages sources ;
- préparation d'une liste de questions manquantes ;
- premier brouillon interne clairement marqué « non validé ».

Garde-fous :
- aucune décision juridique autonome, aucun calcul définitif de délai et aucun dépôt automatique ;
- vérification humaine obligatoire avant communication au client ou action externe ;
- citations / références au document source pour chaque extraction ;
- détection et signalement de l'incertitude ;
- minimisation ou pseudonymisation avant envoi à un modèle ;
- validation du fournisseur, de ses conditions, de la localisation, de la conservation et de la réutilisation des données avant toute transmission ;
- possibilité de désactiver l'IA pour un dossier ou une catégorie de données.

## 5. Architecture technique proposée

Le site actuel est un site statique publié avec GitHub Pages. Il peut continuer à présenter IHA LEGAL 360, mais **GitHub Pages ne doit pas être utilisé comme base de données, serveur d'authentification ou stockage de preuves**.

Architecture cible, à confirmer après audit technique et juridique :

1. **Interface publique** : le site statique actuel et les pages de présentation multilingues.
2. **Application privée** : application web distincte, sur un sous-domaine contrôlé par IHA, par exemple portal.ihasolucioneslegales.com.co.
3. **Authentification** : fournisseur d'identité avec vérification d'adresse e-mail, récupération sûre du compte, MFA obligatoire pour l'équipe interne et sessions révocables.
4. **API / logique serveur** : toutes les opérations sensibles passent par une API ou des fonctions serveur ; aucun secret privilégié dans le navigateur.
5. **Base de données relationnelle** : organisations, utilisateurs, rôles, dossiers, contrats de service, échéances, événements et messages.
6. **Stockage documentaire privé** : compartiments non publics, autorisation vérifiée à chaque opération, URL signées de courte durée et journalisation.
7. **Journal de sécurité** : événements append-only, détection d'accès anormaux et procédure de réponse aux incidents.
8. **Notifications** : e-mail ou autre canal ne contenant que le minimum nécessaire, avec préférence de contact et consentement lorsqu'ils sont requis.

### Réutilisation éventuelle de Supabase

Le code actuel du site comporte déjà une intégration Supabase destinée aux inscriptions aux alertes. Cela ne prouve pas que le projet, les tables, les politiques ou la configuration existants conviennent à un dossier juridique.

Avant toute réutilisation, il faut vérifier le propriétaire du projet, les droits d'administration, le contrat de sous-traitance, la région, les sauvegardes, la séparation des données, les politiques RLS et les secrets exposés. Option recommandée : créer un projet privé dédié au portail, ou obtenir une séparation technique et contractuelle démontrable. Ne pas réutiliser la clé publique ou les tables d'alertes comme mécanisme d'autorisation des dossiers.

## 6. Modèle de données initial

Les tables suivantes sont une base de conception, pas un schéma déjà déployé :

- organizations : entité IHA ou client professionnel ;
- users : identité et statut de compte ;
- memberships : rôle d'un utilisateur dans une organisation ;
- clients : profil de contact minimal ;
- cases : dossier juridique, statut et responsable ;
- case_members : personnes autorisées dans chaque dossier ;
- engagements : service commandé, périmètre, prix, exclusions, dates et version des conditions acceptées ;
- documents : métadonnées, catégorie, statut et empreinte ;
- document_versions : références aux versions et objets stockés ;
- deadlines : date, source, méthode de calcul et approbation ;
- timeline_events : journal des événements du dossier ;
- messages et message_attachments : échanges sécurisés ;
- consents : finalité, texte/version, date, canal et preuve du choix ;
- audit_events : accès et actions sensibles ;
- notifications : destination, modèle neutre, état de livraison ;
- ai_tasks : tâches IA, fournisseur/version, statut, sources et validation humaine, uniquement dans la phase IA.

Chaque enregistrement doit porter un identifiant non devinable et, lorsque pertinent, un identifiant d'organisation et de dossier. Les contrôles d'accès doivent être appliqués côté serveur et au niveau de la base ; masquer un bouton dans l'interface ne constitue jamais une autorisation.

## 7. Sécurité et protection des données — conditions de lancement

Avant tout dossier réel :

- cartographier les données personnelles et sensibles, les finalités et les flux internationaux ;
- déterminer les rôles de responsable et de sous-traitant, signer les accords nécessaires et documenter les fournisseurs ;
- vérifier les obligations colombiennes applicables, notamment la loi 1581 de 2012, ses textes réglementaires, les transferts ou transmissions internationaux et la politique de traitement d'IHA ;
- rédiger les règles d'accès, conservation, suppression, rectification, export et réponse aux demandes des personnes ;
- chiffrer les communications et le stockage, gérer les secrets hors du code, activer MFA pour l'équipe ;
- appliquer le moindre privilège, RLS testée, séparation par dossier, limitation de débit et protection contre les téléchargements malveillants ;
- scanner les fichiers, vérifier type MIME / extension / taille, bloquer les exécutables et stocker hors de tout répertoire public ;
- réaliser des tests d'accès croisé entre clients, dossiers, organisations et membres désactivés ;
- mettre en place sauvegardes, restauration testée, rétention, alertes et plan de réponse aux incidents ;
- tester le parcours de fermeture de compte et la suppression / conservation légalement requise des pièces.

Ne pas ouvrir les inscriptions publiques ni charger des dossiers réels avant la validation de ces contrôles.

## 8. Parcours client cible

1. Le client demande une prestation via le site public.
2. IHA vérifie l'identité nécessaire, le conflit d'intérêts, la compétence, la disponibilité et le périmètre.
3. IHA envoie une proposition écrite ; le client accepte les conditions et les informations de traitement.
4. Un membre de l'équipe crée le dossier et invite le client via un lien à usage unique.
5. Le client se connecte et ne voit que les dossiers qui lui sont attribués.
6. Les pièces sont déposées dans l'espace privé et vérifiées.
7. L'équipe met à jour la chronologie et les dates ; les échéances juridiques passent par validation professionnelle.
8. Le client reçoit les messages et livrables prévus dans le périmètre du service.
9. À la clôture, IHA applique la politique de conservation, d'archivage et de suppression.

## 9. Déploiement progressif

| Phase | Livrable | Condition de passage |
|---|---|---|
| 0 — Prototype | Maquette navigable avec données fictives | Validation du parcours et du vocabulaire métier |
| 1 — Fondations | Projet privé, environnements, modèle de données, authentification et RLS | Revue sécurité et protection des données |
| 2 — MVP dossiers | Dossiers, membres, engagements, tableau de bord et journal | Tests d'accès multi-client réussis |
| 3 — Documents et messages | Stockage privé, versions, messages et notifications neutres | Tests de fichiers, droits et restauration |
| 4 — Échéances et suivi | Workflow d'approbation, chronologie et rappels | Validation juridique des dates et des statuts |
| 5 — IA assistive | Extraction et synthèse sourcées avec contrôle humain | Évaluation confidentialité, précision et erreurs |

## 10. Critères d'acceptation du MVP

- Un client A ne peut pas lire, chercher, lister ou télécharger un objet appartenant au client B.
- Un professionnel ne voit que les dossiers qui lui sont attribués, sauf permission exceptionnelle documentée.
- Un compte désactivé perd immédiatement l'accès.
- Chaque téléchargement, partage, modification de statut ou changement de membre est audité.
- Une date non validée ne peut pas être affichée comme délai juridique confirmé.
- Un document remplacé conserve l'historique et l'empreinte de la version précédente.
- Un client ne voit jamais les notes internes explicitement marquées comme telles.
- Les notifications ne divulguent pas le contenu du dossier.
- Les sauvegardes peuvent être restaurées ; un test est documenté.
- Aucune clé privilégiée ni donnée client ne figure dans le dépôt Git ou le bundle navigateur.

## 11. Hors périmètre du prototype actuel

Le fichier preview/legal-360-portal/index.html est une maquette d'interface. Il ne comprend pas :
- une connexion ou une gestion de mot de passe ;
- une base de données ;
- un stockage, une transmission ou un téléchargement de documents ;
- un vrai canal de messagerie ;
- des notifications ou des rappels ;
- des calculs de délais ;
- une analyse IA de dossiers ;
- un système de facturation ou de signature.

Il ne faut pas le présenter comme un portail opérationnel ni l'utiliser pour recueillir des données réelles.

## 12. Décisions à valider avant la phase 1

1. Qui, chez IHA, porte la responsabilité juridique et opérationnelle du portail ?
2. Quels services et quels profils clients auront accès au premier MVP ?
3. Quels pays de résidence des clients doivent être pris en charge au lancement ?
4. Quelles catégories de pièces IHA accepte-t-elle et pendant combien de temps les conserve-t-elle ?
5. Quel budget et quel niveau de support sont prévus pour l'hébergement et la sécurité ?
6. Projet Supabase privé dédié, autre backend, ou audit approfondi du projet existant avant décision ?
7. Quel sous-domaine IHA réservera-t-elle pour l'application privée ?

**Recommandation :** valider d'abord le prototype et les règles métier, puis concevoir la base de données et les politiques d'accès. Ne jamais commencer par l'upload de documents avant d'avoir conçu et testé l'autorisation dossier par dossier.
