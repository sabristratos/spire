@props([
    'placeholder' => null,
    'searchPlaceholder' => null,
    'placement' => spire_default('icon-picker', 'placement', 'bottom-start'),
    'disabled' => false,
    'clearable' => false,
])

@php
use SpireUI\Support\WireEntangle;

$wireConfig = WireEntangle::fromAttributes($attributes);
$placeholderText = $placeholder ?? __('spire::spire-ui.icon-picker.placeholder');
$searchPlaceholderText = $searchPlaceholder ?? __('spire::spire-ui.icon-picker.search_placeholder');
$iconsEndpoint = route('spire-ui.icons');
@endphp

<div
    x-data="spireIconPicker({
        @if($wireConfig->hasWireModel())
            value: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
        @endif
        placeholder: '{{ $placeholderText }}',
        searchPlaceholder: '{{ $searchPlaceholderText }}',
        clearable: {{ $clearable ? 'true' : 'false' }},
        iconsEndpoint: '{{ $iconsEndpoint }}'
    })"
    {{ WireEntangle::filteredAttributes($attributes) }}
>
    @if($wireConfig->needsHiddenInput())
        <input
            type="hidden"
            {{ WireEntangle::hiddenInputAttributes($attributes) }}
            x-model="value"
        >
    @endif

    <div wire:ignore>
        <div
            x-id="['popover']"
            class="relative"
        >
            <x-spire::icon-picker.trigger :placement="$placement" :disabled="$disabled" :clearable="$clearable" />
            <x-spire::icon-picker.content :placement="$placement" :searchPlaceholder="$searchPlaceholderText" />
        </div>
    </div>
</div>
