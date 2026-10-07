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
        // Fallback to English if fetch fails
        if (lang !== 'en') {
            return await loadTranslations('en');
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
    document.getElementById('hero-desc') && (document.getElementById('hero-desc').innerText = dict.heroDesc || '');
    document.getElementById('downloadPlayStore').innerText = dict.downloadPlayStore || "Play Store";
    const winBtn = document.getElementById('downloadWindows');
    if (winBtn) winBtn.innerText = dict.downloadWindows || "Descargar Windows (.msi)";
    const linuxBtn = document.getElementById('downloadLinux');
    if (linuxBtn) linuxBtn.innerText = dict.downloadLinux || "Descargar Linux (.deb)";
    const apkBtn = document.getElementById('downloadApk');
    if (apkBtn) apkBtn.innerText = dict.downloadApk || "Descargar APK";
    
    // Tabs
    document.getElementById('tab-home').innerText = dict.tabHome || "Home";
    document.getElementById('tab-changelog').innerText = dict.tabChangelog || "Changelog";
    document.getElementById('tab-roadmap').innerText = dict.tabRoadmap || "Roadmap";
    document.getElementById('tab-project').innerText = dict.tabProject || "The Project";
    if (document.getElementById('tab-legal')) {
        document.getElementById('tab-legal').innerText = dict.tabLegal || "Legal & FAQ";
    }
    
    // Features & Privacy
    document.getElementById('featuresTitle').innerText = dict.featuresTitle || "Features";
    document.getElementById('featCryptoTitle').innerText = dict.featCryptoTitle || "";
    document.getElementById('featCryptoDesc').innerText = dict.featCryptoDesc || "";
    document.getElementById('featPrivacyTitle').innerText = dict.featPrivacyTitle || "";
    document.getElementById('featPrivacyDesc').innerText = dict.featPrivacyDesc || "";
    document.getElementById('featAudioTitle').innerText = dict.featAudioTitle || "";
    document.getElementById('featAudioDesc').innerText = dict.featAudioDesc || "";
    document.getElementById('featInterfaceTitle').innerText = dict.featInterfaceTitle || "";
    document.getElementById('featInterfaceDesc').innerText = dict.featInterfaceDesc || "";
    document.getElementById('featThemesTitle').innerText = dict.featThemesTitle || "";
    document.getElementById('featThemesDesc').innerText = dict.featThemesDesc || "";
    if (document.getElementById('featDesktopTitle')) {
        document.getElementById('featDesktopTitle').innerText = dict.featDesktopTitle || "";
    }
    if (document.getElementById('featDesktopDesc')) {
        document.getElementById('featDesktopDesc').innerText = dict.featDesktopDesc || "";
    }

    // Privacy Policy Section (microphone)
    if (document.getElementById('privacyTitle')) {
        document.getElementById('privacyTitle').innerText = dict.privacyTitle || "Privacy Policy";
        document.getElementById('privMicTitle').innerText = dict.privMicTitle || "";
        document.getElementById('privMicDesc').innerText = dict.privMicDesc || "";
        document.getElementById('privStorageTitle').innerText = dict.privStorageTitle || "";
        document.getElementById('privStorageDesc').innerText = dict.privStorageDesc || "";
        document.getElementById('privControlTitle').innerText = dict.privControlTitle || "";
        document.getElementById('privControlDesc').innerText = dict.privControlDesc || "";
    }
    if (document.getElementById('footerPrivacyLink')) {
        document.getElementById('footerPrivacyLink').innerText = dict.footerPrivacyLink || "Privacy Policy";
    }
    // Supporter Tiers
    document.getElementById('tiersTitle').innerText = dict.tiersTitle || "Supporter Benefits";
    document.getElementById('tierOneTimeBadge').innerText = dict.tierOneTimeBadge || "One-Time";
    document.getElementById('tierOneTimeTitle').innerText = dict.tierOneTimeTitle || "One-Time Support";
    document.getElementById('tierOneTimeDesc').innerText = dict.tierOneTimeDesc || "";
    document.getElementById('tierMonthlyBadge').innerText = dict.tierMonthlyBadge || "Monthly";
    document.getElementById('tierMonthlyTitle').innerText = dict.tierMonthlyTitle || "Monthly Support";
    document.getElementById('tierMonthlyDesc').innerText = dict.tierMonthlyDesc || "";

    // Legal & Disclaimer
    document.getElementById('disclaimer_title').innerText = dict.disclaimer_title || "";
    document.getElementById('disclaimer_desc').innerText = dict.disclaimer_desc || "";
    
    // Support & Independent Dev
    document.getElementById('support_title').innerText = dict.support_title || "";
    document.getElementById('support_desc').innerText = dict.support_desc || "";
    document.getElementById('kofi-btn').innerText = dict.kofiBtn || "Ko-fi";
    document.getElementById('contact-lbl').innerText = dict.contactLbl || "Support Contact";
    
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

    // Project Card
    document.getElementById('projectTitle').innerText = dict.projectTitle || "About the Project";
    document.getElementById('projectDesc1').innerText = dict.projectDesc1 || "";
    document.getElementById('projectInspirationTitle').innerText = dict.projectInspirationTitle || "";
    document.getElementById('projectInspirationDesc').innerText = dict.projectInspirationDesc || "";
    document.getElementById('projectInspirationListTitle').innerText = dict.projectInspirationListTitle || "";
    if (document.getElementById('projectSoundtrackDesc') && dict.projectSoundtrackDesc) {
        document.getElementById('projectSoundtrackDesc').innerHTML = dict.projectSoundtrackDesc;
    }
    renderInspirations(dict.musicLabel);
    document.getElementById('projectTechTitle').innerText = dict.projectTechTitle || "";
    document.getElementById('projectTechDesc1').innerText = dict.projectTechDesc1 || "";
    document.getElementById('projectTechDesc2').innerText = dict.projectTechDesc2 || "";

    // Localized Quote (decorative block in El Proyecto)
    if (dict.quoteText && document.getElementById('quote-text')) {
        document.getElementById('quote-text').innerText = `"${dict.quoteText}"`;
    }
    if (dict.quoteAuthor && document.getElementById('quote-author')) {
        document.getElementById('quote-author').innerText = `— ${dict.quoteAuthor}`;
    }

    // FAQ section
    if (document.getElementById('faq-main-title')) {
        document.getElementById('faq-main-title').innerText = dict.faqMainTitle || "Help & FAQ";
        document.getElementById('faq-recovery-title').innerText = dict.faqRecoveryTitle || "";
        document.getElementById('faq-recovery-desc').innerHTML = dict.faqRecoveryDesc || "";
        document.getElementById('faq-backups-title').innerText = dict.faqBackupsTitle || "";
        document.getElementById('faq-backups-desc').innerHTML = dict.faqBackupsDesc || "";
        document.getElementById('faq-pdf-title').innerText = dict.faqPdfTitle || "";
        document.getElementById('faq-pdf-desc').innerHTML = dict.faqPdfDesc || "";
        if (document.getElementById('faq-desktop-title')) {
            document.getElementById('faq-desktop-title').innerText = dict.faqDesktopTitle || "";
            document.getElementById('faq-desktop-desc').innerHTML = dict.faqDesktopDesc || "";
        }
    }
    // Privacy Policy (general — Legal tab)
    if (document.getElementById('priv-updated')) {
        document.getElementById('priv-updated').innerText = dict.privUpdated || "";
        document.getElementById('priv-main-title').innerText = dict.privMainTitle || "Privacy Policy";
        document.getElementById('priv-sec1-title').innerText = dict.privSec1Title || "";
        document.getElementById('priv-sec1-body').innerHTML = dict.privSec1Body || "";
        document.getElementById('priv-sec2-title').innerText = dict.privSec2Title || "";
        document.getElementById('priv-sec2-body').innerHTML = dict.privSec2Body || "";
        document.getElementById('priv-sec3-title').innerText = dict.privSec3Title || "";
        document.getElementById('priv-sec3-body').innerHTML = dict.privSec3Body || "";
        document.getElementById('priv-sec4-title').innerText = dict.privSec4Title || "";
        document.getElementById('priv-sec4-body').innerHTML = dict.privSec4Body || "";
    }
    // Terms of Service
    if (document.getElementById('terms-updated')) {
        document.getElementById('terms-updated').innerText = dict.termsUpdated || "";
        document.getElementById('terms-main-title').innerText = dict.termsMainTitle || "Terms of Service";
        document.getElementById('terms-sec1-title').innerText = dict.termsSec1Title || "";
        document.getElementById('terms-sec1-body').innerHTML = dict.termsSec1Body || "";
        document.getElementById('terms-sec2-title').innerText = dict.termsSec2Title || "";
        document.getElementById('terms-sec2-body').innerHTML = dict.termsSec2Body || "";
        document.getElementById('terms-sec3-title').innerText = dict.termsSec3Title || "";
        document.getElementById('terms-sec3-body').innerHTML = dict.termsSec3Body || "";
        document.getElementById('terms-sec4-title').innerText = dict.termsSec4Title || "";
        document.getElementById('terms-sec4-body').innerHTML = dict.termsSec4Body || "";
    }
    
    // Footer
    document.getElementById('footer-text').innerText = dict.footerText;
    document.getElementById('footer-version').innerText = dict.footerVersion || "";
    
    // Copy Button Translation
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn && dict.copyBtnText) {
        copyBtn.innerText = dict.copyBtnText;
    }

    // Footprint / Donor Guidelines section
    const fp = (id, key, fallback) => {
        const el = document.getElementById(id);
        if (el && dict[key]) el.innerText = dict[key];
        else if (el && fallback) el.innerText = fallback;
    };
    fp('footprintTitle',            'footprintTitle',            'Deja tu Huella en Hours Lived');
    fp('footprintDesc',             'footprintDesc',             '');
    fp('footprintCategoriesTitle',  'footprintCategoriesTitle',  '');
    fp('footprintCategoriesIntro',  'footprintCategoriesIntro',  '');
    fp('footprintCat1Title',        'footprintCat1Title',        '');
    fp('footprintCat1Desc',         'footprintCat1Desc',         '');
    fp('footprintCat2Title',        'footprintCat2Title',        '');
    fp('footprintCat2Desc',         'footprintCat2Desc',         '');
    fp('footprintCat3Title',        'footprintCat3Title',        '');
    fp('footprintCat3Desc',         'footprintCat3Desc',         '');
    fp('footprintCat4Title',        'footprintCat4Title',        '');
    fp('footprintCat4Desc',         'footprintCat4Desc',         '');
    fp('footprintTypesTitle',       'footprintTypesTitle',       '');
    fp('footprintTypesIntro',       'footprintTypesIntro',       '');
    fp('footprintTypeBadge1',       'footprintTypeBadge1',       '');
    fp('footprintTypeDesc1',        'footprintTypeDesc1',        '');
    fp('footprintTypeBadge2',       'footprintTypeBadge2',       '');
    fp('footprintTypeDesc2',        'footprintTypeDesc2',        '');
    fp('footprintTypeBadge3',       'footprintTypeBadge3',       '');
    fp('footprintTypeDesc3',        'footprintTypeDesc3',        '');
    fp('footprintTemplateTitle',    'footprintTemplateTitle',    '');
    fp('footprintTemplateIntro',    'footprintTemplateIntro',    '');
    fp('footprintTplKeyDest',       'footprintTplKeyDest',       '');
    fp('footprintTplValDest',       'footprintTplValDest',       '');
    fp('footprintTplKeyType',       'footprintTplKeyType',       '');
    fp('footprintTplValType',       'footprintTplValType',       '');
    fp('footprintTplKeyPhrase',     'footprintTplKeyPhrase',     '');
    fp('footprintTplValPhrase',     'footprintTplValPhrase',     '');
    fp('footprintTplKeyAuthor',     'footprintTplKeyAuthor',     '');
    fp('footprintTplValAuthor',     'footprintTplValAuthor',     '');
    fp('footprintTplKeyWork',       'footprintTplKeyWork',       '');
    fp('footprintTplValWork',       'footprintTplValWork',       '');
    fp('footprintModerationTitle',  'footprintModerationTitle',  '');
    fp('footprintModToneLabel',     'footprintModToneLabel',     '');
    fp('footprintModToneDesc',      'footprintModToneDesc',      '');
    fp('footprintModPrivLabel',     'footprintModPrivLabel',     '');
    fp('footprintModPrivDesc',      'footprintModPrivDesc',      '');
    fp('footprintModRespLabel',     'footprintModRespLabel',     '');
    fp('footprintModRespDesc',      'footprintModRespDesc',      '');
    fp('footprintModL10nLabel',     'footprintModL10nLabel',     '');
    fp('footprintModL10nDesc',      'footprintModL10nDesc',      '');

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

