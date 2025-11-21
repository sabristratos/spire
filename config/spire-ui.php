<?php

return [
    'prefix' => env('SPIRE_UI_PREFIX', 'spire'),

    'theme' => [
        'dark_mode' => env('SPIRE_UI_DARK_MODE', 'class'),
    ],

    'components' => [
        'enabled' => true,
    ],

    'cdn' => [
        'enabled' => env('SPIRE_UI_CDN', false),
    ],

    'spinner' => [
        'default_variant' => env('SPIRE_UI_SPINNER_VARIANT', 'ring'),
    ],

    'pagination' => [
        'register_default' => env('SPIRE_UI_PAGINATION_DEFAULT', true),
    ],

    /*
    |--------------------------------------------------------------------------
    | Component Defaults
    |--------------------------------------------------------------------------
    |
    | Set global defaults for component properties. These apply to all form
    | components. You can also set per-component overrides.
    |
    */

    'defaults' => [
        // Global defaults (apply to all components)
        // Options: 'sm', 'md', 'lg'
        'size' => 'md',

        // Options: 'none', 'sm', 'md', 'lg', 'full'
        'radius' => 'lg',

        // Options: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'
        'placement' => 'bottom-start',

        // Global input variant (applies to input, textarea, select, autocomplete, datepicker, timepicker)
        // Options: 'bordered', 'flat', 'underlined'
        'input-variant' => 'bordered',

        // Toast notifications
        'toast' => [
            // Duration in milliseconds before auto-dismiss
            'duration' => 5000,

            // Options: 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'
            'position' => 'bottom-right',
        ],

        // Tooltip
        'tooltip' => [
            // Delay in milliseconds before showing tooltip
            'delay' => 300,
        ],

        // Autocomplete
        'autocomplete' => [
            // Debounce delay in milliseconds for search input
            'debounce' => 300,
        ],

        // Phone Input
        'phone-input' => [
            // Default country code (ISO 3166-1 alpha-2)
            'defaultCountry' => 'tn',
        ],

        // Text
        'text' => [
            // Options: 'default', 'strong', 'subtle'
            'variant' => 'default',

            // Options: 'p', 'span', 'div', 'label'
            'as' => 'p',
        ],

        // Heading
        'heading' => [
            // Options: 'sm', 'md', 'lg'
            'size' => 'sm',
        ],

        // Link
        'link' => [
            // Options: 'default', 'ghost', 'subtle'
            'variant' => 'default',
        ],

        // Carousel
        'carousel' => [
            // Options: 'sm', 'md', 'lg'
            'gap' => 'md',

            // Autoplay settings
            'autoplay' => false,
            'interval' => 5000,
            'loop' => false,

            // Display options
            'showArrows' => true,
            'showIndicators' => true,

            // Control button defaults (previous, next, play-pause)
            'controls' => [
                // Options: 'solid', 'bordered', 'ghost', etc.
                'variant' => 'bordered',
                // Options: 'sm', 'md', 'lg'
                // 'size' => 'sm',
            ],

            // Indicator defaults
            'indicators' => [
                // Options: 'dots', 'lines', 'numbers'
                'variant' => 'dots',
                // Options: 'sm', 'md', 'lg'
                'size' => 'sm',
            ],
        ],

        // Breadcrumbs
        'breadcrumbs' => [
            // Options: 'sm', 'md', 'lg'
            'size' => 'md',

            // Separator icon name
            'separator' => 'chevron-right',
        ],

        // Datepicker & Calendar
        'datepicker' => [
            // Options: 'auto' (locale-based), 'YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY', 'DD-MM-YYYY', 'DD.MM.YYYY'
            'format' => 'auto',

            // Options: null (locale-based), 0 (Sunday), 1 (Monday), 2 (Tuesday), etc.
            'firstDayOfWeek' => 1,
        ],

        // Table
        'table' => [
            // Options: 'flat', 'bordered'
            'variant' => 'flat',
        ],

        // Per-component overrides (uncomment to customize)
        // 'button' => [
        //     'size' => 'sm',
        //     'radius' => 'lg',
        // ],
        // 'input' => [
        //     'variant' => 'bordered',
        // ],
        // 'textarea' => [
        //     'variant' => 'bordered',
        // ],
        // 'select' => [
        //     'variant' => 'bordered',
        // ],
        'slider' => [
            'size' => 'md',
        ],
        // 'timepicker' => [
        //     'variant' => 'bordered',
        // ],

        // Progress
        'progress' => [
            // Options: 'sm', 'md', 'lg' (falls back to global size if not set)
            // 'size' => 'md',

            // Options: 'primary', 'secondary', 'success', 'error', 'warning', 'info', 'featured', 'default'
            'color' => 'primary',

            // Options: 'solid', 'striped', 'gradient'
            'variant' => 'solid',

            // Options: 'none', 'sm', 'md', 'lg', 'full'
            'radius' => 'full',

            // Circular progress defaults
            'circular' => [
                'size' => 48,
                'strokeWidth' => 4,
            ],
        ],

        // Section (layout container)
        'section' => [
            // Options: 'narrow', 'default', 'wide', 'full'
            'size' => 'default',

            // Options: 'none', 'sm', 'md', 'lg'
            'padding' => 'md',

            // Whether to center the section horizontally
            'centered' => true,

            // Width presets (Tailwind max-width classes)
            'sizes' => [
                'narrow' => 'max-w-3xl',
                'default' => 'max-w-5xl',
                'wide' => 'max-w-7xl',
                'full' => 'max-w-full',
            ],

            // Padding presets (horizontal + vertical responsive padding)
            'paddings' => [
                'none' => '',
                'sm' => 'px-4 py-8 lg:py-12',
                'md' => 'px-4 sm:px-6 lg:px-8 py-12 lg:py-16',
                'lg' => 'px-4 sm:px-6 lg:px-8 py-16 lg:py-24',
            ],
        ],
    ],
];
