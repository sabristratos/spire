/**
 * Spire UI - Main JavaScript Entry Point
 *
 * This file imports and registers all Spire UI components with Alpine.js.
 * Import this single file in your app.js instead of importing each file individually.
 */

import { overlay } from './overlay';
import { keyboard } from './keyboard';
import { selectComponent } from './select';
import { autocompleteComponent } from './autocomplete';
import { calendarComponent } from './calendar';
import { timepickerComponent } from './timepicker';

export function initializeSpireUI() {
    window.overlay = overlay;
    window.keyboard = keyboard;
    window.selectComponent = selectComponent;
    window.autocompleteComponent = autocompleteComponent;
    window.calendarComponent = calendarComponent;
    window.timepickerComponent = timepickerComponent;

    document.addEventListener('alpine:init', () => {
        Alpine.data('overlay', overlay);
        Alpine.data('keyboard', keyboard);
        Alpine.data('selectComponent', selectComponent);
        Alpine.data('autocompleteComponent', autocompleteComponent);
        Alpine.data('calendarComponent', calendarComponent);
        Alpine.data('timepickerComponent', timepickerComponent);
    });
}

export { overlay, keyboard, selectComponent, autocompleteComponent, calendarComponent, timepickerComponent };
