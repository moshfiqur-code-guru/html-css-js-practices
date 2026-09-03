
// ##############################################//
//owl carousel                                  //
// ############################################//


const products = JSON.parse(localStorage.getItem('products')) || [];

const productCarousel = document.getElementById("product-carousel");

function displayInCarousel() {

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