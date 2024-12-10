const cultures = [
    {
        name: "Suku Jawa",
        description: "Budaya Suku Jawa meliputi wayang kulit, gamelan, dan tradisi upacara adat.",
        images: ["Jawa1.jpg", "Jawa2.png", "Jawa3.jpg", "Jawa4.jpg", "Jawa5.jpeg"],
        detailPage: "konten/jawa/jawa.html"
    },
    {
        name: "Suku Minang",
        description: "Suku Minang terkenal dengan adat pernikahan dan kuliner seperti rendang.",
        images: ["Minang1.jpg", "Minang2.jpg", "Minang3.jpg", "Minang4.jpg", "Minang5.jpg"],
        detailPage: "konten/minang/minang.html"
    },
    {
        name: "Suku Sunda",
        description: "Suku Sunda terkenal dengan tarian, pakaian, kuliner dan keramah-tamahannya.",
        images: ["Sunda1.jpg", "Sunda2.jpg", "Sunda3.jpg", "Sunda4.jpg"],
        detailPage: "konten/sunda/sunda.html"
    },
    {
        name: "Suku Melayu",
        description: "Suku Melayu terkenal dengan tarian, pakaian, kuliner dan tradisi lainnya.",
        images: ["Melayu1.jpg", "Melayu2.jpg", "Melayu3.jpg", "Melayu4.jpg", "Melayu5.jpg"],
        detailPage: "konten/melayu/melayu.html"
    },
];

const cultureList = document.getElementById("culture-list");
const searchInput = document.getElementById("search");
const toggleDarkMode = document.getElementById("toggle-dark-mode");

// Fungsi untuk mengubah gambar secara periodik setiap 2 detik saat hover
function cycleImagesOnHover(imageElement, images, interval) {
    let currentIndex = 0;
    let intervalId;
    let hoverTimer;

    // Fungsi untuk memulai transisi gambar
    function startImageCycle() {
        // Reset timer ketika hover dimulai
        clearInterval(intervalId);
        clearTimeout(hoverTimer);

        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length; // Pindah ke gambar berikutnya
            imageElement.style.opacity = 0; // Mulai dengan memudar
            setTimeout(() => {
                imageElement.src = images[currentIndex]; // Ganti gambar
                imageElement.style.opacity = 1; // Kemudian tampilkan gambar baru
            }, 500); // Waktu fade out-in 0.5 detik
        }, interval);
    }

    // Fungsi untuk menghentikan transisi gambar dan reset ke gambar pertama
    function stopImageCycle() {
        clearInterval(intervalId); // Hentikan interval
        clearTimeout(hoverTimer); // Hentikan timer

        // Reset ke gambar pertama dan tampilkan gambar tersebut
        currentIndex = 0;
        imageElement.src = images[currentIndex]; 
        imageElement.style.opacity = 1; // Pastikan gambar tampil penuh
    }

    // Menambahkan event listener untuk hover
    imageElement.parentElement.parentElement.addEventListener("mouseover", startImageCycle);
    imageElement.parentElement.parentElement.addEventListener("mouseout", () => {
        // Reset gambar dan timer segera setelah hover dihentikan
        hoverTimer = setTimeout(stopImageCycle, 0); // Reset langsung setelah hover selesai
    });
}

function renderCultures(data) {
    cultureList.innerHTML = ""; 
    data.forEach(culture => {
        const cultureCard = `
            <div class="col-md-4">
                <div class="card shadow-sm">
                    <img src="${culture.images ? culture.images[0] : culture.image}" class="card-img-top" alt="${culture.name}">
                    <div class="card-body">
                        <h5 class="card-title">${culture.name}</h5>
                        <p class="card-text">${culture.description}</p>
                        <a href="${culture.detailPage}" class="btn btn-primary">Lihat Detail</a>
                    </div>
                </div>
            </div>
        `;
        cultureList.innerHTML += cultureCard;
    });

    // Menambahkan transisi gambar pada setiap card
    const allImages = document.querySelectorAll('.card-img-top');
    allImages.forEach(imageElement => {
        const culture = cultures.find(culture => culture.images && imageElement.src.includes(culture.images[0])); // Cocokkan dengan gambar pertama
        if (culture && culture.images) {
            // Mengubah gambar hanya saat hover pada Suku Jawa
            cycleImagesOnHover(imageElement, culture.images, 2000); // 2 detik transisi
        }
    });
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredCultures = cultures.filter(culture =>
        culture.name.toLowerCase().includes(query)
    );
    renderCultures(filteredCultures);
});

toggleDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const darkModeEnabled = document.body.classList.contains("dark-mode");

    // Ganti ikon tombol
    toggleDarkMode.innerHTML = darkModeEnabled ? "&#9790;" : "&#9788;";
    localStorage.setItem("darkMode", darkModeEnabled ? "enabled" : "disabled");
});

// Memuat pengaturan dark mode dari LocalStorage
document.addEventListener("DOMContentLoaded", () => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
        document.body.classList.add("dark-mode");
        toggleDarkMode.innerHTML = "&#9790;";
    } else {
        toggleDarkMode.innerHTML = "&#9788;";
    }
    renderCultures(cultures);
});