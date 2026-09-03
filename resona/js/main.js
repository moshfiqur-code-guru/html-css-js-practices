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


// #############################################//
// Declaration                                 //
// ###########################################//



const loginErrorMsg = document.getElementById("loginErrorMsg");
const loginSection = document.getElementById("login-section");
const loggedInContent = document.getElementById("logged-in-content");

const productForm = document.getElementById("productForm");
const productImagePicker = document.getElementById("product-image");
const previewImage = document.getElementById("preview");
const modalTitle = document.getElementById("modal-1-title");
const modalActionBtn = document.getElementById("modalSaveBtn");
const errorMsg = document.querySelectorAll(".input-error");
const tableBody = document.getElementById("tableBody");

let editableIndex = null;
let currentID = null;
let message = "";

let modalTitleText = "Add New Product";
let modalActionBtnText = "Add new";

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


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//                                  products page                                   //
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 


// ###################################################################//
// micro modal                                                       //
// #################################################################//
document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init();
});


//##############################################################//
// function for changing modal title and button                //
//############################################################//

function setModalTitleAndButton() {
    modalTitle.textContent = modalTitleText;
    modalActionBtn.textContent = modalActionBtnText;
}

function setDefaultTitle() {
    editableIndex = null;

    clearErrors()
    productForm.reset();
    productImagePicker.value = "";
    preview.src = "assets/img/add-image.png";

    modalTitleText = "Add New Product";
    modalActionBtnText = "Add new";

    setModalTitleAndButton();

    MicroModal.show("modal-1");
}

setModalTitleAndButton();


// ##################################################################//
// product id generator                                            //
//################################################################//

function generateProductID() {
    const time = new Date().getMilliseconds();
    const product = JSON.parse(localStorage.getItem('products')) || [];
    return 2631 + product.length + time;
}


//###################################################################################//
// script for getting a product info  from HTML form and saving it to local storage //
// ################################################################################//

modalActionBtn.addEventListener("click", (event) => {
    event.preventDefault();
    clearErrors();

    const formData = new FormData(productForm);
    const product = Object.fromEntries(formData);
    const validationErrors = validateProduct(product);

    product.image = productImagePicker.files[0]?.name || "";
    product["id"] = currentID ?? generateProductID();


    if (Object.keys(validationErrors).length === 0) {
        if (editableIndex !== null) {
            products[editableIndex] = product;
            currentID = null;
            editableIndex = null;
            message = "Updated";
            productForm.reset();
            MicroModal.close('modal-1');
        } else {
            message = "Saved";
            products.push(product);
            MicroModal.close('modal-1');
            productForm.reset();
        }
        clearErrors();
        saveProduct();
        displayProducts();
        productForm.reset();
        Swal.fire({
            title: "Successfully Saved",
            // text: "You clicked the button!",
            icon: "success",

            customClass: {
                popup: "resona-alert",
                title: "resona-alert-title",
                htmlContainer: "resona-alert-text",
                confirmButton: "resona-confirm-btn"
            },

            buttonsStyling: false
        });
    } else {
        Object.keys(validationErrors).forEach(key => {
            const input = productForm.elements[key];
            const errorElement = input.nextElementSibling;
            errorElement.textContent = "!" + " " + validationErrors[key];
        })
    }
});


//############################################################################//
// validation function                                                       //
//##########################################################################//

function validateProduct(product) {
    const keys = Object.keys(product)
    let error = {};
    keys.forEach((keys) => {
        if (product[keys].toString().trim() === "") {
            error[keys] = `your ${keys} filed is empty`
        }
    })
    return error;
}

//##################################//
// clearing error                 //
// ##############################//

function clearErrors() {
    errorMsg.forEach((error) => {
        error.textContent = "";
    });
}


// ###############################################################################//
// save product info into local storage                                           //
//##############################################################################//

// const products = [{
//     id: generateProductID(),
//     productName: "Product 1",
//     type: "headphone",
//     price: "$123",
//     quantity: "342",
//     image: ""
// }]

