import { calendarState } from './calendar-state';
import { CalendarUtils } from './calendar-utils';
import { DateFormatter } from './date-formatter';
import { calendarYearMonthMixin } from './calendar-year-month';

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
            const range = this.calculatePresetRange(preset.key);
            if (range) {
                this.value = { start: range.start, end: range.end };

                const { year, month } = CalendarUtils.parseDate(range.start);
                this.displayYear = year;
                this.displayMonth = month;
                this.updateCalendar();

                this.selectionAnnouncement = `${preset.label} applied`;
            }
        },

        calculatePresetRange(presetKey) {
            const today = new Date();
            const utils = CalendarUtils;

            switch (presetKey) {
                case 'last_7_days': {
                    const start7 = new Date(today);
                    start7.setDate(today.getDate() - 6);
                    return {
                        start: utils.formatDate(
                            start7.getFullYear(),
                            start7.getMonth(),
                            start7.getDate()
                        ),
                        end: utils.today()
                    };
                }

                case 'last_30_days': {
                    const start30 = new Date(today);
                    start30.setDate(today.getDate() - 29);
                    return {
                        start: utils.formatDate(
                            start30.getFullYear(),
                            start30.getMonth(),
                            start30.getDate()
                        ),
                        end: utils.today()
                    };
                }

                case 'this_week': {
                    const { start, end } = utils.getWeekRange(utils.today(), this.firstDayOfWeek);
                    return { start, end };
                }

                case 'last_week': {
                    const lastWeekDate = new Date(today);
                    lastWeekDate.setDate(today.getDate() - 7);
                    const lastWeekDateString = utils.formatDate(
                        lastWeekDate.getFullYear(),
                        lastWeekDate.getMonth(),
                        lastWeekDate.getDate()
                    );
                    const { start, end } = utils.getWeekRange(lastWeekDateString, this.firstDayOfWeek);
                    return { start, end };
                }

                case 'this_month':
                    return {
                        start: utils.formatDate(today.getFullYear(), today.getMonth(), 1),
                        end: utils.today()
                    };

                case 'last_month': {
                    const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
                    const lastMonthYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
                    const lastDayOfLastMonth = new Date(lastMonthYear, lastMonth + 1, 0).getDate();
                    return {
                        start: utils.formatDate(lastMonthYear, lastMonth, 1),
                        end: utils.formatDate(lastMonthYear, lastMonth, lastDayOfLastMonth)
                    };
                }

                default:
                    return null;
            }
        },

        isPresetActive(preset) {
            if (this.mode !== 'range' || !this.isRangeValue(this.value)) {
                return false;
            }
            if (!this.value.start || !this.value.end) {
                return false;
            }

            const presetRange = this.calculatePresetRange(preset.key);
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
    };
}
