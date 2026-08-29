$(document).ready(function () {
    $('.loop').owlCarousel({
        center: true,
        items: 2,
        loop: true,
        margin: 50,
        dots: true,
        responsive: {
            600: {
                items: 2
            }
        }
    });
}); // <-- was missing this closing paren + semicolon

const navigation = document.querySelector(".navigation");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        navigation.classList.add("scrolled");
    } else {
        navigation.classList.remove("scrolled");
    }
});