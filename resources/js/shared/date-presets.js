import { CalendarUtils } from '../../views/components/calendar/calendar-utils';

/**
 * Date preset keys for range selection
 */
export const DATE_PRESETS = {
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    THIS_WEEK: 'this_week',
    LAST_WEEK: 'last_week',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
};

/**
 * Calculate date range for a given preset
 *
 * @param {string} presetKey - The preset key from DATE_PRESETS
 * @param {number} firstDayOfWeek - First day of week (0 = Sunday, 1 = Monday)
 * @returns {Object|null} - { start: string, end: string } or null if invalid preset
 */
export function calculatePresetRange(presetKey, firstDayOfWeek = 0) {
    const today = new Date();
    const utils = CalendarUtils;

    switch (presetKey) {
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

        default:
            return null;
    }
}
