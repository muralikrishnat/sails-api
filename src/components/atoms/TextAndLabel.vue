<template>
    <div class="text-label" :class="textClass">
        <slot name="text-slot"></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class TextAndLabel extends Vue {
    @Prop() cssClass: string;

    get textClass() {
        return this.cssClass;
    }
}
</script>

<style lang="less" scoped>
@import url("../../styles/utils.less");
@import url("../../styles/color.less");
.text-label {
    &.bold {
        font-weight: bold;
    }
    &.color-label {
        color: @color-logo-text
    }
    &.font-24 {
        font-size: 24px;
        line-height: 32px;
    }
}
</style>

