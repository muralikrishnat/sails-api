<template>
  <div class="tab-slider" ref="tabSlider">
    <div class="tab-slider__items slider-items" ref="tabSliderTabs">
      <slot name="tabs-slot">
        
      </slot>
    </div>
    <div class="tab-slider__active-bar" :style="activeBarStyle"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class TabSlider extends Vue {
  @Prop({ default: 0 }) public activeIndex: number = 0;

  public tabIndex: number = 0;
  public tabSliderTabs?: HTMLElement;
  public activeBarStyle: any = {
    left: '0',
    width: '0'
  };


  public mounted() {
    this.tabSliderTabs = this.$refs.tabSliderTabs as HTMLElement;
    Array.from(this.tabSliderTabs.children).forEach((elem, index) => {
      this.tabIndex = this.activeIndex;
      if (this.activeIndex === index) {
        elem.classList.add("active");
        this.setActiveBar(elem);
      }
      elem.addEventListener("click", () => {
        this.setActive(elem, index);
      });
    });
  }

  private setActive(elem, index) {
    if (this.tabSliderTabs) {
      this.tabIndex = index;
      const activeElem = this.tabSliderTabs.querySelector(".active");
      if (activeElem) {
        activeElem.classList.remove("active");
      }
      this.setActiveBar(elem);
      elem.classList.add("active");
    }
  }

  private setActiveBar(activeElem) {
    const width = getComputedStyle(activeElem, null).width;
    this.activeBarStyle.left = activeElem.offsetLeft + 'px';
    this.activeBarStyle.width = width;
  }
}
</script>

<style lang="less" scoped>
@import url("../../../styles/color.less");
@import url("../../../styles/utils.less");
.tab-slider {
  display: flex;
  height: 100%;
  color: @color-tab-text;
  position: relative;
  .slider-items {
    display: flex;
    > div {
      font-size: 16px;
      font-weight: 100;
      cursor: pointer;
      &:nth-child(2) {
        margin-left: @gutter-width;
      }
      &.active {
        font-weight: bold;
        color: @color-tab-active;
      }
    }
  }
  &__active-bar {
    position: absolute;
    bottom: 0;
    height: 4px;
    background-color: @color-tab-active;
    transition: left 0.2s linear, width 0.4s linear;
  }
}
</style>


