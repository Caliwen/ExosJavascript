let video = document.getElementById("video");
let nomObjet = document.getElementById("nom-objet");
let decriptionObjet = document.getElementById("description-objet");

let prixPropose = document.getElementById("prix-propose");
let tentative = document.getElementById("nbre-tentative");
let bouton = document.getElementById("bouton");
let message = document.getElementById("message");

// Tableau contenant tout l'affichage dynamique du texte
let objets = [
    ["un magnifique appareil photo", "Flambant neuf, dernier cri, pour prendre des photos comme un pro.", "appareil_photo"],
    ["une bague 24 carrats", "Parfait pour des fiançailles, en toc massif !", "bague"],
    ["une grande valise", "Pour l'emmener partout et découvrir le monde.", "valise"],
    ["des sublimes vases", "Décorer sa maison pour être toujours à la mode", "vases"],
    ["une voiture télécommandée", "Noël approche, cadeau idéal pour un enfant curieux !", "voiturette"]
];

// Aléatoire permettant de récupérer les informations de l'objet à gagner
let objetChoisi = Math.floor(Math.random() * objets.length);

// Récupération du prix proposé et rectification pour en faire un entier
let prix = Math.floor(Math.random() * 100) + 1;
let partieFinie = false;
let essais = 10;

// Affichage du texte dynamique : nom, description, vidéo
nomObjet.innerText = "Vous jouez pour : " + objets[objetChoisi][0];
decriptionObjet.innerText = objets[objetChoisi][1];
video.setAttribute("src", "videos_question8/" + objets[objetChoisi][2] + ".mp4");

// Appui du bouton "Envoyer la proposition"
bouton.addEventListener("click", function() {
    let propositionEnCours = prixPropose.valueAsNumber;

    // La tentative ne compte pas si le prix proposé n'est pas valide
    if (isNaN(propositionEnCours) || propositionEnCours < 1 || propositionEnCours > 100) {
        message.innerHTML = "Tentative non valide <br>" +
                            "Assurez vous de bien entrer un nombre entre 1 et 100 compris <br>" +
                            "La tentative n'est pas décomptée";
        return;
    }

    // Le bouton se transforme en "Rejouer" en fin de partie et appuyer dessus relance la page (recommence le jeu)
    if (partieFinie) {
        window.location.reload();
    }


    // Vérification du prix proposé avec le prix attendu, changement du bouton et fin de partie si c'est égal
    if (propositionEnCours == prix) {
        message.innerHTML = "Bien joué à toi, tu as gagné " + objets[objetChoisi][0] + " !";
        tentative.innerHTML = "Jeu gagné en " + (10 - essais) + " tentatives.";
        bouton.innerHTML = "Rejouer ?";
        partieFinie = true;
        return;
    }

    // Affichage si le prix proposé n'est pas égal au prix attendu
    if (propositionEnCours < prix) {
        message.innerHTML = "Vous avez proposé <span class='font-weight-bold'>" + propositionEnCours + "</span> <br>" +
                            "C'est <span class='font-weight-bold'>plus</span>";
    }
    else {
        message.innerHTML = "Vous avez proposé <span class='font-weight-bold'>" + propositionEnCours + "</span> <br>" +
                            "C'est <span class='font-weight-bold'>moins</span>";
    }

    essais -= 1;

    // Affichage du nombre d'essais restants
    switch(essais) {
        case 1:
            tentative.innerHTML = "Dernière tentative !";
            break;

        case 0:
            tentative.innerHTML = "Plus de tentatives restantes.";
            message.innerHTML = "<span class='font-weight-bold'>Vous avez perdu</span><br>" + 
                                "Mais ce n'est pas grave, appuyez sur 'Rejouer ?' pour retenter votre chance.";
            partieFinie = true;
            bouton.innerHTML = "Rejouer ?";
            break;
        
        default:
            tentative.innerHTML = "Il vous reste : 0" + essais + " tentatives restantes";
            break;
    }

})