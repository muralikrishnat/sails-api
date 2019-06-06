<template>
  <div class="time-notes" :class="timeCssClass" ref="timeNotesRef">
    <TextInput
      :onlyNumbers="true"
      @focus="handleFocus"
      :placeholder="'0:00'"
      :defaultValue="timeValue"
      @keyup="handleTimeChange"
      :numberFormat="'00:00'"
      :cssClass="isActive ? 'active' : ''"
    ></TextInput>
    <div class="t-popup" :class="popupClass">
      <div class="t-popup__title">Time &amp; Notes</div>
      <div class="t-popup__content p-content">
        <div class="p-content__time m-5-top">
          <TextInput
            :onlyNumbers="true"
            :defaultValue="timeValue"
            @keyup="handleTimeChange"
            :numberFormat="'00:00'"
            :placeholder="'0:00'"
          ></TextInput>
        </div>
        <div class="p-content__notes m-5-top">
          <TextInput :inputType="'textarea'" :cssClass="'full-height'"></TextInput>
        </div>
      </div>
      <div class="t-popup__footer m-3-top">
        <ActionButton
          buttonStyle="secondary"
          @click="isActive = false;"
          @focusout="isActive = false;"
        >
          <template slot="button-text-slot">Cancel</template>
        </ActionButton>

        <ActionButton
          buttonStyle="primary"
          @click="isActive = false;"
          :isDisabled="true"
          :cssClass="'m-3-left'"
        >
          <template slot="button-text-slot">Save</template>
        </ActionButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { TextInput, ActionButton } from "../../atoms";
import { util } from "../../../services/util.service";

@Component({
  components: {
    TextInput,
    ActionButton
  }
})
export default class TimeAndNotes extends Vue {
  isActive: boolean = false;
  isRight: boolean = false;
  isBottom: boolean = false;
  timeValue: string = "";

  get timeCssClass() {
    return [this.isActive ? "active" : ""].join(" ");
  }
  get popupClass() {
    return [this.isRight ? "right" : "", this.isBottom ? "bottom" : ""].join(
      " "
    );
  }

  destroyed() {
    document.removeEventListener("click", this.outSideClick);
  }

  setPopupPosition(event) {
    const target = event.target;
    if (target) {
      const bounds = target.getBoundingClientRect();
      if (!(bounds.x + 400 < window.innerWidth)) {
        this.isRight = true;
      }
      if (bounds.top > 300) {
        this.isBottom = true;
      }
    }
  }

  handleFocus(event) {
    this.isActive = true;
    document.addEventListener("click", this.outSideClick);
    this.setPopupPosition(event);
    window.addEventListener("scroll", () => {
      this.setPopupPosition(event);
    });
  }

  outSideClick(event) {
    const timeNotesRef = this.$refs.timeNotesRef as HTMLElement;
    if (timeNotesRef) {
      if (!util.isDescendant(timeNotesRef, event.target)) {
        this.isActive = false;
        document.removeEventListener("click", this.outSideClick);
      }
    }
  }

  handleTimeChange(event) {
    this.timeValue = event.value;
  }
}
</script>

<style lang="less">
@import url("../../../styles/color.less");
@import url("../../../styles/utils.less");

.time-notes {
  position: relative;
  .t-popup {
    padding: 20px;
    position: absolute;
    width: 364px;
    z-index: 100;
    background-color: @color-white;
    box-shadow: 0 2px 12px @color-time-popup-bg;
    display: none;
    margin-top: 15px;

    &:after {
      content: " ";
      position: absolute;
      top: -10px;
      background-color: transparent;
      padding: 0px;
      border: 10px solid @color-white;
      border-bottom-color: transparent;
      border-right-color: transparent;
      transform: rotate(45deg);
      box-shadow: -4px -7px 10px -1px @color-time-popup-bg;
    }

    &.right {
      right: 0;
      &:after {
        right: 30px;
      }
    }
    &.bottom {
      bottom: 50px;
      box-shadow: 0 -2px 12px @color-time-popup-bg;
      margin-top: 0;
      margin-bottom: 15px;

      &:after {
        top: unset;
        bottom: -10px;
        transform: rotate(-135deg);
      }
    }

    &__title {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: @color-logo-text;
    }
    &__footer {
      display: flex;
      justify-content: flex-end;
      .button {
        width: 76px;
      }
    }
    .p-content {
      &__time {
        width: 88px;
      }
      &__notes {
        height: 76px;
      }
    }
  }
  &.active {
    .t-popup {
      display: inline;
    }
  }
}
</style>


