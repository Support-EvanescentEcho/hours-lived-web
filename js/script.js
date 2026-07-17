// Theme Switcher Logic
function applyTheme(themeChoice) {
    const htmlElement = document.documentElement;
    if (themeChoice === 'system') {
        localStorage.removeItem('theme');
        // Detect system theme
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemIsDark) {
            htmlElement.setAttribute('data-theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
        }
    } else {
        localStorage.setItem('theme', themeChoice);
        htmlElement.setAttribute('data-theme', themeChoice);
    }
}

// Initialize Theme from localStorage or System Preferences
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const selectElement = document.getElementById('theme-select');
    
    if (savedTheme) {
        applyTheme(savedTheme);
        if (selectElement) selectElement.value = savedTheme;
    } else {
        applyTheme('system');
        if (selectElement) selectElement.value = 'system';
    }
}

// Language Loader and Switcher Logic
async function loadTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch locales/${lang}.json`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading translation file:', error);
        // Fallback to Spanish if fetch fails
        if (lang !== 'es') {
            return await loadTranslations('es');
        }
        return null;
    }
}

async function applyLanguage(lang) {
    // Apply class helper to body
    document.body.className = '';
    document.body.classList.add('lang-active-' + lang);
    localStorage.setItem('lang', lang);
    
    const dict = await loadTranslations(lang);
    if (!dict) return;
    
    // Translate text contents dynamically
    document.title = dict.title || "Hours Lived";
    document.getElementById('logo-sub').innerText = dict.logoSub;
    document.getElementById('theme-lbl').innerText = dict.themeLbl;
    document.getElementById('lang-lbl').innerText = dict.langLbl;
    
    // Options in selectors
    document.getElementById('theme-opt-light').innerText = dict.themeLight;
    document.getElementById('theme-opt-dark').innerText = dict.themeDark;
    document.getElementById('theme-opt-system').innerText = dict.themeSystem;
    
    // Hero
    document.getElementById('hero-title').innerText = dict.heroTitle;
    document.getElementById('hero-desc').innerText = dict.heroDesc;
    
    // Tabs
    document.getElementById('tab-support').innerText = dict.tabSupport;
    document.getElementById('tab-features').innerText = dict.tabFeatures;
    document.getElementById('tab-faq').innerText = dict.tabFaq;
    document.getElementById('tab-privacy').innerText = dict.tabPrivacy;
    document.getElementById('tab-terms').innerText = dict.tabTerms;
    
    // Support Card
    document.getElementById('card-tributes-title').innerText = dict.cardTributesTitle;
    document.getElementById('tributes-desc-1').innerText = dict.tributesDesc1;
    document.getElementById('tributes-desc-2').innerText = dict.tributesDesc2;
    document.getElementById('tributes-list-title').innerText = dict.tributesListTitle;
    document.getElementById('tributes-ip-notice').innerHTML = dict.tributesIpNotice;
    
    // Localized Quote
    if (dict.quoteText) {
        document.getElementById('quote-text').innerText = `"${dict.quoteText}"`;
    }
    if (dict.quoteAuthor) {
        document.getElementById('quote-author').innerText = `— ${dict.quoteAuthor}`;
    }

    // Localized Tributes List
    const tributesListEl = document.getElementById('tributes-list');
    if (tributesListEl && dict.tributesList) {
        tributesListEl.innerHTML = '';
        dict.tributesList.forEach(tribute => {
            const li = document.createElement('li');
            li.innerText = tribute;
            tributesListEl.appendChild(li);
        });
    }
    
    // Support Actions Card
    document.getElementById('card-support-title').innerText = dict.cardSupportTitle;
    document.getElementById('support-desc').innerText = dict.supportDesc;
    document.getElementById('kofi-btn').innerText = dict.kofiBtn;
    document.getElementById('contact-lbl').innerText = dict.contactLbl;
    
    // Features Card
    document.getElementById('features-main-title').innerText = dict.featuresMainTitle;
    document.getElementById('feat-offline-title').innerText = dict.featOfflineTitle;
    document.getElementById('feat-offline-desc').innerHTML = dict.featOfflineDesc;
    document.getElementById('feat-crypto-title').innerText = dict.featCryptoTitle;
    document.getElementById('feat-crypto-desc').innerHTML = dict.featCryptoDesc;
    document.getElementById('feat-widgets-title').innerText = dict.featWidgetsTitle;
    document.getElementById('feat-widgets-desc').innerHTML = dict.featWidgetsDesc;
    document.getElementById('feat-themes-title').innerText = dict.featThemesTitle;
    document.getElementById('feat-themes-desc').innerHTML = dict.featThemesDesc;
    
    // FAQ Card
    document.getElementById('faq-main-title').innerText = dict.faqMainTitle;
    document.getElementById('faq-recovery-title').innerText = dict.faqRecoveryTitle;
    document.getElementById('faq-recovery-desc').innerHTML = dict.faqRecoveryDesc;
    document.getElementById('faq-backups-title').innerText = dict.faqBackupsTitle;
    document.getElementById('faq-backups-desc').innerHTML = dict.faqBackupsDesc;
    document.getElementById('faq-pdf-title').innerText = dict.faqPdfTitle;
    document.getElementById('faq-pdf-desc').innerHTML = dict.faqPdfDesc;
    
    // Privacy Card
    document.getElementById('priv-updated').innerText = dict.privUpdated;
    document.getElementById('priv-main-title').innerText = dict.privMainTitle;
    document.getElementById('priv-sec1-title').innerText = dict.privSec1Title;
    document.getElementById('priv-sec1-body').innerHTML = dict.privSec1Body;
    document.getElementById('priv-sec2-title').innerText = dict.privSec2Title;
    document.getElementById('priv-sec2-body').innerHTML = dict.privSec2Body;
    document.getElementById('priv-sec3-title').innerText = dict.privSec3Title;
    document.getElementById('priv-sec3-body').innerHTML = dict.privSec3Body;
    document.getElementById('priv-sec4-title').innerText = dict.privSec4Title;
    document.getElementById('priv-sec4-body').innerHTML = dict.privSec4Body;
    
    // Terms Card
    document.getElementById('terms-updated').innerText = dict.termsUpdated;
    document.getElementById('terms-main-title').innerText = dict.termsMainTitle;
    document.getElementById('terms-sec1-title').innerText = dict.termsSec1Title;
    document.getElementById('terms-sec1-body').innerHTML = dict.termsSec1Body;
    document.getElementById('terms-sec2-title').innerText = dict.termsSec2Title;
    document.getElementById('terms-sec2-body').innerHTML = dict.termsSec2Body;
    document.getElementById('terms-sec3-title').innerText = dict.termsSec3Title;
    document.getElementById('terms-sec3-body').innerHTML = dict.termsSec3Body;
    document.getElementById('terms-sec4-title').innerText = dict.termsSec4Title;
    document.getElementById('terms-sec4-body').innerHTML = dict.termsSec4Body;
    
    // Footer
    document.getElementById('footer-text').innerText = dict.footerText;
    document.getElementById('footer-version').innerText = dict.footerVersion || "";
    
    // Copy Button Translation
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn && dict.copyBtnText) {
        copyBtn.innerText = dict.copyBtnText;
    }
}

// Clipboard Copy Utility
function copySupportEmail() {
    const emailText = "support.evanescentecho@gmail.com";
    const btn = document.getElementById('copy-email-btn');
    const lang = localStorage.getItem('lang') || 'en';
    
    navigator.clipboard.writeText(emailText).then(() => {
        const originalText = btn.innerText;
        // Temporary feedback text
        btn.innerText = lang === 'es' ? '¡Copiado!' : 'Copied!';
        setTimeout(() => {
            btn.innerText = originalText;
        }, 1500);
    }).catch(err => {
        console.error("Failed to copy support email:", err);
    });
}

// Initialize Language
function initLanguage() {
    const savedLang = localStorage.getItem('lang') || 'en'; // default to English
    const selectElement = document.getElementById('lang-select');
    applyLanguage(savedLang);
    if (selectElement) selectElement.value = savedLang;
}

// Switch Tab Navigation panel
function switchTab(evt, tabName) {
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(p => p.classList.remove('active'));
    
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));
    
    document.getElementById('panel-' + tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Media Query Listener for System Theme updates
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme || savedTheme === 'system') {
        applyTheme('system');
    }
});

// Initialize Page
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
});