<template>
  <div class="ovl-grid">
    <div class="ovl-image-wrapper--full-width cover-image">
      <img
        class="ovl-image--cover"
        src="https://images.unsplash.com/photo-1538964173425-93884d739596?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"
        alt="Beach image"
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
        <div class="type--meta" style="margin-top: var(--spacing-sm);">
          Already part of Overlook?
          <a
            @click="$router.push('/sign-in')"
            style="color: var(--color-highlight);"
            >Sign In</a
          >
        </div>
        <ovl-button class="register-button">Register</ovl-button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { Component, Vue } from "vue-property-decorator";
import OvlInput from "@/components/atomic/OvlInput.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";
import { Action } from "vuex-class";
// import "@/interfaces/Registration.ts";

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
