export function ajouterJours(date, n) {
  const resultat = new Date(date);              // copie, pour ne pas modifier l'original
  resultat.setDate(resultat.getDate() + n);     // gère tout seul les changements de mois
  return resultat;
}

const envoi = new Date(2026, 10, 28);           // 28 novembre 2026 (novembre = 10)
const relance = ajouterJours(envoi, 7);