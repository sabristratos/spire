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

        /**
         * Initialize the tabs component.
         */
        init() {
            this.$cleanup(() => this.destroy());

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

                // Initialize cursor position (without transition initially)
                this.updateCursorPosition(false);

                // Enable cursor transitions after initial positioning
                setTimeout(() => {
                    this.cursorReady = true;
                }, 50);

                // Setup resize observer for cursor repositioning
                this.setupResizeObserver();

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
            const isUnderline = variant === 'underline';

            this.cursorStyle = {
                left: `${activeTabEl.offsetLeft}px`,
                top: isUnderline ? 'auto' : `${activeTabEl.offsetTop}px`,
                width: `${activeTabEl.offsetWidth}px`,
                height: isUnderline ? '' : `${activeTabEl.offsetHeight}px`,
            };
        },

        // Update tabs and panels from DOM
        updateTabsAndPanels() {
            const tabList = this.$el.querySelector('[role="tablist"]');
            if (tabList) {
                this.tabs = Array.from(
                    tabList.querySelectorAll('[role="tab"]')
                );
            }

            this.panels = Array.from(
                this.$el.querySelectorAll('[role="tabpanel"]')
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
        }
    };
}
