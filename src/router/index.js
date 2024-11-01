import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import JobDetailPage from '@/pages/JobDetailPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import i18n from '@/i18n';

const setLanguageFromPath = (to) => {
  const isEnglish = to.path.startsWith('/en');
  const lang = isEnglish ? 'en' : 'ar';

  if (i18n.global.locale !== lang) {
    i18n.global.locale = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    beforeEnter: (to, from, next) => {
      setLanguageFromPath(to);
      next();
    },
  },
  {
    path: '/en',
    name: 'HomeEn',
    component: HomePage,
    beforeEnter: (to, from, next) => {
      setLanguageFromPath(to);
      next();
    },
  },
  {
    path: '/job-:id(\\d+)',
    name: 'JobDetail',
    component: JobDetailPage,
    beforeEnter: (to, from, next) => {
      setLanguageFromPath(to);
      const id = parseInt(to.params.id, 10);
      if (id < 1 || id > 12) {
        next('/404'); 
      } else {
        next();
      }
    },
    props: true,
  },
  {
    path: '/en/job-:id(\\d+)',
    name: 'JobDetailEn',
    component: JobDetailPage,
    beforeEnter: (to, from, next) => {
      setLanguageFromPath(to);
      const id = parseInt(to.params.id, 10);
      if (id < 1 || id > 12) {
        next('/en/404'); 
      } else {
        next();
      }
    },
    props: true,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundPage,
    beforeEnter: (to, from, next) => {
      setLanguageFromPath(to);
      next();
    },
  },
  {
    path: '/en/404',
    name: 'NotFoundEn',
    component: NotFoundPage,
    beforeEnter: (to, from, next) => {
      i18n.global.locale = 'en';
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      next();
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: (to) => {
      const isEnglish = to.path.startsWith('/en');
      return isEnglish ? '/en/404' : '/404';
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
