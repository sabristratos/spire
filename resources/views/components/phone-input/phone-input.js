import { overlay } from '../../../js/shared/overlay';
import { keyboard } from '../../../js/shared/keyboard';
import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';

export function phoneInputComponent(config = {}) {
    return {
        ...overlay({
            trigger: 'click',
            onInit() {
                this.initializeCountries();
                this.setupKeyboard();

                this.$nextTick(() => {
                    this.setSelectedCountry(this.selectedCountryCode);
                    this.initializeValue();
                });

                this.$watch('searchQuery', () => {
                    this.$nextTick(() => {
                        this.updateVirtualScroll();
                        this.updateItems();
                        this.resetHighlight();
                    });
                });

                this.$watch('open', (isOpen) => {
                    if (isOpen) {
                        this.$nextTick(() => {
                            this.updateVirtualScroll();
                            const searchInput = this.$refs.searchInput;
                            if (searchInput) {
                                searchInput.focus();
                            }
                        });
                    } else {
                        this.searchQuery = '';
                        this.resetHighlight();
                    }
                });

                this.$watch('phoneNumber', () => {
                    this.updateFullValue();
                });

                // Watch for external value changes (from Livewire)
                this.$watch('value', (newValue) => {
                    const currentValue = this.getFullValue();
                    if (newValue && newValue !== currentValue) {
                        this.parsePhoneNumber(newValue);
                    } else if (!newValue) {
                        this.phoneNumber = '';
                        this.selectedCountryCode = config.defaultCountry || 'us';
                        this.setSelectedCountry(this.selectedCountryCode);
                    }
                });
            }
        }),

        ...keyboard({
            pattern: 'activedescendant',
            role: 'listbox',
            itemSelector: '[role="option"]',
            orientation: 'vertical',
            wrap: true,
            onSelect(item) {
                const code = item.getAttribute('data-spire-phone-country-code');
                this.selectCountryByCode(code);
            }
        }),

        // Configuration
        selectedCountryCode: config.defaultCountry || 'us',
        preferredCountries: config.preferredCountries || [],

        // State
        phoneNumber: '',
        value: config.value || '',
        searchQuery: '',
        countries: [],
        selectedCountry: null,

        // Virtual scroll state
        itemHeight: 40,
        containerHeight: 280,
        scrollTop: 0,
        visibleStart: 0,
        visibleEnd: 0,
        paddingTop: 0,
        paddingBottom: 0,

        get filteredCountries() {
            let filtered = this.countries;

            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = this.countries.filter(country =>
                    country.name.toLowerCase().includes(query) ||
                    country.code.toLowerCase().includes(query) ||
                    country.dialCode.includes(query)
                );
            }

            return filtered;
        },

        get visibleCountries() {
            return this.filteredCountries.slice(this.visibleStart, this.visibleEnd);
        },

        get totalHeight() {
            return this.filteredCountries.length * this.itemHeight;
        },

        initializeCountries() {
            // Countries are passed via config from Blade
            this.countries = config.countries || [];

            // Sort with preferred countries first
            if (this.preferredCountries.length > 0) {
                const preferred = [];
                const regular = [];

                this.countries.forEach(country => {
                    if (this.preferredCountries.includes(country.code)) {
                        preferred.push(country);
                    } else {
                        regular.push(country);
                    }
                });

                // Sort preferred countries in the order specified
                preferred.sort((a, b) => {
                    return this.preferredCountries.indexOf(a.code) - this.preferredCountries.indexOf(b.code);
                });

                this.countries = [...preferred, ...regular];
            }
        },

        initializeValue() {
            if (this.value) {
                this.parsePhoneNumber(this.value);
            }
        },

        parsePhoneNumber(value) {
            if (!value) return;

            if (value.startsWith('+')) {
                const matchingCountry = this.countries.find(c =>
                    value.startsWith(c.dialCode)
                );

                if (matchingCountry) {
                    this.selectedCountryCode = matchingCountry.code;
                    this.setSelectedCountry(matchingCountry.code);
                    this.phoneNumber = value.substring(matchingCountry.dialCode.length).trim();
                } else {
                    this.phoneNumber = value;
                }
            } else {
                this.phoneNumber = value;
            }

            this.updateFullValue();
        },

        setSelectedCountry(code) {
            const country = this.countries.find(c => c.code === code);
            if (country) {
                this.selectedCountry = country;
                this.selectedCountryCode = code;
            }
        },

        selectCountryByCode(code) {
            const previousCountry = this.selectedCountryCode;
            this.setSelectedCountry(code);
            this.updateFullValue();
            this.searchQuery = '';
            this.hide();

            this.$dispatch(SPIRE_EVENTS.PHONE_INPUT_COUNTRY_CHANGED, createEventPayload({
                id: this.$id('phone-input'),
                value: code,
                previousValue: previousCountry,
                metadata: {
                    dialCode: this.selectedCountry?.dialCode,
                    countryName: this.selectedCountry?.name
                }
            }));

            // Focus the phone number input after selection
            this.$nextTick(() => {
                this.$refs.phoneNumberInput?.focus();
            });
        },

        getFullValue() {
            if (this.selectedCountry && this.phoneNumber) {
                return `${this.selectedCountry.dialCode}${this.phoneNumber.replace(/\D/g, '')}`;
            } else if (this.phoneNumber) {
                return this.phoneNumber.replace(/\D/g, '');
            }
            return '';
        },

        updateFullValue() {
            this.value = this.getFullValue();

            this.$dispatch(SPIRE_EVENTS.PHONE_INPUT_CHANGED, createEventPayload({
                id: this.$id('phone-input'),
                value: this.value,
                metadata: {
                    countryCode: this.selectedCountryCode,
                    dialCode: this.selectedCountry?.dialCode,
                    nationalNumber: this.phoneNumber
                }
            }));
        },

        handlePhoneInput(event) {
            const fullValue = event.target.value;

            if (fullValue.startsWith('+')) {
                this.parsePhoneNumber(fullValue);
            } else {
                this.phoneNumber = fullValue;
            }
        },

        // Virtual scrolling
        updateVirtualScroll() {
            const bufferItems = 5;
            const totalItems = this.filteredCountries.length;

            this.visibleStart = Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - bufferItems);
            this.visibleEnd = Math.min(
                totalItems,
                Math.ceil((this.scrollTop + this.containerHeight) / this.itemHeight) + bufferItems
            );

            this.paddingTop = this.visibleStart * this.itemHeight;
            this.paddingBottom = Math.max(0, (totalItems - this.visibleEnd) * this.itemHeight);
        },

        handleScroll(event) {
            this.scrollTop = event.target.scrollTop;
            this.updateVirtualScroll();
        },

        getCountryIndex(code) {
            return this.filteredCountries.findIndex(c => c.code === code);
        },

        // Override keyboard module's updateItems to use filteredCountries instead of DOM
        updateItems() {
            // Create virtual items from filteredCountries so highlightedIndex
            // refers to positions in the filtered list, not DOM elements
            this.items = this.filteredCountries.map((country) => ({
                getAttribute: (attr) => {
                    if (attr === 'data-spire-phone-country-code') {
                        return country.code;
                    }
                    return null;
                }
            }));
        },

        // Scroll highlighted item into view when using keyboard navigation
        scrollHighlightedIntoView() {
            if (this.highlightedIndex < 0) return;

            const listEl = this.$refs.content?.querySelector('.spire-phone-input-list');
            if (!listEl) return;

            const itemTop = this.highlightedIndex * this.itemHeight;
            const itemBottom = itemTop + this.itemHeight;
            const scrollTop = listEl.scrollTop;
            const viewportBottom = scrollTop + this.containerHeight;

            if (itemTop < scrollTop) {
                listEl.scrollTop = itemTop;
            } else if (itemBottom > viewportBottom) {
                listEl.scrollTop = itemBottom - this.containerHeight;
            }
        },

        // Override arrow key handlers to scroll into view
        handleArrowDown() {
            this.highlightNext();
            this.scrollHighlightedIntoView();
        },

        handleArrowUp() {
            this.highlightPrev();
            this.scrollHighlightedIntoView();
        },

        handleHome() {
            this.highlightFirst();
            this.scrollHighlightedIntoView();
        },

        handleEnd() {
            this.highlightLast();
            this.scrollHighlightedIntoView();
        },

        destroy() {
            // Clean up overlay and keyboard
            if (this.hoverTimer) {
                clearTimeout(this.hoverTimer);
                this.hoverTimer = null;
            }
            if (this.typeaheadTimeout) {
                clearTimeout(this.typeaheadTimeout);
            }
        }
    };
}
