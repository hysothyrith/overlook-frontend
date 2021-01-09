<template>
  <div class="ovl-grid book ovl-grid--book">
    <ovl-gallery :galleryImages="galleryImages" class="book__gallery" />
    <div class="ovl-grid__body">
      <booking-search-form @willSubmit="bookingFormWillSubmit" />

      <div v-if="offersAreFetched" class="booking-offer__container book__body">
        <div v-if="offers.length === 0">
          Sorry, there are no rooms available. Please consider trying a
          different date or any of our other hotels.
        </div>
        <div
          v-for="offer in offers"
          :key="offer.id"
          :id="offer.id"
          class="booking-offer"
          @click="offerDidClick($event)"
        >
          <h4 class="type--heading-3">{{ offer.name }}</h4>
          <div class="booking-offer__description">
            {{ stripHtml(offer.description) }}
          </div>
          <div style="display: flex; justify-content: space-between;">
            <div>
              <b>Suitable for {{ offer.max }} people</b>
            </div>
            <div class="booking-offer__price">
              <b>${{ offer.price }} per night</b>
            </div>
          </div>
          <div
            v-if="offer.id == focusedOfferId || quantitySelected(offer.id) > 0"
            style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--spacing-md);"
          >
            <div
              class="booking-selector__container"
              @mouseleave="bookingSeletorsDidEndHover"
            >
              <i
                v-for="n in numberOfSelectors(offer)"
                :key="n"
                @click="bookingSelectorDidClick(n, offer)"
                @mouseover="bookingSelectorDidHover(n, offer.id)"
                class="booking-tick-selector gg-check-o"
                :class="[
                  {
                    'booking-tick-selector--is-highlighted':
                      offer.id == hoveredOfferId && n <= hoveredSelectionNumber
                  },
                  {
                    'booking-tick-selector--is-selected':
                      n <= quantitySelected(offer.id)
                  }
                ]"
              ></i>
            </div>
            <div
              v-if="hoveredSelectionNumber > 0 && offer.id == hoveredOfferId"
              class="type--meta"
            >
              Select {{ hoveredSelectionNumber }}
              {{ hoveredSelectionNumber > 1 ? "rooms" : "room" }}
            </div>
            <div
              v-if="quantitySelected(offer.id) && offer.id != hoveredOfferId"
              class="type--meta"
            >
              {{ quantitySelected(offer.id) }}
              {{ quantitySelected(offer.id) > 1 ? "rooms" : "room" }} selected
            </div>
          </div>
        </div>
      </div>

      <div v-if="totalPrice > 0" class="booking-overview">
        <div class="ovl-flex-spread" style="padding: var(--spacing-md) 0;">
          <h4 class="type--heading-3" style="margin: 0;">
            Total: ${{ totalPrice }}
          </h4>
          <span :class="{ 'total-max--is-under': totalPeople < form.persons }">
            Suitable for {{ totalPeople }} people</span
          >
        </div>
        <template v-if="authenticated">
          <ovl-button
            @click="continueDidClick"
            style="margin: var(--spacing-md) 0;"
            >Continue</ovl-button
          >
        </template>
        <template v-else>
          <div class="type--body">
            You need an Overlook account before booking. Please sign-in or
            register to continue.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import axios from "axios";
import OvlGallery from "@/components/atomic/OvlGallery.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";
import BookingSearchForm from "@/components/BookingSearchForm.vue";

@Component({
  components: { OvlGallery, OvlButton, BookingSearchForm }
})
export default class Book extends Vue {
  @Getter("auth/authenticated") authenticated!: () => boolean;
  galleryImages: Image[] = [
    {
      id: 1,
      src:
        "https://images.unsplash.com/photo-1533633310920-cc9bf1e7f9b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      alt: "Overlook Hotels Promo Image - Bedroom"
    },
    {
      id: 2,
      src:
        "https://images.unsplash.com/photo-1525280244725-771f2a31841d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
      alt: "Overlook Hotels Promo Image - Breakfast"
    },
    {
      id: 3,
      src:
        "https://images.unsplash.com/photo-1488901512066-cd403111aeb2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80",
      alt: "Overlook Hotels Promo Image - Living Room"
    },
    {
      id: 4,
      src:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      alt: "Overlook Hotels Promo Image - White Bedroom"
    }
  ];

  form: BookingForm = {
    hotel: 0,
    persons: 0,
    checkInDate: "",
    checkOutDate: ""
  };
  offers = [];
  offersAreFetched = false;
  bookingSelection: {
    id: number;
    quantity: number;
    price: number;
    max: number;
  }[] = [];

  focusedOfferId = 0;
  hoveredOfferId = 0;
  hoveredSelectionNumber = 0;

