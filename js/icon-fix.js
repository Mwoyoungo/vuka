// JavaScript to fix the missing icons in the Progress So Far section
document.addEventListener('DOMContentLoaded', function() {
    console.log('Icon fix script loaded');
    
    // Target all stat icons
    const statIcons = document.querySelectorAll('.stat-icon');
    
    // Apply styles to each icon container
    statIcons.forEach(function(icon) {
        icon.style.width = '80px';
        icon.style.height = '80px';
        icon.style.backgroundColor = '#d4af37';
        icon.style.color = 'white';
        icon.style.borderRadius = '50%';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.margin = '0 auto 20px';
        icon.style.position = 'relative';
        icon.style.zIndex = '1';
        
        // Get the icon element inside
        const iconElement = icon.querySelector('i');
        if (iconElement) {
            iconElement.style.fontSize = '2rem';
            iconElement.style.color = 'white';
            iconElement.style.display = 'inline-block';
            iconElement.style.lineHeight = '1';
            iconElement.style.visibility = 'visible';
            iconElement.style.opacity = '1';
            console.log('Applied styles to icon:', iconElement.className);
        }
    });
    
    // Force reload Font Awesome if needed
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(link);
    
    console.log('Icon fix script completed');
});
