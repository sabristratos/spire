/**
 * Spire UI Event Constants
 *
 * Standardized event names for all Spire UI components.
 * Use these constants instead of hardcoded strings to prevent typos.
 */

export const SPIRE_EVENTS = {
    // Input Events
    INPUT_CHANGED: 'spire-input-changed',
    INPUT_CLEARED: 'spire-input-cleared',
    COPIED: 'spire-copied',

    // Rating Events
    RATING_CHANGED: 'spire-rating-changed',
    RATING_RESET: 'spire-rating-reset',

    // Slider Events
    SLIDER_CHANGED: 'spire-slider-changed',
    SLIDER_CHANGE_END: 'spire-slider-change-end',

    // Table Events
    TABLE_SELECTION_CHANGED: 'spire-table-selection-changed',
    TABLE_SORT_CHANGED: 'spire-table-sort-changed',

    // Calendar/Datepicker Events
    DATE_SELECTED: 'spire-date-selected',
    DATEPICKER_CLEARED: 'spire-datepicker-cleared',

    // Modal Events
    MODAL_OPENED: 'spire-modal-opened',
    MODAL_CLOSED: 'spire-modal-closed',
    MODAL_CANCELLED: 'spire-modal-cancelled',

    // Select Events
    SELECT_CHANGED: 'spire-select-changed',
    SELECT_CLEARED: 'spire-select-cleared',

    // Autocomplete Events
    AUTOCOMPLETE_SELECTED: 'spire-autocomplete-selected',
    AUTOCOMPLETE_CLEARED: 'spire-autocomplete-cleared',

    // Toast Events
    TOAST_ADD: 'spire-toast-add',
    TOAST_SHOWN: 'spire-toast-shown',
    TOAST_HIDDEN: 'spire-toast-hidden',

    // File Upload Events
    FILE_UPLOAD_ADDED: 'spire-file-upload-added',
    FILE_UPLOAD_REMOVED: 'spire-file-upload-removed',
    FILE_UPLOAD_PROGRESS: 'spire-file-upload-progress',
    FILE_UPLOAD_COMPLETE: 'spire-file-upload-complete',
    FILE_UPLOAD_ERROR: 'spire-file-upload-error',

    // Tabs Events
    TABS_CHANGED: 'spire-tabs-changed',

    // Phone Input Events
    PHONE_INPUT_CHANGED: 'spire-phone-input-changed',
    PHONE_INPUT_COUNTRY_CHANGED: 'spire-phone-input-country-changed',

    // Carousel Events
    CAROUSEL_CHANGE: 'spire-carousel-change',

    // Lightbox Events
    LIGHTBOX_OPENED: 'spire-lightbox-opened',
    LIGHTBOX_CLOSED: 'spire-lightbox-closed',
    LIGHTBOX_CHANGED: 'spire-lightbox-changed',
};

/**
 * Creates a standardized event payload
 *
 * @param {Object} options
 * @param {any} options.value - The current value
 * @param {any} [options.previousValue] - The previous value (for change events)
 * @param {string|null} [options.id] - Unique component instance ID
 * @param {string|null} [options.name] - Component name (for named instances)
 * @param {Object} [options.metadata] - Additional component-specific data
 * @returns {Object} Standardized event payload
 */
export function createEventPayload({ value, previousValue, id = null, name = null, metadata = {} }) {
    return {
        id,
        name,
        value,
        ...(previousValue !== undefined && { previousValue }),
        timestamp: Date.now(),
        ...metadata,
    };
}
