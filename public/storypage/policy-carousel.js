class PolicyCarousel {
    constructor(container) {
        this.container = container;
        this.carousel = container.querySelector('.carousel');
        this.cards = Array.from(this.carousel.children);
        this.prevBtn = container.querySelector('.prev');
        this.nextBtn = container.querySelector('.next');
        this.cardWidth = this.cards[0].offsetWidth;
        this.autoplayInterval = null;
        
        this.setupEventListeners();
        this.startAutoplay();
    }

    setupEventListeners() {
        // Arrow navigation
        this.prevBtn.addEventListener('click', () => this.scrollToPrev());
        this.nextBtn.addEventListener('click', () => this.scrollToNext());

        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    scrollToPrev() {
        this.carousel.scrollBy({
            left: -this.cardWidth,
            behavior: 'smooth'
        });
    }

    scrollToNext() {
        this.carousel.scrollBy({
            left: this.cardWidth,
            behavior: 'smooth'
        });
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const deltaX = startX - endX;

        if (deltaX > swipeThreshold) {
            this.scrollToNext();
        } else if (deltaX < -swipeThreshold) {
            this.scrollToPrev();
        }
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.scrollToNext();
        }, 5000);
    }

    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        new PolicyCarousel(carouselContainer);
    }
});
