import { charger, sauvegarder } from "./persistence.js";
import {prochainId, creerCandidature, ajouter, changerStatut,
    compterParStatut, aRelancer, resume, supprimer
} from "./candidatures.js";
import { chercherEntreprise } from "./api.js";

let liste= await charger();
liste = supprimer(liste, 5);// czr filter fait une nvl liste

console.log(liste);
await sauvegarder(liste);