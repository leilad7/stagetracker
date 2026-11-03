
export async function chercherEntreprise(nom){
    const url=`https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(nom)}`;
    const reponse = await fetch(url);
    if(!reponse.ok){
        throw new Error(`erreur ${reponse.status}`);
    }
    const donnees=await reponse.json();
    return donnees.results;
}

