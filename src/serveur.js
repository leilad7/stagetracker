import { createServer } from "node:http";
import { charger } from "./persistence.js";
import {
    prochainId, creerCandidature, ajouter, changerStatut,
    compterParStatut, aRelancer, resume, supprimer, parStatut
} from "./candidatures.js";

const serveur = createServer(async (req, res) => {
    const liste = await charger();
    const url = new URL(req.url, "http://localhost:3000");

    console.log("requête reçue :", req.method, req.url);

    let donnees;

    if (url.pathname === "/candidatures/a-relancer") {
        donnees = aRelancer(liste);
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