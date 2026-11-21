// Phrase proposal page: theme, language and the proposal form.
// Kept separate from script.js, which drives the elements of index.html.

const SUPPORTED_LANGS = ['en', 'es', 'de', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'zh'];
const SUPPORT_EMAIL = 'support.evanescentecho@gmail.com';
const GITHUB_NEW_ISSUE = 'https://github.com/Support-EvanescentEcho/hours-lived-web/issues/new';

let dict = {};

function t(key, fallback) {
    return (dict && dict[key]) || fallback || '';
}

// ---- Theme ----------------------------------------------------------------
function applyTheme(themeChoice) {
    const html = document.documentElement;
    try {
        if (themeChoice === 'system') {
            localStorage.removeItem('theme');
        } else {
            localStorage.setItem('theme', themeChoice);
        }
    } catch (_) { /* storage unavailable: theme still applies for this visit */ }
    if (themeChoice === 'system') {
        const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-theme', dark ? 'dark' : 'light');
    } else {
        html.setAttribute('data-theme', themeChoice);
    }
}

function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (_) { saved = null; }
    const choice = saved || 'system';
    applyTheme(choice);
    const select = document.getElementById('theme-select');
    if (select) select.value = choice;
}

// ---- Language -------------------------------------------------------------
async function loadTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to fetch locales/${lang}.json`);
        return await response.json();
    } catch (error) {
        console.error('Error loading translation file:', error);
        if (lang !== 'en') return loadTranslations('en');
        return null;
    }
}

async function applyLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';
    try { localStorage.setItem('lang', lang); } catch (_) { /* per-visit only */ }
    document.documentElement.lang = lang;
    document.body.className = 'lang-active-' + lang;

    const loaded = await loadTranslations(lang);
    if (!loaded) return;
    dict = loaded;

    document.title = 'Hours Lived — ' + t('formTitle', 'Propose a phrase');
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const value = dict[el.getAttribute('data-i18n')];
        if (value) el.innerText = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const value = dict[el.getAttribute('data-i18n-placeholder')];
        if (value) el.setAttribute('placeholder', value.replace(/^"|"$/g, ''));
    });
    updateRequiredMarks();
}

function pickInitialLanguage() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl && SUPPORTED_LANGS.includes(fromUrl)) return fromUrl;
    let saved = null;
    try { saved = localStorage.getItem('lang'); } catch (_) { saved = null; }
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED_LANGS.includes(browser) ? browser : 'en';
}

// ---- Form -----------------------------------------------------------------
const $ = id => document.getElementById(id);

function selectedLabel(select) {
    const option = select.options[select.selectedIndex];
    return option ? option.innerText.trim() : select.value;
}

// Direct quotes need who said it and where; inspired thoughts need the work.
function updateRequiredMarks() {
    const type = $('f-type').value;
    $('f-author').required = type === 'direct';
    $('f-work').required = type === 'direct' || type === 'inspired';
    $('f-work-field').classList.toggle('propose-muted', type === 'original');
}

function validate() {
    const type = $('f-type').value;
    const phrase = $('f-phrase').value.trim();
    if (!phrase) return t('formErrPhrase', 'Write the phrase you want to propose.');
    if (type === 'direct' && !$('f-author').value.trim()) {
        return t('formErrAuthor', 'For a direct quote, say who said it.');
    }
    if ((type === 'direct' || type === 'inspired') && !$('f-work').value.trim()) {
        return t('formErrWork', 'Name the work the phrase comes from or was inspired by.');
    }
    if (!$('f-consent').checked) {
        return t('formErrConsent', 'Please accept that the phrase may be published.');
    }
    return null;
}

function showError(message) {
    const box = $('f-error');
    if (message) {
        box.innerText = message;
        box.hidden = false;
    } else {
        box.hidden = true;
    }
}

function buildProposal() {
    const author = $('f-author').value.trim() || t('formAnonymous', 'Anonymous');
    const work = $('f-work').value.trim() || '—';
    const lines = [
        `${t('footprintTplKeyDest', 'Destination')}: ${selectedLabel($('f-dest'))} [${$('f-dest').value}]`,
        `${t('footprintTplKeyType', 'Type')}: ${selectedLabel($('f-type'))} [${$('f-type').value}]`,
        `${t('footprintTplKeyPhrase', 'Quote')}: "${$('f-phrase').value.trim()}"`,
        `${t('footprintTplKeyAuthor', 'Author / Character')}: ${author}`,
        `${t('footprintTplKeyWork', 'Original Work')}: ${work}`,
        `${t('formConsentShort', 'Publication consent')}: ✓`,
        `Lang: ${document.documentElement.lang}`
    ];
    return {
        subject: `Hours Lived — ${t('formTitle', 'Phrase proposal')} (${$('f-dest').value})`,
        body: lines.join('\n')
    };
}

function withValidProposal(action) {
    const error = validate();
    showError(error);
    if (error) return;
    action(buildProposal());
}

function initForm() {
    $('f-type').addEventListener('change', updateRequiredMarks);
    $('f-phrase').addEventListener('input', () => {
        $('f-count').innerText = String($('f-phrase').value.length);
    });

    $('f-email').addEventListener('click', () => withValidProposal(p => {
        window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(p.subject)}&body=${encodeURIComponent(p.body)}`;
    }));

    $('f-github').addEventListener('click', () => withValidProposal(p => {
        const url = `${GITHUB_NEW_ISSUE}?title=${encodeURIComponent(p.subject)}&body=${encodeURIComponent(p.body)}`;
        window.open(url, '_blank', 'noopener');
    }));

    $('f-copy').addEventListener('click', () => withValidProposal(p => {
        const button = $('f-copy');
        const original = button.innerText;
        navigator.clipboard.writeText(`${p.subject}\n\n${p.body}\n\n${SUPPORT_EMAIL}`).then(() => {
            button.innerText = t('formCopied', 'Copied! Paste it in an email to ' + SUPPORT_EMAIL);
            setTimeout(() => { button.innerText = original; }, 2500);
        }).catch(err => {
            console.error('Failed to copy proposal:', err);
            showError(SUPPORT_EMAIL);
        });
    }));

    updateRequiredMarks();
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initForm();
    const lang = pickInitialLanguage();
    const select = $('lang-select');
    if (select) select.value = lang;
    applyLanguage(lang);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        let saved = null;
        try { saved = localStorage.getItem('theme'); } catch (_) { saved = null; }
        if (!saved) applyTheme('system');
    });
});
