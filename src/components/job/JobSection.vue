<template>
  <header class="overflow-hidden">
    <div class="page-header min-vh-50 bg-gradient-dark"></div>
    <div
      class="bg-gradient-primary position-relative mx-xxl-8 mx-xl-4 mx-lg-3 mx-3 py-2 z-index-2 border-radius-xl mt-n11">
      <img src="/img/shapes/waves-white.svg" alt="pattern-lines"
        class="position-absolute opacity-6 start-0 top-0 w-100">
      <div class="container position-relative">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-6 col-md-8 text-start py-5 me-auto position-relative">
            <div class="position-relative">
              <h1 class="mt-4 text-white">{{ studyTitle }}</h1>
              <p class="lead text-white">{{ studySubtitle }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <section class="">
    <div class="container py-5">
      <div class="row align-items-center">
        <div class="col-md-6 mb-auto">
          <div class="description-section position-relative">
            <p class="lead ms-4 mb-md-5 mb-4">{{ studyDescription }}</p>
            <div class="gradient-lines rounded rounded-4"></div>
          </div>
          <p><span class="me-2">&#9679;</span> {{ studyPoint1 }}</p>
          <p><span class="me-2">&#9679;</span> {{ studyPoint2 }}</p>
          <p><span class="me-2">&#9679;</span> {{ studyPoint3 }}</p>
          <p><span class="me-2">&#9679;</span> {{ studyPoint4 }}</p>
          <p><span class="me-2">&#9679;</span> {{ studyPoint5 }}</p>
          <p><span class="me-2">&#9679;</span> {{ studyPoint6 }}</p>
        </div>
        <div class="col-md-6">
          <div class="blur-shadow-image text-center">
            <img :src="studyImage" alt="img-blur-shadow" class="img-fluid shadow border-radius-lg max-height-600">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import studyImage1 from '/img/jobs-tts/study-1.webp';
import studyImage2 from '/img/jobs-tts/study-2.webp';
import studyImage3 from '/img/jobs-tts/study-3.webp';
import studyImage4 from '/img/jobs-tts/study-4.webp';
import studyImage5 from '/img/jobs-tts/study-5.webp';
import studyImage6 from '/img/jobs-tts/study-6.webp';

export default {
  props: {
    jobName: {
      type: String,
      required: true,
    }
  },
  computed: {
    studyTitle() {
      return this.$t(`studies.${this.jobName}.title`, 'Default Title');
    },
    studySubtitle() {
      return this.$t(`studies.${this.jobName}.subtitle`, 'Default Subtitle');
    },
    studyDescription() {
      return this.$t(`studies.${this.jobName}.description`, 'Default Description');
    },
    studyPoint1() {
      return this.$t(`studies.${this.jobName}.point_1`, 'Point 1');
    },
    studyPoint2() {
      return this.$t(`studies.${this.jobName}.point_2`, 'Point 2');
    },
    studyPoint3() {
      return this.$t(`studies.${this.jobName}.point_3`, 'Point 3');
    },
    studyPoint4() {
      return this.$t(`studies.${this.jobName}.point_4`, 'Point 4');
    },
    studyPoint5() {
      return this.$t(`studies.${this.jobName}.point_5`, 'Point 5');
    },
    studyPoint6() {
      return this.$t(`studies.${this.jobName}.point_6`, 'Point 6');
    },
    studyImage() {
      const studyImages = {
        'study-1': studyImage1,
        'study-2': studyImage2,
        'study-3': studyImage3,
        'study-4': studyImage4,
        'study-5': studyImage5,
        'study-6': studyImage6,
      };
      return studyImages[this.jobName] || studyImages['study-1'];
    },
    shareUrl() {
      return `${window.location.origin}/jobs-tts/${this.jobName}`;
    }
  },
  methods: {
  },
};
</script>
