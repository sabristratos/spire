import { calendarState } from './calendar-state';
import { CalendarUtils } from './calendar-utils';
import { DateFormatter } from './date-formatter';
import { calendarYearMonthMixin } from './calendar-year-month';
import { calculatePresetRange } from '../../../js/shared/date-presets';

export function calendarComponent(config = {}) {
    return {
        ...calendarState(config),
        ...calendarYearMonthMixin(),

        todayButtonBehavior: config.todayButtonBehavior ?? 'single-day',
        presets: config.presets ?? [],

        pickerYear: new Date().getFullYear(),
        showMonthYearPicker: false,
        showYearPicker: false,
        pickerDecadeStart: null,

        init() {
            this.value = this.normalizeValue(this.value);
            this.updateCalendar();
            this.updateCalendar2();

            this.$watch('value', (newValue) => {
                this.value = this.normalizeValue(newValue);

                if (this.mode === 'single' && this.value) {
                    const { year, month } = CalendarUtils.parseDate(this.value);
                    if (this.displayYear !== year || this.displayMonth !== month) {
                        this.displayYear = year;
                        this.displayMonth = month;
                        this.updateCalendar();
                    }
                } else if (this.mode === 'range' && this.value?.start) {
                    const { year, month } = CalendarUtils.parseDate(this.value.start);
                    if (this.displayYear !== year || this.displayMonth !== month) {
                        this.displayYear = year;
                        this.displayMonth = month;
                        this.updateCalendar();

                        // Update calendar2 to show next month in dual calendar view
                        this.displayMonth2 = month === 11 ? 0 : month + 1;
                        this.displayYear2 = month === 11 ? year + 1 : year;
                        this.updateCalendar2();
                    }
                }

                this.updateSelectionAnnouncement();
            });

            this.$watch('showMonthYearPicker', (isOpen) => {
                if (isOpen) {
                    this.pickerYear = this.displayYear;
                }
            });

            this.$watch('showYearPicker', (isOpen) => {
                if (isOpen) {
                    this.initYearPicker();
                }
            });
        },

        clearSelection() {
            if (this.mode === 'single') {
                this.value = '';
            } else if (this.mode === 'range') {
                this.value = { start: null, end: null };
            } else if (this.mode === 'multiple') {
                this.value = [];
            }

            this.selectionAnnouncement = 'Selection cleared';
        },

        selectToday() {
            const today = CalendarUtils.today();

            if (this.mode === 'single') {
                this.value = today;
            } else if (this.mode === 'range') {
                if (this.todayButtonBehavior === 'single-day') {
                    this.value = { start: today, end: today };
                } else {
                    this.value = { start: today, end: null };
                }
            } else if (this.mode === 'multiple') {
                this.toggleMultipleDate(today);
            }

            this.selectionAnnouncement = 'Today selected';
        },

        selectPreset(preset) {
            const range = calculatePresetRange(preset, this.firstDayOfWeek);
            if (range) {
                this.value = { start: range.start, end: range.end };

                const { year, month } = CalendarUtils.parseDate(range.start);
                this.displayYear = year;
                this.displayMonth = month;
                this.updateCalendar();

                this.selectionAnnouncement = `${preset.label} applied`;
            }
        },

        isPresetActive(preset) {
            if (this.mode !== 'range' || !this.isRangeValue(this.value)) {
                return false;
            }
            if (!this.value.start || !this.value.end) {
                return false;
            }

            const presetRange = calculatePresetRange(preset, this.firstDayOfWeek);
            if (!presetRange) return false;

            return this.value.start === presetRange.start && this.value.end === presetRange.end;
        },

        get isTodayDisabled() {
            const today = CalendarUtils.today();
            const todayDate = this.findDayByDate(today);

            if (!todayDate || this.isDisabled(todayDate)) {
                return true;
            }

            if (this.mode === 'single') {
                return this.value === today;
            } else if (this.mode === 'range') {
                if (!this.isRangeValue(this.value)) return false;
                return this.value.start === today && this.value.end === today;
            } else if (this.mode === 'multiple') {
                const isSelected = this.isMultipleValue(this.value) && this.value.includes(today);
                const isAtMax = this.isMaxDatesReached();
                return isAtMax && !isSelected;
            }

            return false;
        },

        destroy() {
            // Calendar uses $watch which is automatically cleaned up by Alpine
            // This method exists for consistency with other components
        }
    };
}
