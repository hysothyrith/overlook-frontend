<template>
  <div id="app">
    <ovl-navbar class="navbar" />
    <router-view class="router-view" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OvlNavbar from "@/components/OvlNavbar.vue";

@Component({
  components: {
    OvlNavbar,
  },
})
export default class Home extends Vue {}
</script>

<style>
#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  color: var(--color-dark);
}

.navbar {
  margin: var(--spacing-md);
}

@media (min-width: 768px) {
  #app {
    max-width: 1200px;
  }

  .navbar {
    margin: var(--spacing-lg);
  }
}
</style>
