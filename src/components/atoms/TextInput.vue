<template>
  <div class="text-input" :class="inputClasses">
    <input
      v-if="inputType === 'input'"
      type="text"
      class="txt-input"
      v-model="inputValue"
      @focus="handleFocus($event)"
      :placeholder="inputPlaceholder"
      @blur="handleBlur($event)"
      @keyup="handleKeyUp($event)"
    >
    <textarea 
    v-model="inputValue" 
    @focus="handleFocus($event)"
    @blur="handleBlur($event)"
    v-if="inputType === 'textarea'" class="txt-area"></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class TextInput extends Vue {
  @Prop() onlyNumbers: boolean;
  @Prop() numberFormat: string;
  @Prop({ default: "input" }) inputType: string;
  @Prop() cssClass: string;
  @Prop() placeholder: string;
  @Prop() defaultValue: string;

  isFcous: boolean = false;
  inputValue: string = "";

  get inputPlaceholder() {
    return this.placeholder;
  }
  get inputClasses() {
    let value = '';
    switch (this.inputType) {
      case 'input':
        value = this.inputValue;
        break;
      case 'textarea':
        value = this.inputValue
        break;
      default:
        break;
    }
    return [
      this.isFcous ? "text-input--active" : "",
      value.length > 0 ? "text-input--has-value" : "",
      this.cssClass
    ].join(" ");
  }

  created() {
    if (this.defaultValue) {
      this.inputValue = this.defaultValue;
    }
  }
  handleKeyUp(event) {
    if (event.target && event.keyCode !== 8) {
      const target = event.target;
      let value = target.value;
      if (this.onlyNumbers) {
        value = value.replace(/[^0-9:]/g, "");
        if (value.split(":").length > 2) {
          // console.log("TODO");
        }
        target.value = value;
        this.inputValue = value;
        // if (this.numberFormat && this.numberFormat.length > 0) {
        //   value = value.replace(/[^0-9]/g, "");
        //   if (value.length > 0) {
        //     const values = value.split("");
        //     const chars = this.numberFormat.split("");
        //     const len = chars.length;
        //     for (let i = 0; i < len; i++) {
        //       if (chars[i] === "0") {
        //         chars[i] = values.pop();
        //       }
        //     }
        //     target.value = chars.join("") + values.join("");
        //   } else {
        //     target.value = value;
        //   }
        //   this.inputValue = target.value;
        // }
      }
    }
    this.$emit('keyup', {
      value: this.inputValue
    });
  }

  handleFocus(event) {
    this.isFcous = true;
    this.$emit("focus", event);

    const target = event.target;
    // if (target) {
    //   let value = target.value;
    //   value = value.replace(/:/g, '');
    //   target.value = value;
    // }
  }

  handleBlur(event) {
    this.isFcous = false;
    this.$emit("blur", event);
    this.handleKeyUp(event);
  }

  @Watch('defaultValue')
  handleDefaultValue(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.inputValue = newValue;
    }
  }
}
</script>

<style lang="less">
@import url("../../styles/utils.less");
@import url("../../styles/color.less");

.text-input {
  .txt-input {
    height: 48px;
    width: 100%;
    border-radius: 2px;
    font-size: 14px;
    line-height: 19px;
    padding-left: 12px;
    border: 1px solid @color-disable-color;
    color: @color-tab-text;
    border-radius: 2px;

    &:focus {
      outline: none;
    }
  }
  .txt-area {
    height: 100%;
    width: 100%;
    resize: none;
    border-radius: 2px;
    font-size: 14px;
    line-height: 18px;
    padding: 11px 28px 8px 12px;
    border: 1px solid @color-disable-color;
    color: @color-tab-text;
    border-radius: 2px;
    &:focus {
      outline: none;

    }
  }
  
  &--active {
    .txt-input, .txt-area {
      border: 1px solid @color-tab-active;
      box-shadow: inset 0 0 1px 1px @color-tab-active;
      color: @color-logo-text;
    }
  }
  &--has-value {
    .txt-input, .txt-area {
      color: @color-logo-text;
    }
  }
  &.full-height {
    height: 100%;
  }
  &.active {
    .txt-input, .txt-area {
      border: 1px solid @color-tab-active;
      box-shadow: inset 0 0 1px 1px @color-tab-active;
      color: @color-logo-text;
    }
  }
  &.search {
    .txt-input {
      border: 1px solid @color-modal-border;
      box-shadow: 0 0 2px 2px @color-modal-border;
      height: 44px;
    }
  }
}
</style>


