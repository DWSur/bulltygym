// ==========================================
// BULLTY GYM - JAVASCRIPT PRINCIPAL
// ==========================================

// 1. HEADER SCROLL
const header = document.getElementById('main-header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-dark/95', 'backdrop-blur-xl', 'shadow-lg', 'py-2');
            header.classList.remove('bg-transparent', 'py-4');
        } else {
            header.classList.remove('bg-dark/95', 'backdrop-blur-xl', 'shadow-lg', 'py-2');
            header.classList.add('bg-transparent', 'py-4');
        }
    });
}

// 2. MOBILE MENU
const menuBtn = document.getElementById('btn-menu');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.style.maxHeight !== '0px' && mobileMenu.style.maxHeight !== '';
        mobileMenu.style.maxHeight = isOpen ? '0px' : '500px';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => { mobileMenu.style.maxHeight = '0px'; });
    });
}

// 3. SCROLL REVEAL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 4. FAQ ACCORDION
document.querySelectorAll('.faq-btn').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('.faq-icon');
        const isOpen = content.classList.contains('grid-rows-[1fr]');
        
        document.querySelectorAll('.faq-content').forEach(c => {
            c.classList.remove('grid-rows-[1fr]');
            c.classList.add('grid-rows-[0fr]');
        });
        document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');
        
        if (!isOpen) {
            content.classList.remove('grid-rows-[0fr]');
            content.classList.add('grid-rows-[1fr]');
            icon.style.transform = 'rotate(45deg)';
        }
    });
});

// 5. TESTIMONIAL SLIDER (Con protección por si está comentado)
const testimonials = [
    { name: "Elena M.", role: "Socio · 18 meses", text: "Programación personalizada que funciona. Mi peso muerto pasó de 80 a 160 kg. Los coaches saben exactamente lo que hacen." },
    { name: "Marco D.", role: "Socio · 2 años", text: "BULLTY GYM lo cambió todo. El coaching es de élite y el material, de primer nivel. A los 38 soy más fuerte que nunca." },
    { name: "Sofía R.", role: "Socio · 8 meses", text: "El ambiente te empuja a dar lo mejor. He perdido 12kg y ganado una fuerza que no sabía que tenía. Totalmente recomendable." },
    { name: "David K.", role: "Socio · 1 año", text: "Por fin un gimnasio que no es una fábrica. Aquí te conocen por tu nombre y tu progreso es su prioridad." }
];
let currentTest = 3;

function updateTestimonial(index) {
    const imgs = document.querySelectorAll('.testimonial-img');
    const dots = document.querySelectorAll('#testimonial-dots button');
    const t = testimonials[index];
    
    if (imgs.length > 0) {
        imgs.forEach((img, i) => {
            if (i === index) { img.classList.remove('opacity-0', 'scale-105'); img.classList.add('opacity-100', 'scale-100', 'active'); } 
            else { img.classList.add('opacity-0', 'scale-105'); img.classList.remove('opacity-100', 'scale-100', 'active'); }
        });
    }
    if (dots.length > 0) {
        dots.forEach((dot, i) => {
            if (i === index) { dot.classList.remove('w-4', 'bg-surface'); dot.classList.add('w-8', 'bg-primary'); } 
            else { dot.classList.add('w-4', 'bg-surface'); dot.classList.remove('w-8', 'bg-primary'); }
        });
    }
    
    const textEl = document.getElementById('testimonial-text');
    const nameEl = document.getElementById('testimonial-name');
    const roleEl = document.getElementById('testimonial-role');
    
    if (textEl && nameEl && roleEl) {
        textEl.style.opacity = 0;
        setTimeout(() => {
            textEl.textContent = `"${t.text}"`;
            nameEl.textContent = t.name;
            roleEl.textContent = t.role;
            textEl.style.opacity = 1;
        }, 300);
    }
    currentTest = index;
}

const nextTestBtn = document.getElementById('next-test');
const prevTestBtn = document.getElementById('prev-test');
const dotsContainer = document.getElementById('testimonial-dots');

