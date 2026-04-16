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

    // Mobile Menu Toggle (Simplified)
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            alert("Mobile menu clicked! In a full implementation, this would open a slide-out drawer.");
        });
    }

    // Number Counter Animation for Stats
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + (end === 350 ? '+' : '+');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
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
