import { createI18n } from 'vue-i18n';

import enGeneral from './locales/en/general.json';
import arGeneral from './locales/ar/general.json';

const messages = {
  en: {
    general: enGeneral,
  },
  ar: {
    general: arGeneral,
  },
};

const i18n = createI18n({
  locale: 'ar', 
  fallbackLocale: 'ar',
  messages, 
});

export default i18n;
