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
        // Animate number from 0 to 70
        let current = 0;
        const target = 70;
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
// Smooth Infinite Carousel Implementation
class InfiniteCarousel {
    constructor() {
        this.cakeData = [
            {
                image: "images/cake/1.png",
                alt: "Kek 4 Darjat",
                name: "Kek 4 Darjat",
                badge: "Bestseller",
                description: "A layered cake with four levels of flavour and texture, perfect for sharing or special cravings."
            },
            {
                image: "images/cake/2.png",
                alt: "Snowy Cheese",
                name: "Snowy Cheese",
                description: "Light and fluffy cake topped with smooth cheese and a snowy finish that melts in your mouth."
            },
            {
                image: "images/cake/3.png",
                alt: "Pandan Cheese",
                name: "Pandan Cheese",
                badge: "Local Favorite",
                description: "Soft pandan cake with a fragrant aroma, layered with creamy cheese for a balanced sweet and savoury taste."
            },
            {
                image: "images/cake/4.png",
                alt: "Choc Cheese Parut",
                name: "Choc Cheese Parut",
                description: "Rich chocolate cake covered with grated cheese, combining deep cocoa flavour with a savoury twist."
            },
            {
                image: "images/cake/5.png",
                alt: "Red Velvet Tornado",
                name: "Red Velvet Tornado",
                badge: "Signature",
                description: "Moist red velvet cake with a swirl of creamy topping, smooth, slightly tangy, and satisfying."
            },
            {
                image: "images/cake/6.png",
                alt: "Chocolate",
                name: "Chocolate",
                description: "Classic chocolate cake that is soft, rich, and perfect for true chocolate lovers."
            },
            {
                image: "images/cake/7.png",
                alt: "Cookies & Cream",
                name: "Cookies & Cream",
                description: "Creamy cake mixed with crunchy cookie bits for a sweet and playful flavour in every bite."
            },
            {
                image: "images/cake/8.png",
                alt: "Choc Lotus Biscoff",
                name: "Choc Lotus Biscoff",
                badge: "Premium",
                description: "Chocolate cake layered with Lotus Biscoff spread, giving a caramelised and indulgent taste."
            },
            {
                image: "images/cake/9.png",
                alt: "Indulgent Cheese",
                name: "Indulgent Cheese",
                description: "Extra creamy cheese cake made for those who love a rich, bold, and satisfying cheese flavour."
            }
        ];
        
        this.currentIndex = 0;
        this.slideWidth = 332; // 300px + 32px gap
        this.isTransitioning = false;
        this.autoScrollInterval = null;
        this.carousel = null;
        this.totalSlides = this.cakeData.length;
        
        this.init();
    }
    
    init() {
        this.carousel = document.getElementById('cakeWheel');
        if (!this.carousel) {
            console.warn('Cake carousel element not found');
            return;
        }
        
        this.createCarouselItems();
        this.setupEventListeners();
        this.startAutoScroll();
        this.updateResponsiveValues();
    }
    
    createCarouselItems() {
        if (!this.carousel) return;
        
        // Create triple set for smooth infinite scroll
        const allItems = [...this.cakeData, ...this.cakeData, ...this.cakeData];
        
        this.carousel.innerHTML = '';
        
        allItems.forEach((cake) => {
            const cakeElement = this.createCakeElement(cake);
            this.carousel.appendChild(cakeElement);
        });
        
        // Start at the middle set
        this.currentIndex = this.totalSlides;
        this.updateCarouselPosition(false);
    }
    
    createCakeElement(cake) {
        const cakeItem = document.createElement('div');
        cakeItem.className = 'cake-item';
        
        cakeItem.innerHTML = `
            <img src="${cake.image}" alt="${cake.alt}" onerror="this.style.display='none'">
            ${cake.badge ? `<div class="cake-badge">${cake.badge}</div>` : ''}
            <div class="cake-basic-info">
                <h3>${cake.name}</h3>
            </div>
            <div class="cake-hover-description">
                <h3>${cake.name}</h3>
                <p>${cake.description}</p>
                <div class="cake-details">
                    <span class="serving"></span>
                    <span class="price">RM 8.50</span>
                </div>
            </div>
        `;
        
        return cakeItem;
    }
    
    updateCarouselPosition(animate = true) {
        if (!this.carousel) return;
        
        if (animate) {
            this.carousel.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            this.carousel.style.transition = 'none';
        }
        
        const translateX = -this.currentIndex * this.slideWidth;
        this.carousel.style.transform = `translateX(${translateX}px)`;
    }
    
    scrollCarousel(direction) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentIndex += direction;
        
        this.updateCarouselPosition(true);
        this.updateIndicators();
        
