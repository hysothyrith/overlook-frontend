<template>
  <div class="ovl-grid">
    <ovl-carousel
      v-if="isReady"
      :carouselImages="carouselImages"
      class="spotlight__carousel"
      @did-change="carouselDidChange"
    />
    <div v-if="isReady" class="ovl-grid__body spotlight__body">
      <div class="caption caption--pretitle">{{ spotlightCaption }}</div>
      <h2 class="heading-1">{{ spotlightTitle }}</h2>
      <div class="spotlight__description body">
        {{ spotlightDescription }}
      </div>
      <div class="spotlight__action-container">
        <ovl-button class="spotlight__action" @click="bookButtonDidClick"
          >Book a stay</ovl-button
        >
        <ovl-button
          type="outline"
          class="spotlight__action"
          @click="aboutButtonDidClick"
          >About hotel</ovl-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

import OvlCarousel from "@/components/atomic/OvlCarousel.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";
import VueRouter from "vue-router";

@Component({
  components: { OvlCarousel, OvlButton },
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
    return this.spotlights[this.currentIndex].description;
  }

  get hotelId() {
    return this.spotlights[this.currentIndex].hotelId;
  }

  carouselDidChange(index: number) {
    this.currentIndex = index;
  }

  fetchData() {
    axios
      .get("https://5fe1977804f0780017de9e55.mockapi.io/api/spotlights")
      .then((response) => {
        this.spotlights = response.data;
        this.carouselImages = this.spotlights.map((spotlight) => {
          return {
            id: spotlight.id,
            src: spotlight.imgSrc,
            alt: spotlight.imgAlt,
          };
        });
        this.isReady = true;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  bookButtonDidClick() {
    this.$router.push({
      path: "book",
      query: { hotelId: this.hotelId.toString() },
    });
  }

  aboutButtonDidClick() {
    this.$router.push({
      name: "Hotels",
      hash: `#${this.hotelId}`,
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
