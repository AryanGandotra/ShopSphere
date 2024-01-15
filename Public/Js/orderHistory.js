document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    let currentIndex = 0;
    const items = carousel.querySelectorAll(".carousel-item");
    const totalItems = items.length;
    const indicatorsContainer = carousel.parentElement.querySelector(
      ".navigation-indicators"
    );

    // Create navigation indicators
    for (let i = 0; i < totalItems; i++) {
      const indicator = document.createElement("div");
      indicator.classList.add("indicator");
      indicator.addEventListener("click", function () {
        showItem(i);
      });
      indicatorsContainer.appendChild(indicator);
    }

    function updateIndicators() {
      const indicators = indicatorsContainer.querySelectorAll(".indicator");
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active-indicator", index === currentIndex);
      });
    }

    function showItem(index) {
      if (index < 0) {
        index = totalItems - 1;
      } else if (index >= totalItems) {
        index = 0;
      }

      const newTransformValue = -index * 100 + "%";
      carousel.style.transform = "translateX(" + newTransformValue + ")";
      currentIndex = index;

      updateIndicators();
    }

    // Swipe gestures
    let touchStartX = 0;
    carousel.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchmove", function (e) {
      const touchEndX = e.touches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      if (deltaX > 50) {
        showItem(currentIndex - 1);
      } else if (deltaX < -50) {
        showItem(currentIndex + 1);
      }
    });

    // Optional: Auto-play the carousel
    setInterval(function () {
      showItem(currentIndex + 1);
    }, 3000); // Change 3000 to your desired interval (in milliseconds)
  });
});
