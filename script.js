document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
    });

    const currentYearSpan = document.getElementById("currentYear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    const applyTheme = (theme) => {
        body.className = '';
        body.classList.add(theme);
        if (themeIcon) {
            if (theme === 'dark-theme') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                themeToggle.title = "Switch to Light Theme";
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                themeToggle.title = "Switch to Dark Theme";
            }
        }
        localStorage.setItem('theme', theme);
    };

    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme';
    }
    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = body.classList.contains('light-theme') ? 'dark-theme' : 'light-theme';
            applyTheme(newTheme);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active-link'));
                this.classList.add('active-link');

                let headerOffset = 80;
                const header = document.querySelector('header');
                if (header) {
                    headerOffset = header.offsetHeight + 20;
                }

                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.openSolution = function(evt, solutionName) {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove('is-visible');
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        const currentTab = document.getElementById(solutionName);
        if (currentTab) {
            currentTab.style.display = "block";
            // Trigger animation for the newly displayed tab content
             setTimeout(() => {
                currentTab.classList.add('is-visible');
            }, 50);
        }
        if (evt && evt.currentTarget) {
            evt.currentTarget.className += " active";
        }
    }

    const firstTabLink = document.querySelector(".tabs .tablink");
    if (firstTabLink && !window.location.hash.substring(1)) {
        firstTabLink.click();
    } else if (window.location.hash) {
        // If there's a hash, try to open the corresponding tab (if it's a solution tab)
        const hash = window.location.hash.substring(1);
        const tabToOpen = document.querySelector(`.tablink[onclick*="'${hash}'"]`);
        if (tabToOpen) {
            tabToOpen.click();
        }
    }


    const setActiveNavAndScroll = () => {
        let currentHashForNav = window.location.hash || '#hero';

        document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active-link'));
        const activeNav = document.querySelector(`nav ul li a[href="${currentHashForNav}"]`);
        if (activeNav) {
            activeNav.classList.add('active-link');
        }

        if (window.location.hash && window.location.hash !== "#hero") {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                setTimeout(() => {
                    let headerOffset = 80;
                    const header = document.querySelector('header');
                    if (header) headerOffset = header.offsetHeight + 20;

                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'auto' });
                }, 100);
            }
        }
    };

    setActiveNavAndScroll();
    window.addEventListener('hashchange', setActiveNavAndScroll);

    const scrollElements = document.querySelectorAll(".animate-on-scroll");
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add("is-visible");
                }, delay);
                // observer.unobserve(entry.target); // Optional
            }
            // else { entry.target.classList.remove("is-visible"); } // Optional for re-animation
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => {
        elementObserver.observe(el);
    });

    // Basic mobile navigation toggle (add a button with id="mobile-menu-btn" in HTML header)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn'); // You'll need to add this button to your HTML
    const navMenu = document.querySelector('header nav');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isClosed = navMenu.style.maxHeight === '0px' || !navMenu.style.maxHeight;
            navMenu.style.maxHeight = isClosed ? '500px' : '0px';
            // You might want to change the button icon (e.g., hamburger to X)
            // mobileMenuBtn.innerHTML = isClosed ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
});