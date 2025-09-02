// ===============================================
// ACM ELECTRICAL & TRADING - ENHANCED JAVASCRIPT
// Modern, Interactive, & Performance Optimized
// ===============================================

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');
const loadingScreen = document.getElementById('loading-screen');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    hideLoadingScreen();
    setupNavigation();
    setupScrollEffects();
    setupAnimations();
    setupFormHandling();
    setupGallery();
    setupTestimonials();
    setupServiceFilters();
    setupCounters();
    setupUtilityButtons();
    setupLazyLoading();
    setupPerformanceOptimizations();
    
    console.log('🚗 ACM Electrical & Trading website loaded successfully!');
}

// Loading Screen
function hideLoadingScreen() {
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);
}

// Enhanced Navigation
function setupNavigation() {
    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });

        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Active nav link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', highlightNavLink);
}

// Enhanced Scroll Effects
function setupScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.scrollY;
        
        // Navbar scroll effect
        if (navbar) {
            if (scrolled > 50) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        }

        // Parallax effects
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroContent = heroSection.querySelector('.hero-content');
            const parallaxSpeed = scrolled * 0.5;
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${parallaxSpeed}px)`;
            }
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Enhanced Animations
function setupAnimations() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out-cubic',
            once: true,
            mirror: false,
            offset: 100,
            delay: 0,
        });
    }

    // Typing animation for hero subtitle
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        typingText.style.borderRight = '3px solid #f59e0b';

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typingText.style.borderRight = 'none';
                }, 1000);
            }
        }

        setTimeout(typeWriter, 2500);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3, // Increased threshold for more precise triggering
        rootMargin: '0px 0px -10% 0px' // Trigger when 30% visible and not at bottom edge
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Start counters when stats section is visible
                if (entry.target.classList.contains('stats-section') || 
                    entry.target.classList.contains('hero-stats')) {
                    // Slight delay to ensure smooth animation start
                    setTimeout(() => {
                        startCounters();
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .feature, .contact-item, .gallery-item, .testimonial-card, .stat-card, .stats-section, .hero-stats'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced Form Handling
function setupFormHandling() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });

        // Real-time form validation
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(e);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required.');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address.');
        return false;
    }
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number.');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

function clearFieldError(e) {
    const field = e.target;
    const errorMsg = field.parentNode.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
    field.classList.remove('error', 'success');
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        animation: slideDown 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

function showFieldSuccess(field) {
    field.classList.add('success');
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate all fields
    const formInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    formInputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showAlert('Please correct the errors above.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showAlert('Thank you for your message! We will contact you within 24 hours.', 'success');
        form.reset();
        
        // Clear field states
        formInputs.forEach(input => {
            input.classList.remove('error', 'success');
        });
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Send data to analytics or backend
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: 'Contact Form'
            });
        }
        
    }, 2000);
}

// Validation functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^\+?[\d\s\-\(\)]{8,}$/.test(phone);
}

// Enhanced Alert System
function showAlert(message, type, duration = 5000) {
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `custom-alert custom-alert-${type}`;
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
    
    alert.innerHTML = `
        <div class="alert-content">
            <i class="${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
    `;
    
    if (type === 'success') {
        alert.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else {
        alert.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    }
    
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.style.cssText = `
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentElement) {
            alert.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }
    }, duration);
}

// Gallery Enhancement
function setupGallery() {
    initializeGalleryFilters();
    initializeGalleryLightbox();
}

function initializeGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn, .category-btn');
    const items = document.querySelectorAll('.gallery-item, .service-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter') || btn.getAttribute('data-category');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            items.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializeGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('.gallery-content h4')?.textContent || 'Gallery Image';
            openLightbox(img.src, title);
        });
    });
}

