// Events page functionality
class EventsManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupLoadMore()
    this.setupNewsletterForm()
    this.setupGalleryModal()
    this.setupScrollAnimations()
    this.setupEventFilters()
  }

  setupLoadMore() {
    const loadMoreBtn = document.querySelector(".load-more-btn")
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        this.loadMoreEvents()
      })
    }
  }

  loadMoreEvents() {
    // Simulate loading more events
    const eventsGrid = document.querySelector(".past-events .events-grid")
    const loadMoreBtn = document.querySelector(".load-more-btn")

    // Show loading state
    loadMoreBtn.innerHTML = `
      <span class="material-symbols-outlined">hourglass_empty</span>
      Laddar fler evenemang...
    `
    loadMoreBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      // Add more event cards (this would come from your backend)
      const moreEvents = this.createMoreEventCards()
      eventsGrid.insertAdjacentHTML("beforeend", moreEvents)

      // Reset button or hide if no more events
      loadMoreBtn.innerHTML = `
        <span class="material-symbols-outlined">expand_more</span>
        Visa fler tidigare evenemang
      `
      loadMoreBtn.disabled = false

      // Hide button if no more events (simulate)
      // loadMoreBtn.style.display = 'none'
    }, 1500)
  }

  createMoreEventCards() {
    return `
     <p> Mer fylls på vid tillfälle... </p>
    `
  }

  setupNewsletterForm() {
    const form = document.querySelector(".newsletter-form")
    const input = document.querySelector(".newsletter-input")
    const button = document.querySelector(".newsletter-btn")

    if (form && input && button) {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleNewsletterSubmit(input.value, button)
      })

      button.addEventListener("click", (e) => {
        e.preventDefault()
        this.handleNewsletterSubmit(input.value, button)
      })
    }
  }

  handleNewsletterSubmit(email, button) {
    if (!this.validateEmail(email)) {
      this.showMessage("Vänligen ange en giltig e-postadress", "error")
      return
    }

    // Show loading state
    const originalContent = button.innerHTML
    button.innerHTML = `
      <span class="material-symbols-outlined">hourglass_empty</span>
      Prenumererar...
    `
    button.disabled = true

    // Simulate API call
    setTimeout(() => {
      button.innerHTML = `
        <span class="material-symbols-outlined">check</span>
        Tack!
      `
      button.style.background = "var(--events-success)"

      this.showMessage("Tack för din prenumeration! Du kommer att få information om kommande evenemang.", "success")

      // Reset after 3 seconds
      setTimeout(() => {
        button.innerHTML = originalContent
        button.disabled = false
        button.style.background = ""
        document.querySelector(".newsletter-input").value = ""
      }, 3000)
    }, 1500)
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement("div")
    messageEl.className = `message ${type}`
    messageEl.textContent = message
    messageEl.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === "success" ? "var(--events-success)" : "var(--events-secondary)"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: var(--events-shadow-lg);
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `

    document.body.appendChild(messageEl)

    // Remove after 5 seconds
    setTimeout(() => {
      messageEl.style.animation = "slideOut 0.3s ease"
      setTimeout(() => {
        document.body.removeChild(messageEl)
      }, 300)
    }, 5000)
  }

  setupGalleryModal() {
    const galleryThumbs = document.querySelectorAll(".gallery-thumb")

    galleryThumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        this.openGalleryModal(thumb.src, thumb.alt)
      })
    })
  }

  openGalleryModal(src, alt) {
    // Create modal
    const modal = document.createElement("div")
    modal.className = "gallery-modal"
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      cursor: pointer;
    `

    const img = document.createElement("img")
    img.src = src
    img.alt = alt
    img.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: 8px;
    `

    modal.appendChild(img)
    document.body.appendChild(modal)

    // Close on click
    modal.addEventListener("click", () => {
      document.body.removeChild(modal)
    })

    // Close on escape
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        document.body.removeChild(modal)
        document.removeEventListener("keydown", handleEscape)
      }
    }
    document.addEventListener("keydown", handleEscape)
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe sections
    document.querySelectorAll(".events-section, .events-newsletter").forEach((section) => {
      section.style.opacity = "0"
      section.style.transform = "translateY(30px)"
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(section)
    })
  }

  setupEventFilters() {
    // Add filter functionality if needed
    const eventCards = document.querySelectorAll(".event-card")

    // Add search functionality
    this.addSearchFunctionality(eventCards)
  }

  addSearchFunctionality(eventCards) {
    // Create search input (could be added to HTML)
    const searchContainer = document.querySelector(".events-section-header")
    if (searchContainer) {
      const searchInput = document.createElement("input")
      searchInput.type = "text"
      searchInput.placeholder = "Sök evenemang..."
      searchInput.style.cssText = `
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        border: 2px solid var(--events-border);
        border-radius: 25px;
        font-size: 1rem;
        max-width: 300px;
        outline: none;
      `

      searchInput.addEventListener("input", (e) => {
        this.filterEvents(e.target.value, eventCards)
      })

      // searchContainer.appendChild(searchInput)
    }
  }

  filterEvents(searchTerm, eventCards) {
    const term = searchTerm.toLowerCase()

    eventCards.forEach((card) => {
      const title = card.querySelector(".event-title").textContent.toLowerCase()
      const description = card.querySelector(".event-description").textContent.toLowerCase()

      if (title.includes(term) || description.includes(term)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  }
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new EventsManager()
})

// Add smooth scrolling for anchor links
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
