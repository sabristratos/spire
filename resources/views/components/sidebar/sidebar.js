import { createEventPayload } from '../../../js/shared/events';
import { TYPEAHEAD_TIMEOUT_MS } from '../../../js/shared/component-constants';

export function sidebarComponent(config = {}) {
    return {
        collapsed: config.collapsed || false,
        mobileOpen: false,
        eventListeners: [],
        mobileBreakpoint: config.mobileBreakpoint || 768,
        storageKey: config.storageKey || 'spire-sidebar-collapsed',
        persist: config.persist !== false,
        items: [],
        highlightedIndex: -1,
        typeaheadString: '',
        typeaheadTimeout: null,

        get sidebar() {
            return this.$refs.sidebar;
        },

        init() {
            if (this.persist && this.storageKey) {
                const stored = localStorage.getItem(this.storageKey);
                if (stored !== null) {
                    this.collapsed = stored === 'true';
                    this.sidebar.dataset.spireCollapsed = this.collapsed ? 'true' : 'false';
                    this.sidebar.classList.toggle('spire-sidebar--collapsed', this.collapsed);
                }
            }

            this.$nextTick(() => {
                this.updateNavigableItems();
            });

            this.addWindowListener('keydown', (e) => {
                if (e.key === 'Escape' && this.mobileOpen) {
                    this.closeMobile();
                    return;
                }

                if (!this.sidebar.contains(document.activeElement)) return;

                const focusedTag = document.activeElement?.tagName?.toLowerCase();
                if (focusedTag === 'input' || focusedTag === 'textarea') return;

                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        this.navigateNext();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.navigatePrev();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.navigateFirst();
                        break;
                    case 'End':
                        e.preventDefault();
                        this.navigateLast();
                        break;
                    case 'ArrowRight':
                        this.handleArrowRight(e);
                        break;
                    case 'ArrowLeft':
                        this.handleArrowLeft(e);
                        break;
                    default:
                        this.handleTypeahead(e);
                }
            });

            this.addWindowListener('click', (e) => {
                if (this.mobileOpen && !this.sidebar.contains(e.target)) {
                    const backdrop = document.querySelector('[data-spire-sidebar-backdrop]');
                    if (backdrop && backdrop.contains(e.target)) {
                        this.closeMobile();
                    }
                }
            });

            this.addWindowListener('resize', () => {
                if (window.innerWidth >= this.mobileBreakpoint && this.mobileOpen) {
                    this.closeMobile();
                }
            });

            this.sidebar.addEventListener('sidebar-toggle', () => this.toggle());
            this.sidebar.addEventListener('sidebar-open-mobile', () => this.openMobile());
            this.sidebar.addEventListener('sidebar-close-mobile', () => this.closeMobile());

            this.addWindowListener('spire-sidebar-toggle', () => this.toggle());
            this.addWindowListener('spire-sidebar-open-mobile', () => this.openMobile());

            const initialCollapsed = this.sidebar.dataset.spireCollapsed;
            if (initialCollapsed === 'true') {
                this.collapsed = true;
            }

            this.$watch('collapsed', (value) => {
                this.sidebar.dataset.spireCollapsed = value ? 'true' : 'false';
                this.sidebar.classList.toggle('spire-sidebar--collapsed', value);

                if (this.persist && this.storageKey) {
                    localStorage.setItem(this.storageKey, value ? 'true' : 'false');
                }
            });

            this.$watch('mobileOpen', (value) => {
                this.sidebar.dataset.spireMobileOpen = value ? 'true' : 'false';

                if (value) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        },

        toggle() {
            const previousValue = this.collapsed;
            this.collapsed = !this.collapsed;

            this.$dispatch('sidebar-toggled', createEventPayload({
                value: this.collapsed,
                previousValue,
                metadata: {
                    source: 'toggle'
                }
            }));
        },

        expand() {
            if (this.collapsed) {
                this.toggle();
            }
        },

        collapse() {
            if (!this.collapsed) {
                this.toggle();
            }
        },

        openMobile() {
            this.mobileOpen = true;

            if (this.collapsed) {
                this.sidebar.classList.remove('spire-sidebar--collapsed');
            }

            this.$dispatch('sidebar-mobile-opened', createEventPayload({
                value: true
            }));

            this.$nextTick(() => {
                const firstItem = this.sidebar.querySelector('[data-spire-sidebar-item]:not([data-spire-disabled="true"])');
                firstItem?.focus();
            });
        },

        closeMobile() {
            this.mobileOpen = false;

            if (this.collapsed) {
                this.sidebar.classList.add('spire-sidebar--collapsed');
            }

            this.$dispatch('sidebar-mobile-closed', createEventPayload({
                value: false
            }));
        },

        toggleMobile() {
            if (this.mobileOpen) {
                this.closeMobile();
            } else {
                this.openMobile();
            }
        },

        isMobile() {
            return window.innerWidth < this.mobileBreakpoint;
        },

        updateNavigableItems() {
            this.items = Array.from(
                this.sidebar.querySelectorAll('[data-spire-sidebar-item]:not([data-spire-disabled="true"])')
            ).filter(item => {
                return item.offsetParent !== null;
            });
        },

        navigateNext() {
            this.updateNavigableItems();
            if (this.items.length === 0) return;

            const currentIndex = this.getCurrentItemIndex();
            const nextIndex = currentIndex + 1;

            if (nextIndex < this.items.length) {
                this.focusItem(nextIndex);
            } else {
                this.focusItem(0);
            }
        },

        navigatePrev() {
            this.updateNavigableItems();
            if (this.items.length === 0) return;

            const currentIndex = this.getCurrentItemIndex();
            const prevIndex = currentIndex - 1;

            if (prevIndex >= 0) {
                this.focusItem(prevIndex);
            } else {
                this.focusItem(this.items.length - 1);
            }
        },

        navigateFirst() {
            this.updateNavigableItems();
            if (this.items.length > 0) {
                this.focusItem(0);
            }
        },

        navigateLast() {
            this.updateNavigableItems();
            if (this.items.length > 0) {
                this.focusItem(this.items.length - 1);
            }
        },

        getCurrentItemIndex() {
            const focused = document.activeElement;
            return this.items.indexOf(focused);
        },

        focusItem(index) {
            if (index >= 0 && index < this.items.length) {
                this.items[index].focus();
                this.highlightedIndex = index;

                this.items[index].scrollIntoView({
                    block: 'nearest',
                    inline: 'nearest'
                });
            }
        },

        handleArrowRight(e) {
            const focused = document.activeElement;
            if (!focused || !this.sidebar.contains(focused)) return;

            const wrapper = focused.closest('[data-spire-sidebar-item-wrapper]');
            if (wrapper) {
                const isExpanded = wrapper.dataset.spireExpanded === 'true';
                const children = wrapper.querySelector('[data-spire-sidebar-item-children]');

                if (children && !isExpanded) {
                    e.preventDefault();
                    const itemComponent = Alpine.$data(wrapper);
                    if (itemComponent && itemComponent.expand) {
                        itemComponent.expand();
                        this.$nextTick(() => {
                            this.updateNavigableItems();
                            const firstChild = children.querySelector('[data-spire-sidebar-item]:not([data-spire-disabled="true"])');
                            if (firstChild) {
                                firstChild.focus();
                            }
                        });
                    }
                }
            }
        },

        handleArrowLeft(e) {
            const focused = document.activeElement;
            if (!focused || !this.sidebar.contains(focused)) return;

            const parentChildren = focused.closest('[data-spire-sidebar-item-children]');
            if (parentChildren) {
                e.preventDefault();
                const parentWrapper = parentChildren.closest('[data-spire-sidebar-item-wrapper]');
                if (parentWrapper) {
                    const parentItem = parentWrapper.querySelector(':scope > [data-spire-sidebar-item]');
                    if (parentItem) {
                        parentItem.focus();
                    }
                }
                return;
            }

            const wrapper = focused.closest('[data-spire-sidebar-item-wrapper]');
            if (wrapper) {
                const isExpanded = wrapper.dataset.spireExpanded === 'true';
                if (isExpanded) {
                    e.preventDefault();
                    const itemComponent = Alpine.$data(wrapper);
                    if (itemComponent && itemComponent.collapse) {
                        itemComponent.collapse();
                        this.$nextTick(() => {
                            this.updateNavigableItems();
                        });
                    }
                }
            }
        },

        handleTypeahead(e) {
            const char = e.key;
            if (char.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) return;

            clearTimeout(this.typeaheadTimeout);
            this.typeaheadString += char.toLowerCase();

            this.updateNavigableItems();
            const matchIndex = this.findTypeaheadMatch(this.typeaheadString);
            if (matchIndex >= 0) {
                this.focusItem(matchIndex);
            }

            this.typeaheadTimeout = setTimeout(() => {
                this.typeaheadString = '';
            }, TYPEAHEAD_TIMEOUT_MS);
        },

        findTypeaheadMatch(searchString) {
            const startIndex = Math.max(0, this.highlightedIndex + 1);

            for (let i = 0; i < this.items.length; i++) {
                const index = (startIndex + i) % this.items.length;
                const label = this.items[index].querySelector('.spire-sidebar-item-label');
                const text = label?.textContent?.toLowerCase() || this.items[index].textContent?.toLowerCase() || '';
                if (text.trim().startsWith(searchString)) {
                    return index;
                }
            }

            return -1;
        },

        addWindowListener(event, handler) {
            window.addEventListener(event, handler);
            this.eventListeners.push({ event, handler });
        },

        destroy() {
            this.eventListeners.forEach(({ event, handler }) => {
                window.removeEventListener(event, handler);
            });
            this.eventListeners = [];

            clearTimeout(this.typeaheadTimeout);

            document.body.style.overflow = '';
        }
    };
}

export function sidebarSectionComponent(config = {}) {
    return {
        open: config.defaultOpen !== false,
        id: config.id || null,
        persist: config.persist !== false,
        storageKey: 'spire-sidebar-sections',

        init() {
            if (this.persist && this.id) {
                const stored = this.getStoredState();
                if (stored !== null) {
                    this.open = stored;
                }
            }

            this.$watch('open', (value) => {
                this.$el.dataset.spireOpen = value ? 'true' : 'false';
                if (this.persist && this.id) {
                    this.saveState(value);
                }
            });

            this.$el.dataset.spireOpen = this.open ? 'true' : 'false';
        },

        getStoredState() {
            try {
                const stored = localStorage.getItem(this.storageKey);
                if (!stored) return null;
                const states = JSON.parse(stored);
                return states[this.id] ?? null;
            } catch {
                return null;
            }
        },

        saveState(value) {
            try {
                let states = {};
                const stored = localStorage.getItem(this.storageKey);
                if (stored) states = JSON.parse(stored);
                states[this.id] = value;
                localStorage.setItem(this.storageKey, JSON.stringify(states));
            } catch {
            }
        },

        toggle() {
            this.open = !this.open;
        },

        expand() {
            this.open = true;
        },

        collapse() {
            this.open = false;
        }
    };
}

export function sidebarItemComponent(config = {}) {
    return {
        expanded: config.defaultExpanded || false,
        hasChildren: false,
        id: config.id || null,
        persist: config.persist !== false,
        storageKey: 'spire-sidebar-items',

        init() {
            const children = this.$el.querySelector('[data-spire-sidebar-item-children]');
            this.hasChildren = children && children.children.length > 0;

            if (this.hasChildren && this.persist && this.id) {
                const stored = this.getStoredState();
                if (stored !== null) {
                    this.expanded = stored;
                }
            }

            this.$watch('expanded', (value) => {
                this.$el.dataset.spireExpanded = value ? 'true' : 'false';
                if (this.hasChildren && this.persist && this.id) {
                    this.saveState(value);
                }
            });

            if (this.hasChildren) {
                this.$el.dataset.spireExpanded = this.expanded ? 'true' : 'false';
            }
        },

        getStoredState() {
            try {
                const stored = localStorage.getItem(this.storageKey);
                if (!stored) return null;
                const states = JSON.parse(stored);
                return states[this.id] ?? null;
            } catch {
                return null;
            }
        },

        saveState(value) {
            try {
                let states = {};
                const stored = localStorage.getItem(this.storageKey);
                if (stored) states = JSON.parse(stored);
                states[this.id] = value;
                localStorage.setItem(this.storageKey, JSON.stringify(states));
            } catch {
            }
        },

        toggle() {
            if (this.hasChildren) {
                this.expanded = !this.expanded;
            }
        },

        expand() {
            if (this.hasChildren) {
                this.expanded = true;
            }
        },

        collapse() {
            if (this.hasChildren) {
                this.expanded = false;
            }
        }
    };
}
