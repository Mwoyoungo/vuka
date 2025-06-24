// Vuka Darkie Manufacturing Stokvel - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle - Simplified and more robust implementation
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!menuToggle || !navMenu) {
            console.error('Menu toggle or nav menu not found');
            return;
        }
        
        // Make sure the menu toggle is visible on mobile
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        }
        
        // Clear any existing event listeners (just in case)
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
        // Add click event listener to the menu toggle
        newMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            newMenuToggle.classList.toggle('active');
            console.log('Menu toggled:', navMenu.classList.contains('active'));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !newMenuToggle.contains(e.target) && 
                !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                newMenuToggle.classList.remove('active');
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                newMenuToggle.classList.remove('active');
                newMenuToggle.style.display = 'none';
            } else {
                newMenuToggle.style.display = 'block';
            }
        });
    }
    
    // Initialize the mobile menu
    setupMobileMenu();

    // FAQ Toggles
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('.toggle-icon i');
                
                // Toggle answer visibility
                answer.classList.toggle('active');
                
                // Toggle icon
                if (icon) {
                    if (answer.classList.contains('active')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        });
    }

    // Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    const membershipForm = document.getElementById('membershipForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you shortly.');
            contactForm.reset();
        });
    }
    
    if (membershipForm) {
        membershipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your application. We will review it and contact you within 48 hours.');
            membershipForm.reset();
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fixed header class on scroll
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Initialize animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }

    // Add animation classes to elements
    function setupAnimations() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const children = section.children;
            for (let i = 0; i < children.length; i++) {
                if (children[i].classList.contains('container')) {
                    const containerChildren = children[i].children;
                    for (let j = 0; j < containerChildren.length; j++) {
                        if (!containerChildren[j].classList.contains('no-animate')) {
                            containerChildren[j].classList.add('animate-on-scroll');
                        }
                    }
                }
            }
        });
        
        animateOnScroll();
    }

    // Call animation setup
    setupAnimations();
    
    // Listen for scroll to trigger animations
    window.addEventListener('scroll', animateOnScroll);
});
