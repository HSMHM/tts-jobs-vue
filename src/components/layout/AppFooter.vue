<template>
  <footer class="footer py-5 bg-gradient-dark position-relative overflow-hidden">
    <img :src="wavePattern" alt="pattern-lines" class="position-absolute start-0 top-0 w-100 opacity-6" />

    <div class="container position-relative">
      <div class="row">
        <div class="col-sm-12 col-md-4 text-start mb-4">
          <h6 class="text-white font-weight-bolder text-uppercase mb-2">
            <img :src="navbarBrandImg" alt="TTS" class="footer-logo mb-4" />
          </h6>
        </div>
        <div class="col-sm-3 col-md-2 me-auto text-start mb-4">
          <div>
            <h5 class="text-gradient text-primary fw-bold mb-3">{{ $t('footer_legal_title') }}</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <!-- Update the privacy policy link to follow the language rules -->
                <a :href="getLocalizedLink('privacy-policy')" class="text-white ps-0">
                  {{ $t('footer_privacy_policy') }}
                </a>
              </li>
              <li class="mb-2">
                <!-- Update the terms of use link to follow the language rules -->
                <a :href="getLocalizedLink('terms-of-use')" class="text-white ps-0">
                  {{ $t('footer_terms_of_use') }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-sm-5 col-md-3 me-auto text-start mb-4">
          <div>
            <h5 class="text-gradient text-primary fw-bold mb-3">{{ $t('footer_contact_us') }}</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <a class="text-white" href="tel:+966112000292">
                  <font-awesome-icon :icon="['fas', 'phone']" class="me-3" />
                  0112000292
                </a>
              </li>
              <li class="mb-2">
                <a class="text-white" href="mailto:noreply@techtrans.live">
                  <font-awesome-icon :icon="['fas', 'envelope']" class="me-3" />
                  noreply@techtrans.live
                </a>
              </li>
              <li class="mb-2">
                <a class="text-white" href="https://wa.me/966112000292">
                  <font-awesome-icon :icon="['fab', 'whatsapp']" class="me-3" />
                  966112000292
                </a>
              </li>
              <li>
                <a class="text-white" href="https://x.com/tts_sa">
                  <font-awesome-icon :icon="['fab', 'x-twitter']" class="me-3" />
                  @tts_sa
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-sm-12 col-md-3 text-start mb-4">
          <div>
            <h5 class="text-gradient text-primary fw-bold mb-1">{{ $t('footer_certified_by') }}</h5>
            <div class="certified-images mt-3 text-start">
              <img :src="certifiedPartner1" alt="Certified Partner 1" class="img-fluid mb-3 footer-certified-logo" />
              <img :src="certifiedPartner2" alt="Certified Partner 2" class="img-fluid mb-3 footer-certified-logo" />
            </div>
          </div>
        </div>
        <div class="col-12 pt-2 mt-4 border-top border-primary"></div>
        <div class="col-sm-12 text-center text-md-start px-0">
          <p class="text-secondary">{{ $t('footer_copyright', { year: currentYear, company: companyName }) }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// Use ES module import instead of require
import navbarBrandImg from '/img/logos/jobs-tts/logo-white.png';
import wavePattern from '/img/shapes/waves-white.svg';
import certifiedPartner1 from '/img/logos/gamr.svg';
import certifiedPartner2 from '/img/logos/cst.svg';

export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      navbarBrandImg,
      wavePattern,
      certifiedPartner1,
      certifiedPartner2,
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
