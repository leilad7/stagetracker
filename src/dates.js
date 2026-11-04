export function ajouterJours(date, n) {
  const resultat = new Date(date);              // copie, pour ne pas modifier l'original
  resultat.setDate(resultat.getDate() + n);     // gère tout seul les changements de mois
  return resultat;
}

export function ajouterMois(date, n) {
  const resultat = new Date(date);              
  resultat.setMonth(resultat.getMonth() + n);     
  return resultat;
}
