<template>
  <div class="position-sticky z-index-sticky top-0">
    <nav
      :class="['navbar', 'navbar-expand-lg', 'mb-3', 'mt-2', 'shadow-1', 'blur-rounded', 'mx-lg-auto', scrolled ? 'blur w-90 navbar-dark' : 'navbar-transparent']">
      <div class="px-0 container d-flex justify-content-between justify-content-lg-around">
        <a :href="homeLink" class="navbar-brand font-weight-bolder ms-sm-3 w-60">
          <img :src="navbarBrandImg" alt="TTS" />
        </a>

        <button class="d-block d-lg-none shadow-none bg-transparent border-0 btn" type="button"
          data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <span class="navbar-toggler-icon mt-2">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </span>
        </button>

        <div class="ms-auto collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0" id="navigation">
          <ul class="navbar-nav navbar-nav-hover mx-auto">
            <!-- Loop through navItems -->
            <li class="nav-item mx-2" v-for="(item, index) in navItems" :key="index">
              <a v-if="item.type === 'route'"
                 :href="getLocalizedLink(item.routeName)"
                 class="nav-link fw-bold ps-2 fs-6 d-flex justify-content-between align-items-center">
                {{ item.label }}
              </a>
              
              <!-- Handle section scroll for sections on Home -->
              <a v-if="item.type === 'section'"
                 href="#"
                 class="nav-link fw-bold ps-2 fs-6 d-flex justify-content-between align-items-center cursor-pointer"
                 @click.prevent="navigateToSection(item)">
                {{ item.label }}
              </a>
            </li>

            <li class="nav-item d-lg-none d-block align-self-center my-3">
              <a :href="switchLanguageHref" class="btn bg-gradient-primary text-white btn-round mb-0 me-1">
                {{ $t('switch_language') }} <font-awesome-icon :icon="['fas', 'earth-americas']" />
              </a>
            </li>
          </ul>

          <ul class="navbar-nav d-lg-block d-none">
            <li class="nav-item">
              <a :href="switchLanguageHref" class="btn bg-gradient-primary text-white btn-round mb-0 me-1">
                {{ $t('switch_language') }} <font-awesome-icon :icon="['fas', 'earth-americas']" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="offcanvas offcanvas-end bg-gradient-dark" tabindex="-1" id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <li data-bs-dismiss="offcanvas" class="nav-item d-lg-none d-block align-self-center my-3">
          <a :href="switchLanguageHref" class="btn btn-outline-primary btn-round mb-0 me-1">{{ $t('switch_language') }}
            <font-awesome-icon :icon="['fas', 'earth-americas']" /></a>
        </li>
        <button type="button" class="btn-close btn-close-white btn-link" data-bs-dismiss="offcanvas"
          aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav navbar-nav-hover mx-auto">
          <!-- Loop through navItems for offcanvas -->
          <li data-bs-dismiss="offcanvas" class="nav-item my-1 mx-2" v-for="(item, index) in navItems" :key="index">
            <a v-if="item.type === 'route'"
               :href="getLocalizedLink(item.routeName)"
               class="nav-link text-white fw-bold ps-2 fs-5 d-flex justify-content-between align-items-center">
              {{ item.label }}
            </a>

            <!-- Handle section scroll for sections on Home -->
            <a v-if="item.type === 'section'"
               href="#"
               class="nav-link text-white fw-bold ps-2 fs-5 d-flex justify-content-between align-items-center cursor-pointer"
               @click.prevent="navigateToSection(item)">
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import logoWhite from "/img/logos/tts-jobs/logo-white.png";
import logoDark from "/img/logos/tts-jobs/logo-dark.png";

export default {
  data() {
    return {
      navbarBrandImg: logoWhite,
      scrolled: false,
    };
  },
  computed: {
    navItems() {
      return [
        { label: this.$t('about_nav_item'), type: 'section', sectionId: 'about' },
        { label: this.$t('services_nav_item'), type: 'section', sectionId: 'services' },
        { label: this.$t('studies_nav_item'), type: 'route', routeName: 'jobs' },
        
      ];
    },
    switchLanguageHref() {
      // Generate href for switching languages
      const newLang = this.$i18n.locale === 'en' ? 'ar' : 'en';
      const currentPath = this.$route.path.replace(/^\/(en|ar)/, '');  // Remove '/en' or '/ar'

      // Ensure the path doesn't end with /en or /ar
      let sanitizedPath = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;

      return newLang === 'en' ? `/en${sanitizedPath}` : `${sanitizedPath}`;
    },
    homeLink() {
      // Dynamic home link depending on the current language
      return this.$i18n.locale === 'en' ? '/en' : '/';
    }
  },
  mounted() {
    this.initializeNavbar();
  },
  methods: {
    getLocalizedLink(routeName) {
      // Generate a localized link for the given route
      const currentLang = this.$i18n.locale;
      return currentLang === 'en' ? `/en/${routeName}` : `/${routeName}`;
    },

    navigateToSection(item) {
  // If we're already on the homepage, scroll to the section
  if (this.$route.name === 'Home' || this.$route.name === 'HomeEn') {
    this.scrollToSection(item.sectionId);
  } else {
    // If we're not on the homepage, navigate there first, then scroll
    const currentLang = this.$i18n.locale;
    const homePath = currentLang === 'en' ? '/en' : '/';

    // Use path-based navigation instead of named routes with params
    this.$router.push(homePath).then(() => {
      this.scrollToSection(item.sectionId);
    });
  }
},


    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: sectionTop - navbarHeight,
          behavior: 'smooth'
        });
      }
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
