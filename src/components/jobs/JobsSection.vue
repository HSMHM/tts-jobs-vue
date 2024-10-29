<template>
  <section class="mt-n10 mt-lg-n8">
    <div class="studies-area position-relative mx-xxl-8 mx-xl-4 mx-lg-3 mx-3 my-4 z-index-2 border-radius-xl">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div v-for="(study, index) in translatedStudies" :key="index" class="col-lg-4 col-md-6 mb-4">
            <div class="card mt-3 study-card mx-4">
              <img class="card-img-top" :src="study.image" alt="study Image" />
              <div class="position-relative overflow-hidden" style="height:50px;margin-top:-50px;">
                <div class="position-absolute w-100 top-0 z-index-1">
                  <svg class="waves waves-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 40" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                      <path
                        id="card-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                      ></path>
                    </defs>
                    <g class="moving-waves">
                      <use xlink:href="#card-wave" x="48" y="-1" fill="rgba(255,255,255,0.30)" />
                      <use xlink:href="#card-wave" x="48" y="3" fill="rgba(255,255,255,0.35)" />
                      <use xlink:href="#card-wave" x="48" y="5" fill="rgba(255,255,255,0.25)" />
                      <use xlink:href="#card-wave" x="48" y="8" fill="rgba(255,255,255,0.20)" />
                      <use xlink:href="#card-wave" x="48" y="13" fill="rgba(255,255,255,0.15)" />
                      <use xlink:href="#card-wave" x="48" y="16" fill="rgba(255,255,255,0.99)" />
                    </g>
                  </svg>
                </div>
              </div>
              <div class="card-body study-card-body">
                <h4>{{ study.title }}</h4>
                <p class="fixed-lines">{{ study.subtitle }}</p>
                <a :href="getStudyLink(study.slug)" class="text-primary icon-move-right">
                  {{ $t('study_details_button') }}
                  <font-awesome-icon class="ms-1 text-xs" :icon="arrowIcon()" />
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
    translatedStudies() {
      return [
        {
          slug: 'study-1',
          title: this.$t('studies.study-1.title'),
          subtitle: this.$t('studies.study-1.subtitle'),
          description: this.$t('studies.study-1.description'),
          image: '/img/studies/job-1.webp' // Direct path from public folder
        },
        {
          slug: 'study-2',
          title: this.$t('studies.study-2.title'),
          subtitle: this.$t('studies.study-2.subtitle'),
          description: this.$t('studies.study-2.description'),
          image: '/img/studies/job-2.webp'
        },
        {
          slug: 'study-3',
          title: this.$t('studies.study-3.title'),
          subtitle: this.$t('studies.study-3.subtitle'),
          description: this.$t('studies.study-3.description'),
          image: '/img/studies/job-3.webp'
        },
        {
          slug: 'study-4',
          title: this.$t('studies.study-4.title'),
          subtitle: this.$t('studies.study-4.subtitle'),
          description: this.$t('studies.study-4.description'),
          image: '/img/studies/job-4.webp'
        },
        {
          slug: 'study-5',
          title: this.$t('studies.study-5.title'),
          subtitle: this.$t('studies.study-5.subtitle'),
          description: this.$t('studies.study-5.description'),
          image: '/img/studies/job-5.webp'
        },
        {
          slug: 'study-6',
          title: this.$t('studies.study-6.title'),
          subtitle: this.$t('studies.study-6.subtitle'),
          description: this.$t('studies.study-6.description'),
          image: '/img/studies/job-6.webp'
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
    // Generate the study details link based on the current language
    getStudyLink(slug) {
      const currentLang = this.$i18n.locale;
      return currentLang === 'en' ? `/en/studies/${slug}` : `/studies/${slug}`;
    }
  }
};
</script>
