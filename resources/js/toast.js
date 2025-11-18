import { SPIRE_EVENTS } from './events';

export function toastComponent(config = {}) {
    return {
        position: config.position || 'bottom-right',
        duration: config.duration || 5000,
        variant: config.variant || 'solid',
        toasts: [],
        nextId: 1,
        eventListeners: [],

        init() {
            this.addWindowListener(SPIRE_EVENTS.TOAST_ADD, (event) => {
                const data = Array.isArray(event.detail) ? event.detail[0] : event.detail;
                this.addToast(data);
            });
        },

        addToast(options = {}) {
            const showProgress = options.showProgress === true;
            const toast = {
                id: this.nextId++,
                title: options.title || '',
                message: options.message || '',
                color: options.color || 'default',
                variant: options.variant || this.variant,
                duration: options.duration !== undefined ? options.duration : this.duration,
                dismissible: options.dismissible !== false,
                showProgress: showProgress,
                progress: showProgress ? 100 : null,
                timer: null,
                startTime: null,
                remainingTime: null,
                paused: false,
            };

            this.toasts.push(toast);

            this.$nextTick(() => {
                this.showToast(toast);
            });
        },

        showToast(toast) {
            const toastElement = document.getElementById(`toast-${toast.id}`);
            if (!toastElement) return;

            toastElement.showPopover();

            window.dispatchEvent(new CustomEvent(SPIRE_EVENTS.TOAST_SHOWN, {
                detail: { id: toast.id, toast }
            }));

            if (toast.duration > 0) {
                this.startTimer(toast);
            }
        },

        removeToast(id) {
            const toast = this.toasts.find(t => t.id === id);
            if (!toast) return;

            if (toast.timer) {
                clearInterval(toast.timer);
                toast.timer = null;
            }

            const toastElement = document.getElementById(`toast-${id}`);
            if (toastElement) {
                toastElement.hidePopover();
            }

            this.toasts = this.toasts.filter(t => t.id !== id);

            window.dispatchEvent(new CustomEvent(SPIRE_EVENTS.TOAST_HIDDEN, {
                detail: { id, toast }
            }));
        },

        startTimer(toast) {
            if (toast.duration <= 0) return;

            toast.startTime = Date.now();
            toast.remainingTime = toast.duration;
            toast.paused = false;

            toast.timer = setInterval(() => {
                if (toast.paused) return;

                const elapsed = Date.now() - toast.startTime;
                const remaining = toast.duration - elapsed;

                if (remaining <= 0) {
                    this.removeToast(toast.id);
                } else if (toast.showProgress) {
                    toast.progress = (remaining / toast.duration) * 100;
                }
            }, 50);
        },

        pauseTimer(toast) {
            if (toast.duration <= 0 || toast.paused) return;

            toast.paused = true;
            toast.remainingTime = toast.duration - (Date.now() - toast.startTime);
        },

        resumeTimer(toast) {
            if (toast.duration <= 0 || !toast.paused) return;

            toast.paused = false;
            toast.startTime = Date.now();
            toast.duration = toast.remainingTime;
        },

        getIconName(color) {
            const icons = {
                'success': 'check-circle',
                'error': 'alert-circle',
                'warning': 'alert-triangle',
                'info': 'info',
                'default': 'bell',
            };
            return icons[color] || icons['default'];
        },

        getToastStyles(toast) {
            const index = this.toasts.findIndex(t => t.id === toast.id);
            if (index === -1) return '';

            const baseOffset = 16;
            const toastHeight = 80;
            const toastSpacing = 16;
            const stackOffset = index * (toastHeight + toastSpacing);

            const positions = {
                'top-left': {
                    '--toast-top': `${baseOffset + stackOffset}px`,
                    '--toast-left': `${baseOffset}px`,
                    '--toast-right': 'auto',
                    '--toast-bottom': 'auto',
                    '--toast-centered': '0',
                },
                'top-center': {
                    '--toast-top': `${baseOffset + stackOffset}px`,
                    '--toast-left': '50%',
                    '--toast-right': 'auto',
                    '--toast-bottom': 'auto',
                    '--toast-centered': '1',
                },
                'top-right': {
                    '--toast-top': `${baseOffset + stackOffset}px`,
                    '--toast-right': `${baseOffset}px`,
                    '--toast-left': 'auto',
                    '--toast-bottom': 'auto',
                    '--toast-centered': '0',
                },
                'bottom-left': {
                    '--toast-bottom': `${baseOffset + stackOffset}px`,
                    '--toast-left': `${baseOffset}px`,
                    '--toast-right': 'auto',
                    '--toast-top': 'auto',
                    '--toast-centered': '0',
                },
                'bottom-center': {
                    '--toast-bottom': `${baseOffset + stackOffset}px`,
                    '--toast-left': '50%',
                    '--toast-right': 'auto',
                    '--toast-top': 'auto',
                    '--toast-centered': '1',
                },
                'bottom-right': {
                    '--toast-bottom': `${baseOffset + stackOffset}px`,
                    '--toast-right': `${baseOffset}px`,
                    '--toast-left': 'auto',
                    '--toast-top': 'auto',
                    '--toast-centered': '0',
                },
            };

            const positionStyles = positions[this.position] || positions['bottom-right'];

            // Convert object to inline style string and add actual positioning properties
            const styleString = Object.entries(positionStyles)
                .map(([key, value]) => `${key}: ${value}`)
                .join('; ');

            return `position: fixed; ${styleString}; top: var(--toast-top); right: var(--toast-right); bottom: var(--toast-bottom); left: var(--toast-left);`;
        },

        addWindowListener(event, handler) {
            window.addEventListener(event, handler);
            this.eventListeners.push({ event, handler });
        },

        destroy() {
            this.toasts.forEach(toast => {
                if (toast.timer) {
                    clearInterval(toast.timer);
                }
            });

            this.eventListeners.forEach(({ event, handler }) => {
                window.removeEventListener(event, handler);
            });
            this.eventListeners = [];
        }
    };
}

export function showToast(options) {
    window.dispatchEvent(new CustomEvent(SPIRE_EVENTS.TOAST_ADD, {
        detail: options
    }));
}

export const toast = {
    show: (title, message, options = {}) => showToast({ title, message, ...options }),
    success: (title, message, options = {}) => showToast({ title, message, color: 'success', ...options }),
    error: (title, message, options = {}) => showToast({ title, message, color: 'error', ...options }),
    warning: (title, message, options = {}) => showToast({ title, message, color: 'warning', ...options }),
    info: (title, message, options = {}) => showToast({ title, message, color: 'info', ...options }),
};
