document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Header ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple animation for hamburger
        menuBtn.classList.toggle('open');
        const bars = menuBtn.querySelectorAll('.bar');
        if (menuBtn.classList.contains('open')) {
            bars[0].style.transform = 'translateY(7px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';

            bars.forEach(bar => {
                bar.style.backgroundColor = 'var(--clr-text-main)';
            });
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';

            // Revert color if at top
            if (window.scrollY <= 50) {
                bars.forEach(bar => {
                    bar.style.backgroundColor = 'white';
                });
            }
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('open');
            const bars = menuBtn.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';

            if (window.scrollY <= 50) {
                bars.forEach(bar => {
                    bar.style.backgroundColor = 'white';
                });
            }
        });
    });

    // --- Hero Slider ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        const updateSlider = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        };

        const nextSlide = () => {
            const nextIndex = (currentSlide + 1) % totalSlides;
            updateSlider(nextIndex);
        };

        const prevSlide = () => {
            const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider(prevIndex);
        };

        // Event Listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateSlider(index);
                resetInterval();
            });
        });

        // Auto-play
        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5s
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        startInterval();
    }
});
