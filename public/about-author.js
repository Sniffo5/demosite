// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".therese-stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.floor(current).toLocaleString()
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target.toLocaleString()
      }
    }

    updateCounter()
  })
}

// Q&A functionality
function toggleAnswer(button) {
  const qaItem = button.parentElement
  const isActive = qaItem.classList.contains("active")

  // Close all other items
  document.querySelectorAll(".therese-qa-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Toggle current item
  if (!isActive) {
    qaItem.classList.add("active")
  }
}

// Filter functionality
function filterQuestions(category) {
  const items = document.querySelectorAll(".therese-qa-item")
  const buttons = document.querySelectorAll(".therese-filter-btn")

  // Update active button
  buttons.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  // Filter items
  items.forEach((item) => {
    if (category === "all" || item.getAttribute("data-category") === category) {
      item.style.display = "block"
      item.style.animation = "therese-fadeInUp 0.5s ease forwards"
    } else {
      item.style.display = "none"
    }
  })
}

// Intersection Observer for animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"

          // Trigger counter animation when stats section is visible
          if (entry.target.classList.contains("therese-stats-section")) {
            animateCounters()
          }
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  // Observe sections
  document
    .querySelectorAll(".therese-stats-section, .therese-award-section, .therese-qa-section, .therese-fun-facts-section")
    .forEach((section) => {
      section.style.opacity = "0"
      section.style.transform = "translateY(30px)"
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(section)
    })
}

// Smooth scrolling for internal links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Add some interactive elements
function addInteractiveElements() {
  // Add hover effect to fact cards
  const factCards = document.querySelectorAll(".therese-fact-card")
  factCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add click effect to stat cards
  const statCards = document.querySelectorAll(".therese-stat-card")
  statCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "translateY(-5px)"
      }, 150)
    })
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupScrollAnimations()
  setupSmoothScrolling()
  addInteractiveElements()

  // Add some random floating animations
  const decorations = document.querySelectorAll(
    ".therese-floating-book, .therese-floating-star, .therese-floating-heart",
  )
  decorations.forEach((decoration, index) => {
    decoration.style.animationDelay = `${index * 2}s`
    decoration.style.animationDuration = `${6 + index}s`
  })

  // Auto-open Lilly Emme question if hash is present
  if (window.location.hash === "#lillyemme") {
    const lillyItem = document.getElementById("lillyemme")
    if (lillyItem && !lillyItem.classList.contains("active")) {
      lillyItem.classList.add("active")
      lillyItem.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }
})

// Add keyboard navigation for Q&A
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    if (e.target.classList.contains("therese-qa-question")) {
      e.preventDefault()
      toggleAnswer(e.target)
    }
  }
})

// Add some fun Easter eggs
let clickCount = 0
document.querySelector(".therese-hero-title").addEventListener("click", function () {
  clickCount++
  if (clickCount === 5) {
    this.style.animation = "bounce 1s ease"
    setTimeout(() => {
      this.style.animation = ""
    }, 1000)
    clickCount = 0
  }
})
