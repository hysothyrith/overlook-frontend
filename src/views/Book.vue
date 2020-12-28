<template>
  <div class="ovl-grid">
    <ovl-gallery :galleryImages="galleryImages" class="booking__gallery" />
    <div class="ovl-grid__body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OvlGallery from "@/components/atomic/OvlGallery.vue";
import OvlInput from "@/components/atomic/OvlInput.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";
import BookingSearchForm from "@/components/BookingSearchForm.vue";
import RoomInfo from "@/components/RoomInfo.vue";

@Component({
  components: { OvlGallery, OvlInput, OvlButton, BookingSearchForm, RoomInfo }
})
export default class Book extends Vue {
  galleryImages: Image[] = [
    {
      id: 1,
      src: require("../assets/images/violet_pool.jpg"),
      alt: "Random Unsplash Image"
    },
    {
      id: 2,
      src: require("../assets/images/blue_pool.jpg"),
      alt: "Random Unsplash Image"
    },
    {
      id: 3,
      src: require("../assets/images/sand_living_room.jpg"),
      alt: "Random Unsplash Image"
    },
    {
      id: 4,
      src: require("../assets/images/white_pool.jpg"),
      alt: "Random Unsplash Image"
    }
  ];
}
</script>

<style scoped>
.booking__grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
}

.booking__gallery {
  position: relative;
}
</style>
