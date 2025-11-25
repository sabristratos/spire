import { DEBOUNCE_DEFAULT_MS, BLUR_TIMEOUT_MS } from '../../../js/shared/component-constants';
import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';

let autocompleteInstanceCounter = 0;

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
        syncInput: config.syncInput || false,
        clearLabel: config.clearLabel || 'Clear input',
        displayOptions: [],
        observer: null,
        debounceTimer: null,
        blurTimeout: null,
        open: false,
        highlightedIndex: -1,
        name: config.name || null,
        _stableAnchorId: null,
        _triggerEl: null,
        _contentEl: null,

        init() {
            this.$nextTick(() => {
                this.resolveElements();
                this.initializeOptions();
                this.setupMutationObserver();
                this.setupPopover();
                this.setupInputWatchers();

                if (this.value) {
                    const option = this.displayOptions.find(opt => opt.value === this.value);
                    if (option) {
                        this.inputValue = option.label;
                        this.selectedLabel = option.label;
                    }
                }
            });
        },

        resolveElements() {
            const root = this.$el;
            if (!root) return;

            const findOwnRef = (refName) => {
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

        get filteredOptions() {
            if (!this.inputValue || this.inputValue.length < this.minChars) {
                return this.showOnFocus ? this.displayOptions : [];
            }

            // When syncInput is enabled, server handles filtering - just return all options
            if (this.syncInput) {
                return this.displayOptions.map(option => ({
                    ...option,
                    highlightedHtml: this.highlightMatches
                        ? this.highlightText(option.html, this.inputValue.toLowerCase())
                        : option.html
                }));
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
            if (this.displayOptions.length === 0) return false;
            if (this.showOnFocus && this.inputValue.length === 0) return true;
            return this.inputValue.length >= this.minChars && this.filteredOptions.length > 0;
        },

        setupPopover() {
            if (!this._triggerEl || !this._contentEl) return;

            if (!this._stableAnchorId) {
                this._stableAnchorId = `anchor-autocomplete-${++autocompleteInstanceCounter}`;
            }

            this._triggerEl.style.anchorName = `--${this._stableAnchorId}`;
            this._contentEl.style.positionAnchor = `--${this._stableAnchorId}`;

            this._contentEl.addEventListener('toggle', (e) => {
                this.open = e.newState === 'open';
            });
        },

        setupInputWatchers() {
            this.$watch('inputValue', (newValue) => {
                clearTimeout(this.debounceTimer);

                this.debounceTimer = setTimeout(() => {
                    // Sync input to value if syncInput is enabled
                    if (this.syncInput) {
                        this.value = newValue;
                    }
                    this.handleInputChange(newValue);
                }, this.debounce);
            });

            this.$watch('value', (newValue) => {
                if (newValue) {
                    const option = this.displayOptions.find(opt => opt.value === newValue);
                    if (option) {
                        this.inputValue = option.label;
                        this.selectedLabel = option.label;
                    } else if (this.syncInput) {
                        // In syncInput mode, keep inputValue in sync even without matching option
                        this.inputValue = newValue;
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
            this.blurTimeout = setTimeout(() => {
                if (!this._contentEl) {
                    this.hide();
                    return;
                }

                if (event.relatedTarget && this._contentEl.contains(event.relatedTarget)) {
                    return;
                }

                const isClickInsideDropdown = this._contentEl.matches(':popover-open') &&
                    event.relatedTarget &&
                    (this._contentEl.contains(event.relatedTarget) || this._contentEl === event.relatedTarget);

                if (!isClickInsideDropdown) {
                    this.hide();
                }
            }, BLUR_TIMEOUT_MS);
        },

        show() {
            if (this._contentEl && !this.open) {
                try {
                    this._contentEl.showPopover();
                } catch (e) {
                    console.warn('Failed to show popover:', e);
                }
            }
        },

        hide() {
            if (this._contentEl && this.open) {
                try {
                    this._contentEl.hidePopover();
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
            const previousValue = this.value;
            this.value = value;
            this.inputValue = label;
            this.selectedLabel = label;
            this.hide();

            this.$dispatch(SPIRE_EVENTS.AUTOCOMPLETE_SELECTED, createEventPayload({
                id: this.$id('autocomplete'),
                name: this.name,
                value: value,
                previousValue: previousValue,
                metadata: { label: label }
            }));

            this.$nextTick(() => {
                if (this.$refs.input) {
                    this.$refs.input.focus();
                }
            });
        },

        clearInput() {
            const previousValue = this.value;
            this.value = '';
            this.inputValue = '';
            this.selectedLabel = '';

            this.$dispatch(SPIRE_EVENTS.AUTOCOMPLETE_CLEARED, createEventPayload({
                id: this.$id('autocomplete'),
                name: this.name,
                value: '',
                previousValue: previousValue,
            }));

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
                    // After options are updated, show dropdown if appropriate
                    if (this.shouldShowDropdown && this.inputValue.length >= this.minChars) {
                        this.show();
                    }
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
            clearTimeout(this.blurTimeout);
        }
    };
}
