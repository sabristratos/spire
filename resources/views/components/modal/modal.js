import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';

/**
 * Modal component for Spire UI
 * Handles dialog opening/closing, event listeners, and Livewire integration
 */
export function modalComponent(config = {}) {
    return {
        name: config.name || null,
        dismissible: config.dismissible !== false,
        wireName: config.wireName || null,
        dialog: null,
        eventListeners: [],

        init() {
            this.dialog = this.$el;

            if (this.wireName) {
                this.$watch('$wire.' + this.wireName, (value) => {
                    if (value) {
                        this.open();
                    } else {
                        this.close();
                    }
                });

                if (this.$wire && this.$wire[this.wireName]) {
                    this.open();
                }
            }

            if (this.name) {
                this.addWindowListener('spire-modal-open-' + this.name, () => {
                    this.open();
                });

                this.addWindowListener('spire-modal-close-' + this.name, () => {
                    this.close();
                });

                this.addWindowListener('spire-modal-toggle-' + this.name, () => {
                    this.toggle();
                });
            }

            this.addWindowListener('spire-modal-open', (e) => {
                if (e.detail && e.detail.name === this.name) {
                    this.open();
                }
            });

            this.addWindowListener('spire-modal-close', (e) => {
                if (e.detail && e.detail.name === this.name) {
                    this.close();
                }
            });

            this.addWindowListener('spire-modal-toggle', (e) => {
                if (e.detail && e.detail.name === this.name) {
                    this.toggle();
                }
            });

            this.dialog.addEventListener('click', (e) => {
                if (this.dismissible && e.target === this.dialog) {
                    const rect = this.dialog.getBoundingClientRect();
                    if (
                        e.clientX < rect.left ||
                        e.clientX > rect.right ||
                        e.clientY < rect.top ||
                        e.clientY > rect.bottom
                    ) {
                        this.cancel();
                    }
                }
            });

            this.dialog.addEventListener('cancel', (e) => {
                if (!this.dismissible) {
                    e.preventDefault();
                } else {
                    this.cancel();
                }
            });

            this.dialog.addEventListener('close', () => {
                this.onClose();
            });

            config.onInit?.call(this);
        },

        open() {
            if (!this.dialog.open) {
                this.dialog.showModal();
                this.$dispatch(SPIRE_EVENTS.MODAL_OPENED, createEventPayload({
                    id: this.$id('modal'),
                    name: this.name,
                    value: true,
                }));

                if (this.wireName && this.$wire) {
                    this.$wire.set(this.wireName, true);
                }
            }
        },

        close() {
            if (this.dialog.open) {
                this.dialog.close();
            }
        },

        toggle() {
            if (this.dialog.open) {
                this.close();
            } else {
                this.open();
            }
        },

        cancel() {
            this.$dispatch(SPIRE_EVENTS.MODAL_CANCELLED, createEventPayload({
                id: this.$id('modal'),
                name: this.name,
                value: false,
            }));
            this.close();
        },

        onClose() {
            this.$dispatch(SPIRE_EVENTS.MODAL_CLOSED, createEventPayload({
                id: this.$id('modal'),
                name: this.name,
                value: false,
            }));

            if (this.wireName && this.$wire) {
                this.$wire.set(this.wireName, false);
            }
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
        }
    };
}
