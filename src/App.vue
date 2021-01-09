<template>
  <div id="app">
    <ovl-navbar class="navbar" />
    <router-view class="router-view" />
    <notifications
      group="ovl-notification-center"
      position="top center"
      width="100%"
      classes="ovl-notification-style"
    />
    <!-- <ovl-footer class="footer" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OvlNavbar from "@/components/OvlNavbar.vue";
import OvlFooter from "@/components/OvlFooter.vue";

@Component({
  components: {
    OvlNavbar,
    OvlFooter
  }
})
export default class Home extends Vue {}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
}

.navbar {
  margin: var(--spacing-md);
}

.footer {
  margin: var(--spacing-xl) var(--spacing-md) var(--spacing-md)
    var(--spacing-md);
}

.ovl-notification-style {
  color: var(--color-light);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-dark);
}

.ovl-notification-style .notification-title,
.ovl-notification-style .notification-content {
  font-size: 16px;
  line-height: 160%;
}

.ovl-notification-style.success {
  background: var(--color-highlight);
}

.ovl-notification-style.error {
  background: var(--color-negative);
}

@media (min-width: 768px) {
  #app {
    max-width: 1200px;
  }

  .navbar {
    margin: var(--spacing-lg);
  }

  .footer {
    max-width: 100%;
  }
}
</style>
