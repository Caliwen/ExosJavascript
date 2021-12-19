let mastermind = document.getElementById("mastermind");
let gagne = document.getElementById("gagne");
let bouton = document.getElementById("bouton")

bouton.addEventListener("click", appuiBouton);

couleurTokens = ["rouge", "noir", "bleu", "jaune", "blanc", "violet"];
objectif = [couleurTokens[Math.floor(Math.random() * couleurTokens.length)], couleurTokens[Math.floor(Math.random() * couleurTokens.length)], couleurTokens[Math.floor(Math.random() * couleurTokens.length)], couleurTokens[Math.floor(Math.random() * couleurTokens.length)]];

// Réponse cachée
console.log(objectif[0], objectif[1], objectif[2], objectif[3]);

let ligneEnCours = 1;
let ligneMax = 12;



function creerZoneDepot(zoneDepotLigne, ligne, i) {
    let zoneTemporaire = document.createElement("div");
    zoneTemporaire.setAttribute("id", "zoneDepot-" + ligne + "-" + i);

    zoneTemporaire.classList.add("zonesDepot", "m-1", "mb-2", "p-0");
    if (ligneEnCours == ligne) {
        zoneTemporaire.classList.add("active");
        zoneTemporaire.addEventListener("dragover", onDragOver);
        zoneTemporaire.addEventListener("drop", onDrop);
    }
    zoneDepotLigne.appendChild(zoneTemporaire);
}

function creerZonePin(lignePin, ligne, i) {
    let zonePin = document.createElement("div");
    zonePin.classList.add("col", "zonesPin", "p-0", "mt-1", "mx-1");
    zonePin.setAttribute("id", "pin" + ligne + "-" + i);
    lignePin.appendChild(zonePin);
}



function curseurSurCouleur(event) {
    event.target.style.transform = "scale(1.2)";
}

function curseurQuitteCouleur(event) {
    event.target.style.transform = "scale(1)";
}



function onDragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    let zoneDepot = event.target;

    if (!zoneDepot.parentNode.classList.contains("row")) {
        zoneDepot = event.target.parentNode;
    }

    if (!zoneDepot.classList.contains("active")) {
        return;
    }

    if (zoneDepot.hasChildNodes()) {
        zoneDepot.removeChild(zoneDepot.lastChild);
    }

    const id = event.dataTransfer.getData('text');

    let elementDeplace = document.getElementById(id);
    let elementClone = elementDeplace.cloneNode("true");

    elementClone.setAttribute("draggable", "false");
    elementClone.style.transform = "scale(1)";

    zoneDepot.appendChild(elementClone);

    event.dataTransfer.clearData();
}


function appuiBouton() {
    let zoneDepotActive = document.getElementsByClassName("active");

    for (let i = 0; i < zoneDepotActive.length; i++) {
        if (zoneDepotActive[i].childElementCount == 0) {
            return;
        }
    }

    verifiePinsOuGagne();
}

function verifiePinsOuGagne() {
    let tableauCouleurEnCours = [];
    let copieObjectif = objectif.slice();

    let pinBlanche = 0;
    let pinNoire = 0;

    for (let i = 0; i < 4; i++) {
        tableauCouleurEnCours[i] = document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).childNodes[0].id;
    }

    for (let couleurEnCours = 0; couleurEnCours < 4; couleurEnCours++) {
        for (let couleurObjectif = 0; couleurObjectif < 4; couleurObjectif++) {
            if (tableauCouleurEnCours[couleurEnCours] == copieObjectif[couleurObjectif] && couleurEnCours == couleurObjectif) {
                pinNoire += 1;
                copieObjectif[couleurObjectif] = " ";
                tableauCouleurEnCours[couleurEnCours] = "";
            }
        }
    }

    for (let couleurEnCours = 0; couleurEnCours < 4; couleurEnCours++) {
        for (let couleurObjectif = 0; couleurObjectif < 4; couleurObjectif++) {
            if (tableauCouleurEnCours[couleurEnCours] == copieObjectif[couleurObjectif] && couleurEnCours != couleurObjectif) {
                pinBlanche += 1;
                copieObjectif[couleurObjectif] = " ";
                tableauCouleurEnCours[couleurEnCours] = "";
            }
        }
    }

    affichagePins(pinNoire, pinBlanche);

    if (pinNoire == 4) {
        gagne.style.transition = "opacity 2s ease 0.3s";
        gagne.style.left = "calc(50% - 200px)";
        finDuJeu();
    }
    else {
        changeLigneEnCours();
    }
}


