@aware(['name' => null])

@props([
    'tag' => 'h2',
])

@php
$classes = 'spire-modal-title';

$idAttribute = $name ? ['id' => "{$name}-title"] : [];

$mergedAttributes = $attributes->merge([
    'class' => $classes,
    ...$idAttribute,
]);
@endphp

<{{ $tag }} {{ $mergedAttributes }}>
    {{ $slot }}
</{{ $tag }}>
