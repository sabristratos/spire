// Calendar
export const CALENDAR_YEAR_RANGE_PAST = 50;
export const CALENDAR_YEAR_RANGE_FUTURE = 50;

// Datepicker - Date Format Patterns
export const DATE_FORMAT_PATTERNS = {
    'MM/DD/YYYY': {
        order: ['month', 'day', 'year'],
        separator: '/',
        regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
        locales: ['en-US', 'en-us'],
    },
    'DD/MM/YYYY': {
        order: ['day', 'month', 'year'],
        separator: '/',
        regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
        locales: ['en-GB', 'en-gb', 'fr', 'fr-FR', 'fr-fr', 'de', 'de-DE', 'de-de', 'es', 'es-ES', 'es-es', 'it', 'it-IT', 'it-it', 'pt', 'pt-PT', 'pt-pt', 'nl', 'nl-NL', 'nl-nl'],
    },
    'YYYY-MM-DD': {
        order: ['year', 'month', 'day'],
        separator: '-',
        regex: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
        locales: ['zh', 'zh-CN', 'zh-cn', 'ja', 'ja-JP', 'ja-jp', 'ko', 'ko-KR', 'ko-kr', 'sv', 'sv-SE', 'sv-se'],
    },
};

export const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';

// Animations & Delays
export const ANIMATION_DURATION_FAST = 150;
export const ANIMATION_DURATION_NORMAL = 300;
export const HOVER_DELAY_MS = 300;

// Debounce & Throttle
export const DEBOUNCE_DEFAULT_MS = 300;
export const SCROLL_DEBOUNCE_MS = 150;
export const TYPEAHEAD_TIMEOUT_MS = 500;
export const BLUR_TIMEOUT_MS = 150;

// Timepicker
export const TIMEPICKER_ITEM_HEIGHT = 40;
export const TIMEPICKER_PADDING = 40;
export const TIMEPICKER_VIEWPORT_HEIGHT = 120;
export const TIMEPICKER_MAX_DISTANCE = 40;
export const TIMEPICKER_SCROLL_ANIMATION_DELAY = 100;
