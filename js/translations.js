let currentLanguage = 'en';
let translationsData = {};

const directTranslations = {
    en: {
        'Electrical Installation': 'Electrical Installation',
        'Air Condition Installation': 'Air Condition Installation',
        'CCTV Camera Installation': 'CCTV Camera Installation',
        'Electric Fence Installation': 'Electric Fence Installation',
        'Motor Gate Installation': 'Motor Gate Installation',
        'BOOK THIS SERVICE NOW': 'BOOK THIS SERVICE NOW',
        'Back to Services': 'Back to Services',
        'How to get this service': 'How to get this service',
        'Fill the booking form on our website': 'Fill the booking form on our website',
        'Call us at': 'Call us at',
        'Email us at': 'Email us at'
    },
    sw: {
        'Electrical Installation': 'UFUNGAJI WA UMEME',
        'Air Condition Installation': 'UFUNGAJI WA AIR CONDITION',
        'CCTV Camera Installation': 'UFUNGAJI WA KAMERA CCTV',
        'Electric Fence Installation': 'UFUNGAJI WA UZIO WA UMEME',
        'Motor Gate Installation': 'UFUNGAJI WA LANGI LA MOTA',
        'BOOK THIS SERVICE NOW': 'BOOK HUDUMA SASA',
        'Back to Services': 'Rudi kwenye Huduma',
        'How to get this service': 'JINSIA YA KUPATA HUDUMA',
        'Fill the booking form on our website': 'Kujaza fomu ya booking kwenye website yetu',
        'Call us at': 'Kutupigia simu',
        'Email us at': 'Kututumia barua pepe'
    }
};

async function switchLanguage(lang) {
    if (currentLanguage === lang) return;
    currentLanguage = lang;
    try {
        const response = await fetch(`languages/${lang}.json`);
        if (!response.ok) throw new Error('Language file not found');
        translationsData = await response.json();
        translateAllElements();
        translatePlaceholders();
        translateSelectOptions();
        if (translationsData.site_title) document.title = translationsData.site_title;
        localStorage.setItem('preferred_language', lang);
        updateLanguageButtons(lang);
        refreshSliderCaptions();
        refreshFaqContent();
        translateServiceDetailPage();
        translateDynamicContent();
        translateHeaderFooter();
    } catch (error) {
        console.error('Error loading language:', error);
        applyDirectTranslations(lang);
    }
}

function applyDirectTranslations(lang) {
    const translations = directTranslations[lang] || directTranslations.en;
    document.querySelectorAll('h1, h2, h3, .btn-submit, .btn-read, .btn-slide, .btn-back').forEach(el => {
        const text = el.textContent.trim();
        if (translations[text]) {
            if (el.tagName === 'BUTTON' || el.tagName === 'A') el.innerHTML = translations[text];
            else el.textContent = translations[text];
        }
    });
    updateLanguageButtons(lang);
}

function translateAllElements() {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translationsData[key]) {
            if (el.tagName === 'BUTTON' || el.tagName === 'A') el.innerHTML = translationsData[key];
            else el.textContent = translationsData[key];
        }
    });
}

function translatePlaceholders() {
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (translationsData[key]) el.placeholder = translationsData[key];
    });
}

function translateSelectOptions() {
    document.querySelectorAll('option[data-translate]').forEach(opt => {
        const key = opt.getAttribute('data-translate');
        if (translationsData[key]) opt.textContent = translationsData[key];
    });
}

function refreshSliderCaptions() {
    document.querySelectorAll('.slide').forEach((slide, i) => {
        const num = i + 1;
        const title = slide.querySelector('.slide-caption h2');
        const text = slide.querySelector('.slide-caption p');
        const btn = slide.querySelector('.slide-caption .btn-slide');
        if (title && translationsData[`slider_title_${num}`]) title.textContent = translationsData[`slider_title_${num}`];
        if (text && translationsData[`slider_text_${num}`]) text.textContent = translationsData[`slider_text_${num}`];
        if (btn && translationsData.btn_book) btn.innerHTML = translationsData.btn_book;
    });
}

function refreshFaqContent() {
    document.querySelectorAll('.faq-item').forEach((item, i) => {
        const q = item.querySelector('.faq-question span');
        const a = item.querySelector('.faq-answer p');
        if (q && translationsData[`faq_${i+1}_q`]) q.textContent = translationsData[`faq_${i+1}_q`];
        if (a && translationsData[`faq_${i+1}_a`]) a.textContent = translationsData[`faq_${i+1}_a`];
    });
}

function translateServiceDetailPage() {
    const card = document.querySelector('.service-detail-card');
    if (!card) return;
    const mainTitle = card.querySelector('h1');
    if (mainTitle) {
        const text = mainTitle.textContent.trim();
        const map = {
            'Electrical Installation': 'electrical_detail_title',
            'CCTV Camera Installation': 'cctv_detail_title',
            'Electric Fence Installation': 'fence_detail_title',
            'Air Condition Installation': 'ac_detail_title',
            'Motor Gate Installation': 'gate_detail_title'
        };
        for (const [key, transKey] of Object.entries(map)) {
            if (text.includes(key) && translationsData[transKey]) {
                mainTitle.innerHTML = mainTitle.innerHTML.replace(/^[^<]*/, translationsData[transKey]);
                break;
            }
        }
    }
    const priceBox = card.querySelector('.price-box');
    if (priceBox && translationsData.electrical_detail_how_title) {
        const priceTitle = priceBox.querySelector('h3');
        if (priceTitle) priceTitle.innerHTML = `📞 ${translationsData.electrical_detail_how_title}`;
        const priceNote = priceBox.querySelector('p:last-child');
        if (priceNote && translationsData.electrical_detail_how_note) priceNote.textContent = translationsData.electrical_detail_how_note;
    }
    const bookingBtn = card.querySelector('.btn-submit');
    if (bookingBtn && translationsData.btn_book_now) bookingBtn.innerHTML = `📅 ${translationsData.btn_book_now}`;
    const backBtn = card.querySelector('.btn-back');
    if (backBtn && translationsData.btn_back_to_services) backBtn.innerHTML = `← ${translationsData.btn_back_to_services}`;
}

function translateDynamicContent() {
    const projectsTitle = document.querySelector('.projects-section .section-title');
    if (projectsTitle && translationsData.projects_title) projectsTitle.textContent = translationsData.projects_title;
}

function translateHeaderFooter() {
    const footerAbout = document.querySelector('.footer-col:first-child p');
    if (footerAbout && translationsData.footer_about) footerAbout.textContent = translationsData.footer_about;
    const footerContactTitle = document.querySelector('.footer-col:nth-child(3) h3');
    if (footerContactTitle && translationsData.footer_contact) footerContactTitle.textContent = translationsData.footer_contact;
    const copyright = document.querySelector('.footer-bottom p span');
    if (copyright && translationsData.copyright) copyright.textContent = translationsData.copyright;
}

function updateLanguageButtons(activeLang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const btnLang = btn.getAttribute('onclick');
        if (btnLang && btnLang.includes(`'${activeLang}'`)) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function loadSavedLanguage() {
    const saved = localStorage.getItem('preferred_language');
    switchLanguage(saved === 'en' || saved === 'sw' ? saved : 'en');
}

document.addEventListener('DOMContentLoaded', () => {
    loadSavedLanguage();
    new MutationObserver(() => {
        if (Object.keys(translationsData).length > 