// Inspirations list data & dynamic renderer
const inspirationsData = [
    { title: "Plastic Memories", composer: "Takeshi Masuda" },
    { title: "Shigatsu wa Kimi no Uso", composer: "Masaru Yokoyama" },
    { title: "Sousou no Frieren", composer: "Evan Call" },
    { title: "Violet Evergarden", composer: "Evan Call" },
    { title: "Koe no Katachi", composer: "Kensuke Ushio" },
    { title: "Kimi no Suizou wo Tabetai", composer: "Hiroko Sebu" },
    { title: "Darling in the FranXX", composer: "Asami Tachibana" },
    { title: "Ano Hi Mita Hana", composer: "REMEDIOS" },
    { title: "Clannad", composer: "Jun Maeda, Shinji Orito" },
    { title: "Byousoku 5 Centimeter", composer: "Tenmon" },
    { title: "To the Moon", composer: "Kan Gao, Laura Shigihara" },
    { title: "GRIS", composer: "Berlinist" },
    { title: "Spiritfarer", composer: "Max LL" }
];

function renderInspirations(musicLabel) {
    const list = document.getElementById('projectInspirationList');
    if (!list) return;
    const label = musicLabel || 'Music';
    list.innerHTML = inspirationsData.map(item =>
        `<li><strong>${item.title}</strong> — <em>${label}: ${item.composer}</em></li>`
    ).join('');
}