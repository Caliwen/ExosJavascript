let nbrePhotocopie;
let prixTotal;

let bouton = document.getElementById("bouton");
let message = document.getElementById("message");

// Récupération du nombre de copies entrées et affichage du texte en conséquence
function effectuerCalcul(){

    nbrePhotocopie = document.getElementById("valeur-saisie").value;

    // Sortie de la fonction si les valeurs sont invalides
    if ((isNaN(nbrePhotocopie) == true) || nbrePhotocopie <= 0) {
        message.innerHTML = "Veuillez entrer un nombre valide";
        return;
    }

    // Calcul du prix en fonction des copies
    if (nbrePhotocopie <= 10) {
        prixTotal = nbrePhotocopie * 0.1;
    }
    else if (nbrePhotocopie <= 30) {
        prixTotal = (nbrePhotocopie - 20) * 0.1 + (nbrePhotocopie - 10) * 0.09;
    }
    else{
        prixTotal = 10 * 0.1 + 20 * 0.09 + (nbrePhotocopie - 30) * 0.08;
    }

    // Affichage du prix total
    message.innerHTML = "Le prix total est de : " + prixTotal.toFixed(2) + " euros ";
}

// Ajout d'un événement sur le bouton "Estimation"
bouton.addEventListener("click", effectuerCalcul);