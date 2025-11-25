/**
 * Spire UI - Main JavaScript Entry Point
 *
 * This file imports and registers all Spire UI components with Alpine.js.
 * Import this single file in your app.js instead of importing each file individually.
 */

import { ComponentClass } from './shared/component-class';
import { overlay } from './shared/overlay';
import { keyboard } from './shared/keyboard';
import { inputComponent } from '../views/components/input/input';
import { selectComponent } from '../views/components/select/select';
import { autocompleteComponent } from '../views/components/autocomplete/autocomplete';
import { calendarComponent } from '../views/components/calendar/calendar';
import { datepickerComponent } from '../views/components/datepicker/datepicker';
import { timepickerComponent } from '../views/components/timepicker/timepicker';
import { modalComponent } from '../views/components/modal/modal';
import { phoneInputComponent } from '../views/components/phone-input/phone-input';
import { progressComponent, progressCircularComponent } from '../views/components/progress/progress';
import { ratingComponent } from '../views/components/rating/rating';
import { tooltipComponent } from '../views/components/tooltip/tooltip';
import { editorComponent } from '../views/components/editor/editor';
import { tableComponent } from '../views/components/table/table';
import { sliderComponent } from '../views/components/slider/slider';
import { toastComponent, toast } from '../views/components/toast/toast';
import { tabsComponent } from '../views/components/tabs/tabs';
import { fileUploadComponent } from '../views/components/file-upload/file-upload';
import { sidebarComponent, sidebarSectionComponent, sidebarItemComponent } from '../views/components/sidebar/sidebar';
import { dropdownComponent } from '../views/components/dropdown/dropdown';
import { carouselComponent } from '../views/components/carousel/carousel';
import { breadcrumbsComponent } from '../views/components/breadcrumbs/breadcrumbs';
import { lightboxComponent } from '../views/components/lightbox/lightbox';
import { chartComponent } from '../views/components/chart/chart';
import { iconPickerComponent } from '../views/components/icon-picker/icon-picker';
import { colorPickerComponent } from '../views/components/color-picker/color-picker';
import { eventCalendarComponent } from '../views/components/event-calendar/event-calendar';

let componentsRegistered = false;

function registerComponents(Alpine) {
    if (componentsRegistered || !Alpine) return;
    componentsRegistered = true;

    Alpine.data('spireOverlay', overlay);
    Alpine.data('spireKeyboard', keyboard);
    Alpine.data('spireInput', inputComponent);
    Alpine.data('spireSelect', selectComponent);
    Alpine.data('spireAutocomplete', autocompleteComponent);
    Alpine.data('spireCalendar', calendarComponent);
    Alpine.data('spireDatepicker', datepickerComponent);
    Alpine.data('spireTimepicker', timepickerComponent);
    Alpine.data('spireModal', modalComponent);
    Alpine.data('spirePhoneInput', phoneInputComponent);
    Alpine.data('spireProgress', progressComponent);
    Alpine.data('spireProgressCircular', progressCircularComponent);
    Alpine.data('spireRating', ratingComponent);
    Alpine.data('spireTooltip', tooltipComponent);
    Alpine.data('spireEditor', editorComponent);
    Alpine.data('spireTable', tableComponent);
    Alpine.data('spireSlider', sliderComponent);
    Alpine.data('spireToast', toastComponent);
    Alpine.data('spireTabs', tabsComponent);
    Alpine.data('spireFileUpload', fileUploadComponent);
    Alpine.data('spireSidebar', sidebarComponent);
    Alpine.data('spireSidebarSection', sidebarSectionComponent);
    Alpine.data('spireSidebarItem', sidebarItemComponent);
    Alpine.data('spireDropdown', dropdownComponent);
    Alpine.data('spireCarousel', carouselComponent);
    Alpine.data('spireBreadcrumbs', breadcrumbsComponent);
    Alpine.data('spireLightbox', lightboxComponent);
    Alpine.data('spireChart', chartComponent);
    Alpine.data('spireIconPicker', iconPickerComponent);
    Alpine.data('spireColorPicker', colorPickerComponent);
    Alpine.data('spireEventCalendar', eventCalendarComponent);
}

document.addEventListener('livewire:init', () => {
    registerComponents(window.Alpine);
});

document.addEventListener('alpine:init', () => {
    registerComponents(window.Alpine);
});

export function initializeSpireUI() {
    window.ComponentClass = ComponentClass;
    window.toast = toast;

    if (window.Alpine) {
        registerComponents(window.Alpine);
    }
}

export { ComponentClass, overlay, keyboard, inputComponent, selectComponent, autocompleteComponent, calendarComponent, datepickerComponent, timepickerComponent, modalComponent, phoneInputComponent, progressComponent, progressCircularComponent, ratingComponent, tooltipComponent, editorComponent, tableComponent, sliderComponent, toastComponent, toast, tabsComponent, fileUploadComponent, sidebarComponent, sidebarSectionComponent, sidebarItemComponent, dropdownComponent, carouselComponent, breadcrumbsComponent, lightboxComponent, chartComponent, iconPickerComponent, colorPickerComponent, eventCalendarComponent };
