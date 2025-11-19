@props([
    'orientation' => 'horizontal',
    'color' => 'default',
    'size' => 'md',
    'spacing' => 'md',
    'labelPosition' => 'center',
])

@php
use SpireUI\Support\ComponentClass;

$hasContent = $slot->isNotEmpty();

$builder = ComponentClass::make('separator')
    ->size($size)
    ->color($color)
    ->modifier($orientation)
    ->modifier("spacing-{$spacing}")
    ->when($hasContent, fn($b) => $b->modifier('has-content')->modifier("label-{$labelPosition}"));

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
    'role' => 'separator',
    'aria-orientation' => $orientation,
]);
@endphp

<div {{ $mergedAttributes }}>
    @if($hasContent)
        <span class="spire-separator__content">{{ $slot }}</span>
    @endif
</div>
