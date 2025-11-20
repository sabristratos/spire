/**
 * Date formatting utilities using native Intl API.
 * Provides localized date and time formatting with zero dependencies.
 */

export const DateFormatter = {
    /**
     * Format a date using predefined formats.
     */
    format(dateString, format = 'medium', locale = 'en-US') {
        const date = new Date(dateString);

        switch (format) {
            case 'short':
                return this.shortFormat(date, locale);
            case 'medium':
                return this.mediumFormat(date, locale);
            case 'long':
                return this.longFormat(date, locale);
            case 'full':
                return this.fullFormat(date, locale);
            case 'iso':
                return date.toISOString();
            case 'iso_date':
                return dateString.split('T')[0];
            default:
                return date.toLocaleDateString(locale);
        }
    },

    /**
     * Format date in short format (e.g., "11/14/2025" or "14/11/2025").
     */
    shortFormat(date, locale = 'en-US') {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }).format(date);
    },

    /**
     * Format date in medium format (e.g., "Nov 14, 2025").
     */
    mediumFormat(date, locale = 'en-US') {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date);
    },

    /**
     * Format date in long format (e.g., "November 14, 2025").
     */
    longFormat(date, locale = 'en-US') {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    },

    /**
     * Format date in full format (e.g., "Thursday, November 14, 2025").
     */
    fullFormat(date, locale = 'en-US') {
        return new Intl.DateTimeFormat(locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    },

    /**
     * Format time (e.g., "3:45 PM" or "15:45").
     */
    formatTime(dateString, use24Hour = false, locale = 'en-US') {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat(locale, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: !use24Hour,
        }).format(date);
    },

    /**
     * Format datetime.
     */
    formatDateTime(dateString, dateFormat = 'medium', use24Hour = false, locale = 'en-US') {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: dateFormat === 'short' ? 'numeric' : dateFormat === 'long' ? 'long' : 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: !use24Hour,
        }).format(date);
    },

    /**
     * Format date relative to now (approximate).
     */
    relative(dateString, locale = 'en-US') {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (typeof Intl.RelativeTimeFormat !== 'undefined') {
            const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

            if (diffDays > 0) {
                return rtf.format(-diffDays, 'day');
            } else if (diffHours > 0) {
                return rtf.format(-diffHours, 'hour');
            } else if (diffMins > 0) {
                return rtf.format(-diffMins, 'minute');
            } else {
                return rtf.format(-diffSecs, 'second');
            }
        }

        if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffMins > 0) {
            return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        } else {
            return 'just now';
        }
    },

    /**
     * Get localized month name.
     */
    getMonthName(monthIndex, format = 'long', locale = 'en-US') {
        const date = new Date(2024, monthIndex, 1);
        return new Intl.DateTimeFormat(locale, { month: format }).format(date);
    },

    /**
     * Get localized day name.
     */
    getDayName(dayOfWeek, format = 'long', locale = 'en-US') {
        const date = new Date(2024, 0, 7 + dayOfWeek);
        return new Intl.DateTimeFormat(locale, { weekday: format }).format(date);
    },

    /**
     * Get all month names for a locale.
     */
    getMonthNames(format = 'long', locale = 'en-US') {
        const months = [];
        for (let i = 0; i < 12; i++) {
            months.push(this.getMonthName(i, format, locale));
        }
        return months;
    },

    /**
     * Get all day names for a locale.
     */
    getDayNames(format = 'long', locale = 'en-US', firstDayOfWeek = 0) {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const dayIndex = (i + firstDayOfWeek) % 7;
            days.push(this.getDayName(dayIndex, format, locale));
        }
        return days;
    },

    /**
     * Format a date range.
     */
    formatRange(startDate, endDate, format = 'medium', locale = 'en-US') {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (typeof Intl.DateTimeFormat.prototype.formatRange !== 'undefined') {
            const options = format === 'short'
                ? { year: 'numeric', month: 'numeric', day: 'numeric' }
                : format === 'long'
                ? { year: 'numeric', month: 'long', day: 'numeric' }
                : { year: 'numeric', month: 'short', day: 'numeric' };

            return new Intl.DateTimeFormat(locale, options).formatRange(start, end);
        }

        return `${this.format(startDate, format, locale)} – ${this.format(endDate, format, locale)}`;
    },

    /**
     * Check if the locale uses RTL direction.
     */
    isRTL(locale = 'en-US') {
        return locale.startsWith('ar') || locale.startsWith('he');
    },

    /**
     * Get the first day of week for a locale.
     */
    getFirstDayOfWeek(locale = 'en-US') {
        if (locale.startsWith('ar')) return 6;
        if (locale.startsWith('fr')) return 1;
        return 0;
    },

    /**
     * Parse a date string to components.
     */
    parse(dateString, format = 'iso') {
        if (format === 'iso') {
            const [year, month, day] = dateString.split('-').map(Number);
            return { year, month: month - 1, day };
        }

        const date = new Date(dateString);
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
        };
    },

    /**
     * Get ARIA label for a date (for accessibility).
     */
    getAriaLabel(dateString, locale = 'en-US') {
        const date = new Date(dateString);
        return this.fullFormat(date, locale);
    },
};
