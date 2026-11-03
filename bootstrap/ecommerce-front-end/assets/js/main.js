$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        items: 4,
        margin: 10,
        scroll: true
    });
});



const Products = [
    {
        pID: 1,
        image: "assets/img/h7.jpg",
        name: "Headphone pro",
        SKU: "8468-1836-91643",
        stock: true,
        price: 231,
        color: "black"
    },
    {
        pID: 2,
        image: "assets/img/t1 (1).jpg",
        name: "Headphone pro",
        SKU: "8468-1836-91643",
        stock: true,
        price: 231,
        color: "black"
    },
    {
        pID: 3,
        image: "assets/img/t1 (2).jpg",
        name: "Headphone pro",
        SKU: "8468-1836-91643",
        stock: true,
        price: 231,
        color: "black"
    },
    {
        pID: 4,
        image: "assets/img/t1 (3).jpg",
        name: "Headphone pro",
        SKU: "8468-1836-91643",
        stock: true,
        price: 231,
        color: "black"
    },
    {
        pID: 5,
        image: "assets/img/t1 (4).jpg",
        name: "Headphone pro",
        SKU: "8468-1836-91643",
        stock: true,
        price: 231,
        color: "black"
    },
    {
        pID: 6,
        image: "assets/img/t1 (5).jpg",
        name: "Headphone pro",
        SKU: "8468-1836-91643",
        stock: true,
        price: 231,
        color: "black"
    }
];

function ecomManagement() {

    function saveProductsIntoStorage() {
        const productsJSON = JSON.stringify(Products);
        localStorage.setItem("products", productsJSON);
    }

    function getProduct() {
        const productsJSON = localStorage.getItem("products");
        return JSON.parse(productsJSON);
    }

    function displayProducts() {
        const products = getProduct();
        const carousel = document.getElementById("carousel-items")
        carousel.innerHTML = "";

        products.map(product => {
            const item = `<div class="item">
                                <div class="product-thumb d-flex">
                                    <div class="thumb-img">
                                        <a href="details.html"><img src="${product.image}" alt=""></a>
                                    </div>
                                    <div class="view-action d-flex flex-column justify-content-center">
                                        <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                            <div class="buttons">
                                                <div class="button bg-primary" onclick="addToCart(${product.pID})">
                                                    <i class="bi bi-bag text-white"></i>
                                                </div>
                                                <div class="button bg-primary">
                                                    <i class="bi bi-bar-chart text-white"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="btn rounded-0 view text-center text-white bg-primary p-1"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal">Quick
                                            View</button>
                                    </div>
                                </div>
                                <div class="product-content d-flex flex-column px-3 py-2">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <span class="name fs-6">${product.name}</span>
                                        <i class="bi bi-heart"></i>
                                    </div>
                                    <div class="p-0">
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-half"></i>
                                    </div>
                                    <span class="price p-0 m-0">$${product.price.toFixed(2)}</span>
                                </div>
                            </div>`;

            carousel.innerHTML += item;

        })

    }

    return { saveProductsIntoStorage, getProduct, displayProducts }

}


const ecom = ecomManagement();
// ecom.saveProductsIntoStorage();
ecom.displayProducts();


function addToCart(pID) {
    console.log(pID);
}

