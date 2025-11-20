@props([
    'defaultValue' => null,
    'orientation' => 'horizontal',
    'activationMode' => 'automatic',
    'variant' => 'underline',
    'color' => 'primary',
    'size' => 'md',
    'fullWidth' => false,
    'scrollable' => true,
    'syncHash' => false,
    'name' => null,
])

@php
use SpireUI\Support\ComponentClass;

$isVertical = $orientation === 'vertical';

$builder = ComponentClass::make('tabs')
    ->when($isVertical, fn($b) => $b->modifier('vertical'))
    ->dataAttribute('tabs', 'true')
    ->dataAttribute('orientation', $orientation)
    ->dataAttribute('variant', $variant)
    ->dataAttribute('color', $color)
    ->dataAttribute('size', $size)
    ->dataAttribute('full-width', $fullWidth ? 'true' : 'false')
    ->dataAttribute('scrollable', $scrollable ? 'true' : 'false');

$alpineConfig = json_encode([
    'defaultValue' => $defaultValue,
    'orientation' => $orientation,
    'activationMode' => $activationMode,
    'syncHash' => $syncHash,
    'name' => $name,
]);
@endphp

<div
    {{ $attributes->merge(['class' => $builder->build(), ...$builder->getDataAttributes()]) }}
    x-data="spireTabs({{ $alpineConfig }})"
    x-modelable="activeTab"
>
    {{ $slot }}
</div>
