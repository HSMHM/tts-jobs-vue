<template>
    <router-view></router-view>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {
  },
  setup() {
    const { t, locale } = useI18n();
    const savedLanguage = localStorage.getItem('language');

    if (savedLanguage) {
      locale.value = savedLanguage;
    }

    const updateDocumentLanguage = () => {
      document.documentElement.lang = locale.value;
      document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr';
    };

    onMounted(() => {
      updateDocumentLanguage();
    });

    const switchLanguage = () => {
      if (locale.value === 'en') {
        locale.value = 'ar';
        localStorage.setItem('language', 'ar');
      } else {
        locale.value = 'en';
        localStorage.setItem('language', 'en');
      }
      updateDocumentLanguage();
    };

    return {
      switchLanguage,
    };
  },
};
</script>

<style lang="scss">
@import './assets/scss/tts-jobs-design-system.scss';
</style>
