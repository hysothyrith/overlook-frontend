<template>
  <div class="ovl-grid">
    <ovl-gallery :galleryImages="galleryImages" class="booking__gallery" />
    <div class="booking__body ovl-grid__body">
      <div class="caption caption--pretitle">Hospitality Awaits</div>
      <h2 class="heading-1">Book a Stay</h2>
      <ovl-input type="select" title="Hotel" v-model="hotel">
        <option value="fish">The Grand Overlook</option>
        <option value="chips">Overlook One</option>
      </ovl-input>
      <ovl-input type="select" title="Persons" v-model="persons">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="4+">5 or more</option>
      </ovl-input>
      <ovl-input
        type="date"
        title="Check-in Date"
        v-model="checkInDate"
        :min="today"
      />
      <ovl-input
        type="date"
        title="Check-out Date"
        v-model="checkOutDate"
        :min="checkInDate"
      />
      <div class="booking__action-container">
        <ovl-button>Search</ovl-button>
      </div>

      <div class="booking-offer__container">
        <div class="booking-offer">
          <h3 class="heading-3 booking-offer__title">Queen's Regel</h3>
          <div class="booking-offer__description">
            Lasted my coming uneasy marked so should. Gravity letters it amongst
            herself dearest an windows by.
          </div>
          <div class="booking-offer__price">$134 <i>per night</i></div>
          <div class="separator"></div>
        </div>
        <div class="booking-offer">
          <h3 class="heading-3 booking-offer__title">King's Court</h3>
          <div class="booking-offer__description">
            Lasted my coming uneasy marked so should. Gravity letters it amongst
            herself dearest an windows by.
          </div>
          <div class="booking-offer__price">$134 <i>per night</i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OvlGallery from "@/components/atomic/OvlGallery.vue";
import OvlInput from "@/components/atomic/OvlInput.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";

@Component({
  components: { OvlGallery, OvlInput, OvlButton },
})
export default class Book extends Vue {
  galleryImages: Image[] = [
    {
      id: 1,
      src: require("../assets/images/violet_pool.jpg"),
      alt: "Random Unsplash Image",
    },
    {
      id: 2,
      src: require("../assets/images/blue_pool.jpg"),
      alt: "Random Unsplash Image",
    },
    {
      id: 3,
      src: require("../assets/images/sand_living_room.jpg"),
      alt: "Random Unsplash Image",
    },
    {
      id: 4,
      src: require("../assets/images/white_pool.jpg"),
      alt: "Random Unsplash Image",
    },
  ];
  hotel = "";
  persons = 1;
  today = new Date().toISOString().slice(0, 10);
  checkInDate = "";
  checkOutDate = "";
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

.booking__body {
  height: 100%;
}

.booking__action-container {
  margin-top: var(--spacing-lg);
}

.booking-offer__container {
  margin-top: var(--spacing-lg);
}

.booking-offer {
  border-top: 1px solid var(--color-dark-l2);
}

.booking-offer__description {
  margin: var(--spacing-md) 0;
}

.booking-offer__price {
  text-align: right;
  margin-bottom: var(--spacing-md);
}
</style>
