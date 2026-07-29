

function getElementById(id) {
    return document.getElementById(id);
}

const createAccountContent = getElementById("createAccountContent");
const loginContent = getElementById("loginContent");
const dashbord = getElementById("dashbord");
const SignupError = getElementById("SignupError");
const LoginError = getElementById("LoginError");


function getUserFromLocalStorage() {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
}

function saveUserIntoStorage(user) {
    const userJSON = JSON.stringify(user);
    localStorage.setItem("user", userJSON);
}

function checkUserLoginStatus() {
    const user = getUserFromLocalStorage();
    console.log(user);
    if (user === null) {
        createAccountContent.style.display = "block";
        loginContent.style.display = "none";
        dashbord.style.display = "none";
    } else if (user && user?.isLoggedIn) {
        createAccountContent.style.display = "none";
        loginContent.style.display = "none";
        dashbord.style.display = "block";
        getElementById("welcome").textContent = user.firstName + " " + user.lastName;
        getElementById("date").textContent = new Date().getDate() + " - " + new Date().getMonth() + " - " + new Date().getFullYear();
    } else {
        createAccountContent.style.display = "none";
        loginContent.style.display = "block";
        dashbord.style.display = "none";
    }

}

function formSubmission() {
    event.preventDefault();
    const form = event.target;
    console.log(form);
    const formData = new FormData(form);
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email")
    const password = formData.get("password")

    if (firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
        const user = {
            firstName,
            lastName,
            email,
            password,
            isLoggedIn: false
        }
        SignupError.textContent = ""
        saveUserIntoStorage(user)
        checkUserLoginStatus();
    } else {
        SignupError.textContent = "Input fields should not be empty"
    }
}
function doLogin() {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const userFromStorage = getUserFromLocalStorage();

    if (email.trim() !== "" && password.trim() !== "") {
        if (password.trim() !== userFromStorage.password || email.trim() !== userFromStorage.email) {
            LoginError.textContent = "Email or Password dose note match"
        } else {
            userFromStorage.isLoggedIn = true;
            LoginError.textContent = ""
            saveUserIntoStorage(userFromStorage)
            checkUserLoginStatus();

        }
    } else {
        LoginError.textContent = "Input fields should not be empty"
    }
}

function doLogout() {
    const userFromStorage = getUserFromLocalStorage();
    userFromStorage.isLoggedIn = false;
    saveUserIntoStorage(userFromStorage);
    checkUserLoginStatus();
}

checkUserLoginStatus();
{
    function showPassword(btn) {
        const passwordBox = btn.closest(".password");
        const input = passwordBox.querySelector("input");

        input.type = "text";

        passwordBox.querySelector(".show").style.display = "none";
        passwordBox.querySelector(".hide").style.display = "block";
    }

    function hidePassword(btn) {
        const passwordBox = btn.closest(".password");
        const input = passwordBox.querySelector("input");

        input.type = "password";

        passwordBox.querySelector(".show").style.display = "block";
        passwordBox.querySelector(".hide").style.display = "none";
    }
} 