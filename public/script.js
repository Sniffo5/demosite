// --- Featured Book Gallery Logic ---
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.featured-book-slide');
  const prevBtn = document.getElementById('featured-prev');
  const nextBtn = document.getElementById('featured-next');
  const indicators = document.querySelectorAll('.featured-indicator');
  let current = 0;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === idx);
    });
    current = idx;
  }

  if (prevBtn && nextBtn && slides.length > 1) {
    prevBtn.addEventListener('click', () => {
      let idx = (current - 1 + slides.length) % slides.length;
      showSlide(idx);
    });
    nextBtn.addEventListener('click', () => {
      let idx = (current + 1) % slides.length;
      showSlide(idx);
    });
    indicators.forEach((btn, i) => {
      btn.addEventListener('click', () => showSlide(i));
    });
  }
});
// Hero Slider Functionality
class HeroSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".hero-slide");
    this.indicators = document.querySelectorAll(".indicator");
    this.prevBtn = document.getElementById("hero-prev");
    this.nextBtn = document.getElementById("hero-next");
    this.autoSlideInterval = null;

    // Only initialize if the slider exists on the page
    if (this.slides.length > 0 && this.prevBtn && this.nextBtn && this.indicators.length > 0) {
      this.init();
    }
  }

  init() {
    // Add event listeners
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Add indicator click events
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index));
    });

    // Start auto-slide
    this.startAutoSlide();

    // Pause auto-slide on hover
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      heroSection.addEventListener("mouseenter", () => this.stopAutoSlide());
      heroSection.addEventListener("mouseleave", () => this.startAutoSlide());
    }
  }

  goToSlide(index) {
    // Remove active class from current slide and indicator
    this.slides[this.currentSlide].classList.remove("active")
    this.indicators[this.currentSlide].classList.remove("active")

    // Update current slide
    this.currentSlide = index

    // Add active class to new slide and indicator
    this.slides[this.currentSlide].classList.add("active")
    this.indicators[this.currentSlide].classList.add("active")
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.goToSlide(nextIndex)
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.goToSlide(prevIndex)
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval)
      this.autoSlideInterval = null
    }
  }
}

// Mobile Menu Functionality

// Mobile Menu Functionality (event delegation, works with dynamic header)
function setupMobileMenuDelegation() {
  document.body.addEventListener("click", function(e) {
    // Toggle menu
    const menuBtn = document.getElementById("mobile-menu-toggle");
    const menu = document.getElementById("mobile-menu");
    if (!menuBtn || !menu) return;

    if (e.target === menuBtn || menuBtn.contains(e.target)) {
      // Toggle menu
      const isOpen = menu.classList.contains("active");
      if (isOpen) {
        menu.classList.remove("active");
        menuBtn.classList.remove("active");
        // Reset hamburger lines
        const lines = menuBtn.querySelectorAll(".hamburger-line");
        if (lines.length === 3) {
          lines[0].style.transform = "none";
          lines[1].style.opacity = "1";
          lines[2].style.transform = "none";
        }
      } else {
        menu.classList.add("active");
        menuBtn.classList.add("active");
        // Animate hamburger lines
        const lines = menuBtn.querySelectorAll(".hamburger-line");
        if (lines.length === 3) {
          lines[0].style.transform = "rotate(45deg) translate(5px, 5px)";
          lines[1].style.opacity = "0";
          lines[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
        }
      }
      e.stopPropagation();
      return;
    }

    // Close menu when clicking outside
    if (menu.classList.contains("active") && !menu.contains(e.target)) {
      menu.classList.remove("active");
      menuBtn.classList.remove("active");
      // Reset hamburger lines
      const lines = menuBtn.querySelectorAll(".hamburger-line");
      if (lines.length === 3) {
        lines[0].style.transform = "none";
        lines[1].style.opacity = "1";
        lines[2].style.transform = "none";
      }
    }
  });

  // Close menu when clicking a link
  document.body.addEventListener("click", function(e) {
    const menu = document.getElementById("mobile-menu");
    const menuBtn = document.getElementById("mobile-menu-toggle");
    if (!menu || !menuBtn) return;
    if (e.target.classList && e.target.classList.contains("mobile-nav-link")) {
      menu.classList.remove("active");
      menuBtn.classList.remove("active");
      // Reset hamburger lines
      const lines = menuBtn.querySelectorAll(".hamburger-line");
      if (lines.length === 3) {
        lines[0].style.transform = "none";
        lines[1].style.opacity = "1";
        lines[2].style.transform = "none";
      }
    }
  });

  // Close menu on window resize
  window.addEventListener("resize", function() {
    const menu = document.getElementById("mobile-menu");
    const menuBtn = document.getElementById("mobile-menu-toggle");
    if (!menu || !menuBtn) return;
    if (window.innerWidth > 768) {
      menu.classList.remove("active");
      menuBtn.classList.remove("active");
      // Reset hamburger lines
      const lines = menuBtn.querySelectorAll(".hamburger-line");
      if (lines.length === 3) {
        lines[0].style.transform = "none";
        lines[1].style.opacity = "1";
        lines[2].style.transform = "none";
      }
    }
  });
}

// Smooth scrolling for anchor links
class SmoothScroll {
  constructor() {
    this.init()
  }

  init() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }
}

// Intersection Observer for animations
class ScrollAnimations {
  constructor() {
    this.observer = null
    this.init()
  }

  init() {
    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe elements
    const animateElements = document.querySelectorAll(".book-category-card, .featured-book-content, .cta-content")
    animateElements.forEach((el) => {
      this.observer.observe(el)
    })
  }
}

// Initialize everything when DOM is loaded


function initAll() {
  new HeroSlider();
  setupMobileMenuDelegation();
  new SmoothScroll();
  new ScrollAnimations();
}

document.addEventListener("DOMContentLoaded", () => {
  initAll();
});

// No need to re-initialize for HTMX swaps, event delegation handles dynamic content

// Add some CSS for scroll animations
const style = document.createElement("style")
style.textContent = `
  .book-category-card,
  .featured-book-content,
  .cta-content {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .book-category-card.animate-in,
  .featured-book-content.animate-in,
  .cta-content.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`
document.head.appendChild(style)
