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

    const products = JSON.parse(localStorage.getItem("products")) || [];

    function displayProducts() {
        const Cart = cart();
        const carousel = document.getElementById("carousel-items")
        carousel.innerHTML = "";

        products.map(product => {
            const template = document.createElement("template")
            template.innerHTML = `<div class="item">
                                <div class="product-thumb d-flex">
                                    <div class="thumb-img">
                                        <a href="details.html"><img src="${product.image}" alt=""></a>
                                    </div>
                                    <div class="view-action d-flex flex-column justify-content-center">
                                        <div class="d-flex align-items-center justify-content-center flex-grow-1">
                                            <div class="buttons">
                                                <div class="button bg-primary cartBtn">
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

            const item = template.content.firstElementChild;
            item.querySelector(".cartBtn").addEventListener("click", () => Cart.addToCart(2, product));
            carousel.appendChild(item);
        })
        Cart.displayCart();
    }
    return { saveProductsIntoStorage, displayProducts }
}

function cart() {

    let cartItems = JSON.parse(localStorage.getItem("carts")) || [];
    let totalItem = 0;
    let totalPrice = 0;

    function saveToCarts() {
        localStorage.setItem("carts", JSON.stringify(cartItems))
    }

    function calculateCart() {
        const totalItem = cartItems.reduce((totalItem, cartItems) => totalItem + cartItems.qty, 0) ?? 0;
        const totalPrice = cartItems.reduce((price, cartItems) => price + (cartItems.price * cartItems.qty), 0) ?? 0;
        return { totalItem, totalPrice }
    }

    function addToCart(qty, product) {
        if (!Number(qty) || qty <= 0) return;
        const alreadyAddedProduct = cartItems.find(item => item.pID === product.pID);
        if (!alreadyAddedProduct) {
            cartItems.push({ ...product, qty: qty });
        } else {
            const updatedCart = cartItems.map(item => {
                if (item.pID === product.pID) {
                    return { ...item, qty: item.qty + qty }
                }
                return item;
            });
            cartItems = updatedCart;
        }
        displayCart();
    }

    function displayCart() {
        const { totalItem, totalPrice } = calculateCart();
        let cartQty = document.getElementById("cartQty");
        let cartQty1 = document.getElementById("cartQty1");
        let subTotal = document.getElementById("subTotal");
        let cart = document.querySelector(".cartItems");

        cart.innerHTML = "";
        cartQty.innerText = totalItem.toString();
        subTotal.innerText = '$' + totalPrice.toFixed(2);
        cartQty1.innerText = totalItem + ((totalItem === 0 || totalItem > 1) ? " items" : "item")

        if (cartItems.length === 0) {
            cart.innerHTML =
                ` <div class="text-center py-4">
                <i class="bi bi-cart-x fs-1 text-secondary"></i>
                <p class="mb-0 mt-2 text-muted">
                    No items added to the cart.
                </p>
            </div>`;
            return;
        }
        else {

            cartItems.map(product => {
                const template = document.createElement("template")
                template.innerHTML = `<div
                                            class="m-2 px-2 border-bottom d-flex align-items-center justify-content-between">
                                            <div><img class="img-fluid rounded-2" src="${product.image}" alt="">
                                            </div>
                                            <div>
                                                <span>${product.name}</span>
                                                <span class="d-block">$ ${product.price.toFixed(2)}</span>
                                            </div>
                                            <div class="qty-slider d-flex flex-column align-items-center">
                                                <i class="bi bi-chevron-up increment"></i>
                                                <span>${product.qty}</span>
                                                <i class="bi bi-chevron-down decrement"></i>
                                            </div>
                                            <i class="bi bi-x"></i>
                                            <span>$ ${product.price.toFixed(2)}</span>
                                            <span>=</span>
                                            <span class="itemTotal">$ ${(product.price) * (product.qty).toFixed(2)}</span>
                                            <i class="bi bi-x fs-4 text-danger"></i>
                                        </div>`

                const item = template.content.firstElementChild;
                item.querySelector(".increment").addEventListener("click", () => {
                    addToCart(1, product);
                })
                cart.appendChild(item)
            })
            cartFooter.style.display = "block"
        }
    }

    return { totalPrice, totalItem, cartItems, addToCart, displayCart }

}

const cartFooter = document.getElementById("cartFooter");
cartFooter.style.display = "none"



const ecom = ecomManagement();
// ecom.saveProductsIntoStorage();
ecom.displayProducts();
