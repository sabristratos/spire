import { HOVER_DELAY_MS } from './component-constants';

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
            const triggerElement = this.$refs.trigger;
            const contentElement = this.$refs.content;

            if (!triggerElement || !contentElement) {
                return;
            }

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
        },

        clearHoverTimer() {
            if (this.hoverTimer) {
                clearTimeout(this.hoverTimer);
                this.hoverTimer = null;
            }
        },

        scheduleHide(delay = HOVER_DELAY_MS) {
            this.clearHoverTimer();
            this.hoverTimer = setTimeout(() => {
                this.hide();
            }, delay);
        },

        toggle() {
            this.$refs.content?.togglePopover();
        },

        show() {
            this.setupAnchor();
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

        destroy() {
            this.clearHoverTimer();
        },

        ...options.extend
    };
}
