
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});


document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));


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


const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}


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


const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}



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

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
       
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
       
        setTimeout(() => {
         
            this.reset();
            
           
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
         
            alert('Thank you! Your message has been sent successfully. I will get back to you soon.');
        }, 2000);
    });
}


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


window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
});


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


window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});


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
                'rgba(0,246,255,0.18)', 
                'rgba(255,0,229,0.13)', 
                'rgba(57,255,20,0.10)', 
                'rgba(138,43,226,0.10)' 
            ];
        } else {
            return [
                'rgba(56,189,248,0.13)', 
                'rgba(110,231,183,0.10)', 
                'rgba(59,130,246,0.10)', 
                'rgba(37,99,235,0.10)' 
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
           
            const y = p.y + (scrollY * p.speed * 0.3);
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.translate(p.x, y);
            ctx.rotate(p.angle + (scrollY * 0.0005));
            ctx.beginPath();
            if (p.shape === 'circle') {
                ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            } else {
                
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
 
    const observer = new MutationObserver(draw);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    resizeCanvas();
    animate();
})();
