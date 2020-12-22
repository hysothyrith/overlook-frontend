<template>
  <div class="ovl-grid">
    <div class="decorative-image__wrapper">
      <img
        class="decorative-image"
        src="https://source.unsplash.com/random"
        alt="Test"
      />
    </div>
    <div class="ovl-grid__body">
      <div class="caption caption--pretitle">Join Overlook</div>
      <h2 class="heading-1">Register</h2>
      <form action="" method="POST">
        <ovl-input type="text" title="First Name" placeholder="John" />
        <ovl-input type="text" title="Last Name" placeholder="Smith" />
        <ovl-input type="email" title="Email" />
        <ovl-input type="password" title="Password" />
        <ovl-input type="password" title="Re-enter Password" />
        <ovl-button class="register-button">Register</ovl-button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OvlInput from "@/components/atomic/OvlInput.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";

@Component({
  components: {
    OvlInput,
    OvlButton,
  },
})
export default class Join extends Vue {}
</script>

<style scoped>
.decorative-image__wrapper {
  width: 100%;
}

.decorative-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.register-button {
  margin-top: var(--spacing-lg);
}
</style>
