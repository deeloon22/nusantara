function moveSlide(carouselId, direction) {
    const carousel = document.querySelector(`#${carouselId}`);
    if (!carousel) {
        console.error(`Carousel dengan ID ${carouselId} tidak ditemukan.`);
        return;
    }

    const carouselContainer = carousel.querySelector('.carousel-container');
    const slides = carouselContainer.querySelectorAll('img');
    const totalSlides = slides.length;

    let currentIndex = parseInt(carouselContainer.dataset.currentIndex || '0');

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1; 
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0; 
    }

    carouselContainer.dataset.currentIndex = currentIndex;

    const slideWidth = slides[0].clientWidth;
    const offset = -currentIndex * slideWidth;
    carouselContainer.style.transform = `translateX(${offset}px)`;
}
