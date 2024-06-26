function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Keydown event for the whole document
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % captions.length; // Calculate the new index
    displayImage(currentIndex); // Display the new image
  } else if (event.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + captions.length) % captions.length; // Calculate the new index
    displayImage(currentIndex); // Display the new image
  }
});

// Function to fade in the page with a delay
function fadeInPage() {
    const pageContainer = document.querySelector('body'); // Target the body for full page fade
    pageContainer.style.opacity = 0;
    let op = 0;  // initial opacity
    let delay = 1500; // Delay in milliseconds (1000ms = 1 second)

    function fade() {
        op += 0.07; // smaller increment for slower fade
        pageContainer.style.opacity = op;
        if (op < 1) {
            requestAnimationFrame(fade);
        }
    }

    // Set a delay before starting the fade in
    setTimeout(fade, delay);
}


// Function to fade out the page
function fadeOutPage() {
    const pageContainer = document.querySelector('body'); // Target the body for full page fade
    let op = 1;  // initial opacity

    function fade() {
        op -= 0.07; // adjust for desired speed
        pageContainer.style.opacity = op;
        if (op > 0) {
            requestAnimationFrame(fade);
        } else {
            pageContainer.style.display = 'none';
        }
    }
    fade();
}


// Example: Listen for link clicks and initiate the fade effect
const links = document.querySelectorAll('a'); // Selects all anchor selectors
links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        fadeOutPage(); // Fade out the current page
        setTimeout(() => {
            window.location.href = link.href; // Navigate to the new page
        }, 300); // Adjust the delay to match your transition duration
    });
});

// When the new page loads, call fadeInPage()
window.addEventListener('load', fadeInPage);


// Function for back to top button
const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top");

// Function to check scroll position and show/hide the button
const handleScroll = () => {
    const scrollPosition = scrollContainer().scrollTop;
    if (scrollPosition >= showOnPx) {
        backToTopButton.classList.remove("hidden");
    } else {
        backToTopButton.classList.add("hidden");
    }
};

// Attach the scroll event listener
window.addEventListener("scroll", handleScroll);

// Function to scroll to the top when the button is clicked
const scrollToTop = () => {
    scrollContainer().scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

// Attach the click event listener to the button
backToTopButton.addEventListener("click", scrollToTop);

// Helper function to get the scroll container (either document or body)
const scrollContainer = () => {
    return document.documentElement || document.body;
};

// Before the page unloads (e.g., when a link is clicked), store the scroll position
window.addEventListener("beforeunload", () => {
    localStorage.setItem("scrollPosition", window.pageYOffset);
});

// On page load, check if there's a stored scroll position
const storedScrollPosition = localStorage.getItem("scrollPosition");
if (storedScrollPosition !== null) {
    // Scroll to the stored position
    window.scrollTo(0, parseInt(storedScrollPosition));
}
