import { createServer } from "node:http";
import { charger } from "./persistence.js";
import {
    prochainId, creerCandidature, ajouter, changerStatut,
    compterParStatut, aRelancer, resume, supprimer, parStatut
} from "./candidatures.js";

const serveur = createServer(async (req, res) => {
    const liste = await charger();
    const url = new URL(req.url, "http://localhost:3000");
/* -  createServeur(...) : créer serv qui va écouter et recevoir requêtes HTTP
- le stocke dans serveur pour pouvoir le démarrer avec listen() apres
- req : represente requete recue par le serveur (ce que le client dmd)
- res : reponse que le serv va renvoyer au client
- url : objet URL pour recuperer separement differentes infos de l'url (pathname ou searchParams)
*/

    console.log("requête reçue :", req.method, req.url);
   
    let donnees;

    if (url.pathname === "/candidatures/a-relancer") {
        donnees = aRelancer(liste);
    }
     else if (req.method === "POST" && url.pathname === "/candidatures") {
    let texte = "";
    console.log("POST reçu");
    for await (const morceau of req) {
    texte += morceau;}
    const corps=JSON.parse(texte);
    donnees=corps;
    }
    

    else if (url.pathname === "/candidatures" && url.searchParams.has("status")) {
        let statut = url.searchParams.get("status");
        donnees = parStatut(liste, statut);
    }

    else if (url.pathname === "/stats") {
        donnees = compterParStatut(liste);
    }

    else {
        donnees = { "erreur": "route inconnue" };
    }

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(donnees));
});

serveur.listen(3000, () => console.log("Serveur sur http://localhost:3000"));