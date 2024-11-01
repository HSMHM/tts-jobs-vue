import { ViteSSG } from 'vite-ssg';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import $ from 'jquery';
import 'slick-carousel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'animate.css';
import router from './router';
import generalEn from './locales/en/general.json';
import generalAr from './locales/ar/general.json';
import jobsEn from './locales/en/jobs.json';
import jobsAr from './locales/ar/jobs.json';
import countriesEn from "./locales/en/countries.json";
import countriesAr from "./locales/ar/countries.json";
import VueCookies from 'vue-cookies';


const messages = {
  en: {
    ...generalEn,
    ...jobsEn,
    ...countriesEn,
  },
  ar: {
    ...generalAr,
    ...jobsAr,
    ...countriesAr,
  },
};

window.$ = window.jQuery = $;

library.add(fas, far, fab);

const i18n = createI18n({
  locale: 'ar',
  fallbackLocale: 'ar',
  messages,
});

const toastOptions = {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
  position: 'top-center',
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
};

export const createApp = ViteSSG(
  App,
  {
    routes: router.options.routes,
    base: '/',
  },
  ({ app, router }) => {
    app.use(i18n);
    app.use(Toast, toastOptions);
    app.use(router);
    app.use(VueCookies);
    app.component('font-awesome-icon', FontAwesomeIcon);

    router.beforeEach((to, from, next) => {
      const isEnglish = to.path.startsWith('/en');
      const lang = isEnglish ? 'en' : 'ar';

      if (i18n.global.locale !== lang) {
        i18n.global.locale = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      }

      next();
    });
  }
);
