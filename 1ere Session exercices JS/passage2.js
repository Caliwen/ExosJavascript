let url = window.location.search

let urlParams = new URLSearchParams (url);
let valueText = urlParams.get("Texte"); 
let valueNombre = urlParams.get("Nombre");

let afficherTexte = document.getElementById("valeurTexte")
let afficherNombre = document.getElementById("valeurNombre")

afficherTexte.innerText = valueText
afficherNombre.innerText = valueNombre