function saveProduct() {
    localStorage.setItem('products', JSON.stringify(products));
}

// saveProduct();

//################################################################//
// displaying products in table from local storage               //
//##############################################################//

const products = JSON.parse(localStorage.getItem('products')) || [];


// ============= search product function ========= //

function filterProduct(input) {
    const keWords = input.value.replace(/\s/g, "");
    productModerator.search = [keWords];
    console.log(keWords);
    displayProducts();
}

//=> const for search short >
const productModerator = {
    search: "",
    dir: "",
    column: ""
}

//=> function for displaying product on table >
function displayProducts() {

    const formattedProducts = products.filter(product => (product.productName + product.productModel)
        .replace(/\s/g, "").toLowerCase().includes(productModerator.search));

    tableBody.innerHTML = "";

    if (products.length > 0) {
        formattedProducts.forEach((products, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="assets/img/${products.image}" alt=""></td>
                <td>${products.productName}</td>
                <td>${products.productModel}</td>
                <td>${typeLabel(Number(products.type))}</td>
                <td>${products.id}</td>
                <td>$${products.price}</td>
                <td>${products.quantity}</td>
            <td>
                <button class="edit" onclick="editProduct(${index}, ${products.id})"><i class="ti ti-edit"></i></button>
                <button class="delete" onclick="deleteProduct(${index})"><i class="ti ti-trash-x"></i></button>
            </td>`;
            tableBody.appendChild(row);
        })
    } else {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td colspan="8" id="empty-message"><i class="ti ti-alert-triangle"></i><p>Products table is empty</p></td>`;
        tableBody.appendChild(row);
    }
}

displayProducts();


//########################################################################//
// preview image                                                         //
//######################################################################//

productImagePicker.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        const url = URL.createObjectURL(file);
        previewImage.src = url;
    }
});

//####################################################################//
//delete product from list                                           //
//##################################################################//


function deleteProduct(index) {

    Swal.fire({
        title: "Do you want to delete this?",
        // text: "You won't be able to revert this!",
        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel",

        customClass: {
            popup: "resona-alert",
            title: "resona-alert-title",
            htmlContainer: "resona-alert-text",
            confirmButton: "resona-confirm-btn",
            cancelButton: "resona-cancel-btn"
        },

        buttonsStyling: false

    }).then((result) => {

        if (result.isConfirmed) {

            products.splice(index, 1);
            saveProduct();
            displayProducts();

            Swal.fire({
                title: "Successfully Deleted",
                // text: "Your file has been deleted.",
                icon: "success",

                customClass: {
                    popup: "resona-alert",
                    title: "resona-alert-title",
                    htmlContainer: "resona-alert-text",
                    confirmButton: "resona-confirm-btn"
                },
                buttonsStyling: false
            });
        }
    });
}

//##################################################################//
// editing product info from list                                  //
//################################################################//

function editProduct(index, id) {
    MicroModal.show('modal-1');

    clearErrors()
    modalTitleText = "Edit Product Info";
    modalActionBtnText = "Update";
    editableIndex = index;
    currentID = id;

    setModalTitleAndButton();
    const product = products[index];
    const keys = Object.keys(product);

    keys.forEach((key, index) => {
        if (key !== "id" && key !== "image") {
            productForm.elements[key].value = product[key];
        } else if (product.image === "") {
            previewImage.src = "assets/img/add-image.png";
        } else {
            let url = "assets/img/" + product.image;
            previewImage.src = url;
            fetch(url).then(async (result) => {
                const blob = await result.blob();
                const file = new File([blob], product.image, { type: blob.type });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                productImagePicker.files = dataTransfer.files;
            })
        }
    })
    saveProduct();
}


//################################################################//
// function for displaying actual type name                      //
//##############################################################//

function typeLabel(typeValue) {
    const types = {
        1: "Headphone",
        2: "T.W.S.",
        3: "A.N.C.",
        4: "Gaming",
        5: "Wired",
    }
    return types[typeValue];
}





















