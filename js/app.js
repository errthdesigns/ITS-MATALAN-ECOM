/**
 * MATALAN - Feel Yourself
 * Interactive Lookbook
 * Scroll-driven video experience
 */

(function() {
    'use strict';

    // ================================
    // Configuration
    // ================================
    const CONFIG = {
        products: [
            { tagline: "It's<br>business ready" }
        ],
        scrollMultiplier: 2,
        transitionDuration: 300
    };

    // ================================
    // DOM Elements
    // ================================
    const elements = {
        nav: document.getElementById('nav'),
        lookbook: document.getElementById('lookbook'),
        fabricVideos: document.querySelectorAll('.fabric-video'),
        modelVideos: document.querySelectorAll('.model-video'),
        fabricProgress: document.getElementById('fabricProgress'),
        modelProgress: document.getElementById('modelProgress'),
        productCards: document.querySelectorAll('.product-card'),
        navDots: document.querySelectorAll('.nav-dot'),
        modelTagline: document.getElementById('modelTagline'),
        swatches: document.querySelectorAll('.swatch')
    };

    // ================================
    // State
    // ================================
    let state = {
        currentProduct: 0,
        isScrolling: false,
        videosLoaded: false
    };

    // ================================
    // Video Controller
    // ================================
    const VideoController = {
        init() {
            this.loadVideos();
            this.setActiveVideos(0);
        },

        loadVideos() {
            const allVideos = [...elements.fabricVideos, ...elements.modelVideos];
            let loadedCount = 0;
            const totalVideos = allVideos.length;

            allVideos.forEach(video => {
                video.load();
                
                const handleLoaded = () => {
                    loadedCount++;
                    if (loadedCount === totalVideos) {
                        state.videosLoaded = true;
                        console.log('All videos loaded');
                    }
                };

                video.addEventListener('loadeddata', handleLoaded);
                video.addEventListener('canplaythrough', handleLoaded);
                
                // Fallback if already loaded
                if (video.readyState >= 3) {
                    handleLoaded();
                }
            });
        },

        setActiveVideos(index) {
            // Update fabric videos
            elements.fabricVideos.forEach((video, i) => {
                if (i === index) {
                    video.classList.add('active');
                } else {
                    video.classList.remove('active');
                }
            });

            // Update model videos
            elements.modelVideos.forEach((video, i) => {
                if (i === index) {
                    video.classList.add('active');
                } else {
                    video.classList.remove('active');
                }
            });
        },

        scrubVideos(progress) {
            const activeIndex = state.currentProduct;
            
            // Get active videos
            const fabricVideo = elements.fabricVideos[activeIndex];
            const modelVideo = elements.modelVideos[activeIndex];

            // Calculate segment progress (0-1 within each product section)
            const segmentProgress = (progress * CONFIG.products.length) % 1;

            // Scrub fabric video
            if (fabricVideo && fabricVideo.duration) {
                fabricVideo.currentTime = segmentProgress * fabricVideo.duration;
            }

            // Scrub model video
            if (modelVideo && modelVideo.duration) {
                modelVideo.currentTime = segmentProgress * modelVideo.duration;
            }
        }
    };

    // ================================
    // UI Controller
    // ================================
    const UIController = {
        updateProgress(progress) {
            const percentage = progress * 100;
            
            if (elements.fabricProgress) {
                elements.fabricProgress.style.width = `${percentage}%`;
            }
            if (elements.modelProgress) {
                elements.modelProgress.style.width = `${percentage}%`;
            }
        },

        updateProductCards(index) {
            elements.productCards.forEach((card, i) => {
                if (i === index) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        },

        updateNavDots(index) {
            elements.navDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        },

        updateTagline(index) {
            if (elements.modelTagline) {
                elements.modelTagline.innerHTML = CONFIG.products[index].tagline;
                elements.modelTagline.classList.add('visible');
            }
        },

        updateNav() {
            if (window.scrollY > 50) {
                elements.nav.classList.add('scrolled');
            } else {
                elements.nav.classList.remove('scrolled');
            }
        }
    };

    // ================================
    // Scroll Controller
    // ================================
    const ScrollController = {
        init() {
            this.bindEvents();
        },

        bindEvents() {
            let ticking = false;

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.onScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        },

        onScroll() {
            UIController.updateNav();

            if (!elements.lookbook) return;

            const rect = elements.lookbook.getBoundingClientRect();
            const scrollHeight = elements.lookbook.offsetHeight - window.innerHeight;
            const scrolled = -rect.top;
            
            // Calculate overall progress (0 to 1)
            const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));

            // Determine which product we're on (0-3)
            const productIndex = Math.min(
                CONFIG.products.length - 1,
                Math.floor(progress * CONFIG.products.length)
            );

            // Update UI
            UIController.updateProgress(progress);
            UIController.updateNavDots(productIndex);

            // Only update if product changed
            if (productIndex !== state.currentProduct) {
                state.currentProduct = productIndex;
                VideoController.setActiveVideos(productIndex);
                UIController.updateProductCards(productIndex);
                UIController.updateTagline(productIndex);
            }

            // Scrub videos based on scroll
            VideoController.scrubVideos(progress);
        },

        scrollToProduct(index) {
            if (!elements.lookbook) return;

            const scrollHeight = elements.lookbook.offsetHeight - window.innerHeight;
            const targetScroll = elements.lookbook.offsetTop + (scrollHeight * index / CONFIG.products.length);

            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    // ================================
    // Swatch Controller
    // ================================
    const SwatchController = {
        init() {
            elements.swatches.forEach(swatch => {
                swatch.addEventListener('click', (e) => this.handleClick(e));
            });
        },

        handleClick(e) {
            const swatch = e.currentTarget;
            const container = swatch.closest('.product-card__swatches');
            const label = container.nextElementSibling;
            
            // Update active state
            container.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            // Update label
            const colorName = swatch.dataset.color;
            const totalColors = container.querySelectorAll('.swatch').length;
            label.textContent = `${colorName} — ${totalColors} colours`;
        }
    };

    // ================================
    // Navigation Dots Controller
    // ================================
    const NavDotsController = {
        init() {
            elements.navDots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const index = parseInt(e.currentTarget.dataset.index);
                    ScrollController.scrollToProduct(index);
                });
            });
        }
    };

    // ================================
    // Initialize
    // ================================
    function init() {
        VideoController.init();
        ScrollController.init();
        SwatchController.init();
        NavDotsController.init();
        
        // Initial scroll check
        ScrollController.onScroll();
        
        console.log('Matalan Feel Yourself - Initialized');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
