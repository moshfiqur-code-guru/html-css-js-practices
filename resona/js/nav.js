// ############################################################//
// navigation animation when scrolling                        //
// ##########################################################//

const navigation = document.querySelector(".navigation");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        navigation.classList.add("scrolled");
    } else {
        navigation.classList.remove("scrolled");
    }
});



const ul = document.createElement("ul");
const menu = document.querySelector(".main-menu");

for (let i = 0; i < arrayOfMenu.length; i++) {
    ul.innerHTML += `<li><a href = "${arrayOfMenu[i].label}.html" class="${arrayOfMenu[i].label}"> ${arrayOfMenu[i].label}</a></li > `
}

if (menu !== null) {
    ul.classList.add("flex");
    menu.appendChild(ul);
}


function activeMenu() {
    const currentLocation = location.href;
    let lastPart = currentLocation.split("/").pop().split(".")[0];
    console.log(lastPart);

    const menu = document.querySelector("." + lastPart);
    if (menu !== null) {
        menu.classList.add("active");
    }
}

activeMenu();


const homeBtnAdd = document.querySelector(".first-items");

homeBtnAdd.innerHTML = `<a href="home.html" class="logo flex align-center">
                        <i class="ti ti-brand-framer"></i>
                        <span>RESONA</span>
                    </a>`;
