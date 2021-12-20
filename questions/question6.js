let bouton = document.getElementById("bouton");
let message = document.getElementById("message");

// Récupération des valeurs et affichage du tarif du conducteur
function appuiBouton () {
    let age = document.getElementById("age").valueAsNumber;
    let permis = document.getElementById("permis").valueAsNumber;
    let accident = document.getElementById("accident").valueAsNumber;
    let anciennete = document.getElementById("anciennete").valueAsNumber;

    // Cas de figure classique : + 25ans, + 2 ans de permis, 0 accident, 0 bonus ancienneté : VERT = 2
    let couleur = 2;

    // Sortie de la fonction si une des valeurs est invalide
    if (isNaN(age) || isNaN(permis) || isNaN(accident) || isNaN(anciennete) || age < 0 || permis < 0 || accident < 0 || anciennete < 0) {
        message.style.color =  "#E9A6A6";
        message.innerText = "Une des valeurs saisies n'est pas valide, veuillez réessayer."
        return;
    }

    // Cas précis de l'énoncé ou le conducteur n'est pas assuré si plus de 3 accidents
    if (accident > 3) {
        message.style.color = "#E9A6A6";
        message.innerHTML = "Trop d'accidents enregistrés.<br>" +
                            "Le conducteur coûtera trop cher à l'assurance, nous ne pouvons pas le prendre en charge.";
        return;
    }

    if (age < 25) {
        couleur += 1;
    }

    if (permis < 2) {
        couleur += 1;
    }

    couleur += accident;

    if (anciennete >= 5) {
        couleur -= 1;
    }

    // Affichage du message en fonction de la valeur de "couleur"
    switch (couleur) {
        // Bleu
        case 1:
            message.style.color = "#88E0EF";
            message.innerHTML = "Le conducteur a le droit au tarif <span class='font-weight-bold'>BLEU</span>.";
            break;
        
        // Vert
        case 2:
            message.style.color = "#519259";
            message.innerHTML = "Le conducteur a le droit au tarif <span class='font-weight-bold'>VERT</span>.";
            break;

        // Orange
        case 3:
            message.style.color = "#F3950D";
            message.innerHTML = "Le conducteur a le droit au tarif <span class='font-weight-bold'>ORANGE</span>.";
            break;
        
        // Rouge
        case 4:
            message.style.color = "#CD1818";
            message.innerHTML = "Le conducteur a le droit au tarif <span class='font-weight-bold'>ROUGE</span>.";
            break;
    
        // Innassurable
        default:
            message.style.color = "#E9A6A6";
            message.innerHTML = "Le conducteur coûtera trop cher à l'assurance, nous ne pouvons pas le prendre en charge.";
            break;
    }
};

bouton.addEventListener("click", appuiBouton);