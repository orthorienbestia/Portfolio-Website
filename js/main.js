// main.js - Interactivity & Animations for Akshay Khandizod Portfolio

document.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
      if (this.hash) {
        e.preventDefault();
        document.querySelector(this.hash).scrollIntoView({
          behavior: 'smooth'
        });
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });

  // GSAP Animations (if GSAP is loaded)
  if (window.gsap) {
    gsap.from('.hero-content h1', { duration: 1, y: -40, opacity: 0, ease: 'power2.out' });
    gsap.from('.hero-content h2', { duration: 1, y: 40, opacity: 0, delay: 0.3, ease: 'power2.out' });
    gsap.from('.hero-content .animated-headline', { duration: 1, scale: 0.8, opacity: 0, delay: 0.6, ease: 'back.out(1.7)' });
    gsap.from('.hero-buttons', { duration: 1, y: 30, opacity: 0, delay: 1, ease: 'power2.out' });
  }

  // Particles.js background
  if (window.particlesJS) {
    particlesJS.load('particles-js', '/js/particles.json', function () {
      // Callback after particles config loads
    });
  }
});
