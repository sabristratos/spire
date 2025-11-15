@props([])

@php
    use SpireUI\Support\ComponentStyles;
@endphp

<div
    {{ $attributes->merge(['class' => ComponentStyles::dropdownLabelBase()]) }}
    role="presentation"
>
    {{ $slot }}
</div>
