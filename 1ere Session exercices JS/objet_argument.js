function calculPerimetre() {
    let perimetre = 0;
    
    if (arguments.length==0){
        perimetre=console.error("erreur");
    }
    if (arguments.length==1) {
        perimetre=arguments[0]*4;
    }
    if (arguments.length==2) {
        perimetre=arguments[0]*2+arguments[1]*2;
    }
    if (arguments.length==3) {
        perimetre=arguments[0]+arguments[1]+arguments[2];
    }
    if (arguments.length>3) {
        for (let i in arguments) {
          perimetre+=arguments[i];
           }
       }
    if (arguments.length!=0) {
        console.log(perimetre)
    }
       
}

calculPerimetre()
calculPerimetre(2);
calculPerimetre(2,3);
calculPerimetre(2,3,4);
calculPerimetre(2,3,4,5,6,7);