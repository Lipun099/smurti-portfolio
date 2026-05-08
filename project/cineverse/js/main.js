document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // =====================
    // 1. NAVBAR INTERACTIONS
    // =====================
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Update active nav link based on scroll
    const updateActiveNav = () => {
        const sections = document.querySelectorAll('section');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Set home as active by default at top
        if (window.scrollY < 100) {
            navLinks[0].classList.add('active');
        }
    };

    window.addEventListener('scroll', updateActiveNav);

    // =====================
    // 2. SCROLL ANIMATIONS
    // =====================
    
    // Reveal on Scroll Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });

    // =====================
    // 3. CAROUSEL INTERACTION
    // =====================
    const setupCarousel = () => {
        const carousels = document.querySelectorAll('.carousel-wrapper');
        
        carousels.forEach(carousel => {
            let isDown = false;
            let startX;
            let scrollLeft;

            carousel.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
                carousel.style.cursor = 'grabbing';
            });

            carousel.addEventListener('mouseleave', () => {
                isDown = false;
                carousel.style.cursor = 'grab';
            });

            carousel.addEventListener('mouseup', () => {
                isDown = false;
                carousel.style.cursor = 'grab';
            });

            carousel.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - carousel.offsetLeft;
                const walk = (x - startX) * 1.5;
                carousel.scrollLeft = scrollLeft - walk;
            });

            // Touch support
            carousel.addEventListener('touchstart', (e) => {
                isDown = true;
                startX = e.touches[0].pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });

            carousel.addEventListener('touchend', () => {
                isDown = false;
            });

            carousel.addEventListener('touchmove', (e) => {
                if (!isDown) return;
                const x = e.touches[0].pageX - carousel.offsetLeft;
                const walk = (x - startX) * 1.5;
                carousel.scrollLeft = scrollLeft - walk;
            });
        });
    };

    setupCarousel();

    // =====================
    // 4. FEATURED CARD INTERACTIONS
    // =====================
    const featuredCards = document.querySelectorAll('.featured-card');

    featuredCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = 'var(--glow-gold-strong)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });

        // Play button click
        const playBtn = card.querySelector('.card-play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const title = card.querySelector('.card-info h3')?.textContent;
                console.log('Playing:', title);
                // Trigger play action
                showNotification(`Now playing: ${title}`);
            });
        }
    });

    // =====================
    // 5. BUTTON INTERACTIONS
    // =====================
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // =====================
    // 6. CATEGORY CARDS
    // =====================
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3')?.textContent;
            showNotification(`Exploring: ${title}`);
        });
    });

    // =====================
    // 7. CTA INTERACTIONS
    // =====================
    const ctaButtons = document.querySelectorAll('.cta-section .btn');

    ctaButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (index === 0) {
                showNotification('Starting your free trial! 🎬');
            } else {
                showNotification('Opening information page...');
            }
        });
    });

    // =====================
    // 8. HERO SECTION
    // =====================
    const scrollToContent = () => {
        const nextSection = document.querySelector('.featured-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', scrollToContent);
    }

    // =====================
    // 9. SMOOTH SCROLL
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // =====================
    // 10. PARALLAX EFFECT
    // =====================
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // =====================
    // 11. NOTIFICATION SYSTEM
    // =====================
    window.showNotification = (message, duration = 3000) => {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(198, 161, 91, 0.9);
            color: #0a0a0a;
            padding: 1rem 1.5rem;
            border-radius: 2px;
            font-weight: 600;
            z-index: 9999;
            animation: slideInFromRight 0.4s ease-out;
            backdrop-filter: blur(10px);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInFromLeft 0.4s ease-out reverse';
            setTimeout(() => notification.remove(), 400);
        }, duration);
    };

    // =====================
    // 12. SCROLL PROGRESS BAR
    // =====================
    const updateScrollProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        
        // Optional: Can be used to show a progress indicator
        document.documentElement.style.setProperty('--scroll-progress', `${scrolled}%`);
    };

    window.addEventListener('scroll', updateScrollProgress);

    // =====================
    // 13. KEYBOARD SHORTCUTS
    // =====================
    document.addEventListener('keydown', (e) => {
        // Press 'P' for play on featured card
        if (e.key.toLowerCase() === 'p') {
            const firstPlayBtn = document.querySelector('.card-play-btn');
            if (firstPlayBtn) firstPlayBtn.click();
        }

        // Press 'T' to scroll to top smoothly
        if (e.key.toLowerCase() === 't') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // =====================
    // 14. HOVER GLOW EFFECTS
    // =====================
    const setupHoverGlows = () => {
        const glowElements = document.querySelectorAll('.btn, .featured-card, .category-card');

        glowElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                el.style.setProperty('--mouse-x', `${x}px`);
                el.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    };

    setupHoverGlows();

    // =====================
    // 15. LAZY LOAD IMAGES
    // =====================
    const setupLazyLoad = () => {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    setupLazyLoad();

    // =====================
    // 16. INITIALIZE ALL
    // =====================
    console.log('🎬 CineVerse loaded successfully');
    
    // Re-initialize icons when DOM changes
    setInterval(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 1000);
});
