document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const carousel = document.getElementById("carousel");
    const fileInput = document.getElementById("fileInput");

    fileInput.addEventListener("change", function () {
        const files = Array.from(this.files).slice(0, 5); // Permitir hasta 5 imágenes
        carousel.innerHTML = "";
        files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.dataset.index = index;
                carousel.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
        currentIndex = 0;
        updateCarousel();
    });

    function updateCarousel() {
        const width = document.querySelector(".carousel img")?.clientWidth || 0;
        carousel.style.transform = `translateX(-${currentIndex * width}px)`;
    }

    window.prevSlide = function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    };

    window.nextSlide = function () {
        if (currentIndex < carousel.children.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    };

    window.addEventListener("resize", updateCarousel);
});
