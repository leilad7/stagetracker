import { ajouterJours } from "../fonctionUtiles.js";

const STATUTleS = ["a_contacter", "envoyee", "entretien", "refus", "accepte"];
let cptCandi=0;


function creerCandidature(entreprise, statut, dateEnvoi){
    cptCandi++;
    let id=cptCandi;
    const dateRelance=ajouterJours(dateEnvoi,7);
    
    return {
        id: id,
        entreprise: entreprise,
        statut: statut,
        dateEnvoi: dateEnvoi.toISOString().slice(0,10),
        dateRelance: dateRelance.toISOString().slice(0,10)



    }
}


let candis=[];
function ajouter(candidature){
    //creerCandidature(canidature.entreprise, canidature.statut, creerCandidature.dateEnvoi);
    candis.push(candidature);
}

function retirer(idSaisi){
    //creerCandidature(canidature.entreprise, canidature.statut, creerCandidature.dateEnvoi);
    for(let i=0;i<candis.length; i++){
        if(candis[i].id==idSaisi){
            candis.splice(i,1);
            break;
        }
    }
}

function changerStatut(id, nouveauStatut){
    if(!STATUTleS.includes(nouveauStatut)){
        return null;
    }

    let candidature=candis.find(c=>c.id===id);

    if (!candidature) {
        return null;
    }

    candidature.statut = nouveauStatut;
    return candidature;
}

//requete : rechercher info dans tab sans le modifier
function parStatut(s){
    return candis.filter(c=>c.statut===s); 
}


function aRelancer(){
    return candis.filter(c=>c.dateRelance===new Date().toISOString().slice(0,10)); 
}

function compterParStatut(){
    let resultat = {};
    for(let i=0; i<STATUTleS.length;i++){
        resultat[STATUTleS[i]]=0;
    }
    for(let i=0; i<candis.length;i++){
        resultat[candis[i].statut]++;
    }

    return resultat;
}


function afficherResume() {
    for (let c of candis) {
        console.log(`${c.id} - ${c.entreprise} - ${c.statut} - Envoi : ${c.dateEnvoi} - Relance : ${c.dateRelance}`);
    }

    console.log(compterParStatut());
}

let c1=creerCandidature("web-atrio",STATUTleS[1],new Date("2026-10-23"));
let c2=creerCandidature("libheros",STATUTleS[3],new Date("2026-10-19"));

ajouter(c1);
ajouter(c2);
afficherResume();