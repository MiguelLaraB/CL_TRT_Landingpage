// Header Interactivity & Navigation
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.global-header');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('#mobile-nav');
    
    // 1. Mobile Menu Toggle
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            mobileNav.classList.toggle('is-open'); // Consistent with CSS line 609
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('is-open') && !mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                mobileNav.classList.remove('is-open');
            }
        });
    }

    // 2. Smooth Scrolling & Menu Closing on Link Click
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mobileNav && mobileNav.classList.contains('is-open')) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    mobileNav.classList.remove('is-open');
                }

                // Smooth scroll to target
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jump
                history.pushState(null, null, targetId);
            }
        });
    });

    // 3. Header Scrolled State
    const updateHeader = () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Initial check

    // 4. Coverage Map Interaction
    const covCards = document.querySelectorAll('.cov-card');
    covCards.forEach(card => {
        const targetId = card.getAttribute('data-target');
        const node = document.querySelector(`#${targetId}`);
        
        card.addEventListener('mouseenter', () => node?.classList.add('highlight'));
        card.addEventListener('mouseleave', () => node?.classList.remove('highlight'));
    });
});
