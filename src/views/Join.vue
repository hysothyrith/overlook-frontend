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
      <form @submit="registrationFormWillSubmit">
        <ovl-input
          type="text"
          title="First Name"
          placeholder="John"
          name="first-name"
        />
        <ovl-input
          type="text"
          title="Last Name"
          placeholder="Smith"
          name="last-name"
        />
        <ovl-input type="email" title="Email" name="email" />
        <ovl-input type="password" title="Password" name="password" />
        <ovl-input
          type="password"
          title="Re-enter Password"
          name="password-confirmation"
        />
        <ovl-button class="register-button">Register</ovl-button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import OvlInput from "@/components/atomic/OvlInput.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";

@Component({
  components: {
    OvlInput,
    OvlButton,
  },
})
export default class Join extends Vue {
  registrationFormWillSubmit() {
    console.log();
  }
}
</script>
<style scoped>
.register-button {
  margin-top: var(--spacing-lg);
}
</style>
