@props([])

@php
    $baseClasses = array_filter([
        'flex',
        'flex-col',
        'gap-1',
        'pb-3',
    ]);

    $classString = implode(' ', $baseClasses);

    $mergedAttributes = $attributes->merge([
        'class' => $classString,
        'data-spire-card-header' => 'true',
    ]);
@endphp

<div {{ $mergedAttributes }}>
    {{ $slot }}
</div>
