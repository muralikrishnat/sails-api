import Vue from 'vue';

interface DatePicker {
    showCalendar(): void;
}

type VueRef = Vue | Element | Vue[] | Element[];
export type DatePickerRef = VueRef & DatePicker;
