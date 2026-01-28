const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const upBtn = document.querySelector(".up");
const darkToggle = document.getElementById("darkToggle");
const skillBars = document.querySelectorAll(".activebar");

// Mobile Menu
menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuBtn.classList.toggle("uil-times");
});

// Scroll to Top
window.addEventListener("scroll", () => {
  upBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

upBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Dark Mode
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkToggle.querySelector(".switchcircle").classList.toggle("on");
});

// Skills Animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width;
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

skillBars.forEach(bar => observer.observe(bar));