function affichagePins(noire, blanche) {
    let i = 0;

    while (noire > 0) {
        let zonePin = document.getElementById("pin" + ligneEnCours + "-" + i)
        let pinNoire = document.createElement("div");
        pinNoire.classList.add("pinNoire");
        zonePin.appendChild(pinNoire);

        setTimeout(function() {
            pinNoire.style.transform = "scale(1)";
        }, 1)

        noire -= 1;
        i += 1;
    }

    while (blanche > 0) {
        let zonePin = document.getElementById("pin" + ligneEnCours + "-" + i)
        let pinBlanche = document.createElement("div");
        pinBlanche.classList.add("pinBlanche");
        zonePin.appendChild(pinBlanche);

        setTimeout(function() {
            pinBlanche.style.transform = "scale(1)";
        }, 1)

        blanche -= 1;
        i += 1;
    }
}

function finDuJeu() {
    bouton.removeEventListener("click", appuiBouton);
    gagne.style.opacity = "1";

    let boutonRejouer = document.getElementById("boutonRejouer");
    boutonRejouer.addEventListener("click", function() {
        window.location.reload(true);
    })
}

function changeLigneEnCours() {
    for (let i = 0; i < 4; i++) {
        document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).classList.remove("active");
        document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).removeEventListener("dragover", onDragOver);
        document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).removeEventListener("drop", onDrop);
    }

    ligneEnCours += 1;

    for (let i = 0; i < 4; i++) {
        document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).classList.add("active");
        document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).addEventListener("dragover", onDragOver);
        document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).addEventListener("drop", onDrop);
    }
}



for (let ligne = 1; ligne <= ligneMax; ligne++) {
    let ligneTemporaire = document.createElement("div");
    ligneTemporaire.classList.add("row", "ombrage", "px-3", "mx-auto");

    let colonneTemporaire = document.createElement("div");
    colonneTemporaire.classList.add("col-10");

    let zoneDepotLigne = document.createElement("div");
    zoneDepotLigne.classList.add("row");

    mastermind.insertBefore(ligneTemporaire, mastermind.firstChild);
    ligneTemporaire.appendChild(colonneTemporaire);
    colonneTemporaire.appendChild(zoneDepotLigne);

    for (let i = 0; i < 4; i++) {
        creerZoneDepot(zoneDepotLigne, ligne, i)
    }

    let colonnePin = document.createElement("div");
    colonnePin.classList.add("col-2");
    ligneTemporaire.appendChild(colonnePin);

    let lignePin1 = document.createElement("div");
    lignePin1.classList.add("row", "lignePin");
    let lignePin2 = lignePin1.cloneNode(true);

    colonnePin.appendChild(lignePin1);
    colonnePin.appendChild(lignePin2);

    for (let i = 0; i < 4; i++) {
        if (i < 2) {
            creerZonePin(lignePin1, ligne, i);
        }
        else {
            creerZonePin(lignePin2, ligne, i);
        }
    }
}

for (couleur of couleurTokens) {
    document.getElementById(couleur).addEventListener("dragstart", onDragStart);
    document.getElementById(couleur).addEventListener("mouseenter", curseurSurCouleur);
    document.getElementById(couleur).addEventListener("mouseleave", curseurQuitteCouleur);
}