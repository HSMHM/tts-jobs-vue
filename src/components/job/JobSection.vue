<template>
  <section class="container-fluid job-details">
    <div class="row mx-xxl-7 mx-xl-1 mx-lg-0 mx-0">
      <div class="col-md-12 px-0">
        <div class="card border shadow-none bg-transparent mt-3">
          <div class="card-body p-0">
            <div class="row justify-content-between p-3 job-action-section">
              <div class="col-md-6">
                <p class="text-muted fs-6">
                  <span class="fw-bold">{{ $t('date_title') }} :</span>
                  {{ jobDate }}
                </p>
                <div class="d-flex align-items-center justify-content-start ms-auto">
                  <p class="mb-0 fs-6 fw-bold me-2">{{ $t('share_title') }} :</p>
                  <a :href="`https://twitter.com/share?url=${shareUrl}&text=${shareText}`" target="_blank" class="me-2">
                    <font-awesome-icon :icon="['fab', 'x-twitter']" class="me-1 p-2 rounded-2 bg-secondary text-white" />
                  </a>
                  <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`" target="_blank" class="me-2">
                    <font-awesome-icon :icon="['fab', 'facebook']" class="me-1 p-2 rounded-2 bg-secondary text-white" />
                  </a>
                  <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${jobTitle}&text=${shareText}`" target="_blank">
                    <font-awesome-icon :icon="['fab', 'linkedin']" class="me-1 p-2 rounded-2 bg-secondary text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div class="card border-0 shadow-none bg-transparent mt-3">
          <div class="row justify-content-between">
            <div class="col-md-6 mt-3 px-0 px-md-2">
              <div class="card text-md-start border shadow-none">
                <div class="card-header bg-secondary">
                  <h6 class="text-white mb-0">{{ $t('job_task_title') }}</h6>
                </div>
                <div class="card-body">
                  <div v-for="(task, index) in jobTasks" :key="index">
                    <p>
                      <font-awesome-icon :icon="['fas', 'check']" class="me-2 text-primary" />
                      {{ task }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 mt-3 px-0 px-md-2">
              <div class="card text-md-start border shadow-none">
                <div class="card-header bg-secondary">
                  <h6 class="text-white mb-0">{{ $t('job_experiences_title') }}</h6>
                </div>
                <div class="card-body">
                  <div v-for="(experience, index) in jobExperiences" :key="index">
                    <p>
                      <font-awesome-icon :icon="['fas', 'check']" class="me-2 text-primary" />
                      {{ experience }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div class="card border-0 shadow-none bg-transparent my-4">
          <div class="card-body p-0">
            <div class="row justify-content-between p-3 job-action-section">
              <div class="col-md-12 text-center mt-5 mt-md-0 align-self-center">
                <button class="btn bg-gradient-primary text-white btn-round apply-button btn-lg" @click="openModal">
                  {{ $t('apply_btn_title') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <JobApplicationModal :isOpen="isModalOpen" :jobTitle="jobTitle" @close="closeModal" />
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import JobApplicationModal from '@/components/job/JobApplicationModal.vue';

export default {
  components: {
    FontAwesomeIcon,
    JobApplicationModal,
  },
  props: {
    jobName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    job() {
      return this.$i18n.messages[this.$i18n.locale]?.jobs?.[this.jobName] || {};
    },
    jobTitle() {
      return this.job.title || 'Default Title';
    },
    jobSummary() {
      return this.job.summary || 'Default Summary';
    },
    jobDate() {
      return this.job.date || 'Default Date';
    },
    jobTasks() {
      return Object.values(this.job.tasks || {});
    },
    jobExperiences() {
      return Object.values(this.job.experiences || {});
    },
    jobImage() {
      return `/img/jobs/${this.jobName}.png`;
    },
    shareUrl() {
      return `${window.location.origin}/${this.jobName}`;
    },
    shareText() {
      return this.$t('share_text', { jobTitle: this.jobTitle });
    },
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
