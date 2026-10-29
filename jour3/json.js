const candidature={id: 1, entreprise: "test", statut:"envoyee"};

const texte=JSON.stringify(candidature); //convertir objet en texte
console.log(texte);
console.log(typeof texte);

const objet=JSON.parse(texte);
console.log(objet.entreprise);