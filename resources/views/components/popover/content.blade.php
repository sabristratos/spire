@aware(['placement' => 'bottom-start'])

@props([
    'size' => 'md',
    'padding' => 'normal',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('popover')
    ->modifier($size)
    ->modifier("padding-{$padding}");

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    'data-placement' => $placement,
    'data-spire-popover' => 'true',
    'popover' => 'auto',
]);
@endphp

<div
    :id="$id('popover')"
    x-ref="content"
    @toggle="handleToggle"
    {{ $mergedAttributes }}
>
    {{ $slot }}
</div>
