const texts = [
    "SEO Strategies",
    "Social Media Marketing",
    "Content Marketing",
    "Email Marketing",
    "Affiliate Marketing",
    "Google Ads",
    "Digital Marketing",
    "Web Development",
    "Branding and Design"
];

let currentSlide = 0; // Track the current slide index
let count = 0; // Track the current text
let index = 0; // Track the current letter index
let currentText = '';
let letter = '';
let typingTimeout; // Store the timeout ID for typing animation
let autoSlideInterval; // Store the interval ID for auto slide

function typeText(textId) {
    if (count === texts.length) {
        count = 0; // Reset to the first text after the last one finishes
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById(textId).textContent = letter;

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        typingTimeout = setTimeout(() => typeText(textId), 2000); // Pause before starting the next word
    } else {
        typingTimeout = setTimeout(() => typeText(textId), 150); // Typing speed
    }
}

function startTypingForActiveSlide() {
    const activeSlide = document.querySelector('.carousel-slide.active');
    const animatedTextElement = activeSlide.querySelector('.animated-text');
    const textId = animatedTextElement.id; // Get the unique ID for the animated text

    // Clear previous typing timeout to avoid speed-up issue
    clearTimeout(typingTimeout);

    count = 0; // Reset text index when switching slides
    index = 0; // Reset letter index
    typeText(textId); // Start the typing animation for the active slide
}

// Carousel control logic
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    startTypingForActiveSlide(); // Restart typing animation for the active slide
}

// Show the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Show the previous slide
prevBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Reset auto-slide interval when manually navigating
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    startAutoSlide(); // Restart auto-slide
});

nextBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Reset auto-slide interval when manually navigating
    nextSlide();
    startAutoSlide(); // Restart auto-slide
});

// Initialize carousel with the first slide
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0); // Display the first slide and start typing
    startAutoSlide(); // Start automatic slide
});

// Automatically move the carousel every 40 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 10000); // 40 seconds interval
}

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Function to adjust content padding based on navbar height
function adjustContentMargin() {
    const navbar = document.querySelector('.navbar');
    const body = document.querySelector('body');
    const navbarHeight = navbar.offsetHeight;

    // Adjust the top margin of the body or main content wrapper dynamically
    body.style.marginTop = navbarHeight + 10 + 'px';
}

// Run the function on page load and on window resize
window.addEventListener('load', adjustContentMargin);
window.addEventListener('resize', adjustContentMargin);

const sliderTrack = document.querySelector('.slide-track');

sliderTrack.addEventListener('mouseover', () => {
  sliderTrack.style.animationPlayState = 'paused';
});

sliderTrack.addEventListener('mouseout', () => {
  sliderTrack.style.animationPlayState = 'running';
});
