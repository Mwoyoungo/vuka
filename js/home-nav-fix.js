// Special fix for home page navigation menu
document.addEventListener('DOMContentLoaded', function() {
    // This script is specifically for the home page navigation
    console.log('Home page navigation fix loaded');
    
    // Force immediate execution to ensure the menu is fixed
    setTimeout(function() {
        fixHomeNavigation();
    }, 100);
    
    // Also fix on window load to ensure all elements are fully loaded
    window.addEventListener('load', fixHomeNavigation);
    
    function fixHomeNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!menuToggle || !navMenu) {
            console.error('Menu toggle or nav menu not found');
            return;
        }
        
        console.log('Setting up home page navigation');
        
        // Force the menu toggle to be visible and clickable on mobile
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            menuToggle.style.position = 'absolute';
            menuToggle.style.zIndex = '9999';
            
            // Reset the nav menu display
            navMenu.style.display = 'none';
        }
        
        // Remove any existing click handlers
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
        // Add direct click event handler with debugging
        newMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked');
            
            // Toggle menu visibility
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
                this.classList.remove('active');
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.zIndex = '9998';
                this.classList.add('active');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.style.display === 'flex' && 
                !newMenuToggle.contains(e.target) && 
                !navMenu.contains(e.target)) {
                navMenu.style.display = 'none';
                newMenuToggle.classList.remove('active');
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.style.display = '';
                newMenuToggle.style.display = 'none';
            } else {
                newMenuToggle.style.display = 'block';
                newMenuToggle.style.zIndex = '9999';
                if (!newMenuToggle.classList.contains('active')) {
                    navMenu.style.display = 'none';
                }
            }
        });
    }
});
