import { overlay } from './overlay';
import { DateFormatter } from './date-formatter';
import {
    SCROLL_DEBOUNCE_MS,
    TIMEPICKER_ITEM_HEIGHT,
    TIMEPICKER_PADDING,
    TIMEPICKER_VIEWPORT_HEIGHT,
    TIMEPICKER_MAX_DISTANCE,
    TIMEPICKER_SCROLL_ANIMATION_DELAY
} from './component-constants';

export function timepickerComponent(config = {}) {
    return {
        ...overlay({
            trigger: 'click',
            onInit() {
                this.detectLocaleSettings();
                this.generateTimeOptions();
                this.parseInitialValue();

                this.$watch('value', (newValue) => {
                    this.parseInitialValue();
                    this.syncValueToSegments();
                });

                this.$watch('open', (isOpen) => {
                    if (isOpen) {
                        this.$nextTick(() => {
                            this.scrollToSelected();
                            this.setupScrollendListeners();
                        });
                    }
                });

                this.syncValueToSegments();
            }
        }),

        setupScrollendListeners() {
            if ('onscrollend' in window) {
                ['hour', 'minute', 'second', 'period'].forEach(type => {
                    const column = this.$refs[`${type}Column`];
                    if (column && !column.dataset.scrollendAttached) {
                        const handler = () => {
                            this.selectCenteredItem(type);
                        };
                        column.addEventListener('scrollend', handler);
                        column.dataset.scrollendAttached = 'true';
                        this.scrollListeners.push({ column, handler });
                    }
                });
            }
        },

        scrollListeners: [],
        value: config.value || '',
        placeholder: config.placeholder || 'Select time',
        use24Hour: config.use24Hour,
        minuteStep: config.minuteStep || 1,
        showSeconds: config.showSeconds || false,

        nowText: config.nowText || 'Now',
        clearText: config.clearText || 'Clear',
        hourLabel: config.hourLabel || 'Hour',
        minuteLabel: config.minuteLabel || 'Minute',
        secondLabel: config.secondLabel || 'Second',
        periodLabel: config.periodLabel || 'AM/PM',

        hour: 12,
        minute: 0,
        second: 0,
        period: 'AM',

        hourOptions: [],
        minuteOptions: [],
        secondOptions: [],
        periodOptions: [
            { value: 'AM', label: 'AM' },
            { value: 'PM', label: 'PM' }
        ],

        scrollDebounce: {},

        segmentValues: {
            hour: '',
            minute: '',
            second: '',
            period: 'AM'
        },

        focusedSegment: null,

        get formattedTime() {
            if (!this.value) return '';

            try {
                const timeString = this.getTimeString();
                const date = new Date(`1970-01-01T${timeString}`);

                if (isNaN(date.getTime())) return '';

                return new Intl.DateTimeFormat(this.getLocale(), {
                    hour: 'numeric',
                    minute: '2-digit',
                    ...(this.showSeconds && { second: '2-digit' }),
                    hour12: !this.use24Hour,
                }).format(date);
            } catch (e) {
                return '';
            }
        },

        get segmentOrder() {
            const segments = ['hour', 'minute'];
            if (this.showSeconds) {
                segments.push('second');
            }
            if (!this.use24Hour) {
                segments.push('period');
            }
            return segments;
        },

        getLocale() {
            return navigator.language || 'en-US';
        },

        detectLocaleSettings() {
            if (this.use24Hour === null) {
                const locale = this.getLocale();
                const date = new Date('1970-01-01T15:00:00');
                const timeString = new Intl.DateTimeFormat(locale, {
                    hour: 'numeric',
                    hour12: undefined,
                }).format(date);

                this.use24Hour = !timeString.toLowerCase().includes('pm') && !timeString.toLowerCase().includes('am');
            }
        },

        generateTimeOptions() {
            if (this.use24Hour) {
                this.hourOptions = Array.from({ length: 24 }, (_, i) => ({
                    value: i,
                    label: String(i).padStart(2, '0')
                }));
            } else {
                this.hourOptions = Array.from({ length: 12 }, (_, i) => ({
                    value: i + 1,
                    label: String(i + 1).padStart(2, '0')
                }));
            }

            const minuteCount = Math.floor(60 / this.minuteStep);
            this.minuteOptions = Array.from({ length: minuteCount }, (_, i) => {
                const value = i * this.minuteStep;
                return {
                    value: value,
                    label: String(value).padStart(2, '0')
                };
            });

            if (this.showSeconds) {
                this.secondOptions = Array.from({ length: 60 }, (_, i) => ({
                    value: i,
                    label: String(i).padStart(2, '0')
                }));
            }
        },

        parseInitialValue() {
            if (!this.value) {
                if (this.use24Hour === false) {
                    this.hour = 12;
                    this.period = 'AM';
                } else if (this.use24Hour === true) {
                    this.hour = 0;
                } else {
                    this.hour = 12;
                    this.period = 'AM';
                }
                this.minute = 0;
                this.second = 0;
                return;
            }

            const timeMatch = this.value.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
            if (!timeMatch) return;

            let hour = parseInt(timeMatch[1], 10);
            const minute = parseInt(timeMatch[2], 10);
            const second = timeMatch[3] ? parseInt(timeMatch[3], 10) : 0;

            if (this.use24Hour) {
                this.hour = hour;
                this.minute = minute;
                this.second = second;
            } else {
                this.period = hour >= 12 ? 'PM' : 'AM';
                this.hour = hour % 12 || 12;
                this.minute = minute;
                this.second = second;
            }
        },

        getTimeString() {
            let hour24 = this.hour;

            if (!this.use24Hour) {
                if (this.period === 'PM' && this.hour !== 12) {
                    hour24 = this.hour + 12;
                } else if (this.period === 'AM' && this.hour === 12) {
                    hour24 = 0;
                }
            }

            const hourStr = String(hour24).padStart(2, '0');
            const minuteStr = String(this.minute).padStart(2, '0');
            const secondStr = String(this.second).padStart(2, '0');

            if (this.showSeconds) {
                return `${hourStr}:${minuteStr}:${secondStr}`;
            }

            return `${hourStr}:${minuteStr}`;
        },

        updateValue() {
            this.value = this.getTimeString();
        },

        selectHour(value) {
            this.hour = value;
            this.updateValue();
            this.$nextTick(() => {
                this.scrollToSelected('hour');
            });
        },

        selectMinute(value) {
            this.minute = value;
            this.updateValue();
            this.$nextTick(() => {
                this.scrollToSelected('minute');
            });
        },

        selectSecond(value) {
            this.second = value;
            this.updateValue();
            this.$nextTick(() => {
                this.scrollToSelected('second');
            });
        },

        selectPeriod(value) {
            this.period = value;
            this.updateValue();
            this.$nextTick(() => {
                this.scrollToSelected('period');
            });
        },

        setNow() {
            const now = new Date();
            this.hour = this.use24Hour ? now.getHours() : (now.getHours() % 12 || 12);
            this.minute = Math.floor(now.getMinutes() / this.minuteStep) * this.minuteStep;
            this.second = now.getSeconds();
            this.period = now.getHours() >= 12 ? 'PM' : 'AM';
            this.updateValue();
            this.$nextTick(() => {
                this.scrollToSelected();
            });
        },

        clearTime() {
            this.value = '';
            this.hide();
        },

        updateItemStyles(type) {
            const column = this.$refs[`${type}Column`];
            if (!column) return;

            const columnRect = column.getBoundingClientRect();
            const columnCenter = columnRect.top + columnRect.height / 2;
            const items = column.querySelectorAll(`[data-spire-time-${type}]`);
            const currentValue = this[type];

            items.forEach(item => {
                const itemValue = type === 'period'
                    ? item.getAttribute(`data-spire-time-${type}`)
                    : parseInt(item.getAttribute(`data-spire-time-${type}`), 10);
                const isActive = itemValue === currentValue;

                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.top + itemRect.height / 2;
                const distance = Math.abs(columnCenter - itemCenter);

                const normalizedDistance = Math.min(distance / TIMEPICKER_MAX_DISTANCE, 1);

                const opacity = isActive ? 1 : (1 - (normalizedDistance * 0.7));
                const scale = isActive ? 1 : (1 - (normalizedDistance * 0.15));

                item.style.opacity = opacity;
                item.style.transform = `scale(${scale})`;
            });
        },

        scrollToSelected(specificType = null) {
            const types = specificType ? [specificType] : ['hour', 'minute', 'second', 'period'];

            types.forEach(type => {
                const column = this.$refs[`${type}Column`];
                if (!column) {
                    return;
                }

                const options = this[`${type}Options`];
                const index = options.findIndex(opt => opt.value === this[type]);

                if (index !== -1) {
                    const item = column.querySelector(`[data-spire-time-${type}="${this[type]}"]`);

                    if (item) {
                        item.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'nearest'
                        });

                        setTimeout(() => {
                            this.updateItemStyles(type);
                        }, TIMEPICKER_SCROLL_ANIMATION_DELAY);
                    }
                }
            });
        },

        handleScrollHour() {
            this.updateItemStyles('hour');
            if (!('onscrollend' in window)) {
                clearTimeout(this.scrollDebounce.hour);
                this.scrollDebounce.hour = setTimeout(() => {
                    this.selectCenteredItem('hour');
                }, SCROLL_DEBOUNCE_MS);
            }
        },

        handleScrollMinute() {
            this.updateItemStyles('minute');
            if (!('onscrollend' in window)) {
                clearTimeout(this.scrollDebounce.minute);
                this.scrollDebounce.minute = setTimeout(() => {
                    this.selectCenteredItem('minute');
                }, SCROLL_DEBOUNCE_MS);
            }
        },

        handleScrollSecond() {
            if (!this.showSeconds) return;
            this.updateItemStyles('second');
            if (!('onscrollend' in window)) {
                clearTimeout(this.scrollDebounce.second);
                this.scrollDebounce.second = setTimeout(() => {
                    this.selectCenteredItem('second');
                }, SCROLL_DEBOUNCE_MS);
            }
        },

        handleScrollPeriod() {
            if (this.use24Hour) return;
            this.updateItemStyles('period');
            if (!('onscrollend' in window)) {
                clearTimeout(this.scrollDebounce.period);
                this.scrollDebounce.period = setTimeout(() => {
                    this.selectCenteredItem('period');
                }, SCROLL_DEBOUNCE_MS);
            }
        },

        selectCenteredItem(type) {
            const column = this.$refs[`${type}Column`];
            if (!column) {
                return;
            }

            const container = this.$refs[`${type}Container`];
            const viewportHeight = container ? container.clientHeight : TIMEPICKER_VIEWPORT_HEIGHT;
            const centerY = column.scrollTop + (viewportHeight / 2);
            const index = Math.floor((centerY - TIMEPICKER_PADDING) / TIMEPICKER_ITEM_HEIGHT);

            const options = this[`${type}Options`];
            const clampedIndex = Math.max(0, Math.min(index, options.length - 1));

            if (this[type] !== options[clampedIndex].value) {
                this[type] = options[clampedIndex].value;
                this.updateValue();
            }
        },

        highlightNextHour() {
            const currentIndex = this.hourOptions.findIndex(opt => opt.value === this.hour);
            const nextIndex = (currentIndex + 1) % this.hourOptions.length;
            this.selectHour(this.hourOptions[nextIndex].value);
        },

        highlightPrevHour() {
            const currentIndex = this.hourOptions.findIndex(opt => opt.value === this.hour);
            const prevIndex = (currentIndex - 1 + this.hourOptions.length) % this.hourOptions.length;
            this.selectHour(this.hourOptions[prevIndex].value);
        },

        highlightFirstHour() {
            this.selectHour(this.hourOptions[0].value);
        },

        highlightLastHour() {
            this.selectHour(this.hourOptions[this.hourOptions.length - 1].value);
        },

        highlightNextMinute() {
            const currentIndex = this.minuteOptions.findIndex(opt => opt.value === this.minute);
            const nextIndex = (currentIndex + 1) % this.minuteOptions.length;
            this.selectMinute(this.minuteOptions[nextIndex].value);
        },

        highlightPrevMinute() {
            const currentIndex = this.minuteOptions.findIndex(opt => opt.value === this.minute);
            const prevIndex = (currentIndex - 1 + this.minuteOptions.length) % this.minuteOptions.length;
            this.selectMinute(this.minuteOptions[prevIndex].value);
        },

        highlightFirstMinute() {
            this.selectMinute(this.minuteOptions[0].value);
        },

        highlightLastMinute() {
            this.selectMinute(this.minuteOptions[this.minuteOptions.length - 1].value);
        },

        highlightNextSecond() {
            if (!this.showSeconds) return;
            const currentIndex = this.secondOptions.findIndex(opt => opt.value === this.second);
            const nextIndex = (currentIndex + 1) % this.secondOptions.length;
            this.selectSecond(this.secondOptions[nextIndex].value);
        },

        highlightPrevSecond() {
            if (!this.showSeconds) return;
            const currentIndex = this.secondOptions.findIndex(opt => opt.value === this.second);
            const prevIndex = (currentIndex - 1 + this.secondOptions.length) % this.secondOptions.length;
            this.selectSecond(this.secondOptions[prevIndex].value);
        },

        highlightFirstSecond() {
            if (!this.showSeconds) return;
            this.selectSecond(this.secondOptions[0].value);
        },

        highlightLastSecond() {
            if (!this.showSeconds) return;
            this.selectSecond(this.secondOptions[this.secondOptions.length - 1].value);
        },

        highlightNextPeriod() {
            if (this.use24Hour) return;
            this.selectPeriod(this.period === 'AM' ? 'PM' : 'AM');
        },

        highlightPrevPeriod() {
            if (this.use24Hour) return;
            this.selectPeriod(this.period === 'AM' ? 'PM' : 'AM');
        },

        highlightFirstPeriod() {
            if (this.use24Hour) return;
            this.selectPeriod('AM');
        },

        highlightLastPeriod() {
            if (this.use24Hour) return;
            this.selectPeriod('PM');
        },

        scrollUpHour() {
            this.highlightPrevHour();
        },

        scrollDownHour() {
            this.highlightNextHour();
        },

        scrollUpMinute() {
            this.highlightPrevMinute();
        },

        scrollDownMinute() {
            this.highlightNextMinute();
        },

        scrollUpSecond() {
            if (!this.showSeconds) return;
            this.highlightPrevSecond();
        },

        scrollDownSecond() {
            if (!this.showSeconds) return;
            this.highlightNextSecond();
        },

        scrollUpPeriod() {
            if (this.use24Hour) return;
            this.highlightPrevPeriod();
        },

        scrollDownPeriod() {
            if (this.use24Hour) return;
            this.highlightNextPeriod();
        },

        syncValueToSegments() {
            this.segmentValues.hour = this.hour !== null && this.hour !== undefined ? String(this.hour).padStart(2, '0') : '';
            this.segmentValues.minute = this.minute !== null && this.minute !== undefined ? String(this.minute).padStart(2, '0') : '';
            this.segmentValues.second = this.second !== null && this.second !== undefined ? String(this.second).padStart(2, '0') : '';
            this.segmentValues.period = this.period || 'AM';
        },

        syncSegmentsToValue() {
            const hour = parseInt(this.segmentValues.hour, 10);
            const minute = parseInt(this.segmentValues.minute, 10);
            const second = parseInt(this.segmentValues.second, 10);

            if (!isNaN(hour)) {
                this.hour = hour;
            }

            if (!isNaN(minute)) {
                this.minute = minute;
            }

            if (!isNaN(second)) {
                this.second = second;
            }

            if (this.segmentValues.period) {
                this.period = this.segmentValues.period;
            }

            this.updateValue();
        },

        handleSegmentInput(type, event) {
            const input = event.target;
            let value = input.value.replace(/\D/g, '');

            if (type === 'hour') {
                const maxHour = this.use24Hour ? 23 : 12;
                let numValue = parseInt(value, 10);

                if (value.length === 2) {
                    if (numValue > maxHour) {
                        value = String(maxHour).padStart(2, '0');
                    }
                    this.segmentValues.hour = value;
                    this.syncSegmentsToValue();
                    this.focusNextSegment('hour');
                } else if (value.length === 1) {
                    if (this.use24Hour && numValue > 2) {
                        value = value.padStart(2, '0');
                        this.segmentValues.hour = value;
                        this.syncSegmentsToValue();
                        this.focusNextSegment('hour');
                    } else if (!this.use24Hour && numValue > 1) {
                        value = value.padStart(2, '0');
                        this.segmentValues.hour = value;
                        this.syncSegmentsToValue();
                        this.focusNextSegment('hour');
                    } else {
                        this.segmentValues.hour = value;
                    }
                } else {
                    this.segmentValues.hour = value;
                }
            } else if (type === 'minute' || type === 'second') {
                let numValue = parseInt(value, 10);

                if (value.length === 2) {
                    if (numValue > 59) {
                        value = '59';
                    }
                    this.segmentValues[type] = value;
                    this.syncSegmentsToValue();
                    this.focusNextSegment(type);
                } else if (value.length === 1) {
                    if (numValue > 5) {
                        value = value.padStart(2, '0');
                        this.segmentValues[type] = value;
                        this.syncSegmentsToValue();
                        this.focusNextSegment(type);
                    } else {
                        this.segmentValues[type] = value;
                    }
                } else {
                    this.segmentValues[type] = value;
                }
            }
        },

        handleSegmentKeydown(type, event) {
            const input = event.target;

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                this.focusPrevSegment(type);
            } else if (event.key === 'ArrowRight') {
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
            } else if (event.key === ':') {
                event.preventDefault();
                this.focusNextSegment(type);
            }
        },

        handleSegmentPaste(event) {
            const pastedText = event.clipboardData.getData('text');
            const parsed = this.parseTimeString(pastedText);

            if (parsed) {
                this.segmentValues.hour = parsed.hour;
                this.segmentValues.minute = parsed.minute;
                this.segmentValues.second = parsed.second || '';
                this.segmentValues.period = parsed.period || this.segmentValues.period;
                this.syncSegmentsToValue();
            }
        },

        parseTimeString(str) {
            const timeRegex = /(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?/i;
            const match = str.match(timeRegex);

            if (!match) return null;

            const hour = match[1].padStart(2, '0');
            const minute = match[2];
            const second = match[3] || '';
            const period = match[4] ? match[4].toUpperCase() : null;

            return { hour, minute, second, period };
        },

        focusNextSegment(currentType) {
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
            if (type === 'hour') {
                const currentHour = parseInt(this.segmentValues.hour, 10) || 0;
                const maxHour = this.use24Hour ? 23 : 12;
                const minHour = this.use24Hour ? 0 : 1;
                const newHour = currentHour >= maxHour ? minHour : currentHour + 1;
                this.segmentValues.hour = String(newHour).padStart(2, '0');
            } else if (type === 'minute') {
                const currentMinute = parseInt(this.segmentValues.minute, 10) || 0;
                const newMinute = currentMinute >= 59 ? 0 : currentMinute + 1;
                this.segmentValues.minute = String(newMinute).padStart(2, '0');
            } else if (type === 'second') {
                const currentSecond = parseInt(this.segmentValues.second, 10) || 0;
                const newSecond = currentSecond >= 59 ? 0 : currentSecond + 1;
                this.segmentValues.second = String(newSecond).padStart(2, '0');
            }

            this.syncSegmentsToValue();
        },

        decrementSegment(type) {
            if (type === 'hour') {
                const currentHour = parseInt(this.segmentValues.hour, 10) || 0;
                const maxHour = this.use24Hour ? 23 : 12;
                const minHour = this.use24Hour ? 0 : 1;
                const newHour = currentHour <= minHour ? maxHour : currentHour - 1;
                this.segmentValues.hour = String(newHour).padStart(2, '0');
            } else if (type === 'minute') {
                const currentMinute = parseInt(this.segmentValues.minute, 10) || 0;
                const newMinute = currentMinute <= 0 ? 59 : currentMinute - 1;
                this.segmentValues.minute = String(newMinute).padStart(2, '0');
            } else if (type === 'second') {
                const currentSecond = parseInt(this.segmentValues.second, 10) || 0;
                const newSecond = currentSecond <= 0 ? 59 : currentSecond - 1;
                this.segmentValues.second = String(newSecond).padStart(2, '0');
            }

            this.syncSegmentsToValue();
        },

        togglePeriod() {
            this.segmentValues.period = this.segmentValues.period === 'AM' ? 'PM' : 'AM';
            this.period = this.segmentValues.period;
            this.updateValue();
        },

        destroy() {
            this.scrollListeners.forEach(({ column, handler }) => {
                column.removeEventListener('scrollend', handler);
                delete column.dataset.scrollendAttached;
            });
            this.scrollListeners = [];
        }
    };
}
