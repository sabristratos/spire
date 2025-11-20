import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';

export function inputComponent(config = {}) {
    return {
        inputValue: config.value || '',
        showPassword: false,
        clearable: config.clearable || false,
        viewable: config.viewable || false,
        copyable: config.copyable || false,
        name: config.name || null,

        init() {
            // Sync initial value from input element
            const inputEl = this.$refs.input;
            if (inputEl && inputEl.value) {
                this.inputValue = inputEl.value;
            }

            // Watch for external value changes (Livewire wire:model)
            if (config.wire) {
                this.$watch('inputValue', (value) => {
                    if (inputEl) {
                        inputEl.value = value;
                        inputEl.dispatchEvent(new Event('input'));
                    }
                });
            }
        },

        clearInput() {
            const previousValue = this.inputValue;
            this.inputValue = '';
            const inputEl = this.$refs.input;
            if (inputEl) {
                inputEl.value = '';
                inputEl.dispatchEvent(new Event('input'));
                inputEl.focus();
            }
            this.$dispatch(SPIRE_EVENTS.INPUT_CLEARED, createEventPayload({
                id: this.$id('input'),
                name: this.name,
                value: '',
                previousValue: previousValue,
            }));
        },

        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },

        async copyToClipboard() {
            const inputEl = this.$refs.input;
            if (inputEl && inputEl.value) {
                try {
                    await navigator.clipboard.writeText(inputEl.value);
                    this.$dispatch(SPIRE_EVENTS.COPIED, createEventPayload({
                        id: this.$id('input'),
                        name: this.name,
                        value: inputEl.value,
                    }));
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            }
        },

        handleInput(event) {
            const previousValue = this.inputValue;
            this.inputValue = event.target.value;
            this.$dispatch(SPIRE_EVENTS.INPUT_CHANGED, createEventPayload({
                id: this.$id('input'),
                name: this.name,
                value: event.target.value,
                previousValue: previousValue,
            }));
        },

        get hasValue() {
            return this.inputValue && this.inputValue.length > 0;
        }
    };
}