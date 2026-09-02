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

const errorMsg = document.getElementById("errorMsg");
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
        errorMsg.textContent = "Please put username and password.";

    } else {
        if (admin.userName.trim() !== savedAdmin.userName || admin.password.trim() !== savedAdmin.password) {
            errorMsg.textContent = "Invalid login credentials."

        } else {
            errorMsg.textContent = "";
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
        loggedInContent.classList.remove("none");
        loggedInContent.classList.add("block");
        loginSection.classList.remove("block");
        loginSection.classList.add("none");

    } else {
        loggedInContent.classList.remove("block");
        loggedInContent.classList.add("none");
        loginSection.classList.remove("none");
        loginSection.classList.add("block");
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