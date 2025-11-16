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
                window.addEventListener('spire-modal:open-' + this.name, () => {
                    this.open();
                });

                window.addEventListener('spire-modal:close-' + this.name, () => {
                    this.close();
                });

                window.addEventListener('spire-modal:toggle-' + this.name, () => {
                    this.toggle();
                });
            }

            window.addEventListener('spire-modal:open', (e) => {
                if (e.detail && e.detail.name === this.name) {
                    this.open();
                }
            });

            window.addEventListener('spire-modal:close', (e) => {
                if (e.detail && e.detail.name === this.name) {
                    this.close();
                }
            });

            window.addEventListener('spire-modal:toggle', (e) => {
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
                this.$dispatch('spire-modal:opened', { name: this.name });

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
            this.$dispatch('spire-modal:cancelled', { name: this.name });
            this.close();
        },

        onClose() {
            this.$dispatch('spire-modal:closed', { name: this.name });

            if (this.wireName && this.$wire) {
                this.$wire.set(this.wireName, false);
            }
        }
    };
}
