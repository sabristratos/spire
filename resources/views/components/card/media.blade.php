@props([
    'aspectRatio' => 'video',
    'src' => null,
    'alt' => '',
])

@php
    $aspectRatioClasses = [
        'auto' => '',
        'square' => 'aspect-square',
        'video' => 'aspect-video',
        'portrait' => 'aspect-[3/4]',
    ];

    $baseClasses = array_filter([
        'overflow-hidden',
        '-mx-4',
        '-mt-4',
        'mb-3',
        $aspectRatioClasses[$aspectRatio] ?? $aspectRatioClasses['video'],
    ]);

    $imgClasses = array_filter([
        'w-full',
        'h-full',
        'object-cover',
    ]);

    $classString = implode(' ', $baseClasses);
    $imgClassString = implode(' ', $imgClasses);

    $mergedAttributes = $attributes->merge([
        'class' => $classString,
        'data-spire-card-media' => 'true',
    ]);
@endphp

<div {{ $mergedAttributes }}>
    @if($src)
        <img src="{{ $src }}" alt="{{ $alt }}" class="{{ $imgClassString }}" />
    @else
        {{ $slot }}
    @endif
</div>
