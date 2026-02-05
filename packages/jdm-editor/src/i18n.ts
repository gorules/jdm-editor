/**
 * i18n supports
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import zh from './locales/zh.json';

const i18nInstance = i18n.createInstance();

i18nInstance.use(initReactI18next).init({
  resources: {
    en: { translation: en, },
    zh: { translation: zh, },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false, },
});

export default i18nInstance;

