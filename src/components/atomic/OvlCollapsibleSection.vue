<template>
  <div>
    <h4
      class="heading-3 ovl-collapsible-section__header"
      @click="sectionHeaderDidClick"
      onselectstart="return false"
    >
      {{ title }}
    </h4>
    <div :class="{ 'ovl-collapsible-section__child--is-hidden': isCollapsed }">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class OvlCollapsibleSection extends Vue {
  @Prop({ required: true }) private title!: string;
  @Prop({ default: false }) private isCollapsed!: boolean;

  sectionHeaderDidClick() {
    this.isCollapsed = !this.isCollapsed;
  }
}
</script>

<style scoped>
.ovl-collapsible-section__header {
  cursor: pointer;
}

.ovl-collapsible-section__child--is-hidden {
  background-color: red;
  display: none;
}
</style>
