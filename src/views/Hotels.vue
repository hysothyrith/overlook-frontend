<template>
  <div v-if="isReady">
    <div
      v-for="hotel in hotels"
      :key="hotel.id"
      :id="toKebabCase(hotel.title)"
      class="section"
    >
      <div class="section__image">
        <img
          class="ovl-image--cover"
          :src="hotel.imageSrc"
          :alt="hotel.imageAlt"
        />
      </div>
      <div class="section__info">
        <div class="type--preheader">In the city of {{ hotel.city }}</div>
        <h2 class="type--heading-1">{{ hotel.title }}</h2>
        <div class="type--body">
          {{ stripHtml(hotel.description) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({})
export default class Hotels extends Vue {
  hotels = [];
  isReady = false;

  created() {
    axios
      .get("/hotel/list")
      .then(response => {
        this.hotels = response.data.data;
        this.isReady = true;
      })
      .then(this.scrollToHash);
  }

  scrollToHash() {
    const element = document.querySelector(this.$route.hash) as HTMLDivElement;
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      });
    }
  }

  stripHtml(text: string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value.replace(/(<([^>]+)>)/gi, "");
  }

  toKebabCase(text: string) {
    return text
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .toLowerCase();
  }
}
</script>
<style scoped>
.section {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-lg);
}

.section__info {
  padding: var(--spacing-md);
}

/** Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/** Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .section {
    flex-direction: row;
    margin-bottom: var(--spacing-xl);
  }

  .section--reversed {
    flex-direction: row-reverse;
  }

  .section__image {
    width: 60%;
  }

  .section__info {
    width: 40%;
    padding: var(--spacing-lg);
  }

  .section--reversed > .section__info {
    padding-left: 0;
  }
}
/** Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/** Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
