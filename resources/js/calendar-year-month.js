import { CalendarUtils } from './calendar-utils';
import { CALENDAR_YEAR_RANGE_PAST, CALENDAR_YEAR_RANGE_FUTURE } from './component-constants';

/**
 * Shared year/month picker logic for calendar and datepicker components
 * Provides navigation methods, validation, and decade/year range calculations
 */
export function calendarYearMonthMixin() {
    return {
        selectMonth(monthIndex) {
            if (!this.isMonthDisabled(monthIndex, this.pickerYear)) {
                this.displayMonth = monthIndex;
                this.displayYear = this.pickerYear;
                this.updateCalendar();
                this.showMonthYearPicker = false;
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

        initYearPicker() {
            const year = this.pickerYear;
            this.pickerDecadeStart = Math.floor(year / 12) * 12;
        },

        selectYear(year) {
            if (!this.isYearDisabled(year)) {
                this.pickerYear = year;
                this.showYearPicker = false;
            }
        },

        previousDecade() {
            const newDecadeStart = this.pickerDecadeStart - 12;
            if (!this.isDecadeDisabled(newDecadeStart)) {
                this.pickerDecadeStart = newDecadeStart;
            }
        },

        nextDecade() {
            const newDecadeStart = this.pickerDecadeStart + 12;
            if (!this.isDecadeDisabled(newDecadeStart)) {
                this.pickerDecadeStart = newDecadeStart;
            }
        },

        isDecadeDisabled(decadeStart) {
            for (let i = 0; i < 12; i++) {
                if (!this.isYearDisabled(decadeStart + i)) {
                    return false;
                }
            }
            return true;
        },

        getYearRange() {
            const years = [];
            for (let i = 0; i < 12; i++) {
                years.push(this.pickerDecadeStart + i);
            }
            return years;
        }
    };
}
