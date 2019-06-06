<template>
  <div class="dropdown-list" :class="dCssClass" ref="dropdownListRef">
    <div class="dropdown-list__selector d-selector" v-show="!isFocus" @click="openList($event)">
      <div class="d-selector__label" :class="{'selected': selectedValue}">
        <span v-if="selectedValue">{{ selectedValue.name }}</span>
        <span v-else>{{ SelectLabel }}</span>
      </div>
      <div class="d-selector__icon">
        <img src="/img/icons/arrow-fill-right.svg" class="icon rotate-90 xs">
      </div>
    </div>
    <div class="dropdown-list__editor">
      <TextInput :cssClass="'search'" :defaultValue="selectedName" @keyup="handleKeyUp"></TextInput>
      <div class="d-editor-close" @click="isFocus = false;">X</div>
      <div class="d-editor-list" ref="dListRef">
        <slot name="dropdown-list-items"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { TextInput } from "../../atoms";
import { util } from "../../../services/util.service";
@Component({
  components: {
    TextInput
  }
})
export default class ComboBox extends Vue {
  @Prop({ default: "Select Category" }) SelectLabel: string;
  @Prop() selectedItem: any;

  isFocus: boolean = false;
  selectedName: string = "";
  get dCssClass() {
    return [this.isFocus ? "active" : ""].join(" ");
  }

  get selectedValue() {
    return this.selectedItem;
  }

  handleKeyUp(event) {
    this.$emit("keyup", event);
  }

  openList(event) {
    this.isFocus = true;
    document.addEventListener("click", this.outSideClick);
    this.$emit("open");
  }

  outSideClick(event) {
    const dropdownListRef = this.$refs.dropdownListRef as HTMLElement;
    if (dropdownListRef) {
      if (!util.isDescendant(dropdownListRef, event.target)) {
        this.isFocus = false;
      }
    }
    console.log("out side click", !this.isFocus);
  }

  hideList() {
    this.isFocus = false;
  }

  @Watch("selectedItem")
  handleValueChange(newValue, oldValue) {
    if (newValue) {
      if (oldValue && oldValue.name === newValue.name) {
        this.selectedName = newValue.name;
      } else {
        this.selectedName = newValue.name;
      }
    }
  }
}
</script>

<style lang="less">
@import url("../../../styles/utils.less");
@import url("../../../styles/color.less");
.dropdown-list {
  position: relative;
  .d-selector {
    border: 1px solid #eeeeee;
    border-radius: 2px;
    display: flex;
    padding: 10px;
    cursor: pointer;
    &__label {
      font-size: 13px;
      line-height: 18px;
      color: @color-calender-arrow;
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      &.selected {
        color: @color-logo-text;
      }
    }
  }
  &__editor {
    .d-editor-list {
      min-width: 100%;
      background: @color-white;
      border: 1px solid @color-disable-color;
      border-radius: 2px;
      position: absolute;
      z-index: 150;
      margin-top: -1px;
      box-shadow: 0 3px 6px 2px @color-time-popup-bg;
      padding-top: 9px;
      padding-bottom: 10px;
      > div {
        padding-left: 12px;
        margin: 5px 0;
        color: @color-button-color;
        font-size: 13px;
        line-height: 18px;
        cursor: pointer;
      }
    }
    .d-editor-close {
      position: absolute;
      right: 10px;
      z-index: 150;
      top: 10px;
      padding: 0 3px;
      cursor: pointer;
    }
  }

  .dropdown-list__editor {
    display: none;
    .d-editor-list {
      transform: translate(3%, 3%) scale(0.5, 0.5);
      opacity: 0.5;
      transition: transform .2s linear, opacity 0.1s linear;
    }
    
  }
  &.active {
    .dropdown-list__editor {
      display: block;
      .d-editor-list {
        transform: translate(0, 0) scale(1, 1);
        opacity: 1;
        transition: transform .2s linear, opacity 0.1s linear;
      }
    }
  }
}
</style>


