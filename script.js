// DOM Elements
const appointmentForm = document.getElementById("appointmentForm");
const dateInput = document.getElementById("date");
const submitBtn = appointmentForm?.querySelector('button');

// Set minimum date to today
if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    dateInput.min = `${year}-${month}-${day}`;
}

// Scroll-triggered animations with cyberpunk style
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 120);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Hero elements fade in
    const heroElements = document.querySelectorAll('.hero-copy > *, .hero-metrics, .hero-panel');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300 + index * 150);
    });

    // Observe section headings
    document.querySelectorAll('.section-head').forEach(el => {
        observer.observe(el);
    });

    // Observe test categories
    document.querySelectorAll('.test-category').forEach(el => {
        observer.observe(el);
    });

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(el => {
        observer.observe(el);
    });

    // Observe contact cards
    document.querySelectorAll('.contact-card').forEach(el => {
        observer.observe(el);
    });

    // Observe form elements
    document.querySelectorAll('.book-copy, form').forEach(el => {
        observer.observe(el);
    });

    // Observe management cards
    document.querySelectorAll('.manager-card').forEach(el => {
        observer.observe(el);
    });
});

// Header scroll effect with cyberpunk style
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
});

// Real-time field validation with cyberpunk feedback
const inputFields = document.querySelectorAll('#appointmentForm input, #appointmentForm select');

inputFields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
        if (field.classList.contains('error') || field.classList.contains('valid')) {
            validateField(field);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = false;

    switch (field.id) {
        case 'name':
            isValid = value.length >= 2;
            break;
        case 'phone':
            isValid = /^[\d\s\-+()]{7,}$/.test(value);
            break;
        case 'service':
        case 'date':
        case 'time':
            isValid = value !== '';
            break;
        case 'notes':
            isValid = true; // Optional field
            break;
    }

    field.classList.remove('error', 'valid');
    if (value && !isValid) {
        field.classList.add('error');
    } else if (isValid) {
        field.classList.add('valid');
    }
}

// Form submission with loading state and WhatsApp notification
if (appointmentForm) {
    appointmentForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Validate all fields
        let allValid = true;
        inputFields.forEach(field => {
            validateField(field);
            if (field.classList.contains('error') || !field.value.trim()) {
                allValid = false;
            }
        });

        if (!allValid) {
            this.style.animation = 'shake 0.5s ease';
            setTimeout(() => this.style.animation = '', 500);
            return;
        }

        // Get form values
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const notes = document.getElementById("notes")?.value.trim() || '';

        // Show loading state with cyberpunk style
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span>Processing...';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create WhatsApp message for the lab owner
        const whatsappMessage = `*New Appointment Request*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Service:* ${service}%0A*Date:* ${date}%0A*Time:* ${time}%0A*Notes:* ${notes || 'None'}`;
        const whatsappUrl = `https://wa.me/923367251204?text=${whatsappMessage}`;

        // Show success message with WhatsApp redirect
        this.style.display = 'none';
        
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.add('show');
            successMessage.innerHTML = `
                <h4><i class="fas fa-check-circle"></i> Appointment Booked Successfully!</h4>
                <p>> Thank you <strong>${name}</strong> for booking an appointment.</p>
                <p>> <strong>Service:</strong> ${service}</p>
                <p>> <strong>Date:</strong> ${date} at ${time}</p>
                <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(74, 222, 128, 0.3);">
                    <p style="font-size: 0.9rem; margin-bottom: 1rem;"><i class="fab fa-whatsapp"></i> You will receive a confirmation on WhatsApp shortly.</p>
                    <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp" style="display: inline-flex; align-items: center; justify-content: center; padding: 0.85rem 1.8rem; border-radius: 4px; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.85rem; background: linear-gradient(135deg, #25D366, #128C7E); color: #ffffff; box-shadow: 0 0 20px rgba(37, 211, 102, 0.4);">
                        <i class="fab fa-whatsapp" style="margin-right: 0.5rem;"></i> Confirm via WhatsApp
                    </a>
                </div>
            `;
        }

        this.reset();
        inputFields.forEach(field => field.classList.remove('valid', 'error'));
    });
}

// Add animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-8px); }
        80% { transform: translateX(8px); }
    }
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .site-header.scrolled {
        background: rgba(10, 10, 15, 0.95) !important;
        box-shadow: 0 4px 30px rgba(151, 117, 250, 0.1);
    }
    form input.error, form select.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 10px rgba(239, 68, 68, 0.3) !important;
    }
    form input.valid, form select.valid {
        border-color: var(--accent-green) !important;
        box-shadow: 0 0 10px rgba(74, 222, 128, 0.3) !important;
    }
    button .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-right: 8px;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    .test-category, .gallery-item, .manager-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
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

// Add glitch effect on brand hover
const brandKicker = document.querySelector('.brand-kicker');
if (brandKicker) {
    brandKicker.addEventListener('mouseenter', () => {
        brandKicker.style.animation = 'glitch 0.3s ease';
    });
    brandKicker.addEventListener('mouseleave', () => {
        brandKicker.style.animation = '';
    });
}

// Add glitch keyframes
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(glitchStyle);

// Phone input formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value;
        // Keep the +92 prefix if user starts with it
        if (!value.startsWith('+92 ') && value.length > 0) {
            if (value.startsWith('+92')) {
                value = '+92 ' + value.substring(3);
            } else if (value.startsWith('92')) {
                value = '+92 ' + value.substring(2);
            }
            e.target.value = value;
        }
    });
}
