<template>
  <div class="content-modal" :class="modalClass">
    <div class="content-modal__backdrop"></div>
    <div class="content-modal__box">
      <div class="content-modal__box-content">
        <slot name="content-box"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class ContentModal extends Vue {
  @Prop() show: boolean;
  @Prop() cssClass: string;

  get modalClass() {
    return [
      (this.show ? 'content-modal--show' : ''),
      this.cssClass
    ].join(' ');
  }
}
</script>

<style lang="less">
@import url("../../../styles/utils.less");
@import url("../../../styles/color.less");

.content-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;
  z-index: 160;
  display: none;
  @p: .content-modal;
  &__backdrop {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: @color-modal-bg;
    opacity: 0;
    transition: opacity .5s linear;
  }
  &__box {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;

    &-content {
      background-color: @color-white;
      z-index: 161;
      padding: 34px 55px 50px;
      border: 1px solid @color-modal-border;
      border-radius: 2px;
      width: 400px;

      transform: scale(.3);
      transition: transform .5s linear;
      .content-box-text {
        font-weight: 400;
        font-size: 24px;
        text-align: center;
        color: @color-logo-text;
        line-height: 36px;
        margin-bottom: 24px;
      }
      .content-box-controls {
        display: flex;
        justify-content: center;
        .button {
          width: 124px;
          &__wrapper {
            justify-content: center;
          }
        }
      }
    }
  }

  &--show {
    display: block;
    @{p}__backdrop {
      opacity: 1;
    }
    @{p}__box {
      &-content {
        transform: none;
      }
    }
  }
}
</style>


