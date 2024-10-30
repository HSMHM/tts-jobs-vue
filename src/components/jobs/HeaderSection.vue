<template>
  <header class="header-rounded-images jobs-header">
    <div class="page-header min-vh-70">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 text-lg-start text-center py-sm-0 py-7">
            <h1 class="text-gradient text-primary">{{ $t('jobs_page_title') }}</h1>
            <p class="text-white fs-6 text-lg-start text-center mt-4">{{ $t('jobs_page_subtitle') }}</p>
            <br />
          </div>
          <div class="col-lg-6 text-end position-relative">
            <div class="position-absolute top-0 w-100"></div>
          </div>
        </div>
      </div>
      <div class="bg-gradient-dark min-vh-80 w-100 position-absolute mt-sm-n11 top-0"></div>
      <div
        class="bg-gradient-dark min-vh-75 w-100 position-absolute mt-n10 top-0 ">
      </div>
      <div
        class="min-vh-50 w-100  position-absolute border-top-start-radius-0 border-top-end-radius-0 border-bottom-end-radius-0 top-0 end-0 bg-image-overlay">
      </div>
    </div>
  </header>
</template>

<script>
import team1Image from '/img/team/team-1.jpeg';

export default {
  data() {
    return {
      team1Image,
    };
  },
};
</script>
