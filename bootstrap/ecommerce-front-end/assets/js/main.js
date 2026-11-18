$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        items: 4,
        margin: 16,
        responsive: {
            0: { items: 1 },
            420: { items: 2 },
            768: { items: 3 },
            1200: { items: 4 }
        }
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
        const carousel = document.getElementById("carousel-items")
        if (!carousel) {
            displayCart();
            return;
        }
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
            item.querySelector(".cartBtn").addEventListener("click", () => {
                Cart.addToCart(1, product, "increment");
                displayCart()
            })
            carousel.appendChild(item);
        })
        displayCart();
    }
    return { saveProductsIntoStorage, displayProducts }
}

function cart() {
    let cartItems = JSON.parse(localStorage.getItem("carts")) || [];
    let totalPrice = 0;

    function saveToCarts() {
        localStorage.setItem("carts", JSON.stringify(cartItems))
    }

    function calculateCart() {
        const totalItem = cartItems.reduce((totalItem, cartItems) => totalItem + cartItems.qty, 0) ?? 0;
        const totalPrice = cartItems.reduce((price, cartItems) => price + (cartItems.price * cartItems.qty), 0) ?? 0;
        return { totalItem, totalPrice }
    }

    function addToCart(qty, product, type) {
        if (!Number(qty) || qty <= 0) return;
        const alreadyAddedProduct = cartItems.find(item => item.pID === product.pID);
        let qtyRound = Math.floor(Number(qty))
        if (alreadyAddedProduct) {
            let updatedQty = type === "increment" ? qtyRound : -qtyRound;
            alreadyAddedProduct["qty"] = Math.max(1, (alreadyAddedProduct.qty + updatedQty));
        } else {
            cartItems.push({ ...product, qty: qtyRound });
        }
        saveToCarts()
    }

    function deleteCart(pID) {
        const cart = cartItems.slice();
        const updatedCart = cart.filter(item => item.pID !== pID);
        cartItems = updatedCart;
        saveToCarts();
    }
    return { totalPrice, get cartItems() { return cartItems }, addToCart, calculateCart, deleteCart }
}

const cartFooter = document.getElementById("cartFooter");
if (cartFooter) cartFooter.style.display = "none";

const Cart = cart()

function displayCart() {
    const { totalItem, totalPrice } = Cart.calculateCart();
    let cartQty = document.getElementById("cartQty");
    let cartQty1 = document.getElementById("cartQty1");
    let subTotal = document.getElementById("subTotal");
    let cart = document.querySelector(".cartItems");

    cart.innerHTML = "";
    if (cartQty) {
        cartQty.innerText = totalItem.toString();
        cartQty.classList.toggle("d-none", totalItem === 0);
    }
    if (subTotal) subTotal.innerText = '$' + totalPrice.toFixed(2);
    if (cartQty1) cartQty1.innerText = `${totalItem} ${totalItem === 1 ? "item" : "items"}`;

    if (Cart.cartItems.length === 0) {
        cart.innerHTML =
            ` <div class="cart-empty-state">
                <i class="bi bi-bag" aria-hidden="true"></i>
                <p>Your cart is empty</p>
                <span>Find something you love and it will show up here.</span>
            </div>`;
        if (cartFooter) cartFooter.style.display = "none";
    }
    else {

        Cart.cartItems.forEach(product => {
            const template = document.createElement("template")
            template.innerHTML = `<article class="cart-dropdown-item">
                <img class="cart-dropdown-image" src="${product.image}" alt="${product.name}">
                <div class="cart-dropdown-product">
                    <span class="cart-dropdown-product-name">${product.name}</span>
                    <span class="cart-dropdown-unit-price">$${product.price.toFixed(2)} each</span>
                </div>
                <div class="cart-dropdown-item-end">
                    <div class="cart-qty-control" aria-label="Quantity">
                        <button type="button" class="qty-updater" data-qty="decrement" aria-label="Decrease ${product.name} quantity"><i class="bi bi-dash"></i></button>
                        <span>${product.qty}</span>
                        <button type="button" class="qty-updater" data-qty="increment" aria-label="Increase ${product.name} quantity"><i class="bi bi-plus"></i></button>
                    </div>
                    <strong class="cart-dropdown-item-total">$${(product.price * product.qty).toFixed(2)}</strong>
                </div>
                <button type="button" class="cart-dropdown-remove delete-item" aria-label="Remove ${product.name} from cart"><i class="bi bi-x-lg"></i></button>
            </article>`

            const item = template.content.firstElementChild;
            const updater = item.querySelectorAll(".qty-updater")
            updater.forEach(button => button.addEventListener("click", function () {
                const type = button.dataset.qty;
                Cart.addToCart(1, product, type);
                displayCart();
                displayCartPage();
            }));
            item.querySelector(".delete-item").addEventListener("click", () => {
                Cart.deleteCart(product.pID);
                displayCart();
                displayCartPage();
            });
            cart.appendChild(item)
        })
        if (cartFooter) cartFooter.style.display = "block";
    }
}


const ecom = ecomManagement();
// ecom.saveProductsIntoStorage();
ecom.displayProducts();
