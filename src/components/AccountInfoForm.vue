<template>
  <form @submit.prevent="formWillSubmit" class="account-info-form">
    <ovl-input
      type="text"
      title="First Name"
      v-model="currentUserInfo.first_name"
      :disabled="!isUpdating"
    ></ovl-input>
    <ovl-input
      type="text"
      title="Last Name"
      v-model="currentUserInfo.last_name"
      :disabled="!isUpdating"
    ></ovl-input>
    <ovl-input
      type="email"
      v-model="currentUserInfo.email"
      title="Email"
      :disabled="!isUpdating"
    />
    <ovl-input
      type="text"
      v-model="currentUserInfo.phone_number"
      title="Phone Number"
      placeholder="Not set"
      :disabled="!isUpdating"
    />
    <ovl-input
      type="text"
      v-model="currentUserInfo.street_address"
      title="Address"
      placeholder="Not set"
      :disabled="!isUpdating"
    />
    <ovl-input
      type="text"
      v-model="currentUserInfo.city"
      title="City"
      placeholder="Not set"
      :disabled="!isUpdating"
    />
    <ovl-input
      type="text"
      v-model="currentUserInfo.country"
      title="Country"
      placeholder="Not set"
      :disabled="!isUpdating"
    />
    <div class="account-info-form__action-container">
      <ovl-button
        v-if="isUpdating"
        type="button"
        class="account-info-form__action"
        @click="saveDidClick"
        >Save</ovl-button
      >
      <ovl-button
        v-else
        class="account-info-form__action"
        @click="updateDidClick"
        >Update</ovl-button
      >
      <ovl-button
        v-if="isUpdating"
        type="button"
        class="account-info-form__action"
        @click="cancelDidClick"
        design="outline"
        >Cancel</ovl-button
      >
      <ovl-button
        v-else
        type="button"
        class="account-info-form__action"
        design="outline"
        @click="changePasswordDidClick"
        >Change password</ovl-button
      >
    </div>
  </form>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { Getter, Action } from "vuex-class";
import OvlInput from "@/components/atomic/OvlInput.vue";
import OvlButton from "@/components/atomic/OvlButton.vue";

@Component({ components: { OvlInput, OvlButton } })
export default class AccountInfoForm extends Vue {
  @Getter("auth/user") user!: () => User;
  @Action("auth/updateUser") updateUser!: (user: any) => void;

  isUpdating = false;
  currentUserInfo: any = {};

  created() {
    this.setCurrentUserInfo();
    console.log(this.user);
  }

  setCurrentUserInfo() {
    this.currentUserInfo = { ...this.user };
  }

  formWillSubmit() {
    console.log("formWillSubmit");
    const changedFields: any = {};
    const user: any = this.user;
    for (const key in this.currentUserInfo) {
      if (this.currentUserInfo[key] !== user[key]) {
        changedFields[key] = this.currentUserInfo[key];
      }
    }

    if (
      Object.keys(changedFields).length !== 0 ||
      changedFields.constructor !== Object
    ) {
      axios.post("/profile/update", changedFields).then(() => {
        this.updateUser(this.currentUserInfo);
      });
    }
  }

  updateDidClick() {
    this.isUpdating = true;
  }

  saveDidClick() {
    this.isUpdating = false;
  }

  cancelDidClick() {
    this.setCurrentUserInfo();
    this.isUpdating = false;
  }

  changePasswordDidClick() {
    this.$router.push("/account/change-password");
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
