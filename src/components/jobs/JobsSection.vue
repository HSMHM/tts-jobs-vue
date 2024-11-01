<template>
  <section class="">
    <div class="jobs-area position-relative mx-xxl-8 mx-xl-4 mx-lg-3 mx-3 my-4 z-index-2 border-radius-xl mt-n5">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-lg-12">
            <div class="card border shadow px-3 mb-5">
              <div class="row">
                <!-- Search Field -->
                <div class="col-lg-4 pt-4 pb-2">
                  <div class="input-group rounded-pill">
                    <input type="text" class="form-control rounded-pill" :placeholder="$t('search_placeholder')"
                      v-model="searchQuery" />
                  </div>
                </div>

                <!-- Filter Buttons (Responsive) -->
                <div class="col-lg-12 pt-4 pb-2">
                  <div class="d-flex flex-wrap gap-2">
                    <button v-for="filter in filters" :key="filter.id" type="button" class="btn btn-round" :class="{
                      'btn-secondary': activeFilter === filter.id,
                      'btn-outline-secondary': activeFilter !== filter.id
                    }" @click="setFilter(filter.id)">
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
              <div class="tags">
                <div class="position-absolute  z-3 bottom-5 start-3 justify-content-between">
                  <span class="badge rounded-pill badge-outline-white mx-1">{{ job.location }}</span>
                  <span class="badge rounded-pill badge-outline-white mx-1">{{ job.type }}</span>
                </div>
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
        { id: "executive", label: "Executive" },
        { id: "sales", label: "Sales" }
      ]
    };
  },
  computed: {
    translatedJobs() {
      return [
        {
          slug: "job-1",
          title: this.$t("jobs.job-1.title"),
          department: ["sales", "it"],
          location: this.$t("jobs.job-1.location"),
          type: this.$t("jobs.job-1.type"),
          image: "/img/jobs/job-1.png"
        },
        {
          slug: "job-2",
          title: this.$t("jobs.job-2.title"),
          department: ["hr"],
          location: this.$t("jobs.job-2.location"),
          type: this.$t("jobs.job-2.type"),
          image: "/img/jobs/job-2.png"
        },
        {
          slug: "job-3",
          title: this.$t("jobs.job-3.title"),
          department: ["it"],
          location: this.$t("jobs.job-3.location"),
          type: this.$t("jobs.job-3.type"),
          image: "/img/jobs/job-3.png"
        },
        {
          slug: "job-4",
          title: this.$t("jobs.job-4.title"),
          department: ["it"],
          location: this.$t("jobs.job-4.location"),
          type: this.$t("jobs.job-4.type"),
          image: "/img/jobs/job-4.png"
        },
        {
          slug: "job-5",
          title: this.$t("jobs.job-5.title"),
          department: ["it"],
          location: this.$t("jobs.job-5.location"),
          type: this.$t("jobs.job-5.type"),
          image: "/img/jobs/job-5.png"
        },
        {
          slug: "job-6",
          title: this.$t("jobs.job-6.title"),
          department: ["it"],
          location: this.$t("jobs.job-6.location"),
          type: this.$t("jobs.job-6.type"),
          image: "/img/jobs/job-6.png"
        },
        {
          slug: "job-7",
          title: this.$t("jobs.job-7.title"),
          department: ["executive"],
          location: this.$t("jobs.job-7.location"),
          type: this.$t("jobs.job-7.type"),
          image: "/img/jobs/job-7.png"
        },
        {
          slug: "job-8",
          title: this.$t("jobs.job-8.title"),
          department: ["it"],
          location: this.$t("jobs.job-8.location"),
          type: this.$t("jobs.job-8.type"),
          image: "/img/jobs/job-8.png"
        },
        {
          slug: "job-9",
          title: this.$t("jobs.job-9.title"),
          department: ["it"],
          location: this.$t("jobs.job-9.location"),
          type: this.$t("jobs.job-9.type"),
          image: "/img/jobs/job-9.png"
        },
        {
          slug: "job-10",
          title: this.$t("jobs.job-10.title"),
          department: ["marketing"],
          location: this.$t("jobs.job-10.location"),
          type: this.$t("jobs.job-10.type"),
          image: "/img/jobs/job-10.png"
        },
        {
          slug: "job-11",
          title: this.$t("jobs.job-11.title"),
          department: ["sales"],
          location: this.$t("jobs.job-11.location"),
          type: this.$t("jobs.job-11.type"),
          image: "/img/jobs/job-11.png"
        },
        {
          slug: "job-12",
          title: this.$t("jobs.job-12.title"),
          department: ["it"],
          location: this.$t("jobs.job-12.location"),
          type: this.$t("jobs.job-12.type"),
          image: "/img/jobs/job-12.png"
        }
      ];
    },
    filteredJobs() {
      return this.translatedJobs.filter(job => {
        const matchesFilter = this.activeFilter === "all" || job.department.includes(this.activeFilter);
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
