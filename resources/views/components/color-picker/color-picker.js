import { overlay } from '../../../js/shared/overlay';
import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';

const PRESET_COLORS = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
    '#ec4899', '#f43f5e', '#78716c', '#71717a', '#000000',
];

function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function hexToHsl(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }

    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function isValidHex(hex) {
    return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

export function colorPickerComponent(config = {}) {
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
                this.$nextTick(() => {
                    if (this.value) {
                        this.setColorFromHex(this.value);
                    }
                });

                this.$watch('value', (newValue) => {
                    if (newValue && newValue !== this.currentHex) {
                        this.setColorFromHex(newValue);
                    } else if (!newValue) {
                        this.resetToDefault();
                    }
                });

                this.$watch('open', (isOpen) => {
                    if (isOpen) {
                        this.$nextTick(() => {
                            this.drawGradient();
                            const wrapper = this.$refs.hexInputWrapper;
                            if (wrapper) {
                                const hexInput = wrapper.querySelector('input[type="text"]');
                                if (hexInput) {
                                    const scrollParent = this.findScrollableAncestor(hexInput);
                                    const scrollTop = scrollParent?.scrollTop;

                                    this.$focus.focus(hexInput);
                                    hexInput.select();

                                    if (scrollParent && scrollTop !== undefined) {
                                        scrollParent.scrollTop = scrollTop;
                                    }
                                }
                            }
                        });
                    }
                });
            }
        }),

        value: config.value || '',
        placeholder: config.placeholder || 'Select a color',
        presets: config.presets || PRESET_COLORS,
        name: config.name || null,
        clearable: config.clearable || false,

        hue: 210,
        saturation: 100,
        lightness: 50,
        hexInput: '',
        isDraggingGradient: false,
        isDraggingHue: false,

        get currentHex() {
            return hslToHex(this.hue, this.saturation, this.lightness);
        },

        get hueColor() {
            return hslToHex(this.hue, 100, 50);
        },

        setColorFromHex(hex) {
            if (!hex || !isValidHex(hex)) return;

            hex = hex.startsWith('#') ? hex : '#' + hex;
            const hsl = hexToHsl(hex);
            this.hue = hsl.h;
            this.saturation = hsl.s;
            this.lightness = hsl.l;
            this.hexInput = hex.toUpperCase();
        },

        resetToDefault() {
            this.hue = 210;
            this.saturation = 100;
            this.lightness = 50;
            this.hexInput = '';
        },

        drawGradient() {
            const canvas = this.$refs.gradientCanvas;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;

            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const s = (x / width) * 100;
                    const l = 100 - (y / height) * 100;
                    ctx.fillStyle = hslToHex(this.hue, s, l);
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        },

        handleGradientMouseDown(e) {
            this.isDraggingGradient = true;
            this.updateGradientFromEvent(e);
        },

        handleGradientMouseMove(e) {
            if (!this.isDraggingGradient) return;
            this.updateGradientFromEvent(e);
        },

        handleGradientMouseUp() {
            this.isDraggingGradient = false;
        },

        updateGradientFromEvent(e) {
            const canvas = this.$refs.gradientCanvas;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

            this.saturation = Math.round((x / rect.width) * 100);
            this.lightness = Math.round(100 - (y / rect.height) * 100);
            this.hexInput = this.currentHex.toUpperCase();
        },

        handleHueMouseDown(e) {
            this.isDraggingHue = true;
            this.updateHueFromEvent(e);
        },

        handleHueMouseMove(e) {
            if (!this.isDraggingHue) return;
            this.updateHueFromEvent(e);
        },

        handleHueMouseUp() {
            this.isDraggingHue = false;
        },

        updateHueFromEvent(e) {
            const slider = this.$refs.hueSlider;
            if (!slider) return;

            const rect = slider.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            this.hue = Math.round((x / rect.width) * 360);
            this.hexInput = this.currentHex.toUpperCase();

            this.$nextTick(() => this.drawGradient());
        },

        handleHexInput(e) {
            let hex = e.target.value.trim();
            if (!hex.startsWith('#')) {
                hex = '#' + hex;
            }

            if (isValidHex(hex)) {
                this.setColorFromHex(hex);
                this.$nextTick(() => this.drawGradient());
            }
        },

        selectPreset(color) {
            this.setColorFromHex(color);
            this.$nextTick(() => this.drawGradient());
        },

        selectColor() {
            const previousValue = this.value;
            const newValue = this.currentHex.toUpperCase();
            this.value = newValue;
            this.hide();

            this.$dispatch(SPIRE_EVENTS.SELECT_CHANGED, createEventPayload({
                id: this.$id('color-picker'),
                name: this.name,
                value: newValue,
                previousValue: previousValue,
                metadata: { color: newValue }
            }));
        },

        clearSelection() {
            const previousValue = this.value;
            this.value = '';
            this.resetToDefault();

            this.$dispatch(SPIRE_EVENTS.SELECT_CLEARED, createEventPayload({
                id: this.$id('color-picker'),
                name: this.name,
                value: '',
                previousValue: previousValue
            }));
        },

        destroy() {
            overlay().destroy?.call(this);
        }
    };
}

export { PRESET_COLORS, hslToHex, hexToHsl, isValidHex };
