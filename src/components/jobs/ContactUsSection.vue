<template>
  <div class="mt-2 mb-0 py-6 bg-gradient-primary position-relative overflow-hidden">
    <img
      :src="wavePattern"
      alt="pattern-lines"
      class="position-absolute start-0 top-0 w-100 opacity-6"
    />
    <div class="container position-relative z-index-2">
      <div class="row">
        <div class="col-md-6 text-start">
          <h5 class="text-white lh-lg mb-lg-0 mb-5">
            {{ $t('contact_us_description') }}
          </h5>
        </div>
        <div class="col-lg-12 mt-3">
          <div class="row">
            <div class="col-md-2 ps-sm-0 me-lg-0 me-auto">
              <button type="button" class="pulse btn btn-round btn-outline-light mt-4" @click="openContactModal">
                {{ $t('contact_us_button') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal fade show" style="display: block;" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-gradient-primary">
            <h5 class="text-light fw-bold modal-title">{{ $t('contact_us_form_title') }}</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeContactModal"></button>
          </div>
          <div class="modal-body">
            <p>{{ $t('contact_us_form_message') }}</p>

            <form @submit.prevent="submitContactForm">
              <div class="mb-3">
                <label for="contactName" class="form-label">{{ $t('contact_form_name') }}</label>
                <input type="text" id="contactName" v-model="contactName" class="text-start form-control" 
                  :placeholder="$t('contact_placeholder_name')" />
              </div>
              <div class="mb-3">
                <label for="contactNumber" class="form-label">{{ $t('contact_form_number') }}</label>
                <input type="tel" id="contactNumber" v-model="contactNumber" class="text-start form-control" 
                  :placeholder="$t('contact_placeholder_number')" />
              </div>
              <div class="mb-3">
                <label for="contactMessage" class="form-label">{{ $t('contact_form_message') }}</label>
                <textarea id="contactMessage" v-model="contactMessage" class="text-start form-control" rows="3" 
                  :placeholder="$t('contact_placeholder_message')"></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">{{ $t('preferred_contact_time') }}</label>
                <div class="btn-group w-100" role="group" aria-label="Preferred contact time">
                  <input type="radio" class="btn-check" name="btnradio" id="time-1" value="8am-12pm" v-model="preferredTime" autocomplete="off" checked>
                  <label class="btn btn-light text-lowercase" for="time-1">8 {{ $t('time_am') }}  <span class="text-primary">{{ $t('contact_preferred_time_to') }}</span> 12 {{ $t('time_pm') }}</label>

                  <input type="radio" class="btn-check" name="btnradio" id="time-2" value="12pm-4pm" v-model="preferredTime" autocomplete="off">
                  <label class="btn btn-light text-lowercase" for="time-2">12 {{ $t('time_pm') }} <span class="text-primary">{{ $t('contact_preferred_time_to') }}</span> 4 {{ $t('time_pm') }}</label>

                  <input type="radio" class="btn-check" name="btnradio" id="time-3" value="4pm-8pm" v-model="preferredTime" autocomplete="off">
                  <label class="btn btn-light text-lowercase" for="time-3">4 {{ $t('time_pm') }} <span class="text-primary">{{ $t('contact_preferred_time_to') }}</span> 8 {{ $t('time_pm') }}</label>
                </div>
              </div>

              <button type="submit" class="btn bg-gradient-primary btn-primary btn-round mb-0 me-1" :disabled="loading">{{ $t('contact_send_button') }}</button>
              <div v-if="loading" class="spinner-border text-light ms-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import wavePatternImage from '/img/shapes/waves-white.svg';

export default {
  data() {
    return {
      showModal: false,
      contactName: '',
      contactNumber: '',
      contactMessage: '',
      preferredTime: '8am-12pm',
      loading: false,
      wavePattern: wavePatternImage, // Assign the imported image
    };
  },
  methods: {
    openContactModal() {
      this.showModal = true;
    },
    closeContactModal() {
      this.showModal = false;
    },
    async submitContactForm() {
      // First, check if the other fields are filled
      if (!this.contactName || !this.contactMessage || !this.preferredTime) {
        Swal.fire({
          text: this.$t('contact_form_incomplete'),
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster',
          },
          position: this.$i18n.locale === 'ar' ? 'center' : 'center',
          confirmButtonText: this.$t('contact_request_close_button'),
        });
        return;
      }

      // Now, validate the mobile number
      const mobileNumberPattern = /^05\d{8}$/;
      if (!this.contactNumber || !mobileNumberPattern.test(this.contactNumber)) {
        Swal.fire({
          text: this.$t('contact_form_mobile_invalid'),
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster',
          },
          position: this.$i18n.locale === 'ar' ? 'center' : 'center',
          confirmButtonText: this.$t('contact_request_close_button'),
        });
        return;
      }

      // If all fields are valid, proceed with form submission
      this.loading = true;
      try {
        await axios.post('https://us-central1-tabayn-website.cloudfunctions.net/app/send-email', {
          requesterName: this.contactName,
          mobileNumber: this.contactNumber,
          message: this.contactMessage,
          preferredTime: this.preferredTime,
          requestType: 'contactRequest',
        });

        // Reset form fields after successful submission
        this.contactName = '';
        this.contactNumber = '';
        this.contactMessage = '';
        this.preferredTime = '8am-12pm';
        this.showModal = false;

        Swal.fire({
          text: this.$t('contact_form_sent_success'),
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster',
          },
          position: this.$i18n.locale === 'ar' ? 'center' : 'center',
          confirmButtonText: this.$t('contact_request_close_button'),
        });
      } catch (error) {
        Swal.fire({
          text: this.$t('contact_form_sent_error', { contactEmail: 'noreply@techtrans.live' }),
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster',
          },
          position: this.$i18n.locale === 'ar' ? 'center' : 'center',
          confirmButtonText: this.$t('contact_request_close_button'),
        });
        console.error('Error sending email:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
