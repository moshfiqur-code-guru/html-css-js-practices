function displayProduct() {
    const { totalItem, totalPrice } = Cart.calculateCart();
    let cart = document.querySelector(".product-from-cart");

    if (!cart) return;
    cart.innerHTML = "";

    let pdQty = document.getElementById("pd-qty");
    if (pdQty) pdQty.innerText = `${totalItem} ${totalItem === 1 ? "item" : "items"}`;
    const subtotal = document.querySelector(".checkout-subtotal");
    if (subtotal) subtotal.innerText = `$${totalPrice.toFixed(2)}`;

    if (Cart.cartItems.length === 0) {
        cart.innerHTML = `<div class="checkout-empty-state"><i class="bi bi-bag" aria-hidden="true"></i><p>Your cart is empty</p><a href="index.html">Continue shopping</a></div>`;
    }
    else {

        Cart.cartItems.forEach(product => {
            const template = document.createElement("template")
            template.innerHTML = `<article class="checkout-item">
                <img class="checkout-item-image" src="${product.image}" alt="${product.name}">
                <div class="checkout-item-info">
                    <span class="checkout-item-name">${product.name}</span>
                    <span class="checkout-item-unit">$${product.price.toFixed(2)} each</span>
                </div>
                <span class="checkout-item-qty">Qty ${product.qty}</span>
                <strong class="checkout-item-total">$${(product.price * product.qty).toFixed(2)}</strong>
            </article>`

            const item = template.content.firstElementChild;

            cart.appendChild(item)
        })
    }
}

displayProduct();

displayCart()
