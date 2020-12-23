<template>
  <div class="ovl-input-container">
    <div class="ovl-input__title caption">
      <label :for="id">{{ title }}</label>
    </div>
    <select
      v-if="type === 'select'"
      :id="id"
      class="ovl-input"
      @input="$emit('input', $event.target.value)"
    >
      <slot></slot>
    </select>
    <input
      v-if="type !== 'select'"
      class="ovl-input"
      :id="id"
      v-bind="{ ...$props, ...$attrs }"
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
.ovl-input__title {
  margin-left: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
  margin-top: var(--spacing-md);
  font-weight: 500;
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
