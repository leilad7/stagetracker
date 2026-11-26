# StageTracker

Une appli web pour suivre mes candidatures de stage : l'entreprise, où j'en suis (envoyée, relancée, entretien, refus...), et quand relancer. Je gérais tout ça dans un tableur et ça devenait le bazar, donc je me fais mon propre outil.

C'est aussi un projet pour apprendre : je n'avais jamais fait de JavaScript côté serveur, ni d'API, ni utilisé PostgreSQL avant de le commencer. Projet en cours.


## Technos

JavaScript, Next.js, Node.js, PostgreSQL

## Fonctionnalités
-  28/10 Ajouter une candidature (entreprise, poste, date)
- 28/10  Suivre le statut de chaque candidature
- 28/10 Date de relance, quelques stats
- 01/11 persistance : sauvegarder et charger fichiers
- 01/11 API externe
- 03/11 réorganisation des fichiers
- 07/11 création d'un premier serveur, fonctions avec GET
- 24/11 Fonctions avec POST


## Architecture

API REST en Node.js, base PostgreSQL, interface en Next.js, organisé en MVC.
Le dossier src/ contient le code, avec un fichier par responsabilité 
(candidatures.js pour la logique, persistence.js pour la lecture et l'écriture du fichier, api.js pour l'API externe, dates.js pour les utilitaires, index.js et 
serveur.js pour lancer le programme ou le serveur), et data/ contient candidatures.json, tes données sauvegardées, qui sont ignorées par Git.

## Lancer en local

Pour le moment, il faut juste Node. j'utilise la version v24.22.1

    git clone https://github.com/leilad7/stagetracker
    cd stagetracker
    npm install
    [créer la base + variables d'environnement]
    npm run dev

