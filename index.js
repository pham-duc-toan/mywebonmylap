const menu = document.querySelector(".header .bar");
const innerMenu = document.querySelector(".section-menu");
const sectionMenuItem=document.querySelector(".section-menu");
function hienMenu (){
    innerMenu.classList.toggle("hienMenu");
    // console.log("clicked");
    
}
function dongMenu (){
    innerMenu.classList.remove("hienMenu");
    // console.log("dongmenu");
}
menu.addEventListener("click",hienMenu);
sectionMenuItem.addEventListener("click",dongMenu);
