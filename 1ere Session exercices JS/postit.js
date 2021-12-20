let boutonAfficher = document.getElementById("btnAffiche");
let boutonCacher = document.getElementById("btnCacher");
let textPostit = document.getElementById("postit");
let textSurvole = document.getElementById("survole")

boutonAfficher.addEventListener("click",function() {
    textPostit.style.display = "initial";
    textPostit.innerText = "Vous avez cliqué sur le bouton 'Affiche' !";
})

boutonCacher.addEventListener("click",function() {
    textPostit.style.display = "none";
})

textSurvole.addEventListener("mouseover",function() {
    textPostit.style.display = "initial";
    textPostit.innerText = "C'est gentil de me survoler..."
})

textSurvole.addEventListener("mouseleave", function() {
    textPostit.style.display = "none"
})