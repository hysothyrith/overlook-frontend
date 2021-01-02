<template>
  <div class="room-info">
    <div class="type--preheader">The Grand Overlook</div>
    <h2 class="type--heading-1">King's Court</h2>
    <div class="type--body">
      Lasted my coming uneasy marked so should. Gravity letters it amongst
      herself dearest an windows by.
    </div>
    <div class="room-info__action-container">
      <ovl-button>Book now</ovl-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OvlButton from "@/components/atomic/OvlButton.vue";

@Component({ components: { OvlButton } })
export default class RoomInfo extends Vue {}
</script>

<style scoped>
.room-info__action-container {
  margin-top: var(--spacing-md);
}
</style>
