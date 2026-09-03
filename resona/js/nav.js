// ############################################################//
// navigation animation when scrolling                        //
// ##########################################################//

const navigation = document.querySelector(".navigation");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        navigation.classList.add("scrolled");
    } else {
        navigation.classList.remove("scrolled");
    }
});
