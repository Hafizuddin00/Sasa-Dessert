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

// Order button functionality
document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function() {
        const cakeCard = this.closest('.cake-card');
        const cakeName = cakeCard.querySelector('h3').textContent;
        const cakePrice = cakeCard.querySelector('.price').textContent;
        
        // Simple order alert (in a real app, this would integrate with a payment system)
        alert(`Thank you for your interest in ${cakeName}!\n\nPrice: ${cakePrice}\n\nTo place an order, please call us at (555) 123-CAKE or email orders@sasadessert.com`);
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
    
    cakeCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Add some interactive hover effects
document.querySelectorAll('.cake-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});