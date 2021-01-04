<template>
  <div class="ovl-grid">
    <div class="ovl-image-wrapper--full-width cover-image">
      <img
        class="ovl-image--cover"
        src="https://images.unsplash.com/photo-1603561128570-224a45ebc081?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
        alt="Christmas Tree"
      />
    </div>
    <div class="ovl-grid__body">
      <div class="type--preheader">Welcome Back</div>
      <h2 class="type--heading-1">Sign In</h2>
      <form @submit.prevent="signIn(form)">
        <ovl-input
          type="email"
          title="Email"
          v-model="form.email"
          placeholder="john@smith.com"
        />
        <ovl-input type="password" v-model="form.password" title="Password" />
        <div class="type--meta" style="margin-top: var(--spacing-sm);">
          New to Overlook?
          <a
            @click="$router.push('/join')"
            style="color: var(--color-highlight);"
            >Join</a
          >
        </div>
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
