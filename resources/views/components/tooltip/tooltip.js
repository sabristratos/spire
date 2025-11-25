import { overlay } from '../../../js/shared/overlay';

let tooltipInstanceCounter = 0;

export function tooltipComponent(config = {}) {
    const overlayTrigger = config.trigger === 'click' ? 'click' : '';

    return {
        ...overlay({
            trigger: overlayTrigger,
            placement: config.placement || 'top',
            offset: config.offset || 8,
            onInit() {
                this.tooltipTriggerEl = config.triggerId
                    ? document.getElementById(config.triggerId)
                    : this._triggerEl;

                if (this.tooltipTrigger === 'hover') {
                    this.setupTooltipHoverListeners();
                }

                if (this.tooltipTrigger === 'click' && this.tooltipTriggerEl) {
                    this.setupTooltipClickListeners();
                }

                config.onInit?.call(this);
            }
        }),

        tooltipTriggerEl: null,
        placement: config.placement || 'top',
        tooltipTrigger: config.trigger || 'hover',

        get isOpen() {
            return this.open;
        },

        delay: config.delay || 300,
        duration: config.duration || null,
        hoverTimeout: null,
        hideTimeout: null,

        setupTooltipClickListeners() {
            if (!this.tooltipTriggerEl) return;

            this.tooltipTriggerEl.addEventListener('click', () => {
                this.toggle();
            });

            this.tooltipTriggerEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggle();
                }
                if (e.key === 'Escape') {
                    this.hide();
                }
            });
        },

        setupTooltipHoverListeners() {
            if (!this.tooltipTriggerEl || !this._contentEl) return;

            this.tooltipTriggerEl.addEventListener('mouseenter', () => {
                this.handleMouseEnter();
            });

            this.tooltipTriggerEl.addEventListener('mouseleave', () => {
                this.handleMouseLeave();
            });

            this.tooltipTriggerEl.addEventListener('focusin', () => {
                this.handleMouseEnter();
            });

            this.tooltipTriggerEl.addEventListener('focusout', () => {
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

        setupAnchor() {
            if (!this.tooltipTriggerEl || !this._contentEl) return;

            if (!this._stableAnchorId) {
                this._stableAnchorId = `anchor-tooltip-${++tooltipInstanceCounter}`;
            }

            const anchorEl = this.tooltipTriggerEl.firstElementChild || this.tooltipTriggerEl;
            anchorEl.style.anchorName = `--${this._stableAnchorId}`;
            this._contentEl.style.positionAnchor = `--${this._stableAnchorId}`;
        },

        show() {
            this.setupAnchor();
            this._contentEl?.showPopover();

            if (this.duration) {
                this.scheduleAutoHide();
            }
        },

        hide() {
            this._contentEl?.hidePopover();
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
