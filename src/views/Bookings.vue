<template>
  <div class="bookings">
    <div class="type--preheader">Welcome Home</div>
    <h2 class="type--heading-1">Hi, {{ user.first_name }}</h2>
    <div v-if="isReady && bookings.length == 0">
      You don't have any bookings at Overlook yet.
    </div>
    <ovl-collapsible-section
      title="Upcoming"
      v-if="isReady && upcomingBookings.length > 0"
    >
      <div
        v-for="booking in upcomingBookings"
        :key="booking.id"
        class="booking__container"
      >
        <div class="booking__image-wrapper">
          <img
            :src="booking.hotel.media[0].imageSrc"
            :alt="booking.hotel.media[0].imageAlt"
            class="booking__image"
          />
        </div>
        <div class="booking__body">
          <div class="booking__hotel type--preheader">
            {{ booking.hotel.city }}
          </div>
          <h4 class="booking__room-type type--heading-3">
            {{ booking.hotel.name }}
          </h4>
          <div class="booking__date">
            {{ formatDate(booking.check_in_date) }} to
            {{ formatDate(booking.check_out_date) }}
          </div>
        </div>
      </div>
    </ovl-collapsible-section>

    <ovl-collapsible-section
      title="Past Stays"
      :collapseByDefault="upcomingBookings.length > 0"
      v-if="isReady && pastBookings.length > 0"
    >
      <div
        v-for="booking in pastBookings"
        :key="booking.id"
        class="booking__container"
      >
        <div class="booking__image-wrapper">
          <img
            :src="booking.hotel.media[0].imageSrc"
            :alt="booking.hotel.media[0].imageAlt"
            class="booking__image"
          />
        </div>
        <div class="booking__body">
          <div class="booking__hotel type--preheader">
            {{ booking.hotel.city }}
          </div>
          <h4 class="booking__room-type type--heading-3">
            {{ booking.hotel.name }}
          </h4>
          <div class="booking__date">
            {{ formatDate(booking.check_in_date) }} to
            {{ formatDate(booking.check_out_date) }}
          </div>
        </div>
      </div>
    </ovl-collapsible-section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OvlCollapsibleSection from "@/components/atomic/OvlCollapsibleSection.vue";
import { Getter } from "vuex-class";
import axios from "axios";

@Component({ components: { OvlCollapsibleSection } })
export default class Bookings extends Vue {
  @Getter("auth/user") user!: () => User;
  bookings: Booking[] = [];
  isReady = false;

  get upcomingBookings() {
    return this.bookings.filter(booking => {
      const today = new Date();
      const bookingDate = new Date(booking.check_out_date);
      return bookingDate > today;
    });
  }

  get pastBookings() {
    return this.bookings.filter(booking => {
      const today = new Date();
      const bookingDate = new Date(booking.check_out_date);
      return bookingDate < today;
    });
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  created() {
    this.fetchBookings();
  }

  fetchBookings() {
    axios.get("/bookings").then(response => {
      console.log(response.data.data);
      this.bookings = response.data.data;
      this.isReady = true;
    });
  }
}
</script>

<style scoped>
.bookings {
  padding: var(--spacing-md);
}

.booking__container {
  border-bottom: 1px solid var(--color-dark-l2);
  cursor: pointer;
  display: flex;
  max-height: 200px;
  padding: var(--spacing-md) 0;
}

.booking__image-wrapper {
  /* width: 50px; */
  /* height: 50px; */
  width: 180px;
  height: 180px;
}

.booking__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.booking__room-type {
  margin: 0 0 var(--spacing-md) 0;
}

.booking__body {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
