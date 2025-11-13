@props([
    'isBlurred' => false,
])

@php
    $isCardFooterBlurred = false;

    if (isset($__laravel_slots) && isset($__laravel_slots['__default'])) {
        $parentAttributes = $__laravel_slots['__default']->attributes ?? [];
        $isCardFooterBlurred = $parentAttributes->get('data-spire-footer-blurred') === 'true';
    }

    $shouldBlur = $isBlurred || $isCardFooterBlurred;

    $baseClasses = array_filter([
        'flex',
        'items-center',
        'justify-between',
        'pt-3',
        'gap-3',
        $shouldBlur ? 'absolute bottom-0 left-0 right-0 backdrop-blur-md bg-surface/70 p-4 rounded-b-lg' : '',
    ]);

    $classString = implode(' ', $baseClasses);

    $mergedAttributes = $attributes->merge([
        'class' => $classString,
        'data-spire-card-footer' => 'true',
        'data-spire-blurred' => $shouldBlur ? 'true' : null,
    ]);
@endphp

<div {{ $mergedAttributes }}>
    {{ $slot }}
</div>
