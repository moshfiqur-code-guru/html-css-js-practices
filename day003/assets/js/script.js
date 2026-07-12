

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 300);
});

window.addEventListener("DOMContentLoaded", addAClass);

function addAClass() {
    document.body.classList.add("animation-start")
}


$(document).ready(function () {


    $('.loop').owlCarousel({
    center: true,
    items:2,
    loop:true,
    margin:50,
    dots:true,
    responsive:{
        600:{
            items:2
        }
    }
});
});