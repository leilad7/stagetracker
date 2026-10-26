// condition
const statut = "entretien";
if (statut === "refus") {
  console.log("Dommage");
} else if (statut === "entretien") {
  console.log("Prépare-toi !");
} else {
  console.log("En attente");
}

// boucle
for (let i = 1; i <= 3; i++) {
  console.log("Candidature n°" + i);
}

// fonctions
function direBonjour(nom) {
  return `Bonjour ${nom}`;
}

const direBonjour2 = (nom) => `Bonjour ${nom}`;

console.log(direBonjour("Leila"));
console.log(direBonjour2("Leila"));


function joursAvantRelance(dateEnvoi) {
  return 7;
}

function messageRelance(entreprise) {
  return `Relance ${entreprise} dans ${joursAvantRelance()} jours`;
}

console.log(messageRelance("Capgemini"));
// Relance Capgemini dans 7 jours