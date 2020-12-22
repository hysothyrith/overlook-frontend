<template>
  <div>
    <button
      class="hamburger hamburger--spring"
      type="button"
      @click="didClick"
      :class="{ 'is-active': isActive }"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    <div
      class="hamburger-menu"
      :class="{ 'hamburger-menu--is-active': isActive }"
    >
      <router-link class="nav__item" to="/">Home</router-link>
      <router-link class="nav__item" to="/book">Book</router-link>
      <router-link class="nav__item" to="/about-us">About us</router-link>
      <router-link class="nav__item" to="/contact-us">Contact us</router-link>
      <router-link class="nav__item" to="/privacy">Privacy</router-link>
      <router-link class="nav__action" to="/">
        <ovl-button>Join</ovl-button>
      </router-link>
      <router-link class="nav__action" to="/">
        <ovl-button type="outline">Sign In</ovl-button>
      </router-link>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "../assets/css/hamburgers.css";

@Component
export default class HamburgerMenu extends Vue {
  isActive = false;

  didClick() {
    this.isActive = !this.isActive;
  }
}
</script>

<style scoped>
.hamburger-menu {
  display: flex;
  flex-direction: column;
  background-color: rebeccapurple;
  position: absolute;
  opacity: 0;
  visibility: hidden;
}

.hamburger-menu--is-active {
  position: static;
  opacity: 1;
  visibility: visible;
  transition: opacity 1s ease;
}

/** Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/** Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
}

/** Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/** Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
