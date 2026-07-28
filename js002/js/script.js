function formSubmission() {
    event.preventDefault();
    const form = event.target;
    console.log(form);

    const formData = new FormData(form);

    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email")
    const username = formData.get("username")
    const password = formData.get("password")
    const confirmPass = formData.get("reEnterPassword")

    if (firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "" && username.trim() !== "" && password.trim() !== "" && confirmPass.trim() !== "") {
        if (password.trim() === confirmPass.trim()) {
            const user = {
                firstName,
                lastName,
                email,
                username,
                password,
                isLoggedIn: false
            }
            error1.textContent = "";
            saveUserIntoStorage(user)
            checkUserLoginStatus();
        }
        else {
            error1.textContent = "! password dose not match"
        }
    } else {
        error1.textContent = "! please fill the form properly"
    }
}

function clearForm() {
    document.forms["registerForm"].reset();
}

function getElementById(id) {
    return document.getElementById(id);
}

function hideShow(element, css) {
    element.style.display = css;
}

const loggedInContent = getElementById("dashboard");
const registrationFormWrapper = getElementById("registration-form");
const loginFormWrapper = getElementById("login");
const error1 = getElementById("error1");
const error2 = getElementById("error2");
const title = getElementById("title");


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
    if (user === null) {
        hideShow(registrationFormWrapper, "block")
        hideShow(title, "block")
        hideShow(loggedInContent, "none")
        hideShow(loginFormWrapper, "none")
    } else if (user && user?.isLoggedIn) {
        hideShow(registrationFormWrapper, "none")
        hideShow(title, "none")
        hideShow(loggedInContent, "block")
        hideShow(loginFormWrapper, "none")
    } else {
        hideShow(registrationFormWrapper, "none")
        hideShow(title, "none")
        hideShow(loggedInContent, "none")
        hideShow(loginFormWrapper, "block")
    }
}

function doLogin() {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const username = formData.get("username")
    const password = formData.get("password")
    const userFromStorage = getUserFromLocalStorage();

    if (username.trim() !== "" && password.trim() !== "") {
        if (password.trim() !== userFromStorage.password || username.trim() !== userFromStorage.username) {
            error2.textContent = "! Username or password dos't match "
        } else {
            userFromStorage.isLoggedIn = true;
            saveUserIntoStorage(userFromStorage);
            checkUserLoginStatus();
        }
    } else {
        error2.textContent = "! please enter username and password"
    }
}

checkUserLoginStatus()


