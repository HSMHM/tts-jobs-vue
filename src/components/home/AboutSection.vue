<template>
  <section id="about">
    <div class="bg-white position-relative mx-xxl-8 mx-xl-4 mx-lg-3 mx-3 my-4 z-index-2 border-radius-xl">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-lg-6">
            <h1 class="text-gradient text-primary mb-2 mt-2">
              {{ $t('about_section_title') }} <span>{ </span>{{ $t('about_section_complate_title') }}<span> }</span>
            </h1>
            <p class="fs-6 text-justify text-dark">
              {{ $t('about_description') }}
            </p>
            <h6 class="text-primary icon-move-left">
              {{ $t('about_sign_text') }}
              <i class="fas fa-pen text-sm me-1"></i>
            </h6>
          </div>

          <div class="col-lg-6 text-start text-md-end">
            <div class="animat-mask">
              <!-- Saudi map animation container -->
              <div v-if="isClient" id="saMapAnimation"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'AboutSection',
  setup() {
    const isClient = ref(false);

    onMounted(() => {
      isClient.value = true;
      loadSaudiMapAnimation();
    });

    const loadSaudiMapAnimation = () => {
      if (typeof window !== 'undefined') {
        import('lottie-web').then(lottie => {
          lottie.loadAnimation({
            container: document.getElementById('saMapAnimation'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/data-sa.json',
          });
        }).catch((error) => {
          console.error('Error loading Saudi map animation:', error);
        });
      }
    };

    return {
      isClient,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
