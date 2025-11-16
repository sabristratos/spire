/**
 * Rating component for Spire UI
 * Handles interactive star ratings with support for full and half stars
 */
export function ratingComponent(config = {}) {
    return {
        value: config.value || 0,
        maxRating: config.maxRating || 5,
        readonly: config.readonly || false,
        allowHalf: config.allowHalf || false,
        enableTooltip: config.showTooltip || false,
        tooltipVisible: false,
        hoveredValue: null,
        tooltipTimeout: null,

        init() {
            config.onInit?.call(this);
        },

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

            this.$dispatch('rating-changed', {
                value: rating,
                previousValue: previousValue
            });

            if (this.showTooltip) {
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

            this.$dispatch('rating-reset', {
                previousValue: previousValue
            });
        },

        displayTooltip() {
            if (!this.enableTooltip || !this.$refs.tooltip) {
                return;
            }

            if (this.tooltipTimeout) {
                clearTimeout(this.tooltipTimeout);
            }

            this.tooltipVisible = true;

            this.tooltipTimeout = setTimeout(() => {
                this.tooltipVisible = false;
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
            if (!this.allowHalf) {
                return false;
            }

            const displayValue = this.hoveredValue ?? this.value;
            return displayValue >= (starIndex - 0.5) && displayValue < starIndex;
        }
    };
}
