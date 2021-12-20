let emailSaisi;
let emailSaisiCouper;
let positionArobase;
let message = document.getElementById("message")

// Fonction activée à chaque entrée/suppression de valeur
function verifierEmail() {

    emailSaisi = document.getElementById("email").value;

    // Si il y a un arobase ailleurs qu'en première position et si sa position est avant le point et si le point est positionné avant l'antépénultième position
    if ((emailSaisi.indexOf("@") > 0 && emailSaisi.indexOf("@") < emailSaisi.indexOf(".")) && (emailSaisi.indexOf(".") + 2 < emailSaisi.length)) {
        message.innerHTML = "<span class='text-info'>Adresse email valide !<span>";
    
    }
    else {
        message.innerHTML = "<span class='text-info'>Adresse email invalide !<span>";
    }
}

document.getElementById("email").addEventListener("keyup", verifierEmail);

// Au fait : antépénultième = avant-avant-dernier