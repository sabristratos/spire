import { overlay } from '../../../js/shared/overlay';
import { keyboard } from '../../../js/shared/keyboard';

/**
 * Dropdown component for Spire UI
 * Combines overlay positioning with keyboard navigation for menu dropdowns
 */
export function dropdownComponent(config = {}) {
    return {
        ...overlay({
            type: config.type || 'auto',
            trigger: config.trigger || 'click',
            onInit() {
                this.setupKeyboard();
                config.onInit?.call(this);
            }
        }),

        ...keyboard({
            pattern: 'roving-tabindex',
            role: 'menu',
            itemSelector: '[role=menuitem]:not([disabled])',
            orientation: 'vertical',
            wrap: true,
            onSelect(item) {
                item?.click();
            }
        }),

        destroy() {
            // Call parent destroy methods to clean up timers
            overlay().destroy?.call(this);
            keyboard().destroy?.call(this);
        }
    };
}
