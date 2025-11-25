import { HOVER_DELAY_MS } from './component-constants';

let overlayInstanceCounter = 0;

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
         * The trigger element for this specific component instance.
         * @type {HTMLElement|null}
         */
        _triggerEl: null,

        /**
         * The content element for this specific component instance.
         * @type {HTMLElement|null}
         */
        _contentEl: null,

        /**
         * Stable anchor ID for CSS anchor positioning.
         * Declared here so each component instance has its own property,
         * preventing Alpine scope chain from finding parent's value.
         * @type {string|null}
         */
        _stableAnchorId: null,

        /**
         * Initialize the overlay component.
         *
         * Sets up popover API, anchor positioning, event listeners,
         * and trigger mode behavior.
         *
         * @returns {void}
         */
        init() {
            // Generate unique ID immediately to prevent Alpine scope chain inheritance
            this._stableAnchorId = `anchor-overlay-${++overlayInstanceCounter}`;

            this.$nextTick(() => {
                this.resolveElements();
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
         * Resolve trigger and content elements for this component instance.
         *
         * Finds elements with x-ref that belong to this component's scope,
         * not to any nested x-data components.
         *
         * @returns {void}
         */
        resolveElements() {
            const root = this.$el;
            if (!root) return;

            const findOwnRef = (refName) => {
                if (root.getAttribute('x-ref') === refName) {
                    return root;
                }

                const candidates = root.querySelectorAll(`[x-ref="${refName}"]`);

                for (const el of candidates) {
                    let parent = el.parentElement;
                    while (parent && parent !== root) {
                        if (parent.hasAttribute('x-data')) {
                            break;
                        }
                        parent = parent.parentElement;
                    }
                    if (parent === root || parent === null) {
                        return el;
                    }
                }
                return null;
            };

            this._triggerEl = findOwnRef('trigger');
            this._contentEl = findOwnRef('content');
        },

        /**
         * Setup focus trap if enabled.
         *
         * @returns {void}
         */
        setupFocusTrap() {
            if (!options.trapFocus || !this._contentEl || !this._triggerEl) return;

            this.focusTrap = createFocusTrap(this._contentEl, this._triggerEl);
        },

        /**
         * Setup Livewire compatibility.
         *
         * Hooks into Livewire's morph lifecycle to preserve and re-establish
         * anchor positioning during DOM updates. Uses morph.updating to detect
         * elements before morphing and morph.updated to restore styles after.
         *
         * @returns {void}
         */
        setupLivewireCompat() {
            if (typeof Livewire === 'undefined') return;

            const wireEl = this.$el.closest('[wire\\:id]');
            if (!wireEl) return;

            const componentId = wireEl.getAttribute('wire:id');

            this._morphUpdatingCleanup = Livewire.hook('morph.updating', ({ el, component }) => {
                if (component.id !== componentId) return;
                if (!this.$el.contains(el)) return;

                if (el === this._triggerEl && el.style.anchorName) {
                    el.__spireAnchorName = el.style.anchorName;
                    el.__spireNeedsAnchorRestore = true;
                } else if (el === this._contentEl && el.style.positionAnchor) {
                    el.__spirePositionAnchor = el.style.positionAnchor;
                    el.__spireNeedsAnchorRestore = true;
                }
            });

            this._morphUpdatedCleanup = Livewire.hook('morph.updated', ({ el, component }) => {
                if (component.id !== componentId) return;
                if (!el.__spireNeedsAnchorRestore) return;

                if (el === this._triggerEl) {
                    el.style.anchorName = el.__spireAnchorName || `--${this._stableAnchorId}`;
                } else if (el === this._contentEl) {
                    el.style.positionAnchor = el.__spirePositionAnchor || `--${this._stableAnchorId}`;
                }

                delete el.__spireNeedsAnchorRestore;
                delete el.__spireAnchorName;
                delete el.__spirePositionAnchor;
            });

            this._livewireCleanup = Livewire.hook('morphed', ({ component }) => {
                if (component.id !== componentId) return;

                this.$nextTick(() => {
                    this.resolveElements();

                    if (this._triggerEl && !this._triggerEl.style.anchorName) {
                        this._triggerEl.style.anchorName = `--${this._stableAnchorId}`;
                    }
                    if (this._contentEl && !this._contentEl.style.positionAnchor) {
                        this._contentEl.style.positionAnchor = `--${this._stableAnchorId}`;
                    }
                });
            });
        },

        /**
         * Setup popover element (reserved for future use).
         *
         * @returns {void}
         */
        setupPopover() {
            if (!this._contentEl || !this._triggerEl) return;
        },

        /**
         * Setup CSS anchor positioning between trigger and content.
         *
         * Creates a unique anchor name and links the content to it,
         * enabling automatic positioning via CSS anchor positioning.
         * Uses the stable anchor ID generated in init().
         *
         * @returns {void}
         */
        setupAnchor() {
            if (!this._triggerEl || !this._contentEl) return;

            this._triggerEl.style.anchorName = `--${this._stableAnchorId}`;
            this._contentEl.style.positionAnchor = `--${this._stableAnchorId}`;
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
            if (!this._contentEl) return;

            this._contentEl.addEventListener('toggle', (e) => {
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
            if (!this._triggerEl || !this._contentEl) return;

            if (this.triggerMode === 'hover' || this.triggerMode === 'both') {
                this._triggerEl.addEventListener('mouseenter', () => {
                    this.clearHoverTimer();
                    if (!this.isPinned) {
                        this.show();
                    }
                });

                this._triggerEl.addEventListener('mouseleave', () => {
                    if (!this.isPinned) {
                        this.scheduleHide();
                    }
                });

                this._contentEl.addEventListener('mouseenter', () => {
                    this.clearHoverTimer();
                });

                this._contentEl.addEventListener('mouseleave', () => {
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
            const isActuallyOpen = this._contentEl?.matches(':popover-open') || false;

            // If Alpine thinks it's open but popover is actually closed,
            // light dismiss already handled closing - just sync state
            if (this.open && !isActuallyOpen) {
                this.open = false;
                return;
            }

            this._contentEl?.togglePopover();
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
            this._contentEl?.showPopover();
        },

        /**
         * Hide the overlay.
         *
         * Delegates to the native Popover API hidePopover method.
         *
         * @returns {void}
         */
        hide() {
            this._contentEl?.hidePopover();
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
            this.open = this._contentEl?.matches(':popover-open') || false;

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
         * Clears any pending timers and Livewire hooks to prevent memory leaks.
         * Should be called when the component is destroyed.
         *
         * @returns {void}
         */
        destroy() {
            this.clearHoverTimer();
            this.focusTrap?.deactivate();
            this._livewireCleanup?.();
            this._morphUpdatingCleanup?.();
            this._morphUpdatedCleanup?.();
        },

        ...options.extend
    };
}
