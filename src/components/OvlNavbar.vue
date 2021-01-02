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
    >
      <router-link
        class="navbar__item type--action"
        :class="{ 'navbar__item--is-active': isActive }"
        @click.native="navItemDidClick"
        to="/"
        exact
        >Home</router-link
      >
      <router-link
        class="navbar__item type--action"
        :class="{ 'navbar__item--is-active': isActive }"
        @click.native="navItemDidClick"
        to="/about-us"
        >About us</router-link
      >
      <router-link
        class="navbar__item type--action"
        :class="{ 'navbar__item--is-active': isActive }"
        @click.native="navItemDidClick"
        to="/hotels"
        >Hotels</router-link
      >
      <router-link
        class="navbar__item type--action"
        :class="{ 'navbar__item--is-active': isActive }"
        @click.native="navItemDidClick"
        to="/book"
        >Book</router-link
      >
      <router-link
        class="navbar__item type--action"
        :class="{ 'navbar__item--is-active': isActive }"
        @click.native="navItemDidClick"
        to="/contact-us"
        >Contact us</router-link
      >

      <template v-if="authenticated">
        <div
          class="navbar__item type--action dropdown-navbar-item"
          :class="{ 'navbar__item--is-active': isActive }"
          @click="accountDidClick"
        >
          <div class="dropdown-navbar-item__title">
            <span>Account</span>
            <i class="gg-chevron-down"></i>
          </div>
          <div
            class="dropdown-navbar-item__container"
            :class="{
              'dropdown-navbar-item__container--is-hidden': !accountIsExpanded
            }"
          >
            <router-link
              class="navbar__dropdown-item"
              @click="navItemDidClick"
              to="/bookings"
            >
              Bookings
            </router-link>
            <router-link
              class="navbar__dropdown-item"
              @click="navItemDidClick"
              to="/account"
            >
              Account information
            </router-link>
            <span class="navbar__dropdown-item" @click="signOut">
              Sign out
            </span>
          </div>
        </div>
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
  accountIsExpanded = false;

  hamburgerButtonDidClick() {
    this.isActive = !this.isActive;
  }

  navItemDidClick() {
    this.isActive = false;
    this.accountIsExpanded = false;
  }

  accountDidClick() {
    this.accountIsExpanded = !this.accountIsExpanded;
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

.navbar__item.router-link-active,
.navbar__dropdown-item.router-link-active {
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

.dropdown-navbar-item__title {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
}

.dropdown-navbar-item__container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.dropdown-navbar-item__container--is-hidden {
  display: none;
}

.navbar__dropdown-item {
  color: var(--color-dark);
  cursor: pointer;
  margin-top: var(--spacing-sm);
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

  .dropdown-navbar-item__title {
    flex-direction: row;
    align-items: flex-start;
  }

  .dropdown-navbar-item__container {
    position: absolute;
    align-items: flex-start;
  }

  .navbar__dropdown-item {
    margin-top: var(--spacing-md);
  }
}

/** Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/** Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
