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
];
