document.addEventListener('DOMContentLoaded', function () {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const menuLinks = document.querySelector('.menu-links');
    const navLinks = document.querySelectorAll('.menu-links a');
    const html = document.documentElement;

    if (!hamburgerIcon || !menuLinks) return;

    hamburgerIcon.setAttribute('aria-expanded', 'false');
    menuLinks.setAttribute('aria-hidden', 'true');

    function handleMenuToggle() {
        const isExpanded = hamburgerIcon.getAttribute('aria-expanded') === 'true';
        hamburgerIcon.classList.toggle('open');
        menuLinks.classList.toggle('open');
        hamburgerIcon.setAttribute('aria-expanded', !isExpanded);
        menuLinks.setAttribute('aria-hidden', isExpanded);
        html.classList.toggle('no-scroll', !isExpanded);
    }

    function closeMenu() {
        hamburgerIcon.classList.remove('open');
        menuLinks.classList.remove('open');
        hamburgerIcon.setAttribute('aria-expanded', 'false');
        menuLinks.setAttribute('aria-hidden', 'true');
        html.classList.remove('no-scroll');
    }

    hamburgerIcon.addEventListener('click', handleMenuToggle);

    document.addEventListener('click', function (event) {
        const isClickInside =
            hamburgerIcon.contains(event.target) ||
            menuLinks.contains(event.target);
        if (!isClickInside && menuLinks.classList.contains('open')) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menuLinks.classList.contains('open')) {
            closeMenu();
        }
    });

    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                if (menuLinks.classList.contains('open')) {
                    closeMenu();
                }
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.pushState?.(null, null, targetId);
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('focus', () => {
            if (menuLinks.classList.contains('open')) {
                link.classList.add('focused');
            }
        });
        link.addEventListener('blur', () => {
            link.classList.remove('focused');
        });
    });
});
