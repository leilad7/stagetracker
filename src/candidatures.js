import { ajouterJours } from "./dates.js";

export const STATUTS = ["a_contacter", "envoyee", "entretien", "refus", "accepte"];

function formaterDate(date) {
    return date.toLocaleDateString("fr-CA"); // "AAAA-MM-JJ"
}

export function prochainId(liste) {
    if (liste.length === 0) {
        return 1;
    }
    return Math.max(...liste.map(c => c.id)) + 1;
}

export function creerCandidature(id, entreprise, dateEnvoi = null, statut = "a_contacter") {
    if (!STATUTS.includes(statut)) {
        throw new Error(`Statut inconnu : ${statut}`);
    }
    return {
        id: id,
        entreprise: entreprise,
        statut: statut,
        dateEnvoi: dateEnvoi ? formaterDate(dateEnvoi) : null,
        dateRelance: dateEnvoi ? formaterDate(ajouterJours(dateEnvoi, 7)) : null
    };
}

export function ajouter(liste, candidature) {
    return [...liste, candidature];
}

export function supprimer(liste, id) {
    return liste.filter(c => c.id !== id);
}

export function changerStatut(liste, id, nouveauStatut) {
    if (!STATUTS.includes(nouveauStatut)) {
        return liste;
    }
    return liste.map(c => (c.id === id ? { ...c, statut: nouveauStatut } : c));
}

export function parStatut(liste, s) {
    return liste.filter(c => c.statut === s);
}

export function aRelancer(liste) {
    const ajd = formaterDate(new Date());
    return liste
        .filter(c => c.statut === "envoyee" && c.dateRelance !== null && c.dateRelance <= ajd)
        .sort((a, b) => a.dateRelance.localeCompare(b.dateRelance));
}

export function compterParStatut(liste) {
    let resultat = {};
    for (let i = 0; i < STATUTS.length; i++) {
        resultat[STATUTS[i]] = 0;
    }
    for (let i = 0; i < liste.length; i++) {
        resultat[liste[i].statut]++;
    }
    return resultat;
}

export function resume(c) {
    return `${c.id} - ${c.entreprise} - ${c.statut} - Envoi : ${c.dateEnvoi ?? "aucun"} - Relance : ${c.dateRelance ?? "aucune"}`;
}