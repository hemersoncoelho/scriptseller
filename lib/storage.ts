import { AppSettings, GenerationHistoryItem, User } from "./types";

const KEYS = {
    SESSION: 'scriptSell_session',
    HISTORY: 'scriptSell_history',
    SETTINGS: 'scriptSell_settings',
};

export const storage = {
    getSession: (): User | null => {
        if (typeof window === 'undefined') return null;
        const session = localStorage.getItem(KEYS.SESSION);
        return session ? JSON.parse(session) : null;
    },

    setSession: (user: User) => {
        localStorage.setItem(KEYS.SESSION, JSON.stringify(user));
    },

    clearSession: () => {
        localStorage.removeItem(KEYS.SESSION);
    },

    getHistory: (): GenerationHistoryItem[] => {
        if (typeof window === 'undefined') return [];
        const history = localStorage.getItem(KEYS.HISTORY);
        return history ? JSON.parse(history) : [];
    },

    addToHistory: (item: GenerationHistoryItem) => {
        const history = storage.getHistory();
        // Prepend and limit to 20
        const newHistory = [item, ...history].slice(0, 20);
        localStorage.setItem(KEYS.HISTORY, JSON.stringify(newHistory));
    },

    getSettings: (): AppSettings => {
        if (typeof window === 'undefined') return { language: 'pt-BR', tone: 'Profissional', length: 'medium', devMode: false };
        const settings = localStorage.getItem(KEYS.SETTINGS);
        return settings ? JSON.parse(settings) : { language: 'pt-BR', tone: 'Profissional', length: 'medium', devMode: false };
    },

    saveSettings: (settings: AppSettings) => {
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    }
};
