let button = document.getElementById("js-menu_toggle");
let sideMenu = document.getElementById("side_menu");
let linksMenu = document.getElementsByClassName("nav-item");
let delay = 0.2;

button.addEventListener("click", function() {
    if (button.classList.contains("opened")) {
        buttonClose();
    }
    else {
        buttonOpen();
    }

})

function buttonClose() {
    button.classList.replace("opened", "closed");
    sideMenu.style.left = "-250px";

    for (let link of linksMenu) {
        link.style.transition = "opacity 0s 0.3s, transform 0s 0.3s";
        link.style.opacity = 0;
        link.style.transform = "translateX(-50px)";
    }
}

function buttonOpen() {
    button.classList.replace("closed", "opened");
    sideMenu.style.left = "0px";

    for (let link of linksMenu) {
        link.style.transition = "opacity 0.3s " + delay + "s, transform 0.3s " + delay + "s";
        delay+= 0.1;
        link.style.opacity = 1;
        link.style.transform = "translateX(50px)";
    }
    delay = 0.2;
}

for (let link of linksMenu) {
    link.style.opacity = "0";
    link.style.marginLeft = "-50px";
}