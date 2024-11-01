<template>
  <header class="overflow-hidden job-header">
    <div class="page-header min-vh-35 bg-gradient-dark position-relative"
         :style="{ backgroundImage: jobImage ? `url(${jobImage})` : '', backgroundSize: 'cover', backgroundPosition: 'center' }">
      <div class="overlay"></div>
    </div>
    <div class="bg-gradient-primary position-relative mx-xxl-8 mx-xl-4 mx-lg-3 mx-3 py-2 z-index-2 border-radius-xl mt-n9">
      <img src="/img/shapes/waves-white.svg" alt="pattern-lines" class="position-absolute opacity-6 start-0 top-0 w-100" />
      <div class="container position-relative">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-6 col-md-8 text-start py-5 me-auto position-relative">
            <div class="tags">
              <div class="position-absolute z-3 bottom-5 justify-content-between">
                <span class="badge rounded-pill badge-outline-white mx-1">{{ job.location }}</span>
                <span class="badge rounded-pill badge-outline-white mx-1">{{ job.type }}</span>
              </div>
            </div>
            <div class="position-relative">
              <h3 class="mt-4 text-white">{{ jobTitle }}</h3>
              <p class="lead fs-6 text-white mt-3">{{ jobSummary }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    jobName: {
      type: String,
      required: true,
    },
  },
  computed: {
    jobImage() {
      return `/img/jobs/${this.jobName}.png`;
    },
    job() {
      return this.$i18n.messages[this.$i18n.locale]?.jobs?.[this.jobName] || {};
    },
    jobTitle() {
      return this.job.title || 'Default Title';
    },
    jobSummary() {
      return this.job.summary || 'Default Summary';
    },
  },
};
</script>
