const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');

let index = 0;
const itemWidth = items[0].offsetWidth;
const speed = 1500; // autoplay interval in ms

// Clone first and last elements for infinite effect
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, items[0]);

// Set initial position to avoid jump on load
track.style.transform = `translateX(-${itemWidth}px)`;

// Update index because of prepended clone
index = 1;

function moveToNextSlide() {
    index++;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${itemWidth * index}px)`;
}

// Reset position when reaching cloned elements
track.addEventListener('transitionend', () => {
    const updatedItems = document.querySelectorAll('.carousel-item');

    if (updatedItems[index].isEqualNode(firstClone)) {
        track.style.transition = 'none';
        index = 1;
        track.style.transform = `translateX(-${itemWidth * index}px)`;
    }

    if (updatedItems[index].isEqualNode(lastClone)) {
        track.style.transition = 'none';
        index = updatedItems.length - 2;
        track.style.transform = `translateX(-${itemWidth * index}px)`;
    }
});

// Autoplay loop
setInterval(moveToNextSlide, speed);
