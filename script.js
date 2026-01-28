// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const darkModeToggle = document.getElementById('darkModeToggle');
const scrollToTopBtn = document.querySelector('.scroll-to-top');
const inquiryForm = document.getElementById('inquiryForm');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Dark Mode Toggle
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
});

// Scroll to Top Button
window.addEventListener('scroll', () => {
    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
    
    // Update active navigation link based on scroll position
    let currentSection = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (name.length < 2) {
            alert('Please enter a valid name (at least 2 characters)');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            alert('Please enter a valid email address');
            return;
        }
        
        if (subject.length < 5) {
            alert('Please enter a more descriptive subject');
            return;
        }
        
        if (message.length < 20) {
            alert('Please enter a more detailed message (at least 20 characters)');
            return;
        }
        
        // In a real application, you would send the form data to a server here
        // For demo purposes, we'll just show a success message
        alert(`Thank you for your message, ${name}! I will get back to you soon at ${email}.`);
        
        // Reset form
        inquiryForm.reset();
    });
}

// Skills Animation with Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Initialize animations for elements already in view
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        if (isElementInViewport(el)) {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }
    });
    
    // Add scroll animation for elements
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            if (isElementInViewport(el) && getComputedStyle(el).opacity === '0') {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            }
        });
    });
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Initialize animations
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Add active class to current section on load
window.addEventListener('load', () => {
    // Set home as active by default
    document.querySelector('.nav-link[href="#home"]').classList.add('active');
    
    // Animate skill bars after a short delay
    setTimeout(() => {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 500);
});
