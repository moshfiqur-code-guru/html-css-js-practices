// #############################################//
// Declaration                                 //
// ###########################################//

const loginErrorMsg = document.getElementById("loginErrorMsg");
const loginSection = document.getElementById("login-section");
const loggedInContent = document.getElementById("logged-in-content");

//==========================================================//
// creating user                                           //
//========================================================//

const defaultAdmin = {
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

    if (savedAdmin) {

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
    } else {
        saveAdminIntoStorage(defaultAdmin)
        doLogin();
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


// ===============================================//
// add logout  and home button                   //
// =============================================//

const logoutBtnAdd = document.querySelector(".end-items");

if (logoutBtnAdd !== null) {
    logoutBtnAdd.innerHTML = `<div class="cart flex align-center" onclick="logout()">
                            <i class="ti ti-logout"></i>
                            <span>logout</span>
                        </div>`;
}
