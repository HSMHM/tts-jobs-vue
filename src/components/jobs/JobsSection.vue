<template>
  <section class="">
    <div class="jobs-area position-relative mx-xxl-8 mx-xl-4 mx-lg-3 mx-3 my-4 z-index-2 border-radius-xl mt-n5">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-lg-12">
            <div class="card px-3 mb-5">
              <div class="row">
                <!-- Search Field -->
                <div class="col-lg-5 pt-4 pb-2">
                  <div class="input-group rounded-pill">
                    <input
                      type="text"
                      class="form-control rounded-pill"
                      :placeholder="$t('search_placeholder')"
                      v-model="searchQuery"
                    />
                  </div>
                </div>
                
                <!-- Filter Buttons (Responsive) -->
                <div class="col-lg-7 pt-4 pb-2">
                  <div class="d-flex flex-wrap gap-2">
                    <button
                      v-for="filter in filters"
                      :key="filter.id"
                      type="button"
                      class="btn btn-round"
                      :class="{
                        'btn-secondary': activeFilter === filter.id,
                        'btn-outline-secondary': activeFilter !== filter.id
                      }"
                      @click="setFilter(filter.id)"
                    >
                      {{ $t(`filters.${filter.id}`) }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Jobs List -->
          <div v-for="(job, index) in filteredJobs" :key="index" class="col-lg-4 col-md-6 mb-4">
            <div class="card mt-3 job-card mx-4 position-relative">
              <div class="job-image-wrapper position-relative rounded-3">
                <a :href="getJobLink(job.slug)">
                  <img class="card-img-top" :src="job.image" alt="Job Image" />
                  <div class="job-overlay"></div>
                  <h5 class="job-title-overlay fs-5">{{ job.title }}</h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      activeFilter: "all", // Start with "All" selected
      filters: [
        { id: "all", label: "All" },
        { id: "hr", label: "HR" },
        { id: "it", label: "IT" },
        { id: "marketing", label: "Marketing" },
        { id: "executive", label: "Executive" }
      ]
    };
  },
  computed: {
    translatedJobs() {
      return [
        {
          slug: "job-1",
          title: this.$t("jobs.job-1.title"),
          department: "hr",
          image: "/img/jobs/job-1.png"
        },
        {
          slug: "job-2",
          title: this.$t("jobs.job-2.title"),
          department: "it",
          image: "/img/jobs/job-2.png"
        },
        {
          slug: "job-3",
          title: this.$t("jobs.job-3.title"),
          department: "marketing",
          image: "/img/jobs/job-3.png"
        },
        {
          slug: "job-4",
          title: this.$t("jobs.job-4.title"),
          department: "executive",
          image: "/img/jobs/job-4.png"
        }
      ];
    },
    filteredJobs() {
      return this.translatedJobs.filter(job => {
        const matchesFilter = this.activeFilter === "all" || job.department === this.activeFilter;
        const matchesSearch = job.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        return this.searchQuery ? matchesSearch : matchesFilter && matchesSearch;
      });
    }
  },
  methods: {
    setFilter(filterId) {
      this.activeFilter = filterId;
    },
    getJobLink(slug) {
      const currentLang = this.$i18n.locale;
      return currentLang === "en" ? `/en/${slug}` : `/${slug}`;
    }
  }
};
</script>
