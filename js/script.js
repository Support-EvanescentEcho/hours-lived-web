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
    
    // New Tabs
    document.getElementById('tab-changelog').innerText = dict.tabChangelog || "Changelog";
    document.getElementById('tab-roadmap').innerText = dict.tabRoadmap || "Roadmap";
    document.getElementById('tab-transparency').innerText = dict.tabTransparency || "Transparency";
    document.getElementById('tab-project').innerText = dict.tabProject || "The Project";
    
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
    
    // Changelog Card
    document.getElementById('changelogTitle').innerText = dict.changelogTitle || "Changelog";
    document.getElementById('changelogDesc').innerText = dict.changelogDesc || "";
    document.getElementById('subtab-release-lbl').innerText = dict.changelogRelease || "Release";
    document.getElementById('subtab-beta-lbl').innerText = dict.changelogBeta || "Beta Logs";
    document.getElementById('subtab-alpha-lbl').innerText = dict.changelogAlpha || "Alpha Logs";
    document.getElementById('changelogAlphaNotice').innerText = dict.changelogAlphaNotice || "";

    // Roadmap Card
    document.getElementById('roadmapMainTitle').innerText = dict.roadmapMainTitle || "Roadmap";
    document.getElementById('roadmapDesc').innerText = dict.roadmapDesc || "";
    document.getElementById('roadmapPlanned').innerText = dict.roadmapPlanned || "Planned";
    document.getElementById('roadmapInProgress').innerText = dict.roadmapInProgress || "In Progress";
    document.getElementById('roadmapCompleted').innerText = dict.roadmapCompleted || "Completed";
    
    document.getElementById('roadmapItemCloudSync').innerText = dict.roadmapItemCloudSync || "";
    document.getElementById('roadmapItemTributeThemes').innerText = dict.roadmapItemTributeThemes || "";
    document.getElementById('roadmapItemWidgets').innerText = dict.roadmapItemWidgets || "";
    document.getElementById('roadmapItemMultiLang').innerText = dict.roadmapItemMultiLang || "";
    document.getElementById('roadmapItemRecovery').innerText = dict.roadmapItemRecovery || "";
    document.getElementById('roadmapItemLightNovel').innerText = dict.roadmapItemLightNovel || "";

    // Transparency & Benefits
    document.getElementById('transTitle').innerText = dict.transTitle || "Transparency";
    document.getElementById('transDesc').innerText = dict.transDesc || "";
    document.getElementById('transTierOneTimeBadge').innerText = dict.transTierOneTimeBadge || "";
    document.getElementById('transTierMonthlyBadge').innerText = dict.transTierMonthlyBadge || "";
    document.getElementById('transTierOneTime').innerText = dict.transTierOneTime || "One-Time Donation";
    document.getElementById('transTierOneTimeSub').innerText = dict.transTierOneTimeSub || "";
    document.getElementById('transTierMonthly').innerText = dict.transTierMonthly || "Monthly Patronage";
    document.getElementById('transTierMonthlySub').innerText = dict.transTierMonthlySub || "";

    document.getElementById('transBenefitCredits').innerText = dict.transBenefitCredits || "";
    document.getElementById('transBenefitBadge').innerText = dict.transBenefitBadge || "";
    document.getElementById('transBenefitBeta').innerText = dict.transBenefitBeta || "";
    document.getElementById('transBenefitVoting').innerText = dict.transBenefitVoting || "";
    document.getElementById('transBenefitChannel').innerText = dict.transBenefitChannel || "";

    document.getElementById('transBenefitCredits-m').innerText = dict.transBenefitCredits || "";
    document.getElementById('transBenefitBadge-m').innerText = dict.transBenefitBadge || "";
    document.getElementById('transBenefitBeta-m').innerText = dict.transBenefitBeta || "";
    document.getElementById('transBenefitVoting-m').innerText = dict.transBenefitVoting || "";
    document.getElementById('transBenefitChannel-m').innerText = dict.transBenefitChannel || "";

    document.getElementById('transUsageTitle').innerText = dict.transUsageTitle || "How funds are utilized";
    document.getElementById('transUsageItem1').innerText = dict.transUsageItem1 || "";
    document.getElementById('transUsageItem2').innerText = dict.transUsageItem2 || "";
    document.getElementById('transUsageItem3').innerText = dict.transUsageItem3 || "";
    // Project Card
    document.getElementById('projectTitle').innerText = dict.projectTitle || "About the Project";
    document.getElementById('projectDesc1').innerText = dict.projectDesc1 || "";
    document.getElementById('projectInspirationTitle').innerText = dict.projectInspirationTitle || "";
    document.getElementById('projectInspirationDesc').innerText = dict.projectInspirationDesc || "";
    document.getElementById('projectInspirationListTitle').innerText = dict.projectInspirationListTitle || "";
    document.getElementById('projectTechTitle').innerText = dict.projectTechTitle || "";
    document.getElementById('projectTechDesc1').innerText = dict.projectTechDesc1 || "";
    document.getElementById('projectTechDesc2').innerText = dict.projectTechDesc2 || "";

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

    // Load and Render Changelogs
    await loadChangelogData(lang);
    renderChangelog();
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

