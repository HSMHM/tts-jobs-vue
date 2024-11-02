import { createI18n } from 'vue-i18n';

import generalEn from './locales/en/general.json';
import generalAr from './locales/ar/general.json';
import jobsEn from './locales/en/jobs.json';
import jobsAr from './locales/ar/jobs.json';
import countriesEn from "./locales/en/countries.json";
import countriesAr from "./locales/ar/countries.json";

const messages = {
  en: {
    general: generalEn,
    jobs: jobsEn,
    countries: countriesEn,
  },
  ar: {
    general: generalAr,
    jobs: jobsAr,
    countries: countriesAr,
  },
};

const i18n = createI18n({
  locale: 'ar', 
  fallbackLocale: 'ar',
  messages, 
});

export default i18n;
