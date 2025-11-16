@props([
    'count' => 0,
    'size' => 'md',
    'color' => 'neutral',
    'isBordered' => false,
])

@php
use SpireUI\Support\ComponentClass;

    $builder = ComponentClass::make('avatar-overflow')
        ->size($size)
        ->colorVariant($color, 'solid')
        ->when($isBordered, fn($b) => $b->modifier('bordered')->modifier("ring-{$color}"));

    if ($customClass = $attributes->get('class')) {
        $builder->addClass($customClass);
    }

    $mergedAttributes = $attributes->merge([
        'class' => $builder->build(),
        'data-spire-avatar-overflow' => 'true',
        'data-spire-color' => $color,
        'aria-label' => "+{$count} more",
    ]);
@endphp

<span {{ $mergedAttributes }}>
    +{{ $count }}
</span>
