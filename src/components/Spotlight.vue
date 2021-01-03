<template>
  <div class="ovl-grid">
    <ovl-carousel
      v-if="isReady"
      :carouselImages="carouselImages"
      class="spotlight__carousel"
      @did-change="carouselDidChange"
    />
    <div v-if="isReady" class="ovl-grid__body spotlight__body">
      <div class="type--preheader">{{ spotlightCaption }}</div>
      <h2 class="type--heading-1">{{ spotlightTitle }}</h2>
      <div class="spotlight__description body">
        {{ spotlightDescription }}
      </div>
      <div class="spotlight__action-container">
        <ovl-button class="spotlight__action" @click="bookButtonDidClick"
          >Book a stay</ovl-button
        >
        <ovl-button
          design="outline"
          class="spotlight__action"
          @click="aboutButtonDidClick"
          >About hotel</ovl-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

import OvlCarousel from "@/components/atomic/OvlCarousel.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";

@Component({
  components: { OvlCarousel, OvlButton }
})
export default class Spotlight extends Vue {
  spotlights: SpotlightSlide[] = [];
  carouselImages: Image[] = [];
  isReady = false;
  currentIndex = 0;

  created() {
    this.fetchData();
  }

  get spotlightCaption() {
    return this.spotlights[this.currentIndex].caption;
  }

  get spotlightTitle() {
    return this.spotlights[this.currentIndex].title;
  }

  get spotlightDescription() {
    return this.spotlights[this.currentIndex].description.replace(
      /(<([^>]+)>)/gi,
      ""
    );
  }

  get hotelId() {
    return this.spotlights[this.currentIndex].hotelId;
  }

  get snakeCaseHotelName() {
    return this.spotlights[this.currentIndex].title
      .replace(/\s+/g, "-")
      .toLowerCase();
  }

  carouselDidChange(index: number) {
    this.currentIndex = index;
  }

  fetchData() {
    axios
      .get("/spotlights")
      .then(response => {
        this.spotlights = response.data.data;
        this.carouselImages = this.spotlights.map(spotlight => {
          return {
            id: spotlight.id,
            src: spotlight.imageSrc,
            alt: spotlight.imageAlt
          };
        });
        this.isReady = true;
      })
      .catch(e => {
        console.log(e);
      });
  }

  bookButtonDidClick() {
    this.$router.push({
      path: "book",
      query: { hotel: this.hotelId.toString() }
    });
  }

  aboutButtonDidClick() {
    this.$router.push({
      name: "Hotels",
      hash: `#${this.hotelId}`
    });
  }
}
</script>

<style scoped>
.spotlight__carousel {
  height: 400px;
}

.spotlight__description {
  margin-bottom: var(--spacing-lg);
}

.spotlight__action {
  margin-right: var(--spacing-sm);
}

/** Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/** Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .spotlight__carousel {
    height: 400px;
  }

  .spotlight__body {
    justify-content: center;
  }
}

/** Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .spotlight__carousel {
    height: 550px;
  }
}

/** Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
