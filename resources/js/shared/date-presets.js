import { CalendarUtils } from '../../views/components/calendar/calendar-utils';

/**
 * Date preset keys for range selection
 */
export const DATE_PRESETS = {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    LAST_7_DAYS: 'last_7_days',
    LAST_14_DAYS: 'last_14_days',
    LAST_30_DAYS: 'last_30_days',
    LAST_60_DAYS: 'last_60_days',
    LAST_90_DAYS: 'last_90_days',
    THIS_WEEK: 'this_week',
    LAST_WEEK: 'last_week',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    THIS_QUARTER: 'this_quarter',
    LAST_QUARTER: 'last_quarter',
    THIS_YEAR: 'this_year',
    LAST_YEAR: 'last_year',
};

/**
 * Calculate date range for a given preset
 *
 * @param {Object|string} preset - The preset object or key string
 * @param {number} firstDayOfWeek - First day of week (0 = Sunday, 1 = Monday)
 * @returns {Object|null} - { start: string, end: string } or null if invalid preset
 */
export function calculatePresetRange(preset, firstDayOfWeek = 0) {
    if (preset && typeof preset === 'object') {
        if (preset.start && preset.end) {
            return { start: preset.start, end: preset.end };
        }

        if (typeof preset.calculate === 'function') {
            return preset.calculate();
        }
    }

    const presetKey = typeof preset === 'string' ? preset : preset?.key;
    if (!presetKey) {
        return null;
    }

    const today = new Date();
    const utils = CalendarUtils;

    switch (presetKey) {
        case DATE_PRESETS.TODAY:
        case 'today':
            return {
                start: utils.today(),
                end: utils.today()
            };

        case DATE_PRESETS.YESTERDAY:
        case 'yesterday': {
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const dateStr = utils.formatDate(
                yesterday.getFullYear(),
                yesterday.getMonth(),
                yesterday.getDate()
            );
            return { start: dateStr, end: dateStr };
        }

        case DATE_PRESETS.LAST_7_DAYS:
        case 'last_7_days': {
            const start = new Date(today);
            start.setDate(today.getDate() - 6);
            return {
                start: utils.formatDate(
                    start.getFullYear(),
                    start.getMonth(),
                    start.getDate()
                ),
                end: utils.today()
            };
        }

        case DATE_PRESETS.LAST_14_DAYS:
        case 'last_14_days': {
            const start = new Date(today);
            start.setDate(today.getDate() - 13);
            return {
                start: utils.formatDate(
                    start.getFullYear(),
                    start.getMonth(),
                    start.getDate()
                ),
                end: utils.today()
            };
        }

        case DATE_PRESETS.LAST_30_DAYS:
        case 'last_30_days': {
            const start = new Date(today);
            start.setDate(today.getDate() - 29);
            return {
                start: utils.formatDate(
                    start.getFullYear(),
                    start.getMonth(),
                    start.getDate()
                ),
                end: utils.today()
            };
        }

        case DATE_PRESETS.LAST_60_DAYS:
        case 'last_60_days': {
            const start = new Date(today);
            start.setDate(today.getDate() - 59);
            return {
                start: utils.formatDate(
                    start.getFullYear(),
                    start.getMonth(),
                    start.getDate()
                ),
                end: utils.today()
            };
        }

        case DATE_PRESETS.LAST_90_DAYS:
        case 'last_90_days': {
            const start = new Date(today);
            start.setDate(today.getDate() - 89);
            return {
                start: utils.formatDate(
                    start.getFullYear(),
                    start.getMonth(),
                    start.getDate()
                ),
                end: utils.today()
            };
        }

        case DATE_PRESETS.THIS_WEEK:
        case 'this_week': {
            const { start, end } = utils.getWeekRange(utils.today(), firstDayOfWeek);
            return { start, end };
        }

        case DATE_PRESETS.LAST_WEEK:
        case 'last_week': {
            const lastWeekDate = new Date(today);
            lastWeekDate.setDate(today.getDate() - 7);
            const lastWeekDateString = utils.formatDate(
                lastWeekDate.getFullYear(),
                lastWeekDate.getMonth(),
                lastWeekDate.getDate()
            );
            const { start, end } = utils.getWeekRange(lastWeekDateString, firstDayOfWeek);
            return { start, end };
        }

        case DATE_PRESETS.THIS_MONTH:
        case 'this_month':
            return {
                start: utils.formatDate(today.getFullYear(), today.getMonth(), 1),
                end: utils.today()
            };

        case DATE_PRESETS.LAST_MONTH:
        case 'last_month': {
            const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
            const lastMonthYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
            const lastDayOfLastMonth = new Date(lastMonthYear, lastMonth + 1, 0).getDate();
            return {
                start: utils.formatDate(lastMonthYear, lastMonth, 1),
                end: utils.formatDate(lastMonthYear, lastMonth, lastDayOfLastMonth)
            };
        }

        case DATE_PRESETS.THIS_QUARTER:
        case 'this_quarter': {
            const quarterMonth = Math.floor(today.getMonth() / 3) * 3;
            return {
                start: utils.formatDate(today.getFullYear(), quarterMonth, 1),
                end: utils.today()
            };
        }

        case DATE_PRESETS.LAST_QUARTER:
        case 'last_quarter': {
            const currentQuarter = Math.floor(today.getMonth() / 3);
            let lastQuarterStart, lastQuarterYear;

            if (currentQuarter === 0) {
                lastQuarterStart = 9;
                lastQuarterYear = today.getFullYear() - 1;
            } else {
                lastQuarterStart = (currentQuarter - 1) * 3;
                lastQuarterYear = today.getFullYear();
            }

            const lastQuarterEnd = lastQuarterStart + 2;
            const lastDayOfQuarter = new Date(lastQuarterYear, lastQuarterEnd + 1, 0).getDate();

            return {
                start: utils.formatDate(lastQuarterYear, lastQuarterStart, 1),
                end: utils.formatDate(lastQuarterYear, lastQuarterEnd, lastDayOfQuarter)
            };
        }

        case DATE_PRESETS.THIS_YEAR:
        case 'this_year':
            return {
                start: utils.formatDate(today.getFullYear(), 0, 1),
                end: utils.today()
            };

        case DATE_PRESETS.LAST_YEAR:
        case 'last_year': {
            const lastYear = today.getFullYear() - 1;
            return {
                start: utils.formatDate(lastYear, 0, 1),
                end: utils.formatDate(lastYear, 11, 31)
            };
        }

        default:
            return null;
    }
}
