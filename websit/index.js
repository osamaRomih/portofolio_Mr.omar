// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const navbar = document.getElementById("navbar");

function updateTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  themeIcon.className = isDark ? "fas fa-sun text-lg" : "fas fa-moon text-lg";

  if (isDark) {
    navbar.style.backgroundColor = "rgba(17, 24, 39, 0.9)";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  }
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateTheme();
});

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
updateTheme();

// Mobile Menu
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
const mobileMenu = document.getElementById("mobile-menu");
const closeMobileMenu = document.getElementById("close-mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuOverlay.classList.remove("hidden");
  setTimeout(() => {
    mobileMenu.style.transform = "translateX(0)";
  }, 10);
});

function closeMobileMenuFunc() {
  mobileMenu.style.transform = "translateX(100%)";
  setTimeout(() => {
    mobileMenuOverlay.classList.add("hidden");
  }, 300);
}

closeMobileMenu.addEventListener("click", closeMobileMenuFunc);
mobileMenuOverlay.addEventListener("click", (e) => {
  if (e.target === mobileMenuOverlay) {
    closeMobileMenuFunc();
  }
});

// Mobile nav links
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", closeMobileMenuFunc);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars
      if (
        entry.target.classList.contains("animate-slide-left") &&
        entry.target.querySelector(".skill-progress")
      ) {
        setTimeout(() => {
          entry.target.querySelectorAll(".skill-progress").forEach((bar) => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width + "%";
          });
        }, 500);
      }
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".animate-fade-in, .animate-slide-left, .animate-slide-right"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Contact Form
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name =
      formData.get("name") || this.querySelector('input[type="text"]').value;
    const email =
      formData.get("email") || this.querySelector('input[type="email"]').value;
    const subject =
      formData.get("subject") ||
      this.querySelectorAll('input[type="text"]')[1].value;
    const message =
      formData.get("message") || this.querySelector("textarea").value;

    // Create mailto link
    const mailtoLink = `mailto:omarromih28@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open email client
    window.open(mailtoLink, "_blank");

    // Show success message
    alert("Thank you for your message! Your email client should open now.");

    // Reset form
    this.reset();
  });

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)";
  }
});

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'98274d112194e28e',t:'MTc1ODQzMzk5NC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
