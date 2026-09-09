
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

// =====================================================================
let products = JSON.parse(localStorage.getItem('products')) || [];
let temp = JSON.parse(localStorage.getItem('products')) || [];

const arrayOfColumn = [
    { label: "SL", header: "", shortStatus: false },
    { label: "Image", header: "image", shortStatus: false },
    { label: "Product Name", header: "productName", shortStatus: true },
    { label: "Product Model", header: "productModel", shortStatus: true },
    { label: "Type", header: "type", shortStatus: true },
    { label: "Product ID", header: "id", shortStatus: true },
    { label: "Price", header: "price", shortStatus: true },
    { label: "Quantity", header: "quantity", shortStatus: true },
    { label: "Action", header: "", shortStatus: false },

];

const config = {
    currentPage: 1,
    itemsPerPage: 10,
    maxVisiblePages: 5,
    container: document.getElementById("pagination")
}


const pagination = getPagination(config);

function paginate() {
    productModerator["startIndex"] = pagination.getStartIndex();
    productModerator["endIndex"] = pagination.getEndIndex();
}

//=> const for search short >
const productModerator = {
    search: "",
    dir: "",
    col: "",
    startIndex: null,
    endIndex: null
}



function shortIconDecider(arrayOfColumn) {
    const { shortStatus } = arrayOfColumn;
    const { col, dir } = productModerator;

    const active = arrayOfColumn.header === col;

    if (!shortStatus) return "";

    const icons = (!active || !dir)
        ? `<i class="ti ti-caret-up"></i>
           <i class="ti ti-caret-down"></i>`

        : dir === "ASC"
            ? `<i class="ti ti-caret-up"></i>`
            : `<i class="ti ti-caret-down"></i>`;

    let nextDir = "";
    if (col !== "" && active) {
        if (dir === "ASC") {
            nextDir = "DESC"
        } else {
            nextDir = "ASC"
        }
    } else {
        nextDir = "ASC"
    }

    return {
        nextDir,
        html: `<div class="flex column center align-center short-icon">${icons}</div>`
    }
}


function displayColumn() {
    const tHade = document.getElementById("table-head");
    tHade.innerHTML = "";
    const tr = document.createElement("tr");

    arrayOfColumn.forEach(arrayOfColumn => {

        const { nextDir, html } = shortIconDecider(arrayOfColumn);
        let th = document.createElement("th");

        th.innerHTML += ` <div class="flex center align-center">
                          <span>${arrayOfColumn.label}</span>
                          ${html ?? ""}
                          </div >`;

        tr.appendChild(th);
        th.addEventListener("click",
            () => productShorting(arrayOfColumn.header, shortIconDecider(arrayOfColumn).nextDir))
    });
    tHade.appendChild(tr);
}

function productShorting(arrayOfColumn, nextDir) {
    productModerator["dir"] = nextDir;
    productModerator["col"] = arrayOfColumn;
    displayColumn();
    displayProducts();
}




function addDemoProducts() {
    for (let i = 0; i < 100; i++) {
        products.push({
            id: generateProductID() + i,
            productName: "Product" + i,
            productModel: "CH" + Math.round(Math.random() * 10 + 651) + i + "FD",
            type: Math.floor(Math.random() * 5 + 1),
            price: "" +
                Math.floor(Math.random() * 4 + 1) +
                Math.floor(Math.random() * 10) +
                Math.floor(Math.random() * 10),
            quantity: "" +
                Math.floor(Math.random() * 10) +
                Math.floor(Math.random() * 10) +
                Math.floor(Math.random() * 10),
            image: "h4.png"
        })
    }
    localStorage.setItem("products", JSON.stringify(products))
}

// addDemoProducts()




//################################################################//
// displaying products in table from local storage               //
//##############################################################//

//=> function for displaying product on table >
function displayProducts() {

    displayColumn();

    const { col, dir, search } = productModerator;

    const formattedProducts = products.filter
        (product => (product.productName + product.productModel)
            .replace(/\s/g, "").toLowerCase().includes(search))
        .sort((a, b) => {
            const valueA = a[col];
            const valueB = b[col];

            if (col === "")
                return 0;

            if (col === "type")
                return dir === "ASC" ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);

            if (typeof valueA === "number")
                return dir === "ASC" ? valueA - valueB : valueB - valueA;

            return dir === "ASC" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        })
    products = formattedProducts;
    tableBody.innerHTML = "";

    if (products.length > 0) {
        formattedProducts.forEach((products, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td> ${index + 1}</td >
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
        < td colspan = "9" id = "empty-message" ><i class="ti ti-alert-triangle"></i><p>Products table is empty</p></ > `;
        tableBody.appendChild(row);
    }
}


paginate();
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


// ============= search product function using debounce ========= //

function filterProduct(searchValue) {
    productModerator.search = [searchValue];
    if (searchValue === "") products = temp;
    displayProducts();
}

const searchDebounce = debounce();


function filterProductWithDebounce(input) {
    let keWords = input.value.replace(/\s/g, "").toLowerCase();
    searchDebounce(keWords, filterProduct, 200)
}
















