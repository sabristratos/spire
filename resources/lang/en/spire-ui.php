<?php

return [
    'common' => [
        'cancel' => 'Cancel',
        'confirm' => 'Confirm',
        'close' => 'Close',
        'save' => 'Save',
        'delete' => 'Delete',
        'edit' => 'Edit',
        'create' => 'Create',
        'update' => 'Update',
        'search' => 'Search',
        'filter' => 'Filter',
        'clear' => 'Clear',
        'apply' => 'Apply',
        'submit' => 'Submit',
        'reset' => 'Reset',
        'loading' => 'Loading...',
        'no_results' => 'No results found',
    ],

    'alert' => [
        'close' => 'Close alert',
    ],

    'accordion' => [
        'toggle' => 'Toggle section',
        'expand' => 'Expand',
        'collapse' => 'Collapse',
    ],

    'dropdown' => [
        'toggle' => 'Toggle dropdown',
        'menu' => 'Menu',
        'select' => 'Select an option',
    ],

    'select' => [
        'placeholder' => 'Select an option',
        'no_options' => 'No options available',
        'search_placeholder' => 'Search options...',
        'no_results' => 'No results found',
        'items_selected' => ':count items selected',
        'more_items' => '+ :count more',
        'select_all' => 'Select All',
        'clear_all' => 'Clear All',
        'selected' => 'selected',
        'max_reached' => 'Maximum :max selections reached',
    ],

    'autocomplete' => [
        'placeholder' => 'Type to search...',
        'no_results' => 'No results found',
        'min_chars_message' => 'Type at least :count more character|Type at least :count more characters',
        'clear' => 'Clear input',
    ],

    'modal' => [
        'close' => 'Close modal',
        'confirm_title' => 'Confirm action',
        'confirm_message' => 'Are you sure you want to proceed?',
    ],

    'form' => [
        'required' => 'This field is required',
        'invalid' => 'Please enter a valid value',
        'optional' => 'Optional',
        'clear' => 'Clear',
        'show_password' => 'Show password',
        'hide_password' => 'Hide password',
    ],

    'switch' => [
        'on' => 'On',
        'off' => 'Off',
        'toggle' => 'Toggle switch',
    ],

    'pagination' => [
        'previous' => 'Previous',
        'next' => 'Next',
        'showing' => 'Showing',
        'to' => 'to',
        'of' => 'of',
        'results' => 'results',
    ],

    'timepicker' => [
        'placeholder' => 'Select time',
        'picker_label' => 'Time picker',
        'hour' => 'Hour',
        'minute' => 'Minute',
        'second' => 'Second',
        'period' => 'AM/PM',
        'now' => 'Now',
        'clear' => 'Clear',
        'previous' => 'Previous',
        'next' => 'Next',
    ],

    'datepicker' => [
        'placeholder' => 'Select date',
        'picker_label' => 'Date picker',
        'open_picker' => 'Open calendar',
        'month' => 'Month',
        'day' => 'Day',
        'year' => 'Year',
        'today' => 'Today',
        'clear' => 'Clear',
        'range_placeholder' => 'Select date range',
        'multiple_placeholder' => 'Select dates',
        'start_date' => 'Start date',
        'end_date' => 'End date',
        'dates_count' => ':count dates',
    ],

    'date' => [
        'today' => 'Today',
        'tomorrow' => 'Tomorrow',
        'yesterday' => 'Yesterday',
        'range_separator' => 'to',
        'clear' => 'Clear date',
        'close' => 'Close calendar',
        'select_date' => 'Select a date',
        'select_time' => 'Select a time',
        'previous_month' => 'Previous month',
        'next_month' => 'Next month',
        'previous_year' => 'Previous year',
        'next_year' => 'Next year',
        'month_year' => ':month :year',
        'select_month_year' => 'Select month and year',
        'month_year_picker' => 'Month and year picker',
        'select_month' => 'Select month',

        // Footer buttons
        'select_today' => 'Select today',
        'clear_selection' => 'Clear selection',
        'select' => 'Select',

        // Presets
        'presets' => 'Quick select',
        'preset_last_7_days' => 'Last 7 days',
        'preset_last_30_days' => 'Last 30 days',
        'preset_this_week' => 'This week',
        'preset_last_week' => 'Last week',
        'preset_this_month' => 'This month',
        'preset_last_month' => 'Last month',

        // Range selection
        'range_start' => 'Range start',
        'range_end' => 'Range end',
        'range_selected' => 'Range from :start to :end selected',
        'range_preview' => 'Range from :start to :end',
        'select_end_date' => 'Select end date',

        // Multiple selection
        'dates_selected' => ':count dates selected',
        'date_selected' => ':date selected',
        'date_deselected' => ':date deselected',
        'select_multiple_dates' => 'Select multiple dates',
        'max_dates_reached' => 'Maximum :max dates allowed',

        // Announcements
        'announce_cleared' => 'Selection cleared',
        'announce_today_selected' => 'Today selected',
        'announce_preset_applied' => ':preset applied',

        'months' => [
            'long' => [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            'short' => [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
        ],

        'days' => [
            'long' => [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ],
            'short' => [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
            ],
            'min' => [
                'S',
                'M',
                'T',
                'W',
                'T',
                'F',
                'S',
            ],
        ],

        'error' => [
            'before_min_date' => 'Date must be on or after :date',
            'after_max_date' => 'Date must be on or before :date',
            'date_disabled' => 'This date is not available',
            'day_of_week_disabled' => 'This day of the week is not available',
            'invalid_date' => 'Please enter a valid date',
            'invalid_range' => 'End date must be after start date',
            'range_too_short' => 'Range must be at least :min days',
            'range_too_long' => 'Range cannot exceed :max days',
        ],
    ],
];
