const categoriesNav = document.querySelector('.categories-nav');

// Use the native dialog API for the Bootstrap 6 drawer component.
document.querySelectorAll('[data-bs-toggle="drawer"]').forEach((toggle) => {
    const drawer = document.querySelector(toggle.dataset.bsTarget);
    if (!(drawer instanceof HTMLDialogElement)) return;

    toggle.addEventListener('click', (event) => {
        event.preventDefault();
        if (!drawer.open) drawer.showModal();
        toggle.setAttribute('aria-expanded', String(drawer.open));
    });

    drawer.querySelectorAll('[data-bs-dismiss="drawer"]').forEach((closeButton) => {
        closeButton.addEventListener('click', () => drawer.close());
    });

    drawer.addEventListener('click', (event) => {
        if (event.target === drawer) drawer.close();
    });
    drawer.addEventListener('close', () => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
    });
});

const cartDrawer = document.querySelector('#drawerExample');

if (cartDrawer) {
    const cartItems = cartDrawer.querySelector('.cart-items');
    const countLabel = cartDrawer.querySelector('.cart-item-count');
    const countBadge = document.querySelector('[data-bs-target="#drawerExample"] .badge');
    const subtotalLabel = cartDrawer.querySelector('.cart-subtotal strong');
    const emptyState = cartDrawer.querySelector('.cart-empty');

    const formatPrice = (amount) => `$${amount.toFixed(2)}`;
    const refreshCart = () => {
        const items = [...cartItems.querySelectorAll('.cart-item')];
        const count = items.reduce((sum, item) => sum + Number(item.querySelector('output').value || item.querySelector('output').textContent), 0);
        const subtotal = items.reduce((sum, item) => {
            const quantity = Number(item.querySelector('output').value || item.querySelector('output').textContent);
            const price = Number(item.dataset.price);
            item.querySelector('.cart-line-total').textContent = formatPrice(price * quantity);
            return sum + price * quantity;
        }, 0);

        countLabel.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
        countBadge.textContent = count;
        countBadge.hidden = count === 0;
        subtotalLabel.textContent = formatPrice(subtotal);
        emptyState.hidden = count !== 0;
        cartDrawer.classList.toggle('is-empty', count === 0);
        cartItems.hidden = count === 0;
    };

    cartDrawer.addEventListener('click', (event) => {
        const quantityButton = event.target.closest('[data-quantity-change]');
        if (quantityButton) {
            const item = quantityButton.closest('.cart-item');
            const output = item.querySelector('output');
            const quantity = Number(output.textContent) + Number(quantityButton.dataset.quantityChange);
            output.textContent = Math.max(1, quantity);
            refreshCart();
            return;
        }

        const removeButton = event.target.closest('.cart-remove');
        if (removeButton) {
            removeButton.closest('.cart-item').remove();
            refreshCart();
        }
    });

    refreshCart();
}

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
