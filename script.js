// ==========================================
// SAPRIELLE STUDIO - MAIN JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------
    // LOADING SCREEN
    // ------------------------------------------

    const loader = document.getElementById("loader");
    const loadingText = document.getElementById("loading-text");

    const loadingMessages = [
        "INITIALIZING...",
        "LOADING WORLD...",
        "STARTING SYSTEMS...",
        "PREPARING EXPERIENCE...",
        "WELCOME TO SAPRIELLE."
    ];

    let messageIndex = 0;

    const loadingInterval = setInterval(() => {
        if (loadingText) {
            loadingText.textContent = loadingMessages[messageIndex];
            messageIndex++;

            if (messageIndex >= loadingMessages.length) {
                clearInterval(loadingInterval);
            }
        }
    }, 500);

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add("hidden");
            }
        }, 1800);
    });


    // ------------------------------------------
    // MOBILE NAVIGATION
    // ------------------------------------------

    const menuButton = document.getElementById("menu-button");
    const navMenu = document.getElementById("nav-menu");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuButton.textContent = isOpen ? "✕" : "☰";
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close menu when a navigation link is clicked
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuButton.textContent = "☰";
                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });
    }


    // ------------------------------------------
    // SCROLL REVEAL ANIMATIONS
    // ------------------------------------------

    const revealElements = document.querySelectorAll(
        ".section, .game-card, .team-card, .news-card, .stats > div, .trailer-content, .community"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });


    // ------------------------------------------
    // GAME CARD 3D HOVER EFFECT
    // ------------------------------------------

    const gameCards = document.querySelectorAll(".game-card");

    gameCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            // Don't use this effect on small screens
            if (window.innerWidth <= 700) return;

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });

    });


    // ------------------------------------------
    // TRAILER BUTTON
    // ------------------------------------------

    const playButton = document.querySelector(".play-button");

    if (playButton) {

        playButton.addEventListener("click", () => {

            alert(
                "🎬 The official Saprielle Studio trailer is coming soon!"
            );

        });

    }


    // ------------------------------------------
    // SMOOTH SCROLL
    // ------------------------------------------

    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

    allAnchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ------------------------------------------
    // ACTIVE NAVIGATION LINK
    // ------------------------------------------

    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll("#nav-menu a");

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navigationLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        `#nav-menu a[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                }

            });

        },
        {
            threshold: 0.45
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // ------------------------------------------
    // CURRENT YEAR
    // ------------------------------------------

    const footerText = document.querySelector("footer p");

    if (footerText) {

        const currentYear = new Date().getFullYear();

        footerText.textContent =
            `© ${currentYear} Saprielle Studio. All rights reserved.`;
    }


    // ------------------------------------------
    // BUTTON RIPPLE EFFECT
    // ------------------------------------------

    const buttons = document.querySelectorAll(
        ".button, .game-button, .social"
    );

    buttons.forEach(button => {

        button.addEventListener("click", event => {

            const ripple = document.createElement("span");

            ripple.classList.add("ripple");

            const rect = button.getBoundingClientRect();

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });


    // ------------------------------------------
    // PARALLAX HERO EFFECT
    // ------------------------------------------

    const heroLogo = document.querySelector(".hero-logo");

    window.addEventListener("scroll", () => {

        if (!heroLogo) return;

        if (window.innerWidth <= 700) return;

        const scrollPosition = window.scrollY;

        heroLogo.style.transform =
            `translateY(${scrollPosition * 0.12}px)`;
    });


    // ------------------------------------------
    // CONSOLE MESSAGE 😎
    // ------------------------------------------

    console.log(
        "%c SAPRIELLE STUDIO ",
        "background:#7c3aed;color:white;font-size:18px;font-weight:bold;padding:8px 15px;border-radius:8px;"
    );

    console.log(
        "%c Welcome, developer. 🚀 ",
        "color:#c084fc;font-size:14px;"
    );

});
