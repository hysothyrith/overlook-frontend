<template>
  <div class="navbar">
    <router-link class="navbrand" to="/">Overlook</router-link>
    <hamburger-button
      class="hamburger-button"
      :isActive="isActive"
      @click="hamburgerButtonDidClick"
    />
    <div
      class="navbar__item-container"
      :class="{ 'navbar__item-container--is-active': isActive }"
      @click="navItemDidClick"
    >
      <router-link
        class="navbar__item type--action"
        :class="{ 'navbar__item--is-active': isActive }"
        @click="navItemDidClick"
        to="/"
        exact
        >Home</router-link
      >
      <router-link
        class="navbar__item type--action"
        :class="{ 'navbar__item--is-active': isActive }"
        @click="navItemDidClick"
        to="/about-us"
        >About us</router-link
      >
      <router-link
        class="navbar__item type--action"
        :class="{ 'navbar__item--is-active': isActive }"
        @click="navItemDidClick"
        to="/hotels"
        >Hotels</router-link
      >
      <router-link
        class="navbar__item type--action"
        :class="{ 'navbar__item--is-active': isActive }"
        @click="navItemDidClick"
        to="/book"
        >Book</router-link
      >
      <router-link
        class="navbar__item type--action"
        :class="{ 'navbar__item--is-active': isActive }"
        @click="navItemDidClick"
        to="/contact-us"
        >Contact us</router-link
      >

      <template v-if="authenticated">
        <router-link
          class="navbar__item navbar__action"
          @click="navItemDidClick"
          to="/bookings"
        >
          <ovl-button>Bookings</ovl-button>
        </router-link>
        <span class="navbar__item navbar__action" @click="signOut">
          <ovl-button type="outline">Sign Out</ovl-button>
        </span>
      </template>
      <template v-else>
        <router-link
          class="navbar__item navbar__action"
          :class="{ 'navbar__item--is-active': isActive }"
          @click="navItemDidClick"
          to="/join"
        >
          <ovl-button>Join</ovl-button>
        </router-link>
        <router-link
          class="navbar__item navbar__action"
          :class="{ 'navbar__item--is-active': isActive }"
          @click="navItemDidClick"
          to="/sign-in"
        >
          <ovl-button type="outline">Sign In</ovl-button>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OvlButton from "@/components/atomic/OvlButton.vue";
import HamburgerButton from "@/components/atomic/HamburgerButton.vue";
import { Getter, Action } from "vuex-class";

@Component({
  components: {
    OvlButton,
    HamburgerButton
  }
})
export default class OvlNavbar extends Vue {
  @Getter("auth/authenticated") authenticated!: () => boolean;
  @Action("auth/signOut") signOut!: () => void;
  isActive = false;

  hamburgerButtonDidClick() {
    this.isActive = !this.isActive;
  }

  navItemDidClick() {
    this.isActive = false;
  }
}
</script>

<style scoped>
.navbar {
  display: grid;
  grid-template-areas:
    "navbrand hamburger"
    "items items";
  -webkit-tap-highlight-color: transparent;
}

.navbrand {
  grid-area: navbrand;
  font-family: "Lora", serif;
  font-size: 26px;
  font-weight: bold;
  text-decoration: none;
  color: var(--color-dark);
}

.hamburger-button {
  grid-area: hamburger;
  outline-style: none;
  justify-self: end;
}

.navbar__item-container {
  grid-area: items;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 0;
  opacity: 0;
  visibility: hidden;
}

.navbar__item {
  margin: var(--spacing-xs) 0;
  color: var(--color-dark);
  text-decoration: none;
  opacity: 0;
  visibility: hidden;
}

.navbar__item.router-link-active {
  color: var(--color-highlight);
}

.navbar__item--is-active,
.navbar__item-container--is-active {
  opacity: 100%;
  visibility: visible;
}

.navbar__item-container--is-active {
  height: 100vh;
}

/** Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/** Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .navbar {
    grid-template-areas: "navbrand items";
    align-items: center;
  }

  .navbrand {
    font-size: 32px;
  }

  .hamburger-button {
    display: none;
  }

  .navbar__item-container,
  .navbar__item {
    opacity: 1;
    visibility: visible;
  }

  .navbar__item-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .navbar__item {
    margin: 0 var(--spacing-sm);
  }

  .navbar__action {
    margin: 0 var(--spacing-xs);
  }
}

/** Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/** Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
