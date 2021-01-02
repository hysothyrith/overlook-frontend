<template>
  <div class="ovl-grid">
    <ovl-gallery :galleryImages="galleryImages" class="booking__gallery" />
    <div class="ovl-grid__body">
      <booking-search-form @willSubmit="bookingFormWillSubmit" />

      <div v-if="offersAreFetched" class="booking-offer__container">
        <div
          v-for="offer in offers"
          :key="offer.id"
          :id="offer.id"
          class="booking-offer"
          @click="offerDidClick($event)"
        >
          <h4 class="type--heading-3 booking-offer__title">{{ offer.name }}</h4>
          <div class="booking-offer__description">
            {{ stripHtml(offer.description) }}
          </div>
          <div class="booking-offer__price">
            ${{ offer.price }} <i>per night</i>
          </div>
          <div
            class="booking-selector__container"
            @mouseleave="bookingSeletorsDidEndHover"
          >
            <i
              v-for="n in 3"
              :key="n"
              @click="bookingSelectorDidClick(n, offer)"
              @mouseover="bookingSelectorDidHover(n, offer.id)"
              class="booking-tick-selector gg-check-o"
              :class="[
                {
                  'booking-tick-selector--is-highlighted':
                    offer.id == focusedOfferId && n <= hoveredSelectionNumber
                },
                {
                  'booking-tick-selector--is-selected':
                    n <= quantitySelected(offer.id)
                }
              ]"
            ></i>
          </div>
          <div
            v-if="hoveredSelectionNumber > 0 && offer.id == focusedOfferId"
            class="type--meta"
          >
            Select {{ hoveredSelectionNumber }}
            {{ hoveredSelectionNumber > 1 ? "rooms" : "room" }}
          </div>
          <div
            v-if="quantitySelected(offer.id) && offer.id != focusedOfferId"
            class="type--meta"
          >
            Book {{ quantitySelected(offer.id) }}
            {{ quantitySelected(offer.id) > 1 ? "rooms" : "room" }}
          </div>
        </div>
      </div>
      <div v-if="totalPrice > 0">
        <h4 class="type--heading-3">Total: ${{ totalPrice }}</h4>
        <span> Suitable for {{ totalPeople }} people. </span>
        <span v-if="form.persons > totalPeople">Careful not enough space</span>
        <ovl-button @click="continueDidClick">Continue</ovl-button>
      </div>
      <!-- <div class="booking-offer__container">
        <div class="booking-offer">
          <h4 class="type--heading-3 booking-offer__title">Overlook One</h4>
          <div class="booking-offer__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            debitis laborum id explicabo minus error, assumenda dolores,
            sapiente deserunt, fuga rem? Nemo quos officia consequatur illum
            nisi facilis magni exercitationem.
          </div>
          <div class="booking-offer__price">$290 <i>per night</i></div>
          <div class="booking-selector__container">
            <i class="booking-tick-selector gg-check-o"></i>
            <i class="booking-tick-selector gg-check-o"></i>
            <i class="booking-tick-selector gg-check-o"></i>
          </div>
          <div class="type--meta">Book 2 rooms</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import OvlGallery from "@/components/atomic/OvlGallery.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";
import BookingSearchForm from "@/components/BookingSearchForm.vue";
import RoomInfo from "@/components/RoomInfo.vue";

@Component({
  components: { OvlGallery, OvlButton, BookingSearchForm, RoomInfo }
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

  form: BookingForm = {};
  offers = [];
  offersAreFetched = false;
  bookingSelection: {
    id: number;
    quantity: number;
    price: number;
    max: number;
  }[] = [];

  focusedOfferId = 0;
  hoveredSelectionNumber = 0;

  bookingFormWillSubmit(form: BookingForm) {
    this.form = form;
    this.fetchOffers(form);
  }

  fetchOffers(form: BookingForm) {
    axios
      .get("/booking-offers", {
        params: {
          // eslint-disable-next-line @typescript-eslint/camelcase
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
    return text.replace(/(<([^>]+)>)/gi, "");
  }

  offerDidClick(event: Event) {
    axios.get(`/roomType/show/${event.currentTarget?.id}`).then(response => {
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

  bookingSelectorDidClick(numberOfSelection: number, offer: any) {
    // console.log(id);
    // console.log(event.currentTarget.number);
    // console.log(numberOfSelection);
    // console.log(roomTypeId);
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
    this.focusedOfferId = roomTypeId;
    this.hoveredSelectionNumber = numberOfSelection;
  }

  bookingSeletorsDidEndHover() {
    this.focusedOfferId = 0;
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
      });
  }
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

.booking-offer__container {
  margin-top: var(--spacing-lg);
}

.booking-offer {
  border-top: 1px solid var(--color-dark-l2);
  cursor: pointer;
}

.booking-offer__description {
  margin: var(--spacing-md) 0;
}

.booking-offer__price {
  text-align: right;
  margin-bottom: var(--spacing-md);
}

.booking-selector__container {
  display: flex;
  margin: var(--spacing-sm) 0;
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
</style>
