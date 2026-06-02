// ========== LOADING INDICATOR - INITIAL LOAD ONLY ==========
function createParticles() {
    const particlesContainer = document.getElementById('loader-particles');
    if (!particlesContainer) return;
    particlesContainer.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = 1.5 + Math.random() * 2.5 + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.backgroundColor = Math.random() > 0.5 ? '#DAA520' : '#0a6c6c';
        particlesContainer.appendChild(particle);
    }
}

// Hide loader after page loads (initial load only)
window.addEventListener('load', function() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hide');
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }, 800);
    }
});

// Create particles on initial load
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
});

// ========== WHATSAPP & EMAIL CONFIG ==========
const WHATSAPP_NUMBER = '255763937615';
const COMPANY_EMAIL = 'Kashombaelectrical@gmail.com';
const COMPANY_NAME = 'KASHOMBA ELECTRICAL SOLUTION';
const LOCATION = 'Dar es Salaam, Goba Njia NNE';

function sendWhatsAppMessage(phoneNumber, message) {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

function sendEmail(email, subject, body) {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ========== BOOKING FORM ==========
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const service = document.getElementById('service');
        const date = document.getElementById('date');
        const address = document.getElementById('address');
        const email = document.getElementById('email');
        const time = document.getElementById('time');
        const message = document.getElementById('message');
        
        document.querySelectorAll('.error').forEach(el => el.remove());
        
        if (!name.value.trim()) { showError(name, 'Please enter your full name'); isValid = false; }
        if (!phone.value.trim() || phone.value.length < 10) { showError(phone, 'Please enter a valid phone number'); isValid = false; }
        if (!service.value) { showError(service, 'Please select a service'); isValid = false; }
        if (!date.value) { showError(date, 'Please select a date'); isValid = false; }
        if (!address.value.trim()) { showError(address, 'Please enter your address'); isValid = false; }
        
        if (isValid) {
            const bookingData = { 
                name: name.value, 
                phone: phone.value, 
                email: email?.value || '', 
                service: service.value, 
                date: date.value, 
                time: time?.value || '', 
                address: address.value, 
                message: message?.value || '', 
                location: LOCATION, 
                dateSubmitted: new Date().toISOString() 
            };
            
            let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            bookings.push(bookingData);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            
            sendWhatsAppMessage(bookingData.phone, `Thank you ${bookingData.name}!\n\nYour booking has been received by ${COMPANY_NAME}.\n\n📋 Service: ${bookingData.service}\n📅 Date: ${bookingData.date}\n📍 Address: ${bookingData.address}\n\nWe will contact you within 24 hours to confirm.\n📍 ${LOCATION}`);
            sendWhatsAppMessage(WHATSAPP_NUMBER, `🔴 NEW BOOKING!\n\n👤 Name: ${bookingData.name}\n📞 Phone: ${bookingData.phone}\n🛠️ Service: ${bookingData.service}\n📅 Date: ${bookingData.date}\n📍 Address: ${bookingData.address}\n📍 ${LOCATION}`);
            sendEmail(COMPANY_EMAIL, `New Booking - ${bookingData.service}`, `Name: ${bookingData.name}\nPhone: ${bookingData.phone}\nService: ${bookingData.service}\nDate: ${bookingData.date}\nAddress: ${bookingData.address}`);
            
            alert(`Thank you ${bookingData.name}!\n\nYour booking has been received.\n\n✓ WhatsApp message sent\n✓ Email sent\n\nWe will contact you within 24 hours.`);
            bookingForm.reset();
        }
    });
}

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        const name = document.getElementById('contactName');
        const email = document.getElementById('contactEmail');
        const phone = document.getElementById('contactPhone');
        const message = document.getElementById('contactMessage');
        
        document.querySelectorAll('.error').forEach(el => el.remove());
        
        if (!name.value.trim()) { showError(name, 'Please enter your name'); isValid = false; }
        if (!email.value.trim() || !email.value.includes('@')) { showError(email, 'Please enter a valid email'); isValid = false; }
        if (!message.value.trim() || message.value.trim().length < 10) { showError(message, 'Please write your message (at least 10 characters)'); isValid = false; }
        
        if (isValid) {
            const contactData = { name: name.value, email: email.value, phone: phone?.value || '', message: message.value };
            sendWhatsAppMessage(WHATSAPP_NUMBER, `📧 NEW MESSAGE!\n\n👤 Name: ${contactData.name}\n📞 Phone: ${contactData.phone || 'None'}\n📧 Email: ${contactData.email}\n💬 Message: ${contactData.message}\n📍 ${LOCATION}`);
            sendEmail(COMPANY_EMAIL, `Message from ${contactData.name}`, `Name: ${contactData.name}\nPhone: ${contactData.phone}\nEmail: ${contactData.email}\nMessage: ${contactData.message}`);
            if (contactData.phone) { sendWhatsAppMessage(contactData.phone, `Thank you ${contactData.name}!\n\nYour message has been received.\nWe will reply within 24 hours.\n📍 ${LOCATION}`); }
            alert(`Thank you ${contactData.name}!\n\nYour message has been sent.\nWe will reply within 24 hours.`);
            contactForm.reset();
        }
    });
}

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = '#dc3545';
    error.style.fontSize = '12px';
    error.style.marginTop = '5px';
    error.textContent = message;
    input.parentNode.appendChild(error);
    input.style.border = '1px solid #dc3545';
    input.addEventListener('input', () => { error.remove(); input.style.border = '1px solid #ddd'; });
}

