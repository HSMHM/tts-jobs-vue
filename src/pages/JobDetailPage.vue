<template>
  <div>
    <AppNavbar />
    <HeaderSection :jobName="jobName" />
    <JobSection :jobName="jobName" />
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/layout/AppNavbar.vue';
import HeaderSection from '@/components/job/HeaderSection.vue';
import JobSection from '@/components/job/JobSection.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    AppNavbar,
    HeaderSection,
    JobSection,
    AppFooter,
  },
  setup() {
    const { t, locale } = useI18n();
    const route = useRoute();
    const router = useRouter();

    const jobName = computed(() => `job-${route.params.id}`);
    const validJobIds = Array.from({ length: 12 }, (_, i) => i + 1);

    if (!validJobIds.includes(parseInt(route.params.id, 10))) {
      router.replace('/404');
    }

    const jobTitle = computed(() => `${t('homepage_seo_title_1')} | ${t(`jobs.${jobName.value}.title`)}`);
    const jobDescription = computed(() => t(`jobs.${jobName.value}.summary`));

    const imageUrl = computed(() => `${import.meta.env.VITE_BASE_URL}/assets/img/jobs/${jobName.value}.jpg`);

    const keywords = locale.value === 'en' 
      ? `TTS JOBS, TTS JOBS Company, ${t(`jobs.${jobName.value}.title`)} job, TTS JOBS careers, tech transformation jobs` 
      : `وظائف التحول التقني, شركة وظائف التحول التقني, دراسة حالة ${t(`jobs.${jobName.value}.title`)}, وظائف التحول التقني في مجال التقنية, فرص العمل في التحول التقني`;

    useHead({
      title: jobTitle.value,
      meta: [
        {
          name: 'description',
          content: jobDescription.value, 
        },
        {
          name: 'keywords',
          content: keywords,
        },
        {
          property: 'og:title',
          content: jobTitle.value,
        },
        {
          property: 'og:description',
          content: jobDescription.value,
        },
        {
          property: 'og:image',
          content: imageUrl.value,
        },
        {
          property: 'og:image:alt',
          content: jobDescription.value,
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
          content: jobTitle.value,
        },
        {
          name: 'twitter:description',
          content: jobDescription.value,
        },
        {
          name: 'twitter:image',
          content: imageUrl.value,
        },
        {
          name: 'twitter:image:alt',
          content: jobDescription.value,
        },
      ],
      link: [
        {
          rel: 'alternate',
          hreflang: 'en',
          href: `${import.meta.env.VITE_BASE_URL}/en/${jobName.value}`,
        },
        {
          rel: 'alternate',
          hreflang: 'ar',
          href: `${import.meta.env.VITE_BASE_URL}/${jobName.value}`,
        },
      ],
    });

    return {
      jobName,
      jobTitle,
      jobDescription,
      imageUrl,
    };
  },
};

</script>
