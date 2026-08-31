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

const navigation = document.querySelector(".navigation");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        navigation.classList.add("scrolled");
    } else {
        navigation.classList.remove("scrolled");
    }
});


document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init();
});
