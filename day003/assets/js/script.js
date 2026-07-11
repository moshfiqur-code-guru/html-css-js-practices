

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 300);
});

window.addEventListener("DOMContentLoaded", addAClass);

function addAClass() {
    document.body.classList.add("animation-start")
}


$(document).ready(function () {

   $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    stagePadding: 100,
    nav: true,
    dots: true,
    items: 1
});

});