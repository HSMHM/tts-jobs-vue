<template>
    <div>
    <AppNavbar />
    <NotFoundSection />
    <AppFooter />
  </div>

  </template>
  
  <script>
  import AppNavbar from '@/components/layout/AppNavbar.vue';
  import NotFoundSection from '@/components/notfound/NotFoundSection.vue';
  import AppFooter from '@/components/layout/AppFooter.vue';
  export default {
    components: {
    AppNavbar,
    NotFoundSection,
    AppFooter,
  },
    name: 'NotFoundPage',
  };
  </script>

  