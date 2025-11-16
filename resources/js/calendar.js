import { CalendarUtils } from './calendar-utils';
import { DateFormatter } from './date-formatter';
import { overlay } from './overlay';
import { CALENDAR_YEAR_RANGE_PAST, CALENDAR_YEAR_RANGE_FUTURE } from './component-constants';

export function calendarComponent(config = {}) {
    return {
        ...overlay({
            trigger: 'click',
            placement: 'bottom-start',
            onInit() {
                this.value = this.normalizeValue(this.value);
                this.updateCalendar();

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
                        }
                    }

                    this.updateSelectionAnnouncement();
                });

                this.$watch('open', (isOpen) => {
                    if (isOpen) {
                        this.pickerYear = this.displayYear;
                    }
                });
            },
        }),

        mode: config.mode ?? 'single',
        value: config.value ?? (config.mode === 'multiple' ? [] : (config.mode === 'range' ? { start: null, end: null } : '')),
        displayMonth: new Date().getMonth(),
        displayYear: new Date().getFullYear(),
        weeks: [],
        dayNames: [],
        locale: config.locale ?? 'en-US',
        firstDayOfWeek: config.firstDayOfWeek ?? 0,
        minDate: config.minDate ?? null,
        maxDate: config.maxDate ?? null,
        disabledDates: config.disabledDates ?? [],
        disabledDaysOfWeek: config.disabledDaysOfWeek ?? [],
        maxRange: config.maxRange ?? null,
        minRange: config.minRange ?? null,
        maxDates: config.maxDates ?? null,
        todayButtonBehavior: config.todayButtonBehavior ?? 'single-day',
        presets: config.presets ?? [],

        hoveredDate: null,
        selectionAnnouncement: '',

        pickerYear: new Date().getFullYear(),

        get monthName() {
            return DateFormatter.getMonthName(this.displayMonth, 'long', this.locale);
        },

        get monthNames() {
            return DateFormatter.getMonthNames('short', this.locale);
        },

        isRangeValue(value) {
            return value && typeof value === 'object' && !Array.isArray(value) && 'start' in value && 'end' in value;
        },

        isMultipleValue(value) {
            return Array.isArray(value);
        },

        normalizeValue(value) {
            if (this.mode === 'range') {
                return this.isRangeValue(value) ? value : { start: null, end: null };
            } else if (this.mode === 'multiple') {
                return this.isMultipleValue(value) ? value : [];
            } else {
                return value ?? '';
            }
        },

        updateCalendar() {
            this.weeks = CalendarUtils.generateMonthGrid(
                this.displayYear,
                this.displayMonth,
                this.firstDayOfWeek
            );

            this.dayNames = CalendarUtils.getDayNames(
                this.firstDayOfWeek,
                this.locale,
                'short'
            );
        },

        nextMonth() {
            this.displayMonth++;
            if (this.displayMonth > 11) {
                this.displayMonth = 0;
                this.displayYear++;
            }
            this.updateCalendar();
        },

        previousMonth() {
            this.displayMonth--;
            if (this.displayMonth < 0) {
                this.displayMonth = 11;
                this.displayYear--;
            }
            this.updateCalendar();
        },

        selectDate(dateString) {
            const day = this.findDayByDate(dateString);
            if (this.isDisabled(day)) return;

            if (this.mode === 'single') {
                this.value = dateString;
                this.$dispatch('date-selected', dateString);
            } else if (this.mode === 'range') {
                this.selectRangeDate(dateString);
            } else if (this.mode === 'multiple') {
                this.toggleMultipleDate(dateString);
            }
        },

        selectRangeDate(dateString) {
            if (!this.isRangeValue(this.value)) {
                this.value = { start: dateString, end: null };
                return;
            }

            if (!this.value.start || (this.value.start && this.value.end)) {
                this.value = { start: dateString, end: null };
            } else {
                const start = this.value.start;
                const end = dateString;

                if (CalendarUtils.isBefore(end, start)) {
                    this.value = { start: end, end: start };
                } else {
                    this.value = { start, end };
                }

                if (!this.isRangeValid(this.value.start, this.value.end)) {
                    this.value = { start: dateString, end: null };
                }
            }
        },

        toggleMultipleDate(dateString) {
            const dates = this.isMultipleValue(this.value) ? [...this.value] : [];
            const index = dates.indexOf(dateString);

            if (index > -1) {
                dates.splice(index, 1);
            } else {
                if (this.maxDates && dates.length >= this.maxDates) {
                    return;
                }
                dates.push(dateString);
            }

            this.value = dates;
        },

        handleDateHover(dateString) {
            if (this.mode === 'range' && this.isRangeValue(this.value) && this.value.start && !this.value.end) {
                this.hoveredDate = dateString;
            }
        },

        clearHover() {
            this.hoveredDate = null;
        },

        findDayByDate(dateString) {
            for (const week of this.weeks) {
                const day = week.find(d => d.date === dateString);
                if (day) return day;
            }
            return null;
        },

        isDisabled(day) {
            if (!day) return true;

            if (this.minDate && CalendarUtils.isBefore(day.date, this.minDate)) {
                return true;
            }

            if (this.maxDate && CalendarUtils.isAfter(day.date, this.maxDate)) {
                return true;
            }

            if (this.disabledDates.includes(day.date)) {
                return true;
            }

            if (this.disabledDaysOfWeek.includes(day.dayOfWeek)) {
                return true;
            }

            return false;
        },

        getAriaLabel(day) {
            return DateFormatter.getAriaLabel(day.date, this.locale);
        },

        selectMonth(monthIndex) {
            if (!this.isMonthDisabled(monthIndex, this.pickerYear)) {
                this.displayMonth = monthIndex;
                this.displayYear = this.pickerYear;
                this.updateCalendar();
                this.hide();
            }
        },

        previousYear() {
            const newYear = this.pickerYear - 1;
            if (!this.isYearDisabled(newYear)) {
                this.pickerYear = newYear;
            }
        },

        nextYear() {
            const newYear = this.pickerYear + 1;
            if (!this.isYearDisabled(newYear)) {
                this.pickerYear = newYear;
            }
        },

        isYearDisabled(year) {
            const currentYear = new Date().getFullYear();
            const minYear = currentYear - CALENDAR_YEAR_RANGE_PAST;
            const maxYear = currentYear + CALENDAR_YEAR_RANGE_FUTURE;

            if (year < minYear || year > maxYear) {
                return true;
            }

            if (this.minDate) {
                const { year: minConstraintYear } = CalendarUtils.parseDate(this.minDate);
                if (year < minConstraintYear) {
                    return true;
                }
            }

            if (this.maxDate) {
                const { year: maxConstraintYear } = CalendarUtils.parseDate(this.maxDate);
                if (year > maxConstraintYear) {
                    return true;
                }
            }

            return false;
        },

        isMonthDisabled(monthIndex, year) {
            if (this.minDate) {
                const { year: minYear, month: minMonth } = CalendarUtils.parseDate(this.minDate);
                if (year < minYear || (year === minYear && monthIndex < minMonth)) {
                    return true;
                }
            }

            if (this.maxDate) {
                const { year: maxYear, month: maxMonth } = CalendarUtils.parseDate(this.maxDate);
                if (year > maxYear || (year === maxYear && monthIndex > maxMonth)) {
                    return true;
                }
            }

            return false;
        },

        isRangeValid(start, end) {
            if (!start || !end) return true;

            const daysDiff = CalendarUtils.getDaysDifference(start, end);

            if (this.minRange !== null && daysDiff < this.minRange) {
                return false;
            }

            if (this.maxRange !== null && daysDiff > this.maxRange) {
                return false;
            }

            return true;
        },

        isDateSelected(dateString) {
            if (this.mode === 'single') {
                return this.value === dateString;
            } else if (this.mode === 'range') {
                return this.isDateInRange(dateString);
            } else if (this.mode === 'multiple') {
                return this.isMultipleValue(this.value) && this.value.includes(dateString);
            }
            return false;
        },

        isDateInRange(dateString) {
            if (!this.isRangeValue(this.value)) return false;
            if (!this.value.start) return false;
            if (!this.value.end) return this.value.start === dateString;

            return CalendarUtils.isWithinRange(dateString, this.value.start, this.value.end);
        },

        isDateInPreviewRange(dateString) {
            if (this.mode !== 'range' || !this.isRangeValue(this.value)) {
                return false;
            }
            if (!this.value.start || this.value.end || !this.hoveredDate) {
                return false;
            }

            const start = this.value.start;
            const end = this.hoveredDate;

            if (CalendarUtils.isBefore(end, start)) {
                return CalendarUtils.isWithinRange(dateString, end, start);
            } else {
                return CalendarUtils.isWithinRange(dateString, start, end);
            }
        },

        isRangeStart(dateString) {
            return this.mode === 'range' && this.isRangeValue(this.value) && this.value.start === dateString;
        },

        isRangeEnd(dateString) {
            return this.mode === 'range' && this.isRangeValue(this.value) && this.value.end === dateString;
        },

        isPreviewStart(dateString) {
            if (this.mode !== 'range' || !this.isRangeValue(this.value)) {
                return false;
            }
            if (!this.value.start || this.value.end || !this.hoveredDate) {
                return false;
            }
            return this.value.start === dateString;
        },

        isPreviewEnd(dateString) {
            if (this.mode !== 'range' || !this.isRangeValue(this.value)) {
                return false;
            }
            if (!this.value.start || this.value.end || !this.hoveredDate) {
                return false;
            }
            return this.hoveredDate === dateString;
        },

        getSelectionCount() {
            if (this.mode === 'multiple' && this.isMultipleValue(this.value)) {
                return this.value.length;
            }
            return 0;
        },

        isMaxDatesReached() {
            return this.mode === 'multiple' && this.maxDates && this.getSelectionCount() >= this.maxDates;
        },

        updateSelectionAnnouncement() {
            if (this.mode === 'single') {
                if (this.value) {
                    const formattedDate = DateFormatter.getAriaLabel(this.value, this.locale);
                    this.selectionAnnouncement = formattedDate;
                } else {
                    this.selectionAnnouncement = '';
                }
            } else if (this.mode === 'range') {
                if (this.isRangeValue(this.value)) {
                    if (this.value.start && this.value.end) {
                        const startLabel = DateFormatter.getAriaLabel(this.value.start, this.locale);
                        const endLabel = DateFormatter.getAriaLabel(this.value.end, this.locale);
                        this.selectionAnnouncement = `Range from ${startLabel} to ${endLabel} selected`;
                    } else if (this.value.start) {
                        const startLabel = DateFormatter.getAriaLabel(this.value.start, this.locale);
                        this.selectionAnnouncement = `Range start: ${startLabel}`;
                    } else {
                        this.selectionAnnouncement = '';
                    }
                } else {
                    this.selectionAnnouncement = '';
                }
            } else if (this.mode === 'multiple') {
                const count = this.getSelectionCount();
                if (count > 0) {
                    this.selectionAnnouncement = `${count} ${count === 1 ? 'date' : 'dates'} selected`;
                } else {
                    this.selectionAnnouncement = '';
                }
            }
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

        get hasSelection() {
            if (this.mode === 'single') {
                return this.value !== null && this.value !== '';
            } else if (this.mode === 'range') {
                if (!this.isRangeValue(this.value)) return false;
                return this.value.start !== null || this.value.end !== null;
            } else if (this.mode === 'multiple') {
                return this.isMultipleValue(this.value) && this.value.length > 0;
            }
            return false;
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
