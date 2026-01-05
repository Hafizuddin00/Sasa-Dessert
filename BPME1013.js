// BPME1013 Page JavaScript Functionality
// Business Progress Management and Photo Gallery

// Global variables for photo gallery
let currentPhotoIndex = 0;
let currentPhotos = [];
let originalPhotoItems = []; // Store original photo items

// Mobile menu toggle (reuse from main site)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Photo Gallery Functions
function initializePhotoGallery() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const photoItems = document.querySelectorAll('.photo-item');
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDate = document.getElementById('modalDate');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');

    // Store original photo items
    originalPhotoItems = Array.from(photoItems).map(item => item.cloneNode(true));

    // Update current photos array
    updateCurrentPhotos('all');

    // Category filter functionality
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter photos
            filterPhotos(category);
            updateCurrentPhotos(category);
        });
    });

    // Photo click to open modal - Initial setup
    const initialPhotoItems = document.querySelectorAll('.photo-item');
    initialPhotoItems.forEach((item) => {
        attachPhotoEventListeners(item);
    });

    // Modal close functionality
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Modal navigation
    if (modalPrev) {
        modalPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            navigateModal(-1);
        });
    }

    if (modalNext) {
        modalNext.addEventListener('click', function(e) {
            e.stopPropagation();
            navigateModal(1);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal && modal.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    navigateModal(-1);
                    break;
                case 'ArrowRight':
                    navigateModal(1);
                    break;
            }
        }
    });

    // Image loading animation (only for actual images, not placeholders)
    const images = document.querySelectorAll('.photo-card img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Handle image errors
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
            this.style.opacity = '1';
        });
    });
}

function filterPhotos(category) {
    const photoGallery = document.querySelector('.photo-gallery');
    
    if (category === 'all') {
        // Show all photos in mixed layout
        photoGallery.classList.remove('organized');
        photoGallery.innerHTML = '';
        
        // Add all original photos back in mixed order
        originalPhotoItems.forEach((originalItem, index) => {
            const clonedItem = originalItem.cloneNode(true);
            clonedItem.classList.remove('hidden');
            photoGallery.appendChild(clonedItem);
            
            // Re-attach event listeners to cloned items
            attachPhotoEventListeners(clonedItem);
            
            // Add staggered animation
            setTimeout(() => {
                clonedItem.style.opacity = '1';
                clonedItem.style.transform = 'scale(1)';
            }, index * 50);
        });
    } else {
        // Organize photos by category
        organizePhotosByCategory(category);
    }
}

function organizePhotosByCategory(selectedCategory) {
    const photoGallery = document.querySelector('.photo-gallery');
    
    // Add organized class for different styling
    photoGallery.classList.add('organized');
    photoGallery.innerHTML = '';
    
    // Group photos by category
    const categories = {
        'team': { title: '👥 Team Moments', items: [] },
        'products': { title: '🍰 Our Products', items: [] },
        'events': { title: '🎉 Events & Milestones', items: [] },
        'workspace': { title: '🏢 Workspace', items: [] }
    };
    
    // Collect photos by category from original items
    originalPhotoItems.forEach(originalItem => {
        const itemCategory = originalItem.getAttribute('data-category');
        if (categories[itemCategory]) {
            categories[itemCategory].items.push(originalItem.cloneNode(true));
        }
    });
    
    // Create organized layout
    let delay = 0;
    Object.keys(categories).forEach(categoryKey => {
        const categoryData = categories[categoryKey];
        
        if (categoryData.items.length > 0 && (selectedCategory === 'all' || categoryKey === selectedCategory)) {
            // Create category group
            const categoryGroup = document.createElement('div');
            categoryGroup.className = 'category-group';
            
            // Add category title
            const categoryTitle = document.createElement('h3');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = categoryData.title;
            categoryTitle.style.animationDelay = `${delay * 0.1}s`;
            categoryGroup.appendChild(categoryTitle);
            
            // Create items container
            const categoryItems = document.createElement('div');
            categoryItems.className = 'category-items';
            
            // Add photos to category
            categoryData.items.forEach((item, index) => {
                if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
                    item.classList.remove('hidden');
                    categoryItems.appendChild(item);
                    
                    // Re-attach event listeners to cloned items
                    attachPhotoEventListeners(item);
                    
                    // Add staggered animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, (delay + index + 1) * 100);
                } else {
                    item.classList.add('hidden');
                }
            });
            
            categoryGroup.appendChild(categoryItems);
            photoGallery.appendChild(categoryGroup);
            delay += categoryData.items.length + 1;
        }
    });
}

