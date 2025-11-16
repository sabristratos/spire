import { DEBOUNCE_DEFAULT_MS, BLUR_TIMEOUT_MS } from './component-constants';

export function autocompleteComponent(config = {}) {
    return {
        value: config.value || '',
        inputValue: '',
        selectedLabel: '',
        placeholder: config.placeholder || 'Type to search...',
        minChars: config.minChars || 0,
        debounce: config.debounce || DEBOUNCE_DEFAULT_MS,
        showOnFocus: config.showOnFocus !== false,
        highlightMatches: config.highlightMatches !== false,
        clearable: config.clearable !== false,
        clearLabel: config.clearLabel || 'Clear input',
        displayOptions: [],
        observer: null,
        debounceTimer: null,
        open: false,
        highlightedIndex: -1,

        init() {
            this.initializeOptions();
            this.setupMutationObserver();
            this.setupPopover();
            this.setupInputWatchers();

            this.$nextTick(() => {
                if (this.value) {
                    const option = this.displayOptions.find(opt => opt.value === this.value);
                    if (option) {
                        this.inputValue = option.label;
                        this.selectedLabel = option.label;
                    }
                }
            });
        },

        get filteredOptions() {
            if (!this.inputValue || this.inputValue.length < this.minChars) {
                return this.showOnFocus ? this.displayOptions : [];
            }

            const query = this.inputValue.toLowerCase();
            return this.displayOptions.filter(option =>
                option.label.toLowerCase().includes(query)
            ).map(option => ({
                ...option,
                highlightedHtml: this.highlightMatches
                    ? this.highlightText(option.html, query)
                    : option.html
            }));
        },

        get shouldShowDropdown() {
            if (this.showOnFocus && this.inputValue.length === 0) return true;
            return this.inputValue.length >= this.minChars && this.filteredOptions.length > 0;
        },

        setupPopover() {
            const contentId = this.$id('popover');
            const inputElement = this.$refs.input;

            if (inputElement && this.$refs.content) {
                const anchorId = `anchor-${contentId}`;
                this.$refs.trigger.style.anchorName = `--${anchorId}`;
                this.$refs.content.style.positionAnchor = `--${anchorId}`;

                this.$refs.content.addEventListener('toggle', (e) => {
                    this.open = e.newState === 'open';
                });
            }
        },

        setupInputWatchers() {
            this.$watch('inputValue', (newValue) => {
                clearTimeout(this.debounceTimer);

                this.debounceTimer = setTimeout(() => {
                    this.handleInputChange(newValue);
                }, this.debounce);
            });

            this.$watch('value', (newValue) => {
                if (newValue) {
                    const option = this.displayOptions.find(opt => opt.value === newValue);
                    if (option) {
                        this.inputValue = option.label;
                        this.selectedLabel = option.label;
                    }
                } else {
                    this.inputValue = '';
                    this.selectedLabel = '';
                }
            });
        },

        handleInputChange(value) {
            this.$nextTick(() => {
                this.resetHighlight();

                if (this.shouldShowDropdown) {
                    this.show();
                } else {
                    this.hide();
                }
            });
        },

        handleFocus() {
            if (this.shouldShowDropdown) {
                this.show();
            }
        },

        handleBlur(event) {
            setTimeout(() => {
                const content = this.$refs.content;

                if (!content) {
                    this.hide();
                    return;
                }

                if (event.relatedTarget && content.contains(event.relatedTarget)) {
                    return;
                }

                const isClickInsideDropdown = content.matches(':popover-open') &&
                    event.relatedTarget &&
                    (content.contains(event.relatedTarget) || content === event.relatedTarget);

                if (!isClickInsideDropdown) {
                    this.hide();
                }
            }, BLUR_TIMEOUT_MS);
        },

        show() {
            if (this.$refs.content && !this.open) {
                try {
                    this.$refs.content.showPopover();
                } catch (e) {
                    console.warn('Failed to show popover:', e);
                }
            }
        },

        hide() {
            if (this.$refs.content && this.open) {
                try {
                    this.$refs.content.hidePopover();
                    this.resetHighlight();
                } catch (e) {
                    console.warn('Failed to hide popover:', e);
                }
            }
        },

        highlightNext() {
            if (this.filteredOptions.length === 0) return;

            if (!this.open) {
                this.show();
                return;
            }

            this.highlightedIndex = (this.highlightedIndex + 1) % this.filteredOptions.length;
        },

        highlightPrev() {
            if (this.filteredOptions.length === 0) return;

            if (!this.open) {
                this.show();
                return;
            }

            this.highlightedIndex = this.highlightedIndex <= 0
                ? this.filteredOptions.length - 1
                : this.highlightedIndex - 1;
        },

        highlightFirst() {
            if (this.filteredOptions.length === 0) return;
            this.highlightedIndex = 0;
        },

        highlightLast() {
            if (this.filteredOptions.length === 0) return;
            this.highlightedIndex = this.filteredOptions.length - 1;
        },

        resetHighlight() {
            this.highlightedIndex = -1;
        },

        selectHighlighted() {
            if (this.highlightedIndex >= 0 && this.highlightedIndex < this.filteredOptions.length) {
                const option = this.filteredOptions[this.highlightedIndex];
                if (!option.disabled) {
                    this.selectOption(option.value, option.label);
                }
            }
        },

        selectOption(value, label) {
            this.value = value;
            this.inputValue = label;
            this.selectedLabel = label;
            this.hide();

            this.$nextTick(() => {
                if (this.$refs.input) {
                    this.$refs.input.focus();
                }
            });
        },

        clearInput() {
            this.value = '';
            this.inputValue = '';
            this.selectedLabel = '';

            this.$nextTick(() => {
                if (this.$refs.input) {
                    this.$refs.input.focus();
                }
            });
        },

        highlightText(html, query) {
            if (!query) return html;

            const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
            const text = this.stripHtml(html);

            return text.replace(regex, '<mark class="bg-primary/20 text-primary font-medium">$1</mark>');
        },

        escapeRegex(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        },

        stripHtml(html) {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || '';
        },

        initializeOptions() {
            const slotOptions = this.extractSlotOptions();
            this.displayOptions = slotOptions;
        },

        extractSlotOptions() {
            const slotEl = this.$refs.slotHtml;
            if (!slotEl) return [];

            const options = [];
            const optionElements = slotEl.querySelectorAll('[data-spire-autocomplete-value]');

            optionElements.forEach(el => {
                options.push({
                    value: el.getAttribute('data-spire-autocomplete-value'),
                    label: el.getAttribute('data-spire-autocomplete-label') || el.textContent.trim(),
                    html: el.innerHTML,
                    disabled: el.getAttribute('data-spire-autocomplete-disabled') === 'true',
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

        handleToggle(event) {
            this.open = event.newState === 'open';
        },

        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
            clearTimeout(this.debounceTimer);
        }
    };
}
