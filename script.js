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
    
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    mobileMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
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
    window.addEventListener('scroll', handleNavbarScroll);
    
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
    
    // Setup portfolio handlers
    setupPortfolioHandlers();
    
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
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
});

// Add click outside handler for mobile menu
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileMenu && mobileMenuBtn) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
});

// Prevent default behavior for anchor links and handle smooth scrolling
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
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
📧 Contato: seuemail@email.com
📱 WhatsApp: (XX) XXXXX-XXXX
📸 Instagram: @luizvilel4

Desenvolvido com HTML, CSS e JavaScript puros.
`);