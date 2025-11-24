import { HOVER_DELAY_MS } from './component-constants';

/**
 * Get all focusable elements within a container.
 *
 * @param {HTMLElement} container - The container element
 * @returns {HTMLElement[]} Array of focusable elements
 */
function getFocusableElements(container) {
    const selector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(container.querySelectorAll(selector)).filter(
        el => !el.hasAttribute('disabled') && el.offsetParent !== null
    );
}

/**
 * Create a focus trap within a container element.
 *
 * @param {HTMLElement} container - The container to trap focus within
 * @param {HTMLElement} [returnFocus] - Element to return focus to when trap is released
 * @returns {{ activate: () => void, deactivate: () => void }} Focus trap controller
 */
export function createFocusTrap(container, returnFocus = null) {
    let previousActiveElement = returnFocus || document.activeElement;

    function handleKeydown(event) {
        if (event.key !== 'Tab') return;

        const focusable = getFocusableElements(container);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    return {
        activate() {
            previousActiveElement = returnFocus || document.activeElement;
            container.addEventListener('keydown', handleKeydown);

            const focusable = getFocusableElements(container);
            if (focusable.length > 0) {
                requestAnimationFrame(() => focusable[0].focus());
            }
        },
        deactivate() {
            container.removeEventListener('keydown', handleKeydown);

            if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
                previousActiveElement.focus();
            }
        }
    };
}

/**
 * Configuration options for overlay component.
 *
 * @typedef {Object} OverlayOptions
 * @property {'click'|'hover'|'both'} [trigger='click'] - How the overlay is triggered
 * @property {boolean} [trapFocus=false] - Whether to trap focus within the overlay
 * @property {function(): void} [onInit] - Callback after initialization
 * @property {function(Event): void} [onToggle] - Callback when overlay toggles
 * @property {Object} [extend] - Additional properties/methods to extend component
 */

/**
 * Reusable base component for popover-based overlays.
 *
 * This component leverages the native Popover API for:
 * - Light dismiss behavior (click outside to close)
 * - Focus management and keyboard handling
 * - Top-layer rendering (above all other content)
 * - Built-in accessibility features
 *
 * Provides Alpine.js reactivity and extension points for building
 * specialized components like Dropdown, Tooltip, Select, Autocomplete, etc.
 *
 * Features:
 * - Multiple trigger modes: click, hover, or both
 * - CSS anchor positioning for automatic placement
 * - Hover delay support for better UX
 * - Pin mode for keeping overlay open
 * - Composable architecture via options.extend
 *
 * @param {OverlayOptions} [options={}] - Configuration options
 * @returns {Object} Alpine.js component object
 *
 * @example Basic usage:
 * ```js
 * Alpine.data('myPopover', () => ({
 *     ...overlay({ trigger: 'click' })
 * }))
 * ```
 *
 * @example With extensions:
 * ```js
 * Alpine.data('myDropdown', () => ({
 *     ...overlay({
 *         trigger: 'click',
 *         onInit() {
 *             console.log('Dropdown initialized');
 *         },
 *         extend: {
 *             customMethod() {
 *                 // Custom dropdown logic
 *             }
 *         }
 *     })
 * }))
 * ```
 */