  bookingFormWillSubmit(form: BookingForm) {
    this.form = form;
    this.bookingSelection = [];
    this.focusedOfferId = 0;
    this.fetchOffers(form);
  }

  fetchOffers(form: BookingForm) {
    axios
      .get("/booking-offers", {
        params: {
          hotel_id: form.hotel,
          ...form
        }
      })
      .then(response => {
        console.log(response.data.data);
        this.offers = response.data.data.roomTypes;
        this.offersAreFetched = true;
      });
  }

  stripHtml(text: string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value.replace(/(<([^>]+)>)/gi, "");
  }

  offerDidClick(event: Event) {
    const target = event.currentTarget as HTMLDivElement;
    this.focusedOfferId = (target.id as unknown) as number;
    axios.get(`/roomType/show/${target.id}`).then(response => {
      this.setGalleryImages(response.data.data.medias);
    });
  }

  setGalleryImages(images: { imageSrc: string; imageAlt: string }[]) {
    this.galleryImages = [];
    for (let i = 0; i < images.length; i++) {
      this.galleryImages.push({
        id: i,
        src: images[i].imageSrc,
        alt: images[i].imageAlt
      });
    }
  }

  bookingSelectorDidClick(
    numberOfSelection: number,
    offer: { id: number; max: number; price: number }
  ) {
    const existingSelection = this.bookingSelection.find(
      selection => selection["id"] == offer.id
    );
    if (existingSelection) {
      if (existingSelection.quantity == numberOfSelection) {
        existingSelection.quantity = 0;
        existingSelection.max = 0;
      } else {
        existingSelection.quantity = numberOfSelection;
        existingSelection.max = offer.max;
      }
    } else {
      this.bookingSelection.push({
        id: offer.id,
        quantity: numberOfSelection,
        price: offer.price,
        max: offer.max
      });
    }
  }

  bookingSelectorDidHover(numberOfSelection: number, roomTypeId: number) {
    this.hoveredOfferId = roomTypeId;
    this.hoveredSelectionNumber = numberOfSelection;
  }

  bookingSeletorsDidEndHover() {
    this.hoveredOfferId = 0;
    this.hoveredSelectionNumber = 0;
  }

  quantitySelected(roomTypeId: number) {
    return this.bookingSelection.find(
      selection => selection["id"] == roomTypeId
    )?.quantity;
  }

  get totalPrice() {
    let total = 0;
    this.bookingSelection.forEach(selection => {
      total += selection.quantity * selection.price;
    });
    return total;
  }

  get totalPeople() {
    let total = 0;
    this.bookingSelection.forEach(selection => {
      total += selection.max * selection.quantity;
    });
    return total;
  }

  numberOfSelectors(offer: any) {
    return offer.qtyAvailable < 3 ? offer.qtyAvailable : 3;
  }

  continueDidClick() {
    axios
      .post("booking/store", {
        hotel_id: this.form.hotel,
        check_in_date: this.form.checkInDate,
        check_out_date: this.form.checkOutDate,
        payment_type_id: 1,
        roomTypes: this.bookingSelection
      })
      .then(response => {
        console.log(response);
        this.$router.push({ name: "Bookings" });
        this.$notify({
          group: "ovl-notification-center",
          title: "Booking successful",
          type: "success",
          text: "We look forward to your stay at Overlook."
        });
      });
  }
}
</script>

<style scoped>
.booking-offer__container {
  margin-top: var(--spacing-lg);
}

.booking-offer {
  border-top: 1px solid var(--color-dark-l2);
  cursor: pointer;
  padding-bottom: var(--spacing-md);
}

.booking-offer__description {
  margin: var(--spacing-md) 0;
}

.booking-overview {
  border-top: 1px solid var(--color-dark-l2);
}

.booking-offer__price {
  text-align: right;
}

.booking-selector__container {
  display: flex;
}

.booking-tick-selector {
  margin-right: var(--spacing-xs);
}

.booking-tick-selector:hover,
.booking-tick-selector--is-highlighted {
  color: var(--color-highlight-l1);
}

.booking-tick-selector--is-selected {
  color: var(--color-highlight);
}

.total-max--is-under {
  color: var(--color-negative);
}

.gg-check-o {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 22px;
  border: 2px solid;
  border-radius: 100px;
}
.gg-check-o::after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  left: 3px;
  top: -1px;
  width: 6px;
  height: 10px;
  border-color: currentColor;
  border-width: 0 2px 2px 0;
  border-style: solid;
  transform-origin: bottom left;
  transform: rotate(45deg);
}
@media (min-width: 768px) {
  .book {
    height: 100vh;
  }

  .ovl-grid--book {
    grid-template-columns: 55% 45%;
  }

  .book__gallery,
  .book__body {
    height: 100%;
    overflow: auto;
  }
}
</style>
