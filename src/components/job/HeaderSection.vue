<template>
  <header class="header-rounded-images">
    <div class="page-header min-vh-23">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 text-lg-start text-center py-sm-0 py-7">
            <h1 class="text-gradient text-primary">{{ $t('jobs_page_title') }}</h1>
            <p class="text-white fs-5 text-lg-start text-center mt-4">{{ $t('jobs_page_subtitle') }}</p>
            <br />
          </div>
          <div class="col-lg-6 text-end position-relative">
            <div class="position-absolute top-0 w-100">
              <img
                :src="require('/img/team/team-2.jpeg')" 
                class="position-absolute rounded-circle img-1 d-lg-block d-none z-index-3"
                alt="avatar"
              />
              <img
                :src="require('/img/shapes/shape-3.svg')" 
                class="top-0 end-0 position-absolute shape-3 d-lg-block d-none"
                alt="shape"
              />
              <img
                :src="require('/img/shapes/shape-2.svg')"
                class="mt-4 position-absolute shape-2 d-lg-block d-none"
                alt="shape"
              />
              <img
                :src="require('/img/shapes/shape-1.svg')" 
                class="mt-n6 position-absolute shape-1 d-lg-block d-none"
                alt="shape"
              />
              <img
                :src="require('/img/team/team-1.jpeg')"
                class="position-absolute rounded-circle img-2 d-lg-block d-none z-index-3"
                alt="avatar"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gradient-dark min-vh-100 w-100 position-absolute mt-sm-n11 top-0 d-lg-none d-block"></div>
      <div
        class="bg-gradient-dark min-vh-100 w-75 position-absolute border-radius-section ms-n10 mt-n10 top-0 d-lg-block d-none">
      </div>
      <div
        class="min-vh-75 w-60 blur-section blur-gradient-primary position-absolute border-top-start-radius-0 border-top-end-radius-0 border-bottom-end-radius-0 border-radius-section mt-n8 me-n4 top-0 end-0 d-lg-block d-none"
      ></div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>

