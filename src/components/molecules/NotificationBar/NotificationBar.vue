<template>
    <div class="notification-bar" :class="cssClass">
        <div class="notification-bar__icon" v-if="showIcon">
            <!-- <img src="/img/icons/notification-success-tick.svg" class="icon" /> -->
            <slot name="left-icon"></slot>
        </div>
        <div class="notification-bar__text">
            <slot name="text"></slot>
        </div>
        <div class="notification-bar__close" v-if="showClose">
            <!-- X -->
            <slot name="right-icon"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class NotificationBar extends Vue {
  @Prop({ default: true }) showIcon: boolean;
  @Prop({ default: true }) showClose: boolean;
  @Prop() displayStyle: string;

  get cssClass() {
      return this.displayStyle || '';
  }
}
</script>

<style lang="less">
@import url("../../../styles/utils.less");
@import url("../../../styles/color.less");
.notification-bar {
    display: flex;
    padding: 12px 16px;
    border: 1px solid @color-disable-color;
    border-radius: 2px;
    @p: .notification-bar;
    &__icon {
        flex: 0 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
            max-height: 16px;
            max-width: 16px;
            &.icon-20 {
                max-height: 20px;
                max-width: 20px;
            }
        }
        margin-right: 14px;
    }
    &__text {
        flex: 1 1 auto;
    }
    &__close {
        flex: 0 0 20px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    &.green {
        color: @color-notification-green;
        border: 1px solid @color-notification-green;
        background-color: @color-notification-bg;
    }
    &.blue {
        color: @color-tab-active;
        border: 1px solid @color-notification-blue;
        background-color: @color-notification-blue-bg;
    }
    &.orange {
        color: @color-orange;
        border: 1px solid @color-notification-orange;
        background-color: @color-notification-orange-bg;
    }

    // transition: transform 2s linear;
}
</style>



