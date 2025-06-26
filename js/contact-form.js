// WhatsApp integration for contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const message = document.getElementById('message').value.trim();
            
            // Format the message for WhatsApp
            let whatsappMessage = message;
            
            // WhatsApp number for the stokvel (document submission)
            const whatsappNumber = '27733361186';
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Redirect to WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Reset the form
            contactForm.reset();
            
            // Show a success message
            const feedbackElement = document.getElementById('form-feedback') || document.createElement('div');
            feedbackElement.id = 'form-feedback';
            feedbackElement.className = 'form-success';
            feedbackElement.innerHTML = '<i class="fas fa-check-circle"></i> Redirecting to WhatsApp to send your message...';
            
            if (!document.getElementById('form-feedback')) {
                contactForm.appendChild(feedbackElement);
            }
            
            // Hide the success message after 5 seconds
            setTimeout(() => {
                feedbackElement.style.opacity = '0';
                setTimeout(() => {
                    feedbackElement.innerHTML = '';
                    feedbackElement.className = '';
                    feedbackElement.style.opacity = '1';
                }, 500);
            }, 5000);
        });
    }
});
