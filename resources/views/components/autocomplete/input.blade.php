@props([
    'size' => 'md',
    'variant' => 'bordered',
    'color' => 'default',
    'radius' => 'md',
    'type' => 'text',
    'clearable' => true,
    'disabled' => false,
    'placeholder' => '',
])

@php
use SpireUI\Support\ComponentStyles;

$baseClasses = 'w-full transition-fast';

$sizeClasses = [
    'sm' => 'h-8 px-2 text-sm',
    'md' => 'h-10 px-3 text-base',
    'lg' => 'h-12 px-4 text-lg',
];

$variantKey = "input-{$variant}";
$variantClasses = ComponentStyles::colorClasses($variantKey, $color);

$inputClasses = ComponentStyles::buildClassString([
    $baseClasses,
    $sizeClasses[$size] ?? $sizeClasses['md'],
    ComponentStyles::radiusClasses($radius),
    $variantClasses,
]);

$inputClassesWithPadding = $clearable ? $inputClasses . ' pr-8' : $inputClasses;

$wrapperClasses = 'relative flex items-center w-full';
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
        class="{{ $inputClassesWithPadding }}"
        {{ $attributes->except(['class', 'placeholder', 'disabled']) }}
    />

    @if($clearable)
        <button
            type="button"
            @click="clearInput"
            x-show="inputValue.length > 0"
            x-cloak
            class="absolute right-2 p-1 hover:bg-hover rounded-sm transition-colors"
            :aria-label="clearLabel"
            tabindex="-1"
        >
            <x-spire::icon name="x" class="w-4 h-4 text-text-muted" />
        </button>
    @endif
</div>
