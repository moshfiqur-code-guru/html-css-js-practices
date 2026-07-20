

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 300);
});

window.addEventListener("DOMContentLoaded", addAClass);

function addAClass() {
    document.body.classList.add("animation-start")
}



const openButton = document.querySelector(".play-button");
const closeButton = document.querySelector(".close");
const video = document.querySelector(".video-overlay");
const playerWindow = document.getElementById("player-window");
const videoFrame = document.getElementById("videoFrame");

openButton.addEventListener("click", videoOpener);

closeButton.addEventListener("click", () => {
    video.classList.remove("show");
    videoFrame.src = "";
});

video.addEventListener("click", () => {
    video.classList.remove("show");
    videoFrame.src = "";
});

playerWindow.addEventListener("click", (e) => {
    e.stopPropagation();
});

function videoOpener() {
    video.classList.add("show");
    videoFrame.src = "https://www.youtube.com/embed/xeXV1KoX034?autoplay=1&mute=1";
}

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

    const sendBtn = document.getElementById("send-btn");
    const input = document.getElementById("email");
    sendBtn.classList.add("disabled")
    input.classList.add("disabled")
    input.addEventListener("input", () => {
        if (input.value.trim() === "") {
            sendBtn.classList.add("disabled")
            input.classList.add("disabled")
        } else {
            sendBtn.classList.remove("disabled")
            input.classList.remove("disabled")
        }
    })

});

/*
* SCROLL TOP ANIMATION & SCROLLING
* PROGRESS DETECTION
*  */

const path = document.querySelector(".progress-circle path");
const total_length = path.getTotalLength();
const scrollTopBtn = document.querySelector(".scroll-top");
path.style.strokeDasharray = total_length;
path.style.strokeDashoffset = total_length;

function toggleVisible(top, hight) {

    if (top > hight) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
}

function scrollToTopOnClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateScrollProgress() {

    const currentScrollPos = scrollY;
    const screenHight = innerHeight;
    toggleVisible(currentScrollPos, screenHight)
    const docTotalHight = document.documentElement.scrollHeight;
    const scrollableHight = docTotalHight - screenHight;
    const scrollPosition = currentScrollPos / scrollableHight;
    const alreadyProgressed = scrollPosition * total_length;
    const progressable = total_length - alreadyProgressed;
    path.style.strokeDashoffset = progressable;
    console.log(progressable)
}


updateScrollProgress()
window.addEventListener("scroll", updateScrollProgress);
scrollTopBtn.addEventListener("click", scrollToTopOnClick);