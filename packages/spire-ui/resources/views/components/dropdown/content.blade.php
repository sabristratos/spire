@aware(['placement' => 'bottom-start'])

@props([
    'width' => 'md',
])

@php
    use SpireUI\Support\ComponentStyles;

    $classString = ComponentStyles::buildClassString([
        ComponentStyles::dropdownContentBase(),
        ComponentStyles::dropdownContentWidth($width),
        'animate-dropdown-bounce',
    ]);

    $mergedAttributes = $attributes->merge([
        'data-placement' => $placement,
        'popover' => 'auto',
        'class' => $classString,
        'role' => 'menu',
        'tabindex' => '-1',
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
