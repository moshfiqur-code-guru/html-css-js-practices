// #############################################
// Declaration 
// #############################################


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


// ###############################################
// owl carousel
// ###############################################

$('.owl-carousel').owlCarousel({
    stagePadding: 50,
    loop: true,
    margin: 20,
    nav: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
})

// ############################################################
// navigation animation when scrolling
// ############################################################

const navigation = document.querySelector(".navigation");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        navigation.classList.add("scrolled");
    } else {
        navigation.classList.remove("scrolled");
    }
});

// ###################################################################
// micro modal
// ##################################################################
document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init();
});

// ##################################################################
// product id generator
//##################################################################

function generateProductID() {
    const time = new Date().getMilliseconds();
    const product = JSON.parse(localStorage.getItem('products'));
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

    product["image"] = product.image.name;
    product["id"] = currentID ?? generateProductID();


    if (object.keys(validationErrors).length === 0) {
        if (editableIndex !== null) {
            products[editableIndex] = product;
            currentID = null;
            editableIndex = null;
            massage = "Updated";
            productForm.reset();
            MicroModal.close('modal-1');
        } else {
            massage = "Saved";
            products.push(product);
            MicroModal.close('modal-1');
            productForm.reset();
        }
        clearErrors();
        saveProduct();
        displayProducts();
        studentForm.reset();
    } else {
        object.keys(validationErrors).forEach(key => {
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

//######################## clearing error ##############################//

function clearErrors() {
    errorElements.forEach((error) => {
        error.textContent = "";
    });
}


// ###############################################################################//
// save product info into local storge                                           //
//##############################################################################//

// const products = [{
//     id: generateProductID(),
//     productName: "Product 1",
//     type: "headphone",
//     price: "$123",
//     quantity: "342",
//     image: ""
// }]


function saveProduct(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// saveProduct();

//################################################################//
// displaying products in table from local storage               //
//##############################################################//

const products = JSON.parse(localStorage.getItem('products')) ?? [];
const row = document.createElement("tr");

function displayProducts() {
    tableBody.innerHTML = "";

    if (products.length > 0) {
        products.forEach((products, index) => {

            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="assets/img/${products.image}" alt=""></td>
                <td>${products.productName}</td>
                <td>${products.type}</td>
                <td>${products.id}</td>
                <td>${products.price}</td>
                <td>${products.quantity}</td>
            <td>
                <button className="edit"><i className="ti ti-edit"></i></button>
                <button className="delete"><i className="ti ti-trash-x"></i></button>
            </td>`;
            tableBody.appendChild(row);
        })
    } else {
        row.innerHTML = `
        <td colspan="8" id="empty-massage"><i class="ti ti-alert-hexagon"></i><p>Products table is empty</p></td>`;
        tableBody.appendChild(row);
    }
}

displayProducts();




















