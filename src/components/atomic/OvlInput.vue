<template>
  <div class="ovl-input-container">
    <label class="type--label ovl-input__label" :for="id">{{ title }}</label>
    <select
      v-if="type === 'select'"
      :id="id"
      class="ovl-input"
      v-bind="{ ...$props, ...$attrs }"
      @change="$emit('change')"
      @input="$emit('input', $event.target.value)"
    >
      <slot></slot>
    </select>
    <input
      v-if="type !== 'select'"
      class="ovl-input"
      :id="id"
      v-bind="{ ...$props, ...$attrs }"
      @change="$emit('change')"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class OvlInput extends Vue {
  @Prop({ required: true }) private title!: string;
  @Prop({ required: true }) private type!: string;

  get id() {
    return this.title.replace(/\s+/g, "-").toLowerCase();
  }
}
</script>

<style scoped>
.ovl-input__label {
  display: block;
  margin: var(--spacing-md) var(--spacing-xs) var(--spacing-sm);
}

.ovl-input {
  color: var(--color-dark);
  width: 100%;
  border-radius: 0;
  border: 1px solid var(--color-dark-l2);
  padding: var(--spacing-sm);
  box-sizing: border-box;
  outline: none;
}
</style>
