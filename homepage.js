let button = document.getElementById("js-menu_toggle");
let sideMenu = document.getElementById("side_menu");
let linksMenu = document.getElementsByClassName("nav-link");
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
        link.style.transition = "all 1s";
        link.style.opacity = 0;
        link.style.marginLeft = "-50px";
    }
}

function buttonOpen() {
    button.classList.replace("closed", "opened");
    sideMenu.style.left = "0px";

    for (let link of linksMenu) {
        link.style.transition = "all 0.3s " + delay + "s";
        delay+= 0.1;
        link.style.opacity = 1;
        link.style.marginLeft = "0px";
    }
    delay = 0.2;
}

for (let link of linksMenu) {
    link.style.opacity = "0";
    link.style.marginLeft = "-50px";
}

// for (buttonStyle of document.getElementsByClassName("btn")) {
//     buttonStyle.addEventListener("mouseover", function() {
//         // buttonStyle.style.color = "#864879";
//         // buttonStyle.style.backgroundColor = "FFFFFF";
//     })
// }