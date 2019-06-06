<template>
  <div class="image-with-text">
    <div class="image-with-text__image flex-vc ">
      <ImageOrLogo :imageType="imageType"/>
    </div>
    <div class="image-with-text__text flex-vc">timesheets</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import ImageOrLogo from "@/components/atoms/ImageOrLogo.vue";

@Component({
  components: {
    ImageOrLogo
  }
})
export default class ImageWithText extends Vue {
  @Prop({ default: 'auto'}) public imageType?: string;
}
</script>

<style lang="less" scoped>
.image-with-text {
  display: flex;
  height: 100%;
  &__text {
    margin-left: 10px;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 1px;
    font-weight: 100;
  }
}
</style>


