import { overlay } from '../../../js/shared/overlay';

export function tooltipComponent(config = {}) {
    const overlayTrigger = config.trigger === 'click' ? 'click' : '';

    return {
        ...overlay({
            trigger: overlayTrigger,
            placement: config.placement || 'top',
            offset: config.offset || 8,
            onInit() {
                if (this.trigger === 'hover') {
                    this.setupHoverListeners();
                }
                config.onInit?.call(this);
            }
        }),

        placement: config.placement || 'top',
        trigger: config.trigger || 'hover',

        get isOpen() {
            return this.open;
        },

        delay: config.delay || 300,
        duration: config.duration || null,
        hoverTimeout: null,
        hideTimeout: null,

        setupHoverListeners() {
            const triggerEl = this.$refs.trigger;
            const contentEl = this.$refs.content;

            if (!triggerEl || !contentEl) return;

            triggerEl.addEventListener('mouseenter', () => {
                this.handleMouseEnter();
            });

            triggerEl.addEventListener('mouseleave', () => {
                this.handleMouseLeave();
            });

            triggerEl.addEventListener('focusin', () => {
                this.handleMouseEnter();
            });

            triggerEl.addEventListener('focusout', () => {
                this.handleMouseLeave();
            });
        },

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

            this.hide();
        },

        scheduleAutoHide() {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
            }

            this.hideTimeout = setTimeout(() => {
                this.hide();
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
                this.hoverTimeout = null;
            }
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
            overlay().destroy?.call(this);
        }
    };
}
