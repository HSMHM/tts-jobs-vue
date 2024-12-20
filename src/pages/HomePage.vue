<template>
  <div>
    <AppNavbar />
    <HeaderSection />
    <JobsSection />
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/layout/AppNavbar.vue';
import HeaderSection from '@/components/jobs/HeaderSection.vue';
import JobsSection from '@/components/jobs/JobsSection.vue';
import AppFooter from '@/components/layout/AppFooter.vue';

export default {
  components: {
    AppNavbar,
    HeaderSection,
    JobsSection,
    AppFooter,
  },
};
</script>

<script setup>
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const seoTitle = `${t('homepage_seo_title_1')}`;
const seoDescription = t('homepage_seo_description');
const imageUrl = `${import.meta.env.VITE_BASE_URL}/img/logos/tts-jobs/meta-dark.png`;
const ogImageType = 'image/png';
const ogImageWidth = '300';
const ogImageHeight = '300';

const keywords = locale.value === 'en' 
  ? 'TTS JOBS, TTS JOBS careers, TTS JOBS opportunities, tech transformation jobs, TTS JOBS hiring, jobs in tech transformation'
  : 'وظائف التحول التقني, شركة وظائف التحول التقني, فرص عمل وظائف التحول التقني, وظائف التحول التقني للتقنية, التوظيف في وظائف التحول التقني, وظائف في مجال التحول التقني';

useHead({
  title: seoTitle,
  meta: [
    { name: 'description', content: seoDescription },
    { name: 'keywords', content: keywords },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    { property: 'og:title', content: seoTitle },
    { property: 'og:description', content: seoDescription },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:type', content: ogImageType },
    { property: 'og:image:width', content: ogImageWidth },
    { property: 'og:image:height', content: ogImageHeight },
    { property: 'og:image:alt', content: seoDescription },
    { property: 'og:site_name', content: t('site_name') },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seoTitle },
    { name: 'twitter:description', content: seoDescription },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:image:alt', content: seoDescription },
  ],
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#16023d' },
    { rel: 'alternate', hreflang: 'en', href: `${import.meta.env.VITE_BASE_URL}/en` },
    { rel: 'alternate', hreflang: 'ar', href: `${import.meta.env.VITE_BASE_URL}` },
    { name: 'msapplication-TileColor', content: '#16023d' },
    { name: 'theme-color', content: '#16023d' },
  ],
});
</script>
