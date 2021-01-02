<template>
  <!-- <div>
    <div class="section" id="overlook-one">
      <div class="section__image">
        <img
          class="ovl-image--cover"
          src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80"
          alt="Overlook One Pool"
        />
      </div>
      <div class="section__info">
        <div class="type--preheader">In the Heart of Phnom Penh</div>
        <h2 class="type--heading-1">Overlook One</h2>
        <div class="type--body">
          Overlook One presents an ultra-luxury experience at the heart of the
          Cambodian capital. Soaring 188 meters above the heart of Phnom Penh,
          the hotel occupies the top 14 floors of Vattanac Capital Tower, the
          city's most iconic modern structure and a symbol of the new Cambodia,
          with unobstructed views of the fabled Mekong River.
        </div>
      </div>
    </div>
    <div class="section" id="the-grand-overlook">
      <div class="section__image">
        <img
          class="ovl-image--cover"
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="The Grand Overlook's Courtyard"
        />
      </div>
      <div class="section__info">
        <div class="type--preheader">In the City of Siem Reap</div>
        <h2 class="type--heading-1">The Grand Overlook</h2>
        <div class="type--body">
          Embark on a contemporary retreat at The Grand Overlook. Showcasing
          sleek, award-winning Khmer architecture and forward-thinking
          amenities, our hotel offers sophisticated comfort in the heart of one
          of the world's most inspiring locales. Experience effortless
          relaxation in exquisitely designed accommodations with locally
          inspired décor, sleek marble bathrooms, private balconies and
          signature amenities. Explore legendary attractions including Angkor
          Wat and Angkor Archeological Park, or spend a night out in Siem Reap
          on Pub Street. Rejuvenate your senses in our saltwater lagoon pool,
          state-of-the-art fitness center or Quan Spa, our hotel's luxe wellness
          destination. Savor delectable local fare and inspired international
          cuisine at our hotel restaurant, and punctuate a memorable day in
          Cambodia with a craft cocktail at our stylish rooftop bar, featuring
          spectacular views of Angkor Wat. Designed to dazzle The Grand Overlook
          is the perfect place to center your visit to Cambodia.
        </div>
      </div>
    </div>
    <div class="section" id="overlook-resort">
      <div class="section__image">
        <img
          class="ovl-image--cover"
          src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"
          alt="Overlook Resort's Outdoor Pool"
        />
      </div>
      <div class="section__info">
        <div class="type--preheader">In Seaside Town of Kep</div>
        <h2 class="type--heading-1">Overlook Resort</h2>
        <div class="type--body">
          During French rule, Kep was Cambodia’s premier seaside destination,
          widely known as “the St. Tropez of South-East Asia.” Here Overlook, we
          have worked with French architect Francoise Lavielle to restore and
          remodel these stunning colonial villas. They are now the centrepiece
          of an impeccably designed coastal resort which features plush rooms,
          an infinity pool overlooking the Gulf of Thailand, world-class
          cuisine, and much more. We treat our guests to a combination of
          privacy and personalized service, and enable them to discover the
          splendours of Cambodia and its wonderful people. We achieve all this
          while being the most environmentally aware and socially conscious
          hotel in all of Cambodia.
        </div>
      </div>
    </div>
    <div class="section" id="the-royal-overlook">
      <div class="section__image">
        <img
          class="ovl-image--cover"
          src="https://images.unsplash.com/photo-1605825831039-8b6b4199b04a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%253D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
          alt="Overlook Resort's Outdoor Pool"
        />
      </div>
      <div class="section__info">
        <div class="type--preheader">In Cambodia's Kampot</div>
        <h2 class="type--heading-1">The Royal Overlook</h2>
        <div class="type--body">
          Located 16 km from Kampot and nestled at the foothills of Bokor
          Mountain, The Royal Overlook provides something unique to fulfill
          every traveler’s dreams and desires. We have become a popular retreat
          for romantic escapes, family reunions, destination weddings, and
          eco-vactions, as well as small team building and conferences. This
          prime location is as alluring as it is rich in history, distinctive
          culture and creative fare. For sightseeing tours, we can arrange trips
          to Teuk Chou, Kampot, Bokor Mountain and other nearby historic and
          famous attractions. One of the main Features of the resort is the
          impeccable grounds that border the ocean, including the beach,
          gardens, ponds, mangroves and walkways. In the midst of the resort is
          one of the best restaurants in the area, The Reef Restaurant, that
          provides excellent Khmer and Western fare.
        </div>
      </div>
    </div>
  </div> -->
  <div v-if="isReady">
    <div v-for="hotel in hotels" :key="hotel.id" :id="hotel.id" class="section">
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
    axios.get("/hotel/list").then(response => {
      this.hotels = response.data.data;
      this.isReady = true;
    });
  }

  stripHtml(text: string) {
    return text.replace(/(<([^>]+)>)/gi, "");
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
