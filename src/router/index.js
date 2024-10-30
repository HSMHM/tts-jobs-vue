import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import JobDetailPage from '@/pages/JobDetailPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import i18n from '@/i18n';

// Function to set language based on the path
const setLanguageFromPath = (to, next) => {
  const isEnglish = to.path.startsWith('/en');
  const lang = isEnglish ? 'en' : 'ar';

  i18n.global.locale = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  next();
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    beforeEnter: (to, from, next) => setLanguageFromPath(to, next),
  },
  {
    path: '/:jobName',
    name: 'JobDetail',
    component: JobDetailPage,
    beforeEnter: (to, from, next) => setLanguageFromPath(to, next),
    props: true,
  },
  {
    path: '/en',
    name: 'HomeEn',
    component: HomePage,
    beforeEnter: (to, from, next) => setLanguageFromPath(to, next),
  },
  {
    path: '/en/:jobName',
    name: 'JobDetailEn',
    component: JobDetailPage,
    beforeEnter: (to, from, next) => setLanguageFromPath(to, next),
    props: true,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundPage,
    beforeEnter: (to, from, next) => setLanguageFromPath(to, next),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
