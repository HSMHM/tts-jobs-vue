<template>
  <section class="py-8 bg-gradient-dark">
    <div class="container">
      <div class="col-lg-8 col-md-10 mx-auto pb-5">
        <div class="card shadow-lg">
          <div class="card-header bg-gradient-primary p-5 position-relative">
            <h1 class="text-white text-center my-5">404</h1>
            <div class="position-absolute w-100 z-index-1 bottom-0 ms-n5">
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