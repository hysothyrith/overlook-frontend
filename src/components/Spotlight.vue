<template>
  <div class="ovl-grid">
    <ovl-carousel
      :carouselImages="carouselImages"
      class="spotlight__carousel"
      @did-change="carouselDidChange"
    />
    <div class="ovl-grid__body spotlight__body">
      <div class="caption caption--pretitle">{{ spotlightCaption }}</div>
      <h2 class="heading-1">{{ spotlightTitle }}</h2>
      <div class="spotlight__description">
        {{ spotlightDescription }}
      </div>
      <div class="spotlight__action-container">
        <router-link to="/book">
          <ovl-button class="spotlight__action">Book a stay</ovl-button>
        </router-link>
        <ovl-button type="outline" class="spotlight__action"
          >About hotel</ovl-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OvlCarousel from "@/components/atomic/OvlCarousel.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";

@Component({
  components: { OvlCarousel, OvlButton },
})
export default class Spotlight extends Vue {
  @Prop({ required: true }) private spotlightSlides!: SpotlightSlide[];

  currentIndex = 0;
  carouselImages: Image[] = this.spotlightSlides.map((slide) => {
    return {
      id: slide.id,
      src: slide.imgSrc,
      alt: slide.imgAlt,
    };
  });

  get spotlightCaption() {
    return this.spotlightSlides[this.currentIndex].caption;
  }

  get spotlightTitle() {
    return this.spotlightSlides[this.currentIndex].title;
  }

  get spotlightDescription() {
    return this.spotlightSlides[this.currentIndex].description;
  }

  carouselDidChange(index: number) {
    this.currentIndex = index;
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
