// Initialize EmailJS
let emailJSInitialized = false;

function initializeEmailJS() {
    try {
        emailjs.init("MoJiTEo61wDfp46UC");
        emailJSInitialized = true;
        console.log('EmailJS initialized successfully');
    } catch (error) {
        console.error('EmailJS initialization failed:', error);
        emailJSInitialized = false;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEmailJS();
});

// DOM Elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const spinner = document.getElementById('spinner');
const successNotification = document.getElementById('successNotification');
const errorNotification = document.getElementById('errorNotification');

// Form submission handler
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Check if EmailJS is initialized
    if (!emailJSInitialized) {
        showNotification(errorNotification, 'Email service is not ready. Please try again in a moment.');
        return;
    }
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const date = new Date().toLocaleString();
    
    // Reset previous states
    hideNotifications();
    
    // Validate form
    if (!name || !email || !subject || !message) {
        showNotification(errorNotification, 'Please fill in all required fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification(errorNotification, 'Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    try {
        console.log('Sending email with data:', { name, email, phone, subject, message, date });
        
        // Send email using EmailJS - Fixed variable names to match template
        const response = await emailjs.send(
            'service_dps558e', // Your EmailJS service ID
            'template_tyhafh1', // Your EmailJS template ID
            {
                name: name,
                email: email,
                phone: phone || 'Not provided', // Handle empty phone
                subject: subject,
                message: message,
                date: date // Changed from 'time' to 'date' to match template
            }
        );
        
        console.log('EmailJS response:', response);
        
        // Show success message
        showNotification(successNotification, 'Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
        
    } catch (error) {
        console.error('EmailJS error details:', error);
        
        // More specific error messages
        let errorMessage = 'There was an error sending your message. Please try again.';
        
        if (error.status === 400) {
            errorMessage = 'Invalid request. Please check your input and try again.';
        } else if (error.status === 401) {
            errorMessage = 'Authentication failed. Please contact support.';
        } else if (error.status === 402) {
            errorMessage = 'Email quota exceeded. Please try again later.';
        } else if (error.status === 404) {
            errorMessage = 'Email service not found. Please contact support.';
        } else if (error.status >= 500) {
            errorMessage = 'Server error. Please try again later.';
        }
        
        showNotification(errorNotification, errorMessage);
    } finally {
        // Hide loading state
        setLoadingState(false);
    }
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Helper functions
function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        spinner.style.display = 'block';
        submitBtn.querySelector('span:last-child').textContent = 'Sending...';
    } else {
        submitBtn.disabled = false;
        spinner.style.display = 'none';
        submitBtn.querySelector('span:last-child').textContent = 'Send Message';
    }
}

function showNotification(notification, message) {
    if (message) {
        notification.querySelector('span').textContent = message;
    }
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

function hideNotifications() {
    successNotification.classList.remove('show');
    errorNotification.classList.remove('show');
}

// Add retry mechanism for failed initialization
setTimeout(() => {
    if (!emailJSInitialized) {
        console.log('Retrying EmailJS initialization...');
        initializeEmailJS();
    }
}, 2000);