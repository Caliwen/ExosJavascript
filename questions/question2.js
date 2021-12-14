let nbrePhotocopie;
let prixTotal;
let bouton = document.getElementById("bouton");
let message = document.getElementById("message");

function effectuerCalcul(){

    nbrePhotocopie = document.getElementById("valeur-saisie").value;

    if ((isNaN(nbrePhotocopie) == true) || nbrePhotocopie <= 0) {
        message.innerHTML = "Veuillez entrer un nombre valide";
        return;
    }
    if (nbrePhotocopie <= 10) {
        prixTotal = nbrePhotocopie * 0.1;
    }
    else if (nbrePhotocopie <= 30) {
        prixTotal = (nbrePhotocopie - 20) * 0.1 + (nbrePhotocopie - 10) * 0.09;
    }
    else{
        prixTotal = 10 * 0.1 + 20 * 0.09 + (nbrePhotocopie - 30) * 0.08;
    }

    message.innerHTML = "Le prix total est de : " + prixTotal.toFixed(2) + " euros ";
}

bouton.addEventListener("click",effectuerCalcul);