@props([])

@php
$classes = 'spire-modal-footer';

$mergedAttributes = $attributes->merge([
    'class' => $classes,
]);
@endphp

<div {{ $mergedAttributes }}>
    {{ $slot }}
</div>
