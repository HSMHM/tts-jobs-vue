<template>
  <header class="position-relative bg-image-overlay d-flex align-items-center">
    <div class="overlay-gradient position-absolute top-0 start-0 w-100 h-100"></div>
    <div class="container position-relative text-center z-2 header-text mt-7 mb-3"> 
      <div class="row justify-content-center">
        <div class="col-lg-6 text-start me-auto">
          <h1 class="text-gradient text-primary">{{ $t('jobs_page_title') }}</h1>
          <p class="text-white fs-6 mt-3">
            {{ $t('jobs_page_subtitle') }}
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>
