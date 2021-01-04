<template>
  <div class="account">
    <div class="type--preheader">Your Overlook Account</div>
    <h2 class="type--heading-1">{{ user.first_name }} {{ user.last_name }}</h2>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class Account extends Vue {
  @Getter("auth/user") user!: () => User;
}
</script>

<style scoped>
.account {
  padding: var(--spacing-md);
}
</style>
