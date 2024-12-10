// Fungsi untuk memindahkan slide
function moveSlide(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const container = carousel.querySelector('.carousel-container');
    const slides = container.children;
    const totalSlides = slides.length;

    // Tentukan indeks saat ini berdasarkan transform
    const currentTransform = getComputedStyle(container).transform;
    const matrixValues = currentTransform.match(/matrix.*\((.+)\)/);
    const translateX = matrixValues ? parseFloat(matrixValues[1].split(', ')[4]) : 0;
    const slideWidth = slides[0].clientWidth;
    let currentIndex = -translateX / slideWidth;

    // Hitung indeks baru
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    // Pindahkan slide
    const offset = -currentIndex * slideWidth;
    container.style.transform = `translateX(${offset}px)`;
}
