<template>
  <div class="account">
    <div class="ovl-flex-spread" style="margin-bottom: var(--spacing-lg);">
      <div>
        <div class="type--preheader">
          Your Overlook Account
        </div>
        <h2 class="type--heading-1" style="margin: 0;">
          {{ user.first_name }} {{ user.last_name }}
        </h2>
      </div>
      <ovl-avatar :allowEdit="true" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import OvlAvatar from "@/components/atomic/OvlAvatar.vue";

@Component({ components: { OvlAvatar } })
export default class Account extends Vue {
  @Getter("auth/user") user!: () => User;
}
</script>

<style scoped>
.account {
  padding: var(--spacing-md);
}
</style>
