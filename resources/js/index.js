/**
 * Spire UI - Main JavaScript Entry Point
 *
 * This file imports and registers all Spire UI components with Alpine.js.
 * Import this single file in your app.js instead of importing each file individually.
 */

import { overlay } from './overlay';
import { keyboard } from './keyboard';
import { inputComponent } from './input';
import { selectComponent } from './select';
import { autocompleteComponent } from './autocomplete';
import { calendarComponent } from './calendar';
import { datepickerComponent } from './datepicker';
import { timepickerComponent } from './timepicker';
import { modalComponent } from './modal';
import { ratingComponent } from './rating';
import { tooltipComponent } from './tooltip';
import { editorComponent } from './editor';
import { tableComponent } from './table';
import { sliderComponent } from './slider';
import { toastComponent, toast } from './toast';

export function initializeSpireUI() {
    // Expose to window for direct access if needed
    window.overlay = overlay;
    window.keyboard = keyboard;
    window.inputComponent = inputComponent;
    window.selectComponent = selectComponent;
    window.autocompleteComponent = autocompleteComponent;
    window.calendarComponent = calendarComponent;
    window.datepickerComponent = datepickerComponent;
    window.timepickerComponent = timepickerComponent;
    window.modalComponent = modalComponent;
    window.ratingComponent = ratingComponent;
    window.tooltipComponent = tooltipComponent;
    window.editorComponent = editorComponent;
    window.tableComponent = tableComponent;
    window.sliderComponent = sliderComponent;
    window.toastComponent = toastComponent;

    // Expose global toast helper
    window.toast = toast;

    document.addEventListener('alpine:init', () => {
        Alpine.data('spireOverlay', overlay);
        Alpine.data('spireKeyboard', keyboard);
        Alpine.data('spireInput', inputComponent);
        Alpine.data('spireSelect', selectComponent);
        Alpine.data('spireAutocomplete', autocompleteComponent);
        Alpine.data('spireCalendar', calendarComponent);
        Alpine.data('spireDatepicker', datepickerComponent);
        Alpine.data('spireTimepicker', timepickerComponent);
        Alpine.data('spireModal', modalComponent);
        Alpine.data('spireRating', ratingComponent);
        Alpine.data('spireTooltip', tooltipComponent);
        Alpine.data('spireEditor', editorComponent);
        Alpine.data('spireTable', tableComponent);
        Alpine.data('spireSlider', sliderComponent);
        Alpine.data('spireToast', toastComponent);
    });
}

export { overlay, keyboard, inputComponent, selectComponent, autocompleteComponent, calendarComponent, datepickerComponent, timepickerComponent, modalComponent, ratingComponent, tooltipComponent, editorComponent, tableComponent, sliderComponent, toastComponent, toast };
