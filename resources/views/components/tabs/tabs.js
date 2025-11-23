import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';

/**
 * Spire UI Tabs Component
 *
 * Provides accessible tabbed interface with keyboard navigation.
 * Follows WAI-ARIA tabs pattern with roving tabindex.
 */
export function tabsComponent(config = {}) {
    return {
        // State
        activeTab: config.defaultValue || config.value || '',
        tabs: [],
        panels: [],
        orientation: config.orientation || 'horizontal',
        activationMode: config.activationMode || 'automatic',
        name: config.name || null,
        syncHash: config.syncHash || false,
        tabsId: config.tabsId || null,

        // Cursor state for animation
        cursorStyle: {
            left: '0px',
            top: '0px',
            width: '0px',
            height: '0px',
        },
        cursorReady: false,

        // Lazy loading tracking
        activatedTabs: new Set(),

        // Resize observer
        resizeObserver: null,

        // Livewire morph handler
        morphHandler: null,

        /**
         * Initialize the tabs component.
         */
        init() {
            this.$nextTick(() => {
                this.updateTabsAndPanels();

                // Check URL hash first if syncHash is enabled
                if (this.syncHash) {
                    const hash = window.location.hash.slice(1);
                    if (hash && this.tabs.find(t => t.dataset.spireTabsValue === hash)) {
                        this.activeTab = hash;
                    }
                }

                // Set initial active tab if not specified
                if (!this.activeTab && this.tabs.length > 0) {
                    const firstEnabledTab = this.tabs.find(tab =>
                        tab.getAttribute('aria-disabled') !== 'true'
                    );
                    if (firstEnabledTab) {
                        this.activeTab = firstEnabledTab.dataset.spireTabsValue;
                    }
                }

                // Track initial active tab for lazy loading
                if (this.activeTab) {
                    this.activatedTabs.add(this.activeTab);
                }

                // Update ARIA attributes
                this.updateTabAttributes();

                // Setup resize observer for cursor repositioning
                this.setupResizeObserver();

                // Use requestAnimationFrame to ensure layout is complete before measuring
                requestAnimationFrame(() => {
                    this.updateCursorPosition(false);

                    // Retry with increasing delays if dimensions are still 0
                    const retryDelays = [50, 100, 200];
                    let retryIndex = 0;

                    const retryUpdate = () => {
                        if (this.cursorStyle.width === '0px' && retryIndex < retryDelays.length) {
                            setTimeout(() => {
                                this.updateCursorPosition(false);
                                retryIndex++;
                                retryUpdate();
                            }, retryDelays[retryIndex]);
                        }
                    };
                    retryUpdate();

                    // Enable cursor transitions after initial positioning
                    setTimeout(() => {
                        this.cursorReady = true;
                    }, 50);
                });

                // Setup hash change listener
                if (this.syncHash) {
                    this.hashChangeHandler = () => {
                        const hash = window.location.hash.slice(1);
                        if (hash && hash !== this.activeTab && this.tabs.find(t => t.dataset.spireTabsValue === hash)) {
                            this.selectTab(hash);
                        }
                    };
                    window.addEventListener('hashchange', this.hashChangeHandler);
                }

                // Listen for Livewire morph events to refresh DOM references
                this.morphHandler = () => {
                    this.updateTabsAndPanels();
                    this.updateTabAttributes();
                    this.updateCursorPosition(false);
                };
                document.addEventListener('livewire:morphed', this.morphHandler);

                // Watch for tab changes to animate cursor
                this.$watch('activeTab', (newValue, oldValue) => {
                    this.updateCursorPosition(true);

                    // Track for lazy loading
                    if (newValue) {
                        this.activatedTabs.add(newValue);
                    }

                    // Update URL hash if enabled
                    if (this.syncHash && newValue !== window.location.hash.slice(1)) {
                        history.pushState(null, '', `#${newValue}`);
                    }
                });
            });
        },

        // Setup resize observer for cursor repositioning
        setupResizeObserver() {
            const tabList = this.$el.querySelector('[role="tablist"]');
            if (!tabList) return;

            this.resizeObserver = new ResizeObserver(() => {
                this.updateCursorPosition(false);
            });

            this.resizeObserver.observe(tabList);
        },

        // Update cursor position based on active tab
        updateCursorPosition(animate = true) {
            const activeTabEl = this.tabs.find(tab =>
                tab.dataset.spireTabsValue === this.activeTab
            );

            if (!activeTabEl) return;

            const tabList = activeTabEl.parentElement;
            if (!tabList) return;

            const variant = this.$el.dataset.spireVariant || 'underline';
            const orientation = this.$el.dataset.spireOrientation || 'horizontal';
            const isUnderline = variant === 'underline';
            const isHorizontal = orientation === 'horizontal';
            const isHorizontalUnderline = isUnderline && isHorizontal;
            const isVerticalUnderline = isUnderline && !isHorizontal;

            // Horizontal underline: CSS controls height (h-0.5) and bottom position
            // Vertical underline: CSS controls width (2px) and left position
            // All other variants: JS controls all dimensions
            this.cursorStyle = {
                left: isVerticalUnderline ? '' : `${activeTabEl.offsetLeft}px`,
                top: isHorizontalUnderline ? 'auto' : `${activeTabEl.offsetTop}px`,
                width: isVerticalUnderline ? '' : `${activeTabEl.offsetWidth}px`,
                height: isHorizontalUnderline ? '' : `${activeTabEl.offsetHeight}px`,
            };
        },

        // Update tabs and panels from DOM
        updateTabsAndPanels() {
            const tabList = this.$el.querySelector('[role="tablist"]');
            if (tabList) {
                // Only get direct child tabs (not nested tabs from other components)
                this.tabs = Array.from(tabList.children).filter(
                    child => child.getAttribute('role') === 'tab'
                );
            }

            // Only get direct child panels
            this.panels = Array.from(
                this.$el.querySelectorAll(':scope > [role="tabpanel"]')
            );
        },

        // Tab selection
        selectTab(value) {
            if (this.isDisabled(value)) return;

            const previousValue = this.activeTab;
            this.activeTab = value;
            this.updateTabAttributes();

            // Dispatch change event for Livewire/external listeners
            this.$dispatch(SPIRE_EVENTS.TABS_CHANGED, createEventPayload({
                id: this.$id('tabs'),
                name: this.name,
                value: value,
                previousValue: previousValue,
            }));
        },

        // Keyboard navigation
        handleKeydown(event) {
            const key = event.key;
            const isHorizontal = this.orientation === 'horizontal';

            const keyActions = {
                [isHorizontal ? 'ArrowRight' : 'ArrowDown']: () => this.focusNextTab(),
                [isHorizontal ? 'ArrowLeft' : 'ArrowUp']: () => this.focusPrevTab(),
                'Home': () => this.focusFirstTab(),
                'End': () => this.focusLastTab(),
                'Enter': () => this.activateFocusedTab(),
                ' ': () => this.activateFocusedTab(),
            };

            if (keyActions[key]) {
                event.preventDefault();
                keyActions[key]();
            }
        },

        // Focus management
        getCurrentTabIndex() {
            return this.tabs.findIndex(tab => tab === document.activeElement);
        },

        findNextEnabledTab(currentIndex, direction) {
            const length = this.tabs.length;
            let index = currentIndex + direction;

            // Wrap around
            while (index < 0) index += length;
            while (index >= length) index -= length;

            // Find next enabled tab
            let count = 0;
            while (count < length) {
                if (this.tabs[index].getAttribute('aria-disabled') !== 'true') {
                    return index;
                }
                index = (index + direction + length) % length;
                count++;
            }

            return currentIndex;
        },

        focusNextTab() {
            const currentIndex = this.getCurrentTabIndex();
            const nextIndex = this.findNextEnabledTab(
                currentIndex >= 0 ? currentIndex : -1,
                1
            );
            this.focusTab(nextIndex);
        },

        focusPrevTab() {
            const currentIndex = this.getCurrentTabIndex();
            const prevIndex = this.findNextEnabledTab(
                currentIndex >= 0 ? currentIndex : this.tabs.length,
                -1
            );
            this.focusTab(prevIndex);
        },

        focusFirstTab() {
            const firstIndex = this.findNextEnabledTab(-1, 1);
            this.focusTab(firstIndex);
        },

        focusLastTab() {
            const lastIndex = this.findNextEnabledTab(this.tabs.length, -1);
            this.focusTab(lastIndex);
        },

        focusTab(index) {
            if (index < 0 || index >= this.tabs.length) return;

            // Update tabindex values (roving tabindex)
            this.tabs.forEach((tab, i) => {
                tab.tabIndex = i === index ? 0 : -1;
            });

            // Focus the tab
            this.tabs[index].focus();

            // Auto-activate if in automatic mode
            if (this.activationMode === 'automatic') {
                const value = this.tabs[index].dataset.spireTabsValue;
                if (value && !this.isDisabled(value)) {
                    this.selectTab(value);
                }
            }
        },

        activateFocusedTab() {
            const currentIndex = this.getCurrentTabIndex();
            if (currentIndex >= 0) {
                const value = this.tabs[currentIndex].dataset.spireTabsValue;
                if (value) {
                    this.selectTab(value);
                }
            }
        },

        // Helper methods
        isActive(value) {
            return this.activeTab === value;
        },

        getTabId(value) {
            return this.tabsId ? `${this.tabsId}-tab-${value}` : `tab-${value}`;
        },

        getPanelId(value) {
            return this.tabsId ? `${this.tabsId}-panel-${value}` : `panel-${value}`;
        },

        isDisabled(value) {
            const tab = this.tabs.find(t => t.dataset.spireTabsValue === value);
            return tab?.getAttribute('aria-disabled') === 'true';
        },

        // Check if tab has been activated (for lazy loading)
        hasBeenActivated(value) {
            return this.activatedTabs.has(value);
        },

        updateTabAttributes() {
            this.tabs.forEach(tab => {
                const isActive = tab.dataset.spireTabsValue === this.activeTab;
                tab.setAttribute('aria-selected', isActive ? 'true' : 'false');

                // Only update tabindex if not currently focused
                if (document.activeElement !== tab) {
                    tab.tabIndex = isActive ? 0 : -1;
                }
            });
        },

        // Cleanup
        destroy() {
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
                this.resizeObserver = null;
            }

            if (this.hashChangeHandler) {
                window.removeEventListener('hashchange', this.hashChangeHandler);
                this.hashChangeHandler = null;
            }

            if (this.morphHandler) {
                document.removeEventListener('livewire:morphed', this.morphHandler);
                this.morphHandler = null;
            }
        }
    };
}
