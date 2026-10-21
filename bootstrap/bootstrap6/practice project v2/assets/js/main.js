const categoriesNav = document.querySelector('.categories-nav');

if (categoriesNav) {
    const updateCategoriesNav = () => {
        categoriesNav.classList.toggle('scrolled', window.scrollY > 30);
    };

    updateCategoriesNav();
    window.addEventListener('scroll', updateCategoriesNav, { passive: true });
}

const getCarouselStep = (track) => {
    const item = track.querySelector('.carousel-item');
    if (!item) return 0;

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return item.getBoundingClientRect().width + gap;
};

const scrollCarousels = document.querySelectorAll('.featured-products-carousel, #reviewCarousel');

scrollCarousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-inner');
    if (!track) return;

    const controls = document.querySelectorAll(
        `[data-bs-target="#${carousel.id}"][data-bs-slide]`
    );

    controls.forEach((button) => {
        button.addEventListener('click', () => {
            const step = getCarouselStep(track);
            if (!step) return;

            track.scrollBy({
                left: button.dataset.bsSlide === 'next' ? step : -step,
                behavior: 'smooth'
            });
        });
    });

    if (carousel.dataset.bsRide !== 'carousel') return;

    const interval = Number(carousel.dataset.bsInterval) || 5000;
    let timer;

    const advance = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 2) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
            return;
        }

        track.scrollBy({ left: getCarouselStep(track), behavior: 'smooth' });
    };

    const start = () => {
        window.clearInterval(timer);
        timer = window.setInterval(advance, interval);
    };

    const pause = () => window.clearInterval(timer);
    carousel.addEventListener('mouseenter', pause);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', pause);
    carousel.addEventListener('focusout', (event) => {
        if (!carousel.contains(event.relatedTarget)) start();
    });
    start();
});

const promoCarousel = document.querySelector('#carouselExampleContent');

if (promoCarousel) {
    const track = promoCarousel.querySelector('.carousel-inner');
    const slides = [...track.querySelectorAll('.carousel-item')];
    const interval = Number(promoCarousel.dataset.bsInterval) || 5000;
    let currentSlide = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));

    const showSlide = (index) => {
        currentSlide = (index + slides.length) % slides.length;
        const slide = slides[currentSlide];

        track.scrollTo({
            left: slide.offsetLeft - track.offsetLeft,
            behavior: 'smooth'
        });
        slides.forEach((item, itemIndex) => {
            item.classList.toggle('active', itemIndex === currentSlide);
        });
    };

    promoCarousel.querySelectorAll('[data-bs-slide="prev"], [data-bs-slide="next"]')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const direction = button.dataset.bsSlide === 'next' ? 1 : -1;
                showSlide(currentSlide + direction);
            });
        });

    if (promoCarousel.dataset.bsRide === 'carousel' && slides.length > 1) {
        window.setInterval(() => showSlide(currentSlide + 1), interval);
    }
}
