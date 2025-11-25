@props([
    'placeholder' => null,
    'placement' => spire_default('color-picker', 'placement', 'bottom-start'),
    'disabled' => false,
    'clearable' => false,
])

@php
use SpireUI\Support\WireEntangle;

$wireConfig = WireEntangle::fromAttributes($attributes);
$placeholderText = $placeholder ?? __('spire::spire-ui.color-picker.placeholder');
@endphp

<div
    x-modelable="value"
    x-data="spireColorPicker({
        @if($wireConfig->hasWireModel())
            value: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
        @else
            value: '',
        @endif
        placeholder: '{{ $placeholderText }}',
        clearable: {{ $clearable ? 'true' : 'false' }}
    })"
    @mouseup.window="isDraggingGradient = false; isDraggingHue = false"
    @mousemove.window="handleGradientMouseMove($event); handleHueMouseMove($event)"
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
            <x-spire::color-picker.trigger :placement="$placement" :disabled="$disabled" :clearable="$clearable" />
            <x-spire::color-picker.content :placement="$placement" />
        </div>
    </div>
</div>
