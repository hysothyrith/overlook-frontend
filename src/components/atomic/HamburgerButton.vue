<template>
  <button
    class="hamburger hamburger--spring"
    type="button"
    :class="{ 'is-active': isActive }"
    @click="$emit('click')"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "@/assets/css/hamburgers.css";

@Component
export default class HamburgerButton extends Vue {
  @Prop({ required: true }) isActive!: boolean;
}
</script>