// Enhanced Lightbox
function openLightbox(imageSrc, title) {
    const lightbox = document.createElement('div');
    lightbox.className = 'custom-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="lightbox-image-container">
                <img src="${imageSrc}" alt="${title}" class="lightbox-image">
                <div class="lightbox-loader">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
            </div>
            <div class="lightbox-title">${title}</div>
            <div class="lightbox-actions">
                <button class="lightbox-btn" onclick="downloadImage('${imageSrc}', '${title}')">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="lightbox-btn" onclick="shareImage('${title}')">
                    <i class="fas fa-share"></i> Share
                </button>
            </div>
        </div>
    `;
    
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        animation: fadeIn 0.3s ease forwards;
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    const img = lightbox.querySelector('.lightbox-image');
    const loader = lightbox.querySelector('.lightbox-loader');
    
    img.addEventListener('load', () => {
        loader.style.display = 'none';
        img.style.opacity = '1';
    });
    
    // Close handlers
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const backdrop = lightbox.querySelector('.lightbox-backdrop');
    
    function closeLightbox() {
        lightbox.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);
    
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Testimonials Slider
function setupTestimonials() {
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length === 0) return;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
        }
    }
    
    // Auto-advance testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Manual controls
    window.changeTestimonial = function(direction) {
        currentTestimonial = (currentTestimonial + direction + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    };
    
    window.goToTestimonial = function(index) {
        currentTestimonial = index - 1;
        showTestimonial(currentTestimonial);
    };
    
    // Touch/swipe support
    let startX = 0;
    const testimonialTrack = document.querySelector('.testimonial-track');
    
    if (testimonialTrack) {
        testimonialTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        testimonialTrack.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    changeTestimonial(1);
                } else {
                    changeTestimonial(-1);
                }
            }
        });
    }
}

// Animated Counters with Enhanced Performance
let countersStarted = false; // Prevent multiple counter starts

function setupCounters() {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Immediately show final values for users who prefer reduced motion
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            counter.textContent = target.toLocaleString();
        });
        return;
    }
}

function startCounters() {
    if (countersStarted) return; // Prevent multiple starts
    countersStarted = true;

    const counters = document.querySelectorAll('[data-count]');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Instantly show final values
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            counter.textContent = target.toLocaleString();
            counter.classList.add('counted');
        });
        return;
    }

    const counterPromises = [];

    counters.forEach(counter => {
        if (counter.classList.contains('counted')) return;

        const target = parseInt(counter.getAttribute('data-count'));
        // Dynamic duration based on number size for better UX
        const duration = Math.min(1000, Math.max(500, target * 0.1)); 
        
        let current = 0;
        counter.classList.add('counted');

        // Create promise for each counter animation
        const counterPromise = new Promise((resolve) => {
            const startTime = performance.now();

            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Enhanced easing function for more natural feel
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                current = target * easeOutQuart;

                if (progress < 1) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target.toLocaleString();
                    resolve();
                }
            }

            // Start animation immediately with requestAnimationFrame
            requestAnimationFrame(animate);
        });

        counterPromises.push(counterPromise);
    });

    // Optional: Handle when all counters are done
    Promise.all(counterPromises).then(() => {
        console.log('✅ All counters finished animating with optimized timing');
        
        // Analytics tracking if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'animation_complete', {
                event_category: 'User Engagement',
                event_label: 'Counter Animation'
            });
        }
    });
}// Utility Buttons (Scroll to Top, WhatsApp)
function setupUtilityButtons() {
    createScrollToTopButton();
    createWhatsAppButton();
}

function createScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    document.body.appendChild(scrollToTopBtn);
    
    function toggleScrollButton() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', toggleScrollButton);
}

function createWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/97455082990?text=Hello%2C%20I%20need%20automotive%20service%20assistance.';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.className = 'whatsapp-btn';
    whatsappBtn.setAttribute('aria-label', 'Contact us on WhatsApp');
    
    document.body.appendChild(whatsappBtn);
    
    whatsappBtn.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'Contact',
                event_label: 'WhatsApp Button'
            });
        }
    });
}

// Lazy Loading
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Error handling for images
    document.addEventListener('DOMContentLoaded', () => {
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            img.addEventListener('error', function() {
                this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23ddd" width="400" height="300"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">ACM Electrical</text></svg>';
                this.alt = 'ACM Electrical & Trading - Image not available';
            });
        });
    });
}

// Performance Optimizations
function setupPerformanceOptimizations() {
    // Preload critical resources
    const preloadLinks = [
        'css/style.css',
        'js/script.js'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = href.includes('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
    
    // Service Worker registration (if available)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}

// Service Filters
function setupServiceFilters() {
    const serviceCategories = document.querySelectorAll('.category-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCategories.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active button
            serviceCategories.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter service cards
            serviceCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Utility Functions
function downloadImage(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'acm-electrical-image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function shareImage(title) {
    if (navigator.share) {
        navigator.share({
            title: `${title} - ACM Electrical & Trading`,
            text: 'Check out our professional automotive services!',
            url: window.location.href
        });
    } else {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href).then(() => {
            showAlert('Link copied to clipboard!', 'success', 2000);
        });
    }
}

// Video Modal Functions
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    
    // Replace with actual video URL
    iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    
    iframe.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Phone tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'Contact',
                event_label: 'Phone Call',
                value: link.href
            });
        }
    });
});

// Add required CSS animations
const additionalStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .custom-lightbox .lightbox-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(5px);
    }
    
    .custom-lightbox .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
        z-index: 2;
    }
    
    .custom-lightbox .lightbox-image-container {
        position: relative;
        margin-bottom: 2rem;
    }
    
    .custom-lightbox .lightbox-image {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .custom-lightbox .lightbox-loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 2rem;
    }
    
    .custom-lightbox .lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    }
    
    .custom-lightbox .lightbox-close:hover {
        background: #2563eb;
        transform: scale(1.1);
    }
    
    .custom-lightbox .lightbox-title {
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
    }
    
    .custom-lightbox .lightbox-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    
    .custom-lightbox .lightbox-btn {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    }
    
    .custom-lightbox .lightbox-btn:hover {
        background: #2563eb;
        border-color: #2563eb;
        transform: translateY(-2px);
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        background-color: #fef2f2;
    }
    
    .form-group input.success,
    .form-group select.success,
    .form-group textarea.success {
        border-color: #10b981;
        background-color: #f0fdf4;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

console.log('🚗 ACM Electrical & Trading - Enhanced JavaScript loaded successfully!');