        // Handle infinite loop reset
        setTimeout(() => {
            if (this.currentIndex >= this.totalSlides * 2) {
                this.currentIndex = this.totalSlides;
                this.updateCarouselPosition(false);
            } else if (this.currentIndex < this.totalSlides) {
                this.currentIndex = this.totalSlides * 2 - 1;
                this.updateCarouselPosition(false);
            }
            this.isTransitioning = false;
        }, 600);
    }
    
    scrollToSlide(slideIndex) {
        if (this.isTransitioning) return;
        
        this.currentIndex = this.totalSlides + slideIndex;
        this.updateCarouselPosition(true);
        this.updateIndicators();
    }
    
    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        if (indicators.length === 0) return;
        
        const realIndex = this.currentIndex % this.totalSlides;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === realIndex);
        });
    }
    
    updateResponsiveValues() {
        const isMobile = window.innerWidth <= 768;
        this.slideWidth = isMobile ? 282 : 332; // Adjust for mobile gap
    }
    
    startAutoScroll() {
        this.stopAutoScroll();
        this.autoScrollInterval = setInterval(() => {
            this.scrollCarousel(1);
        }, 3000);
    }
    
    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }
    
    setupEventListeners() {
        const container = document.querySelector('.carousel-container');
        if (!container) {
            console.warn('Carousel container not found');
            return;
        }
        
        // Mouse wheel
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.scrollCarousel(e.deltaY > 0 ? 1 : -1);
        }, { passive: false });
        
        // Auto-scroll pause on hover
        container.addEventListener('mouseenter', () => this.stopAutoScroll());
        container.addEventListener('mouseleave', () => this.startAutoScroll());
        
        // Touch/swipe support
        let startX = 0;
        let isDragging = false;
        
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.stopAutoScroll();
        });
        
        container.addEventListener('touchmove', (e) => {
            if (isDragging) e.preventDefault();
        });
        
        container.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                this.scrollCarousel(diffX > 0 ? 1 : -1);
            }
            
            isDragging = false;
            this.startAutoScroll();
        });
        
        // Mouse drag support
        let mouseStartX = 0;
        let isMouseDragging = false;
        
        container.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isMouseDragging = true;
            this.stopAutoScroll();
            container.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isMouseDragging) e.preventDefault();
        });
        
        document.addEventListener('mouseup', (e) => {
            if (!isMouseDragging) return;
            
            const endX = e.clientX;
            const diffX = mouseStartX - endX;
            
            if (Math.abs(diffX) > 50) {
                this.scrollCarousel(diffX > 0 ? 1 : -1);
            }
            
            isMouseDragging = false;
            container.style.cursor = 'grab';
            this.startAutoScroll();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.scrollCarousel(-1);
            } else if (e.key === 'ArrowRight') {
                this.scrollCarousel(1);
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.updateResponsiveValues();
            this.updateCarouselPosition(false);
        });
    }
}

// Global functions for button clicks
function scrollCarousel(direction) {
    if (window.carouselInstance) {
        window.carouselInstance.scrollCarousel(direction);
    }
}

function scrollToSlide(slideIndex) {
    if (window.carouselInstance) {
        window.carouselInstance.scrollToSlide(slideIndex);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.carouselInstance = new InfiniteCarousel();
});
// Team Carousel Implementation
class TeamCarousel {
    constructor() {
        this.teamData = [
            {
                image: "images/team/Picture1.jpg",
                name: "Muhammad Daniel Haikal",
                role: "General Manager"
            },
            {
                image: "images/team/Picture2.jpg",
                name: "Nur Sahira Nabilah",
                role: "Assistant Manager"
            },
            {
                image: "images/team/Picture3.png",
                name: "Muhammad Hafizuddin",
                role: "Finance Manager"
            },
            {
                image: "images/team/Picture4.jpg",
                name: "Mohamad Loqmanul Hakim",
                role: "Operating Manager"
            },
            {
                image: "images/team/Picture5.jpg",
                name: "Sarah Aisyah",
                role: "Marketing Manager"
            },
            {
                image: "images/team/Picture6.jpg",
                name: "Nurfathiah Atiqah",
                role: "Advertising Manager"
            },
            {
                image: "images/team/Picture7.jpg",
                name: "Nur Alia Adriana",
                role: "Customer Service"
            },
            {
                image: "images/team/Picture8.png",
                name: "Mohammed Umair",
                role: "Customer Service Manager"
            },
            {
                image: "images/team/Picture9.png",
                name: "Farith Shazry",
                role: "Assistant Sales Manager"
            },
            {
                image: "images/team/Picture10.jpg",
                name: "Muhammad Amirul Amsyar",
                role: "Sales Manager"
            },
            {
                image: "images/team/Picture11.png",
                name: "Abdullah Edhah Saleh",
                role: "Sales"
            }
        ];
        
        this.carousel = null;
        this.totalSlides = this.teamData.length;
        
        this.init();
    }
    
    init() {
        this.carousel = document.getElementById('teamWheel');
        if (!this.carousel) {
            console.warn('Team carousel element not found');
            return;
        }
        
        this.createTeamItems();
        this.setupEventListeners();
    }
    
    createTeamItems() {
        if (!this.carousel) return;
        
        // Create multiple sets for seamless infinite scroll
        const allItems = [...this.teamData, ...this.teamData, ...this.teamData];
        
        this.carousel.innerHTML = '';
        
        allItems.forEach((member) => {
            const memberElement = this.createTeamElement(member);
            this.carousel.appendChild(memberElement);
        });
    }
    
