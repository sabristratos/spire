@props([
    'variant' => 'ring',
    'size' => null,
    'color' => 'primary',
    'label' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('spinner')
    ->variant($variant)
    ->color($color);

if ($size) {
    $builder->size($size);
}

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    'role' => 'status',
    'aria-label' => $label ?? __('spire::spire-ui.spinner.loading'),
    ...$builder->getDataAttributes(),
]);
@endphp

@if($variant === 'dots')
    <div {{ $mergedAttributes }}>
        <div class="spire-spinner-dot"></div>
        <div class="spire-spinner-dot"></div>
        <div class="spire-spinner-dot"></div>
    </div>
@elseif($variant === 'nested-rings')
    <div {{ $mergedAttributes }}>
        <div class="spire-spinner-ring spire-spinner-ring--outer">
            <div class="spire-spinner-ring spire-spinner-ring--inner"></div>
        </div>
    </div>
@else
    <div {{ $mergedAttributes }}>
        <div class="spire-spinner-ring"></div>
    </div>
@endif
