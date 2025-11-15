@props([])

@php
    use SpireUI\Support\ComponentStyles;
@endphp

<div
    {{ $attributes->merge(['class' => ComponentStyles::dropdownSeparatorBase()]) }}
    role="separator"
></div>
