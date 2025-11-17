import { SPIRE_EVENTS, createEventPayload } from './events';

export function sliderComponent(config = {}) {
    return {
        mode: config.mode || 'single',
        min: config.min ?? 0,
        max: config.max ?? 100,
        step: config.step ?? 1,
        disabled: config.disabled || false,
        readonly: config.readonly || false,
        showTooltip: config.showTooltip ?? true,
        marks: config.marks || [],
        showSteps: config.showSteps || false,
        name: config.name || null,

        minLabel: config.minLabel || 'Minimum value',
        maxLabel: config.maxLabel || 'Maximum value',
        valueLabel: config.valueLabel || 'Value',

        value: config.value || null,
        displayValue: null,
        isDragging: false,
        activeThumb: null,

        tooltipVisible: false,
        tooltipValue: '',
        tooltipPosition: { x: 0, y: 0 },

        cleanup: null,

        isInternalUpdate: false,

        init() {
            if (this.value === null) {
                this.value = this.mode === 'range'
                    ? { start: this.min, end: this.max }
                    : this.min;
            }

            this.isInternalUpdate = true;
            this.normalizeValue();
            this.isInternalUpdate = false;

            this.$watch('value', () => {
                if (!this.isInternalUpdate && !this.isDragging) {
                    this.normalizeValue();
                }
            });

            this.setupGlobalListeners();
        },

        destroy() {
            if (this.cleanup) {
                this.cleanup();
            }
        },

        getCurrentValue() {
            return this.displayValue !== null ? this.displayValue : this.value;
        },

        setupGlobalListeners() {
            const handleMouseMove = (e) => this.handleMouseMove(e);
            const handleMouseUp = () => this.handleMouseUp();
            const handleTouchMove = (e) => this.handleTouchMove(e);
            const handleTouchEnd = () => this.handleTouchEnd();

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);

            this.cleanup = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
            };
        },

        normalizeValue() {
            if (this.mode === 'range') {
                if (!this.value || typeof this.value !== 'object') {
                    this.value = { start: this.min, end: this.max };
                }

                this.value = {
                    start: this.clampValue(this.value.start ?? this.min),
                    end: this.clampValue(this.value.end ?? this.max)
                };

                if (this.value.start > this.value.end) {
                    [this.value.start, this.value.end] = [this.value.end, this.value.start];
                }
            } else {
                if (typeof this.value === 'object') {
                    this.value = this.min;
                }
                this.value = this.clampValue(this.value ?? this.min);
            }
        },

        clampValue(val) {
            const numVal = Number(val);
            if (isNaN(numVal)) return this.min;

            const clamped = Math.max(this.min, Math.min(this.max, numVal));

            const steps = Math.round((clamped - this.min) / this.step);
            return this.min + (steps * this.step);
        },

        handleTrackClick(event) {
            if (this.disabled || this.readonly) return;

            event.preventDefault();
            const previousValue = this.value;
            const value = this.calculateValueFromEvent(event);

            if (this.mode === 'range') {
                const startDist = Math.abs(value - this.value.start);
                const endDist = Math.abs(value - this.value.end);
                this.activeThumb = startDist <= endDist ? 'start' : 'end';
                this.value[this.activeThumb] = value;
            } else {
                this.value = value;
            }

            this.$dispatch(SPIRE_EVENTS.SLIDER_CHANGED, createEventPayload({
                id: this.$id('slider'),
                name: this.name,
                value: this.value,
                previousValue: previousValue,
            }));
        },

        handleTouchStart(event) {
            if (this.disabled || this.readonly) return;
            this.handleTrackClick(event.touches[0]);
        },

        startDrag(thumb, event) {
            if (this.disabled || this.readonly) return;

            event.preventDefault();
            event.stopPropagation();

            this.isDragging = true;
            this.activeThumb = thumb;

            if (this.showTooltip) {
                this.showTooltipAt(event);
            }

            event.currentTarget.focus();
        },

        handleMouseMove(event) {
            if (!this.isDragging || this.disabled || this.readonly) return;

            event.preventDefault();
            const value = this.calculateValueFromEvent(event);
            this.updateValue(value);

            if (this.showTooltip) {
                this.updateTooltipPosition(event);
            }
        },

        handleMouseUp() {
            if (!this.isDragging) return;

            if (this.displayValue !== null) {
                this.isInternalUpdate = true;
                this.value = this.mode === 'range'
                    ? { ...this.displayValue }
                    : this.displayValue;
                this.displayValue = null;
                this.$nextTick(() => {
                    this.isInternalUpdate = false;
                });
            }

            this.isDragging = false;
            this.activeThumb = null;
            this.tooltipVisible = false;

            this.$dispatch(SPIRE_EVENTS.SLIDER_CHANGE_END, createEventPayload({
                id: this.$id('slider'),
                name: this.name,
                value: this.value,
            }));
        },

        handleTouchMove(event) {
            if (!this.isDragging || this.disabled || this.readonly) return;

            event.preventDefault();
            const touch = event.touches[0];
            const value = this.calculateValueFromEvent(touch);
            this.updateValue(value);

            if (this.showTooltip) {
                this.updateTooltipPosition(touch);
            }
        },

        handleTouchEnd() {
            this.handleMouseUp();
        },

        updateValue(newValue) {
            if (this.displayValue === null) {
                this.displayValue = this.mode === 'range'
                    ? { ...this.value }
                    : this.value;
            }

            if (this.mode === 'range') {
                this.displayValue[this.activeThumb] = newValue;

                if (this.activeThumb === 'start' && this.displayValue.start > this.displayValue.end) {
                    this.displayValue.start = this.displayValue.end;
                } else if (this.activeThumb === 'end' && this.displayValue.end < this.displayValue.start) {
                    this.displayValue.end = this.displayValue.start;
                }
            } else {
                this.displayValue = newValue;
            }
        },

        calculateValueFromEvent(event) {
            const track = this.$refs.track;
            const rect = track.getBoundingClientRect();

            const percentage = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
            const rawValue = this.min + (percentage * (this.max - this.min));

            return this.clampValue(rawValue);
        },

        handleKeyDown(thumb, event) {
            if (this.disabled || this.readonly) return;

            const key = event.key;
            let handled = false;
            let delta = 0;
            const previousValue = this.value;

            switch (key) {
                case 'ArrowRight':
                case 'ArrowUp':
                    delta = this.step;
                    handled = true;
                    break;
                case 'ArrowLeft':
                case 'ArrowDown':
                    delta = -this.step;
                    handled = true;
                    break;
                case 'PageUp':
                    delta = this.step * 10;
                    handled = true;
                    break;
                case 'PageDown':
                    delta = -this.step * 10;
                    handled = true;
                    break;
                case 'Home':
                    this.setThumbValue(thumb, this.min);
                    handled = true;
                    break;
                case 'End':
                    this.setThumbValue(thumb, this.max);
                    handled = true;
                    break;
            }

            if (delta !== 0) {
                const currentValue = this.mode === 'range'
                    ? this.value[thumb]
                    : this.value;
                this.setThumbValue(thumb, currentValue + delta);
            }

            if (handled) {
                event.preventDefault();

                this.$dispatch(SPIRE_EVENTS.SLIDER_CHANGED, createEventPayload({
                    id: this.$id('slider'),
                    name: this.name,
                    value: this.value,
                    previousValue: previousValue,
                }));
            }
        },

        setThumbValue(thumb, newValue) {
            const clampedValue = this.clampValue(newValue);

            if (this.mode === 'range') {
                this.value[thumb] = clampedValue;

                if (thumb === 'start' && this.value.start > this.value.end) {
                    this.value.start = this.value.end;
                } else if (thumb === 'end' && this.value.end < this.value.start) {
                    this.value.end = this.value.start;
                }
            } else {
                this.value = clampedValue;
            }
        },

        jumpToValue(targetValue) {
            if (this.disabled || this.readonly) return;

            const previousValue = this.value;
            const clampedValue = this.clampValue(targetValue);

            if (this.mode === 'range') {
                const startDist = Math.abs(clampedValue - this.value.start);
                const endDist = Math.abs(clampedValue - this.value.end);
                const thumb = startDist <= endDist ? 'start' : 'end';
                this.value[thumb] = clampedValue;
            } else {
                this.value = clampedValue;
            }

            this.$dispatch(SPIRE_EVENTS.SLIDER_CHANGED, createEventPayload({
                id: this.$id('slider'),
                name: this.name,
                value: this.value,
                previousValue: previousValue,
            }));
        },

        showTooltipAt(event) {
            this.tooltipVisible = true;
            this.updateTooltipValue();
            this.updateTooltipPosition(event);
        },

        updateTooltipValue() {
            const currentValue = this.getCurrentValue();
            if (this.mode === 'range') {
                this.tooltipValue = this.activeThumb === 'start'
                    ? this.formatAriaValue(currentValue.start)
                    : this.formatAriaValue(currentValue.end);
            } else {
                this.tooltipValue = this.formatAriaValue(currentValue);
            }
        },

        updateTooltipPosition(event) {
            this.tooltipPosition = {
                x: event.clientX,
                y: event.clientY
            };
            this.updateTooltipValue();
        },

        getFillStyle() {
            const currentValue = this.getCurrentValue();
            if (this.mode === 'range') {
                const startPercent = this.valueToPercent(currentValue.start);
                const endPercent = this.valueToPercent(currentValue.end);

                return {
                    left: `${startPercent}%`,
                    width: `${endPercent - startPercent}%`
                };
            } else {
                const percent = this.valueToPercent(currentValue);

                return {
                    left: '0%',
                    width: `${percent}%`
                };
            }
        },

        getThumbStyle(thumb = null) {
            const currentValue = this.getCurrentValue();
            let percent;

            if (this.mode === 'range') {
                percent = this.valueToPercent(currentValue[thumb]);
            } else {
                percent = this.valueToPercent(currentValue);
            }

            return {
                left: `${percent}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)'
            };
        },

        getTooltipStyle() {
            const offset = 10;

            return {
                position: 'fixed',
                left: `${this.tooltipPosition.x}px`,
                top: `${this.tooltipPosition.y - offset - 30}px`,
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
                zIndex: 50
            };
        },

        getStepStyle(stepValue) {
            const percent = this.valueToPercent(stepValue);

            return {
                left: `${percent}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)'
            };
        },

        getMarkStyle(markValue) {
            const percent = this.valueToPercent(markValue);

            return {
                left: `${percent}%`,
                transform: 'translateX(-50%)'
            };
        },

        valueToPercent(value) {
            if (this.max === this.min) return 0;
            return ((value - this.min) / (this.max - this.min)) * 100;
        },

        isStepInRange(stepValue) {
            const currentValue = this.getCurrentValue();
            if (this.mode === 'range') {
                return stepValue >= currentValue.start && stepValue <= currentValue.end;
            } else {
                return stepValue <= currentValue;
            }
        },

        get stepMarkers() {
            if (!this.showSteps) return [];

            const markers = [];
            for (let val = this.min; val <= this.max; val += this.step) {
                markers.push(val);
            }
            return markers;
        },

        formatValue() {
            const currentValue = this.getCurrentValue();
            if (this.mode === 'range') {
                const start = this.formatAriaValue(currentValue.start);
                const end = this.formatAriaValue(currentValue.end);
                return `${start} – ${end}`;
            }
            return this.formatAriaValue(currentValue);
        },

        formatAriaValue(value) {
            const rounded = Math.round(value * 100) / 100;
            return rounded.toString();
        }
    };
}
