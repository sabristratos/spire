import { overlay } from '../../../js/shared/overlay';

export function tooltipComponent(config = {}) {
    const overlayTrigger = config.trigger === 'click' ? 'click' : '';

    return {
        ...overlay({
            trigger: overlayTrigger,
            placement: config.placement || 'top',
            offset: config.offset || 8,
            onInit() {
                this.triggerEl = config.triggerId ? document.getElementById(config.triggerId) : this.$refs.trigger;

                if (this.trigger === 'hover') {
                    this.setupHoverListeners();
                }

                if (this.trigger === 'click' && this.triggerEl) {
                    this.setupClickListeners();
                }

                config.onInit?.call(this);
            }
        }),

        triggerEl: null,
        placement: config.placement || 'top',
        trigger: config.trigger || 'hover',
        _stableAnchorId: null,

        get isOpen() {
            return this.open;
        },

        delay: config.delay || 300,
        duration: config.duration || null,
        hoverTimeout: null,
        hideTimeout: null,

        setupClickListeners() {
            if (!this.triggerEl) return;

            this.triggerEl.addEventListener('click', () => {
                this.toggle();
            });

            this.triggerEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggle();
                }
                if (e.key === 'Escape') {
                    this.hide();
                }
            });
        },

        setupHoverListeners() {
            const triggerEl = this.triggerEl;
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

        setupAnchor() {
            const triggerEl = this.triggerEl;
            const contentEl = this.$refs.content;

            if (!triggerEl || !contentEl) return;

            if (!this._stableAnchorId) {
                this._stableAnchorId = `anchor-${this.$id('overlay')}`;
            }

            const anchorEl = triggerEl.firstElementChild || triggerEl;
            anchorEl.style.anchorName = `--${this._stableAnchorId}`;
            contentEl.style.positionAnchor = `--${this._stableAnchorId}`;
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
