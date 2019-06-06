<template>
  <div class="section">
    <ActionButton
      buttonStyle="primary"
      @click="toggleModal($event)"
      cssClass="m-2-right m-2-left"
    >
      <template slot="button-text-slot">New Task</template>
    </ActionButton>
    <ContentModal :show="newTaskPrompt">
      <template slot="content-box">
        <div class="content-box-title text-center">New Entry</div>
        <div class="content-box-body">
          <ComboBox @keyup="filterList" :selectedItem="selectedCategory">
            <template slot="dropdown-list-items">
              <div
                class="item"
                v-for="(item, index) in [{ name: 'List 1', value: '1'}, {name: 'List 2', value: '2'}, {name: 'List 3', value: '3'}]"
                :key="index"
                @click="selectedCategory = item;"
              >{{item.name}}</div>
            </template>
          </ComboBox>
        </div>
        <div class="content-box-controls">
          <ActionButton buttonStyle="secondary" @click="toggleModal($event, true)">
            <template slot="button-text-slot">Cancel</template>
          </ActionButton>
          <ActionButton
            buttonStyle="primary"
            cssClass="m-2-right m-2-left"
            @click="toggleModal($event, true)"
          >
            <template slot="button-text-slot">Save Entry</template>
          </ActionButton>
        </div>
      </template>
    </ContentModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ActionButton, TextAndLabel } from "@/components/atoms";
import { ComboBox } from "@/components/molecules";
import { ContentModal } from "@/components/organisms";

@Component({
  components: {
    ComboBox,
    ContentModal,
    ActionButton
  }
})
export default class ContentModalDemo extends Vue {
  newTaskPrompt: boolean = false;
  dropDownSearchTerm: string;
  selectedCategory?: any = null;

  filterList(event) {
    this.dropDownSearchTerm = event.value;
  }

  selectDropdownItem(item) {
    this.selectedCategory = item;
    const ComboBoxRef = this.$refs.ComboBoxRef as ComboBox;
    if (ComboBoxRef) {
      ComboBoxRef.hideList();
    }
  }

  toggleModal(event, isHide) {
    this.newTaskPrompt = !isHide;
  }
}
</script>

<style lang="less">
</style>


