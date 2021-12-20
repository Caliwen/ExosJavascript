let btnNomNavigateur = document.getElementById("btnNomNavigateur");
let btnNomApplication = document.getElementById("btnNomApplication");
let btnVersionApplication = document.getElementById("btnVersionApplication");
let btnUtilisateur = document.getElementById("btnUtilisateur");

let nomNavigateur = document.getElementById("nomNavigateur");
let nomApplication = document.getElementById("nomApplication")
let versionApplication = document.getElementById("versionApplication");
let utilisateur = document.getElementById("utilisateur");

btnNomNavigateur.addEventListener("click", function() {
    nomNavigateur.value = navigator.appCodeName;
})

btnNomApplication.addEventListener("click", function() {
    nomApplication.value = navigator.appName;
})

btnVersionApplication.addEventListener("click", function() {
    versionApplication.value = navigator.appVersion;
})

btnUtilisateur.addEventListener("click", function() {
    utilisateur.value = navigator.userAgent;
})