// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Order button functionality (only for contact section now)
document.addEventListener('DOMContentLoaded', function() {
    // Handle any remaining order buttons (if any exist outside the gallery)
    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Redirect to Google Form for ordering
            window.open('https://forms.gle/kSWggAfNjSCoh7nu9', '_blank');
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Add loading animation for cake cards
document.addEventListener('DOMContentLoaded', function() {
    const cakeCards = document.querySelectorAll('.cake-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const statItems = document.querySelectorAll('.stat-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate cake cards
    cakeCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Animate testimonial cards
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate stats with counter effect
    statItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
        
        // Add counter animation for numbers
        const numberElement = item.querySelector('h3');
        const finalNumber = numberElement.textContent;
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(numberElement, finalNumber);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(item);
    });
});

// Counter animation function
function animateCounter(element, finalText) {
    const isRating = finalText.includes('/');
    const isPercentage = finalText.includes('%');
    const isNumber = finalText.includes('+');
    
    if (isRating) {
        // Animate rating from 0.0 to 4.9
        let current = 0;
        const target = 4.9;
        const increment = target / 30;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current.toFixed(1) + '/5';
        }, 50);
    } else if (isPercentage) {
        // Animate percentage from 0 to 98
        let current = 0;
        const target = 98;
        const increment = target / 30;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current) + '%';
        }, 50);
    } else if (isNumber) {
        // Animate number from 0 to 500
        let current = 0;
        const target = 500;
        const increment = target / 30;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current) + '+';
        }, 50);
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('mobile-active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('mobile-active');
    }
});

// Add some interactive hover effects
document.querySelectorAll('.cake-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});