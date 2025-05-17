function openProblem(evt, problemName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablink" and remove the class "active"
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(problemName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Optional: Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Add active class to nav link
            document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active-link'));
            this.classList.add('active-link');

            // Smooth scroll
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header height
                behavior: 'smooth'
            });
        }
    });
});

// Optional: Set the first tab as active on page load
document.addEventListener("DOMContentLoaded", function() {
    // Check if there are any tablinks before trying to click
    const firstTabLink = document.querySelector(".tablink");
    if (firstTabLink) {
        firstTabLink.click();
    }

    // Set active link for initial view (e.g., if loaded with a hash)
    const currentHash = window.location.hash;
    if (currentHash) {
        const activeNav = document.querySelector(`nav ul li a[href="${currentHash}"]`);
        if (activeNav) {
            activeNav.classList.add('active-link');
        }
    } else {
        // Default to Home link active
        const homeNav = document.querySelector('nav ul li a[href="#hero"]');
        if (homeNav) {
            homeNav.classList.add('active-link');
        }
    }
});
