import en from './en.json';
import zh from './zh.json';

const translations = { en, zh };

// Get initial language from localStorage or browser
export const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('openclaw-language');
    if (stored && translations[stored]) return stored;
    
    const browserLang = navigator.language?.split('-')[0];
    if (translations[browserLang]) return browserLang;
  }
  return 'en';
};

// Deep get translation key
export const getTranslation = (lang, key) => {
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if not found
    }
  }
  
  return value;
};

// Replace placeholders like {n} with values
export const formatTranslation = (text, params = {}) => {
  if (typeof text !== 'string') return text;
  return text.replace(/\{(\w+)\}/g, (_, key) => {
    return params[key] !== undefined ? params[key] : `{${key}}`;
  });
};

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
];

export default translations;
