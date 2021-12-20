let nombre = document.getElementById("nombre");
let texte = document.getElementById("texte");
let btnTransfert = document.getElementById("btnTransfert");


btnTransfert.addEventListener("click", function() {
    let texteValeur = texte.value;
    let nombreValeur = nombre.value;
    
    if (isNaN(texteValeur) == false||isNaN(nombreValeur) == true) {
        return;
    }
    window.location.assign("passage2.html?Texte=" + texteValeur + "&Nombre=" + nombreValeur)
})