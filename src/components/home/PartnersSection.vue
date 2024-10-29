<template>
  <section ref="partnersSection">
    <div class="partners-area bg-gradient-primary position-relative mx-xxl-8 mx-xl-4 mx-lg-3 mx-3 my-4 z-index-2 border-radius-xl">
      <div class="container partners-logos-container">
        <div class="row partners-logos align-items-center justify-content-center">
          <div class="col-lg-4 col-md-6 col-12 text-lg-left my-auto">
            <h1 class="text-white my-3 my-lg-0">{{ $t('partners_section_title') }}</h1>
            <p class="text-light">
              {{ $t('partners_section_description') }}
            </p>
          </div>
          <div class="col-lg-8 col-md-6 col-12">
            <div class="row">
              <div class="col-6 col-sm-4 col-md-4 col-lg-3 d-flex" v-for="(speed, index) in speeds" :key="index">
                <div :class="`slick-carousel pt-0 slick-column-${index + 1}`">
                  <div v-for="(logo, logoIndex) in shuffledLogos[index]" :key="logoIndex" class="partner-logo fade-logo">
                    <img :src="logo.src" :alt="logo.name" class="img-fluid logo-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* global $ */

export default {
  data() {
    return {
      logos: [
        { name: "Partner 1", src: '/img/logos/partners/atrum.svg' },
        { name: "Partner 2", src: '/img/logos/partners/deewan.svg' },
        { name: "Partner 3", src: '/img/logos/partners/dth.svg' },
        { name: "Partner 4", src: '/img/logos/partners/herfa.png' },
        { name: "Partner 7", src: '/img/logos/partners/mafs.png' },
        { name: "Partner 8", src: '/img/logos/partners/paperplane.png' },
        { name: "Partner 9", src: '/img/logos/partners/pfau.png' },
        { name: "Partner 10", src: '/img/logos/partners/qoyod.png' },
        { name: "Partner 11", src: '/img/logos/partners/rcrc.png' },
        { name: "Partner 12", src: '/img/logos/partners/seder.svg' },
        { name: "Partner 13", src: '/img/logos/partners/urway.png' }
      ],
      speeds: [5000, 4500, 6000, 4000],
      shuffledLogos: [],
      observer: null,
    };
  },
  mounted() {
    this.initializeLogos();
    this.observeSection();
  },
  methods: {
    initializeLogos() {
      const clonedLogos = [...this.logos, ...this.logos]; 
      this.shuffledLogos = this.speeds.map(() => this.shuffleArray([...clonedLogos])); 
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    observeSection() {
      const options = {
        root: null,
        threshold: 0.2,
      };
      this.observer = new IntersectionObserver(this.handleIntersect, options);
      this.observer.observe(this.$refs.partnersSection);
    },
    handleIntersect(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.initSlickCarousels();
          this.observer.disconnect();
        }
      });
    },
    initSlickCarousels() {
      this.$nextTick(() => {
        this.speeds.forEach((speed, index) => {
          $(`.slick-column-${index + 1}`).slick({
            infinite: true,
            vertical: true,
            verticalSwiping: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            pauseOnHover: false,
            autoplaySpeed: 0,
            speed: speed,
            cssEase: 'linear',
            arrows: false,
            fade: false,
            useTransform: true,
            swipe: false,
            waitForAnimate: false,
          });
        });
      });
    },
  },
};
</script>
