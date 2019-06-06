<template>
  <div class="page-content">
    <div class="flex-container m-7-top">
      <div class="flex-row">
        <div class="flex-col col-4">
          <TextAndLabel :cssClass="'bold color-label font-24'">
            <template slot="text-slot">06 - 09 May 2019</template>
          </TextAndLabel>
        </div>
        <div class="flex-col col-8">
          <div class="d-flex flex-end">
            <ActionButton buttonStyle="secondary">
              <template slot="button-text-slot">Copy from Last Week</template>
            </ActionButton>

            <ActionButton buttonStyle="secondary m-3-left">
              <template slot="button-text-slot">&lt;</template>
            </ActionButton>

            <ActionButton buttonStyle="secondary m-3-left">
              <template slot="button-text-slot">&gt;</template>
            </ActionButton>

            <div class="m-3-left">
              <DatePicker
                :defaultDate="new Date()"
                ref="programaticOpen"
                :wrapperClass="'ta-date-picker'"
              ></DatePicker>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ContentModalDemo></ContentModalDemo>

    <div class="section bg-white p-4-top p-4-bottom">
      <div class="flex-container">
        <div class="flex-row">
          <div class="col-4 flex-col">
            <ComboBox
              ref="ComboBoxRef"
              @keyup="filterList"
              @open="dropDownSearchTerm = '';"
              :selectedItem="selectedCategory"
            >
              <template slot="dropdown-list-items">
                <div
                  class="item"
                  v-for="(item, index) in dropDownData"
                  :key="index"
                  @click="selectDropdownItem(item)"
                >{{item.name}}</div>
              </template>
            </ComboBox>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="flex-container">
        <div class="flex-row" style="margin-bottom: 30px;" v-for="(item, index) in [1]">
          <div class="flex-col col-1">
            <TimeAndNotes></TimeAndNotes>
          </div>
          <div class="flex-col col-1">
            <TimeAndNotes></TimeAndNotes>
          </div>
          <div class="flex-col col-1">
            <TimeAndNotes></TimeAndNotes>
          </div>
          <div class="flex-col col-1">
            <TimeAndNotes></TimeAndNotes>
          </div>
          <div class="flex-col col-1">
            <TimeAndNotes></TimeAndNotes>
          </div>
          <div class="flex-col col-1">
            <TimeAndNotes></TimeAndNotes>
          </div>
          <div class="flex-col col-1">
            <TimeAndNotes></TimeAndNotes>
          </div>
          <div class="flex-col col-1">
            <TimeAndNotes></TimeAndNotes>
          </div>
          <div class="flex-col col-1">
            <TimeAndNotes></TimeAndNotes>
          </div>
          <div class="flex-col col-1">
            <TimeAndNotes></TimeAndNotes>
          </div>
          <div class="flex-col col-1">
            <TimeAndNotes></TimeAndNotes>
          </div>
          <div class="flex-col col-1">
            <TimeAndNotes></TimeAndNotes>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <!-- this.$refs.programaticOpen.showCalendar(); -->
      <div style="width: 360px">
        <DatePicker
          :defaultDate="new Date()"
          ref="programaticOpen"
          :wrapperClass="'ta-date-picker'"
        ></DatePicker>
      </div>
    </div>

    <div class="section">
      <ActionButton
        buttonStyle="primary"
        @click="deleteTimesheetPrompt = true;"
        cssClass="m-2-right m-2-left"
      >
        <template slot="button-text-slot">Show Modal</template>
      </ActionButton>
      <ContentModal :show="deleteTimesheetPrompt">
        <template slot="content-box">
          <div
            class="content-box-text"
          >Are you sure you want to remove these entries from timesheet?</div>
          <div class="content-box-controls">
            <ActionButton buttonStyle="secondary" @click="deleteTimesheetPrompt = false;">
              <template slot="button-text-slot">Cancel</template>
            </ActionButton>
            <ActionButton
              buttonStyle="primary"
              cssClass="m-2-right m-2-left"
              @click="deleteTimesheetPrompt = false;"
            >
              <template slot="button-text-slot">Yes, Delete</template>
            </ActionButton>
          </div>
        </template>
      </ContentModal>
    </div>

    <div class="section">
      <div>
        <input type="text" v-model="notificationMsg">
        <button class="button primary" @click="setNotification()">Set Notification</button>
      </div>

      <transition name="pagenotification">
        <NotificationBar
          v-if="getPageNotification && getPageNotification.show"
          class="m-2-top"
          :display-style="'green'"
        >
          <template slot="left-icon">
            <img src="/img/icons/notification-success-tick.svg" class="icon">
          </template>
          <template slot="text">{{getPageNotification.msg}}</template>
          <template slot="right-icon">
            <img src="/img/icons/plus-icon-green.svg" @click="setNotification(true)" class="icon rotate-45 icon-20">
          </template>
        </NotificationBar>
      </transition>

      <NotificationBar class="m-2-top" :showIcon="false" :showClose="false">
        <template slot="text">Timesheet has been submitted for approval.</template>
      </NotificationBar>
      <div style="width: 200px;margin: 0 auto;">
        <NotificationBar class="m-2-top" :displayStyle="'blue'" :showClose="false">
          <template slot="left-icon">
            <img src="/img/icons/info-icon.svg" class="icon icon-20">
          </template>
          <template slot="text">Pending Approval</template>
        </NotificationBar>
      </div>
      <div style="width: 200px;margin: 0 auto;">
        <NotificationBar
          class="m-2-top"
          :displayStyle="'orange'"
          :showClose="false"
          :showIcon="false"
        >
          <template slot="text">Last Saved at 9:30 PM</template>
        </NotificationBar>
      </div>
    </div>

    <div class="section">
      <button @click="login()">Login</button>
      <button @click="getUserInfo()">Get User Info</button>
      <button @click="getUserPhoto()">Get User Photo</button>
      <div>
        <img src ref="profilePic" class="profile-pic">
      </div>
      <div class="json-data">
        <div class="json-data-item" v-for="(item, index) in displayList" :key="index">
          <div class="json-data-item__key">{{ item.key }}</div>
          <div class="json-data-item__value">{{ item.value }}</div>
        </div>
      </div>
    </div>
    <div class="section">
      <ActionButton buttonStyle="primary" cssClass="m-2-right m-2-left">
        <template slot="button-text-slot">Save</template>
      </ActionButton>

      <ActionButton buttonStyle="primary" :isDisabled="true" cssClass="m-2-right m-2-left">
        <template slot="button-text-slot">Save</template>
      </ActionButton>

      <ActionButton buttonStyle="secondary">
        <template slot="button-text-slot">Current Week</template>
      </ActionButton>

      <ActionButton buttonStyle="secondary">
        <template slot="button-text-slot">&lt;</template>
      </ActionButton>

      <ActionButton buttonStyle="secondary">
        <template slot="button-text-slot">&gt;</template>
      </ActionButton>

      <ActionButton>
        <template slot="button-text-slot">Submit Week for Approval</template>
      </ActionButton>

      <ActionButton>
        <template slot="button-text-slot">Re-Submit Week for Approval</template>
      </ActionButton>

      <ActionButton>
        <template slot="button-text-slot">Cancel</template>
      </ActionButton>

      <ActionButton>
        <template slot="button-text-slot">Yes, Submit</template>
      </ActionButton>

      <ActionButton iconPlacement="left" buttonStyle="primary">
        <template slot="button-icon">
          <img src="/img/icons/plus-icon-white.svg" class="icon">
        </template>
        <template slot="button-text-slot">New</template>
      </ActionButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Getter, Mutation } from "vuex-class";

