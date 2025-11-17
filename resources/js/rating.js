import { overlay } from './overlay';
import { SPIRE_EVENTS, createEventPayload } from './events';

/**
 * Rating component for Spire UI
 * Handles interactive star ratings with support for full and half stars
 */
export function ratingComponent(config = {}) {
    return {
        ...overlay({
            trigger: 'manual',
            placement: 'top',
            onInit() {
                config.onInit?.call(this);
            }
        }),

        value: config.value || 0,
        maxRating: config.maxRating || 5,
        readonly: config.readonly || false,
        allowHalf: config.allowHalf || false,
        showTooltip: config.showTooltip || false,
        name: config.name || null,
        hoveredValue: null,
        tooltipTimeout: null,

        handleClick(starIndex, event) {
            if (this.readonly) {
                return;
            }

            let rating = starIndex;

            if (this.allowHalf) {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const isLeftHalf = x < rect.width / 2;

                if (isLeftHalf) {
                    rating = starIndex - 0.5;
                }
            }

            this.setRating(rating);
        },

        handleMouseMove(starIndex, event) {
            if (this.readonly || !this.allowHalf) {
                return;
            }

            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const isLeftHalf = x < rect.width / 2;

            this.hoveredValue = isLeftHalf ? starIndex - 0.5 : starIndex;
        },

        setRating(rating) {
            if (this.readonly) {
                return;
            }

            const previousValue = this.value;
            this.value = rating;

            this.$dispatch(SPIRE_EVENTS.RATING_CHANGED, createEventPayload({
                id: this.$id('rating'),
                name: this.name,
                value: rating,
                previousValue: previousValue,
            }));

            if (this.showTooltip && this.$refs.content) {
                this.displayTooltip();
            }
        },

        hoverRating(starIndex, event) {
            if (this.readonly) {
                return;
            }

            if (this.allowHalf) {
                this.handleMouseMove(starIndex, event);
            } else {
                this.hoveredValue = starIndex;
            }
        },

        clearHover() {
            if (this.readonly) {
                return;
            }

            this.hoveredValue = null;
        },

        reset() {
            if (this.readonly) {
                return;
            }

            const previousValue = this.value;
            this.value = 0;
            this.hoveredValue = null;

            this.$dispatch(SPIRE_EVENTS.RATING_RESET, createEventPayload({
                id: this.$id('rating'),
                name: this.name,
                value: 0,
                previousValue: previousValue,
            }));
        },

        displayTooltip() {
            if (!this.showTooltip || !this.$refs.content) {
                return;
            }

            if (this.tooltipTimeout) {
                clearTimeout(this.tooltipTimeout);
            }

            this.show();

            this.tooltipTimeout = setTimeout(() => {
                this.hide();
            }, 2000);
        },

        isStarFilled(starIndex) {
            const displayValue = this.hoveredValue ?? this.value;

            if (this.allowHalf) {
                return displayValue >= starIndex;
            }

            return displayValue >= starIndex;
        },

        isStarHalf(starIndex) {
            if (this.readonly) {
                const displayValue = this.hoveredValue ?? this.value;
                return displayValue >= (starIndex - 0.5) && displayValue < starIndex;
            }

            if (!this.allowHalf) {
                return false;
            }

            const displayValue = this.hoveredValue ?? this.value;
            return displayValue >= (starIndex - 0.5) && displayValue < starIndex;
        },

        destroy() {
            if (this.tooltipTimeout) {
                clearTimeout(this.tooltipTimeout);
                this.tooltipTimeout = null;
            }
        }
    };
}
