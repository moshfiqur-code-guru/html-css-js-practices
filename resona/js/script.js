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


//
// $('.owl-carousel').owlCarousel({
//     stagePadding: 50,
//     loop: true,
//     margin: 20,
//     nav: false,
//     responsive: {
//         0: {
//             items: 1
//         },
//         600: {
//             items: 2
//         },
//         1000: {
//             items: 3
//         }
//     }
// })


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


function displayProducts() {
    tableBody.innerHTML = "";

    if (products.length > 0) {
        products.forEach((products, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="assets/img/${products.image}" alt=""></td>
                <td>${products.productName}</td>
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
    const confirmation = confirm("Are you want to delete this student??");
    if (!confirmation) {
        return;
    } else {
        products.splice(index, 1);
        saveProduct();
        displayProducts();
    }
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




























