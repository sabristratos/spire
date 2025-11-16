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
import { datepickerComponent } from './datepicker';
import { timepickerComponent } from './timepicker';
import { modalComponent } from './modal';
import { ratingComponent } from './rating';

export function initializeSpireUI() {
    window.overlay = overlay;
    window.keyboard = keyboard;
    window.selectComponent = selectComponent;
    window.autocompleteComponent = autocompleteComponent;
    window.calendarComponent = calendarComponent;
    window.datepickerComponent = datepickerComponent;
    window.timepickerComponent = timepickerComponent;
    window.modalComponent = modalComponent;
    window.ratingComponent = ratingComponent;

    document.addEventListener('alpine:init', () => {
        Alpine.data('overlay', overlay);
        Alpine.data('keyboard', keyboard);
        Alpine.data('selectComponent', selectComponent);
        Alpine.data('autocompleteComponent', autocompleteComponent);
        Alpine.data('calendarComponent', calendarComponent);
        Alpine.data('datepickerComponent', datepickerComponent);
        Alpine.data('timepickerComponent', timepickerComponent);
        Alpine.data('modalComponent', modalComponent);
        Alpine.data('ratingComponent', ratingComponent);
    });
}

export { overlay, keyboard, selectComponent, autocompleteComponent, calendarComponent, datepickerComponent, timepickerComponent, modalComponent, ratingComponent };
