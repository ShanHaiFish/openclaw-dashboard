import { useState, useCallback, useEffect } from 'react';
import { getInitialLanguage, getTranslation, formatTranslation } from '../i18n';

const LANG_KEY = 'openclaw-language';

export const useI18n = () => {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(LANG_KEY) || getInitialLanguage();
    }
    return 'en';
  });

  const setLang = useCallback((newLang) => {
    localStorage.setItem(LANG_KEY, newLang);
    setLangState(newLang);
    document.documentElement.setAttribute('lang', newLang);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const t = useCallback((key, params) => {
    const translation = getTranslation(lang, key);
    return params ? formatTranslation(translation, params) : translation;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'zh' : 'en');
  }, [lang, setLang]);

  return { lang, setLang, t, toggleLang };
};

export default useI18n;
