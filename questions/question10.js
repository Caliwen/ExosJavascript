let mastermind = document.getElementById("mastermind");
let gagne = document.getElementById("gagne");
let bouton = document.getElementById("bouton")

bouton.addEventListener("click", appuiBouton);

// Liste des couleurs possibles que l'ordinateur peut choisir
couleurTokens = ["rouge", "noir", "bleu", "jaune", "blanc", "violet"];

// Aléatoire permettant de choisir les couleurs côté ordinateur
objectif = [couleurTokens[Math.floor(Math.random() * couleurTokens.length)], couleurTokens[Math.floor(Math.random() * couleurTokens.length)], couleurTokens[Math.floor(Math.random() * couleurTokens.length)], couleurTokens[Math.floor(Math.random() * couleurTokens.length)]];

// Réponse cachée
// console.log("La bonne combinaison est : " + objectif[0], objectif[1], objectif[2], objectif[3]);

let ligneEnCours = 1;
let ligneMax = 12;



// ---------- Dès le lancement de la page ----------

// Construit les zones où on peut déposer les tokens (jetons de couleur)
function creerZoneDepot(zoneDepotLigne, ligne, i) {
    let zoneTemporaire = document.createElement("div");
    zoneTemporaire.setAttribute("id", "zoneDepot-" + ligne + "-" + i);

    zoneTemporaire.classList.add("zonesDepot", "m-1", "mb-2", "p-0");

    // Rend "droppable" la première ligne de jeu
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



// ---------- Animation des tokens, zoom pour embellir ----------

function curseurSurCouleur(event) {
    event.target.style.transform = "scale(1.2)";
}

function curseurQuitteCouleur(event) {
    event.target.style.transform = "scale(1)";
}



// ---------- Fonctionnement du glisser-déposer ----------

function onDragStart(event) {
    // Récupération du nom de la couleur selectionnée par l'utilisateur
    event.dataTransfer.setData('text', event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    let zoneDepot = event.target;

    // Si l'utilisateur a déposé le token sur un token déjà présent, récupérer le contenant du token déjà présent (son parent)
    if (!zoneDepot.parentNode.classList.contains("row")) {
        zoneDepot = event.target.parentNode;
    }

    // Si l'utilisateur veut déposer ailleurs que dans la ligne en cours, on abandonne le dépot
    if (!zoneDepot.classList.contains("active")) {
        return;
    }

    // Si une couleur est déjà présente : la supprimer
    if (zoneDepot.hasChildNodes()) {
        zoneDepot.removeChild(zoneDepot.lastChild);
    }

    const id = event.dataTransfer.getData('text');

    // Clone de la couleur choisie par l'utilisateur
    let elementDeplace = document.getElementById(id);
    let elementClone = elementDeplace.cloneNode("true");

    elementClone.setAttribute("draggable", "false");
    elementClone.style.transform = "scale(1)";

    // Affichage du token dans la case de dépot
    zoneDepot.appendChild(elementClone);

    event.dataTransfer.clearData();
}



// ---------- Vérification et affichage du jeu ----------

function appuiBouton() {
    let zoneDepotActive = document.getElementsByClassName("active");

    // Si une des cases de la ligne est vide, ne rien faire
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

    // Stockage des couleurs choisies par l'utilisateur
    for (let i = 0; i < 4; i++) {
        tableauCouleurEnCours[i] = document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).childNodes[0].id;
    }

    // Vérification si la couleur ajoutée par l'utilisateur est de la bonne couleur ET au bon endroit par rapport à l'ordinateur
    for (let couleurEnCours = 0; couleurEnCours < 4; couleurEnCours++) {
        for (let couleurObjectif = 0; couleurObjectif < 4; couleurObjectif++) {
            if (tableauCouleurEnCours[couleurEnCours] == copieObjectif[couleurObjectif] && couleurEnCours == couleurObjectif) {
                pinNoire += 1;
                // Vidage des couleurs checkées pour éviter les doublons
                copieObjectif[couleurObjectif] = " ";
                tableauCouleurEnCours[couleurEnCours] = "";
            }
        }
    }

    // Vérification si la couleur ajoutée par l'utilisateur est de la bonne couleur MAIS PAS au bon endroit par rapport à l'ordinateur
    for (let couleurEnCours = 0; couleurEnCours < 4; couleurEnCours++) {
        for (let couleurObjectif = 0; couleurObjectif < 4; couleurObjectif++) {
            if (tableauCouleurEnCours[couleurEnCours] == copieObjectif[couleurObjectif] && couleurEnCours != couleurObjectif) {
                pinBlanche += 1;
                // Vidage des couleurs checkées pour éviter les doublons
                copieObjectif[couleurObjectif] = " ";
                tableauCouleurEnCours[couleurEnCours] = "";
            }
        }
    }

    affichagePins(pinNoire, pinBlanche);

    // Suite du jeu, fin ou continuation

    if (ligneEnCours == ligneMax && pinNoire != 4) {
        document.getElementById("resultat").innerText = "Vous avez perdu..."
        gagne.style.transition = "opacity 1s ease";
        gagne.style.left = "calc(50% - 200px)";
        finDuJeu();
    }

    if (pinNoire == 4) {
        gagne.style.transition = "opacity 1s ease";
        gagne.style.left = "calc(50% - 200px)";
        finDuJeu();
    }
    else {
        changeLigneEnCours();
    }
}



// ---------- Affichage des pins noire et blanche et fin du jeu ----------

function affichagePins(noire, blanche) {
    let i = 0;

    while (noire > 0) {
        let zonePin = document.getElementById("pin" + ligneEnCours + "-" + i)
        let pinNoire = document.createElement("div");
        pinNoire.classList.add("pinNoire");
        zonePin.appendChild(pinNoire);

        // La pin affichée est zoomée (CSS) puis reprend sa taille normale
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

        // La pin affichée est zoomée (CSS) puis reprend sa taille normale
        setTimeout(function() {
            pinBlanche.style.transform = "scale(1)";
        }, 1)

        blanche -= 1;
        i += 1;
    }
}

// Affichage de l'alerte de fin et bouton pour "Rejouer" et rafraichissement de la page si appui sur le bouton
function finDuJeu() {
    bouton.removeEventListener("click", appuiBouton);
    gagne.style.opacity = "1";

    let boutonRejouer = document.getElementById("boutonRejouer");
    boutonRejouer.addEventListener("click", function() {
        window.location.reload(true);
    })
}

// Changement de la ligne en cours si le jeu n'est pas fini
function changeLigneEnCours() {
    for (let i = 0; i < 4; i++) {
        document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).classList.remove("active");
        document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).removeEventListener("dragover", onDragOver);
        document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).removeEventListener("drop", onDrop);
    }

    ligneEnCours += 1;

    if (ligneEnCours <= ligneMax) {
        for (let i = 0; i < 4; i++) {
            document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).classList.add("active");
            document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).addEventListener("dragover", onDragOver);
            document.getElementById("zoneDepot-" + ligneEnCours + "-" + i).addEventListener("drop", onDrop);
        }
    }
}



// ---------- Dès le lancement de la page ----------

// Création du plateau de jeu
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

// Ajout d'événement sur les tokens de l'utilisateur
for (couleur of couleurTokens) {
    document.getElementById(couleur).addEventListener("dragstart", onDragStart);
    document.getElementById(couleur).addEventListener("mouseenter", curseurSurCouleur);
    document.getElementById(couleur).addEventListener("mouseleave", curseurQuitteCouleur);
}