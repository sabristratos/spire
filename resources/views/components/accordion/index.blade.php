@props([
    'variant' => 'bordered',
    'color' => 'default',
    'radius' => 'md',
    'size' => 'md',
    'allowMultiple' => false,
    'defaultOpen' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('accordion')
    ->modifier($variant)
    ->modifier($size)
    ->radius($radius);

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$accordionId = 'accordion-' . uniqid();
$defaultOpenIndex = is_array($defaultOpen) ? ($defaultOpen[0] ?? null) : $defaultOpen;

$defaultOpenArray = is_array($defaultOpen) ? $defaultOpen : ($defaultOpen !== null ? [$defaultOpen] : []);
$defaultOpenJson = !empty($defaultOpenArray) ? json_encode($defaultOpenArray) : '[]';

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    'data-spire-accordion' => 'true',
    'data-spire-accordion-id' => $accordionId,
    'data-spire-variant' => $variant,
    'data-spire-color' => $color,
    'data-spire-size' => $size,
    'data-spire-allow-multiple' => $allowMultiple ? 'true' : 'false',
    'data-spire-default-open' => $defaultOpenJson,
]);
@endphp

@if($allowMultiple)
    <div {{ $mergedAttributes }}>
        {{ $slot }}
    </div>
@else
    <div {{ $mergedAttributes }} x-data="{ openItem: {{ $defaultOpenIndex ?? 'null' }} }">
        {{ $slot }}
    </div>
@endif
