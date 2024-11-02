<template>
  <div class="top-0">
    <nav
      :class="['navbar', 'navbar-absolute', 'navbar-expand-lg', 'mb-3', 'mt-2', 'shadow-1', 'mx-lg-auto', scrolled ? 'w-90 navbar-dark' : 'navbar-transparent']">
      <div class="px-0 container d-flex justify-content-between justify-content-lg-around">
        <a :href="homeLink" class="navbar-brand font-weight-bolder ms-sm-3 w-auto">
          <img :src="navbarBrandImg" alt="TTS" />
        </a>
        <div class="ms-auto" id="navigation">
          <ul class="navbar-nav d-block">
            <li class="nav-item">
              <div class="navbar-brand navbar-brand-gptw  font-weight-bolder ms-sm-3 w-auto">
                <img :src="gptwBrandImg" alt="Great Place to Work" />
              </div>
              <!-- <a :href="switchLanguageHref" class="btn btn-outline-white btn-round mb-0 me-1">
                {{ $t('switch_language') }} <font-awesome-icon :icon="['fas', 'earth-americas']" />
              </a> -->
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import logoWhite from "/img/logos/tts-jobs/logo-white.png";
import logoDark from "/img/logos/tts-jobs/logo-dark.png";
import logoGptw from "/img/logos/gptw.png";

export default {
  data() {
    return {
      navbarBrandImg: logoWhite,
      gptwBrandImg: logoGptw,
      scrolled: false,
    };
  },
  computed: {
    switchLanguageHref() {
      const newLang = this.$i18n.locale === 'en' ? 'ar' : 'en';
      const currentPath = this.$route.path.replace(/^\/(en|ar)/, ''); 

      let sanitizedPath = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;

      return newLang === 'en' ? `/en${sanitizedPath}` : `${sanitizedPath}`;
    },
    homeLink() {

      return this.$i18n.locale === 'en' ? '/en' : '/';
    }
  },
  mounted() {
    this.initializeNavbar();
  },
  methods: {
    getLocalizedLink(routeName) {

      const currentLang = this.$i18n.locale;
      return currentLang === 'en' ? `/en/${routeName}` : `/${routeName}`;
    },
    initializeNavbar() {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
          this.scrolled = true;
          this.navbarBrandImg = logoDark;
        } else {
          this.scrolled = false;
          this.navbarBrandImg = logoWhite;
        }
      };
      window.addEventListener("scroll", handleScroll);
    },
  }
};
</script>
