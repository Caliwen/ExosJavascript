let bouton = document.getElementById("bouton");
let message = document.getElementById("message");

function changerHeure() {
    let heure = document.getElementById("heure-saisie").value;
    let minute = document.getElementById("minute-saisie").value;
    let seconde = document.getElementById("seconde-saisie").value;

    if (isNaN(seconde) || isNaN(minute) || isNaN(heure)) {
        message.innerText = "Veuillez remplir chaque champ";
        return;
    }

    if (seconde > 60 || minute > 60 || heure > 24) {
        message.innerText = "Au moins une des valeurs entrées n'est pas valide. Au moins une des valeurs été rectifiée afin de reprendre un format horaire."
    }

    seconde += 1;

    if (seconde >= 60) {
        seconde = 0;
        minute += 1;

        if (minute >= 60) {
            minute = 0;
            heure += 1;

            if (heure >= 24) {
                heure = 0
            }
        }
    }

    message.innerText = "La seconde d'après il sera : " + heure + "h " + minute + "min " + seconde + "s.";


}