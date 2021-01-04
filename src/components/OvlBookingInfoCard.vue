<template>
  <div class="booking-info-card" @click="cardDidClick">
    <div class="booking__hotel-image-wrapper">
      <img
        :src="booking.hotel.media[0].imageSrc"
        :alt="booking.hotel.media[0].imageAlt"
        class="booking__hotel-image"
      />
    </div>

    <div class="booking__body">
      <div class="ovl-flex-spread">
        <div>
          <div class="booking__city type--preheader">
            {{ booking.hotel.city }}
          </div>
          <h4 class="booking__hotel type--heading-3">
            {{ booking.hotel.name }}
          </h4>
        </div>
        <div>
          <div class="booking__date">
            {{ formatDate(booking.check_in_date) }} to
            {{ formatDate(booking.check_out_date) }}
          </div>
        </div>
      </div>
      <ovl-transition name="slide-fade">
        <div v-if="detailsAreShown">
          <div
            v-for="roomType in booking.roomTypes"
            :key="roomType.id"
            class="booking-detail__wrapper"
          >
            <div class="ovl-flex-spread">
              <div class="booking-detail__room-type">
                <b>{{ roomType.name }}</b>
              </div>
              <div class="ovl-flex-spread type--meta">
                <div>{{ roomType.quantity }} rooms</div>
                <i class="ovl-circle-separator"></i>
                <div>${{ roomType.price_per_room }} per night</div>
                <i class="ovl-circle-separator"></i>
                <div>
                  Suitable for {{ roomType.maximum * roomType.quantity }} people
                </div>
              </div>
            </div>
            <div
              v-for="room in roomType.rooms"
              :key="room.name"
              class="booking-detail__room-name"
            >
              {{ room.name }}
            </div>
          </div>
          <div class="booking-detail__total">
            <b>Total: ${{ booking.total }}</b>
          </div>
        </div>
      </ovl-transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OvlTransition from "@/components/atomic/OvlTransition.vue";

@Component({ components: { OvlTransition } })
export default class OvlBookingInfoCard extends Vue {
  @Prop({ required: true }) private booking!: Booking;
  detailsAreShown = false;

  cardDidClick() {
    this.detailsAreShown = !this.detailsAreShown;
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
}
</script>

<style scoped>
.booking-info-card {
  border-bottom: 1px solid var(--color-dark-l2);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md) 0;
  width: 100%;
}

.booking-details--is-hidden {
  display: none;
}

.booking__hotel-image-wrapper {
  height: 200px;
}

.booking__hotel-image {
  width: 100%;
  height: 100%;
  object-position: top;
  object-fit: cover;
}

.booking__hotel {
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
  .booking-info-card {
    flex-direction: row;
  }

  .booking__hotel-image-wrapper {
    width: 20%;
    min-height: 200px;
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