if (nextTestBtn) nextTestBtn.addEventListener('click', () => updateTestimonial((currentTest + 1) % testimonials.length));
if (prevTestBtn) prevTestBtn.addEventListener('click', () => updateTestimonial((currentTest - 1 + testimonials.length) % testimonials.length));
if (dotsContainer) {
    dotsContainer.querySelectorAll('button').forEach(dot => {
        dot.addEventListener('click', () => updateTestimonial(parseInt(dot.dataset.index)));
    });
}
setInterval(() => updateTestimonial((currentTest + 1) % testimonials.length), 6000);

// 6. MENÚ ACTIVO - Scroll Spy
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveMenu() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                activeLink.classList.add('active');
            }
        }
    });

    if (scrollY < 100) {
        navLinks.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('.nav-link[href="#inicio"]');
        if (homeLink) homeLink.classList.add('active');
    }
}
window.addEventListener('scroll', updateActiveMenu, { passive: true });
window.addEventListener('load', updateActiveMenu);
updateActiveMenu();

// 7. COOKIE BANNER & MODAL LOGIC
const cookieBanner = document.getElementById('cookie-banner');
const cookieModal = document.getElementById('cookie-modal');
const cookieModalBackdrop = document.getElementById('cookie-modal-backdrop');
const CONSENT_KEY = 'bullty_cookie_consent';

function showCookieBanner() {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent && cookieBanner) {
        setTimeout(() => {
            cookieBanner.classList.remove('translate-y-full');
            cookieBanner.classList.add('translate-y-0');
        }, 1500);
    }
}

function hideCookieBanner() {
    if (cookieBanner) {
        cookieBanner.classList.remove('translate-y-0');
        cookieBanner.classList.add('translate-y-full');
    }
}

function openCookieModal() {
    hideCookieBanner();
    if (cookieModal) {
        cookieModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeCookieModal() {
    if (cookieModal) {
        cookieModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function saveCookiePreferences(analytics = false, marketing = false) {
    const consent = { 
        necessary: true, 
        analytics: analytics, 
        marketing: marketing, 
        timestamp: new Date().toISOString() 
    };
    
    // Guardar en localStorage
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    
    // También intentar guardar cookie
    try {
        const expires = new Date();
        expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
        document.cookie = `cookie_consent=${encodeURIComponent(JSON.stringify(consent))};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    } catch(e) {
        // Si falla la cookie, no pasa nada, tenemos localStorage
    }
    
    hideCookieBanner();
    closeCookieModal();
}

// Event Listeners de botones de cookies
const bind = (id, fn) => { 
    const el = document.getElementById(id); 
    if (el) el.addEventListener('click', fn); 
};

bind('cookie-accept', () => saveCookiePreferences(true, true));
bind('cookie-reject', () => saveCookiePreferences(false, false));
bind('cookie-settings', openCookieModal);
bind('cookie-banner-accept-inline', () => saveCookiePreferences(true, true));
bind('cookie-banner-reject-inline', () => saveCookiePreferences(false, false));
bind('cookie-banner-settings-inline', openCookieModal);
bind('cookie-modal-close', closeCookieModal);

if (cookieModalBackdrop) {
    cookieModalBackdrop.addEventListener('click', closeCookieModal);
}

bind('cookie-save-preferences', () => {
    const analytics = document.getElementById('cookie-analytics-toggle')?.checked || false;
    const marketing = document.getElementById('cookie-marketing-toggle')?.checked || false;
    saveCookiePreferences(analytics, marketing);
});

bind('cookie-accept-all-modal', () => saveCookiePreferences(true, true));

// 8. ABRIR MODAL DE COOKIES DESDE EL FOOTER (LA PIEZA QUE FALTABA)
const openCookieSettingsBtn = document.getElementById('open-cookie-settings');
if (openCookieSettingsBtn) {
    openCookieSettingsBtn.addEventListener('click', () => {
        // Restaurar el estado de los checkboxes según lo guardado
        const consent = localStorage.getItem(CONSENT_KEY);
        if (consent) {
            const preferences = JSON.parse(consent);
            const analyticsToggle = document.getElementById('cookie-analytics-toggle');
            const marketingToggle = document.getElementById('cookie-marketing-toggle');
            if (analyticsToggle) analyticsToggle.checked = preferences.analytics;
            if (marketingToggle) marketingToggle.checked = preferences.marketing;
        }
        
        // Abrir el modal
        openCookieModal();
    });
}

// Inicializar
showCookieBanner();