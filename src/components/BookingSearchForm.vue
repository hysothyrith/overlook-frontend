<template>
  <div class="booking-form" v-if="isReady">
    <form class="booking-form__body" @submit.prevent="formWillSubmit">
      <div class="type--preheader">Hospitality Awaits</div>
      <h2 class="type--heading-1">Book a Stay</h2>
      <ovl-input
        type="select"
        title="Hotel"
        v-model="form.hotel"
        @change="hotelDidChange"
      >
        <option
          v-for="hotel in hotels"
          :key="hotel.id"
          :value="hotel.id"
          :selected="hotel.id == form.hotel ? true : false"
          >{{ hotel.title }}</option
        >
      </ovl-input>
      <ovl-input
        type="select"
        title="Persons"
        v-model="form.persons"
        @change="personsDidChange"
      >
        <option v-for="n in 20" :key="n" :value="n">{{ n }}</option>
      </ovl-input>
      <ovl-input
        type="date"
        title="Check-in Date"
        v-model="form.checkInDate"
        @change="checkInDateDidChange"
        :min="today"
      />
      <ovl-input
        type="date"
        title="Check-out Date"
        v-model="form.checkOutDate"
        @change="checkOutDateDidChange"
        :min="minCheckOutDate"
      />
      <div class="booking__action-container">
        <ovl-button>Search</ovl-button>
      </div>
    </form>

    <div v-if="offersAreFetched" class="booking-offer__container">
      <div
        v-for="offer in offers"
        :key="offer.id"
        class="booking-offer"
        @click="offerDidClick"
      >
        <h4 class="type--heading-3 booking-offer__title">{{ offer.name }}</h4>
        <div class="booking-offer__description">
          {{ offer.description }}
        </div>
        <div class="booking-offer__price">
          ${{ offer.price }} <i>per night</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import OvlInput from "@/components/atomic/OvlInput.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";

@Component({
  components: {
    OvlInput,
    OvlButton
  }
})
export default class BookingSearchForm extends Vue {
  hotels = [];
  isReady = false;
  form = {
    hotel: this.$route.query.hotel || "1",
    persons: this.$route.query.persons || "1",
    checkInDate: this.$route.query.checkInDate || "",
    checkOutDate: this.$route.query.checkOutDate || ""
  };
  today = new Date().toISOString().slice(0, 10);
  offers = [];
  offersAreFetched = false;

  created() {
    this.fetchData();
  }

  fetchData() {
    axios.get("/hotel/list").then(response => {
      this.hotels = response.data.data;
      this.isReady = true;
    });
  }

  get minCheckOutDate() {
    if (
      typeof this.form.checkInDate == "string" &&
      this.form.checkInDate !== ""
    ) {
      const checkInDate = Date.parse(this.form.checkInDate);
      return new Date(checkInDate + 1 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
    }
    return null;
  }

  hotelDidChange() {
    this.pushToQuery({ hotel: this.form.hotel });
  }

  personsDidChange() {
    this.pushToQuery({ persons: this.form.persons });
  }

  checkInDateDidChange() {
    this.pushToQuery({ checkInDate: this.form.checkInDate });
  }

  checkOutDateDidChange() {
    this.pushToQuery({ checkOutDate: this.form.checkOutDate });
  }

  pushToQuery(queryParam: Record<symbol, string>) {
    this.$router.replace({
      path: "/book",
      query: { ...this.$route.query, ...queryParam }
    });
  }

  async formWillSubmit() {
    this.fetchOffers();
  }

  fetchOffers() {
    // console.log(this.form);
    // console.log(this.$route.query);
    axios
      .get("/booking-offers", {
        params: {
          ...this.form,
          // eslint-disable-next-line @typescript-eslint/camelcase
          hotel_id: this.form.hotel,
          people: this.form.persons
        }
      })
      .then(response => {
        this.offers = response.data.data;
        this.offersAreFetched = true;
        // console.log(response.data.data);
      });
  }

  offerDidClick() {
    console.log("offerDidClick");
  }
}
</script>

<style scoped>
.booking__action-container {
  margin-top: var(--spacing-lg);
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
</style>
