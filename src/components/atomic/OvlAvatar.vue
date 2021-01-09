<template>
  <div
    v-if="allowChange || user.image"
    @click="didClick"
    :class="{ 'ovl-avatar--is-changeable': allowChange }"
    style="margin: var(--spacing-md) 0;"
  >
    <div class="avatar__preview-wrapper">
      <div v-if="allowChange" class="avatar__picker-icon-wrapper">
        <i class="gg-image"></i>
      </div>
      <img
        v-if="previewImage || user.image"
        class="avatar__preview"
        :src="previewImage || user.image"
      />
    </div>
    <input
      style="display: none;"
      type="file"
      accept="image/*"
      ref="avatarUploader"
      @change="uploadImage($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import axios from "axios";

@Component
export default class OvlAvatar extends Vue {
  @Prop({ default: false }) private readonly allowChange!: boolean;
  @Getter("auth/user") user!: () => User;
  @Action("auth/updateUser") updateUser!: (user: any) => void;
  previewImage: string | null = null;

  didClick() {
    if (!this.allowChange) return;
    const avatarUploader = this.$refs.avatarUploader as HTMLInputElement;
    avatarUploader.click();
  }

  uploadImage(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const image = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = event => {
        if (typeof event.target?.result === "string")
          this.previewImage = event.target.result;
        axios
          .post("/profile/update/avatar", { image: this.previewImage })
          .then(() => {
            this.updateUser({ ...this.user, image: this.previewImage });
            this.$notify({
              group: "ovl-notification-center",
              type: "success",
              title: "New avatar set successfully",
              text: "Thank you for keeping us updated."
            });
          });
      };
    }
  }
}
</script>

<style scoped>
.ovl-avatar--is-changeable {
  cursor: pointer;
}

.avatar__preview-wrapper {
  background-color: var(--color-dark);
  width: 100px;
  height: 100px;
  border-radius: 35%;
  position: relative;
}

.avatar__preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 35%;
  position: absolute;
}

.avatar__preview--is-empty {
  display: none;
}

.avatar__picker-icon-wrapper {
  color: var(--color-light);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease-out;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.avatar__picker-icon-wrapper:hover {
  opacity: 100%;
}

.gg-image {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 20px;
  height: 16px;
  overflow: hidden;
  box-shadow: 0 0 0 2px;
  border-radius: 2px;
}
.gg-image::after,
.gg-image::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  border: 2px solid;
}
.gg-image::after {
  transform: rotate(45deg);
  border-radius: 3px;
  width: 16px;
  height: 16px;
  top: 9px;
  left: 6px;
}
.gg-image::before {
  width: 6px;
  height: 6px;
  border-radius: 100%;
  top: 2px;
  left: 2px;
}
</style>
