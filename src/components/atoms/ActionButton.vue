<template>
  <button
    class="button"
    :class="ButtonStyle"
    type="button"
    :disabled="isDisabled"
    @focusout="$emit('focusout')"
    @click="$emit('click')"
  >
    <div class="button__wrapper">
      <div class="button__icon">
        <slot name="button-icon"></slot>
      </div>
      <div class="button__text">
        <slot name="button-text-slot"></slot>
      </div>
      <div class="button__icon-right">
        <slot name="button-icon-right"></slot>
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class ActionButton extends Vue {
  @Prop({}) buttonStyle: string;
  @Prop() iconPlacement: string;
  @Prop() cssClass: string;
  @Prop({ default: false }) isDisabled: boolean;

  get ButtonStyle() {
    return [
      this.cssClass,
      this.buttonStyle,
      this.iconPlacement ? "icon-" + this.iconPlacement : ""
    ].join(" ");
  }
}
</script>

<style lang="less">
@import url("../../styles/utils.less");
@import url("../../styles/color.less");
.button {
  font-size: 14px;
  color: @color-button-color;
  font-weight: 100;
  line-height: 19px;
  padding: 9px 14px;
  border: 1px solid @color-button-color;
  border-radius: 2px;
  box-shadow: 0 0 2px @color-button-color;
  cursor: pointer;
  @p: .button;
  &__wrapper {
    display: flex;
    position: relative;
  }
  &__icon {
    position: absolute;
    &-right {
      display: flex;
      align-items: center;
      justify-content: center;
      &:not(:empty) {
        margin-left: 5px;
      }
    }
  }
  &__text {
    .font-Nunito();
    flex: 1 1 auto;
  }

  &.primary {
    background-color: @color-tab-active;
    color: @color-white;
  }
  &.secondary {
    color: @color-logo-text;
    font-size: 13px;
    line-height: 18px;
  }
  &.full-width {
    width: 100%;
    @{p}__text {
      text-align: center;
      flex: 1 0 auto;
    }
  }
  &.icon-left {
    @{p}__icon {
      line-height: 13px;
      font-size: 28px;
    }
    @{p}__text {
      margin-left: 24px;
    }
  }
  &[disabled] {
    cursor: not-allowed;
    background-color: @color-tab-text;
    border-color: @color-tab-text;
    box-shadow: 0 0 1px 0px @color-tab-text;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 1px 1px @color-button-color;
  }
}
</style>

