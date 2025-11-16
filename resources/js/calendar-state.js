import { CalendarUtils } from './calendar-utils';
import { DateFormatter } from './date-formatter';

export function calendarState(config = {}) {
    return {
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

        hoveredDate: null,
        selectionAnnouncement: '',

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
                this.$dispatch('calendar-date-selected', dateString);
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
    };
}
