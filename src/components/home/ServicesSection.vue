<template>
  <section id="services">
    <div class="bg-gradient-dark position-relative mx-xxl-8 mx-xl-4 mx-lg-3 mx-3 my-4 z-index-2 border-radius-xl py-5">
      <div class="container">
        <div class="gradient-lines"></div>
        <div class="row align-items-center justify-content-center">
          <div class="col-lg-12 mx-auto position-relative">
            <div class="row mb-4">
              <div class="col-md-6">
                <h1 class="text-gradient text-primary mb-0">{{ $t('services_section_title') }}</h1>
              </div>
            </div>
            <div class="row">
              <div
                v-for="(service, index) in translatedServices"
                :key="index"
                :id="'services' + (index + 1)"
                class="col-md-4 my-2 mb-lg-5"
              >
                <div class="h-100 card service-card card-body bg-dark d-flex justify-content-center shadow-lg border border-primary">
                  <h3 class="text-white mb-auto">{{ service.title }}</h3>
                  <p class="text-light pt-3 my-auto">{{ service.description }}</p>
                  <div class="buttons">
                    <button
                      type="button"
                      class="btn btn-round btn-outline-primary mt-4"
                      @click="openModal(service)"
                      :data-gtm-id="'open-' + service.title"
                      :data-gtm-url="'#services' + (index + 1)"
                    >
                      {{ $t('service_request_button') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="activeService" class="service-modal modal fade show" style="display: block;" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-gradient-primary">
            <h5 class="text-light fw-bold modal-title">{{ activeService.title }}</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>{{ $t('service_request_form_message', { serviceTitle: activeService.title }) }}</p>

            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="requesterName" class="form-label">{{ $t('service_requester_name') }}</label>
                <input
                  type="text"
                  id="requesterName"
                  v-model="requesterName"
                  class="text-start form-control"
                  :placeholder="$t('service_placeholder_requester_name')"
                />
              </div>
              <div class="mb-3">
                <label for="mobileNumber" class="form-label">{{ $t('service_requester_number') }}</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  v-model="mobileNumber"
                  class="text-start form-control"
                  :placeholder="$t('service_placeholder_mobile_number')"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">{{ $t('service_requester_preferred_contact_time') }}</label>
                <div class="btn-group w-100" role="group" aria-label="Preferred contact time">
                  <input type="radio" class="btn-check" name="btnradio" id="time-1" value="8am-12pm" v-model="preferredTime" autocomplete="off" checked>
                  <label class="btn btn-light text-lowercase" for="time-1">
                    8 {{ $t('service_preferred_time_status_night') }} <span class="text-primary">{{ $t('service_preferred_time_to') }}</span> 12 {{ $t('service_preferred_time_status_day') }}
                  </label>

                  <input type="radio" class="btn-check" name="btnradio" id="time-2" value="12pm-4pm" v-model="preferredTime" autocomplete="off">
                  <label class="btn btn-light text-lowercase" for="time-2">
                    12 {{ $t('service_preferred_time_status_day') }} <span class="text-primary">{{ $t('service_preferred_time_to') }}</span> 4 {{ $t('service_preferred_time_status_day') }}
                  </label>

                  <input type="radio" class="btn-check" name="btnradio" id="time-3" value="4pm-8pm" v-model="preferredTime" autocomplete="off">
                  <label class="btn btn-light text-lowercase" for="time-3">
                    4 {{ $t('service_preferred_time_status_day') }} <span class="text-primary">{{ $t('service_preferred_time_to') }}</span> 8 {{ $t('service_preferred_time_status_night') }}
                  </label>
                </div>
              </div>

              <!-- Submit Button with GTM Data Attributes -->
              <button
                type="submit"
                class="btn bg-gradient-primary btn-primary btn-round mb-0 me-1"
                :data-gtm-id="'submit-' + activeService.title"
                :data-gtm-url="'#services' + getServiceUrlFromTitle(activeService.title)"
              >
                {{ $t('service_request_send_button') }}
              </button>

              <div v-if="loading" class="spinner-border text-light ms-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      activeService: null,
      requesterName: '',
      mobileNumber: '',
      preferredTime: '8am-12pm',
      loading: false,
    };
  },
  computed: {
    translatedServices() {
      return [
        { title: this.$t('service_1_title'), description: this.$t('service_1_description') },
        { title: this.$t('service_2_title'), description: this.$t('service_2_description') },
        { title: this.$t('service_3_title'), description: this.$t('service_3_description') },
      ];
    },
  },
  methods: {
    openModal(service) {
      this.activeService = service;
    },
    closeModal() {
      this.activeService = null;
    },
    getServiceUrlFromTitle(title) {
      const index = this.translatedServices.findIndex((s) => s.title === title);
      return index !== -1 ? index + 1 : '';
    },
    async submitForm() {
  // First, check if the requesterName and preferredTime fields are filled
  if (!this.requesterName || !this.preferredTime) {
    Swal.fire({
      text: this.$t('service_request_form_incomplete'),
      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__faster',
      },
      confirmButtonText: this.$t('service_request_close_button'),
    });
    return;
  }

  // Now, validate the mobile number
  const mobileNumberPattern = /^05\d{8}$/;
  if (!this.mobileNumber || !mobileNumberPattern.test(this.mobileNumber)) {
    Swal.fire({
      text: this.$t('service_request_mobile_invalid'),
      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__faster',
      },
      confirmButtonText: this.$t('service_request_close_button'),
    });
    return;
  }

  // If all validations pass, proceed with form submission
  this.loading = true;
  try {
    await axios.post('https://us-central1-tabayn-website.cloudfunctions.net/app/send-email', {
      requesterName: this.requesterName,
      mobileNumber: this.mobileNumber,
      preferredTime: this.preferredTime,
      serviceTitle: this.activeService.title,
      requestType: 'serviceRequest',
    });

    // Reset form fields after successful submission
    this.requesterName = '';
    this.mobileNumber = '';
    this.preferredTime = '8am-12pm';
    this.activeService = null;

    Swal.fire({
      text: this.$t('service_request_sent_success'),
      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__faster',
      },
      confirmButtonText: this.$t('service_request_close_button'),
    });
  } catch (error) {
    Swal.fire({
      text: this.$t('service_request_sent_error', { contactEmail: 'noreply@techtrans.live' }),
      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__faster',
      },
      confirmButtonText: this.$t('service_request_close_button'),
    });
    console.error('Error sending email:', error);
  } finally {
    this.loading = false;
  }
},
  },
};
</script>
