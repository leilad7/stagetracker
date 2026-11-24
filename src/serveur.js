import { createServer } from "node:http";
import { charger, sauvegarder } from "./persistence.js";
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
    let code = 200;

    if (url.pathname === "/candidatures/a-relancer") {
        donnees = aRelancer(liste);
    }
     else if (req.method === "POST" && url.pathname === "/candidatures") {
        try{
    let texte = "";
    console.log("POST reçu");
    for await (const morceau of req) {
    texte += morceau;}
    const corps=JSON.parse(texte);

    
    if (corps.dateEnvoi){
        const date = new Date(corps.dateEnvoi);
        if (isNaN(date)) {
                throw new Error("date invalide, format attendu : AAAA-MM-JJ");}
        corps.dateEnvoi=date;
    }
    let id=prochainId(liste);
    const nvlCandi=creerCandidature(id,corps.entreprise, corps.dateEnvoi, corps.statut);
    ajouter(liste, nvlCandi);
    await sauvegarder(liste);
    donnees=nvlCandi;
    code = 201;

    }
     catch (erreur){
        code=400;
        donnees={erreur: erreur.message};
     }    }

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

    res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(donnees));
});

serveur.listen(3000, () => console.log("Serveur sur http://localhost:3000"));