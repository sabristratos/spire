@props([
    'size' => 'md',
    'isGrid' => false,
    'isBordered' => false,
    'ariaLabel' => null,
])

@php
    $baseClasses = array_filter([
        'flex',
        'items-center',
        $isGrid ? 'flex-wrap gap-2' : '-space-x-2',
    ]);

    $classString = implode(' ', $baseClasses);

    $mergedAttributes = $attributes->merge([
        'class' => $classString,
        'data-spire-avatar-group' => 'true',
        'data-spire-avatar-group-size' => $size,
        'data-spire-avatar-group-bordered' => $isBordered ? 'true' : null,
        'data-spire-avatar-group-grid' => $isGrid ? 'true' : null,
        'role' => 'group',
        'aria-label' => $ariaLabel,
    ]);
@endphp

<div {{ $mergedAttributes }}>
    {{ $slot }}
</div>
