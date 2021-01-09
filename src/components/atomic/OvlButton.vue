<template>
  <button
    class="ovl-button  solid"
    :class="{ outline: design === 'outline' }"
    :type="type"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class OvlButton extends Vue {
  @Prop() private design!: string;
  @Prop({ default: "submit" }) private type!: string;
}
</script>

<style scoped>
.ovl-button {
  border: 1px solid var(--color-dark);
  padding: 8px 16px;
  cursor: pointer;
  outline: none;
}

.ovl-button:disabled,
.ovl-button:disabled:hover {
  background-color: var(--color-dark-l2);
  border-color: var(--color-dark-l2);
  color: var(--color-dark-l1);
}

.ovl-button:disabled:hover {
  cursor: default;
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
