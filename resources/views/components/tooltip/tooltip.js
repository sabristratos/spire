import { overlay } from '../../../js/shared/overlay';

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

        // Expose properties for template access
        placement: config.placement || 'top',
        trigger: config.trigger || 'hover',

        // Map to overlay's 'open' property for template compatibility
        get isOpen() {
            return this.open;
        },

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

            this.$refs.content?.hidePopover();
        },

        scheduleAutoHide() {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
            }

            this.hideTimeout = setTimeout(() => {
                this.$refs.content?.hidePopover();
            }, this.duration);
        },

        show() {
            this.setupAnchor();
            this.$refs.content?.showPopover();

            if (this.duration) {
                this.scheduleAutoHide();
            }
        },

        hide() {
            this.$refs.content?.hidePopover();
        },

        destroy() {
            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
            }
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
            }
            // Call overlay's destroy to clean up hover timer
            overlay().destroy?.call(this);
        }
    };
}
