<template>
  <div class="carousel">
    <div class="carousel__image-container">
      <ovl-transition name="fade">
        <img :src="imgSrc" class="carousel__image" :alt="imgAlt" />
      </ovl-transition>
    </div>
    <div class="carousel__indicator-container">
      <div
        v-for="image in carouselImages"
        :key="image.id"
        class="carousel__indicator"
        :class="{
          'carousel__indicator--is-active': image.id === currentIndex + 1
        }"
        @click="carouselIndicatorDidClick(image.id)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OvlTransition from "@/components/atomic/OvlTransition.vue";

@Component({ components: { OvlTransition } })
export default class OvlCarousel extends Vue {
  @Prop({ required: true }) private carouselImages!: Image[];

  currentIndex = 0;

  carouselInterval = setInterval(() => {
    this.next();
  }, 5000);

  get nextIndex() {
    return (this.currentIndex + 1) % this.carouselImages.length;
  }

  get imgSrc() {
    return this.carouselImages[this.currentIndex].src;
  }

  get imgAlt() {
    return this.carouselImages[this.currentIndex].alt;
  }

  next() {
    this.currentIndex = this.nextIndex;
    this.$emit("did-change", this.currentIndex);
  }

  stop() {
    clearInterval(this.carouselInterval);
  }

  goToIndex(index: number) {
    this.currentIndex = index;
    this.$emit("did-change", this.currentIndex);
  }

  carouselIndicatorDidClick(id: number) {
    this.stop();
    this.goToIndex(id - 1);
  }
}
</script>

<style scoped>
.carousel {
  display: flex;
  flex-direction: column;
}

.carousel__image-container {
  width: 100%;
  height: 90%;
}

.carousel__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__indicator-container {
  display: flex;
  height: 10%;
  align-items: center;
  justify-content: center;
}

.carousel__indicator {
  background-color: var(--color-dark-l2);
  height: 8px;
  width: 8px;
  border-radius: 4px;
  margin: 0 var(--spacing-xs);
  cursor: pointer;
}

.carousel__indicator--is-active {
  background-color: var(--color-dark-l1);
  cursor: default;
}

/** Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/** Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .carousel {
    flex-direction: row-reverse;
  }

  .carousel__image-container {
    height: 100%;
    width: 100%;
  }

  .carousel__indicator-container {
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin: 0 var(--spacing-sm);
  }

  .carousel__indicator {
    margin: var(--spacing-xs) 0;
  }
}

/** Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/** Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
