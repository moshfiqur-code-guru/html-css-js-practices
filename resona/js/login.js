// #############################################//
// Declaration                                 //
// ###########################################//

const loginErrorMsg = document.getElementById("loginErrorMsg");
const loginSection = document.getElementById("login-section");
const loggedInContent = document.getElementById("logged-in-content");

//==========================================================//
// creating user                                           //
//========================================================//

const admin = {
    userName: "admin",
    password: "admin123",
    image: "assets/img/dp.jpg",
    isLoggedIn: false
}

function saveAdminIntoStorage(admin) {
    localStorage.setItem("admin", JSON.stringify(admin));
}

// saveAdminIntoStorage();


// ========================================================//
// get admin info from storage                            //
//=======================================================//

function getAdminInfo() {
    return JSON.parse(localStorage.getItem("admin"));
}
getAdminInfo();


// =======================================================//
// login function                                        //
// =====================================================//

function doLogin(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const admin = Object.fromEntries(formData);

    const savedAdmin = getAdminInfo();

    if (admin.userName.trim() == "" && admin.password.trim() == "") {
        loginErrorMsg.textContent = "Please put username and password.";

    } else {
        if (admin.userName.trim() !== savedAdmin.userName || admin.password.trim() !== savedAdmin.password) {
            loginErrorMsg.textContent = "Invalid login credentials."

        } else {
            loginErrorMsg.textContent = "";
            savedAdmin.isLoggedIn = true;
            saveAdminIntoStorage(savedAdmin);
            loginStatus();
        }
    }
}


// ==============================================//
// Login status                                 //
// ============================================//

function loginStatus() {
    const admin = getAdminInfo();

    if (admin && admin.isLoggedIn) {
        if (window.location.href.includes("admin.html")) {
            window.location.href = "dashboard.html"
        }
    } else {
        if (!window.location.href.includes("admin.html")) {
            window.location.href = "admin.html"

        }
    }
}
loginStatus();

// ================================================//
// logout function                                //
// ==============================================//

function logout() {
    const savedAdmin = getAdminInfo();
    savedAdmin.isLoggedIn = false;
    saveAdminIntoStorage(savedAdmin);
    loginStatus();
}

// ===============================================//
// function show hide pass word                  //
// =============================================//


function showHidePass(type) {

    const input = document.getElementById("password");
    const show = document.getElementById("show");
    const hide = document.getElementById("hide");

    input.type = type;

    if (type === "text") {
        show.style.display = "none";
        hide.style.display = "flex";
    } else {
        show.style.display = "flex";
        hide.style.display = "none";
    }
}


// ===============================================//
// Dynamically add menu buttons                  //
// =============================================//



const arrayOfMenu = [
    {
        label: "dashboard"
    },
    {
        label: "products"
    },
    {
        label: "orders"
    }
];

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
    // if (menu !== null) {
    document.querySelector("." + lastPart).classList.add("active");
}

activeMenu();


// ===============================================//
// add logout button                             //
// =============================================//

const logoutBtnAdd = document.querySelector(".end-items");

logoutBtnAdd.innerHTML = `<div class="cart flex align-center" onclick="logout()">
                            <i class="ti ti-logout"></i>
                            <span>logout</span>
                        </div>`;



const homeBtnAdd = document.querySelector(".first-items");

homeBtnAdd.innerHTML = `<a href="index.html" class="logo flex align-center">
                        <i class="ti ti-brand-framer"></i>
                        <span>RESONA</span>
                    </a>`;