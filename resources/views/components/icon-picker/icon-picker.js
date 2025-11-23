import { overlay } from '../../../js/shared/overlay';
import { keyboard } from '../../../js/shared/keyboard';
import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';

let iconCache = null;
let iconCachePromise = null;

async function fetchIcons(endpoint) {
    if (iconCache) {
        return iconCache;
    }

    if (iconCachePromise) {
        return iconCachePromise;
    }

    iconCachePromise = fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch icons');
            }
            return response.json();
        })
        .then(data => {
            iconCache = data;
            return data;
        })
        .catch(error => {
            console.error('Error fetching icons:', error);
            iconCachePromise = null;
            return {};
        });

    return iconCachePromise;
}

export function iconPickerComponent(config = {}) {
    return {
        findScrollableAncestor(element) {
            let parent = element.parentElement;
            while (parent && parent !== document.body) {
                const { overflow, overflowY } = window.getComputedStyle(parent);
                if (['auto', 'scroll'].includes(overflow) || ['auto', 'scroll'].includes(overflowY)) {
                    return parent;
                }
                parent = parent.parentElement;
            }
            return null;
        },

        ...overlay({
            trigger: 'click',
            onInit() {
                this.setupKeyboard();

                this.$nextTick(() => {
                    if (this.value) {
                        this.selectedIcon = this.value;
                    }
                });

                this.$watch('value', (newValue) => {
                    this.selectedIcon = newValue || '';
                });

                this.$watch('searchQuery', () => {
                    this.$nextTick(() => {
                        this.updateItems();
                        this.resetHighlight();
                    });
                });

                this.$watch('open', (isOpen) => {
                    if (isOpen) {
                        if (!this.iconsLoaded && !this.isLoading) {
                            this.loadIcons();
                        }

                        this.$nextTick(() => {
                            const wrapper = this.$refs.searchInputWrapper;
                            if (wrapper) {
                                const searchInput = wrapper.querySelector('input[type="text"]');
                                if (searchInput) {
                                    const scrollParent = this.findScrollableAncestor(searchInput);
                                    const scrollTop = scrollParent?.scrollTop;

                                    this.$focus.focus(searchInput);

                                    if (scrollParent && scrollTop !== undefined) {
                                        scrollParent.scrollTop = scrollTop;
                                    }
                                }
                            }
                        });
                    } else {
                        this.searchQuery = '';
                        this.resetHighlight();
                    }
                });
            }
        }),

        ...keyboard({
            pattern: 'activedescendant',
            role: 'listbox',
            itemSelector: '[role="option"]:not([aria-disabled="true"])',
            orientation: 'vertical',
            wrap: true,
            onSelect(item) {
                const iconName = item.getAttribute('data-icon-name');
                if (iconName) {
                    this.selectIcon(iconName);
                }
            }
        }),

        value: config.value || '',
        selectedIcon: config.value || '',
        placeholder: config.placeholder || 'Select an icon',
        searchPlaceholder: config.searchPlaceholder || 'Search icons...',
        searchQuery: '',
        icons: [],
        iconHtmlCache: {},
        name: config.name || null,
        clearable: config.clearable || false,
        iconsEndpoint: config.iconsEndpoint || '/spire-ui/api/icons',
        isLoading: false,
        iconsLoaded: false,

        get filteredIcons() {
            if (!this.searchQuery) {
                return this.icons;
            }

            const query = this.searchQuery.toLowerCase();
            return this.icons.filter(icon =>
                icon.toLowerCase().includes(query)
            );
        },

        async loadIcons() {
            this.isLoading = true;

            try {
                const iconsData = await fetchIcons(this.iconsEndpoint);
                this.icons = Object.keys(iconsData);
                this.iconHtmlCache = iconsData;
                this.iconsLoaded = true;
            } catch (error) {
                console.error('Failed to load icons:', error);
            } finally {
                this.isLoading = false;
            }
        },

        getIconHtml(iconName) {
            return this.iconHtmlCache[iconName] || '';
        },

        getSelectedIconHtml() {
            if (!this.selectedIcon) return '';

            if (this.iconHtmlCache[this.selectedIcon]) {
                return this.iconHtmlCache[this.selectedIcon];
            }

            if (!this.iconsLoaded && !this.isLoading) {
                this.loadIcons();
            }

            return '';
        },

        selectIcon(iconName) {
            const previousValue = this.value;
            this.value = iconName;
            this.selectedIcon = iconName;
            this.hide();

            this.$dispatch(SPIRE_EVENTS.SELECT_CHANGED, createEventPayload({
                id: this.$id('icon-picker'),
                name: this.name,
                value: iconName,
                previousValue: previousValue,
                metadata: { icon: iconName }
            }));
        },

        clearSelection() {
            const previousValue = this.value;
            this.value = '';
            this.selectedIcon = '';

            this.$dispatch(SPIRE_EVENTS.SELECT_CLEARED, createEventPayload({
                id: this.$id('icon-picker'),
                name: this.name,
                value: '',
                previousValue: previousValue
            }));
        },

        destroy() {
            overlay().destroy?.call(this);
            keyboard().destroy?.call(this);
        }
    };
}
