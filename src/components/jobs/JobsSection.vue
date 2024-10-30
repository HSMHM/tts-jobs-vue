<template>
<section class="mt-n10 mt-lg-n8">
  <div class="jobs-area position-relative mx-xxl-8 mx-xl-4 mx-lg-3 mx-3 my-4 z-index-2 border-radius-xl">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div v-for="(job, index) in translatedJobs" :key="index" class="col-lg-4 col-md-6 mb-4">
          <div class="card mt-3 job-card mx-4 position-relative">
            <!-- Image with overlay -->
            <div class="job-image-wrapper position-relative rounded-3">
              <a :href="getJobLink(job.slug)">
              <img class="card-img-top" :src="job.image" alt="Job Image" />
              <div class="job-overlay"></div>
              <h5 class="job-title-overlay fs-5">{{ job.title }}</h5>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<script>
export default {
  computed: {
    translatedJobs() {
      return [
        {
          slug: 'job-1',
          title: this.$t('jobs.job-1.title'),
          subtitle: this.$t('jobs.job-1.subtitle'),
          description: this.$t('jobs.job-1.description'),
          image: '/img/jobs/job-1.png' // Direct path from public folder
        },
        {
          slug: 'job-2',
          title: this.$t('jobs.job-2.title'),
          subtitle: this.$t('jobs.job-2.subtitle'),
          description: this.$t('jobs.job-2.description'),
          image: '/img/jobs/job-2.png'
        },
        {
          slug: 'job-3',
          title: this.$t('jobs.job-3.title'),
          subtitle: this.$t('jobs.job-3.subtitle'),
          description: this.$t('jobs.job-3.description'),
          image: '/img/jobs/job-3.png'
        },
        {
          slug: 'job-4',
          title: this.$t('jobs.job-4.title'),
          subtitle: this.$t('jobs.job-4.subtitle'),
          description: this.$t('jobs.job-4.description'),
          image: '/img/jobs/job-4.png'
        },
        {
          slug: 'job-5',
          title: this.$t('jobs.job-5.title'),
          subtitle: this.$t('jobs.job-5.subtitle'),
          description: this.$t('jobs.job-5.description'),
          image: '/img/jobs/job-5.png'
        },
        {
          slug: 'job-6',
          title: this.$t('jobs.job-6.title'),
          subtitle: this.$t('jobs.job-6.subtitle'),
          description: this.$t('jobs.job-6.description'),
          image: '/img/jobs/job-6.png'
        }
      ];
    },
    isRTL() {
      return this.$i18n.locale === 'ar'; 
    }
  },
  methods: {
    arrowIcon() {
      return this.isRTL ? ['fas', 'arrow-left'] : ['fas', 'arrow-right'];
    },
    // Generate the job details link based on the current language
    getJobLink(slug) {
      const currentLang = this.$i18n.locale;
      return currentLang === 'en' ? `/en/${slug}` : `/${slug}`;
    }
  }
};
</script>
