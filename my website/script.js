// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (window.scrollY > 100) {
        if (isDarkMode) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        if (isDarkMode) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + '+';
                }, 20);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe about section for stats animation
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Animate skill bars on scroll
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add hover effects to timeline items
// document.querySelectorAll('.timeline-content').forEach(item => {
//     item.addEventListener('mouseenter', function() {
//         this.style.transform = 'translateY(-5px)';
//     });
//     
//     item.addEventListener('mouseleave', function() {
//         this.style.transform = 'translateY(0)';
//     });
// });

// Theme Switcher
const themeSwitcher = document.querySelector('.theme-switcher i');
const body = document.body;

function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (window.scrollY > 100) {
        navbar.style.background = isDarkMode ? 'rgba(10, 10, 15, 0.95)' : 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = isDarkMode ? 'rgba(10, 10, 15, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    }
}

function setDarkTheme() {
    body.classList.add('dark-mode');
    themeSwitcher.classList.remove('fa-moon');
    themeSwitcher.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
    updateNavbarBackground();
}

function setLightTheme() {
    body.classList.remove('dark-mode');
    themeSwitcher.classList.remove('fa-sun');
    themeSwitcher.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
    updateNavbarBackground();
}

themeSwitcher.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        setLightTheme();
    } else {
        setDarkTheme();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setDarkTheme();
    } else {
        setLightTheme();
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual email service)
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            alert('Thank you! Your message has been sent successfully. I will get back to you soon.');
        }, 2000);
    });
}

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    
    body.dark-mode .nav-link.active {
        color: var(--cyber-cyan) !important;
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// === Animated Background Particles ===
(function() {
    const canvas = document.getElementById('bg-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 32;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function randomBetween(a, b) {
        return a + Math.random() * (b - a);
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const size = randomBetween(24, 64);
            particles.push({
                x: randomBetween(0, width),
                y: randomBetween(0, height),
                baseY: 0,
                size,
                speed: randomBetween(0.1, 0.5),
                drift: randomBetween(-0.2, 0.2),
                shape: Math.random() > 0.5 ? 'circle' : 'polygon',
                sides: Math.floor(randomBetween(5, 8)),
                angle: randomBetween(0, Math.PI * 2),
                opacity: randomBetween(0.08, 0.18)
            });
        }
    }

    function getColors() {
        const isDark = document.body.classList.contains('dark-mode');
        if (isDark) {
            return [
                'rgba(0,246,255,0.18)', // cyber-cyan
                'rgba(255,0,229,0.13)', // cyber-pink
                'rgba(57,255,20,0.10)', // cyber-green
                'rgba(138,43,226,0.10)' // cyber-purple
            ];
        } else {
            return [
                'rgba(56,189,248,0.13)', // sky-blue
                'rgba(110,231,183,0.10)', // light-green
                'rgba(59,130,246,0.10)', // accent blue
                'rgba(37,99,235,0.10)' // primary blue
            ];
        }
    }

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        createParticles();
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        const colors = getColors();
        const scrollY = window.scrollY;
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            // Parallax effect: move with scroll
            const y = p.y + (scrollY * p.speed * 0.3);
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.translate(p.x, y);
            ctx.rotate(p.angle + (scrollY * 0.0005));
            ctx.beginPath();
            if (p.shape === 'circle') {
                ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            } else {
                // Draw polygon
                const sides = p.sides;
                for (let j = 0; j < sides; j++) {
                    const theta = (Math.PI * 2 / sides) * j;
                    const px = Math.cos(theta) * p.size;
                    const py = Math.sin(theta) * p.size;
                    if (j === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
            }
            ctx.fillStyle = colors[i % colors.length];
            ctx.shadowColor = colors[i % colors.length];
            ctx.shadowBlur = 16;
            ctx.fill();
            ctx.restore();
        }
    }

    function animate() {
        draw();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', draw);
    // Redraw on theme change
    const observer = new MutationObserver(draw);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    resizeCanvas();
    animate();
})();

// Animated bottom visual: SVG ocean waves (light) or cyberpunk wind (dark)
(function() {
    const svg = document.getElementById('bottom-svg-visual');
    if (!svg) return;
    let isDark = document.body.classList.contains('dark-mode');
    let frame = 0;
    let animationId;

    function drawWaves() {
        const width = window.innerWidth;
        const height = 80;
        svg.innerHTML = '';
        const waves = [
            { amp: 10, freq: 1.5, speed: 0.012, color: 'url(#wave1)' },
            { amp: 7, freq: 2.2, speed: 0.018, color: 'url(#wave2)' },
            { amp: 4, freq: 3.1, speed: 0.024, color: 'url(#wave3)' }
        ];
        let defs = `<defs>
            <linearGradient id="wave1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="var(--sky-blue)" />
                <stop offset="100%" stop-color="var(--light-green)" />
            </linearGradient>
            <linearGradient id="wave2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="var(--light-green)" />
                <stop offset="100%" stop-color="var(--sky-blue)" />
            </linearGradient>
            <linearGradient id="wave3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="var(--sky-blue)" />
                <stop offset="100%" stop-color="#fff" />
            </linearGradient>
        </defs>`;
        svg.innerHTML += defs;
        waves.forEach((w, i) => {
            let path = '';
            for (let x = 0; x <= width; x += 4) {
                const y = Math.sin((x / width) * w.freq * Math.PI * 2 + frame * w.speed + i) * w.amp + (60 + i * 8);
                path += (x === 0 ? 'M' : 'L') + x + ',' + y + ' ';
            }
            path += `L ${width},${height} L 0,${height} Z`;
            svg.innerHTML += `<path d="${path}"
                fill="${w.color}" fill-opacity="${0.18 + 0.12 * (waves.length - i)}" style="transition:fill 0.3s;" />`;
        });
    }

    function drawCyberWind() {
        const width = window.innerWidth;
        const height = 80;
        svg.innerHTML = '';
        const lines = [
            { amp: 16, freq: 1.2, speed: 0.012, color: 'url(#wind1)', blur: 6, glow: 0.18 },
            { amp: 10, freq: 2.1, speed: 0.018, color: 'url(#wind2)', blur: 10, glow: 0.12 },
            { amp: 6, freq: 3.3, speed: 0.022, color: 'url(#wind3)', blur: 16, glow: 0.10 }
        ];
        let defs = `<defs>
            <linearGradient id="wind1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="var(--cyber-purple)" />
                <stop offset="100%" stop-color="var(--cyber-cyan)" />
            </linearGradient>
            <linearGradient id="wind2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="var(--cyber-cyan)" />
                <stop offset="100%" stop-color="var(--cyber-pink)" />
            </linearGradient>
            <linearGradient id="wind3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="var(--cyber-pink)" />
                <stop offset="100%" stop-color="var(--cyber-green)" />
            </linearGradient>
        </defs>`;
        svg.innerHTML += defs;
        lines.forEach((l, i) => {
            let path = '';
            for (let x = 0; x <= width; x += 4) {
                const y = Math.sin((x / width) * l.freq * Math.PI * 2 + frame * l.speed + i * 2) * l.amp + (60 - i * 10);
                path += (x === 0 ? 'M' : 'L') + x + ',' + y + ' ';
            }
            svg.innerHTML += `<path d="${path}"
                fill="none" stroke="${l.color}" stroke-width="4" stroke-opacity="${0.32 + l.glow}" filter="url(#blur${i})" />`;
        });
        svg.innerHTML += `
            <defs>
                <filter id="blur0"><feGaussianBlur stdDeviation="6"/></filter>
                <filter id="blur1"><feGaussianBlur stdDeviation="10"/></filter>
                <filter id="blur2"><feGaussianBlur stdDeviation="16"/></filter>
            </defs>`;
    }

    function animate() {
        isDark = document.body.classList.contains('dark-mode');
        if (isDark) {
            drawCyberWind();
        } else {
            drawWaves();
        }
        frame++;
        animationId = requestAnimationFrame(animate);
    }

    function onResizeOrTheme() {
        if (isDark) drawCyberWind(); else drawWaves();
    }

    window.addEventListener('resize', onResizeOrTheme);
    const observer = new MutationObserver(() => {
        isDark = document.body.classList.contains('dark-mode');
        onResizeOrTheme();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    animate();
})();