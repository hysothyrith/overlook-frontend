<template>
  <div>
    <h4
      class="type--heading-3 ovl-collapsible-section__header"
      @click="sectionHeaderDidClick"
      onselectstart="return false"
    >
      <div class="header__wrapper">
        {{ title }}
        <i
          class="gg-chevron-right"
          :class="{ 'gg-chevron-right--is-opened': !isCollapsed }"
        ></i>
      </div>
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
  @Prop({ default: false }) private collapseByDefault!: boolean;
  isCollapsed = false;

  created() {
    if (this.collapseByDefault) this.isCollapsed = true;
  }

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
  display: none;
}

.header__wrapper {
  display: flex;
  align-items: center;
}

.gg-chevron-right {
  margin-top: 4px;
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 22px;
  border: 2px solid transparent;
  border-radius: 100px;
  transition-duration: 0.2s;
  transition-property: transform;
}
.gg-chevron-right::after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid;
  border-right: 2px solid;
  transform: rotate(-45deg);
  right: 6px;
  top: 4px;
}

.gg-chevron-right--is-opened {
  transform: rotate(90deg);
}
</style>
