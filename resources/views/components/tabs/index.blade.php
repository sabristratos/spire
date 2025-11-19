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
    ->when($isVertical, fn($b) => $b->modifier('vertical'));

$alpineConfig = json_encode([
    'defaultValue' => $defaultValue,
    'orientation' => $orientation,
    'activationMode' => $activationMode,
    'syncHash' => $syncHash,
    'name' => $name,
]);
@endphp

<div
    {{ $attributes->merge(['class' => $builder->build()]) }}
    x-data="spireTabs({{ $alpineConfig }})"
    x-modelable="activeTab"
    data-spire-tabs
    data-spire-orientation="{{ $orientation }}"
    data-spire-variant="{{ $variant }}"
    data-spire-color="{{ $color }}"
    data-spire-size="{{ $size }}"
    data-spire-full-width="{{ $fullWidth ? 'true' : 'false' }}"
    data-spire-scrollable="{{ $scrollable ? 'true' : 'false' }}"
>
    {{ $slot }}
</div>
