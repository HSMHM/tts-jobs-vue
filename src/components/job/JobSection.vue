<template>
  <header class="overflow-hidden">
    <div class="page-header min-vh-35 bg-gradient-dark"></div>
    <div
      class="bg-gradient-primary position-relative mx-xxl-8 mx-xl-4 mx-lg-3 mx-3 py-2 z-index-2 border-radius-xl mt-n9">
      <img src="/img/shapes/waves-white.svg" alt="pattern-lines"
        class="position-absolute opacity-6 start-0 top-0 w-100">
      <div class="container position-relative">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-6 col-md-8 text-start py-5 me-auto position-relative">
            <div class="position-relative">
              <h1 class="mt-4 text-white">{{ jobTitle }}</h1>
              <p class="lead text-white">{{ jobSubtitle }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <section class="">
    <div class="container-fluid py-5">
      <div class="card border-2 bg-transparent">
      <div class="row justify-content-between p-3 job-action-section">
        <div class="col-md-6 text-md-start">
          <p class="text-muted"><span class="fs-6 fw-bold me-2">{{ $t('date_title') }} : </span>{{ formattedDate }}</p>
          <div class="d-flex align-items-center justify-content-start ms-auto">
            <p class="mb-0 fs-6 fw-bold me-2">{{ $t('share_title') }} : </p>
            <a :href="`https://twitter.com/share?url=${shareUrl}&text=${jobTitle}`" target="_blank" class="me-2">
              <i class="fab fa-twitter"></i>
            </a>
            <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`" target="_blank" class="me-2">
              <i class="fab fa-facebook"></i>
            </a>
            <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${jobTitle}`"
              target="_blank">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
        <div class="col-md-6 text-md-end  align-self-center">
          <button class="btn btn-rounded btn-primary apply-button mb-0">{{ $t('apply_btn_title') }}</button>
        </div>

      </div>
    </div>
  </div>
  </section>

  <!-- Job Details Section -->
  <section class="">
    <div class="container py-5">
      <div class="row align-items-center">
        <div class="col-md-6 mb-auto">
          <div class="description-section position-relative">
            <p class="lead ms-4 mb-md-5 mb-4">{{ jobDescription }}</p>
            <div class="gradient-lines rounded rounded-4"></div>
          </div>
          <p><span class="me-2">&#9679;</span> {{ jobPoint1 }}</p>
          <p><span class="me-2">&#9679;</span> {{ jobPoint2 }}</p>
          <p><span class="me-2">&#9679;</span> {{ jobPoint3 }}</p>
          <p><span class="me-2">&#9679;</span> {{ jobPoint4 }}</p>
          <p><span class="me-2">&#9679;</span> {{ jobPoint5 }}</p>
          <p><span class="me-2">&#9679;</span> {{ jobPoint6 }}</p>
        </div>
        <div class="col-md-6">
          <div class="blur-shadow-image text-center">
            <img :src="jobImage" alt="img-blur-shadow" class="img-fluid shadow border-radius-lg max-height-600">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import jobImage1 from '/img/jobs/job-1.png';
import jobImage2 from '/img/jobs/job-2.png';
import jobImage3 from '/img/jobs/job-3.png';
import jobImage4 from '/img/jobs/job-4.png';
import jobImage5 from '/img/jobs/job-5.png';
import jobImage6 from '/img/jobs/job-6.png';

export default {
  props: {
    jobName: {
      type: String,
      required: true,
    },
  },
  computed: {
    jobTitle() {
      return this.$t(`jobs.${this.jobName}.title`, 'Default Title');
    },
    jobSubtitle() {
      return this.$t(`jobs.${this.jobName}.subtitle`, 'Default Subtitle');
    },
    jobDescription() {
      return this.$t(`jobs.${this.jobName}.description`, 'Default Description');
    },
    jobPoint1() {
      return this.$t(`jobs.${this.jobName}.point_1`, 'Point 1');
    },
    jobPoint2() {
      return this.$t(`jobs.${this.jobName}.point_2`, 'Point 2');
    },
    jobPoint3() {
      return this.$t(`jobs.${this.jobName}.point_3`, 'Point 3');
    },
    jobPoint4() {
      return this.$t(`jobs.${this.jobName}.point_4`, 'Point 4');
    },
    jobPoint5() {
      return this.$t(`jobs.${this.jobName}.point_5`, 'Point 5');
    },
    jobPoint6() {
      return this.$t(`jobs.${this.jobName}.point_6`, 'Point 6');
    },
    jobImage() {
      const jobImages = {
        'job-1': jobImage1,
        'job-2': jobImage2,
        'job-3': jobImage3,
        'job-4': jobImage4,
        'job-5': jobImage5,
        'job-6': jobImage6,
      };
      return jobImages[this.jobName] || jobImages['job-1'];
    },
    shareUrl() {
      return `${window.location.origin}/jobs-tts/${this.jobName}`;
    },
    formattedDate() {
      const date = new Date();
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
</script>

