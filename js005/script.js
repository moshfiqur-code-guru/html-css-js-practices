
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
    image: "dp.jpg",
    email: "sadik@gmail.com",
    password: "123456",
    isLoggedIn: false
}

function saveUserInLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user))
}

//saveUserInLocalStorage(user);


function getUserFromStorage() {
    return JSON.parse(localStorage.getItem("user"));
}

function userLoginStatus() {
    const user = getUserFromStorage();
    if (user && user.isLoggedIn) {
        if (window.location.href.includes("index.html")) {
            window.location.href = "dashboard.html"
        }
        let author = document.getElementById("author-img");
        let img = document.createElement("img");
        img.src = user.image;
        img.alt = "image";

        author.appendChild(img);

    } else {
        if (!window.location.href.includes("index.html")) {
            window.location.href = "index.html"

        }
    }
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






function showPassword(btn) {
    const passwordBox = btn.closest(".password");
    const input = passwordBox.querySelector("input");

    input.type = "text";

    passwordBox.querySelector(".show").style.display = "none";
    passwordBox.querySelector(".hide").style.display = "block";
}

// function hidePassword(btn) {
//     const passwordBox = btn.closest(".password");
//     const input = passwordBox.querySelector("input");

//     input.type = "password";

//     passwordBox.querySelector(".show").style.display = "block";
//     passwordBox.querySelector(".hide").style.display = "none";
// }

function toggleVisible(type) {
    const show = document.querySelector(".show");
    const hide = document.querySelector(".hide");
    document.getElementById("UserPass").setAttribute("type", type);

    if (type === "text") {
        hide.style.display = "block"
        show.style.display = "none"
    } else {
        hide.style.display = "none"
        show.style.display = "block"
    }
}
// UserLoginStatus();

// function addMenu() {
//     document.querySelector(".menu").innerHTML =
// // `
// //                 <ul>

//                     <li class="dashboard"> <a href="dashboard.html">
//                             <i data-feather="home"></i>
//                             <span>Home</span>
//                         </a>
//                     </li>

//                     <li class="user"><a href="user.html">
//                             <i data-feather="users"></i>
//                             <span>Users</span>
//                         </a>
//                     </li>

//                     <li class="order"><a href="order.html">
//                             <i data-feather="shopping-cart"></i>
//                             <span>Orders</span>
//                         </a>
//                     </li>

//                     <li class="analytics"><a href="analytics.html">
//                             <i data-feather="bar-chart-2"></i>
//                             <span>Analytics</span>
//                         </a>
//                     </li>

//                     <li class="calculator"><a href="calculator.html">
//                             <i data-feather="divide-square"></i>
//                             <span>Calculator</span>
//                         </a>
//                     </li>

//                     <li class="settings"><a href="settings.html">
//                             <i data-feather="settings"></i>
//                             <span>Settings</span>
//                         </a>
//                     </li>
//                 </ul>
// `
// addMenu();



// const arrayOfMenu = ["dashboard", "user", "order", "analytics", "calculator", "settings"];
// const ul = document.createElement("ul");

// for (let i = 0; i < arrayOfMenu.length; i++) {
//     ul.innerHTML += `<li class="${arrayOfMenu[i]}"><a href="${arrayOfMenu[i]}.html">${arrayOfMenu[i]}</a></li>`
// }
// // document.querySelector(".menu").outerHTML = ul.outerHTML;
// document.querySelector(".menu").appendChild(ul);



const arrayOfMenu = [
    { label: "dashboard", icon: "home" },
    { label: "classes", icon: "table" },
    { label: "teachers", icon: "pen-tool" },
    { label: "students", icon: "users" },
    { label: "guardians", icon: "umbrella" },
    { label: "results", icon: "bar-chart-2" },
    { label: "calculator", icon: "divide-square" },
    { label: "settings", icon: "settings" },
];
const ul = document.createElement("ul");

const menu = document.querySelector(".menu");

for (let i = 0; i < arrayOfMenu.length; i++) {
    ul.innerHTML += `<li class="${arrayOfMenu[i].label}"><i data-feather="${arrayOfMenu[i].icon}"></i>
        <a href = "${arrayOfMenu[i].label}.html" > ${arrayOfMenu[i].label}</a></li > `
}
// document.querySelector(".menu").outerHTML = ul.outerHTML;
if (menu !== null) {
    menu.appendChild(ul);
}



function activeMenu() {
    const currentLocation = location.href;
    let lastPart = currentLocation.split("/").pop().split(".")[0];
    console.log(lastPart);
    // if (menu !== null) {
    document.querySelector(".menu " + "." + lastPart).classList.add("active");

}








// -----------------------------------------------------------------


<script>
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    borderWidth: 1
      }]
    },
    options: {
        scales: {
        y: {
        beginAtZero: true
        }
      }
    }
  });
</script>




feather.replace();
activeMenu();
userLoginStatus();
