const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* ========================================
   CERTIFICATE LIGHTBOX
======================================== */

const certificateButtons =
    document.querySelectorAll(".certificate-image");

const certificateModal =
    document.getElementById("certificateModal");

const certificateModalImage =
    document.getElementById("certificateModalImage");

const certificateModalTitle =
    document.getElementById("certificateModalTitle");

const certificateModalClose =
    document.getElementById("certificateModalClose");


certificateButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const image = button.dataset.certificate;
        const title = button.dataset.title;

        certificateModalImage.src = image;
        certificateModalImage.alt = title;

        certificateModalTitle.textContent = title;

        certificateModal.classList.add("active");

        certificateModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    });

});


function closeCertificateModal() {

    certificateModal.classList.remove("active");

    certificateModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


certificateModalClose.addEventListener(
    "click",
    closeCertificateModal
);


certificateModal.addEventListener(
    "click",
    (event) => {

        if (event.target === certificateModal) {
            closeCertificateModal();
        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            certificateModal.classList.contains("active")
        ) {
            closeCertificateModal();
        }

    }
);

/* ========================================
   CURRENT YEAR
======================================== */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}

/* ========================================
   POLISHING — HEADER ON SCROLL
======================================== */

const portfolioHeader =
    document.querySelector(".header");

function updateHeaderOnScroll() {

    if (!portfolioHeader) return;

    if (window.scrollY > 25) {
        portfolioHeader.classList.add("scrolled");
    } else {
        portfolioHeader.classList.remove("scrolled");
    }

}

window.addEventListener(
    "scroll",
    updateHeaderOnScroll,
    { passive: true }
);

updateHeaderOnScroll();



/* ========================================
   POLISHING — ACTIVE NAVIGATION
======================================== */

const portfolioSections =
    document.querySelectorAll("main section[id]");

const portfolioNavLinks =
    document.querySelectorAll('.nav-links a[href^="#"]');


function updateActiveNavigation() {

    let currentSection = "home";

    const scrollPosition =
        window.scrollY + 160;


    portfolioSections.forEach((section) => {

        if (
            scrollPosition >=
            section.offsetTop
        ) {
            currentSection =
                section.getAttribute("id");
        }

    });


    portfolioNavLinks.forEach((link) => {

        const target =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateActiveNavigation
);

updateActiveNavigation();



/* ========================================
   POLISHING — SCROLL REVEAL
======================================== */

const revealSelectors = [
    ".section-heading",
    ".about-content",
    ".about-card",
    ".about-facts",
    ".experience-item",
    ".skill-card",
    ".project-card",
    ".certificate-card",
    ".recognition-bar",
    ".education-card",
    ".contact-main",
    ".contact-card",
    ".portfolio-footer"
];


const revealElements =
    document.querySelectorAll(
        revealSelectors.join(",")
    );


revealElements.forEach((element, index) => {

    element.classList.add("reveal");

});


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -50px 0px"
            }

        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add(
            "reveal-visible"
        );

    });

}

/* ========================================
   PROJECT IMAGE LIGHTBOX
======================================== */

const projectPreviewButtons =
    document.querySelectorAll(".project-preview");

const projectModal =
    document.getElementById("projectModal");

const projectModalImage =
    document.getElementById("projectModalImage");

const projectModalTitle =
    document.getElementById("projectModalTitle");

const projectModalClose =
    document.getElementById("projectModalClose");


function openProjectModal(button) {

    const image =
        button.dataset.projectImage;

    const title =
        button.dataset.projectTitle;

    projectModalImage.src = image;

    projectModalImage.alt =
        title || "Project preview";

    projectModalTitle.textContent =
        title || "";

    projectModal.classList.add("active");

    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function closeProjectModal() {

    projectModal.classList.remove("active");

    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

    setTimeout(() => {
        projectModalImage.src = "";
    }, 300);
}


projectPreviewButtons.forEach((button) => {

    button.addEventListener("click", () => {

        openProjectModal(button);

    });

});


if (projectModalClose) {

    projectModalClose.addEventListener(
        "click",
        closeProjectModal
    );

}


if (projectModal) {

    projectModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === projectModal
            ) {
                closeProjectModal();
            }

        }
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            projectModal &&
            projectModal.classList.contains("active")
        ) {
            closeProjectModal();
        }

    }
);