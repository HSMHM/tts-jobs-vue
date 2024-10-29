<template>
  <header>
    <div :class="['bg-technologies-overlay', { rtl: isRTL }]" class="py-7 position-relative mx-xxl-8 mx-xl-4 mx-lg-3 mx-3 my-4 z-index-2 border-radius-xl py-5">
      <div class="technologies-overlay"></div>
      <div class="container position-relative z-index-1">
        <div class="row">
          <div class="col-lg-7 d-flex">
            <div class="card card-body blur text-md-start text-center px-sm-5 shadow-lg mt-sm-5 py-sm-5">
              <h3 class="text-gradient text-primary mb-0">{{ $t('technologies_section_title') }}</h3>
              <p class="fs-6 text-dark pt-3 pe-md-5 me-md-5">{{ $t('technologies_section_description') }}</p>
              <div class="row mt-2">
                <div v-for="(logo, index) in logos" :key="index" class="col-md-3 col-6 p-0">
                  <picture>
                    <source :srcset="logo.webp" type="image/webp" />
                    <img :src="logo.src" :alt="logo.alt" loading="lazy" class="img-fluid" />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      logos: [
        {
          src: '/img/technologies/cloudflare.png',  // Directly referencing from the public folder
          webp: '/img/technologies/cloudflare.webp',  // Directly referencing from the public folder
          alt: 'Cloudflare Logo'
        },
        {
          src: '/img/technologies/digital-ocean.png',
          webp: '/img/technologies/digital-ocean.webp',
          alt: 'Digital Ocean Logo'
        },
        {
          src: '/img/technologies/flare.png',
          webp: '/img/technologies/flare.webp',
          alt: 'Flare Logo'
        },
        {
          src: '/img/technologies/flutter.png',
          webp: '/img/technologies/flutter.webp',
          alt: 'Flutter Logo'
        },
        {
          src: '/img/technologies/aws.png',
          webp: '/img/technologies/aws.webp',
          alt: 'AWS Logo'
        },
        {
          src: '/img/technologies/laravel.png',
          webp: '/img/technologies/laravel.webp',
          alt: 'Laravel Logo'
        },
        {
          src: '/img/technologies/react.png',
          webp: '/img/technologies/react.webp',
          alt: 'React Logo'
        },
        {
          src: '/img/technologies/vue.png',
          webp: '/img/technologies/vue.webp',
          alt: 'Vue Logo'
        }
      ]
    };
  },
  computed: {
    isRTL() {
      return this.$i18n.locale === 'ar';
    }
  }
};
</script>
