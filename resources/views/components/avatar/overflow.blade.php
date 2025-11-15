@props([
    'count' => 0,
    'size' => 'md',
    'color' => 'neutral',
    'isBordered' => false,
])

@php
use SpireUI\Support\ComponentStyles;

    $groupRingClasses = ComponentStyles::avatarGroupRingClasses(['default', 'neutral', 'primary', 'secondary', 'success', 'error', 'warning', 'info']);

    $classString = ComponentStyles::buildClassString([
        'relative',
        'inline-flex',
        'items-center',
        'justify-center',
        'shrink-0',
        'overflow-hidden',
        'font-semibold',
        'rounded-full',
        'ease-fast',
        ComponentStyles::sizeClasses($size),
        ComponentStyles::colorClasses('solid', $color),
        ...$groupRingClasses,
        $isBordered ? 'ring-2' : '',
        $isBordered ? 'ring-offset-2' : '',
        $isBordered ? ComponentStyles::ringColorClasses($color) : '',
    ]);

    $mergedAttributes = $attributes->merge([
        'class' => $classString,
        'data-spire-avatar-overflow' => 'true',
        'data-spire-color' => $color,
        'aria-label' => "+{$count} more",
    ]);
@endphp

<span {{ $mergedAttributes }}>
    +{{ $count }}
</span>
