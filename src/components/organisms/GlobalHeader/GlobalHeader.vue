<template>
  <div class="global-header">
    <div class="flex-container">
      <div class="flex-row">
        <div class="flex-col col-4">
          <ImageWithText imageType="logo-15"/>
        </div>
        <div class="flex-col col-8">
          <div class="flex flex-sb full-height">
            <div>
              <TabSlider v-if="!hideViewTabs">
                <template slot="tabs-slot">
                  <div class="flex-vc">Week View</div>
                  <div class="flex-vc">Day View</div>
                </template>
              </TabSlider>
            </div>
            <div class="flex flex-vc">
              <div>
                <img src="/img/icons/bell-icon.svg" class="icon icon-20">
              </div>
              <div>
                <Dropdown></Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import ImageWithText from "@/components/molecules/ImageWithText/ImageWithText.vue";
import TabSlider from "@/components/molecules/TabSlider/TabSlider.vue";

import { Dropdown } from "@/components/molecules";

@Component({
  components: {
    ImageWithText,
    TabSlider,
    Dropdown
  }
})
export default class GlobalHeader extends Vue {
  @Prop({ default: false }) public hideViewTabs?: boolean;
}
</script>

<style lang="less" scoped>
@import url("../../../styles/utils.less");
@import url("../../../styles/color.less");

.global-header {
  background-color: @color-white;
  .flex;
  height: 76px;
  border-bottom: 1px solid rgba(0, 31, 67, 0.1);
  box-shadow: 0 -6px 7px 0px rgba(0, 31, 67, 1);
  &__left,
  &__right {
    flex: 1;
  }
}
</style>


