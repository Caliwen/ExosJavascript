let bouton = document.getElementById("bouton");
let message = document.getElementById("message");

// Récupération de l'heure et affichage à la seconde suivante
function changerHeure() {
    let heure = document.getElementById("heure-saisie").valueAsNumber;
    let minute = document.getElementById("minute-saisie").valueAsNumber;
    let seconde = document.getElementById("seconde-saisie").valueAsNumber;

    // Sortie de la fonction si les valeurs sont invalides
    if (isNaN(seconde) || isNaN(minute) || isNaN(heure)) {
        message.innerText = "Veuillez remplir chaque champ";
        return;
    }

    // Sortie de la fonction si les valeurs entrées sont trop hautes
    if (0 > seconde || seconde > 59 || 0 > minute || minute > 59 ||0 > heure || heure > 23) {
        message.innerText = "Au moins une des valeurs entrées n'est pas valide. Réessayez";
        return;
    }

    seconde += 1;

    if (seconde == 60) {
        seconde = 0;
        minute += 1;

        if (minute == 60) {
            minute = 0;
            heure += 1;

            if (heure == 24) {
                heure = 0
            }
        }
    }

    // Ajout d'un 0 si les valeurs pour embellir l'affichage des petits chiffres
    if (seconde < 10) {
        seconde = "0" + seconde;
    };

    if (minute < 10) {
        minute = "0" + minute;
    };

    if (heure < 10) {
        heure = "0" + heure;
    };
    
    message.innerHTML = "La seconde d'après il sera : <br>" + heure + "h " + minute + "min " + seconde + "s.";
}

bouton.addEventListener("click", changerHeure);