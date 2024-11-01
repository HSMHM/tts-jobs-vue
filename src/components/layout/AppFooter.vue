<template>
  <footer class="footer py-5 bg-gradient-dark position-relative overflow-hidden">

    <div class="container position-relative">
      <div class="row">
        <div class="col-sm-12 col-md-4 text-start">
          <h6 class="text-white font-weight-bolder text-uppercase mb-2">
            <img :src="navbarBrandImg" alt="TTS" class="footer-logo mb-4" />
          </h6> 
        </div>
        <div class="col-sm-12 col-md-8 me-auto text-start">
          <div>
            <h5 class="text-gradient text-primary fw-bold mb-3">{{ $t('footer_contact_us') }}</h5>
            <ul class="list-unstyled d-flex">

              <li class="mb-2">
                <a class="text-white" href="mailto:hr@tts.sa">
                  <font-awesome-icon :icon="['fas', 'envelope']" class="me-1" />
                  hr@tts.sa
                </a>
              </li>
              <li class="mb-2 ms-4">
                <a class="text-white" href="https://tts.sa">
                  <font-awesome-icon :icon="['fas', 'globe']" class="me-1" />
                  tts.sa
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 pt-2 mt-4 border-top border-primary"></div>
        <div class="col-sm-12 text-center text-md-start px-0">
          <p class="text-white">{{ $t('footer_copyright', { year: currentYear, company: companyName }) }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// Use ES module import instead of require
import navbarBrandImg from '/img/logos/tts-jobs/logo-white.png';

export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      navbarBrandImg,
    };
  },
  computed: {
    companyName() {
      return this.$i18n.locale === 'ar' ? 'وظائف التحول التقني' : 'TTS Jobs';
    }
  },
  methods: {
    // Generate links for privacy policy and terms of use based on the current language
    getLocalizedLink(routeName) {
      const currentLang = this.$i18n.locale;
      return currentLang === 'en' ? `/en/${routeName}` : `/${routeName}`;
    }
  }
};
</script>
