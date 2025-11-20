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

// Timepicker Dimensions
export const TIMEPICKER_ITEM_HEIGHT = 40;
export const TIMEPICKER_PADDING = 40;
export const TIMEPICKER_VIEWPORT_HEIGHT = 120;
export const TIMEPICKER_MAX_DISTANCE = 40;
export const TIMEPICKER_SCROLL_ANIMATION_DELAY = 100;

// Timepicker Defaults
export const TIMEPICKER_DEFAULTS = {
    MINUTE_STEP: 1,
    SHOW_SECONDS: false,
    DEFAULT_HOUR_12: 12,
    DEFAULT_HOUR_24: 0,
    DEFAULT_MINUTE: 0,
    DEFAULT_SECOND: 0,
    DEFAULT_PERIOD: 'AM',
    PERIOD_OPTIONS: ['AM', 'PM'],
};

// Slider Defaults
export const SLIDER_DEFAULTS = {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    MODE: 'single',
    SHOW_TOOLTIP: true,
};

// Carousel Defaults
export const CAROUSEL_DEFAULTS = {
    AUTOPLAY: false,
    INTERVAL: 5000,
    LOOP: false,
    PAUSE_ON_HOVER: true,
    PAUSE_ON_FOCUS: true,
    ITEMS_PER_VIEW: 1,
};

export const CAROUSEL_SCROLL_ANIMATION_DURATION = 500;
export const CAROUSEL_SCROLL_END_TOLERANCE = 5;

export const CAROUSEL_DEFAULT_BREAKPOINTS = {
    xs: '30rem',
    sm: '40rem',
    md: '48rem',
    lg: '64rem',
    xl: '80rem',
    '2xl': '96rem',
    '3xl': '120rem',
};

// Rating Defaults
export const RATING_DEFAULTS = {
    MAX_RATING: 5,
    DEFAULT_COLOR: 'warning',
    ALLOW_HALF: false,
};

// Date Segment Validation Ranges
export const DATE_SEGMENT_RANGES = {
    MONTH: { min: 1, max: 12 },
    DAY: { min: 1, max: 31 },
    YEAR: { min: 1000, max: 9999 },
};

// Icon Sizes (consolidated from components)
export const ICON_SIZES = {
    checkbox: {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    },
    rating: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    },
    badge_dot: {
        sm: 'w-1.5 h-1.5',
        md: 'w-2 h-2',
        lg: 'w-2.5 h-2.5',
    },
};
