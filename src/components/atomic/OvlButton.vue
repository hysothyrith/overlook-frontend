<template>
  <button class="ovl-button  solid" :class="{ outline: type === 'outline' }">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class OvlButton extends Vue {
  @Prop() private type!: string;
}
</script>

<style scoped>
.ovl-button {
  border: 1px solid var(--color-dark);
  padding: 8px 16px;
  cursor: pointer;
  outline: none;
}

.solid {
  color: var(--color-light);
  background-color: var(--color-dark);
}

.solid:hover {
  background-color: var(--color-dark-d1);
}

.outline {
  color: var(--color-dark);
  background-color: var(--color-light);
}

.outline:hover {
  background-color: var(--color-light-d1);
}
</style>
