

const DISCOUNT_CODE = {
    '#12345': 100,
    '#23456': 50,
    '#34567': 150,
    '#45678': 200
}
document.getElementById("apply-discount").addEventListener("click", calculateTotal);

function getDiscountAmountByCode() {

    const discountInput = document.getElementById("discount-code");
    const getCode = discountInput.value;

    if (DISCOUNT_CODE[getCode] !== undefined) {
        return DISCOUNT_CODE[getCode];

    } else {
        discountInput.value = "";
        discountInput.placeholder = "Invalid discount code";
        return 0;
    }
}

const shippingOptions = document.querySelectorAll(
    'input[name="shipping"]'
);

shippingOptions.forEach((radio) => {
    radio.addEventListener("change", calculateTotal);
});

function getShippingAmount() {
    const checkSipping = document.getElementById("sipping-form")
    const checked = checkSipping.querySelector('input[name="shipping"]:checked');
    console.log(checked.value)
    return Number(checked.value);
}

function calculateTotal() {
    const vatAmount = 5;
    const sipping = getShippingAmount();
    const DiscountedAmount = getDiscountAmountByCode()
    const { totalPrice } = Cart.calculateCart();
    let subtotal = document.querySelector(".subtotal");
    let vat = document.querySelector(".vat")
    let discount = document.querySelector(".discount");
    let finalPrice = document.querySelector(".final-price");
    subtotal.innerText = '$' + totalPrice.toFixed(2);
    vat.innerText = '$' + vatAmount.toFixed(2)
    discount.innerText = '- $' + DiscountedAmount.toFixed(2);
    finalPrice.innerText = '$' + (totalPrice + vatAmount - DiscountedAmount + sipping).toFixed(2);
}


function displayCartPage() {
    const { totalItem, totalPrice } = Cart.calculateCart();
    calculateTotal();
    let cart = document.querySelector("#cartPageItems");

    cart.innerHTML = "";
    cartQty.innerText = totalItem.toString();
    subTotal.innerText = '$' + totalPrice.toFixed(2);
    cartQty1.innerText = totalItem + ((totalItem === 0 || totalItem > 1) ? " items" : "item")

    if (Cart.cartItems.length === 0) {
        cart.innerHTML =
            `<tr><td colspan="5" class="text-center py-5">
                <i class="bi bi-cart-x fs-1 text-secondary"></i>
                <p class="mb-0 mt-2 text-muted">No items added to the cart.</p>
            </td></tr>`;
        cartFooter.style.display = "none";
    }
    else {

        Cart.cartItems.map(product => {
            const template = document.createElement("template")
            template.innerHTML = `
                                <tr class="cart-product-row">
                                    <td class="cart-product-cell">
                                        <img class="cart-product-image" src="${product.image}" alt="${product.name}" />
                                        <span class="cart-product-name">${product.name}</span>
                                    </td>
                                    <td class="cart-price">$${product.price.toFixed(2)}</td>
                                    <td>
                                        <div class="cart-quantity">
                                            <div class="qty-navigator">
                                                <button type="button" class="qty-updater" data-qty="increment" aria-label="Increase ${product.name} quantity"><i class="bi bi-chevron-up"></i></button>
                                                <span>${product.qty}</span>
                                                <button type="button" class="qty-updater" data-qty="decrement" aria-label="Decrease ${product.name} quantity"><i class="bi bi-chevron-down"></i></button>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="cart-line-total">$${(product.price * product.qty).toFixed(2)}</td>
                                    <td>
                                        <button type="button" class="cart-remove delete-item" aria-label="Remove ${product.name} from cart"><i class="bi bi-x-lg"></i></button>
                                    </td>
                                </tr>  `

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
        cartFooter.style.display = "block"
    }
}

displayCartPage();

displayCart()
