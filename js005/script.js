
// Source - https://stackoverflow.com/a/2117523
// Posted by broofa, modified by community. See post 'Timeline' for change history
// Retrieved 2026-08-02, License - CC BY-SA 4.0


const error = document.getElementById("LoginError");

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

const user = {
    id: uuidv4(),
    username: "sadik",
    image: "avater.jpg",
    email: "sadik@gmail.com",
    password: "123456",
    isLoggedIn: false
}

function saveUserInLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user))
}

// saveUserInLocalStorage(user);


function getUserFromStorage() {
    return JSON.parse(localStorage.getItem("user"));
}

function userLoginStatus() {
    const user = getUserFromStorage();
    if (user && user.isLoggedIn) {
        if (window.location.href.includes("index.html")) {
            window.location.href = "dashboard.html"
        }
    } else {
        if (!window.location.href.includes("index.html")) {
            window.location.href = "index.html"
        }
    }
    userLoginStatus();

}

function doLogin() {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData);
    const savedUserInfo = getUserFromStorage();

    if (user.username.trim() !== "" && user.password.trim() !== "") {
        if (savedUserInfo.username !== user.username.trim() || savedUserInfo.password !== user.password.trim()) {
            error.textContent = "username or password does not match";
        } else {
            error.textContent = "";
            savedUserInfo.isLoggedIn = true;
            saveUserInLocalStorage(savedUserInfo);
            userLoginStatus();
        }
    } else {
        error.textContent = "enter username and password first";
    }
}

function logout() {
    const savedUserInfo = getUserFromStorage();
    savedUserInfo.isLoggedIn = false;
    saveUserInLocalStorage(savedUserInfo);
    userLoginStatus();
}

checkUserLoginStatus();


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
