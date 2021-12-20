let image = document.getElementById("image");
let listeBouton = document.getElementById("listeBouton");
let messageMot = document.getElementById("mot");
let boutonRejouer = document.getElementById("boutonRejouer");
boutonRejouer.style.display = "none";

let motAffiche = new String('" _ _ _ _ _ _ _ _ _ _ _ _ _ _"');

// Tableau contenant les mots proposables
let listeMots = ["ABANDONNASSENT", "ACATALEPTIQUES", "DESEMBOUTEILLE", "ENCYCLOPEDIQUE", "EXCOMMUNIAIENT", "HABITUELLEMENT", "IMPLEMENTATION", "METEOROLOGIQUE", "MICROCHIRURGIE", "POSTCOMMUNISME", "SYNTHETISANTES", "TAMBOURINERIEZ", "TIREBOUCHONNER", "TEMPORELLEMENT", "VIGOUREUSEMENT"];

// Aléatoire qui choisi un mot dans le tableau au dessus
let mot = listeMots[Math.floor(Math.random() * listeMots.length)];

// Réponse cachée
// console.log("Le mot à trouver est : " + mot);

mot = mot.split('');
let essais = 9;
let changementMot;

// Création du clavier contenant toutes les lettres
function creerBouton(i) {
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("id", "btn" + String.fromCharCode(65 + i));
    btn.classList.add("btn", "btn-secondary", "m-1");

    btn.style.transition = "transform 150ms linear";

    btn.innerText = String.fromCharCode(65 + i);
    listeBouton.appendChild(btn);

    // Ajout d'événements sur les boutons du clavier
    btn.addEventListener("click", activerBouton);
    btn.addEventListener("mouseenter", zoomLettre);
    btn.addEventListener("mouseleave", dezoomLettre);

    // Saut de ligne pour avoir un clavier sur plusieurs lignes
    if (i == 8 || i == 16) {
        let espace = document.createElement("br");
        listeBouton.appendChild(espace);
    }
}

// Appui du bouton, changement de nombre d'essais et d'image si "verificationMot" ne renvoie pas d'affichage de lettre
function activerBouton(btn) {
    changementMot = false;
    if (essais > 0) {
        btn.target.disabled = "true";
        btn.target.style.transform = "scale(1)";

        verificationMot(btn.target.innerText);

        if (changementMot == false) {
            essais -= 1;

            image.setAttribute("src", "images_question9/pendu_" + essais + ".png");

            if (essais <= 0) {
                finDuJeu();
            }
        }
    }    
}

// Grossissement de la lettre du clavier au passage de la souris
function zoomLettre(btn) {
    btn.target.style.transform = "scale(1.2)";
}

// Mise en taille normale quand la souris quitte la lettre
function dezoomLettre(btn) {
    btn.target.style.transform = "scale(1)";
}

// Comparaison entre la lettre appuyée et le mot attendu
function verificationMot(lettre) {
    for (let i = 0; i < mot.length; i++) {
        if (lettre == mot[i]) {
            let motAfficheSplit = motAffiche.substr(0, i*2 + 2) + lettre + motAffiche.substr(i*2 + 3, motAffiche.length);
            motAffiche = motAfficheSplit;
            changementMot = true;
        }
    }
    messageMot.innerText = motAffiche;

    checkSiFinDuJeu();
}

// Vérification si le mot attendu est exactement celui trouvé sans lettre manquante
function checkSiFinDuJeu() {
    let motSansEspace = (motAffiche.substr(2, motAffiche.length-3)).split(" ");

    for (let i = 0; i <= motSansEspace.length; i++) {
        if (motSansEspace[i] != mot[i]) {
            return;
        }
    };

    finDuJeu();
}

// Désactive les touches du clavier et affiche le message de fin
function finDuJeu() {
    let enfants = listeBouton.childNodes;
    for (let enfant in enfants) {
        if (enfants[enfant].nodeName == "BUTTON") {
            enfants[enfant].removeEventListener("click", activerBouton);
        }
    }

    let motFinal = "";
    for (let caractere = 0; caractere < mot.length; caractere++) {
        motFinal += mot[caractere];
    }

    if (essais == 0) {
        messageMot.innerHTML = "Vous avez perdu.<br>" +
                               "Le mot était : <span class='font-weight-bold'>" + motFinal + "</span> !";
        boutonRejouer.style.display = "initial";
        boutonRejouer.addEventListener("click", function() {
            window.location.reload(true);
        })
    }
    else {
        messageMot.innerHTML = "Vous avez gagné !<br>" +
                               "Le mot était : <span class='font-weight-bold'>" + motFinal + "</span> !";
        boutonRejouer.style.display = "initial";
        boutonRejouer.addEventListener("click", function() {
            window.location.reload(true);
        })
    }
}

// Lancement de la fonction dès le début de la page pour afficher un clavier de touches
for (let i = 0; i < 26; i++) {
    creerBouton(i);
}