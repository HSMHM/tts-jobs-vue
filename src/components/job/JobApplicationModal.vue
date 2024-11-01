<template>
    <div v-if="isOpen" class="modal fade show" tabindex="-1" style="display: block;" @click.self="close">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ jobTitle }}</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="row">
                <!-- Full Name -->
                <div class="mb-3 col-md-6">
                  <label for="fullName" class="form-label">
                    {{ $t('job_application.full_name') }}
                    <span class="text-danger">*</span>
                  </label>
                  <input type="text" v-model="formData.fullName" class="form-control" id="fullName" required />
                </div>
  
                <!-- Academic Qualification -->
                <div class="mb-3 col-md-6">
                  <label for="qualification" class="form-label">
                    {{ $t('job_application.qualification') }}
                    <span class="text-danger">*</span>
                  </label>
                  <select v-model="formData.qualification" class="form-select" id="qualification" required>
                    <option value="" disabled>{{ $t('job_application.qualification_select') }}</option>
                    <option value="bachelor">{{ $t('job_application.qualification_bachelor') }}</option>
                    <option value="master">{{ $t('job_application.qualification_master') }}</option>
                    <option value="phd">{{ $t('job_application.qualification_phd') }}</option>
                  </select>
                </div>
  
                <!-- Date of Birth -->
                <div class="mb-3 col-md-6">
                  <label for="dob" class="form-label">
                    {{ $t('job_application.date_of_birth') }}
                    <span class="text-danger">*</span>
                  </label>
                  <input type="date" v-model="formData.dob" class="form-control" id="dob" required />
                </div>
  
                <!-- Gender -->
                <div class="mb-3 col-md-6">
                  <label class="form-label">
                    {{ $t('job_application.gender') }}
                    <span class="text-danger">*</span>
                  </label>
                  <div>
                    <input type="radio" id="male" value="male" v-model="formData.gender" required />
                    <label for="male">{{ $t('job_application.gender_male') }}</label>
                    <input type="radio" id="female" value="female" v-model="formData.gender" class="ms-3" required />
                    <label for="female">{{ $t('job_application.gender_female') }}</label>
                  </div>
                </div>
  
                <!-- Experience Year -->
                <div class="mb-3 col-md-6">
                  <label for="experience" class="form-label">
                    {{ $t('job_application.experience') }}
                    <span class="text-danger">*</span>
                  </label>
                  <input type="number" v-model="formData.experience" class="form-control" id="experience" min="0" required />
                </div>
  
                <!-- Email -->
                <div class="mb-3 col-md-6">
                  <label for="email" class="form-label">
                    {{ $t('job_application.email') }}
                    <span class="text-danger">*</span>
                  </label>
                  <input type="email" v-model="formData.email" class="form-control" id="email" required />
                </div>
  
                <!-- Contact Number -->
                <div class="mb-3 col-md-6">
                  <label for="contactNumber" class="form-label">
                    {{ $t('job_application.contact_number') }}
                    <span class="text-danger">*</span>
                  </label>
                  <input type="tel" v-model="formData.contactNumber" class="form-control" id="contactNumber" required />
                </div>
  
                <!-- Country -->
                <div class="mb-3 col-md-6">
                  <label for="country" class="form-label">
                    {{ $t('job_application.country') }}
                    <span class="text-danger">*</span>
                  </label>
                  <select v-model="formData.country" class="form-select" id="country" required>
                    <option value="" disabled>{{ $t('job_application.country_select') }}</option>
                    <option v-for="(countryName, code) in countries" :key="code" :value="code">
                      {{ countryName }}
                    </option>
                  </select>
                </div>
  
                <!-- Resume File (PDF only) -->
                <div class="mb-3 col-md-6">
                  <label for="resume" class="form-label">
                    {{ $t('job_application.resume') }}
                    <span class="text-danger">*</span>
                  </label>
                  <input type="file" @change="handleFileUpload" class="form-control" id="resume" accept=".pdf" required />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 text-center">
                  <button type="submit" class="btn bg-gradient-primary text-white btn-round">{{ $t('job_application.submit') }}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Swal from 'sweetalert2';
  
  export default defineComponent({
    name: 'JobApplicationModal',
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      jobTitle: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        formData: {
          fullName: '',
          qualification: '',
          dob: '',
          gender: '',
          experience: '',
          email: '',
          contactNumber: '',
          country: '',
          resume: null,
        },
      };
    },
    computed: {
      countries() {
        return this.$i18n.messages[this.$i18n.locale]?.countries || {};
      },
    },
    methods: {
      close() {
        this.$emit('close');
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
          this.formData.resume = file;
        } else {
          this.formData.resume = null;
          Swal.fire({
            icon: 'error',
            title: this.$t('job_application.invalid_file_type'),
            text: this.$t('job_application.resume_error'),
          });
        }
      },
      submitForm() {
        if (this.formData.resume) {
          console.log('Form submitted:', this.formData);
          this.close();
        } else {
          Swal.fire({
            icon: 'error',
            title: this.$t('job_application.required_resume'),
            text: this.$t('job_application.resume_error'),
          });
        }
      },
    },
  });
  </script>
  
  