let bouton = document.getElementById("bouton");
let message = document.getElementById("message");

bouton.addEventListener("click", function() {
    let montantPayer = document.getElementById("montant-payer").valueAsNumber;
    let monterDonne = document.getElementById("montant-donne").valueAsNumber;

    let reste = monterDonne - montantPayer;

    let billet10 = 0;
    let billet5 = 0;

    if (isNaN(montantPayer) || isNaN(monterDonne)) {
        message.innerText = "Au moins l'un des montants n'est pas valide.";
        return;
    }

    if (monterDonne < montantPayer) {
        message.innerText = "Le montant à payer est plus grand que le montant donné, veuillez réessayer."
    }

    if (reste >= 10) {
        billet10 = parseInt(reste / 10);
        reste -= billet10*10
    }

    if (reste >= 5) {
        billet5 = parseInt(reste / 5);
        reste -= billet5*5
    }

    message.innerHTML = "<br>La caisse doit rendre :<br>" +
                        billet10 + " billet(s) de 10<br>" +
                        billet5 + " billet(s) de 5<br>" +
                        reste + " pièce(s) de 1<br>";
});