// Toggle hamburger menu
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    if (navMenu) navMenu.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('active');
}

// Toggle dropdown menu
function toggleDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropdown = e.currentTarget.closest('.dropdown');
    if (dropdown) {
        const content = dropdown.querySelector('.dropdown-content');
        if (content) {
            content.classList.toggle('active');
        }
    }
}

// Close menus when clicking outside header
document.addEventListener('click', function(event) {
    const header = document.querySelector('header');
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (header && !header.contains(event.target)) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        // Close dropdown content
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.classList.remove('active');
        });
    }
});

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Wire up hamburger button
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    
    // Hamburger button click
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Dropdown toggle buttons
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleDropdown);
    });
});

// Re-check active link on every navigation
window.addEventListener('hashchange', setActiveNavLink);
 