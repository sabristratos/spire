import { overlay } from './overlay';
import { DateFormatter } from './date-formatter';

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
                });

                this.$watch('open', (isOpen) => {
                    if (isOpen) {
                        this.$nextTick(() => {
                            this.scrollToSelected();
                        });
                    }
                });
            }
        }),

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
                const now = new Date();
                this.hour = this.use24Hour ? now.getHours() : (now.getHours() % 12 || 12);
                this.minute = Math.floor(now.getMinutes() / this.minuteStep) * this.minuteStep;
                this.second = 0;
                this.period = now.getHours() >= 12 ? 'PM' : 'AM';
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
            this.scrollToSelected('hour');
        },

        selectMinute(value) {
            this.minute = value;
            this.updateValue();
            this.scrollToSelected('minute');
        },

        selectSecond(value) {
            this.second = value;
            this.updateValue();
            this.scrollToSelected('second');
        },

        selectPeriod(value) {
            this.period = value;
            this.updateValue();
            this.scrollToSelected('period');
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

            items.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.top + itemRect.height / 2;
                const distance = Math.abs(columnCenter - itemCenter);

                const maxDistance = 40;
                const normalizedDistance = Math.min(distance / maxDistance, 1);

                const opacity = 1 - (normalizedDistance * 0.7);
                const scale = 1 - (normalizedDistance * 0.15);

                item.style.opacity = opacity;
                item.style.transform = `scale(${scale})`;
                item.style.fontWeight = normalizedDistance < 0.3 ? 'bold' : 'normal';
                item.style.color = normalizedDistance < 0.3 ? 'var(--color-text)' : 'var(--color-text-muted)';
            });
        },

        scrollToSelected(specificType = null) {
            const types = specificType ? [specificType] : ['hour', 'minute', 'second', 'period'];

            types.forEach(type => {
                const column = this.$refs[`${type}Column`];
                if (!column) return;

                const selected = column.querySelector(`[data-spire-time-${type}="${this[type]}"]`);
                if (selected) {
                    const padding = 40;
                    const itemHeight = 40;
                    const itemOffset = selected.offsetTop;

                    column.scrollTop = itemOffset - padding;

                    this.$nextTick(() => {
                        this.updateItemStyles(type);
                    });
                }
            });
        },

        handleScrollHour() {
            this.updateItemStyles('hour');
            clearTimeout(this.scrollDebounce.hour);
            this.scrollDebounce.hour = setTimeout(() => {
                this.selectCenteredItem('hour');
            }, 150);
        },

        handleScrollMinute() {
            this.updateItemStyles('minute');
            clearTimeout(this.scrollDebounce.minute);
            this.scrollDebounce.minute = setTimeout(() => {
                this.selectCenteredItem('minute');
            }, 150);
        },

        handleScrollSecond() {
            if (!this.showSeconds) return;
            this.updateItemStyles('second');
            clearTimeout(this.scrollDebounce.second);
            this.scrollDebounce.second = setTimeout(() => {
                this.selectCenteredItem('second');
            }, 150);
        },

        handleScrollPeriod() {
            if (this.use24Hour) return;
            this.updateItemStyles('period');
            clearTimeout(this.scrollDebounce.period);
            this.scrollDebounce.period = setTimeout(() => {
                this.selectCenteredItem('period');
            }, 150);
        },

        selectCenteredItem(type) {
            const column = this.$refs[`${type}Column`];
            if (!column) return;

            const padding = 40;
            const itemHeight = 40;
            const centerY = column.scrollTop + padding;
            const index = Math.round(centerY / itemHeight);

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

        selectHighlightedHour() {
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

        selectHighlightedMinute() {
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

        selectHighlightedSecond() {
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

        selectHighlightedPeriod() {
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
    };
}
