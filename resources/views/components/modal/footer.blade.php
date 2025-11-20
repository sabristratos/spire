@props([])

@php
$classes = 'spire-modal__footer';

$mergedAttributes = $attributes->merge([
    'class' => $classes,
]);
@endphp

<div {{ $mergedAttributes }}>
    {{ $slot }}
</div>
