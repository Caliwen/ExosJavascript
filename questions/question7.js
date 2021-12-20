let mdpSaisi;

let regexMaj = new RegExp(/[A-Z]/);
let regexMin = new RegExp(/[a-z]/);
let regexChiffre = new RegExp(/[0-9]/);
let regexSpecial = new RegExp(/[-!"#\$<%&'>()=*+,.\/\\?@^_`{|}~€£]/);

let compteurSecurite;

let message = document.getElementById("message");
message.innerHTML = "<span class='text-info'>Commencez par remplir le champ de mot de passe<span>";

// Calcul de la fiabilité du mot de passe et affichage en conséquence
function verifierMotdepasse(){
    compteurSecurite = 0;
    mdpSaisi = document.getElementById("mdp").value;

    // 5 <- le plus fiable --- 0 <- le moins fiable
    if (regexMaj.test(mdpSaisi)) {
        compteurSecurite += 1;
    }

    if (regexMin.test(mdpSaisi)) {
        compteurSecurite += 1;
    }

    if (regexChiffre.test(mdpSaisi)) {
        compteurSecurite += 1;
    }

    if (regexSpecial.test(mdpSaisi)) {
        compteurSecurite += 1;
    }

    if (mdpSaisi.length >= 8) {
        compteurSecurite += 1;
    }

    // Affichage du message et changement de la couleur du texte liée au tarif
    switch (compteurSecurite){
        case 5:
            message.style.color = "#88E0EF"
            message.innerHTML = "<span>Mot de passe très sécurisé !<span>";
        break;

        case 4:
            message.style.color = "#519259"
            message.innerHTML = "<span>Mot de passe sécurisé !<span>";
        break;

        case 3:
            message.style.color = "#FFE400"
            message.innerHTML = "<span>Mot de passe moyen !<span>";
        break;

        case 2:
            message.style.color = "#F3950D"
            message.innerHTML = "<span>Mot de passe faible !<span>";
        break;
        
        case 1:
            message.style.color = "#CD1818"
            message.innerHTML = "<span>Mot de passe dangereux !<span>";
        break;

        case 0:
            message.style.color = "#E9A6A6"
            message.innerHTML = "<span>Commencez par remplir le champ de mot de passe<span>";
        break;

        default:
            message.style.color = "#E9A6A6"
            message.innerHTML = "<span>Erreur dans le processus, veuillez relancer la page.<span>";
    }
}

document.getElementById("mdp").addEventListener("keyup", verifierMotdepasse);