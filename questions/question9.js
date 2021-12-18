let image = document.getElementById("image");
let listeBouton = document.getElementById("listeBouton");
let messageFinJeu = document.getElementById("message");
let messageMot = document.getElementById("mot");

let motAffiche = new String('" _ _ _ _ _ _ _ _ _ _ _ _ _ _"');

let listeMots = ["ABANDONNASSENT", "ACATALEPTIQUES", "DESEMBOUTEILLE", "ENCYCLOPEDIQUE", "EXCOMMUNIAIENT", "HABITUELLEMENT", "IMPLEMENTATION", "METEOROLOGIQUE", "MICROCHIRURGIE", "POSTCOMMUNISME", "SYNTHETISANTES", "TAMBOURINERIEZ", "TIREBOUCHONNER", "TEMPORELLEMENT", "VIGOUREUSEMENT"];
let mot = (listeMots[Math.floor(Math.random() * listeMots.length)]).split('');
console.log(mot);

let essais = 9;
let changementMot;

function creerBouton(i) {
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("id", "btn" + String.fromCharCode(65 + i));
    btn.classList.add("btn", "btn-secondary", "m-1");

    btn.style.transition = "transform 150ms linear";

    btn.innerText = String.fromCharCode(65 + i);
    listeBouton.appendChild(btn);

    btn.addEventListener("click", activerBouton);
    btn.addEventListener("mouseenter", zoomLettre);
    btn.addEventListener("mouseleave", dezoomLettre);

    if (i == 8 || i == 16) {
        let espace = document.createElement("br");
        listeBouton.appendChild(espace);
    }
}

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

function zoomLettre(btn) {
    btn.target.style.transform = "scale(1.2)";
}

function dezoomLettre(btn) {
    btn.target.style.transform = "scale(1)";
}

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

function checkSiFinDuJeu() {
    let motSansEspace = (motAffiche.substr(2, motAffiche.length-3)).split(" ");

    for (let i = 0; i <= motSansEspace.length; i++) {
        if (motSansEspace[i] != mot[i]) {
            return;
        }
    };

    finDuJeu();
}

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
    }
    else {
        messageMot.innerHTML = "Vous avez gagné !<br>" +
                               "Le mot était : <span class='font-weight-bold'>" + motFinal + "</span> !";
    }
}

for (let i = 0; i < 26; i++) {
    creerBouton(i);
}