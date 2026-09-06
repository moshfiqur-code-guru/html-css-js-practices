// ===============================================//
// Dynamically add menu buttons                  //
// =============================================//
const arrayOfMenu = [
    {
        label: "home"
    },
    {
        label: "product"
    },
    {
        label: "shop"
    },
    {
        label: "classes"
    }
];



// ===============================================//
// add logout  and home button                   //
// =============================================//


const endBtnAdd = document.querySelector(".end-items");

endBtnAdd.innerHTML = ` <a href="cart.html">
                        <div class="cart flex align-center">
                            <i class="ti ti-shopping-bag"></i>
                            <span>Cart</span>
                        </div>
                    </a>`;







// ##############################################//
//owl carousel                                  //
// ############################################//


const products = JSON.parse(localStorage.getItem('products')) || [];

const productCarousel = document.getElementById("product-carousel");

function displayInCarousel() {

    if (window.location.href.includes("home.html")) {
        productCarousel.innerHTML = "";

        products.forEach((product) => {

            const item = document.createElement("div");

            item.classList.add("item");

            item.innerHTML = `
            <div class="product-details flex column align-center space-between">

                <div>
                    <div class="flex align-center product-category-div">
                    <i class="ti ti-${typeIcon(Number(product.type))}"></i>
                        <span>${typeLabel(Number(product.type))}</span>
                    </div>
                </div>

                <div class="flex column align-center">

                    <h3>${product.productName}</h3>

                    <span>$${product.price}</span>

                    <div class="flex align-center buy-action">
                        <span class="buy-now">Buy now</span>
                        <i class="ti ti-arrow-narrow-right"></i>
                    </div>

                    <div class="bar"></div>

                </div>

            </div>

            <img src="assets/img/${product.image}" alt="${product.productName}">
        `;

            productCarousel.appendChild(item);
        });

        $('.owl-carousel').owlCarousel({
            stagePadding: 50,
            loop: false,
            margin: 20,
            nav: true,
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
    }
}

displayInCarousel();

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

//################################################################//
// function for displaying actual type icon                      //
//##############################################################//

function typeIcon(typeValue) {
    const icons = {
        1: "headphones",
        2: "device-airpods",
        3: "access-point-off",
        4: "device-gamepad-2",
        5: "headset",
    }
    return icons[typeValue];
}


//################################################################//
// function for displaying product in all product page           //
//##############################################################//



const productContainer = document.getElementById("product-container");

function displayInContainer(products) {

    if (window.location.href.includes("product.html")) {
        productContainer.innerHTML = "";

        products.forEach((product) => {

            const item = document.createElement("div");

            item.classList.add("single-product");

            item.innerHTML = `
             <div class="product-img">
                    <img src="assets/img/${product.image}" alt="${product.productName}">
                </div>
                <div class="flex space-between info-div">
                    <div>
                        <h3>${product.productName}</h3>
                        <p>${typeLabel(Number(product.type))}</p>
                        <span>$${product.price}</span>
                    </div>
                    <div class="flex column end">
                        <button>Add to Cart 🛒</button>
                    </div>
                </div>
        `;

            productContainer.appendChild(item);
        });

    }
}

displayInContainer(products);

// ------------------------------------------------//
// search function one all product list           //
// ----------------------------------------------//


function keyWords(input) {
    const keyWords = input.value.replace(/\s/g, "");

    const formattedProducts = products.filter(product => (product.productName + product.price + product.type)
        .replace(/\s/g, "").toLowerCase().includes(keyWords.toLowerCase()));

    displayInContainer(formattedProducts);
}



//=====================================
// page counter
// ===================================

const methodCount = counter();

const countRes = document.getElementById("countResult")

const btnsOnInput = document.querySelectorAll(".center-on-calc button")

btnsOnInput.forEach((btnsOnInput, index) => {
    let fn = index === 0 ?
        () => {
            methodCount.increment(1);
            displayResultOnInput();
        }
        : () => {
            methodCount.decrement(1);
            displayResultOnInput();
        }
    btnsOnInput.addEventListener("mouseover", fn)
})

function displayResultOnInput() {
    const count = methodCount.getCount();
    countRes.value = count;

}