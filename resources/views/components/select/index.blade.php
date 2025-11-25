{{--
    Select Component

    Two rendering patterns:

    1. Auto-generated options (recommended for keyboard navigation):
       Options are extracted from slot content and rendered via template.
       Supports full keyboard navigation with arrow keys, home/end.

       <x-spire::select wire:model="selectedValue">
           <x-spire::select.option value="1">Option 1</x-spire::select.option>
           <x-spire::select.option value="2">Option 2</x-spire::select.option>
       </x-spire::select>

    2. Slot-based rendering (custom markup):
       Renders slot content directly. Use when you need custom option markup.
       Limited keyboard navigation support.

       <x-spire::select wire:model="selectedValue">
           <x-spire::select.content>
               <x-spire::select.option value="1">Custom Option 1</x-spire::select.option>
           </x-spire::select.content>
       </x-spire::select>
--}}

@props([
    'placeholder' => null,
    'placement' => spire_default('select', 'placement', 'bottom-start'),
    'disabled' => false,
    'searchable' => false,
    'searchPlaceholder' => null,
    'multiple' => false,
    'max' => null,
])

@php
use SpireUI\Support\WireEntangle;

$wireConfig = WireEntangle::fromAttributes($attributes);
$placeholderText = $placeholder ?? __('spire::spire-ui.select.placeholder');
$searchPlaceholderText = $searchPlaceholder ?? __('spire::spire-ui.select.search_placeholder');
$maxValue = is_numeric($max) ? (int) $max : 'null';
@endphp

<div
    x-modelable="value"
    x-data="spireSelect({
        @if($wireConfig->hasWireModel())
            value: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
        @elseif(!$attributes->has('x-model'))
            value: {{ $multiple ? '[]' : "''" }},
        @endif
        placeholder: '{{ $placeholderText }}',
        searchable: {{ $searchable ? 'true' : 'false' }},
        searchPlaceholder: '{{ $searchPlaceholderText }}',
        multiple: {{ $multiple ? 'true' : 'false' }},
        max: {{ $maxValue }},
        itemsSelectedText: '{{ __('spire::spire-ui.select.items_selected') }}',
        moreItemsText: '{{ __('spire::spire-ui.select.more_items') }}',
        selectAllText: '{{ __('spire::spire-ui.select.select_all') }}',
        clearAllText: '{{ __('spire::spire-ui.select.clear_all') }}',
        maxReachedMessage: '{{ __('spire::spire-ui.select.max_reached') }}'
    })"
    {{ WireEntangle::filteredAttributes($attributes) }}
>
    @if($wireConfig->needsHiddenInput())
        @if($multiple)
            {{-- Multiple hidden inputs for array values --}}
            <template x-for="(val, index) in (Array.isArray(value) ? value : [])" :key="index">
                <input
                    type="hidden"
                    @if($attributes->has('name'))
                        name="{{ $attributes->get('name') }}[]"
                    @endif
                    :value="val"
                >
            </template>
        @else
            <input
                type="hidden"
                {{ WireEntangle::hiddenInputAttributes($attributes) }}
                x-model="value"
            >
        @endif
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
            <x-spire::select.trigger :multiple="$multiple" :placement="$placement" />
            <x-spire::select.content :searchable="$searchable" :searchPlaceholder="$searchPlaceholderText" :multiple="$multiple" :placement="$placement" />
        </div>
    </div>
</div>