// ========== SLIDER - FAST TRANSITION ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slider-dots');

if (slides.length > 0 && dotsContainer) {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function showSlide(n) {
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    slides[n].classList.add('active');
    const allDots = document.querySelectorAll('.dot');
    if (allDots[n]) allDots[n].classList.add('active');
}

function nextSlide() { 
    currentSlide = (currentSlide + 1) % slides.length; 
    showSlide(currentSlide); 
}

function prevSlide() { 
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; 
    showSlide(currentSlide); 
}

function goToSlide(n) { 
    currentSlide = n; 
    showSlide(currentSlide); 
}

document.querySelector('.prev')?.addEventListener('click', prevSlide);
document.querySelector('.next')?.addEventListener('click', nextSlide);

// Auto play slider - FAST SPEED: 1.5 seconds (1500ms)
let slideInterval = setInterval(nextSlide, 1500);
const sliderContainerElem = document.querySelector('.slider-container');
if (sliderContainerElem) {
    sliderContainerElem.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderContainerElem.addEventListener('mouseleave', () => { 
        slideInterval = setInterval(nextSlide, 1500); 
    });
}

// ========== MOBILE MENU ==========
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');
if (menuToggle) {
    menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
}

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        document.querySelectorAll('.faq-answer').forEach(item => {
            if (item !== answer) {
                item.classList.remove('active');
                item.style.maxHeight = null;
                const otherIcon = item.previousElementSibling.querySelector('i');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        answer.classList.toggle('active');
        if (answer.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            if (icon) icon.style.transform = 'rotate(180deg)';
        } else {
            answer.style.maxHeight = null;
            if (icon) icon.style.transform = 'rotate(0deg)';
        }
    });
});
document.querySelectorAll('.faq-answer').forEach(answer => { 
    answer.style.maxHeight = null; 
    answer.classList.remove('active'); 
});

// ========== BACK TO TOP ==========
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.classList.add('back-to-top');
document.body.appendChild(backToTop);
window.addEventListener('scroll', () => { 
    backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none'; 
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ========== IMAGE VIEWER ==========
function openImageViewer(imageSrc) {
    const viewer = document.createElement('div');
    viewer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:2000;display:flex;align-items:center;justify-content:center;cursor:pointer';
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = 'max-width:90%;max-height:90%;border-radius:10px;border:3px solid #DAA520';
    viewer.appendChild(img);
    viewer.addEventListener('click', () => viewer.remove());
    document.body.appendChild(viewer);
}

document.querySelectorAll('.project-item img, .gallery-item img').forEach(img => {
    img.addEventListener('click', () => openImageViewer(img.src));
});

// ========== CONSOLE LOG ==========
console.log('KASHOMBA ELECTRICAL SOLUTION - Website Loaded Successfully');
console.log('WhatsApp Number:', WHATSAPP_NUMBER);
console.log('Company Email:', COMPANY_EMAIL);
console.log('Location:', LOCATION);
console.log('Slider Speed: 1.5 seconds per slide');