/**
 * Theme Toggle — persists preference in localStorage.
 * Dark mode (default): data-theme attribute absent or "dark"
 * Light mode:          data-theme="light"
 *
 * Call initThemeToggle() after the DOM is ready.
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'saurav-theme';
    var LIGHT = 'light';
    var DARK = 'dark';

    /** Apply theme to <html> element */
    function applyTheme(theme) {
        if (theme === LIGHT) {
            document.documentElement.setAttribute('data-theme', LIGHT);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    /** Read saved preference, falling back to dark */
    function getSavedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY) || DARK;
        } catch (e) {
            return DARK;
        }
    }

    /** Save preference */
    function saveTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) { /* storage unavailable — silently ignore */ }
    }

    /** Toggle between dark and light */
    function toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme') === LIGHT ? LIGHT : DARK;
        var next = current === LIGHT ? DARK : LIGHT;
        applyTheme(next);
        saveTheme(next);
    }

    /**
     * Wire up every .theme-toggle button on the page.
     * Safe to call multiple times — uses a data attribute guard.
     */
    function initThemeToggle() {
        /* Apply saved theme immediately to avoid flash */
        applyTheme(getSavedTheme());

        var buttons = document.querySelectorAll('.theme-toggle');
        buttons.forEach(function (btn) {
            if (btn.dataset.themeInit) return;
            btn.dataset.themeInit = '1';
            btn.addEventListener('click', toggleTheme);
        });
    }

    /* Run as early as possible to prevent flash of wrong theme */
    applyTheme(getSavedTheme());

    /* Expose for inline use */
    window.initThemeToggle = initThemeToggle;

    /* Auto-init when DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
}());