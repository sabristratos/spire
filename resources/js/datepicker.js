import { overlay } from './overlay';
import { calendarState } from './calendar-state';
import { CalendarUtils } from './calendar-utils';
import { DATE_FORMAT_PATTERNS, DEFAULT_DATE_FORMAT } from './component-constants';

export function datepickerComponent(config = {}) {
    return {
        ...overlay({
            trigger: 'click',
            onInit() {
                this.parseInitialValue();
                this.updateCalendar();

                this.$watch('value', (newValue) => {
                    this.parseInitialValue();
                    if (this.mode === 'single') {
                        this.syncValueToSegments();
                    }
                });

                if (this.mode === 'single') {
                    this.syncValueToSegments();
                }
            }
        }),

        ...calendarState({
            mode: config.mode || 'single',
            value: config.value || (config.mode === 'range' ? { start: '', end: '' } : config.mode === 'multiple' ? [] : ''),
            locale: config.locale || null,
            firstDayOfWeek: config.firstDayOfWeek !== undefined ? config.firstDayOfWeek : null,
            minDate: config.minDate || null,
            maxDate: config.maxDate || null,
            disabledDates: config.disabledDates || [],
            disabledDaysOfWeek: config.disabledDaysOfWeek || [],
            maxRange: config.maxRange || null,
            minRange: config.minRange || null,
            maxDates: config.maxDates || null,
        }),

        placeholder: config.placeholder || 'Select date',

        todayText: config.todayText || 'Today',
        clearText: config.clearText || 'Clear',
        monthLabel: config.monthLabel || 'Month',
        dayLabel: config.dayLabel || 'Day',
        yearLabel: config.yearLabel || 'Year',

        format: config.format || 'auto',

        month: null,
        day: null,
        year: null,

        segmentValues: {
            month: '',
            day: '',
            year: ''
        },

        focusedSegment: null,

        get formattedRangeStart() {
            if (this.mode !== 'range' || !this.value?.start) return '';
            return this.formatDate(this.value.start);
        },

        get formattedRangeEnd() {
            if (this.mode !== 'range' || !this.value?.end) return '';
            return this.formatDate(this.value.end);
        },

        get formattedMultiple() {
            if (this.mode !== 'multiple' || !Array.isArray(this.value) || this.value.length === 0) return '';
            if (this.value.length === 1) {
                return this.formatDate(this.value[0]);
            }
            return `${this.formatDate(this.value[0])} +${this.value.length - 1}`;
        },

        get selectedCount() {
            if (this.mode !== 'multiple' || !Array.isArray(this.value)) return 0;
            return this.value.length;
        },

        formatDate(dateString) {
            if (!dateString) return '';

            try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return '';

                return new Intl.DateTimeFormat(this.getLocale(), {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).format(date);
            } catch (e) {
                return '';
            }
        },

        get formattedDate() {
            if (this.mode !== 'single' || !this.value) return '';
            return this.formatDate(this.value);
        },

        get segmentOrder() {
            return this.getFormatPattern().order;
        },

        get segmentSeparator() {
            return this.getFormatPattern().separator;
        },

        getLocale() {
            return this.locale || navigator.language || 'en-US';
        },

        getDateFormatString() {
            if (this.format && this.format !== 'auto') {
                return this.format;
            }

            const locale = this.getLocale();

            for (const [formatString, pattern] of Object.entries(DATE_FORMAT_PATTERNS)) {
                if (pattern.locales.some(l => locale.toLowerCase().startsWith(l.toLowerCase()))) {
                    return formatString;
                }
            }

            return DEFAULT_DATE_FORMAT;
        },

        getFormatPattern() {
            const formatString = this.getDateFormatString();
            return DATE_FORMAT_PATTERNS[formatString] || DATE_FORMAT_PATTERNS[DEFAULT_DATE_FORMAT];
        },

        getSegmentPlaceholders() {
            const formatString = this.getDateFormatString();

            const placeholders = {
                month: formatString === 'YYYY-MM-DD' ? 'MM' : 'MM',
                day: 'DD',
                year: formatString === 'YYYY-MM-DD' ? 'YYYY' : 'YYYY'
            };

            return placeholders;
        },

        parseInitialValue() {
            if (this.mode === 'single') {
                if (!this.value) {
                    this.month = null;
                    this.day = null;
                    this.year = null;
                    return;
                }

                const dateMatch = this.value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
                if (!dateMatch) {
                    return;
                }

                this.year = parseInt(dateMatch[1], 10);
                this.month = parseInt(dateMatch[2], 10);
                this.day = parseInt(dateMatch[3], 10);
            }
        },

        getDateString() {
            if (this.month === null || this.day === null || this.year === null) {
                return '';
            }

            const yearStr = String(this.year).padStart(4, '0');
            const monthStr = String(this.month).padStart(2, '0');
            const dayStr = String(this.day).padStart(2, '0');

            return `${yearStr}-${monthStr}-${dayStr}`;
        },

        updateValue() {
            if (this.mode === 'single') {
                this.value = this.getDateString();
            }
        },

        setToday() {
            const today = new Date();
            const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            if (this.mode === 'single') {
                this.year = today.getFullYear();
                this.month = today.getMonth() + 1;
                this.day = today.getDate();
                this.updateValue();
                this.syncValueToSegments();
            } else if (this.mode === 'range') {
                this.value = { start: todayString, end: todayString };
            } else if (this.mode === 'multiple') {
                if (!Array.isArray(this.value)) {
                    this.value = [];
                }
                if (!this.value.includes(todayString)) {
                    this.value = [...this.value, todayString];
                }
            }
        },

        clearDate() {
            if (this.mode === 'single') {
                this.value = '';
                this.month = null;
                this.day = null;
                this.year = null;
                this.segmentValues = { month: '', day: '', year: '' };
            } else if (this.mode === 'range') {
                this.value = { start: '', end: '' };
            } else if (this.mode === 'multiple') {
                this.value = [];
            }
            this.hide();
        },

        syncValueToSegments() {
            if (this.mode !== 'single') return;

            this.segmentValues.month = this.month !== null && this.month !== undefined ? String(this.month).padStart(2, '0') : '';
            this.segmentValues.day = this.day !== null && this.day !== undefined ? String(this.day).padStart(2, '0') : '';
            this.segmentValues.year = this.year !== null && this.year !== undefined ? String(this.year).padStart(4, '0') : '';
        },

        syncSegmentsToValue() {
            if (this.mode !== 'single') return;

            const month = parseInt(this.segmentValues.month, 10);
            const day = parseInt(this.segmentValues.day, 10);
            const year = parseInt(this.segmentValues.year, 10);

            if (!isNaN(month) && month >= 1 && month <= 12) {
                this.month = month;
            }

            if (!isNaN(day) && day >= 1 && day <= 31) {
                this.day = day;
            }

            if (!isNaN(year) && year >= 1000 && year <= 9999) {
                this.year = year;
            }

            this.updateValue();
        },

        handleSegmentInput(type, event) {
            if (this.mode !== 'single') return;

            const input = event.target;
            let value = input.value.replace(/\D/g, '');

            if (type === 'month') {
                let numValue = parseInt(value, 10);

                if (value.length === 2) {
                    if (numValue > 12) {
                        value = '12';
                    } else if (numValue < 1) {
                        value = '01';
                    }
                    this.segmentValues.month = value;
                    this.syncSegmentsToValue();
                    this.focusNextSegment('month');
                } else if (value.length === 1) {
                    if (numValue > 1) {
                        value = value.padStart(2, '0');
                        this.segmentValues.month = value;
                        this.syncSegmentsToValue();
                        this.focusNextSegment('month');
                    } else {
                        this.segmentValues.month = value;
                    }
                } else {
                    this.segmentValues.month = value;
                }
            } else if (type === 'day') {
                let numValue = parseInt(value, 10);

                if (value.length === 2) {
                    if (numValue > 31) {
                        value = '31';
                    } else if (numValue < 1) {
                        value = '01';
                    }
                    this.segmentValues.day = value;
                    this.syncSegmentsToValue();
                    this.focusNextSegment('day');
                } else if (value.length === 1) {
                    if (numValue > 3) {
                        value = value.padStart(2, '0');
                        this.segmentValues.day = value;
                        this.syncSegmentsToValue();
                        this.focusNextSegment('day');
                    } else {
                        this.segmentValues.day = value;
                    }
                } else {
                    this.segmentValues.day = value;
                }
            } else if (type === 'year') {
                if (value.length === 4) {
                    this.segmentValues.year = value;
                    this.syncSegmentsToValue();
                } else if (value.length > 4) {
                    value = value.slice(0, 4);
                    this.segmentValues.year = value;
                    this.syncSegmentsToValue();
                } else {
                    this.segmentValues.year = value;
                }
            }
        },

        handleSegmentKeydown(type, event) {
            if (this.mode !== 'single') return;

            const input = event.target;

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                this.focusPrevSegment(type);
            } else if (event.key === 'ArrowRight' || event.key === '/') {
                event.preventDefault();
                this.focusNextSegment(type);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                this.incrementSegment(type);
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                this.decrementSegment(type);
            } else if (event.key === 'Backspace' && input.value === '') {
                event.preventDefault();
                this.focusPrevSegment(type);
            }
        },

        handleSegmentPaste(event) {
            if (this.mode !== 'single') return;

            const pastedText = event.clipboardData.getData('text');
            const parsed = this.parseDateString(pastedText);

            if (parsed) {
                this.segmentValues.month = parsed.month;
                this.segmentValues.day = parsed.day;
                this.segmentValues.year = parsed.year;
                this.syncSegmentsToValue();
            }
        },

        parseDateString(str) {
            for (const [formatString, pattern] of Object.entries(DATE_FORMAT_PATTERNS)) {
                const match = str.match(pattern.regex);
                if (match) {
                    const parts = {};

                    if (formatString === 'MM/DD/YYYY') {
                        parts.month = match[1].padStart(2, '0');
                        parts.day = match[2].padStart(2, '0');
                        parts.year = match[3];
                    } else if (formatString === 'DD/MM/YYYY') {
                        parts.day = match[1].padStart(2, '0');
                        parts.month = match[2].padStart(2, '0');
                        parts.year = match[3];
                    } else if (formatString === 'YYYY-MM-DD') {
                        parts.year = match[1];
                        parts.month = match[2].padStart(2, '0');
                        parts.day = match[3].padStart(2, '0');
                    }

                    return parts;
                }
            }

            return null;
        },

        focusNextSegment(currentType) {
            if (this.mode !== 'single') return;

            const currentIndex = this.segmentOrder.indexOf(currentType);
            const nextIndex = currentIndex + 1;

            if (nextIndex < this.segmentOrder.length) {
                const nextSegment = this.segmentOrder[nextIndex];
                const nextRef = this.$refs[`${nextSegment}Segment`];

                if (nextRef) {
                    this.$nextTick(() => {
                        nextRef.focus();
                        if (nextRef.select) {
                            nextRef.select();
                        }
                    });
                }
            }
        },

        focusPrevSegment(currentType) {
            if (this.mode !== 'single') return;

            const currentIndex = this.segmentOrder.indexOf(currentType);
            const prevIndex = currentIndex - 1;

            if (prevIndex >= 0) {
                const prevSegment = this.segmentOrder[prevIndex];
                const prevRef = this.$refs[`${prevSegment}Segment`];

                if (prevRef) {
                    this.$nextTick(() => {
                        prevRef.focus();
                        if (prevRef.select) {
                            prevRef.select();
                        }
                    });
                }
            }
        },

        incrementSegment(type) {
            if (this.mode !== 'single') return;

            if (type === 'month') {
                const currentMonth = parseInt(this.segmentValues.month, 10) || 1;
                const newMonth = currentMonth >= 12 ? 1 : currentMonth + 1;
                this.segmentValues.month = String(newMonth).padStart(2, '0');
            } else if (type === 'day') {
                const currentDay = parseInt(this.segmentValues.day, 10) || 1;
                const newDay = currentDay >= 31 ? 1 : currentDay + 1;
                this.segmentValues.day = String(newDay).padStart(2, '0');
            } else if (type === 'year') {
                const currentYear = parseInt(this.segmentValues.year, 10) || new Date().getFullYear();
                this.segmentValues.year = String(currentYear + 1).padStart(4, '0');
            }

            this.syncSegmentsToValue();
        },

        decrementSegment(type) {
            if (this.mode !== 'single') return;

            if (type === 'month') {
                const currentMonth = parseInt(this.segmentValues.month, 10) || 1;
                const newMonth = currentMonth <= 1 ? 12 : currentMonth - 1;
                this.segmentValues.month = String(newMonth).padStart(2, '0');
            } else if (type === 'day') {
                const currentDay = parseInt(this.segmentValues.day, 10) || 1;
                const newDay = currentDay <= 1 ? 31 : currentDay - 1;
                this.segmentValues.day = String(newDay).padStart(2, '0');
            } else if (type === 'year') {
                const currentYear = parseInt(this.segmentValues.year, 10) || new Date().getFullYear();
                this.segmentValues.year = String(currentYear - 1).padStart(4, '0');
            }

            this.syncSegmentsToValue();
        },

        handleCalendarSelect(date) {
            this.value = date;

            if (this.mode === 'single') {
                this.parseInitialValue();
                this.syncValueToSegments();
                this.hide();
            } else if (this.mode === 'range') {
                if (date.end) {
                    this.hide();
                }
            }
        }
    };
}
