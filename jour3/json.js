const candidature={id: 1, entreprise: "test", statut:"envoyee", date: new Date("2026-10-23")};
candidature.date=candidature.date.toISOString().slice(0,10); //objet Date ne pessede pas slice() donc convertion en str
const texte=JSON.stringify(candidature); //convertir objet en texte
console.log(texte);
//console.log(typeof texte);

const objet=JSON.parse(texte); // convertir en objet. ici, meme date est une chaine de caracteres
//console.log(objet.entreprise);
console.log(objet.date);
