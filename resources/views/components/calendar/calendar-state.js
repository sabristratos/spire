import { CalendarUtils } from './calendar-utils';
import { DateFormatter } from './date-formatter';
import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';

export function calendarState(config = {}) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    return {
        mode: config.mode ?? 'single',
        value: config.value ?? (config.mode === 'multiple' ? [] : (config.mode === 'range' ? { start: null, end: null } : '')),
        name: config.name || null,
        displayMonth: currentMonth,
        displayYear: currentYear,
        displayMonth2: nextMonth,
        displayYear2: nextYear,
        weeks: [],
        dayNames: [],
        monthName: DateFormatter.getMonthName(new Date().getMonth(), 'long', config.locale ?? 'en-US'),
        month2Name: DateFormatter.getMonthName(nextMonth, 'long', config.locale ?? 'en-US'),
        month2Weeks: CalendarUtils.generateMonthGrid(nextYear, nextMonth, config.firstDayOfWeek ?? 0),
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

        get monthNames() {
            return DateFormatter.getMonthNames('short', this.locale);
        },

        canNavigatePreviousMonth() {
            // If no minDate constraint, navigation is allowed
            if (!this.minDate) {
                return true;
            }

            // Calculate what month would be after decrement
            let prevMonth = this.displayMonth - 1;
            let prevYear = this.displayYear;

            if (prevMonth < 0) {
                prevMonth = 11;
                prevYear--;
            }

            // Create date for first day of previous month
            const prevMonthDate = new Date(prevYear, prevMonth, 1);
            const minDateTime = new Date(this.minDate);

            // Allow navigation if previous month would still be after or equal to minDate
            return prevMonthDate >= minDateTime;
        },

        canNavigateNextMonth() {
            // If no maxDate constraint, navigation is allowed
            if (!this.maxDate) {
                return true;
            }

            // Calculate what month would be after increment
            let nextMonth = this.displayMonth + 1;
            let nextYear = this.displayYear;

            if (nextMonth > 11) {
                nextMonth = 0;
                nextYear++;
            }

            // Create date for first day of next month
            const nextMonthDate = new Date(nextYear, nextMonth, 1);
            const maxDateTime = new Date(this.maxDate);

            // Allow navigation if next month would still be before or equal to maxDate
            return nextMonthDate <= maxDateTime;
        },

        canNavigatePreviousMonth2() {
            // Calculate what month2 would be after decrement
            let prevMonth2 = this.displayMonth2 - 1;
            let prevYear2 = this.displayYear2;

            if (prevMonth2 < 0) {
                prevMonth2 = 11;
                prevYear2--;
            }

            // Create dates for comparison
            const month1Date = new Date(this.displayYear, this.displayMonth, 1);
            const prevMonth2Date = new Date(prevYear2, prevMonth2, 1);

            // Month2 can go previous only if it would still be after month1
            return prevMonth2Date > month1Date;
        },

        canNavigateNextMonth2() {
            // If no maxDate constraint, navigation is allowed
            if (!this.maxDate) {
                return true;
            }

            // Calculate what month2 would be after increment
            let nextMonth2 = this.displayMonth2 + 1;
            let nextYear2 = this.displayYear2;

            if (nextMonth2 > 11) {
                nextMonth2 = 0;
                nextYear2++;
            }

            // Create date for first day of next month
            const nextMonth2Date = new Date(nextYear2, nextMonth2, 1);
            const maxDateTime = new Date(this.maxDate);

            // Allow navigation if next month would still be before maxDate
            return nextMonth2Date <= maxDateTime;
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

            this.monthName = DateFormatter.getMonthName(this.displayMonth, 'long', this.locale);
        },

        updateCalendar2() {
            this.month2Weeks = CalendarUtils.generateMonthGrid(
                this.displayYear2,
                this.displayMonth2,
                this.firstDayOfWeek
            );

            this.month2Name = DateFormatter.getMonthName(this.displayMonth2, 'long', this.locale);
        },

        nextMonth() {
            this.displayMonth++;
            if (this.displayMonth > 11) {
                this.displayMonth = 0;
                this.displayYear++;
            }
            this.updateCalendar();

            // Synchronize month2 to maintain gap in dual calendar view
            const month1Date = new Date(this.displayYear, this.displayMonth, 1);
            const month2Date = new Date(this.displayYear2, this.displayMonth2, 1);

            // If month1 catches up to or passes month2, auto-advance month2
            if (month1Date >= month2Date) {
                this.displayMonth2 = this.displayMonth + 1;
                if (this.displayMonth2 > 11) {
                    this.displayMonth2 = 0;
                    this.displayYear2 = this.displayYear + 1;
                } else {
                    this.displayYear2 = this.displayYear;
                }
                this.updateCalendar2();
            }
        },

        previousMonth() {
            this.displayMonth--;
            if (this.displayMonth < 0) {
                this.displayMonth = 11;
                this.displayYear--;
            }
            this.updateCalendar();
        },

        nextMonth2() {
            this.displayMonth2++;
            if (this.displayMonth2 > 11) {
                this.displayMonth2 = 0;
                this.displayYear2++;
            }
            this.updateCalendar2();

            // No synchronization needed when advancing month2
            // (it's moving further ahead, increasing the gap)
        },

        previousMonth2() {
            this.displayMonth2--;
            if (this.displayMonth2 < 0) {
                this.displayMonth2 = 11;
                this.displayYear2--;
            }
            this.updateCalendar2();

            // Synchronize month1 to maintain gap in dual calendar view
            const month1Date = new Date(this.displayYear, this.displayMonth, 1);
            const month2Date = new Date(this.displayYear2, this.displayMonth2, 1);

            // If month2 catches up to or goes before month1, auto-retreat month1
            if (month2Date <= month1Date) {
                this.displayMonth = this.displayMonth2 - 1;
                if (this.displayMonth < 0) {
                    this.displayMonth = 11;
                    this.displayYear = this.displayYear2 - 1;
                } else {
                    this.displayYear = this.displayYear2;
                }
                this.updateCalendar();
            }
        },

        validateMonth2Position() {
            const month1Date = new Date(this.displayYear, this.displayMonth, 1);
            const month2Date = new Date(this.displayYear2, this.displayMonth2, 1);

            console.log('[validateMonth2Position] Comparing:', {
                month1: { month: this.displayMonth, year: this.displayYear, date: month1Date },
                month2: { month: this.displayMonth2, year: this.displayYear2, date: month2Date },
                month2BeforeMonth1: month2Date < month1Date
            });

            if (month2Date < month1Date) {
                console.log('[validateMonth2Position] VALIDATION TRIGGERED - month2 is before month1, resetting...');
                this.displayMonth2 = this.displayMonth + 1;

                if (this.displayMonth2 > 11) {
                    this.displayMonth2 = 0;
                    this.displayYear2 = this.displayYear + 1;
                } else {
                    this.displayYear2 = this.displayYear;
                }
                console.log('[validateMonth2Position] AFTER reset:', { displayMonth2: this.displayMonth2, displayYear2: this.displayYear2 });
            } else {
                console.log('[validateMonth2Position] No validation needed - month2 is valid');
            }
        },

        selectDate(dateString) {
            const day = this.findDayByDate(dateString);
            if (this.isDisabled(day)) return;

            const previousValue = this.value;

            if (this.mode === 'single') {
                this.value = dateString;
                this.$dispatch(SPIRE_EVENTS.DATE_SELECTED, createEventPayload({
                    id: this.$id('calendar'),
                    name: this.name,
                    value: dateString,
                    previousValue: previousValue,
                }));
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

            if (this.month2Weeks) {
                for (const week of this.month2Weeks) {
                    const day = week.find(d => d.date === dateString);
                    if (day) return day;
                }
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
