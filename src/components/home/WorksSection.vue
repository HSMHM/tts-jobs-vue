<template>
  <section>
    <div class="works-area position-relative mx-xxl-8 mx-xl-4 mx-lg-3 mx-3 my-4 z-index-2 border-radius-xl">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <h1 class="text-gradient text-primary mb-2 mt-2">We Turn Ideas into Reality</h1>
          <h2 class="mb-1 text-dark">Our Latest Works</h2>
          <div ref="slickCarousel" class="slick-slider">
            <div v-for="(work, index) in works" :key="index">
              <div class="card work-card mx-4">
                <img class="card-img-top" :src="work.image" alt="work Image" />
                <div class="position-relative overflow-hidden" style="height:50px;margin-top:-50px;">
                  <div class="position-absolute w-100 top-0 z-index-1">
                    <svg class="waves waves-sm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 40" preserveAspectRatio="none" shape-rendering="auto">
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
                <div class="card-body work-card-body">
                  <h4>{{ work.title }}</h4>
                  <p class="fixed-lines">{{ work.description }}</p>
                  <a href="javascript:;" class="text-primary icon-move-right">
                    More details
                    <font-awesome-icon class="ms-1 text-xs" :icon="['fas', 'arrow-right']" />
                  </a>
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
import $ from 'jquery';
import 'slick-carousel';

export default {
  data() {
    return {
      works: [
      {
          title: 'Atrum Store and Auctions',
          image: require('/img/projects/project-1.jpg'),
          description: "Discover the world's art masterpieces on an innovative platform we've developed.",
        },        {
          title: 'Atrum Store and Auctions',
          image: require('/img/projects/project-1.jpg'),
          description: "Discover the world's art masterpieces on an innovative platform we've developed.",
        },        {
          title: 'Atrum Store and Auctions',
          image: require('/img/projects/project-1.jpg'),
          description: "Discover the world's art masterpieces on an innovative platform we've developed.",
        },        {
          title: 'Atrum Store and Auctions',
          image: require('/img/projects/project-1.jpg'),
          description: "Discover the world's art masterpieces on an innovative platform we've developed.",
        },        {
          title: 'Atrum Store and Auctions',
          image: require('/img/projects/project-1.jpg'),
          description: "Discover the world's art masterpieces on an innovative platform we've developed.",
        },        {
          title: 'Atrum Store and Auctions',
          image: require('/img/projects/project-1.jpg'),
          description: "Discover the world's art masterpieces on an innovative platform we've developed.",
        },        {
          title: 'Atrum Store and Auctions',
          image: require('/img/projects/project-1.jpg'),
          description: "Discover the world's art masterpieces on an innovative platform we've developed.",
        },
      ],
    };
  },
  methods: {
    initSlick() {
      const direction = document.documentElement.getAttribute('dir');
      
      $(this.$refs.slickCarousel).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 3000,
        infinite: true,
        initialSlide: 3,
        rtl: direction === 'rtl', 
        pauseOnHover: false,
        draggable: false,
        arrows: false,
        dots: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    },
    reinitializeSlick() {
      $(this.$refs.slickCarousel).slick('unslick');
      this.initSlick(); 
    },
    switchLanguage(language) {
      const currentLanguage = localStorage.getItem('language') || 'en';
      
      if (language !== currentLanguage) {
        localStorage.setItem('language', language);

        if (language === 'ar') {
          document.documentElement.setAttribute('lang', 'ar');
          document.documentElement.setAttribute('dir', 'rtl');
        } else {
          document.documentElement.setAttribute('lang', 'en');
          document.documentElement.setAttribute('dir', 'ltr');
        }

        window.location.reload();
      }
    },
  },
  mounted() {
    const storedLanguage = localStorage.getItem('language') || 'en';
    if (storedLanguage) {
      if (storedLanguage === 'ar') {
        document.documentElement.setAttribute('lang', 'ar');
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.setAttribute('lang', 'en');
        document.documentElement.setAttribute('dir', 'ltr');
      }
    }

    this.initSlick();

    this.$watch('$i18n.locale', () => {
      this.reinitializeSlick(); 
    });
  },
  updated() {
    $(this.$refs.slickCarousel).slick('setPosition');
  },
};
</script>
