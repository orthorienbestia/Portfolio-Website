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

  // Hero background particles using Three.js (online CDN)
  // Remove old particles.js code and add Three.js animated icon particles
  const heroBg = document.getElementById('particles-js');
  if (heroBg) {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = 0;
    heroBg.appendChild(canvas);

    // Icon URLs (SVG/PNG, transparent background, 48x48 or 64x64 recommended)
    const iconUrls = [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg'
    ];

    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.min.js';
    script.onload = () => {
      // Load all icon textures
      const loader = new THREE.TextureLoader();
      Promise.all(iconUrls.map(url => new Promise(resolve => loader.load(url, resolve))))
        .then(textures => {
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, heroBg.offsetWidth / heroBg.offsetHeight, 0.1, 1000);
          const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
          renderer.setSize(heroBg.offsetWidth, heroBg.offsetHeight);
          renderer.setClearColor(0x000000, 0); // transparent

          // Create icon particles
          const particles = 24; // Fewer, less distracting
          const sprites = [];
          for (let i = 0; i < particles; i++) {
            const texture = textures[Math.floor(Math.random() * textures.length)];
            const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.18 }); // dim
            const sprite = new THREE.Sprite(material);
            sprite.position.set(
              (Math.random() - 0.5) * 32,
              (Math.random() - 0.5) * 32,
              (Math.random() - 0.5) * 32
            );
            sprite.scale.set(1.7, 1.7, 1); // Smaller size
            scene.add(sprite);
            sprites.push(sprite);
          }

          camera.position.z = 24;

          function animate() {
            requestAnimationFrame(animate);
            // Rotate all sprites slowly
            sprites.forEach((sprite, idx) => {
              sprite.position.x += Math.sin(Date.now() * 0.0003 + idx) * 0.01;
              sprite.position.y += Math.cos(Date.now() * 0.0002 + idx) * 0.01;
            });
            scene.rotation.y += 0.0012;
            scene.rotation.x += 0.0006;
            renderer.render(scene, camera);
          }
          animate();
          window.addEventListener('resize', () => {
            camera.aspect = heroBg.offsetWidth / heroBg.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(heroBg.offsetWidth, heroBg.offsetHeight);
          });
        });
    };
    document.body.appendChild(script);
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
