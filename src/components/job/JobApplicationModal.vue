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

              <div class="mb-3 col-md-6">
                <label for="fullName" class="form-label">
                  {{ $t('job_application.full_name') }}
                  <span class="text-danger">*</span>
                </label>
                <input type="text" v-model="formData.fullName" class="form-control" id="fullName" required />
              </div>

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

              <div class="mb-3 col-md-6">
                <label for="dob" class="form-label">
                  {{ $t('job_application.date_of_birth') }}
                  <span class="text-danger">*</span>
                </label>
                <input type="date" v-model="formData.dob" class="form-control" id="dob" required />
              </div>

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

              <div class="mb-3 col-md-6">
                <label for="experience" class="form-label">
                  {{ $t('job_application.experience') }}
                  <span class="text-danger">*</span>
                </label>
                <input type="number" v-model="formData.experience" class="form-control" id="experience" min="0"
                  required />
              </div>

              <div class="mb-3 col-md-6">
                <label for="email" class="form-label">
                  {{ $t('job_application.email') }}
                  <span class="text-danger">*</span>
                </label>
                <input type="email" v-model="formData.email" class="form-control" id="email" required />
              </div>

              <div class="mb-3 col-md-6">
                <label for="contactNumber" class="form-label">
                  {{ $t('job_application.contact_number') }}
                  <span class="text-danger">*</span>
                </label>
                <input type="tel" v-model="formData.contactNumber" class="form-control" id="contactNumber" required />
              </div>

              <div class="mb-3 col-md-6">
                <label for="country" class="form-label">
                  {{ $t('job_application.country') }}
                  <span class="text-danger">*</span>
                </label>
                <select v-model="formData.country" class="form-select" id="country" required>
                  <option value="" disabled>{{ $t('job_application.country_select') }}</option>
                  <option v-for="country in countryList" :key="country.code" :value="country.code">
                    {{ country.name }}
                  </option>
                </select>
              </div>

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
                <button type="submit" class="btn bg-gradient-primary text-white btn-round" :disabled="loading">
                  <span v-if="loading">{{ $t('job_application.loading') }}</span>
                  <span v-if="loading" class="ms-3 spinner-border spinner-border-sm" role="status"
                    aria-hidden="true"></span>
                  <span v-else>{{ $t('job_application.submit') }}</span>
                </button>
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
import axios from 'axios';

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
      loading: false,
    };
  },
  computed: {
    countryList() {
      return Object.values(this.$i18n.messages[this.$i18n.locale]?.countries || []);
    },
    localizedFormData() {
      const genderLocalized = this.formData.gender === 'male' ? 'ذكر' : 'أنثى';
      const qualificationLocalized =
        this.formData.qualification === 'bachelor'
          ? 'بكالوريوس'
          : this.formData.qualification === 'master'
          ? 'ماجستير'
          : 'دكتوراه';

      const countryLocalized = this.countryList.find(
        country => country.code === this.formData.country
      )?.name || this.formData.country;

      return {
        ...this.formData,
        gender: genderLocalized,
        qualification: qualificationLocalized,
        country: countryLocalized,
      };
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = () => {
          this.formData.resume = reader.result.split(',')[1];
        };
        reader.readAsDataURL(file);
      } else {
        this.formData.resume = null;
        Swal.fire({
          icon: 'error',
          title: this.$t('job_application.invalid_file_type'),
          text: this.$t('job_application.resume_error'),
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster',
          },
          position: 'center',
          confirmButtonText: this.$t('job_application.confirm_button_text'),
        });
      }
    },
    async submitForm() {
      if (!this.formData.resume) {
        Swal.fire({
          text: this.$t('job_application.resume_error'),
          icon: 'error',
          showClass: { popup: 'animate__animated animate__fadeInUp animate__faster' },
          hideClass: { popup: 'animate__animated animate__fadeOutDown animate__faster' },
          position: 'center',
          confirmButtonText: this.$t('job_application.confirm_button_text'),
          customClass: { container: this.$i18n.locale === 'ar' ? 'swal-rtl' : '' },
        });
        return;
      }

      this.loading = true;

      try {
        const formDataToSend = {
          fullName: this.formData.fullName,
          email: this.formData.email,
          contactNumber: this.formData.contactNumber,
          jobTitle: this.jobTitle,
          language: this.$i18n.locale,
          qualification: this.localizedFormData.qualification,
          dob: this.formData.dob,
          gender: this.localizedFormData.gender,
          experience: this.formData.experience,
          country: this.localizedFormData.country,
          resume: this.formData.resume, 
        };

        
        const emailEndpoint = process.env.NODE_ENV === 'production'
          ? '/.netlify/functions/sendEmail'
          : '/api/submit-form';

        
        const googleScriptEndpoint = process.env.NODE_ENV === 'production'
          ? '/.netlify/functions/forward-to-google-script'
          : '/api/forward-to-google-script';

      
        await axios.post(emailEndpoint, formDataToSend, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

       
        await axios.post(googleScriptEndpoint, formDataToSend, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        Swal.fire({
          text: this.$t('job_application.form_submission_message', { email: this.formData.email }),
          showClass: { popup: 'animate__animated animate__fadeInUp animate__faster' },
          hideClass: { popup: 'animate__animated animate__fadeOutDown animate__faster' },
          position: 'center',
          confirmButtonText: this.$t('job_application.confirm_button_text'),
          customClass: { container: this.$i18n.locale === 'ar' ? 'swal-rtl' : '' },
        }).then(() => {
          this.close();
        });
      } catch (error) {
        Swal.fire({
          text: this.$t('job_application.email_error'),
          showClass: { popup: 'animate__animated animate__fadeInUp animate__faster' },
          hideClass: { popup: 'animate__animated animate__fadeOutDown animate__faster' },
          position: 'center',
          confirmButtonText: this.$t('job_application.confirm_button_text'),
          customClass: { container: this.$i18n.locale === 'ar' ? 'swal-rtl' : '' },
        });
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>


<style scoped>
.swal-rtl .swal2-popup {
  direction: rtl;
  text-align: right;
}
</style>
