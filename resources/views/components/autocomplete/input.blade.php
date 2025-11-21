@props([
    'size' => spire_default('autocomplete', 'size', 'md'),
    'variant' => spire_default('autocomplete', 'variant', spire_default('autocomplete', 'input-variant', 'bordered')),
    'color' => 'default',
    'radius' => spire_default('autocomplete', 'radius', 'md'),
    'type' => 'text',
    'clearable' => true,
    'disabled' => false,
    'placeholder' => '',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('autocomplete-input')
    ->extends('input-box')
    ->size($size)
    ->colorVariant($color, $variant)
    ->radius($radius)
    ->when($clearable, fn($b) => $b->modifier('clearable'));

$inputClasses = $builder->build();
$dataAttributes = $builder->getDataAttributes();

$wrapperClasses = 'spire-autocomplete-input-wrapper';
@endphp

<div x-ref="trigger" class="{{ $wrapperClasses }}">
    <input
        x-ref="input"
        x-model="inputValue"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.arrow-down.prevent="highlightNext"
        @keydown.arrow-up.prevent="highlightPrev"
        @keydown.enter.prevent="selectHighlighted"
        @keydown.escape="hide"
        @keydown.home.prevent="highlightFirst"
        @keydown.end.prevent="highlightLast"
        type="{{ $type }}"
        :placeholder="placeholder"
        :disabled="{{ $disabled ? 'true' : 'false' }}"
        role="combobox"
        aria-autocomplete="list"
        :aria-expanded="open"
        :aria-controls="$id('popover')"
        :aria-activedescendant="highlightedIndex >= 0 ? $id('option-' + highlightedIndex) : null"
        autocomplete="off"
        class="{{ $inputClasses }}"
        {{ $attributes->except(['class', 'placeholder', 'disabled']) }}
        @foreach($dataAttributes as $key => $value)
            {{ $key }}="{{ $value }}"
        @endforeach
    />

    @if($clearable)
        <button
            type="button"
            @click="clearInput"
            x-show="inputValue.length > 0"
            x-cloak
            class="spire-autocomplete-clear"
            :aria-label="clearLabel"
            tabindex="-1"
        >
            <x-spire::icon name="x" class="w-4 h-4 text-text-muted" />
        </button>
    @endif
</div>
