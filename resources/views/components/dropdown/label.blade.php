@props([])

<div
    {{ $attributes->merge(['class' => 'px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide']) }}
    role="presentation"
>
    {{ $slot }}
</div>
