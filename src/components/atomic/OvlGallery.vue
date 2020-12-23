<template>
  <div class="gallery">
    <div class="gallery__image-container">
      <div
        v-for="image in galleryImages"
        class="gallery__image-wrapper"
        :key="image.id"
      >
        <img :src="image.src" :alt="image.alt" class="gallery__image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class OvlGallery extends Vue {
  @Prop({ required: true }) galleryImages!: Image[];
}
</script>

<style scoped>
.gallery {
  display: grid;
}

.gallery__image-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.gallery__image-container::-webkit-scrollbar {
  display: none;
}

.gallery__image-wrapper {
  width: 90vw;
  height: 80vw;
  flex: 0 0 auto;
  margin-right: var(--spacing-md);
}

.gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/** Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/** Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .gallery {
    grid-template-columns: 1fr;
  }

  .gallery__image-container {
    flex-wrap: wrap;
  }

  .gallery__image-wrapper {
    width: 100%;
    height: auto;
    margin-bottom: var(--spacing-md);
  }
}

/** Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/** Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
