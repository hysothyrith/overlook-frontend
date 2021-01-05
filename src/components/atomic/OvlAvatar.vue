<template>
  <div
    class="ovl-avatar"
    @click="didClick"
    :class="{ 'ovl-avatar--is-editable': allowEdit }"
  >
    <div class="avatar__preview-wrapper">
      <img class="avatar__preview" :src="previewImage" />
    </div>
    <input
      class="avatar__uploader"
      type="file"
      accept="image/*"
      ref="avatarUploader"
      @change="uploadImage($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class OvlAvatar extends Vue {
  @Prop({ default: false }) private readonly allowEdit!: boolean;
  previewImage = null;

  didClick() {
    if (!this.allowEdit) return;

    this.$refs.avatarUploader.click();
  }

  uploadImage(e: any) {
    // alert("hello");
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      this.previewImage = e.target.result;
      console.log(this.previewImage);
      // axios
      //   .post("/profile/update/avatar", { image: this.previewImage })
      //   .then(response => {
      //     console.log(response.data);
      //   });
    };
  }
}
</script>

<style scoped>
.ovl-avatar {
  background-color: aquamarine;
}

.ovl-avatar--is-editable {
  cursor: pointer;
}

.avatar__preview-wrapper {
  width: 100px;
  height: 100px;
  /* border-radius: 50px; */
}

.avatar__preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar__uploader {
  display: none;
}
</style>
