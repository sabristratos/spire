@props([])

<div {{ $attributes->merge(['class' => 'spire-sidebar-content']) }} x-ref="content">
    {{ $slot }}
</div>
