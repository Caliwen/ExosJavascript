let emailSaisi;
let emailSaisiCouper;
let positionArobase;
let message = document.getElementById("message")

function verifierEmail() {

    emailSaisi = document.getElementById("email").value;

    if ((emailSaisi.indexOf("@") > 0 && emailSaisi.indexOf("@") < emailSaisi.indexOf(".")) && (emailSaisi.indexOf(".") + 2 < emailSaisi.length)) {

        message.innerHTML = "<span class='text-info'>Adresse email valide !<span>";
    
    }else{

        message.innerHTML = "<span class='text-info'>Adresse email invalide !<span>";

}

}

document.getElementById("email").addEventListener("keyup", verifierEmail);