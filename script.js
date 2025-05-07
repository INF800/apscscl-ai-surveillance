document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links (Bootstrap handles this well, but this is a fallback/enhancement)
    // This can be removed if Bootstrap's default behavior is sufficient.
    // For Bootstrap 5, data-bs-target="#sectionId" on <a> tags and matching id on sections works.
    // The CSS 'scroll-behavior: smooth;' and 'scroll-padding-top' are key.

    // Optional: Close mobile navbar when a nav link is clicked
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if the navbar is currently shown (expanded on mobile)
            if (navbarCollapse.classList.contains('show')) {
                // Create a new Collapse instance and hide it
                // This requires Bootstrap's JS to be loaded
                var bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false // Important: prevent toggling, just hide
                });
                bsCollapse.hide();
            }
        });
    });

    // Optional: Add active class to nav item on scroll (Bootstrap ScrollSpy is better for this)
    // To use Bootstrap ScrollSpy, you'd add `data-bs-spy="scroll" data-bs-target="#navbarNav"` to the body tag
    // and ensure your nav links `href` match section `id`s.
    // Bootstrap's ScrollSpy will automatically add 'active' class to nav-links.
    // For simplicity, I've relied on CSS :target and smooth scroll for now.
    // If you want dynamic active class highlighting without full ScrollSpy, you'd need more JS.
});

// If you want to use Bootstrap's ScrollSpy, add these attributes to your <body> tag:
// <body data-bs-spy="scroll" data-bs-target="#navbarNav" data-bs-offset="70">
// The data-bs-offset is important to correctly highlight links when using a fixed navbar.
// You might need to adjust the offset value (e.g., navbar height + a bit more).