let bouton = document.getElementById("bouton");
let message = document.getElementById("message");

// Récupération des valeurs et affichage de l'argent à rendre
bouton.addEventListener("click", function() {
    let montantPayer = document.getElementById("montant-payer").valueAsNumber;
    let montantDonne = document.getElementById("montant-donne").valueAsNumber;

    let reste = montantDonne - montantPayer;

    let billet10 = 0;
    let billet5 = 0;

    // Sortie de la fonction si les valeurs sont invalides
    if (isNaN(montantPayer) || isNaN(montantDonne) || montantPayer < 0 || montantDonne < 0) {
        message.innerText = "Au moins l'un des montants n'est pas valide.";
        return;
    }

    // Sortie de la fonction si l'argent donné est plus petit que le total à payer
    if (montantDonne < montantPayer) {
        message.innerText = "Le montant à payer est plus grand que le montant donné, veuillez réessayer."
        return;
    }

    // Calcul du nombre d'argent à rendre
    if (reste >= 10) {
        billet10 = parseInt(reste / 10);
        reste -= billet10*10
    }

    if (reste >= 5) {
        billet5 = parseInt(reste / 5);
        reste -= billet5*5
    }

    // Affichage de fin avec détail
    message.innerHTML = "<br>La caisse doit rendre :<br>" +
                        billet10 + " billet(s) de 10<br>" +
                        billet5 + " billet(s) de 5<br>" +
                        reste + " pièce(s) de 1<br>";
});