/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");

if (menuToggle && navLinks) {

    // Membuka dan menutup menu mobile
    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const isOpen = navLinks.classList.contains("show");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });


    // Menutup menu setelah link diklik
    navItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    // Menutup menu ketika klik di luar navbar
    document.addEventListener("click", (event) => {

        const clickedInsideNavbar =
            menuToggle.contains(event.target) ||
            navLinks.contains(event.target);

        if (!clickedInsideNavbar) {

            navLinks.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

}


/* =========================================
   2. TYPING ANIMATION
========================================= */

const typingText = document.getElementById("typing-text");

const words = [
    "Manajemen Basis Data",
    "UI/UX Desain",
    "Pembelajar Teknologi",
    "Pengembangan Perangkat Lunak"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentWord = words[wordIndex];

    // Menampilkan huruf satu per satu
    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        // Jika seluruh kata sudah tampil
        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    }

    // Menghapus huruf satu per satu
    else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        // Jika kata sudah terhapus
        if (charIndex === 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 55 : 100
    );

}


// Menjalankan animasi typing
if (typingText) {
    typeEffect();
}


/* =========================================
   3. ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {

    let currentSection = "home";

    const scrollPosition = window.scrollY + 160;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    // Memperbarui link navbar
    navItems.forEach(link => {

        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}


// Memperbarui navigasi saat halaman di-scroll
window.addEventListener("scroll", updateActiveNavigation);

// Memperbarui navigasi saat halaman pertama kali dibuka
window.addEventListener("load", updateActiveNavigation);


/* =========================================
   4. HARD SKILLS & SOFT SKILLS CAROUSEL
========================================= */

document.querySelectorAll("[data-carousel]").forEach(carousel => {

    const track = carousel.querySelector(".skill-track");

    const pages = carousel.querySelectorAll(".skill-page");

    const prevButton = carousel.querySelector(".prev");

    const nextButton = carousel.querySelector(".next");

    const pagination =
        carousel.parentElement.querySelector(".skill-pagination");


    // Memastikan elemen carousel tersedia
    if (
        !track ||
        pages.length === 0 ||
        !prevButton ||
        !nextButton ||
        !pagination
    ) {
        return;
    }


    let currentPage = 0;


    /* MEMBUAT INDIKATOR HALAMAN */

    pagination.innerHTML = "";

    pages.forEach((page, index) => {

        const dot = document.createElement("span");

        if (index === 0) {
            dot.classList.add("active");
        }

        // Klik indikator untuk berpindah halaman
        dot.addEventListener("click", () => {

            currentPage = index;

            updateSkillCarousel();

        });

        pagination.appendChild(dot);

    });


    const dots = pagination.querySelectorAll("span");


    /* MEMPERBARUI CAROUSEL */

    function updateSkillCarousel() {

        // Menggeser halaman carousel
        track.style.transform =
            `translateX(-${currentPage * 100}%)`;


        // Mengatur tombol sebelumnya
        prevButton.disabled = currentPage === 0;


        // Mengatur tombol berikutnya
        nextButton.disabled =
            currentPage === pages.length - 1;


        // Memperbarui indikator
        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentPage
            );

        });

    }


    /* TOMBOL SEBELUMNYA */

    prevButton.addEventListener("click", () => {

        if (currentPage > 0) {

            currentPage--;

            updateSkillCarousel();

        }

    });


    /* TOMBOL BERIKUTNYA */

    nextButton.addEventListener("click", () => {

        if (currentPage < pages.length - 1) {

            currentPage++;

            updateSkillCarousel();

        }

    });


    // Menampilkan halaman pertama
    updateSkillCarousel();

});


/* =========================================
   5. PORTFOLIO CAROUSEL
========================================= */

document.querySelectorAll("[data-portfolio-carousel]").forEach(carousel => {

    const track = carousel.querySelector(".portfolio-track");

    const pages = carousel.querySelectorAll(".portfolio-page");

    const prevButton = carousel.querySelector(".portfolio-prev");

    const nextButton = carousel.querySelector(".portfolio-next");

    const pagination =
        carousel.parentElement.querySelector(".portfolio-pagination");


    // Memastikan elemen carousel tersedia
    if (
        !track ||
        pages.length === 0 ||
        !prevButton ||
        !nextButton ||
        !pagination
    ) {
        return;
    }


    let currentPage = 0;


    /* MEMBUAT INDIKATOR PORTFOLIO */

    pagination.innerHTML = "";

    pages.forEach((page, index) => {

        const dot = document.createElement("span");

        dot.classList.add("portfolio-dot");

        if (index === 0) {
            dot.classList.add("active");
        }


        // Klik indikator untuk memilih halaman
        dot.addEventListener("click", () => {

            currentPage = index;

            updatePortfolioCarousel();

        });

        pagination.appendChild(dot);

    });


    const dots = pagination.querySelectorAll(".portfolio-dot");


    /* MEMPERBARUI CAROUSEL PORTFOLIO */

    function updatePortfolioCarousel() {

        // Menggeser halaman portfolio
        track.style.transform =
            `translateX(-${currentPage * 100}%)`;


        // Mengatur tombol sebelumnya
        prevButton.disabled = currentPage === 0;


        // Mengatur tombol berikutnya
        nextButton.disabled =
            currentPage === pages.length - 1;


        // Memperbarui indikator halaman
        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentPage
            );

        });

    }


    /* TOMBOL PROJECT SEBELUMNYA */

    prevButton.addEventListener("click", () => {

        if (currentPage > 0) {

            currentPage--;

            updatePortfolioCarousel();

        }

    });


    /* TOMBOL PROJECT BERIKUTNYA */

    nextButton.addEventListener("click", () => {

        if (currentPage < pages.length - 1) {

            currentPage++;

            updatePortfolioCarousel();

        }

    });


    // Menampilkan halaman portfolio pertama
    updatePortfolioCarousel();

});


/* =========================================
   6. INITIALIZATION
========================================= */

// Memastikan navigasi aktif sesuai posisi halaman
updateActiveNavigation();
