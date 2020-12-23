<template>
  <div class="home">
    <Spotlight />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Spotlight from "@/components/Spotlight.vue";

@Component({ components: { Spotlight } })
export default class Home extends Vue {}
</script>
