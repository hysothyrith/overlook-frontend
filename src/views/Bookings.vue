<template>
  <div class="bookings">
    <h2 class="heading-1">Your Bookings</h2>
    <ovl-collapsible-section title="Upcoming">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="booking__container"
      >
        <div class="booking__image-wrapper">
          <img
            :src="booking.imageSrc"
            :alt="booking.imageAlt"
            class="booking__image"
          />
        </div>
        <div class="booking__body">
          <div class="booking__hotel caption">{{ booking.hotelName }}</div>
          <h4 class="booking__room-type heading-3">
            {{ booking.roomTypeName }}
          </h4>
          <div class="booking__date">
            {{ formatDate(booking.fromDate) }} to
            {{ formatDate(booking.toDate) }}
          </div>
        </div>
      </div>
    </ovl-collapsible-section>

    <ovl-collapsible-section title="Past Stays" :isCollapsed="true" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OvlCollapsibleSection from "@/components/atomic/OvlCollapsibleSection.vue";

@Component({ components: { OvlCollapsibleSection } })
export default class Bookings extends Vue {
  bookings = [
    {
      id: 1,
      hotelName: "Overlook One",
      roomTypeName: "King's Court",
      fromDate: "2020-12-23",
      toDate: "2020-12-25",
      status: "confirmed",
      imageSrc: "https://source.unsplash.com/random",
      imageAlt: "Random Unsplash image",
    },
    {
      id: 2,
      hotelName: "The Grand Overlook",
      roomTypeName: "Queen's Court",
      fromDate: "2020-12-23",
      toDate: "2020-12-25",
      status: "confirmed",
      imageSrc: "https://source.unsplash.com/random",
      imageAlt: "Random Unsplash image",
    },
    {
      id: 3,
      hotelName: "The Royal Overlook",
      roomTypeName: "Royal Double",
      fromDate: "2020-11-13",
      toDate: "2020-11-15",
      status: "completed",
      imageSrc: "https://source.unsplash.com/random",
      imageAlt: "Random Unsplash image",
    },
  ];

  get upcomingBookings() {
    return this.bookings;
  }

  get pastBookings() {
    return this.bookings;
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
</script>

<style scoped>
.booking__container {
  border-top: 1px solid var(--color-dark-l2);
  cursor: pointer;
}

.booking__image-wrapper {
  width: 50px;
  height: 50px;
}

.booking__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
