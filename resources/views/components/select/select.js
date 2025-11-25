import { overlay } from '../../../js/shared/overlay';
import { keyboard } from '../../../js/shared/keyboard';
import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';

export function selectComponent(config = {}) {
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
                this.initializeOptions();
                this.setupMutationObserver();
                this.setupKeyboard();

                this.$nextTick(() => {
                    if (this.multiple) {
                        const values = Array.isArray(this.value) ? this.value : [];
                        this.updateSelectedLabel(values);
                    } else {
                        if (this.value) {
                            this.updateSelectedLabel(this.value);
                        } else {
                            this.selectedLabel = this.placeholder;
                        }
                    }
                    this.initialized = true;
                });

                this.$watch('value', (newValue) => {
                    if (this.multiple) {
                        const values = Array.isArray(newValue) ? newValue : [];
                        this.updateSelectedLabel(values);
                    } else {
                        if (newValue) {
                            this.updateSelectedLabel(newValue);
                        } else {
                            this.selectedLabel = this.placeholder;
                        }
                    }
                });

                this.$watch('searchQuery', () => {
                    this.$nextTick(() => {
                        this.updateItems();
                        this.resetHighlight();
                    });
                });

                this.$watch('open', (newValue) => {
                    if (newValue && this.searchable) {
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
                    } else if (!newValue) {
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
                const value = item.getAttribute('data-spire-select-value');
                const label = item.getAttribute('data-spire-select-label');

                if (this.multiple) {
                    this.toggleOption(value, label);
                } else {
                    this.selectOption(value, label);
                }
            }
        }),

        value: config.value ?? (config.multiple ? [] : ''),

        toStringValue(value) {
            return value == null ? '' : String(value);
        },
        selectedLabel: '',
        placeholder: config.placeholder || 'Select an option',
        multiple: config.multiple || false,
        max: config.max || null,
        maxReachedMessage: config.maxReachedMessage || 'Maximum selections reached',
        selectAllText: config.selectAllText || 'Select All',
        clearAllText: config.clearAllText || 'Clear All',
        itemsSelectedText: config.itemsSelectedText || ':count items selected',
        moreItemsText: config.moreItemsText || '+ :count more',
        searchable: config.searchable || false,
        searchPlaceholder: config.searchPlaceholder || 'Search options...',
        searchQuery: '',
        displayOptions: [],
        observer: null,
        name: config.name || null,
        initialized: false,

        get filteredOptions() {
            if (!this.searchQuery || !this.searchable) {
                return this.displayOptions;
            }

            const query = this.searchQuery.toLowerCase();
            return this.displayOptions.filter(option =>
                option.label.toLowerCase().includes(query)
            );
        },

        get selectedValues() {
            return this.multiple ? (Array.isArray(this.value) ? this.value : []) : [];
        },

        get selectedItems() {
            if (!this.multiple) return [];
            return this.displayOptions.filter(option =>
                this.selectedValues.some(v => this.toStringValue(v) === this.toStringValue(option.value))
            );
        },

        get isMaxReached() {
            return this.multiple && this.max && this.selectedValues.length >= this.max;
        },

        get selectableOptions() {
            return this.displayOptions.filter(option => !option.disabled);
        },

        get allSelected() {
            return this.multiple &&
                this.selectableOptions.length > 0 &&
                this.selectableOptions.every(option =>
                    this.selectedValues.some(v => this.toStringValue(v) === this.toStringValue(option.value))
                );
        },

        isSelected(value) {
            if (!this.initialized) {
                return false;
            }
            const stringValue = this.toStringValue(value);
            if (this.multiple) {
                return this.selectedValues.some(v => this.toStringValue(v) === stringValue);
            }
            if (this.value === '' || this.value == null) {
                return false;
            }
            return this.toStringValue(this.value) === stringValue;
        },

        initializeOptions() {
            const slotOptions = this.extractSlotOptions();
            this.displayOptions = slotOptions;

            this.$nextTick(() => {
                this.updateItems();
            });
        },

        extractSlotOptions() {
            const slotEl = this.$refs.slotHtml;
            if (!slotEl) return [];

            const options = [];
            const optionElements = slotEl.querySelectorAll('[data-spire-select-value]');

            optionElements.forEach(el => {
                options.push({
                    value: el.getAttribute('data-spire-select-value'),
                    label: el.getAttribute('data-spire-select-label') || el.textContent.trim(),
                    html: el.innerHTML,
                    disabled: el.getAttribute('data-spire-select-disabled') === 'true',
                });
            });

            return options;
        },

        setupMutationObserver() {
            const slotEl = this.$refs.slotHtml;

            if (!slotEl) return;

            this.observer = new MutationObserver(() => {
                this.$nextTick(() => {
                    this.initializeOptions();
                });
            });

            this.observer.observe(slotEl, {
                childList: true,
                characterData: true,
                subtree: true,
            });
        },

        selectOption(value, label) {
            if (this.multiple) {
                this.toggleOption(value, label);
            } else {
                const previousValue = this.value;
                this.value = value;
                this.selectedLabel = label;
                this.hide();

                this.$dispatch(SPIRE_EVENTS.SELECT_CHANGED, createEventPayload({
                    id: this.$id('select'),
                    name: this.name,
                    value: value,
                    previousValue: previousValue,
                    metadata: { label: label }
                }));
            }
        },

        toggleOption(value, label) {
            if (!this.multiple) return;

            const previousValue = [...(Array.isArray(this.value) ? this.value : [])];
            const currentValues = [...previousValue];
            const index = currentValues.findIndex(v => this.toStringValue(v) === this.toStringValue(value));

            if (index > -1) {
                currentValues.splice(index, 1);
            } else {
                if (this.isMaxReached) {
                    return;
                }
                currentValues.push(value);
            }

            this.value = currentValues;
            this.updateSelectedLabel(currentValues);

            this.$dispatch(SPIRE_EVENTS.SELECT_CHANGED, createEventPayload({
                id: this.$id('select'),
                name: this.name,
                value: currentValues,
                previousValue: previousValue,
                metadata: { label: label, action: index > -1 ? 'removed' : 'added' }
            }));
        },

        removeOption(value) {
            if (!this.multiple) return;

            const previousValue = [...(Array.isArray(this.value) ? this.value : [])];
            const currentValues = [...previousValue];
            const index = currentValues.findIndex(v => this.toStringValue(v) === this.toStringValue(value));

            if (index > -1) {
                currentValues.splice(index, 1);
                this.value = currentValues;
                this.updateSelectedLabel(currentValues);

                this.$dispatch(SPIRE_EVENTS.SELECT_CHANGED, createEventPayload({
                    id: this.$id('select'),
                    name: this.name,
                    value: currentValues,
                    previousValue: previousValue,
                    metadata: { action: 'removed' }
                }));
            }
        },

        selectAll() {
            if (!this.multiple) return;

            const previousValue = [...(Array.isArray(this.value) ? this.value : [])];
            const selectableValues = this.selectableOptions.map(opt => opt.value);
            const limitedValues = this.max
                ? selectableValues.slice(0, this.max)
                : selectableValues;

            this.value = limitedValues;
            this.updateSelectedLabel(limitedValues);

            this.$dispatch(SPIRE_EVENTS.SELECT_CHANGED, createEventPayload({
                id: this.$id('select'),
                name: this.name,
                value: limitedValues,
                previousValue: previousValue,
                metadata: { action: 'selectAll' }
            }));
        },

        clearAll() {
            const previousValue = this.multiple
                ? [...(Array.isArray(this.value) ? this.value : [])]
                : this.value;

            if (this.multiple) {
                this.value = [];
                this.updateSelectedLabel([]);
            } else {
                this.clearSelection();
            }

            this.$dispatch(SPIRE_EVENTS.SELECT_CLEARED, createEventPayload({
                id: this.$id('select'),
                name: this.name,
                value: this.multiple ? [] : '',
                previousValue: previousValue,
            }));
        },

        updateSelectedLabel(value) {
            if (this.multiple) {
                const values = Array.isArray(value) ? value : [];

                if (values.length === 0) {
                    this.selectedLabel = this.placeholder;
                    return;
                }

                const selectedOptions = this.displayOptions.filter(opt =>
                    values.some(v => this.toStringValue(v) === this.toStringValue(opt.value))
                );

                if (selectedOptions.length === 0) {
                    this.selectedLabel = this.placeholder;
                } else if (selectedOptions.length === 1) {
                    this.selectedLabel = selectedOptions[0].label;
                } else {
                    this.selectedLabel = this.itemsSelectedText.replace(':count', selectedOptions.length);
                }
            } else {
                const stringValue = this.toStringValue(value);
                const option = this.displayOptions.find(opt => this.toStringValue(opt.value) === stringValue);

                if (option) {
                    this.selectedLabel = option.label;
                } else {
                    this.selectedLabel = this.placeholder;
                }
            }
        },

        clearSelection() {
            const previousValue = this.multiple
                ? [...(Array.isArray(this.value) ? this.value : [])]
                : this.value;

            if (this.multiple) {
                this.value = [];
            } else {
                this.value = '';
            }
            this.selectedLabel = this.placeholder;

            this.$dispatch(SPIRE_EVENTS.SELECT_CLEARED, createEventPayload({
                id: this.$id('select'),
                name: this.name,
                value: this.multiple ? [] : '',
                previousValue: previousValue,
            }));
        },

        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
            // Call parent destroy methods to clean up timers
            overlay().destroy?.call(this);
            keyboard().destroy?.call(this);
        }
    };
}
