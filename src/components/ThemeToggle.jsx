import { useState } from "react";
import { flushSync } from "react-dom";

// O index.html já aplicou o tema salvo (ou o do sistema) antes do React carregar
const getInitialTheme = () =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

function MoonIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
}

function SunIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
        </svg>
    );
}

function ThemeToggle() {
    const [theme, setTheme] = useState(getInitialTheme);
    const isDark = theme === 'dark';

    // Troca o tema da página e salva a escolha no navegador
    const applyTheme = (nextTheme) => {
        flushSync(() => setTheme(nextTheme));
        document.documentElement.dataset.theme = nextTheme;
        try {
            localStorage.setItem('theme', nextTheme);
        } catch {
            // Sem acesso ao localStorage: o tema vale só até fechar a página
        }
    };

    // Onde o navegador suporta, a troca acontece com um fade suave
    const toggleTheme = () => {
        const nextTheme = isDark ? 'light' : 'dark';
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (document.startViewTransition && !reduceMotion) {
            document.startViewTransition(() => applyTheme(nextTheme));
        } else {
            applyTheme(nextTheme);
        }
    };

    return (
        <button type="button" className="theme-toggle" onClick={toggleTheme}>
            {isDark ? <SunIcon /> : <MoonIcon />}
            <span className="sr-only">Mudar para o tema </span>
            {isDark ? 'Dia' : 'Noite'}
        </button>
    );
}
export default ThemeToggle;
