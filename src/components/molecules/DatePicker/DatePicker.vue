<template>
  <div
    class="date-picker-wrapper"
    ref="datePickerWrapperRef"
    :class="{'date-picker-wrapper--opened': calendarOpened}"
  >
    <ActionButton
      :buttonStyle="'secondary'"
      :iconPlacement="'left'"
      @click="toggleCalender($event)"
    >
      <template slot="button-icon">
        <img src="/img/icons/office-monthly-calendar.svg">
      </template>
      <template slot="button-text-slot">{{ SelectedWeek }}</template>
      <template slot="button-icon-right">
        <img src="/img/icons/arrow-fill-right.svg" class="icon rotate-90 xs">
      </template>
    </ActionButton>
    <VDatepicker
      :mondayFirst="true"
      :minimumView="'day'"
      :maximumView="'day'"
      ref="vDatePicker"
      :wrapperClass="WrapperClass"
      @selected="handleDaySelected"
    ></VDatepicker>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { ActionButton, CoreDatePicker } from "@/components/atoms";
import { DatePickerRef } from "./DatePickerRef.interface";
import { util } from "@/services/util.service";

@Component({
  components: {
    ActionButton,
    VDatepicker: CoreDatePicker
  }
})
export default class DatePicker extends Vue {
  @Prop({ default: "" }) wrapperClass: string;
  @Prop() defaultDate: Date;

  public selectedDate: Date = new Date();
  calendarOpened: boolean = false;
  isRight: boolean = false;

  get MonthNames() {
    return [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
  }
  get WrapperClass() {
    return [this.wrapperClass, this.isRight ? "rtl" : ""].join(" ");
  }
  get SelectedWeek() {
    const date = new Date(this.selectedDate.getTime());
    const diff =
      date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    const firstDay = new Date(date.setDate(diff));
    const lastDay = new Date(firstDay.getTime());
    lastDay.setDate(firstDay.getDate() + 6);
    // return new Date(date.setDate(diff));
    return (
      this.toTwoDigit(firstDay.getDate()) +
      " - " +
      this.toTwoDigit(lastDay.getDate()) +
      " " +
      this.MonthNames[lastDay.getMonth()] +
      " " +
      lastDay.getFullYear()
    );
  }

  created() {
    this.selectedDate = this.defaultDate;
  }

  destroyed() {
    document.removeEventListener("click", this.outSideClick);
  }

  outSideClick(event) {
    const datepicker = this.$refs.vDatePicker as DatePickerRef;
    const datePickerWrapperRef = this.$refs.datePickerWrapperRef as HTMLElement;
    if (datePickerWrapperRef) {
      if (!util.isDescendant(datePickerWrapperRef, event.target)) {
        this.calendarOpened = false;
        datepicker.showCalendar();
        document.removeEventListener("click", this.outSideClick);
      }
    }
  }

  toTwoDigit(digitToConvert) {
    return digitToConvert < 10 ? "0" + digitToConvert : digitToConvert;
  }

  setCalendarPosition(event) {
    const target = event.target;
    if (target) {
      const bounds = target.getBoundingClientRect();
      if (!(bounds.x + 300 < window.innerWidth)) {
        this.isRight = true;
      }
    }
  }

  toggleCalender() {
    const datepicker = this.$refs.vDatePicker as DatePickerRef;
    if (datepicker) {
      if (!this.calendarOpened) {
        document.addEventListener("click", this.outSideClick);
        this.setCalendarPosition(event);
      } else {
        document.removeEventListener("click", this.outSideClick);
      }
      this.calendarOpened = !this.calendarOpened;
      datepicker.showCalendar();
    }
  }

  handleDaySelected(date: Date) {
    this.selectedDate = date;
  }
}
</script>

<style lang="less">
@import url("../../../styles/utils.less");
@import url("../../../styles/color.less");

.date-picker-wrapper {
  .font-Nunito;
  .button {
    &__icon-right {
      img {
        transition: transform 0.2s linear;
      }
    }
  }
  &--opened {
    .button {
      border: 1px solid rgba(238, 238, 238, 1);
      border-radius: 2px 2px 0 0;
      box-shadow: 0 3px 6px rgba(104, 151, 177, 0.2);
      border-bottom: 1px solid transparent;
      &__icon-right {
        img {
          transform: rotate(-90deg);
        }
      }
    }
  }
  .vdp-datepicker {
    @p: .vdp-datepicker;
    &.ta-date-picker {
      input {
        width: 100%;
        display: none;
      }
      @{p}__calendar {
        border: 1px solid rgba(238, 238, 238, 1);
        border-radius: 0 2px 2px 2px;
        box-shadow: 0 3px 6px rgba(104, 151, 177, 0.2);
        border-top: 1px solid transparent;

        header {
          .next,
          .prev {
            text-indent: unset;
            object {
              cursor: pointer;
            }
          }
        }
      }
      @{p}__footer {
        padding: 10px;
      }
    }
  }
}
</style>


