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
import 'animate.css'; // Import Animate.css
import router from './router';
import generalEn from './locales/en/general.json';
import termsEn from './locales/en/terms_of_use.json';
import privacyEn from './locales/en/privacy_policy.json';
import generalAr from './locales/ar/general.json';
import termsAr from './locales/ar/terms_of_use.json';
import privacyAr from './locales/ar/privacy_policy.json';
import VueCookies from 'vue-cookies';

// GTM Import
import { createGtm } from '@gtm-support/vue-gtm';

// Setup i18n with messages
const messages = {
  en: {
    ...generalEn,
    ...termsEn,
    ...privacyEn,
  },
  ar: {
    ...generalAr,
    ...termsAr,
    ...privacyAr,
  },
};

// Set up jQuery globally if needed
window.$ = window.jQuery = $;

// Add FontAwesome icons
library.add(fas, far, fab);

// Create the i18n instance
const i18n = createI18n({
  locale: 'ar', // Default locale is Arabic
  fallbackLocale: 'ar',
  messages,
});

// Configure Toast notifications
const toastOptions = {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
  position: 'top-center',
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
};

// Export `createApp` for Vite SSG
// Export `createApp` for Vite SSG
export const createApp = ViteSSG(
  App,
  {
    routes: router.options.routes,  // Use router options for routes
    base: '/',                      // Optional: specify the base URL
  },
  ({ app, router }) => {   // Removed `routes` as it's not being used
    app.use(i18n);
    app.use(Toast, toastOptions);
    app.use(router);
    app.use(VueCookies);

    // Register FontAwesomeIcon globally
    app.component('font-awesome-icon', FontAwesomeIcon);

    // Router navigation guard for setting language based on URL path
    router.beforeEach((to, from, next) => {
      // Set the language based on whether the URL starts with `/en`
      const isEnglish = to.path.startsWith('/en');
      const lang = isEnglish ? 'en' : 'ar';

      // Update the language and direction if necessary
      if (i18n.global.locale !== lang) {
        i18n.global.locale = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      }

      next();
    });

    // Initialize GTM
    app.use(createGtm({
      id: 'GTM-PKXWJD8R', // Your GTM ID
      vueRouter: router,
      debug: false,
      loadScript: true,
    }));
  }
);
