// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const scrollY = window.scrollY;

    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    if (!mobileMenu || !mobileMenuBtn) return;

    mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', String(mobileMenu.classList.contains('active')));
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    if (!mobileMenu || !mobileMenuBtn) return;

    mobileMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .portfolio-item, .contact-card, .stat-card, .about-text'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}



// Portfolio item click handlers
function setupPortfolioHandlers() {
    const portfolioBtns = document.querySelectorAll('.portfolio-btn');

    portfolioBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.classList.contains('disabled')) {
                e.preventDefault(); // impede apenas se for "em breve"
                alert('Projeto em desenvolvimento! Em breve você poderá ver mais detalhes.');
            }
        });
    });
}



// Portfolio carousel
function setupPortfolioCarousel() {
    const carousel = document.getElementById('portfolioCarousel');
    const track = carousel ? carousel.querySelector('.portfolio-track') : null;
    const prevBtn = document.getElementById('portfolioPrev');
    const nextBtn = document.getElementById('portfolioNext');
    const dotsContainer = document.getElementById('portfolioDots');

    if (!carousel || !track || !prevBtn || !nextBtn || !dotsContainer) return;

    const slides = Array.from(track.querySelectorAll('.portfolio-item'));
    if (!slides.length) return;

    const AUTO_PLAY_DELAY = 4500;
    let currentIndex = 0;
    let startX = 0;
    let autoplayTimer = null;

    const setSlideAccessibility = (slide, isActive) => {
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));

        const focusableItems = slide.querySelectorAll('a, button');
        focusableItems.forEach((item) => {
            if (isActive) {
                item.removeAttribute('tabindex');
            } else {
                item.setAttribute('tabindex', '-1');
            }
        });
    };

    const dots = slides.map((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'portfolio-dot';
        dot.setAttribute('aria-label', `Ir para projeto ${index + 1}`);
        dot.addEventListener('click', () => {
            goToSlide(index, true);
        });
        dotsContainer.appendChild(dot);
        return dot;
    });

    function updateCarousel() {
        slides.forEach((slide, index) => {
            setSlideAccessibility(slide, index === currentIndex);
        });

        dots.forEach((dot, index) => {
            const isActive = index === currentIndex;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }

    function goToSlide(index, userInitiated = false) {
        currentIndex = (index + slides.length) % slides.length;
        updateCarousel();

        if (userInitiated) {
            restartAutoplay();
        }
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function startAutoplay() {
        if (autoplayTimer) return;

        autoplayTimer = setInterval(() => {
            goToSlide(currentIndex + 1, false);
        }, AUTO_PLAY_DELAY);
    }

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1, true);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1, true);
    });

    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToSlide(currentIndex - 1, true);
        }

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToSlide(currentIndex + 1, true);
        }
    });

    carousel.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].clientX;
        stopAutoplay();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const delta = endX - startX;

        if (Math.abs(delta) >= 40) {
            if (delta > 0) {
                goToSlide(currentIndex - 1, true);
            } else {
                goToSlide(currentIndex + 1, true);
            }
        }

        startAutoplay();
    }, { passive: true });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', (e) => {
        if (!carousel.contains(e.relatedTarget)) {
            startAutoplay();
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    updateCarousel();
    startAutoplay();
}

// Form validation (if you add a contact form later)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Typing animation for hero title
function setupTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
}

// Parallax effect for hero background
function setupParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    });
}

// Add loading class to body initially
document.body.classList.add('loading');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading class
    document.body.classList.remove('loading');
    
    // Setup event listeners
    handleNavbarScroll();

    // Mobile menu event listeners
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Mobile menu links event listeners
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Regular nav links event listeners
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Setup intersection observer for animations
    setupIntersectionObserver();

    // Update footer year automatically
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = String(new Date().getFullYear());
    }
    
    // Setup portfolio handlers
    setupPortfolioHandlers();

    // Setup portfolio carousel
    setupPortfolioCarousel();
    

    
    // Setup typing animation (optional - uncomment if you want it)
    // setupTypingAnimation();
    
    // Setup parallax effect (optional - uncomment if you want it)
    // setupParallaxEffect();
    
    // Add smooth reveal animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in-up');
        }, 200);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (mobileMenu && mobileMenuBtn) {
            closeMobileMenu();
        }
    }
});

// Add click outside handler for mobile menu
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileMenu && mobileMenuBtn) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    }
});

// Prevent default behavior for anchor links and handle smooth scrolling
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    e.preventDefault();
    const targetId = anchor.getAttribute('href').substring(1);
    scrollToSection(targetId);
});

// Add performance optimization for scroll events
let ticking = false;

function updateNavbar() {
    handleNavbarScroll();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Console welcome message
console.log(`
🚀 Portfolio de Luiz Vilela - Desenvolvedor Web
📧 Contato: luizvilel4@gmail.com
📱 WhatsApp: (11) 97219-2244
📸 Instagram: @_luizvilela

Desenvolvido com HTML, CSS e JavaScript puros.
`);
