<template>
  <div class="image-cmp flex-vc">
    <img src="/img/tadigital_logo.svg" :class="imageClass">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class ImageOrLogo extends Vue {
  @Prop({ default: 'auto'}) public imageType?: string;

  public get imageClass() {
    return this.imageType;
  }
}
</script>

<style lang="less" scoped>
.image-cmp {
  height: 100%;
  img {
    max-height: 100%;
    &.logo-15 {
        height: 15px;
    }
  }
}
</style>

