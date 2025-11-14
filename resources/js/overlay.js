/**
 * Reusable base component for popover-based overlays
 *
 * Used by: Popover, Dropdown, Tooltip, Select, Combobox, etc.
 *
 * Leverages native Popover API for behavior (light dismiss, focus management, top-layer)
 * Provides Alpine reactivity and extension points for component-specific features
 */
export function overlay(options = {}) {
    return {
        open: false,
        triggerMode: options.trigger || 'click',
        hoverTimer: null,
        isPinned: false,

        init() {
            this.$nextTick(() => {
                this.setupPopover();
                this.setupAnchor();
                this.setupEventListeners();
                this.setupTriggerMode();

                options.onInit?.call(this);
            });
        },

        setupPopover() {
            if (!this.$refs.content || !this.$refs.trigger) return;

            if ('popover' in HTMLElement.prototype) {
                const contentId = this.$refs.content.id;
                const triggerElement = this.$refs.trigger.querySelector('button, a, [role="button"]') || this.$refs.trigger;

                triggerElement.setAttribute('popovertarget', contentId);
                triggerElement.setAttribute('popovertargetaction', 'toggle');
            }
        },

        setupAnchor() {
            if (!this.$refs.trigger || !this.$refs.content) return;

            const anchorId = `anchor-${this.$id('overlay')}`;
            this.$refs.trigger.style.anchorName = `--${anchorId}`;
            this.$refs.content.style.positionAnchor = `--${anchorId}`;
        },

        setupEventListeners() {
            if (!this.$refs.content) return;

            this.$refs.content.addEventListener('toggle', (e) => {
                this.handleToggle(e);
            });
        },

        setupTriggerMode() {
            if (!this.$refs.trigger || !this.$refs.content) return;

            const triggerElement = this.$refs.trigger;
            const contentElement = this.$refs.content;

            if (this.triggerMode === 'hover' || this.triggerMode === 'both') {
                triggerElement.addEventListener('mouseenter', () => {
                    this.clearHoverTimer();
                    if (!this.isPinned) {
                        this.show();
                    }
                });

                triggerElement.addEventListener('mouseleave', () => {
                    if (!this.isPinned) {
                        this.scheduleHide();
                    }
                });

                contentElement.addEventListener('mouseenter', () => {
                    this.clearHoverTimer();
                });

                contentElement.addEventListener('mouseleave', () => {
                    if (!this.isPinned) {
                        this.scheduleHide();
                    }
                });
            }

            if (this.triggerMode === 'both') {
                const button = triggerElement.querySelector('button, a, [role="button"]');
                if (button) {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (this.open) {
                            this.isPinned = !this.isPinned;
                            if (!this.isPinned) {
                                this.hide();
                            }
                        } else {
                            this.isPinned = true;
                            this.show();
                        }
                    });
                }
            }
        },

        clearHoverTimer() {
            if (this.hoverTimer) {
                clearTimeout(this.hoverTimer);
                this.hoverTimer = null;
            }
        },

        scheduleHide(delay = 300) {
            this.clearHoverTimer();
            this.hoverTimer = setTimeout(() => {
                this.hide();
            }, delay);
        },

        toggle() {
            this.$refs.content?.togglePopover();
        },

        show() {
            this.$refs.content?.showPopover();
        },

        hide() {
            this.$refs.content?.hidePopover();
        },

        handleToggle(event) {
            this.open = this.$refs.content?.matches(':popover-open') || false;

            if (!this.open) {
                this.isPinned = false;
                this.clearHoverTimer();
            }

            options.onToggle?.call(this, event);
        },

        ...options.extend
    };
}
