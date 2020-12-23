<template>
  <div class="ovl-footer meta" v-html="rawHtmlFooterMessage"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class OvlFooter extends Vue {
  rawHtmlFooterMessage = "Copyright &copy 2020 Overlook Group of Hotels";
}
</script>

<style scoped>
.ovl-footer {
  /* background-color: red; */
  text-align: center;
  color: var(--color-dark-l1);
}
</style>
