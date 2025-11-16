import { TYPEAHEAD_TIMEOUT_MS } from './component-constants';

/**
 * Unified Keyboard Navigation
 *
 * Provides reusable keyboard navigation for overlay components.
 * Supports both ARIA patterns:
 * - activedescendant: Focus stays on container, aria-activedescendant tracks highlighted item (Select, Combobox)
 * - roving-tabindex: Actual focus moves between items (Dropdown, Menu)
 */
export function keyboard(options = {}) {
    const {
        pattern = 'activedescendant',
        role = 'listbox',
        itemSelector = '[role="option"]:not([aria-disabled="true"])',
        onSelect = null,
        orientation = 'vertical',
        wrap = true,
        typeahead = false,
    } = options;

    const useActivedescendant = pattern === 'activedescendant';
    const useRovingTabindex = pattern === 'roving-tabindex';

    return {
        highlightedIndex: -1,
        items: [],
        typeaheadString: '',
        typeaheadTimeout: null,

        setupKeyboard() {
            this.$watch('open', (isOpen) => {
                if (isOpen) {
                    this.$nextTick(() => {
                        this.updateItems();
                        this.resetHighlight();
                        this.focusContainer();
                    });
                } else {
                    this.resetHighlight();
                }
            });

            if (options.onInit) {
                options.onInit.call(this);
            }
        },

        updateItems() {
            if (!this.$refs.content) return;

            this.items = Array.from(
                this.$refs.content.querySelectorAll(itemSelector)
            );
        },

        resetHighlight() {
            this.highlightedIndex = -1;

            if (useRovingTabindex && this.items.length > 0) {
                this.items.forEach(item => {
                    item.tabIndex = -1;
                });
            }
        },

        focusContainer() {
            if (useActivedescendant) {
                this.$refs.content?.focus();
            } else if (useRovingTabindex && this.items.length > 0) {
                this.highlightedIndex = 0;
                this.focusItem(0);
            }
        },

        handleArrowDown(event) {
            if (orientation === 'horizontal') return;
            event?.preventDefault();
            this.highlightNext();
        },

        handleArrowUp(event) {
            if (orientation === 'horizontal') return;
            event?.preventDefault();
            this.highlightPrev();
        },

        handleArrowRight(event) {
            if (orientation === 'vertical') return;
            event?.preventDefault();
            this.highlightNext();
        },

        handleArrowLeft(event) {
            if (orientation === 'vertical') return;
            event?.preventDefault();
            this.highlightPrev();
        },

        handleHome(event) {
            event?.preventDefault();
            this.highlightFirst();
        },

        handleEnd(event) {
            event?.preventDefault();
            this.highlightLast();
        },

        handleEnter(event) {
            event?.preventDefault();
            this.selectHighlighted();
        },

        handleEscape(event) {
            event?.preventDefault();
            if (this.hide) {
                this.hide();
            }
        },

        handleTypeahead(event) {
            if (!typeahead) return;

            const char = event.key;
            if (char.length !== 1 || event.ctrlKey || event.altKey || event.metaKey) return;

            clearTimeout(this.typeaheadTimeout);
            this.typeaheadString += char.toLowerCase();

            const matchIndex = this.findTypeaheadMatch(this.typeaheadString);
            if (matchIndex >= 0) {
                this.highlightItem(matchIndex);
            }

            this.typeaheadTimeout = setTimeout(() => {
                this.typeaheadString = '';
            }, TYPEAHEAD_TIMEOUT_MS);
        },

        findTypeaheadMatch(searchString) {
            const startIndex = this.highlightedIndex + 1;

            for (let i = 0; i < this.items.length; i++) {
                const index = (startIndex + i) % this.items.length;
                const text = this.items[index].textContent?.toLowerCase() || '';
                if (text.startsWith(searchString)) {
                    return index;
                }
            }

            return -1;
        },

        highlightNext() {
            if (this.items.length === 0) return;

            const nextIndex = this.highlightedIndex + 1;

            if (nextIndex < this.items.length) {
                this.highlightItem(nextIndex);
            } else if (wrap) {
                this.highlightItem(0);
            }
        },

        highlightPrev() {
            if (this.items.length === 0) return;

            const prevIndex = this.highlightedIndex - 1;

            if (prevIndex >= 0) {
                this.highlightItem(prevIndex);
            } else if (wrap) {
                this.highlightItem(this.items.length - 1);
            }
        },

        highlightFirst() {
            if (this.items.length > 0) {
                this.highlightItem(0);
            }
        },

        highlightLast() {
            if (this.items.length > 0) {
                this.highlightItem(this.items.length - 1);
            }
        },

        highlightItem(index) {
            if (index < 0 || index >= this.items.length) return;

            this.highlightedIndex = index;

            if (useActivedescendant) {
                this.updateActivedescendant(index);
            } else if (useRovingTabindex) {
                this.focusItem(index);
            }

            this.scrollItemIntoView(index);
        },

        updateActivedescendant(index) {
            if (!this.$refs.content) return;

            const item = this.items[index];
            if (item?.id) {
                this.$refs.content.setAttribute('aria-activedescendant', item.id);
            }
        },

        focusItem(index) {
            this.items.forEach((item, i) => {
                item.tabIndex = i === index ? 0 : -1;
            });

            this.items[index]?.focus();
        },

        scrollItemIntoView(index) {
            const item = this.items[index];
            if (!item) return;

            item.scrollIntoView({
                block: 'nearest',
                inline: 'nearest'
            });
        },

        selectHighlighted() {
            if (this.highlightedIndex < 0 || this.highlightedIndex >= this.items.length) return;

            const item = this.items[this.highlightedIndex];

            if (onSelect) {
                onSelect.call(this, item, this.highlightedIndex);
            } else {
                item?.click();
            }
        },

        destroy() {
            clearTimeout(this.typeaheadTimeout);
        }
    };
}