function attachPhotoEventListeners(photoItem) {
    const photoCard = photoItem.querySelector('.photo-card, .polaroid-card');
    if (photoCard) {
        // Remove any existing event listeners by cloning the element
        const newPhotoCard = photoCard.cloneNode(true);
        photoCard.parentNode.replaceChild(newPhotoCard, photoCard);
        
        // Add click event listener
        newPhotoCard.addEventListener('click', function() {
            // Check if it's a placeholder card or polaroid card
            if (this.classList.contains('placeholder-card') || this.classList.contains('polaroid-card')) {
                // For placeholder/polaroid cards, show a message
                alert('This is a placeholder. Upload your photos to see them here!');
                return;
            }
            
            const img = this.querySelector('img');
            const overlay = this.querySelector('.photo-overlay');
            
            if (img && overlay) {
                currentPhotoIndex = getCurrentPhotoIndex(photoItem);
                openModal(img, overlay);
            }
        });
        
        // Add hover effects for placeholder and polaroid cards
        if (newPhotoCard.classList.contains('placeholder-card') || newPhotoCard.classList.contains('polaroid-card')) {
            newPhotoCard.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.placeholder-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            newPhotoCard.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.placeholder-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        }
    }
}

function updateCurrentPhotos(category) {
    // Get currently visible photo items from the DOM
    const visiblePhotoItems = document.querySelectorAll('.photo-item:not(.hidden)');
    currentPhotos = Array.from(visiblePhotoItems);
}

function getCurrentPhotoIndex(clickedItem) {
    return currentPhotos.findIndex(item => item === clickedItem);
}

function openModal(img, overlay) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDate = document.getElementById('modalDate');
    
    if (modalImage && modalTitle && modalDescription && modalDate) {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = overlay.querySelector('h4').textContent;
        modalDescription.textContent = overlay.querySelector('p').textContent;
        modalDate.textContent = overlay.querySelector('.photo-date').textContent;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add loading animation
        modalImage.style.opacity = '0';
        modalImage.onload = function() {
            this.style.opacity = '1';
        };
    }
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function navigateModal(direction) {
    if (currentPhotos.length === 0) return;
    
    currentPhotoIndex += direction;
    
    // Loop around
    if (currentPhotoIndex >= currentPhotos.length) {
        currentPhotoIndex = 0;
    } else if (currentPhotoIndex < 0) {
        currentPhotoIndex = currentPhotos.length - 1;
    }
    
    const currentItem = currentPhotos[currentPhotoIndex];
    const img = currentItem.querySelector('.photo-card img');
    const overlay = currentItem.querySelector('.photo-overlay');
    
    if (img && overlay) {
        // Add transition effect
        const modalImage = document.getElementById('modalImage');
        if (modalImage) {
            modalImage.style.opacity = '0';
            
            setTimeout(() => {
                openModal(img, overlay);
            }, 150);
        }
    }
}

// Add smooth scrolling for photo section
function scrollToPhotos() {
    const photosSection = document.querySelector('.photos-section');
    if (photosSection) {
        photosSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize photo gallery
    initializePhotoGallery();
    
    // Setup photo animations with intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const photoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe photo items for scroll animations
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        photoObserver.observe(item);
    });
});

// Mobile menu event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.remove('mobile-active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navLinks = document.querySelector('.nav-links');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navLinks && mobileToggle && 
            !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            navLinks.classList.remove('mobile-active');
        }
    });
});