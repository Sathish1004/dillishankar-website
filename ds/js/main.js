// Dilli Shankar Digital Marketing Agency - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    
    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Scroll Animations (Intersection Observer)
    const animElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, we can stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion (Simple toggle)
    const faqCards = document.querySelectorAll('#faq .card');
    faqCards.forEach(card => {
        card.addEventListener('click', () => {
            const icon = card.querySelector('i');
            // Toggle logic could be expanded here
            alert("FAQ answer would expand here!");
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
    
    if (menuBtn && navLinks) {
        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            const icon = menuBtn.querySelector('i') || menuBtn.querySelector('svg');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        };

        menuBtn.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                const icon = menuBtn.querySelector('i') || menuBtn.querySelector('svg');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // Number Counter Animation for Stats
    function animateValue(obj, start, end, duration) {
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // 3D Work Carousel Logic
    const workCarousel = document.getElementById('workCarousel');
    if (workCarousel) {
        const stage = workCarousel;
        const cards = stage.querySelectorAll('.carousel-card');
        const dotsContainer = document.getElementById('workDots');
        const prevBtn = document.getElementById('prevWork');
        const nextBtn = document.getElementById('nextWork');
        
        let currentIndex = Math.floor(cards.length / 2);
        let interval;
        const totalCards = cards.length;

        // Create dots
        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function updateCarousel() {
            cards.forEach((card, i) => {
                let offset = i - currentIndex;
                
                // Handle circular wrap slightly purely for visual distribution
                const absOffset = Math.abs(offset);
                
                // 3D Transform Logic
                const translateX = offset * 250;
                const rotateY = offset * -35;
                const translateZ = absOffset * -400;
                const scale = 1 - (absOffset * 0.15);
                const opacity = 1 - (absOffset * 0.3);
                
                card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
                card.style.opacity = opacity;
                card.style.zIndex = 10 - absOffset;
                
                if (offset === 0) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function next() {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }

        function prev() {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        }

        function goTo(index) {
            currentIndex = index;
            updateCarousel();
        }

        function startAutoScroll() {
            interval = setInterval(next, 4000);
        }

        function stopAutoScroll() {
            clearInterval(interval);
        }

        prevBtn.addEventListener('click', () => {
            prev();
            stopAutoScroll();
            startAutoScroll();
        });

        nextBtn.addEventListener('click', () => {
            next();
            stopAutoScroll();
            startAutoScroll();
        });

        workCarousel.addEventListener('mouseenter', stopAutoScroll);
        workCarousel.addEventListener('mouseleave', startAutoScroll);

        // Initial setup
        updateCarousel();
        startAutoScroll();
    }

    const statsSection = document.querySelector('.stats') || document.querySelector('.hero');
    if (document.getElementById('projects-count')) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateValue(document.getElementById('projects-count'), 0, 329, 2000);
                animateValue(document.getElementById('clients-count'), 0, 76, 2000);
                // animateValue(document.getElementById('services-count'), 0, 10, 2000);
                statsObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.1 });
        statsObserver.observe(document.getElementById('projects-count'));
    }
});