// Dynamic Changelog State and Logic
let currentChangelogChannel = 'release';
let changelogData = null;

async function loadChangelogData(lang) {
    try {
        const response = await fetch(`locales/changelog_${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch locales/changelog_${lang}.json`);
        }
        changelogData = await response.json();
    } catch (error) {
        console.error('Error loading changelog:', error);
        // Fallback to English if fetch fails
        if (lang !== 'en') {
            await loadChangelogData('en');
        }
    }
}

function renderChangelog() {
    const container = document.getElementById('changelog-timeline');
    if (!container) return;
    container.innerHTML = '';
    
    if (!changelogData) {
        const loadingMsg = document.createElement('p');
        loadingMsg.innerText = "...";
        container.appendChild(loadingMsg);
        return;
    }
    
    const logs = changelogData[currentChangelogChannel] || [];
    
    if (logs.length === 0) {
        const emptyMsg = document.createElement('p');
        const lang = localStorage.getItem('lang') || 'en';
        emptyMsg.innerText = lang === 'es' ? 'No hay registros en este historial.' : 'No entries available in this log history.';
        container.appendChild(emptyMsg);
        return;
    }
    
    logs.forEach(log => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        const header = document.createElement('div');
        header.className = 'timeline-header';
        
        const version = document.createElement('span');
        version.className = 'timeline-version';
        version.innerText = log.version;
        
        const date = document.createElement('span');
        date.className = 'timeline-date';
        date.innerText = log.date;
        
        header.appendChild(version);
        header.appendChild(date);
        
        const title = document.createElement('h3');
        title.className = 'timeline-title';
        title.innerText = log.title;
        
        const changesList = document.createElement('ul');
        changesList.className = 'timeline-changes';
        
        log.changes.forEach(change => {
            const li = document.createElement('li');
            li.innerText = change;
            changesList.appendChild(li);
        });
        
        item.appendChild(header);
        item.appendChild(title);
        item.appendChild(changesList);
        
        container.appendChild(item);
    });
}

function switchChangelogChannel(channel) {
    currentChangelogChannel = channel;
    
    // Toggle active classes on subtab buttons
    const buttons = document.querySelectorAll('.subtab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (channel === 'release') document.getElementById('subtab-release-lbl').classList.add('active');
    if (channel === 'beta') document.getElementById('subtab-beta-lbl').classList.add('active');
    if (channel === 'alpha') document.getElementById('subtab-alpha-lbl').classList.add('active');
    
    // Show/hide alpha warning notice
    const noticeBox = document.getElementById('changelog-alpha-notice-box');
    if (noticeBox) {
        noticeBox.style.display = channel === 'alpha' ? 'block' : 'none';
    }
    
    renderChangelog();
}