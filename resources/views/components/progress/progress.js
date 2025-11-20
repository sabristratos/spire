/**
 * Spire UI Progress Component
 *
 * Handles smooth value transitions for progress bars
 */

/**
 * Linear progress component
 */
export function progressComponent(config = {}) {
    return {
        // Current animated value
        currentValue: config.value || 0,

        // Target value
        targetValue: config.value || 0,

        // Animation frame ID
        animationFrame: null,

        init() {
            // Watch for value changes via Alpine's reactivity
            this.$watch('targetValue', (newValue) => {
                this.animateToValue(newValue);
            });

            // Listen for custom events
            this.$el.addEventListener('progress:set', (event) => {
                this.setValue(event.detail.value, event.detail.max);
            });
        },

        /**
         * Set progress value
         */
        setValue(value, max = 100) {
            const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
            this.targetValue = percentage;
        },

        /**
         * Animate to target value
         */
        animateToValue(target) {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }

            const start = this.currentValue;
            const diff = target - start;
            const duration = 300; // ms
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);

                this.currentValue = start + (diff * eased);

                if (progress < 1) {
                    this.animationFrame = requestAnimationFrame(animate);
                } else {
                    this.currentValue = target;
                    this.animationFrame = null;
                }
            };

            this.animationFrame = requestAnimationFrame(animate);
        },

        /**
         * Increment progress
         */
        increment(amount = 10) {
            this.targetValue = Math.min(100, this.targetValue + amount);
        },

        /**
         * Decrement progress
         */
        decrement(amount = 10) {
            this.targetValue = Math.max(0, this.targetValue - amount);
        },

        /**
         * Reset to zero
         */
        reset() {
            this.targetValue = 0;
        },

        /**
         * Complete (set to 100%)
         */
        complete() {
            this.targetValue = 100;
        },

        destroy() {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
            }
        }
    };
}

/**
 * Circular progress component
 */
export function progressCircularComponent(config = {}) {
    return {
        // Current animated value
        currentValue: config.value || 0,

        // Target value
        targetValue: config.value || 0,

        // Circle circumference
        circumference: config.circumference || 0,

        // Current stroke offset
        currentOffset: config.offset || 0,

        // Animation frame ID
        animationFrame: null,

        init() {
            // Watch for value changes
            this.$watch('targetValue', (newValue) => {
                this.animateToValue(newValue);
            });

            // Listen for custom events
            this.$el.addEventListener('progress:set', (event) => {
                this.setValue(event.detail.value, event.detail.max);
            });
        },

        /**
         * Set progress value
         */
        setValue(value, max = 100) {
            const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
            this.targetValue = percentage;
        },

        /**
         * Calculate offset from percentage
         */
        calculateOffset(percentage) {
            return this.circumference - (percentage / 100) * this.circumference;
        },

        /**
         * Animate to target value
         */
        animateToValue(target) {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }

            const startValue = this.currentValue;
            const startOffset = this.currentOffset;
            const targetOffset = this.calculateOffset(target);

            const duration = 300; // ms
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);

                this.currentValue = startValue + ((target - startValue) * eased);
                this.currentOffset = startOffset + ((targetOffset - startOffset) * eased);

                if (progress < 1) {
                    this.animationFrame = requestAnimationFrame(animate);
                } else {
                    this.currentValue = target;
                    this.currentOffset = targetOffset;
                    this.animationFrame = null;
                }
            };

            this.animationFrame = requestAnimationFrame(animate);
        },

        /**
         * Increment progress
         */
        increment(amount = 10) {
            this.targetValue = Math.min(100, this.targetValue + amount);
        },

        /**
         * Decrement progress
         */
        decrement(amount = 10) {
            this.targetValue = Math.max(0, this.targetValue - amount);
        },

        /**
         * Reset to zero
         */
        reset() {
            this.targetValue = 0;
        },

        /**
         * Complete (set to 100%)
         */
        complete() {
            this.targetValue = 100;
        },

        destroy() {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
            }
        }
    };
}
