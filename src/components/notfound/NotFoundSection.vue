<template>
  <section class="py-8 bg-gradient-dark">
    <div class="container">
      <div class="col-lg-8 col-md-10 mx-auto pb-5">
        <div class="card shadow-lg">
          <div class="card-header bg-gradient-primary p-5 position-relative">
            <h1 class="text-white text-center my-5">404</h1>
            <h3 class="text-white text-center">{{ $t('not_found.title') }}</h3>
            <div class="position-absolute w-100 z-index-1 bottom-0 ms-n5">
              <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 40" preserveAspectRatio="none" shape-rendering="auto"
                style="height: 7vh; min-height: 50px">
                <defs>
                  <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z">
                  </path>
                </defs>
                <g class="moving-waves">
                  <use xlink:href="#gentle-wave" x="48" y="-1" fill="rgba(255,255,255,0.40)"></use>
                  <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.35)"></use>
                  <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.25)"></use>
                  <use xlink:href="#gentle-wave" x="48" y="8" fill="rgba(255,255,255,0.20)"></use>
                  <use xlink:href="#gentle-wave" x="48" y="13" fill="rgba(255,255,255,0.15)"></use>
                  <use xlink:href="#gentle-wave" x="48" y="16" fill="rgba(255,255,255,0.95)"></use>
                </g>
              </svg>
            </div>
          </div>

          <div class="card-body p-5 pt-0">
            <div class="not-found-page text-center">
              <h3 class="my-5">{{ $t('not_found.message') }}</h3>
              <router-link class="btn bg-gradient-primary text-white btn-round"
                :to="{ name: 'Home', params: { lang: $i18n.locale } }">
                {{ $t('not_found.back_home') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PrivacySection",
};
</script>