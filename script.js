// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const heroSlides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const navbar = document.querySelector('.navbar');

// Global Variables
let currentSlide = 0;
let slideInterval;
let productSlideIndex = 0;
const totalProductSlides = 9; // 9 total images
const visibleSlides = 3; // 3 images visible at once
// const totalPages = Math.ceil(totalProductSlides / visibleSlides); // 3 pages
const maxSlideIndex = totalProductSlides - visibleSlides; // Maximum slide position (6)

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    initScrollAnimations();
    initNavigation();
    initVideoPlaceholders();
    initSmoothScrolling();
    initProductSlider();
});

// Hero Slider Functionality
function initHeroSlider() {
    // Start auto-play
    startSlideShow();
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetSlideInterval();
        });
    });
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    heroSection.addEventListener('mouseleave', () => {
        startSlideShow();
    });
}

function goToSlide(slideIndex) {
    // Remove active class from current slide and dot
    heroSlides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Update current slide
    currentSlide = slideIndex;
    
    // Add active class to new slide and dot
    heroSlides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % heroSlides.length;
    goToSlide(nextIndex);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideShow();
}

// Navigation Functionality
function initNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.section-header, .product-card, .tool-card, .category-card, .blog-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Video Placeholder Functionality
function initVideoPlaceholders() {
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach((container, index) => {
        const playButton = container.querySelector('.play-button');
        
        playButton.addEventListener('click', () => {
            // This is where you would integrate actual video playback
            // For now, we'll show an alert indicating video would play
            showVideoModal(index + 1);
        });
        
        // Add hover effect
        container.addEventListener('mouseenter', () => {
            playButton.style.transform = 'scale(1.1)';
        });
        
        container.addEventListener('mouseleave', () => {
            playButton.style.transform = 'scale(1)';
        });
    });
}

function showVideoModal(videoNumber) {
    // Create modal for video playback
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-modal-header">
                <h3>Video ${videoNumber} - L'Oréal Product Demo</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="video-modal-body">
                <div class="video-placeholder-large">
                    <div class="video-message">
                        <i class="fas fa-video"></i>
                        <p>Video ${videoNumber} will be embedded here</p>
                        <p class="video-note">Please provide the video file to replace this placeholder</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .video-modal-content {
                background: white;
                border-radius: 20px;
                max-width: 800px;
                width: 90%;
                max-height: 90%;
                overflow: hidden;
            }
            
            .video-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 30px;
                border-bottom: 1px solid #eee;
            }
            
            .close-modal {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                transition: color 0.3s ease;
            }
            
            .close-modal:hover {
                color: #d4af37;
            }
            
            .video-modal-body {
                padding: 30px;
            }
            
            .video-placeholder-large {
                width: 100%;
                height: 400px;
                background: linear-gradient(135deg, #d4af37, #ffd700);
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }
            
            .video-message {
                text-align: center;
            }
            
            .video-message i {
                font-size: 3rem;
                margin-bottom: 20px;
                opacity: 0.8;
            }
            
            .video-message p {
                margin: 10px 0;
                font-size: 1.1rem;
            }
            
            .video-note {
                opacity: 0.8;
                font-style: italic;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        </style>
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#video-modal-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'video-modal-styles';
        styleElement.textContent = modalStyles.replace(/<\/?style>/g, '');
        document.head.appendChild(styleElement);
    }
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function escKeyHandler(e) {
        if (e.key === 'Escape') {
            if (document.contains(modal)) {
                document.body.removeChild(modal);
            }
            document.removeEventListener('keydown', escKeyHandler);
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Product Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const addToCartBtn = card.querySelector('.btn-primary');
        
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add to cart animation
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.background = '#28a745';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
            
            // You can add actual cart functionality here
            console.log('Product added to cart');
        });
    });
});

// Virtual Tools Interactions
document.addEventListener('DOMContentLoaded', function() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const tryNowBtn = card.querySelector('.btn-outline');
        
        tryNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const toolTitle = card.querySelector('.tool-title').textContent;
            
            // Show coming soon message or redirect to tool
            showToolModal(toolTitle);
        });
    });
});

function showToolModal(toolName) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-modal-header">
                <h3>${toolName}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="video-modal-body">
                <div class="tool-demo">
                    <div class="tool-icon-large">
                        <i class="fas fa-magic"></i>
                    </div>
                    <h4>Virtual Tool Coming Soon!</h4>
                    <p>Experience the future of beauty with our AI-powered ${toolName} tool.</p>
                    <p>This interactive feature will be available soon.</p>
                    <button class="btn btn-primary notify-btn">Notify Me When Available</button>
                </div>
            </div>
        </div>
    `;
    
    // Add tool modal styles
    const toolModalStyles = `
        <style>
            .tool-demo {
                text-align: center;
                padding: 40px 20px;
            }
            
            .tool-icon-large {
                width: 100px;
                height: 100px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 30px;
                color: white;
                font-size: 2.5rem;
            }
            
            .tool-demo h4 {
                font-size: 1.5rem;
                margin-bottom: 20px;
                color: #333;
            }
            
            .tool-demo p {
                color: #666;
                margin-bottom: 15px;
                line-height: 1.6;
            }
            
            .notify-btn {
                margin-top: 20px;
            }
        </style>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#tool-modal-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'tool-modal-styles';
        styleElement.textContent = toolModalStyles.replace(/<\/?style>/g, '');
        document.head.appendChild(styleElement);
    }
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Notify button functionality
    const notifyBtn = modal.querySelector('.notify-btn');
    notifyBtn.addEventListener('click', () => {
        notifyBtn.textContent = 'You\'ll be notified!';
        notifyBtn.style.background = '#28a745';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 1500);
    });
}

