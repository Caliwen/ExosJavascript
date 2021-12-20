var nomExterne = "Hein ";
var prenom = "Terieur ";

function portee(nom) {
    nomGlobale = "Halle ";
    console.log(window.nomGlobale + nom + prenom);
    console.log(nomGlobale + nomExterne + prenom);
}

portee("Ex ");
console.log(prenom);// provoque une erreur