@props([
    'value' => '',
    'label' => null,
    'disabled' => false,
])

@php
$displayLabel = $label ?? $slot->toHtml();

$mergedAttributes = $attributes->merge([
    'data-spire-autocomplete-value' => $value,
    'data-spire-autocomplete-label' => strip_tags($displayLabel),
    'data-spire-autocomplete-disabled' => $disabled ? 'true' : null,
]);
@endphp

<div {{ $mergedAttributes }}>
    {{ $slot }}
</div>
