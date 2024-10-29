<template>
  <header>
    <div class="page-header bg-gradient-primary min-vh-100">
      <div class="oblique position-absolute top-0 h-100 d-md-block d-none">
        <picture class="header-tts-jobs oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6">
          <source :srcset="webpImage" type="image/webp" />
          <img
            :src="fallbackImage"
            alt="Header Background"
            class=""
            loading="lazy"
            style="width: 100%; height: 100%; object-fit: cover;"
          />
        </picture>

        <div class="animate-header position-relative">
          <div class="tag-scrollers">
            <div class="tag-scroller">
              <ul class="tag-list text-gradient text-primary">
                <li v-for="(tag, index) in tags" :key="index">{{ tag }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-7 d-flex justify-content-center flex-column">
            <h1 class="text-white lh-base">{{ $t('tabayn_cit') }}</h1>
            <p class="lead py-4 text-white lh-base">
              {{ $t('tabayn_bio') }}
            </p>
            <div class="buttons">
              <a :href="studiesPageLink" class="pulse btn btn-round btn-outline-light mt-4">
                {{ $t('case_studies_button') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        this.$t('service_scroll_1'),
        this.$t('service_scroll_2'),
        this.$t('service_scroll_3'),
        this.$t('service_scroll_4'),
        this.$t('service_scroll_5'),
        this.$t('service_scroll_6'),
        this.$t('service_scroll_7'),
        this.$t('service_scroll_8'),
        this.$t('service_scroll_9'),
        this.$t('service_scroll_10'),
        this.$t('service_scroll_1'),
        this.$t('service_scroll_2'),
        this.$t('service_scroll_3'),
        this.$t('service_scroll_4'),
        this.$t('service_scroll_5'),
        this.$t('service_scroll_6'),
        this.$t('service_scroll_7'),
        this.$t('service_scroll_8'),
        this.$t('service_scroll_9'),
        this.$t('service_scroll_10')
      ],
      webpImage: '/img/backgrounds/header-1.webp',
      fallbackImage: '/img/backgrounds/header-1.jpg'
    };
  },
  computed: {
    studiesPageLink() {
      // Generate the studies link based on the current locale
      const currentLang = this.$i18n.locale;
      return currentLang === 'en' ? '/en/studies' : '/studies';
    }
  },
  mounted() {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery && !mediaQuery.matches) {
      this.setupTagScroller();
    }
  },
  methods: {
    setupTagScroller() {
      const tagScroller = document.querySelector(".tag-scroller");
      if (!tagScroller) return; // Ensure the element exists

      const allTags = tagScroller.querySelectorAll("li");

      function createElement(tagName, className = "") {
        const elem = document.createElement(tagName);
        elem.className = className;
        return elem;
      }

      function scrollersFrom(elements, numColumns = 2) {
        const fragment = new DocumentFragment();
        elements.forEach((element, i) => {
          const column = i % numColumns;
          const children = fragment.children;
          if (!children[column]) fragment.appendChild(createElement("ul", "tag-list"));
          children[column].appendChild(element);
        });
        return fragment;
      }

      const scrollers = scrollersFrom(allTags, 2);
      tagScroller.innerHTML = "";
      tagScroller.appendChild(scrollers);
      this.addScrolling();
    },
    addScrolling() {
      const tagScroller = document.querySelector(".tag-scroller");
      if (tagScroller) {
        tagScroller.classList.add("scrolling");

        document.querySelectorAll(".tag-list").forEach((tagList) => {
          const scrollContent = Array.from(tagList.children);
          scrollContent.forEach((listItem) => {
            const clonedItem = listItem.cloneNode(true);
            clonedItem.setAttribute("aria-hidden", true);
            tagList.appendChild(clonedItem);
          });
          tagList.style.setProperty("--duration", (tagList.clientWidth / 100) + "s");
        });
      }
    }
  }
};
</script>
