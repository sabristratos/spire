/**
 * Calendar utilities for client-side date operations.
 * Uses native JavaScript Date API with no external dependencies.
 */

export const CalendarUtils = {
    /**
     * Generate a calendar grid for the given month.
     */
    generateMonthGrid(year, month, firstDayOfWeek = 0) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        const startDayOfWeek = (firstDay.getDay() - firstDayOfWeek + 7) % 7;

        const prevMonth = month === 0 ? 11 : month - 1;
        const prevMonthYear = month === 0 ? year - 1 : year;
        const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

        const weeks = [];
        let currentWeek = [];

        for (let i = 0; i < startDayOfWeek; i++) {
            const day = daysInPrevMonth - startDayOfWeek + i + 1;
            currentWeek.push({
                date: this.formatDate(prevMonthYear, prevMonth, day),
                day: day,
                month: prevMonth,
                year: prevMonthYear,
                isCurrentMonth: false,
                isToday: this.isToday(prevMonthYear, prevMonth, day),
                isWeekend: this.isWeekend(prevMonthYear, prevMonth, day),
                dayOfWeek: i,
            });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayOfWeek = (startDayOfWeek + day - 1) % 7;

            currentWeek.push({
                date: this.formatDate(year, month, day),
                day: day,
                month: month,
                year: year,
                isCurrentMonth: true,
                isToday: this.isToday(year, month, day),
                isWeekend: this.isWeekend(year, month, day),
                dayOfWeek: dayOfWeek,
            });

            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        }

        if (currentWeek.length > 0) {
            const nextMonth = month === 11 ? 0 : month + 1;
            const nextMonthYear = month === 11 ? year + 1 : year;
            let day = 1;

            while (currentWeek.length < 7) {
                currentWeek.push({
                    date: this.formatDate(nextMonthYear, nextMonth, day),
                    day: day,
                    month: nextMonth,
                    year: nextMonthYear,
                    isCurrentMonth: false,
                    isToday: this.isToday(nextMonthYear, nextMonth, day),
                    isWeekend: this.isWeekend(nextMonthYear, nextMonth, day),
                    dayOfWeek: (currentWeek.length + firstDayOfWeek) % 7,
                });
                day++;
            }

            weeks.push(currentWeek);
        }

        return weeks;
    },

    /**
     * Format a date as YYYY-MM-DD.
     */
    formatDate(year, month, day) {
        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        return `${year}-${monthStr}-${dayStr}`;
    },

    /**
     * Parse a date string (YYYY-MM-DD) to date components.
     */
    parseDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return { year, month: month - 1, day };
    },

    /**
     * Check if a date is today.
     */
    isToday(year, month, day) {
        const today = new Date();
        return (
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day
        );
    },

    /**
     * Check if a date is a weekend.
     */
    isWeekend(year, month, day) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6;
    },

    /**
     * Compare two dates.
     */
    compareDates(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        if (d1 < d2) return -1;
        if (d1 > d2) return 1;
        return 0;
    },

    /**
     * Check if date1 is before date2.
     */
    isBefore(date1, date2) {
        return this.compareDates(date1, date2) === -1;
    },

    /**
     * Check if date1 is after date2.
     */
    isAfter(date1, date2) {
        return this.compareDates(date1, date2) === 1;
    },

    /**
     * Check if two dates are the same.
     */
    isSameDate(date1, date2) {
        return this.compareDates(date1, date2) === 0;
    },

    /**
     * Get an array of day names.
     */
    getDayNames(firstDayOfWeek = 0, locale = 'en-US', format = 'short') {
        const baseDate = new Date(2024, 0, 7);
        const days = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(baseDate);
            date.setDate(baseDate.getDate() + ((i + firstDayOfWeek) % 7));

            const formatter = new Intl.DateTimeFormat(locale, { weekday: format });
            days.push(formatter.format(date));
        }

        return days;
    },

    /**
     * Get the current date as YYYY-MM-DD.
     */
    today() {
        const now = new Date();
        return this.formatDate(now.getFullYear(), now.getMonth(), now.getDate());
    },

    /**
     * Get the difference in days between two dates.
     */
    getDaysDifference(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    },

    /**
     * Check if a date is within a range (inclusive).
     */
    isWithinRange(dateString, startDate, endDate) {
        return (
            (this.isSameDate(dateString, startDate) || this.isAfter(dateString, startDate)) &&
            (this.isSameDate(dateString, endDate) || this.isBefore(dateString, endDate))
        );
    },

};
