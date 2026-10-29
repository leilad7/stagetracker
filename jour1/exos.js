  const debutStage = new Date(2027, 4, 3);
  const dateJour=new Date();

  const difference=(debutStage-dateJour)/(60*60*24*1000);
  console.log(difference);

  function afficherStatut(statut) {
    if (statut === "envoyee") {
        return "Candidature envoyée.";
    } else if (statut === "entretien") {
        return "Entretien prévu.";
    } else if (statut === "refus") {
        return "Candidature refusée.";
    } else if (statut === "accepte") {
        return "Candidature acceptée !";
    } else {
        return "Statut inconnu.";
    }
}





const aujourdHui = new Date(); // recup date et heure actuelles

for (let i = 0; i < 10; i++) {
    aujourdHui.setDate(aujourdHui.getDate() + i); // a chaque date on ajt 1 

    console.log(aujourdHui.toLocaleDateString("fr-FR"));
}

export function ajouterJours(date, n) {
  const resultat = new Date(date);              // copie, pour ne pas modifier l'original
  resultat.setDate(resultat.getDate() + n);     // gère tout seul les changements de mois
  return resultat;
}

const envoi = new Date(2026, 10, 28);           // 28 novembre 2026 (novembre = 10)
const relance = ajouterJours(envoi, 7);
