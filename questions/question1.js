let ageSaisi;
let genreSaisi;

let bouton = document.getElementById("bouton");
let message = document.getElementById("message");

// Récupération des données saisies et affichage du texte en conséquence
function verifierImpo(){
    ageSaisi = document.getElementById("age-saisi").value;
    genreSaisi = document.getElementById("genre-saisi").value;

    // Sortie de la fonction si les valeurs sont invalides
    if ((isNaN(ageSaisi) == true) || ageSaisi == "" || (genreSaisi != "H" && genreSaisi !="F")) {
        message.innerHTML = "<p>Veuillez choisir un genre et un âge valide.</p>";
        return;
    }

    if (genreSaisi == "H" && ageSaisi >= 18) {
        message.innerHTML = "<p>Vous êtes imposable !</p>";
    }    
    else if ((genreSaisi == "F" && ageSaisi >=20) && (genreSaisi == "F" && ageSaisi <= 35)) {
        message.innerHTML = "<p>Vous êtes imposable !</p>";
    }
    else{
        message.innerHTML = "<p>Vous n'êtes pas imposable !</p>";
    }
    }

// Ajout d'un événement sur le bouton "Valider"
bouton.addEventListener("click", verifierImpo);

    