// Category Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryTitle = this.querySelector('.category-title').textContent;
            
            // You can add navigation to category pages here
            console.log(`Navigating to ${categoryTitle} category`);
            
            // For now, show a simple message
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        // Create search overlay
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        searchOverlay.innerHTML = `
            <div class="search-container">
                <div class="search-box">
                    <input type="text" placeholder="Search L'Oréal products..." class="search-input">
                    <button class="search-close">&times;</button>
                </div>
                <div class="search-suggestions">
                    <div class="suggestion">Glycolic Gloss Shampoo</div>
                    <div class="suggestion">Hyaluronic Acid Serum</div>
                    <div class="suggestion">Hair Color</div>
                    <div class="suggestion">Makeup</div>
                    <div class="suggestion">Skin Care</div>
                </div>
            </div>
        `;
        
        // Add search overlay styles
        const searchStyles = `
            <style>
                .search-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    z-index: 10000;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding-top: 100px;
                    animation: fadeIn 0.3s ease;
                }
                
                .search-container {
                    width: 90%;
                    max-width: 600px;
                }
                
                .search-box {
                    display: flex;
                    align-items: center;
                    background: white;
                    border-radius: 50px;
                    padding: 0 20px;
                    margin-bottom: 30px;
                }
                
                .search-input {
                    flex: 1;
                    border: none;
                    padding: 20px 0;
                    font-size: 1.1rem;
                    outline: none;
                }
                
                .search-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                    margin-left: 15px;
                }
                
                .search-suggestions {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .suggestion {
                    background: rgba(255,255,255,0.1);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                
                .suggestion:hover {
                    background: rgba(255,255,255,0.2);
                }
            </style>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#search-modal-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'search-modal-styles';
            styleElement.textContent = searchStyles.replace(/<\/?style>/g, '');
            document.head.appendChild(styleElement);
        }
        
        document.body.appendChild(searchOverlay);
        
        // Focus on search input
        const searchInput = searchOverlay.querySelector('.search-input');
        searchInput.focus();
        
        // Close search functionality
        const searchClose = searchOverlay.querySelector('.search-close');
        searchClose.addEventListener('click', () => {
            document.body.removeChild(searchOverlay);
        });
        
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                document.body.removeChild(searchOverlay);
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function escKeyHandler(e) {
            if (e.key === 'Escape') {
                if (document.contains(searchOverlay)) {
                    document.body.removeChild(searchOverlay);
                }
                document.removeEventListener('keydown', escKeyHandler);
            }
        });
        
        // Suggestion clicks
        const suggestions = searchOverlay.querySelectorAll('.suggestion');
        suggestions.forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                searchInput.value = suggestion.textContent;
                console.log(`Searching for: ${suggestion.textContent}`);
                // You can add actual search functionality here
            });
        });
    });
});

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Product Slider Functionality
function initProductSlider() {
    // Auto-play the product slider
    setInterval(() => {
        moveSlider(1);
    }, 4000); // Change slide every 4 seconds
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    const sliderContainer = document.querySelector('.slider-container');
    
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                moveSlider(1); // Swipe left, go to next
            } else {
                moveSlider(-1); // Swipe right, go to previous
            }
        }
    }
}

/* ✅ FIXED PRODUCT SLIDER (Page-Based 3-at-a-time, auto-sliding forever) */

let page = 0;                 // current page
const totalPages = 3;         // 9 slides / 3 visible = 3 pages
let productSliderInterval;

function moveSlider(direction) {
    page += direction;
    if (page < 0) page = totalPages - 1;
    if (page >= totalPages) page = 0;
    updateProductSlider();
}
window.moveSlider = moveSlider;

function goToPage(p) {
    page = p;
    updateProductSlider();
}
window.goToPage = goToPage;

function updateProductSlider() {
    const track = document.getElementById("productSliderTrack");
    const dots = document.querySelectorAll(".slider-dot");
    track.style.transform = `translateX(-${page * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === page));
}

function startProductSliderAutoPlay() {
    if (productSliderInterval) clearInterval(productSliderInterval);
    productSliderInterval = setInterval(() => {
        moveSlider(1);
    }, 4000); // Change page every 4 seconds
}

function initProductSlider() {
    startProductSliderAutoPlay();
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    sliderContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                moveSlider(1); // Swipe left, go to next
            } else {
                moveSlider(-1); // Swipe right, go to previous
            }
        }
    }
}
