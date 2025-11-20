@props([])

@php
    $baseClasses = array_filter([
        'flex',
        'flex-col',
        'gap-2',
    ]);

    $classString = implode(' ', $baseClasses);

    $mergedAttributes = $attributes->merge([
        'class' => $classString,
        'data-spire-card-body' => 'true',
    ]);
@endphp

<div {{ $mergedAttributes }}>
    {{ $slot }}
</div>
