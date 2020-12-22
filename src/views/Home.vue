<template>
  <div class="home">
    <Spotlight :spotlightSlides="spotlights" />
    <!-- <ovl-carousel :carouselImages="carouselImages" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Spotlight from "@/components/Spotlight.vue";
import OvlCarousel from "@/components/atomic/OvlCarousel.vue";

@Component({ components: { Spotlight, OvlCarousel } })
export default class Home extends Vue {
  spotlights: SpotlightSlide[] = [
    {
      id: 1,
      imgSrc: require("../assets/images/violet_pool.jpg"),
      imgAlt: "Test Pictures",
      caption: "In the heart of Phnom Penh",
      title: "Overlook One",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi blanditiis consectetur cupiditate distinctio dolore esse libero nam tenetur voluptatibus.`,
    },
    {
      id: 2,
      imgSrc: require("../assets/images/blue_pool.jpg"),
      imgAlt: "Test Pictures",
      caption: "Hospitality awaits at",
      title: "The Grand Overlook",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cupiditate illo magni nobis, perferendis ullam.`,
    },
    {
      id: 3,
      imgSrc: require("../assets/images/blue_pool.jpg"),
      imgAlt: "Test Pictures",
      caption: "Hospitality awaits at",
      title: "The Grand Overlook",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cupiditate illo magni nobis, perferendis ullam.`,
    },
    {
      id: 4,
      imgSrc: require("../assets/images/blue_pool.jpg"),
      imgAlt: "Test Pictures",
      caption: "Hospitality awaits at",
      title: "The Grand Overlook",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cupiditate illo magni nobis, perferendis ullam.`,
    },
  ];
}
</script>