import { GlobalState } from "@/store/types";
import { ActionButton, TextAndLabel } from "@/components/atoms";
import {
  NotificationBar,
  DatePicker,
  TimeAndNotes,
  ComboBox
} from "@/components/molecules";
import { ContentModal } from "@/components/organisms";

const namespace: string = "global";

import { auth } from "@/services/auth.service";
import { graph } from "@/services/graph.service";


import ContentModalDemo from "./ContentModalDemo.vue";

@Component({
  components: {
    ActionButton,
    ContentModal,
    NotificationBar,
    DatePicker,
    TimeAndNotes,
    ComboBox,
    TextAndLabel,
    ContentModalDemo
  }
})
export default class StyleGuide extends Vue {
  @State("global") global: GlobalState;

  @Mutation("setPageNotification", { namespace }) setPageNotification: any;
  @Getter("getPageNotification", { namespace }) getPageNotification: any;

  notificationMsg: string = "Timesheet has been submitted for approval.";

  deleteTimesheetPrompt: boolean = false;
  newTaskPrompt: boolean = false;
  language: any = {
    rtl: true
  };
  displayList: any[] = [];
  selectedCategory?: any = null;

  dropDownSearchTerm: string = "";
  ComboBox: any[] = [
    {
      name: "Humana",
      value: "humana"
    },
    {
      name: "Intermec",
      value: "intermec"
    },
    {
      name: "Kia Motors",
      value: "kia-motors"
    },
    {
      name: "Celanese",
      value: "celanese"
    }
  ];

  get dropDownData() {
    if (this.dropDownSearchTerm && this.dropDownSearchTerm.length > 0) {
      return this.ComboBox.filter(item => {
        if (
          item.value &&
          item.value
            .toLowerCase()
            .indexOf(this.dropDownSearchTerm.toLowerCase()) === 0
        ) {
          return true;
        }
        return false;
      });
    } else {
      return this.ComboBox;
    }
  }
  mounted() {
    // this.setHideViewTabs(true);
  }

  setNotification(isHide) {
    if (isHide) {
      this.setPageNotification({ show: false });
    } else {
      this.setPageNotification({ msg: this.notificationMsg, show: true });
    }
  }

  login() {
    auth.login();
  }

  renderJsonInDOM(json) {
    Object.keys(json).forEach(key => {
      this.displayList.push({
        key,
        value: JSON.stringify(json[key])
      });
    });
  }

  getUserInfo() {
    auth.getToken().then((token: any) => {
      graph.getUserInfo().then(response => {
        this.renderJsonInDOM(response);
      });
    });
  }
  getUserPhoto() {
    const profilePic = this.$refs.profilePic as HTMLImageElement;
    if (profilePic) {
      graph.getProfilePhoto().then(response => {
        response.blob().then(blob => {
          const url = window.URL.createObjectURL(blob);
          profilePic.addEventListener("load", () => URL.revokeObjectURL(url));
          profilePic.src = url;
        });
      });
    }
  }

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
}
</script>
<style lang="less" scoped>
@import url("../../styles/utils.less");
@import url("../../styles/color.less");
.section {
  .m-4;
}

.bg-white {
  background-color: white;
}

.json-data {
  width: 80%;
  &-item {
    display: flex;
    &__key {
      flex: 1 1 25%;
    }
    &__value {
      flex: 3 3 75%;
    }
  }
}
</style>

