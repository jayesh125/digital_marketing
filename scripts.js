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
        typingTimeout = setTimeout(() => typeText(textId), 1500); // Pause before starting the next word
    } else {
        typingTimeout = setTimeout(() => typeText(textId), 140); // Typing speed
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

const carouselWrapper = document.querySelector('.carousel-wrapper');

// Pause animation on hover
carouselWrapper.addEventListener('mouseover', () => {
  carouselWrapper.style.animationPlayState = 'paused';
});

// Resume animation when not hovering
carouselWrapper.addEventListener('mouseout', () => {
  carouselWrapper.style.animationPlayState = 'running';
});

const counters = document.querySelectorAll('.counter');
const speed = 10000; // The lower the slower

counters.forEach(counter => {
	const updateCount = () => {
		const target = +counter.getAttribute('data-target');
		const count = +counter.innerText;

		// Lower inc to slow and higher to slow
		const inc = target / speed;

		// console.log(inc);
		// console.log(count);

		// Check if target is reached
		if (count < target) {
			// Add inc to count and output in counter
			counter.innerText = Math.ceil(count + inc);
			// Call function every ms
			setTimeout(updateCount, 20);
		} else {
			counter.innerText = target;
		}
	};

	updateCount();
});

const items = document.querySelectorAll('.item'),
  controls = document.querySelectorAll('.control'),
  headerItems = document.querySelectorAll('.item-header'),
  descriptionItems = document.querySelectorAll('.item-description'),
  activeDelay = .76,
  interval = 5000;

let current = 0;

const slider = {
  init: () => {
    controls.forEach(control => control.addEventListener('click', (e) => { slider.clickedControl(e) }));
    controls[current].classList.add('active');
    items[current].classList.add('active');
  },
  nextSlide: () => { // Increment current slide and add active class
    slider.reset();
    if (current === items.length - 1) current = -1; // Check if current slide is last in array
    current++;
    controls[current].classList.add('active');
    items[current].classList.add('active');
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
  },
  clickedControl: (e) => { // Add active class to clicked control and corresponding slide
    slider.reset();
    clearInterval(intervalF);

    const control = e.target,
      dataIndex = Number(control.dataset.index);

    control.classList.add('active');
    items.forEach((item, index) => { 
      if (index === dataIndex) { // Add active class to corresponding slide
        item.classList.add('active');
      }
    })
    current = dataIndex; // Update current slide
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
    intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
  },
  reset: () => { // Remove active classes
    items.forEach(item => item.classList.remove('active'));
    controls.forEach(control => control.classList.remove('active'));
  },
  transitionDelay: (items) => { // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
    let seconds;
    
    items.forEach(item => {
      const children = item.childNodes; // .vertical-part(s)
      let count = 1,
        delay;
      
      item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

      children.forEach(child => { // iterate through .vertical-part(s) and style b element
        if (child.classList) {
          item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
          child.firstElementChild.style.transitionDelay = `${delay}s`; // b element
          count++;
        }
      })
    })
  },
}

let intervalF = setInterval(slider.nextSlide, interval);
slider.init();
