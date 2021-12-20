function afficherTexte(){
   let boutonSemaine = document.getElementById("btnSemaine")
   let boutonWeekend = document.getElementById("btnWeekend")
   let zoneTexte = document.getElementById("zoneTexte")
    if (boutonSemaine.checked==true){
        zoneTexte.value = boutonSemaine.value
    }
    if (boutonWeekend.checked==true) {
        zoneTexte.value = boutonWeekend.value
    }
}