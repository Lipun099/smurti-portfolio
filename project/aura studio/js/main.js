const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
const hasLenis = typeof Lenis !== "undefined";

if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
}

if (hasLenis && hasGsap) {
    const lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

const cursor = document.querySelector(".cursor");
const hoverTargets = document.querySelectorAll("a, .case-card, .team-card");
const navLinks = document.querySelectorAll(".nav a");
const caseTransition = document.querySelector(".case-transition");

window.addEventListener("pointermove", (event) => {
    if (!cursor) return;

    if (hasGsap) {
        gsap.to(cursor, {
            x: event.clientX,
            y: event.clientY,
            duration: 0.16,
            ease: "power2.out"
        });
    } else {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
    }
});

hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => cursor && cursor.classList.add("active"));
    target.addEventListener("mouseleave", () => cursor && cursor.classList.remove("active"));
});

function updateNav() {
    const sections = [...document.querySelectorAll("main section[id]")];
    const active = sections.filter((section) => window.scrollY >= section.offsetTop - 180).pop();

    navLinks.forEach((link) => {
        link.classList.toggle("active", active && link.getAttribute("href") === `#${active.id}`);
    });
}

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

document.querySelectorAll(".case-image").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        if (!hasGsap || !caseTransition) return;

        const timeline = gsap.timeline();

        timeline
            .to(caseTransition, {
                clipPath: "inset(0% 0 0 0)",
                duration: 0.75,
                ease: "power4.inOut"
            })
            .to(caseTransition, {
                clipPath: "inset(0 0 100% 0)",
                duration: 0.75,
                delay: 0.35,
                ease: "power4.inOut"
            });
    });
});

if (hasGsap) {
    gsap.set(".hero-title span", { yPercent: 110 });
    gsap.set(".hero-kicker, .hero-copy, .round-cta", { opacity: 0, y: 22 });

    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });

    intro
        .to(".hero-title span", { yPercent: 0, duration: 1.15, stagger: 0.12 }, 0.15)
        .to(".reveal-mask", { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "power4.inOut" }, 0.28)
        .from(".hero-image img", { scale: 1.14, duration: 1.4, ease: "power2.out" }, 0.35)
        .to(".hero-kicker, .hero-copy, .round-cta", { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.78);

    gsap.utils.toArray(".section-label, .work-intro h2, .work-intro p, .case-card, .philosophy-steps article, .team-header h2, .team-header p, .team-card, .contact h2, .contact-button, .footer").forEach((element) => {
        gsap.from(element, {
            opacity: 0,
            y: 54,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 86%",
                once: true
            }
        });
    });

    gsap.to(".hero-image img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2
        }
    });

    gsap.utils.toArray(".case-image img, .portrait img").forEach((image) => {
        gsap.to(image, {
            yPercent: -7,
            ease: "none",
            scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4
            }
        });
    });
}
