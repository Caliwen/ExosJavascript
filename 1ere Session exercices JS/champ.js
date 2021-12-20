let texte = document.getElementById("texte")
let btnControle = document.getElementById("btnControle")

btnControle.addEventListener("click", function() {
    let nombreCaractere = texte.value;
    if (nombreCaractere.length<2) {
        alert("La chaîne doit comporter au moins 2 caractères")
    }
    else 
    alert("vous avez saisi : "+nombreCaractere)
    location = "http://www.afpa.fr"
})