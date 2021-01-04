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
      <ovl-booking-info-card
        v-for="booking in upcomingBookings"
        :key="booking.id"
        :booking="booking"
      />
    </ovl-collapsible-section>

    <ovl-collapsible-section
      title="Past Stays"
      :collapseByDefault="upcomingBookings.length > 0"
      v-if="isReady && pastBookings.length > 0"
    >
      <ovl-booking-info-card
        v-for="booking in pastBookings"
        :key="booking.id"
        :booking="booking"
      />
    </ovl-collapsible-section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OvlCollapsibleSection from "@/components/atomic/OvlCollapsibleSection.vue";
import OvlBookingInfoCard from "@/components/OvlBookingInfoCard.vue";
import { Getter } from "vuex-class";
import axios from "axios";

@Component({ components: { OvlCollapsibleSection, OvlBookingInfoCard } })
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
  flex-direction: column;
  padding: var(--spacing-md) 0;
  width: 100%;
}

.booking__image-wrapper {
  height: 200px;
}

.booking__image {
  width: 100%;
  height: 100%;
  object-position: top;
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

.booking-detail__wrapper {
  margin: var(--spacing-sm) 0;
}

.booking-detail__room-name {
  margin: var(--spacing-xs) 0 var(--spacing-xs) var(--spacing-sm);
}

.booking-detail__total {
  padding-top: var(--spacing-md);
}

/** Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/** Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .booking__container {
    flex-direction: row;
  }

  .booking__image-wrapper {
    width: 20%;
    height: auto;
  }

  .booking__body {
    width: 80%;
  }
}

/** Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/** Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
