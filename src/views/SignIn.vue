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
      <div class="caption caption--pretitle">Welcome Back</div>
      <h2 class="heading-1">Sign In</h2>
      <form @submit.prevent="signIn(form)">
        <ovl-input
          type="email"
          title="Email"
          v-model="form.email"
          placeholder="john@smith.com"
        />
        <ovl-input type="password" v-model="form.password" title="Password" />
        <div>New to Overlook? <a href="">Join</a></div>
        <ovl-button class="register-button">Sign In</ovl-button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OvlInput from "@/components/atomic/OvlInput.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";
import { Action } from "vuex-class";

@Component({
  components: {
    OvlInput,
    OvlButton
  }
})
export default class SignIn extends Vue {
  @Action("auth/signIn")
  signIn!: (form: SignInCredential) => void;

  form: SignInCredential = {
    email: "elyse07@example.org",
    password: "password"
  };
}
</script>

<style scoped>
.register-button {
  margin-top: var(--spacing-lg);
}
</style>
