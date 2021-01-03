<template>
  <div class="ovl-grid">
    <div class="ovl-image-wrapper--full-width">
      <img
        class="ovl-image--cover"
        src="https://source.unsplash.com/random"
        alt="Test"
      />
    </div>
    <div class="ovl-grid__body">
      <div class="type--preheader">Join Overlook</div>
      <h2 class="type--heading-1">Register</h2>
      <form
        @submit.prevent="
          register({
            ...form,
            first_name: form.firstName,
            last_name: form.lastName
          })
        "
      >
        <ovl-input
          type="text"
          title="First Name"
          placeholder="John"
          v-model="form.firstName"
        />
        <ovl-input
          type="text"
          title="Last Name"
          placeholder="Smith"
          name="last-name"
          v-model="form.lastName"
        />
        <ovl-input
          type="email"
          title="Email"
          name="email"
          v-model="form.email"
        />
        <ovl-input
          type="password"
          title="Password"
          name="password"
          v-model="form.password"
        />
        <!-- <ovl-input
          type="password"
          title="Re-enter Password"
          v-model="form.passwordConfirmation"
        /> -->
        <div>Already part of Overlook? <a href="">Sign In</a></div>
        <ovl-button class="register-button">Register</ovl-button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OvlInput from "@/components/atomic/OvlInput.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";
import { Action } from "vuex-class";
import "@/interfaces/Registration.ts";

@Component({
  components: {
    OvlInput,
    OvlButton
  }
})
export default class Join extends Vue {
  @Action("auth/register") register!: (form: Registration) => void;
  form = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };
}
</script>
<style scoped>
.register-button {
  margin-top: var(--spacing-lg);
}
</style>
