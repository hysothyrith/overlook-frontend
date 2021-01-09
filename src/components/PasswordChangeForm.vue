<template>
  <form @submit.prevent="formWillSubmit" class="account-info-form">
    <ovl-input
      type="password"
      title="Old Password"
      v-model="form.old_password"
    />
    <ovl-input
      type="password"
      title="New Password"
      v-model="form.new_password"
    />
    <ovl-input
      type="password"
      title="Confirm New Password"
      v-model="form.confirm_new_password"
    />

    <div class="account-info-form__action-container">
      <ovl-button class="account-info-form__action">Save</ovl-button>
      <ovl-button
        type="button"
        class="account-info-form__action"
        @click="cancelDidClick"
        design="outline"
        >Cancel</ovl-button
      >
    </div>
  </form>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { Getter } from "vuex-class";
import OvlInput from "@/components/atomic/OvlInput.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";

@Component({ components: { OvlInput, OvlButton } })
export default class AccountInfoForm extends Vue {
  @Getter("auth/user") user!: () => User;
  form = {
    old_password: "",
    new_password: "",
    confirm_new_password: ""
  };

  formWillSubmit() {
    if (this.form.new_password === this.form.old_password) {
      this.$notify({
        group: "ovl-notification-center",
        title: "Sorry, there was an error",
        type: "error",
        text: "Your new password cannot be the same as your old password."
      });
      return;
    }
    if (this.form.new_password !== this.form.confirm_new_password) {
      this.$notify({
        group: "ovl-notification-center",
        title: "Sorry, there was an error",
        type: "error",
        text: "Your new password and its confirmation don't match."
      });
      return;
    }
    axios.post("/profile/update/password", this.form).then(response => {
      console.log(response.data);
      if (response.data.success) {
        this.$notify({
          group: "ovl-notification-center",
          title: "Congratulations",
          type: "success",
          text: "Your new password at Overlook is successfully set."
        });
        this.$router.back();
      } else {
        this.$notify({
          group: "ovl-notification-center",
          title: "Sorry, there was an error",
          type: "error",
          text: "Your password didn't match our record. Please try again."
        });
        this.form.old_password = "";
        this.form.new_password = "";
        this.form.confirm_new_password = "";
      }
    });
  }

  cancelDidClick() {
    this.$router.back();
  }
}
</script>

<style scoped>
.account-info-form {
  display: grid;
}

.account-info-form__action-container {
  margin-top: var(--spacing-lg);
}

.account-info-form__action {
  margin-right: var(--spacing-sm);
}
</style>
