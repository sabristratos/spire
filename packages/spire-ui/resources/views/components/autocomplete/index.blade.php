{{--
    Autocomplete Component

    Shows suggestions as user types in an input field.
    Uses Popover API for positioning and keyboard navigation.

    Usage:
    <x-spire::autocomplete wire:model="selectedValue">
        <x-spire::autocomplete.option value="1">Option 1</x-spire::autocomplete.option>
        <x-spire::autocomplete.option value="2">Option 2</x-spire::autocomplete.option>
    </x-spire::autocomplete>
--}}

@props([
    'placeholder' => null,
    'placement' => 'bottom-start',
    'disabled' => false,
    'showOnFocus' => true,
    'minChars' => 0,
    'debounce' => 300,
    'clearable' => true,
    'highlightMatches' => true,
    'size' => 'md',
    'variant' => 'bordered',
    'color' => 'default',
    'radius' => 'md',
])

@php
use SpireUI\Support\WireEntangle;

$wireConfig = WireEntangle::fromAttributes($attributes);
$placeholderText = $placeholder ?? __('spire::spire-ui.autocomplete.placeholder');
@endphp

<div
    x-data="autocompleteComponent({
        @if($wireConfig->hasWireModel())
            value: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
        @endif
        placeholder: '{{ $placeholderText }}',
        minChars: {{ $minChars }},
        debounce: {{ $debounce }},
        showOnFocus: {{ $showOnFocus ? 'true' : 'false' }},
        highlightMatches: {{ $highlightMatches ? 'true' : 'false' }},
        clearable: {{ $clearable ? 'true' : 'false' }},
        clearLabel: '{{ __('spire::spire-ui.autocomplete.clear') }}',
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

    <div class="hidden" hidden>
        <div hidden x-ref="slotHtml">
            {{ $slot }}
        </div>
    </div>

    <div wire:ignore>
        <div
            x-id="['popover']"
            class="relative"
        >
            <x-spire::autocomplete.input
                :size="$size"
                :variant="$variant"
                :color="$color"
                :radius="$radius"
                :clearable="$clearable"
                :disabled="$disabled"
            />
            <x-spire::autocomplete.content
                :placement="$placement"
                :highlight-matches="$highlightMatches"
            />
        </div>
    </div>
</div>
