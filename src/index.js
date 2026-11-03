import { charger, sauvegarder } from "./persistence.js";
import {
    prochainId, creerCandidature, ajouter, changerStatut,
    compterParStatut, aRelancer, resume
} from "./candidatures.js";
import { chercherEntreprise } from "./api.js";

// 1. Charger
let liste = await charger();
console.log(`${liste.length} candidature(s) chargée(s)`);

// 2. Ajouter une candidature (envoyée aujourd'hui)
const nouvelle = creerCandidature(prochainId(liste), "Thales", new Date(), "envoyee");
liste = ajouter(liste, nouvelle);

// 3. Changer le statut de la première candidature
if (liste.length > 0) {
    liste = changerStatut(liste, liste[0].id, "entretien");
}

// 4. Afficher
console.log("\n--- Candidatures ---");
for (const c of liste) {
    console.log(resume(c));
}

console.log("\n--- Stats ---");
console.log(compterParStatut(liste));

console.log("\n--- À relancer ---");
console.log(aRelancer(liste).map(resume));

// 5. API (dans un try / catch, au cas où elle soit injoignable)
try {
    const resultats = await chercherEntreprise("thales");
    console.log("\n--- API ---");
    for (const r of resultats.slice(0, 5)) {
        console.log(r.nom_complet);
    }
} catch (erreur) {
    console.log("\nAPI injoignable :", erreur.message);
}

// 6. Sauvegarder
await sauvegarder(liste);