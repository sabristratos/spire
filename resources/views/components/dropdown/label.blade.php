@props([])

<div
    {{ $attributes->merge(['class' => 'spire-dropdown-label']) }}
    role="presentation"
>
    {{ $slot }}
</div>
