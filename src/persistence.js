// code JS contient instructions que l'on veut exécuter.
//fichier JSON, lui, contient les données que l'on veut conserver.





import { readFile, writeFile, mkdir } from "node:fs/promises";


export async function sauvegarder (candidatures) {
    const candiStr=JSON.stringify(candidatures);
    await mkdir("data", {recursive: true});
    await writeFile("data/candidatures.json", candiStr);
    
}

export async function charger(){
    try{
        const texte=await readFile('data/candidatures.json', 'utf8');
        return JSON.parse(texte);
    }
    catch(erreur){return [];}
}