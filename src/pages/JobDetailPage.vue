<template>
  <div>
    <AppNavbar />
    <StudySection :jobName="jobName" />
    <ContactUsSection />
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/layout/AppNavbar.vue';
import StudySection from '@/components/job/JobSection.vue';
import ContactUsSection from '@/components/job/ContactUsSection.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    AppNavbar,
    StudySection,
    ContactUsSection,
    AppFooter,
  },
  setup() {
    const { t, locale } = useI18n();
    const route = useRoute(); 

    const jobName = computed(() => route.params.jobName || 'study-1');

    // Meta title and description based on the study
    const studyTitle = computed(() => `${t('homepage_seo_title_1')} | ${t(`studies.${jobName.value}.title`)}`);
    const studyDescription = computed(() => t(`studies.${jobName.value}.description`));
    
    const imageUrl = computed(() => `${import.meta.env.VITE_BASE_URL}/assets/img/studies/${jobName.value}.jpg`);  // Use environment variable

    // Updated keywords for the study detail page focused on Tabayn-related SEO
    const keywords = locale.value === 'en' 
      ? `Tabayn, Tabayn Company, ${t(`studies.${jobName.value}.title`)} case study, Tabayn web development, Tabayn app designing` 
      : `تباين, شركة تباين, دراسة حالة ${t(`studies.${jobName.value}.title`)}, تباين لتطوير المواقع, تباين لتصميم التطبيقات`;

    useHead({
      title: studyTitle.value,
      meta: [
        {
          name: 'description',
          content: studyDescription.value, 
        },
        {
          name: 'keywords',
          content: keywords,
        },
        {
          property: 'og:title',
          content: studyTitle.value,
        },
        {
          property: 'og:description',
          content: studyDescription.value,
        },
        {
          property: 'og:image',
          content: imageUrl.value,
        },
        {
          property: 'og:image:alt',
          content: studyDescription.value,
        },
        {
          property: 'og:locale',
          content: t('locale_code'),
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: studyTitle.value,
        },
        {
          name: 'twitter:description',
          content: studyDescription.value,
        },
        {
          name: 'twitter:image',
          content: imageUrl.value,
        },
        {
          name: 'twitter:image:alt',
          content: studyDescription.value,
        },
      ],
      link: [
        {
          rel: 'alternate',
          hreflang: 'en',
          href: `${import.meta.env.VITE_BASE_URL}/en/studies/${jobName.value}`,
        },
        {
          rel: 'alternate',
          hreflang: 'ar',
          href: `${import.meta.env.VITE_BASE_URL}/studies/${jobName.value}`,
        },
      ],
    });

    return {
      jobName,
      studyTitle,
      studyDescription,
      imageUrl,
    };
  },
};
</script>