    createTeamElement(member) {
        const teamMember = document.createElement('div');
        teamMember.className = 'team-member';
        
        teamMember.innerHTML = `
            <img src="${member.image}" alt="${member.name}" onerror="this.style.display='none'">
            <h4>${member.name}</h4>
            <p class="role">${member.role}</p>
        `;
        
        return teamMember;
    }
    
    setupEventListeners() {
        const container = document.querySelector('.team-carousel-container');
        if (!container) {
            console.warn('Team carousel container not found');
            return;
        }
        
        // Pause animation on hover
        container.addEventListener('mouseenter', () => {
            if (this.carousel) {
                this.carousel.style.animationPlayState = 'paused';
            }
        });
        
        container.addEventListener('mouseleave', () => {
            if (this.carousel) {
                this.carousel.style.animationPlayState = 'running';
            }
        });
    }
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        window.carouselInstance = new InfiniteCarousel();
        window.teamCarouselInstance = new TeamCarousel();
    } catch (error) {
        console.error('Error initializing carousels:', error);
    }
});

// Sprinkle trail cursor effect
document.addEventListener('DOMContentLoaded', function() {
    const sprinkleColors = ['#FF69B4', '#FFD700', '#00CED1', '#FF6347', '#98FB98', '#DDA0DD', '#F0E68C', '#87CEEB'];
    const sprinkleShapes = ['●', '▲', '■', '♦', '★', '✦', '◆', '▼'];
    let sprinkles = [];
    
    // Create sprinkle container
    const sprinkleContainer = document.createElement('div');
    sprinkleContainer.className = 'sprinkle-container';
    sprinkleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999;
    `;
    document.body.appendChild(sprinkleContainer);
    
    // Track mouse movement and create sprinkles
    document.addEventListener('mousemove', function(e) {
        createSprinkle(e.clientX, e.clientY);
    });
    
    function createSprinkle(x, y) {
        const sprinkle = document.createElement('div');
        const color = sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)];
        const shape = sprinkleShapes[Math.floor(Math.random() * sprinkleShapes.length)];
        const size = Math.random() * 8 + 4; // 4-12px
        const rotation = Math.random() * 360;
        const velocityX = (Math.random() - 0.5) * 4;
        const velocityY = Math.random() * 2 + 1;
        
        sprinkle.textContent = shape;
        sprinkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            color: ${color};
            font-size: ${size}px;
            transform: rotate(${rotation}deg);
            pointer-events: none;
            user-select: none;
            z-index: 999;
        `;
        
        sprinkleContainer.appendChild(sprinkle);
        
        // Store sprinkle data for animation
        const sprinkleData = {
            element: sprinkle,
            x: x,
            y: y,
            velocityX: velocityX,
            velocityY: velocityY,
            rotation: rotation,
            rotationSpeed: (Math.random() - 0.5) * 10,
            life: 1.0,
            decay: Math.random() * 0.02 + 0.01
        };
        
        sprinkles.push(sprinkleData);
        
        // Remove old sprinkles to prevent memory issues
        if (sprinkles.length > 100) {
            const oldSprinkle = sprinkles.shift();
            if (oldSprinkle.element.parentNode) {
                oldSprinkle.element.parentNode.removeChild(oldSprinkle.element);
            }
        }
    }
    
    // Animate sprinkles
    function animateSprinkles() {
        for (let i = sprinkles.length - 1; i >= 0; i--) {
            const sprinkle = sprinkles[i];
            
            // Update position
            sprinkle.x += sprinkle.velocityX;
            sprinkle.y += sprinkle.velocityY;
            sprinkle.velocityY += 0.1; // Gravity
            sprinkle.rotation += sprinkle.rotationSpeed;
            
            // Update life
            sprinkle.life -= sprinkle.decay;
            
            // Apply changes to element
            sprinkle.element.style.left = sprinkle.x + 'px';
            sprinkle.element.style.top = sprinkle.y + 'px';
            sprinkle.element.style.transform = `rotate(${sprinkle.rotation}deg)`;
            sprinkle.element.style.opacity = sprinkle.life;
            
            // Remove dead sprinkles
            if (sprinkle.life <= 0 || sprinkle.y > window.innerHeight + 50) {
                if (sprinkle.element.parentNode) {
                    sprinkle.element.parentNode.removeChild(sprinkle.element);
                }
                sprinkles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animateSprinkles);
    }
    
    // Start animation
    animateSprinkles();
});
// Background Music Control
document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    let musicStarted = false;
    
    // Function to start music
    function startBackgroundMusic() {
        if (!musicStarted && backgroundMusic) {
            backgroundMusic.muted = false; // Unmute the audio
            backgroundMusic.play().then(() => {
                console.log('Background music started');
                musicStarted = true;
            }).catch(error => {
                console.log('Could not start background music:', error);
            });
        }
    }
    
    // Start music on first user interaction
    function handleFirstInteraction() {
        startBackgroundMusic();
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
    }
    
    // Add event listeners for user interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    
    // Volume control (optional - set to a comfortable level)
    if (backgroundMusic) {
        backgroundMusic.volume = 0.8; // 30% volume
    }
});