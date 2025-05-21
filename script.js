document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Form submission handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      // Let the form submit normally
      // After submission, clear the form
      setTimeout(() => {
        contactForm.reset();
      }, 1000); // Wait 1 second to ensure form submission is complete
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navbar = document.querySelector(".navbar");
  const menuIcon = document.querySelector(".menu-icon");
  let menuOpen = false;

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      menuOpen = !menuOpen;
      document.body.classList.toggle("no-scroll", menuOpen);
      navbar.classList.toggle("mobile-menu-open", menuOpen);

      // Create menu if it doesn't exist
      let mobileMenu = document.querySelector(".mobile-menu");
      if (!mobileMenu && menuOpen) {
        mobileMenu = document.createElement("div");
        mobileMenu.classList.add("mobile-menu");
        mobileMenu.innerHTML = `
          <nav>
            <a href="#home" class="mobile-link">Home</a>
            <a href="#about" class="mobile-link">About</a>
            <a href="#skills" class="mobile-link">Skills</a>
            <a href="#project-1" class="mobile-link">Projects</a>
            <a href="#contact" class="mobile-link">Contact</a>
          </nav>
        `;
        document.body.appendChild(mobileMenu);

        // Add event listeners to mobile menu links
        const mobileLinks = document.querySelectorAll(".mobile-link");
        mobileLinks.forEach((link) => {
          link.addEventListener("click", () => {
            menuOpen = false;
            document.body.classList.remove("no-scroll");
            navbar.classList.remove("mobile-menu-open");
            mobileMenu.classList.remove("show");
          });
        });
      }

      if (mobileMenu) {
        mobileMenu.classList.toggle("show", menuOpen);
      }
    });
  }

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Initialize skill levels
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item) => {
    const level = item.getAttribute("data-level");
    if (level) {
      const skillLevel = item.querySelector(".skill-level");
      if (skillLevel) {
        skillLevel.style.setProperty("--level", `${level}%`);
      }
    }
  });

  // Scroll animations
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".project-content, .skill-category, .contact-form-container, .contact-options"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isVisible =
        elementTop < window.innerHeight - 100 && elementBottom > 0;

      if (isVisible) {
        element.classList.add("animate-fadeIn");
      }
    });
  };

  // Run once on load
  animateOnScroll();

  // Run on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for navbar height
          behavior: "smooth",
        });
      }
    });
  });

  // Add CSS for mobile menu
  const style = document.createElement("style");
  style.textContent = `
    .mobile-menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: var(--pandoBlack);
      z-index: 101;
      padding-top: 6rem;
      transform: translateY(-100%);
      transition: transform 0.3s ease;
    }
    
    .mobile-menu.show {
      transform: translateY(0);
    }
    
    .mobile-menu nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    
    .mobile-link {
      font-size: 1.25rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    body.no-scroll {
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});
