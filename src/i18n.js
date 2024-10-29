import { createI18n } from 'vue-i18n';

import enGeneral from './locales/en/general.json';
import arGeneral from './locales/ar/general.json';
import enTermsOfUse from './locales/en/terms_of_use.json';
import arTermsOfUse from './locales/ar/terms_of_use.json';
import enPrivacyPolicy from './locales/en/privacy_policy.json';
import arPrivacyPolicy from './locales/ar/privacy_policy.json';

const messages = {
  en: {
    general: enGeneral,
    terms_of_use: enTermsOfUse,
    privacy_policy: enPrivacyPolicy,
  },
  ar: {
    general: arGeneral,
    terms_of_use: arTermsOfUse,
    privacy_policy: arPrivacyPolicy,
  },
};

const i18n = createI18n({
  locale: 'ar', 
  fallbackLocale: 'ar',
  messages, 
});

export default i18n;
