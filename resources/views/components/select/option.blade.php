@props([
    'value' => '',
    'label' => null,
    'disabled' => false,
])

@php
use SpireUI\Support\ComponentStyles;

$displayLabel = $label ?? $slot->toHtml();

$baseClasses = 'flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors rounded-md cursor-pointer';

$stateClasses = [
    'disabled' => 'text-text-disabled cursor-not-allowed',
    'normal' => 'text-text hover:bg-hover',
];

$selectedState = $disabled ? 'disabled' : 'normal';

$classString = ComponentStyles::buildClassString([
    $baseClasses,
    $stateClasses[$selectedState],
]);

$mergedAttributes = $attributes->merge([
    'class' => $classString,
    'role' => 'option',
    'data-spire-select-value' => $value,
    'data-spire-select-label' => $displayLabel,
    'data-spire-select-disabled' => $disabled ? 'true' : null,
]);
@endphp

<div
    {{ $mergedAttributes }}
    @click="if ($el.dataset.spireSelectDisabled !== 'true') { selectOption($el.dataset.spireSelectValue, $el.dataset.spireSelectLabel) }"
    :class="{ 'bg-primary/10': isSelected($el.dataset.spireSelectValue) }"
    :aria-selected="isSelected($el.dataset.spireSelectValue)"
>
    <span class="flex-1">{{ $slot }}</span>

    <x-spire::icon
        name="check"
        class="w-4 h-4 text-primary shrink-0"
        x-show="isSelected($el.dataset.spireSelectValue)"
        x-cloak
    />
</div>
