// main.js - Interactivity & Animations for Akshay Khandizod Portfolio

// Loading screen
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1000);
});

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

  // Enhanced GSAP Animations (if GSAP is loaded)
  if (window.gsap) {
    gsap.from('.hero-profile', { duration: 1, scale: 0, opacity: 0, ease: 'back.out(1.7)' });
    gsap.from('.hero-content h1', { duration: 1, y: -40, opacity: 0, delay: 0.3, ease: 'power2.out' });
    gsap.from('.hero-content h2', { duration: 1, y: 40, opacity: 0, delay: 0.6, ease: 'power2.out' });
    gsap.from('.hero-content .animated-headline', { duration: 1, scale: 0.8, opacity: 0, delay: 0.9, ease: 'back.out(1.7)' });
    gsap.from('.hero-buttons', { duration: 1, y: 30, opacity: 0, delay: 1.2, ease: 'power2.out' });
    
    // Animate sections on scroll (if ScrollTrigger is available)
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      
      gsap.from('.about-container', {
        scrollTrigger: '.about-section',
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
      });
      
      gsap.from('.image-carousel', {
        scrollTrigger: '.projects-section',
        duration: 1,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)'
      });
    }
  }

  // Parallax effect for hero background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Particles.js background
  if (window.particlesJS) {
    particlesJS.load('particles-js', '/js/particles.json', function () {
      // Callback after particles config loads
    });
  }

  // Enhanced Image Carousel Functionality
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;
  const totalSlides = carouselSlides.length;

  function updateCarousel() {
    const slideWidth = carouselSlides[0].clientWidth;
    const offset = currentIndex * slideWidth;
    carouselTrack.style.transform = `translateX(-${offset}px)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Indicator click handlers
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Auto-slide every 6 seconds
  let carouselInterval = setInterval(nextSlide, 6000);

  // Pause auto-scroll on mouse enter, resume on mouse leave
  const carousel = document.querySelector('.image-carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
  carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 6000);
  });

  // Responsive: update position on window resize
  window.addEventListener('resize', updateCarousel);
  // Initial position
  updateCarousel();

  // Scroll to top button functionality
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