export function overlay(options = {}) {
    return {
        /**
         * Whether the overlay is currently open.
         * @type {boolean}
         */
        open: false,

        /**
         * How the overlay is triggered.
         * @type {'click'|'hover'|'both'}
         */
        triggerMode: options.trigger || 'click',

        /**
         * Timer handle for delayed hide on hover.
         * @type {number|null}
         */
        hoverTimer: null,

        /**
         * Whether the overlay is pinned open (prevents hover hide).
         * @type {boolean}
         */
        isPinned: false,

        /**
         * Focus trap controller instance.
         * @type {{ activate: () => void, deactivate: () => void }|null}
         */
        focusTrap: null,

        /**
         * Initialize the overlay component.
         *
         * Sets up popover API, anchor positioning, event listeners,
         * and trigger mode behavior.
         *
         * @returns {void}
         */
        init() {
            this.$nextTick(() => {
                this.setupPopover();
                this.setupAnchor();
                this.setupEventListeners();
                this.setupTriggerMode();
                this.setupFocusTrap();
                this.setupLivewireCompat();

                options.onInit?.call(this);
            });
        },

        /**
         * Setup focus trap if enabled.
         *
         * @returns {void}
         */
        setupFocusTrap() {
            if (!options.trapFocus || !this.$refs.content || !this.$refs.trigger) return;

            this.focusTrap = createFocusTrap(this.$refs.content, this.$refs.trigger);
        },

        /**
         * Setup Livewire compatibility.
         *
         * Hooks into Livewire's morph lifecycle to re-establish anchor
         * positioning after DOM updates when using wire:ignore.self.
         *
         * @returns {void}
         */
        setupLivewireCompat() {
            if (typeof Livewire === 'undefined') return;

            const wireEl = this.$el.closest('[wire\\:id]');
            if (!wireEl) return;

            const componentId = wireEl.getAttribute('wire:id');

            this._livewireCleanup = Livewire.hook('morphed', ({ component }) => {
                if (component.id !== componentId) return;

                this.$nextTick(() => {
                    this.setupAnchor();
                });
            });
        },

        /**
         * Setup popover element (reserved for future use).
         *
         * @returns {void}
         */
        setupPopover() {
            if (!this.$refs.content || !this.$refs.trigger) return;
        },

        /**
         * Setup CSS anchor positioning between trigger and content.
         *
         * Creates a unique anchor name and links the content to it,
         * enabling automatic positioning via CSS anchor positioning.
         *
         * @returns {void}
         */
        setupAnchor() {
            if (!this.$refs.trigger || !this.$refs.content) return;

            const anchorId = `anchor-${this.$id('overlay')}`;
            this.$refs.trigger.style.anchorName = `--${anchorId}`;
            this.$refs.content.style.positionAnchor = `--${anchorId}`;
        },

        /**
         * Setup event listeners for popover toggle events.
         *
         * Listens to the native 'toggle' event from the Popover API
         * to sync Alpine state with popover state.
         *
         * @returns {void}
         */
        setupEventListeners() {
            if (!this.$refs.content) return;

            this.$refs.content.addEventListener('toggle', (e) => {
                this.handleToggle(e);
            });
        },

        /**
         * Setup trigger mode behavior (click, hover, or both).
         *
         * Adds appropriate event listeners based on triggerMode:
         * - hover: Show on mouseenter, hide on mouseleave with delay
         * - both: Both click and hover behaviors
         *
         * Respects isPinned state to prevent hover-based hiding.
         *
         * @returns {void}
         */
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

        /**
         * Clear any pending hover hide timer.
         *
         * Prevents scheduled hide from executing if mouse re-enters
         * the trigger or content area.
         *
         * @returns {void}
         */
        clearHoverTimer() {
            if (this.hoverTimer) {
                clearTimeout(this.hoverTimer);
                this.hoverTimer = null;
            }
        },

        /**
         * Schedule overlay to hide after a delay.
         *
         * Used for hover mode to provide a better UX by not
         * immediately hiding when mouse leaves.
         *
         * @param {number} [delay=HOVER_DELAY_MS] - Delay in milliseconds
         * @returns {void}
         */
        scheduleHide(delay = HOVER_DELAY_MS) {
            this.clearHoverTimer();
            this.hoverTimer = setTimeout(() => {
                this.hide();
            }, delay);
        },

        /**
         * Toggle the overlay open/closed state.
         *
         * Delegates to the native Popover API togglePopover method.
         * Includes deduplication to prevent light dismiss conflicts.
         *
         * @returns {void}
         */
        toggle() {
            const isActuallyOpen = this.$refs.content?.matches(':popover-open') || false;

            // If Alpine thinks it's open but popover is actually closed,
            // light dismiss already handled closing - just sync state
            if (this.open && !isActuallyOpen) {
                this.open = false;
                return;
            }

            this.$refs.content?.togglePopover();
        },

        /**
         * Show the overlay.
         *
         * Refreshes anchor positioning before showing to ensure
         * correct placement even if trigger has moved.
         *
         * @returns {void}
         */
        show() {
            this.setupAnchor();
            this.$refs.content?.showPopover();
        },

        /**
         * Hide the overlay.
         *
         * Delegates to the native Popover API hidePopover method.
         *
         * @returns {void}
         */
        hide() {
            this.$refs.content?.hidePopover();
        },

        /**
         * Handle popover toggle events from the native API.
         *
         * Syncs Alpine state with actual popover state and calls
         * user-provided onToggle callback.
         *
         * @param {Event} event - The native toggle event
         * @returns {void}
         */
        handleToggle(event) {
            this.open = this.$refs.content?.matches(':popover-open') || false;

            if (this.open) {
                this.focusTrap?.activate();
            } else {
                this.isPinned = false;
                this.clearHoverTimer();
                this.focusTrap?.deactivate();
            }

            options.onToggle?.call(this, event);
        },

        /**
         * Clean up component resources.
         *
         * Clears any pending timers to prevent memory leaks.
         * Should be called when the component is destroyed.
         *
         * @returns {void}
         */
        destroy() {
            this.clearHoverTimer();
            this.focusTrap?.deactivate();
            this._livewireCleanup?.();
        },

        ...options.extend
    };
}
