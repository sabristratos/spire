import { overlay } from './overlay';

/**
 * Tooltip component for Spire UI
 * Extends overlay component with hover support and auto-hide functionality
 */
export function tooltipComponent(config = {}) {
    return {
        ...overlay({
            trigger: config.trigger || 'hover',
            placement: config.placement || 'top',
            offset: config.offset || 8,
            onInit() {
                config.onInit?.call(this);
            }
        }),

        delay: config.delay || 300,
        duration: config.duration || null,
        hoverTimeout: null,
        hideTimeout: null,

        handleMouseEnter() {
            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
            }

            this.hoverTimeout = setTimeout(() => {
                this.show();

                if (this.duration) {
                    this.scheduleAutoHide();
                }
            }, this.delay);
        },

        handleMouseLeave() {
            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
                this.hoverTimeout = null;
            }

            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }

            this.close();
        },

        scheduleAutoHide() {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
            }

            this.hideTimeout = setTimeout(() => {
                this.close();
            }, this.duration);
        },

        show() {
            this.open();

            if (this.duration) {
                this.scheduleAutoHide();
            }
        },

        hide() {
            this.close();
        },

        destroy() {
            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
            }
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
            }
        }
    };
}
