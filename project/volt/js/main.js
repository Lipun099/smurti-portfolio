const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";

if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
}

const cursorLight = document.querySelector(".cursor-light");
const panels = document.querySelectorAll(".feature-panel");
const dots = document.querySelectorAll(".section-dot");
const navLinks = document.querySelectorAll(".nav-links a");
const reserveButtons = document.querySelectorAll(".nav-button, .cta-button");
const premiumButtons = document.querySelectorAll(".nav-button, .cta-button, .primary-link, .ghost-link, .round-link");
const transitionShutter = document.createElement("div");

transitionShutter.className = "transition-shutter";
document.body.appendChild(transitionShutter);

window.addEventListener("pointermove", (event) => {
    if (!cursorLight) return;

    cursorLight.style.left = `${event.clientX}px`;
    cursorLight.style.top = `${event.clientY}px`;
});

panels.forEach((panel) => {
    panel.addEventListener("mouseenter", () => {
        panels.forEach((item) => item.classList.remove("active"));
        panel.classList.add("active");

        dots.forEach((dot) => {
            dot.style.opacity = dot.classList.contains(`dot-${panel.dataset.panel}`) ? "1" : "0.32";
            dot.style.transform = dot.classList.contains(`dot-${panel.dataset.panel}`)
                ? "rotate(45deg) scale(1.35)"
                : "rotate(45deg) scale(1)";
        });
    });
});

reserveButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const label = button.querySelector("span") || button;
        const defaultText = label.textContent;

        label.textContent = button.classList.contains("nav-button") ? "Set" : "Sent";
        button.disabled = true;
        setTimeout(() => {
            label.textContent = defaultText;
            button.disabled = false;
        }, 2200);
    });
});

premiumButtons.forEach((button) => {
    button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        button.style.setProperty("--tilt-x", `${(-y / rect.height) * 8}deg`);
        button.style.setProperty("--tilt-y", `${(x / rect.width) * 10}deg`);
        button.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
        button.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
    });

    button.addEventListener("pointerleave", () => {
        button.style.setProperty("--tilt-x", "0deg");
        button.style.setProperty("--tilt-y", "0deg");
    });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));

        if (!target) return;

        event.preventDefault();
        transitionShutter.classList.add("active");

        setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 180);

        setTimeout(() => {
            transitionShutter.classList.remove("active");
        }, 720);
    });
});

function setActiveNav() {
    const sections = [...document.querySelectorAll("main section[id]")];
    const activeSection = sections
        .filter((section) => window.scrollY >= section.offsetTop - 180)
        .pop();

    navLinks.forEach((link) => {
        link.classList.toggle("active", activeSection && link.getAttribute("href") === `#${activeSection.id}`);
    });
}

window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();

if (hasGsap) {
    gsap.set(".hero-copy > *, .hero-specs", { opacity: 0, y: 34 });
    gsap.set(".hero-car", { opacity: 0, scale: 1.08, x: 80 });

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
        .to(".hero-copy > *", { opacity: 1, y: 0, duration: 1.05, stagger: 0.12 }, 0.2)
        .to(".hero-car", { opacity: 1, scale: 1, x: 0, duration: 1.6 }, 0.28)
        .to(".hero-specs", { opacity: 1, y: 0, duration: 0.9 }, 0.95);

    gsap.utils.toArray(".section-heading, .feature-panel, .vehicle-orbit, .tech-card, .performance-copy, .performance-media, .metric, .interior-frame, .experience-copy, .final-cta > *").forEach((element) => {
        gsap.from(element, {
            opacity: 0,
            y: 44,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 84%",
                once: true
            }
        });
    });

    gsap.to(".hero-stage", {
        yPercent: 16,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2
        }
    });

    gsap.to(".showcase-car", {
        xPercent: -8,
        rotate: -1.5,
        ease: "none",
        scrollTrigger: {
            trigger: ".showcase",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
        }
    });

    gsap.to(".performance-media img", {
        xPercent: 10,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
            trigger: ".performance",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4
        }
    });

    gsap.to(".metal-sweep", {
        xPercent: 22,
        ease: "none",
        scrollTrigger: {
            trigger: ".final-cta",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });

    gsap.to(".hero-rings", {
        rotate: 12,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.6
        }
    });

    gsap.to(".orbit-ring", {
        rotate: 8,
        ease: "none",
        scrollTrigger: {
            trigger: ".showcase",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
        }
    });
}
